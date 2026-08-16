import "server-only";
import type { CandidateStory } from "./types";
import { getSupabaseServer } from "@/lib/supabase-server";
import { normalizeDedupKey } from "./validate";
import { log } from "@/lib/log";

// Filter candidates that have already been used in previous editions.
// A story is considered "seen" if its dedup_key exists in newsletter_story_seen.
export async function filterAlreadyUsed(
  candidates: CandidateStory[],
): Promise<{ fresh: CandidateStory[]; duplicates: CandidateStory[] }> {
  if (candidates.length === 0) return { fresh: [], duplicates: [] };
  const supabase = getSupabaseServer();
  if (!supabase) {
    log.warn("newsletter.dedup.no_supabase");
    return { fresh: candidates, duplicates: [] };
  }
  const keys = Array.from(new Set(candidates.map((c) => normalizeDedupKey(c.dedup_key))));
  const { data, error } = await supabase
    .from("newsletter_story_seen")
    .select("dedup_key")
    .in("dedup_key", keys);
  if (error) {
    log.warn("newsletter.dedup.select_error", { code: error.code });
    return { fresh: candidates, duplicates: [] };
  }
  const seen = new Set((data ?? []).map((r: { dedup_key: string }) => r.dedup_key));
  const fresh: CandidateStory[] = [];
  const duplicates: CandidateStory[] = [];
  for (const c of candidates) {
    (seen.has(normalizeDedupKey(c.dedup_key)) ? duplicates : fresh).push(c);
  }
  return { fresh, duplicates };
}

// After edition is persisted, register selected stories so they are not
// reused next week.
export async function registerSelectedStories(
  editionId: string,
  selected: CandidateStory[],
): Promise<void> {
  const supabase = getSupabaseServer();
  if (!supabase || selected.length === 0) return;
  const rows = selected.map((s) => ({
    dedup_key: normalizeDedupKey(s.dedup_key),
    headline: s.headline,
    source_urls: s.source_urls,
    category: s.category,
    jurisdiction: s.jurisdiction,
    published_at: s.published_at,
    first_used_edition_id: editionId,
    first_used_at: new Date().toISOString(),
  }));
  const { error } = await supabase
    .from("newsletter_story_seen")
    .upsert(rows, { onConflict: "dedup_key", ignoreDuplicates: true });
  if (error) log.warn("newsletter.dedup.upsert_error", { code: error.code });
}
