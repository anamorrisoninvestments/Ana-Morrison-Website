// Structured types for the autonomous newsletter agent pipeline.
// All intermediate outputs go through these schemas; every agent call is
// validated before the next stage runs.

export type StoryCategory = "str" | "tax_deed";
export type SourceQuality = "primary" | "official" | "reputable_secondary" | "weak";

export type CandidateStory = {
  id: string;
  category: StoryCategory;
  headline: string;
  summary: string;                 // 1-3 sentence factual summary
  why_it_matters: string;          // editorial angle for STR operators / Tax Deed investors
  practical_takeaway: string;      // one action-oriented sentence
  jurisdiction: string | null;     // e.g., "Miami-Dade, FL" or null
  published_at: string | null;     // ISO date if known
  source_urls: string[];           // primary URLs; at least 1
  source_quality: SourceQuality;
  confidence: number;              // 0-1
  freshness_score: number;         // 0-1: 1 = brand-new this week
  relevance_score: number;         // 0-1: audience relevance
  dedup_key: string;               // normalized signature for cross-edition dedup
};

export type SelectedStory = CandidateStory & {
  rank: number;
};

export type RejectedStory = {
  id: string;
  headline: string;
  reason: "duplicate" | "low_confidence" | "no_source" | "off_topic" | "unsupported_claim" | "compliance_risk" | "weak_source" | "other";
  notes?: string;
};

export type EditionDraft = {
  subject_es: string;
  subject_en: string;
  content_es: string;              // Markdown/HTML body
  content_en: string;
  selected: SelectedStory[];
  rejected: RejectedStory[];
  candidates: CandidateStory[];    // full raw research pool
  metadata: {
    model?: string;
    input_tokens?: number;
    output_tokens?: number;
    period_start: string;          // ISO date
    period_end: string;
  };
};

export type ComplianceResult = {
  ok: boolean;
  status: "pass" | "warn" | "fail";
  findings: string[];              // list of surfaced concerns
};

export type PipelineMode = "preview_test" | "production_generate" | "autopilot";

export type PipelineResult =
  | { ok: true; editionId: string; status: string; runId: string; draft: EditionDraft; compliance: ComplianceResult; broadcastIds?: { es?: string | null; en?: string | null } }
  | { ok: false; runId: string; reason: string; details?: unknown };
