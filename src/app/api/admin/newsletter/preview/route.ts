import { NextRequest, NextResponse } from "next/server";
import { runNewsletterPipeline } from "@/lib/newsletter-agent/orchestrator";
import { SAMPLE_CANDIDATES, SAMPLE_DRAFT } from "@/lib/newsletter-agent/sample-data";
import { log } from "@/lib/log";

export const runtime = "nodejs";
export const maxDuration = 300;

// Admin-only endpoint. Runs the pipeline in preview_test mode:
//   - Does NOT register dedup entries
//   - Does NOT send any Broadcast
//   - Persists the draft as `ready_for_review` for inspection
//
// Auth: Authorization: Bearer $ADMIN_PREVIEW_SECRET or Bearer $CRON_SECRET
// Query params:
//   ?mode=dry|live         'dry' uses SAMPLE_CANDIDATES + SAMPLE_DRAFT; 'live' calls OpenAI. Default 'dry'.
//   ?stage=full|research   'research' returns only Stage 1 output. Default 'full'.
export async function POST(req: NextRequest) { return handle(req); }
export async function GET(req: NextRequest) { return handle(req); }

async function handle(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const url = new URL(req.url);
  const runMode = url.searchParams.get("mode") === "live" ? "live" : "dry";

  const now = new Date();
  const periodEnd = new Date(now);
  const periodStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const iso = (d: Date) => d.toISOString().slice(0, 10);

  try {
    const result = await runNewsletterPipeline({
      mode: "preview_test",
      triggeredBy: "admin_preview",
      periodStart: iso(periodStart),
      periodEnd: iso(periodEnd),
      seedCandidates: runMode === "dry" ? SAMPLE_CANDIDATES : undefined,
      seedDraft: runMode === "dry" ? SAMPLE_DRAFT : undefined,
    });
    if (!result.ok) {
      return NextResponse.json({
        ok: false,
        researchMode: runMode === "dry" ? "fixture" : "live_web",
        reason: result.reason,
        details: result.details,
      }, { status: 200 });
    }
    const sourceDomains = Array.from(new Set(
      result.draft.selected.flatMap((s) => s.source_urls)
        .map((u) => { try { return new URL(u).host; } catch { return null; } })
        .filter((h): h is string => !!h),
    ));
    return NextResponse.json({
      ok: true,
      researchMode: runMode === "dry" ? "fixture" : "live_web",
      generatedAt: new Date().toISOString(),
      researchWindow: { start: iso(periodStart), end: iso(periodEnd) },
      editionId: result.editionId,
      status: result.status,
      runId: result.runId,
      compliance: result.compliance,
      candidatesCount: result.draft.candidates.length,
      selectedCount: result.draft.selected.length,
      rejectedCount: result.draft.rejected.length,
      selected: result.draft.selected,
      rejected: result.draft.rejected,
      sourceDomains,
      subject_es: result.draft.subject_es,
      subject_en: result.draft.subject_en,
      content_es: result.draft.content_es,
      content_en: result.draft.content_en,
    });
  } catch (err) {
    log.error("admin.newsletter.preview.exception", { name: (err as Error).name });
    return NextResponse.json({ ok: false, error: "exception", message: (err as Error).message.slice(0, 200) }, { status: 500 });
  }
}

function isAuthorized(req: NextRequest): boolean {
  const adminSecret = process.env.ADMIN_PREVIEW_SECRET;
  const cronSecret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization");
  if (!auth) return false;
  if (adminSecret && auth === `Bearer ${adminSecret}`) return true;
  if (cronSecret && auth === `Bearer ${cronSecret}`) return true;
  return false;
}
