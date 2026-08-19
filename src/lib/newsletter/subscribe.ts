import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseServer, isMissingTableError } from "@/lib/supabase-server";
import { log } from "@/lib/log";

export type SubscribeInput = {
  email: string;
  name?: string | null;
  locale: "es" | "en";
  source?: string;
  leadMagnet?: string | null;
  landingUrl?: string | null;
  referrer?: string | null;
  consentVersion?: string | null;
  ipHash?: string | null;
};

export type SubscribeResult =
  | { ok: true; id: string; email: string; locale: "es" | "en"; created: boolean; alreadySubscribed: boolean; resubscribed: boolean; welcomeShouldSend: boolean; unsubscribeToken: string | null; storage: "supabase" | "email-only-fallback" }
  | { ok: false; error: "internal_error" | "storage_unavailable" };

// UPSERT by lower(email). Idempotent.
// - New row → created=true, welcomeShouldSend=true
// - Existing active → alreadySubscribed=true, welcomeShouldSend=false
// - Existing unsubscribed → resubscribed=true, welcomeShouldSend=true (re-onboarding)
export async function subscribeNewsletter(input: SubscribeInput): Promise<SubscribeResult> {
  return subscribeNewsletterWithClient(getSupabaseServer(), input);
}

export async function subscribeNewsletterWithClient(
  supabase: SupabaseClient | null,
  input: SubscribeInput,
): Promise<SubscribeResult> {
  const email = input.email.trim().toLowerCase();
  if (!supabase) {
    log.warn("newsletter.no_supabase_client");
    // Fallback: return synthetic success so the endpoint can still email.
    return {
      ok: true,
      id: "email-only-fallback",
      email,
      locale: input.locale,
      created: true,
      alreadySubscribed: false,
      resubscribed: false,
      welcomeShouldSend: true,
      unsubscribeToken: null,
      storage: "email-only-fallback",
    };
  }

  try {
    // Look up existing (case-insensitive via generated email_lower)
    const { data: existing, error: selectErr } = await supabase
      .from("newsletter_subscribers")
      .select("id, status, welcome_sent_at, unsubscribe_token, locale")
      .eq("email_lower", email)
      .maybeSingle();

    if (selectErr && !isMissingTableError(selectErr)) {
      log.warn("newsletter.select_error", { code: selectErr.code });
      return { ok: false, error: "internal_error" };
    }
    if (selectErr && isMissingTableError(selectErr)) {
      log.warn("newsletter.missing_table");
      return { ok: false, error: "storage_unavailable" };
    }

    if (existing) {
      const wasUnsubscribed = existing.status === "unsubscribed";
      const patch: Record<string, unknown> = {
        name: input.name ?? undefined,
        locale: input.locale,
        source: input.source ?? "newsletter_form",
        lead_magnet: input.leadMagnet ?? null,
        landing_url: input.landingUrl ?? null,
        referrer: input.referrer ?? null,
        consent_marketing: true,
        consent_version: input.consentVersion ?? null,
        ip_hash: input.ipHash ?? null,
      };
      if (wasUnsubscribed) {
        patch.status = "active";
        patch.unsubscribed_at = null;
      }
      // Only overwrite explicit fields
      const cleanedPatch = Object.fromEntries(
        Object.entries(patch).filter(([, v]) => v !== undefined),
      );
      const { error: updErr } = await supabase
        .from("newsletter_subscribers")
        .update(cleanedPatch)
        .eq("id", existing.id);
      if (updErr) {
        log.warn("newsletter.update_error", { code: updErr.code });
        return { ok: false, error: "internal_error" };
      }

      return {
        ok: true,
        id: existing.id as string,
        email,
        locale: input.locale,
        created: false,
        alreadySubscribed: !wasUnsubscribed,
        resubscribed: wasUnsubscribed,
        welcomeShouldSend: wasUnsubscribed || !existing.welcome_sent_at,
        unsubscribeToken: (existing.unsubscribe_token as string) ?? null,
        storage: "supabase",
      };
    }

    // Insert new
    const { data: inserted, error: insErr } = await supabase
      .from("newsletter_subscribers")
      .insert({
        email,
        name: input.name ?? null,
        locale: input.locale,
        source: input.source ?? "newsletter_form",
        lead_magnet: input.leadMagnet ?? null,
        landing_url: input.landingUrl ?? null,
        referrer: input.referrer ?? null,
        consent_marketing: true,
        consent_version: input.consentVersion ?? null,
        ip_hash: input.ipHash ?? null,
        status: "active",
      })
      .select("id, unsubscribe_token")
      .single();

    if (insErr || !inserted) {
      log.warn("newsletter.insert_error", { code: insErr?.code });
      return { ok: false, error: "internal_error" };
    }

    return {
      ok: true,
      id: inserted.id as string,
      email,
      locale: input.locale,
      created: true,
      alreadySubscribed: false,
      resubscribed: false,
      welcomeShouldSend: true,
      unsubscribeToken: (inserted.unsubscribe_token as string) ?? null,
      storage: "supabase",
    };
  } catch (err) {
    log.error("newsletter.subscribe.exception", { name: (err as Error).name });
    return { ok: false, error: "internal_error" };
  }
}

export type MarkWelcomeSentInput = { id: string; status: string; error?: string };
export async function markWelcomeSent(input: MarkWelcomeSentInput): Promise<void> {
  const supabase = getSupabaseServer();
  if (!supabase || input.id === "email-only-fallback") return;
  const patch: Record<string, unknown> = {
    welcome_email_status: input.status,
    welcome_sent_at: input.status === "sent" ? new Date().toISOString() : undefined,
  };
  if (input.error) patch.welcome_email_status = `${input.status}: ${input.error.slice(0, 200)}`;
  const clean = Object.fromEntries(Object.entries(patch).filter(([, v]) => v !== undefined));
  await supabase.from("newsletter_subscribers").update(clean).eq("id", input.id);
}

export type MarkResendSyncedInput = {
  id: string;
  contactId?: string | null;
  segmentId?: string | null;
  error?: string;
};
export async function markResendSynced(input: MarkResendSyncedInput): Promise<void> {
  const supabase = getSupabaseServer();
  if (!supabase || input.id === "email-only-fallback") return;
  // Column name kept for schema stability. Semantically now holds a Segment ID
  // under the current Resend Contacts + Segments model. Existing DB rows that
  // stored an Audience ID from the deprecated API are still valid keys in
  // Resend's backward-compat layer; new rows store Segment IDs.
  await supabase
    .from("newsletter_subscribers")
    .update({
      resend_contact_id: input.contactId ?? null,
      resend_audience_id: input.segmentId ?? null,
      resend_synced_at: new Date().toISOString(),
      resend_last_error: input.error ? input.error.slice(0, 500) : null,
    })
    .eq("id", input.id);
}
