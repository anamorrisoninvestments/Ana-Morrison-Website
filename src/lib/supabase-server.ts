import "server-only";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Cliente Supabase con service_role_key. ÚNICAMENTE server-side.
// - Import 'server-only' garantiza error de build si se importa desde cliente.
// - Nunca uses este módulo en componentes React ni en código bajo /app/**/*.client.tsx.

let cached: SupabaseClient | null = null;

/**
 * Cliente server-side de Supabase (service_role). Devuelve null si faltan
 * env vars — el consumidor debe manejar el fallback (guardar por email, etc.).
 */
export function getSupabaseServer(): SupabaseClient | null {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return null;
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { "x-application": "anamorrison-website" } },
  });
  return cached;
}

export type PostgrestErrorLike = { code?: string; message?: string };

// Error codes que indican "la tabla no existe" — usado para fallback safe.
export function isMissingTableError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const e = err as PostgrestErrorLike;
  // Postgres: 42P01 = undefined_table. PostgREST envuelve como PGRST205 en algunos casos.
  return e.code === "42P01" || e.code === "PGRST205";
}
