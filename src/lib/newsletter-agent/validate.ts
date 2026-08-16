import type { CandidateStory, RejectedStory, StoryCategory, SourceQuality } from "./types";

// Lightweight runtime validation. We keep it dependency-free (no zod) so the
// pipeline stays cheap and testable in isolation.

const VALID_CATEGORIES: StoryCategory[] = ["str", "tax_deed"];
const VALID_QUALITY: SourceQuality[] = ["primary", "official", "reputable_secondary", "weak"];

function isString(v: unknown, min = 1, max = 100000): v is string {
  return typeof v === "string" && v.length >= min && v.length <= max;
}
function isNum01(v: unknown): v is number {
  return typeof v === "number" && v >= 0 && v <= 1;
}
function isUrl(v: unknown): v is string {
  if (typeof v !== "string") return false;
  try {
    const u = new URL(v);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export type ValidateResult<T> = { ok: true; value: T } | { ok: false; error: string };

export function validateCandidate(raw: unknown): ValidateResult<CandidateStory> {
  if (!raw || typeof raw !== "object") return { ok: false, error: "not_object" };
  const c = raw as Record<string, unknown>;
  if (!isString(c.id, 1, 100)) return { ok: false, error: "id" };
  if (!VALID_CATEGORIES.includes(c.category as StoryCategory)) return { ok: false, error: "category" };
  if (!isString(c.headline, 8, 200)) return { ok: false, error: "headline" };
  if (!isString(c.summary, 20, 800)) return { ok: false, error: "summary" };
  if (!isString(c.why_it_matters, 10, 400)) return { ok: false, error: "why_it_matters" };
  if (!isString(c.practical_takeaway, 10, 300)) return { ok: false, error: "practical_takeaway" };
  if (c.jurisdiction !== null && !isString(c.jurisdiction, 1, 200)) return { ok: false, error: "jurisdiction" };
  if (c.published_at !== null && !isString(c.published_at, 4, 40)) return { ok: false, error: "published_at" };
  if (!Array.isArray(c.source_urls) || c.source_urls.length < 1) return { ok: false, error: "source_urls_empty" };
  const urls = c.source_urls.filter(isUrl);
  if (urls.length < 1) return { ok: false, error: "source_urls_invalid" };
  if (!VALID_QUALITY.includes(c.source_quality as SourceQuality)) return { ok: false, error: "source_quality" };
  if (!isNum01(c.confidence)) return { ok: false, error: "confidence" };
  if (!isNum01(c.freshness_score)) return { ok: false, error: "freshness_score" };
  if (!isNum01(c.relevance_score)) return { ok: false, error: "relevance_score" };
  if (!isString(c.dedup_key, 4, 200)) return { ok: false, error: "dedup_key" };
  return {
    ok: true,
    value: {
      id: c.id as string,
      category: c.category as StoryCategory,
      headline: c.headline as string,
      summary: c.summary as string,
      why_it_matters: c.why_it_matters as string,
      practical_takeaway: c.practical_takeaway as string,
      jurisdiction: (c.jurisdiction as string | null) ?? null,
      published_at: (c.published_at as string | null) ?? null,
      source_urls: urls,
      source_quality: c.source_quality as SourceQuality,
      confidence: c.confidence as number,
      freshness_score: c.freshness_score as number,
      relevance_score: c.relevance_score as number,
      dedup_key: normalizeDedupKey(c.dedup_key as string),
    },
  };
}

export function normalizeDedupKey(key: string): string {
  return key
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\-_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 200);
}

// Bilingual parity heuristic: each language edition must have similar length
// and contain both pillar headings. Not exhaustive, but blocks catastrophic
// asymmetry from the writer stage.
export function validateBilingualParity(es: string, en: string): ValidateResult<{ es: string; en: string }> {
  if (!isString(es, 200) || !isString(en, 200)) {
    return { ok: false, error: "content_too_short" };
  }
  // Words ratio: lower / higher must be at least 0.7
  const esWords = es.trim().split(/\s+/).length;
  const enWords = en.trim().split(/\s+/).length;
  const ratio = Math.min(esWords, enWords) / Math.max(esWords, enWords);
  if (ratio < 0.6) return { ok: false, error: `bilingual_ratio_${ratio.toFixed(2)}` };
  // Both should mention at least one of the pillar labels
  const strLabelES = /alquil|short-?term|str|airbnb/i.test(es);
  const strLabelEN = /short-?term|str|airbnb/i.test(en);
  const taxDeedES = /tax\s*deed|subasta/i.test(es);
  const taxDeedEN = /tax\s*deed|county\s*auction/i.test(en);
  if (!(strLabelES && strLabelEN)) return { ok: false, error: "missing_str_pillar" };
  if (!(taxDeedES && taxDeedEN)) return { ok: false, error: "missing_tax_deed_pillar" };
  return { ok: true, value: { es, en } };
}

// Compliance scan. Flags forbidden phrases in either language.
export function scanForbiddenPhrases(text: string): string[] {
  const findings: string[] = [];
  const patterns: { rx: RegExp; label: string }[] = [
    { rx: /\bguarantee(d|s)?\b/i, label: "guarantee_language" },
    { rx: /\brisk[-\s]?free\b/i, label: "risk_free" },
    { rx: /\bclear\s+title\b/i, label: "clear_title_absolute" },
    { rx: /\bclean\s+title\b/i, label: "clean_title_absolute" },
    { rx: /\bpassive\s+income\b.*\b(guaranteed|automatic)\b/i, label: "guaranteed_passive_income" },
    { rx: /\b(promise|prometemos|garantiz\w*)\b/i, label: "promise_language" },
    { rx: /libre\s+de\s+riesgo/i, label: "risk_free_es" },
    { rx: /rendimient\w*\s+garantiz\w*/i, label: "guaranteed_returns_es" },
    { rx: /titul\w*\s+limpio/i, label: "clean_title_es" },
  ];
  for (const { rx, label } of patterns) {
    if (rx.test(text)) findings.push(label);
  }
  return findings;
}

export function rejected(id: string, headline: string, reason: RejectedStory["reason"], notes?: string): RejectedStory {
  return { id, headline, reason, notes };
}
