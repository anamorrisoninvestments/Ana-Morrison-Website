import "server-only";
import { getOpenAI, NEWSLETTER_MODEL, extractResponseText, safeJson } from "./openai-client";
import { RESEARCH_SYSTEM, WRITER_SYSTEM } from "./prompts";
import { researchOutputJsonSchema, editionOutputJsonSchema } from "./schemas";
import { validateCandidate, validateBilingualParity, scanForbiddenPhrases, normalizeDedupKey } from "./validate";
import { filterAlreadyUsed } from "./dedup";
import type { CandidateStory, EditionDraft, RejectedStory, SelectedStory, ComplianceResult, PipelineMode } from "./types";
import { log } from "@/lib/log";

const MIN_STORIES_TO_PROCEED = 4;
const MIN_SELECTED_TO_SEND = 3;

export type ResearchOptions = {
  periodStart: string; // YYYY-MM-DD
  periodEnd: string;   // YYYY-MM-DD
  seed?: {             // Optional test seed to skip the network round-trip
    candidates: CandidateStory[];
  };
};

export type ResearchResult =
  | { ok: true; candidates: CandidateStory[]; rejected: RejectedStory[]; rawText?: string; model: string }
  | { ok: false; reason: string };

// STAGE 1: Research + validate + dedup
export async function runResearch(opts: ResearchOptions): Promise<ResearchResult> {
  let candidates: CandidateStory[] = [];
  let rejected: RejectedStory[] = [];
  let rawText: string | undefined;

  if (opts.seed) {
    candidates = opts.seed.candidates;
  } else {
    const client = getOpenAI();
    if (!client) return { ok: false, reason: "no_openai_key" };
    let response: unknown;
    try {
      response = await client.responses.create({
        model: NEWSLETTER_MODEL,
        tools: [{ type: "web_search" }],
        instructions: RESEARCH_SYSTEM,
        input: `Research meaningful developments from approximately ${opts.periodStart} to ${opts.periodEnd} for the AnaMaría Morrison Weekly Real Estate Intelligence newsletter. Return the JSON research payload only.`,
        text: {
          format: {
            type: "json_schema",
            name: "research_output",
            schema: researchOutputJsonSchema,
            strict: true,
          },
        },
      } as Parameters<typeof client.responses.create>[0]);
    } catch (err) {
      log.error("newsletter.research.openai_exception", { name: (err as Error).name });
      return { ok: false, reason: `openai_exception:${(err as Error).message.slice(0, 200)}` };
    }
    rawText = extractResponseText(response);
    const parsed = safeJson<{ candidates: unknown[] }>(rawText);
    if (!parsed || !Array.isArray(parsed.candidates)) {
      return { ok: false, reason: "research_json_invalid" };
    }
    for (const raw of parsed.candidates) {
      const v = validateCandidate(raw);
      if (v.ok) candidates.push(v.value);
      else rejected.push({ id: `invalid-${rejected.length}`, headline: "(invalid)", reason: "unsupported_claim", notes: v.error });
    }
  }

  if (candidates.length < MIN_STORIES_TO_PROCEED) {
    return { ok: false, reason: `insufficient_candidates:${candidates.length}` };
  }

  // Dedup against previous editions
  const { fresh, duplicates } = await filterAlreadyUsed(candidates);
  for (const d of duplicates) rejected.push({ id: d.id, headline: d.headline, reason: "duplicate" });

  if (fresh.length < MIN_STORIES_TO_PROCEED) {
    return { ok: false, reason: `insufficient_fresh_candidates:${fresh.length}` };
  }

  return { ok: true, candidates: fresh, rejected, rawText, model: NEWSLETTER_MODEL };
}

// STAGE 2 + 3: Editorial ranking + writer (single LLM call to keep coherence)
export type WriteOptions = {
  candidates: CandidateStory[];
  periodStart: string;
  periodEnd: string;
  seed?: EditionDraft; // For test mode
};

export type WriteResult =
  | { ok: true; draft: EditionDraft }
  | { ok: false; reason: string };

export async function runWriter(opts: WriteOptions): Promise<WriteResult> {
  if (opts.seed) return { ok: true, draft: opts.seed };

  const client = getOpenAI();
  if (!client) return { ok: false, reason: "no_openai_key" };

  const input = JSON.stringify({
    period_start: opts.periodStart,
    period_end: opts.periodEnd,
    candidates: opts.candidates,
    instructions: "Select 5-7 strongest stories from BOTH pillars. Return JSON only. Every selected id must exist in the candidates list.",
  });

  let response: unknown;
  try {
    response = await client.responses.create({
      model: NEWSLETTER_MODEL,
      instructions: WRITER_SYSTEM,
      input,
      text: {
        format: {
          type: "json_schema",
          name: "edition_output",
          schema: editionOutputJsonSchema,
          strict: true,
        },
      },
    } as Parameters<typeof client.responses.create>[0]);
  } catch (err) {
    log.error("newsletter.writer.openai_exception", { name: (err as Error).name });
    return { ok: false, reason: `openai_exception:${(err as Error).message.slice(0, 200)}` };
  }

  const text = extractResponseText(response);
  const parsed = safeJson<{
    subject_es: string; subject_en: string;
    content_es: string; content_en: string;
    selected_ids: string[]; rejected: RejectedStory[];
  }>(text);
  if (!parsed) return { ok: false, reason: "writer_json_invalid" };

  const byId = new Map(opts.candidates.map((c) => [c.id, c]));
  const selected: SelectedStory[] = [];
  for (const id of parsed.selected_ids) {
    const c = byId.get(id);
    if (c) selected.push({ ...c, rank: selected.length + 1 });
  }
  if (selected.length < MIN_SELECTED_TO_SEND) {
    return { ok: false, reason: `selected_below_minimum:${selected.length}` };
  }

  return {
    ok: true,
    draft: {
      subject_es: parsed.subject_es,
      subject_en: parsed.subject_en,
      content_es: parsed.content_es,
      content_en: parsed.content_en,
      selected,
      rejected: parsed.rejected ?? [],
      candidates: opts.candidates,
      metadata: {
        model: NEWSLETTER_MODEL,
        period_start: opts.periodStart,
        period_end: opts.periodEnd,
      },
    },
  };
}

// STAGE 4: Compliance review
export function runCompliance(draft: EditionDraft): ComplianceResult {
  const findings: string[] = [];

  // 1) Forbidden phrases in either language
  findings.push(...scanForbiddenPhrases(draft.content_es).map((f) => `es:${f}`));
  findings.push(...scanForbiddenPhrases(draft.content_en).map((f) => `en:${f}`));

  // 2) Every selected story must retain a source link inside the rendered body
  for (const s of draft.selected) {
    const url = s.source_urls[0];
    if (!draft.content_en.includes(url) && !draft.content_es.includes(url)) {
      findings.push(`missing_source_link:${s.id}`);
    }
  }

  // 3) Bilingual parity
  const parity = validateBilingualParity(draft.content_es, draft.content_en);
  if (!parity.ok) findings.push(`parity:${parity.error}`);

  // 4) Tax deed disclaimer must appear when any tax_deed story is selected
  const hasTaxDeed = draft.selected.some((s) => s.category === "tax_deed");
  if (hasTaxDeed) {
    const disclaimerES = /(no\s+es\s+asesor|no\s+constituye\s+asesor|reglas\s+var[ií]an\s+por\s+jurisdicci)/i.test(draft.content_es);
    const disclaimerEN = /(not\s+legal.*advice|rules\s+vary\s+by\s+jurisdiction|educational\s+purposes)/i.test(draft.content_en);
    if (!disclaimerES) findings.push("es:missing_tax_deed_disclaimer");
    if (!disclaimerEN) findings.push("en:missing_tax_deed_disclaimer");
  }

  // 5) Public name check
  if (!/AnaMaría Morrison/.test(draft.content_es)) findings.push("es:missing_public_name");
  if (!/AnaMaría Morrison/.test(draft.content_en)) findings.push("en:missing_public_name");

  const fail = findings.some((f) =>
    f.includes("guarantee") ||
    f.includes("risk_free") ||
    f.includes("clear_title") ||
    f.includes("clean_title") ||
    f.includes("missing_source_link") ||
    f.includes("missing_tax_deed_disclaimer") ||
    f.startsWith("parity:"),
  );
  const warn = findings.length > 0 && !fail;

  return { ok: !fail, status: fail ? "fail" : warn ? "warn" : "pass", findings };
}

// Helper: normalize any dedup keys before persistence
export function normalizeCandidates(cs: CandidateStory[]): CandidateStory[] {
  return cs.map((c) => ({ ...c, dedup_key: normalizeDedupKey(c.dedup_key) }));
}

export const AGENT_LIMITS = { MIN_STORIES_TO_PROCEED, MIN_SELECTED_TO_SEND };
export type { PipelineMode };
