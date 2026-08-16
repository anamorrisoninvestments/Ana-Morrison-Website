import "server-only";
import { getSupabaseServer } from "@/lib/supabase-server";
import { log } from "@/lib/log";
import type { EditionDraft, ComplianceResult, PipelineMode } from "./types";

export async function createRun(input: {
  mode: PipelineMode;
  triggeredBy: string;
  periodStart: string;
  periodEnd: string;
}): Promise<{ id: string } | null> {
  const supabase = getSupabaseServer();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("newsletter_runs")
    .insert({
      mode: input.mode,
      triggered_by: input.triggeredBy,
      period_start: input.periodStart,
      period_end: input.periodEnd,
      status: "running",
    })
    .select("id")
    .single();
  if (error || !data) {
    log.warn("newsletter.persist.run_insert_error", { code: error?.code });
    return null;
  }
  return { id: data.id as string };
}

export async function completeRun(runId: string | null, patch: {
  status: "completed" | "failed" | "skipped";
  failReason?: string;
  candidateCount?: number;
  rejectedCount?: number;
  selectedCount?: number;
  model?: string;
  editionId?: string;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  if (!runId) return;
  const supabase = getSupabaseServer();
  if (!supabase) return;
  await supabase.from("newsletter_runs").update({
    status: patch.status,
    fail_reason: patch.failReason ?? null,
    candidate_count: patch.candidateCount ?? null,
    rejected_count: patch.rejectedCount ?? null,
    selected_count: patch.selectedCount ?? null,
    model: patch.model ?? null,
    edition_id: patch.editionId ?? null,
    raw_metadata: patch.metadata ?? {},
  }).eq("id", runId);
}

export async function persistEdition(input: {
  runId: string | null;
  draft: EditionDraft;
  compliance: ComplianceResult;
}): Promise<{ id: string; status: string } | null> {
  const supabase = getSupabaseServer();
  if (!supabase) return null;

  const status = !compliancePasses(input.compliance)
    ? "compliance_failed"
    : "ready_for_review"; // never auto-send from persist; sending is a separate step

  const { data, error } = await supabase
    .from("newsletter_editions")
    .insert({
      run_id: input.runId,
      period_start: input.draft.metadata.period_start,
      period_end: input.draft.metadata.period_end,
      status,
      compliance_result: `${input.compliance.status}: ${input.compliance.findings.join(", ") || "clean"}`.slice(0, 500),
      subject_es: input.draft.subject_es,
      subject_en: input.draft.subject_en,
      content_es: input.draft.content_es,
      content_en: input.draft.content_en,
      candidate_stories: input.draft.candidates,
      selected_stories: input.draft.selected,
      rejected_stories: input.draft.rejected,
      model: input.draft.metadata.model ?? null,
      input_tokens: input.draft.metadata.input_tokens ?? null,
      output_tokens: input.draft.metadata.output_tokens ?? null,
      metadata: { period: [input.draft.metadata.period_start, input.draft.metadata.period_end] },
    })
    .select("id, status")
    .single();

  if (error || !data) {
    log.warn("newsletter.persist.edition_insert_error", { code: error?.code });
    return null;
  }
  return { id: data.id as string, status: data.status as string };
}

export function compliancePasses(c: ComplianceResult): boolean {
  return c.ok && c.status !== "fail";
}
