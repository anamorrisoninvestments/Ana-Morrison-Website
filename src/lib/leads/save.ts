import "server-only";
import { getSupabaseServer, isMissingTableError } from "@/lib/supabase-server";
import { log } from "@/lib/log";
import { hashEmail } from "@/lib/hash";
import type { LeadPayload } from "./schema";

export type SaveLeadResult =
  | { ok: true; id: string; storage: "supabase" | "email-fallback" }
  | { ok: false; error: "internal_error" };

/**
 * Guarda un lead en Supabase. Si la tabla no existe o Supabase está caído,
 * marca la fila como fallback por email (no la pierde). En PR posterior el
 * fallback se hará por Resend con payload completo.
 */
export async function saveLead(input: LeadPayload): Promise<SaveLeadResult> {
  const supabase = getSupabaseServer();

  // Extraer campos operativos vs payload dinámico
  const {
    source,
    interest,
    name,
    email,
    whatsapp,
    company,
    consent_communications,
    consent_marketing,
    consent_version,
    landing_url,
    referrer,
    utm_source,
    utm_medium,
    utm_campaign,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    hp_website,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    form_started_at,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    session_id,
    ...rest
  } = input;

  const row = {
    source,
    interest,
    name,
    email,
    whatsapp: whatsapp ?? null,
    company: company ?? null,
    payload: rest,
    consent_communications,
    consent_marketing,
    consent_version,
    consent_at: new Date().toISOString(),
    landing_url: landing_url ?? null,
    referrer: referrer ?? null,
    utm_source: utm_source ?? null,
    utm_medium: utm_medium ?? null,
    utm_campaign: utm_campaign ?? null,
  };

  if (!supabase) {
    log.warn("saveLead.no_supabase_client");
    return { ok: false, error: "internal_error" };
  }

  try {
    // 1) Dedup: si mismo email + source ya se envió en los últimos 5 min → devolver el mismo id
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { data: existing } = await supabase
      .from("leads")
      .select("id")
      .eq("email", email)
      .eq("source", source)
      .gte("created_at", fiveMinAgo)
      .limit(1)
      .maybeSingle();

    if (existing?.id) {
      log.info("saveLead.dedup_hit", { emailHash: hashEmail(email), source });
      return { ok: true, id: existing.id, storage: "supabase" };
    }

    // 2) Insert
    const { data, error } = await supabase
      .from("leads")
      .insert(row)
      .select("id")
      .single();

    if (error) {
      if (isMissingTableError(error)) {
        log.warn("saveLead.table_missing_fallback", { emailHash: hashEmail(email) });
        return { ok: true, id: "email-fallback", storage: "email-fallback" };
      }
      log.error("saveLead.insert_error", { code: error.code });
      return { ok: false, error: "internal_error" };
    }

    // 3) Log event
    void supabase
      .from("lead_events")
      .insert({ lead_id: data.id, type: "form_submitted", payload: { source, interest } })
      .then(({ error: evErr }) => {
        if (evErr) log.warn("saveLead.event_insert_error", { code: evErr.code });
      });

    log.info("saveLead.ok", { id: data.id, source, emailHash: hashEmail(email) });
    return { ok: true, id: data.id, storage: "supabase" };
  } catch (err) {
    log.error("saveLead.exception", { name: (err as Error).name });
    return { ok: false, error: "internal_error" };
  }
}
