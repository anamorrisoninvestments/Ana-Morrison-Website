import "server-only";
import { getSupabaseServer, isMissingTableError } from "./supabase-server";
import { log } from "./log";

type Endpoint = "/api/leads" | "/api/consent/log";

const RULES: Record<Endpoint, { windowSec: number; max: number }[]> = {
  "/api/leads": [
    { windowSec: 60, max: 5 },
    { windowSec: 3600, max: 20 },
  ],
  "/api/consent/log": [
    { windowSec: 60, max: 30 },
  ],
};

export type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfterSec: number };

/**
 * Consulta y actualiza buckets en Supabase. Si Supabase falla o la tabla no
 * existe, retorna { ok: true } para no bloquear al usuario (fail-open en RL).
 */
export async function checkRateLimit(
  endpoint: Endpoint,
  ipHash: string | null,
): Promise<RateLimitResult> {
  if (!ipHash) return { ok: true }; // sin ipHash no podemos limitar; permitimos

  const supabase = getSupabaseServer();
  if (!supabase) return { ok: true };

  const now = new Date();
  const rules = RULES[endpoint];

  for (const rule of rules) {
    const windowStart = new Date(now.getTime() - rule.windowSec * 1000);

    try {
      const { count, error } = await supabase
        .from("rate_limit_buckets")
        .select("id", { count: "exact", head: true })
        .eq("ip_hash", ipHash)
        .eq("endpoint", endpoint)
        .gte("window_start", windowStart.toISOString());

      if (error) {
        if (isMissingTableError(error)) return { ok: true };
        log.warn("rate_limit.select_error", { code: error.code });
        return { ok: true };
      }

      if ((count ?? 0) >= rule.max) {
        return { ok: false, retryAfterSec: rule.windowSec };
      }
    } catch (err) {
      log.warn("rate_limit.exception", { name: (err as Error).name });
      return { ok: true };
    }
  }

  // Registrar el hit
  try {
    const shortest = rules[0]; // usamos la ventana más corta para expirar el bucket
    const windowEnd = new Date(now.getTime() + shortest.windowSec * 1000);
    await supabase.from("rate_limit_buckets").insert({
      ip_hash: ipHash,
      endpoint,
      window_start: now.toISOString(),
      window_end: windowEnd.toISOString(),
      hit_count: 1,
    });
  } catch (err) {
    log.warn("rate_limit.insert_error", { name: (err as Error).name });
  }

  return { ok: true };
}
