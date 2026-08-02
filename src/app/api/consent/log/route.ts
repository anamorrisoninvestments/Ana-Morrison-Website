import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServer, isMissingTableError } from "@/lib/supabase-server";
import { hashIp, getClientIp, summarizeUserAgent } from "@/lib/hash";
import { checkRateLimit } from "@/lib/rate-limit";
import { log } from "@/lib/log";

export const runtime = "nodejs";

const bodySchema = z
  .object({
    action: z.enum(["accepted", "rejected", "updated", "withdrawn"]),
    consent_type: z.enum(["cookies", "communications", "terms", "marketing"]),
    consent_version: z.string().trim().min(1).max(20),
    categories: z
      .object({
        necessary: z.literal(true),
        analytics: z.boolean().optional(),
        marketing: z.boolean().optional(),
      })
      .optional(),
    source: z
      .enum(["banner_initial", "preferences_modal", "form_submit", "withdrawal_link"])
      .optional(),
    session_id: z.string().trim().max(64).optional(),
    page_url: z.string().trim().max(500).optional(),
    user_email: z.string().trim().toLowerCase().max(254).email().optional(),
    lead_id: z.string().uuid().optional(),
  })
  .strict();

export async function POST(req: NextRequest) {
  const ipHash = hashIp(getClientIp(req.headers));

  // Rate limit generoso — banner y modal pueden dispararlo varias veces
  const rl = await checkRateLimit("/api/consent/log", ipHash);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } },
    );
  }

  let raw: unknown;
  try {
    const text = await req.text();
    if (text.length > 4 * 1024) {
      return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 });
    }
    raw = JSON.parse(text);
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(raw);
  if (!parsed.success) {
    const fields = parsed.error.issues.map((i) => i.path.join(".") || "root").slice(0, 20);
    return NextResponse.json({ ok: false, error: "invalid_input", fields }, { status: 400 });
  }

  const supabase = getSupabaseServer();
  if (!supabase) {
    log.warn("api.consent.log.no_supabase");
    // Fail-safe: no bloqueamos al usuario — el consent local ya se registró en cookie
    return NextResponse.json({ ok: true, storage: "cookie-only" }, { status: 200 });
  }

  const row = {
    action: parsed.data.action,
    consent_type: parsed.data.consent_type,
    consent_version: parsed.data.consent_version,
    categories: parsed.data.categories ?? null,
    source: parsed.data.source ?? null,
    session_id: parsed.data.session_id ?? null,
    page_url: parsed.data.page_url ?? null,
    user_email: parsed.data.user_email ?? null,
    lead_id: parsed.data.lead_id ?? null,
    ip_hash: ipHash,
    user_agent_summary: summarizeUserAgent(req.headers.get("user-agent")),
  };

  try {
    const { error } = await supabase.from("consents").insert(row);
    if (error) {
      if (isMissingTableError(error)) {
        log.warn("api.consent.log.table_missing");
        return NextResponse.json({ ok: true, storage: "cookie-only" }, { status: 200 });
      }
      log.error("api.consent.log.insert_error", { code: error.code });
      return NextResponse.json({ ok: false, error: "internal_error" }, { status: 500 });
    }
    return NextResponse.json({ ok: true, storage: "supabase" }, { status: 200 });
  } catch (err) {
    log.error("api.consent.log.exception", { name: (err as Error).name });
    return NextResponse.json({ ok: false, error: "internal_error" }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ ok: false, error: "method_not_allowed" }, { status: 405 });
}
