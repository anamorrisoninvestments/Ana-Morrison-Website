import { NextRequest, NextResponse } from "next/server";
import { leadPayloadSchema } from "@/lib/leads/schema";
import { saveLead } from "@/lib/leads/save";
import { sendLeadNotification } from "@/lib/email/send-lead-emails";
import { checkRateLimit } from "@/lib/rate-limit";
import { hashIp, getClientIp } from "@/lib/hash";
import { log } from "@/lib/log";

export const runtime = "nodejs";

// Timing check: si el form se envía en <2s desde la carga → probable bot.
const MIN_FORM_LIFETIME_MS = 2000;

// UAs bloqueados de forma silenciosa (herramientas obvias)
const BLOCKED_UA_PATTERNS = [/^curl\//i, /python-requests/i, /^Go-http-client/i, /^Wget/i];

export async function POST(req: NextRequest) {
  const ipHash = hashIp(getClientIp(req.headers));
  const ua = req.headers.get("user-agent") || "";

  // 0. Bloqueo silencioso de UAs de scripts/CLI
  if (!ua || BLOCKED_UA_PATTERNS.some((r) => r.test(ua))) {
    log.warn("api.leads.blocked_ua", { ipHash });
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // 1. Rate limit por IP hash
  const rl = await checkRateLimit("/api/leads", ipHash);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } },
    );
  }

  // 2. Parse body con guarda de tamaño
  let raw: unknown;
  try {
    const text = await req.text();
    if (text.length > 16 * 1024) {
      return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 });
    }
    raw = JSON.parse(text);
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // 3. Validación estricta con allowlist (.strict())
  const parsed = leadPayloadSchema.safeParse(raw);
  if (!parsed.success) {
    const fields = parsed.error.issues.map((i) => i.path.join(".") || "root").slice(0, 20);
    return NextResponse.json(
      { ok: false, error: "invalid_input", fields },
      { status: 400 },
    );
  }
  const input = parsed.data;

  // 4. Honeypot: si tiene valor → responder OK silencioso sin persistir
  if (input.hp_website && input.hp_website.length > 0) {
    log.warn("api.leads.honeypot_hit", { ipHash });
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // 5. Timing check
  if (input.form_started_at) {
    const lifetime = Date.now() - input.form_started_at;
    if (lifetime < MIN_FORM_LIFETIME_MS) {
      log.warn("api.leads.too_fast", { ipHash, lifetime });
      return NextResponse.json({ ok: true }, { status: 200 });
    }
  }

  // 6. Guardar
  const result = await saveLead(input);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: "internal_error" }, { status: 500 });
  }

  // 7. Notificación por email (async, no bloquea la respuesta)
  void sendLeadNotification({ leadId: result.id, payload: input });

  return NextResponse.json({ ok: true, id: result.id }, { status: 200 });
}

export function GET() {
  return NextResponse.json({ ok: false, error: "method_not_allowed" }, { status: 405 });
}
