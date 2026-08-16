import { NextRequest, NextResponse } from "next/server";
import { runNewsletterPipeline } from "@/lib/newsletter-agent/orchestrator";
import { log } from "@/lib/log";

export const runtime = "nodejs";
export const maxDuration = 300; // 5 minutes; research + writer + persistence

// Weekly autonomous newsletter cron.
// Vercel Cron sends GET requests. We accept GET only. Requires either:
//   - Authorization: Bearer $CRON_SECRET  (recommended)
//   - x-vercel-cron: 1 header (set by Vercel Cron infrastructure)
//
// Modes controlled by NEWSLETTER_AUTOMATION_ENABLED and NEWSLETTER_AUTO_SEND.
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    log.warn("cron.newsletter.unauthorized");
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  if (process.env.NEWSLETTER_AUTOMATION_ENABLED !== "true") {
    log.info("cron.newsletter.disabled");
    return NextResponse.json({ ok: true, skipped: true, reason: "automation_disabled" });
  }

  const now = new Date();
  const periodEnd = new Date(now);
  const periodStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const iso = (d: Date) => d.toISOString().slice(0, 10);

  const autoSend = process.env.NEWSLETTER_AUTO_SEND === "true";
  const mode = autoSend ? "autopilot" : "production_generate";

  try {
    const result = await runNewsletterPipeline({
      mode,
      triggeredBy: "cron",
      periodStart: iso(periodStart),
      periodEnd: iso(periodEnd),
    });
    if (!result.ok) {
      log.warn("cron.newsletter.pipeline_failed", { reason: result.reason });
      return NextResponse.json({ ok: false, mode, reason: result.reason, details: result.details }, { status: 200 });
    }
    return NextResponse.json({
      ok: true,
      mode,
      editionId: result.editionId,
      status: result.status,
      runId: result.runId,
      compliance: result.compliance.status,
      selected: result.draft.selected.length,
      candidates: result.draft.candidates.length,
      broadcastIds: result.broadcastIds,
    });
  } catch (err) {
    log.error("cron.newsletter.exception", { name: (err as Error).name });
    return NextResponse.json({ ok: false, error: "exception", message: (err as Error).message.slice(0, 200) }, { status: 500 });
  }
}

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false; // fail-closed if not configured
  const auth = req.headers.get("authorization");
  if (auth === `Bearer ${secret}`) return true;
  // Vercel infrastructure adds this header when invoking cron jobs.
  const vercelCron = req.headers.get("x-vercel-cron");
  if (vercelCron && auth === `Bearer ${secret}`) return true;
  return false;
}
