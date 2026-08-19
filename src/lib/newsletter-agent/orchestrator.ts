import "server-only";
import { runResearch, runWriter, runCompliance } from "./pipeline";
import { createRun, completeRun, persistEdition, compliancePasses } from "./persist";
import { registerSelectedStories } from "./dedup";
import { createAndOptionallySend } from "./broadcast";
import { log } from "@/lib/log";
import type { PipelineMode, PipelineResult, CandidateStory, EditionDraft } from "./types";

// Modes:
//   preview_test         → generate + persist as draft, no register-dedup, no broadcast
//   production_generate  → generate + persist + register-dedup, no broadcast
//   autopilot            → generate + persist + register-dedup + Resend Broadcast + send if NEWSLETTER_AUTO_SEND=true
export async function runNewsletterPipeline(input: {
  mode: PipelineMode;
  triggeredBy: string;
  periodStart: string;
  periodEnd: string;
  seedCandidates?: CandidateStory[];  // preview/test seed
  seedDraft?: EditionDraft;           // preview/test seed
}): Promise<PipelineResult> {
  const { mode, triggeredBy, periodStart, periodEnd } = input;
  const run = await createRun({ mode, triggeredBy, periodStart, periodEnd });
  const runId = run?.id ?? "no-run";

  // 1) Research
  const research = await runResearch({ periodStart, periodEnd, seed: input.seedCandidates ? { candidates: input.seedCandidates } : undefined });
  if (!research.ok) {
    await completeRun(run?.id ?? null, { status: "failed", failReason: research.reason });
    return { ok: false, runId, reason: research.reason };
  }

  // 2) Writer
  const writer = await runWriter({
    candidates: research.candidates,
    periodStart, periodEnd,
    seed: input.seedDraft,
  });
  if (!writer.ok) {
    await completeRun(run?.id ?? null, {
      status: "failed",
      failReason: writer.reason,
      candidateCount: research.candidates.length,
      rejectedCount: research.rejected.length,
      model: research.model,
    });
    return { ok: false, runId, reason: writer.reason };
  }
  const draft: EditionDraft = writer.draft;
  // Merge earlier rejections (dedup + invalid) with writer rejections
  draft.rejected = [...research.rejected, ...draft.rejected];

  // 3) Compliance
  const compliance = runCompliance(draft);

  // 4) Persist edition (marks compliance_failed or ready_for_review)
  const edition = await persistEdition({ runId: run?.id ?? null, draft, compliance });
  if (!edition) {
    await completeRun(run?.id ?? null, { status: "failed", failReason: "edition_persist_failed" });
    return { ok: false, runId, reason: "edition_persist_failed" };
  }

  if (!compliancePasses(compliance)) {
    await completeRun(run?.id ?? null, {
      status: "failed", failReason: `compliance_${compliance.status}`,
      candidateCount: draft.candidates.length,
      rejectedCount: draft.rejected.length,
      selectedCount: draft.selected.length,
      model: draft.metadata.model,
      editionId: edition.id,
      metadata: { compliance_findings: compliance.findings },
    });
    return { ok: false, runId, reason: `compliance_${compliance.status}`, details: compliance.findings };
  }

  // 5) Dedup registry (only for production_generate or autopilot)
  if (mode !== "preview_test") {
    await registerSelectedStories(edition.id, draft.selected);
  }

  // 6) Autopilot only: create/send Resend Broadcast targeting Segments.
  let broadcastIds: { es?: string | null; en?: string | null } | undefined;
  if (mode === "autopilot") {
    const segmentES = process.env.RESEND_NEWSLETTER_SEGMENT_ID_ES || null;
    const segmentEN = process.env.RESEND_NEWSLETTER_SEGMENT_ID_EN || null;
    const autoSend = process.env.NEWSLETTER_AUTO_SEND === "true";
    const br = await createAndOptionallySend({
      editionId: edition.id,
      subjectES: draft.subject_es,
      subjectEN: draft.subject_en,
      contentES: draft.content_es,
      contentEN: draft.content_en,
      segmentIdES: segmentES,
      segmentIdEN: segmentEN,
      fromEmail: process.env.NEWSLETTER_FROM_EMAIL || "noreply@anamorrison.com",
      fromName: "AnaMaría Morrison",
      autoSend,
    });
    broadcastIds = { es: br.broadcastIdES, en: br.broadcastIdEN };
    log.info("newsletter.autopilot.broadcast", { editionId: edition.id, sent: br.sent, error: br.error });
  }

  await completeRun(run?.id ?? null, {
    status: "completed",
    candidateCount: draft.candidates.length,
    rejectedCount: draft.rejected.length,
    selectedCount: draft.selected.length,
    model: draft.metadata.model,
    editionId: edition.id,
    metadata: { compliance: compliance.status, findings_count: compliance.findings.length },
  });

  return {
    ok: true,
    editionId: edition.id,
    status: edition.status,
    runId,
    draft,
    compliance,
    broadcastIds,
  };
}
