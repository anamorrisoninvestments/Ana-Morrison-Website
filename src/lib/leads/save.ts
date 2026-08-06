import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseServer, isMissingTableError } from "@/lib/supabase-server";
import { log } from "@/lib/log";
import { hashEmail } from "@/lib/hash";
import type { LeadPayload } from "./schema";

export type SaveLeadResult =
  | { ok: true; id: string; storage: "supabase" | "email-fallback"; deduped: boolean }
  | { ok: false; error: "internal_error" };

/**
 * Wrapper de producción: resuelve el cliente Supabase de la env y delega
 * a saveLeadWithClient para permitir testing con clientes inyectados.
 */
export async function saveLead(input: LeadPayload): Promise<SaveLeadResult> {
  const supabase = getSupabaseServer();
  return saveLeadWithClient(supabase, input);
}

/**
 * Lógica principal. Recibe el cliente Supabase (o null) por inyección
 * para poder testear con mocks sin depender de process.env.
 *
 * Contrato:
 * - Lead válido → 1 INSERT en leads + 1 INSERT en lead_events (form_submitted)
 * - Dedup (mismo email+source en 5 min) → 0 inserts, devuelve id existente
 * - Si falla el insert del event → DELETE compensatorio del lead + error
 * - Nunca oculta errores como éxito
 * - Payload del event sin PII (solo source, interest, dedup)
 */
export async function saveLeadWithClient(
  supabase: SupabaseClient | null,
  input: LeadPayload,
): Promise<SaveLeadResult> {

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
    // 1) Dedup: mismo (email + source) en últimos 5 min → devuelve mismo id
    //    sin crear evento adicional. El evento del submit original cubre este caso.
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
      log.info("saveLead.dedup_hit", { id: existing.id, source, emailHash: hashEmail(email) });
      return { ok: true, id: existing.id, storage: "supabase", deduped: true };
    }

    // 2) Insert lead
    const { data, error } = await supabase
      .from("leads")
      .insert(row)
      .select("id")
      .single();

    if (error) {
      if (isMissingTableError(error)) {
        log.warn("saveLead.table_missing_fallback", { emailHash: hashEmail(email) });
        return { ok: true, id: "email-fallback", storage: "email-fallback", deduped: false };
      }
      log.error("saveLead.insert_error", { code: error.code });
      return { ok: false, error: "internal_error" };
    }

    const leadId = data.id;

    // 3) Insert event de forma AWAITED y atómica.
    //    Sin PII: solo source, interest, dedup. Nada de name/email/whatsapp.
    const { error: evErr } = await supabase
      .from("lead_events")
      .insert({
        lead_id: leadId,
        type: "form_submitted",
        payload: { source, interest, dedup: false },
      });

    if (evErr) {
      // Compensación: DELETE del lead para evitar orfandad. Responder error.
      log.error("saveLead.event_insert_error_compensating", {
        leadId,
        code: evErr.code,
        emailHash: hashEmail(email),
      });
      const { error: delErr } = await supabase.from("leads").delete().eq("id", leadId);
      if (delErr) {
        // Compensación falló. Estado inconsistente conocido — nunca lo ocultamos.
        log.error("saveLead.compensating_delete_failed", {
          leadId,
          eventCode: evErr.code,
          deleteCode: delErr.code,
        });
      }
      return { ok: false, error: "internal_error" };
    }

    log.info("saveLead.ok", { id: leadId, source, emailHash: hashEmail(email) });
    return { ok: true, id: leadId, storage: "supabase", deduped: false };
  } catch (err) {
    log.error("saveLead.exception", { name: (err as Error).name });
    return { ok: false, error: "internal_error" };
  }
}
