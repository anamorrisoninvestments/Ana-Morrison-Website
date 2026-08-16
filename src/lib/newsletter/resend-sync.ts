import "server-only";
import { Resend } from "resend";
import { log } from "@/lib/log";

// Which Resend audience receives the contact, per locale.
// Both fall back to a single default if the per-locale ones aren't configured.
function audienceIdFor(locale: "es" | "en"): string | null {
  const perLocale = locale === "en"
    ? process.env.RESEND_NEWSLETTER_AUDIENCE_ID_EN
    : process.env.RESEND_NEWSLETTER_AUDIENCE_ID_ES;
  return perLocale || process.env.RESEND_NEWSLETTER_AUDIENCE_ID || null;
}

export type SyncContactInput = {
  email: string;
  name?: string | null;
  locale: "es" | "en";
  unsubscribed?: boolean;
};

export type SyncContactResult =
  | { ok: true; contactId: string | null; audienceId: string; skipped?: false }
  | { ok: true; skipped: true; reason: "no_audience_configured" | "no_api_key" }
  | { ok: false; audienceId: string | null; error: string };

// Best-effort sync to Resend Contacts. Does NOT throw. Failures are logged
// and returned so the caller can persist the last error without failing
// the user's subscription (Supabase is the source of truth).
export async function syncContactToResend(input: SyncContactInput): Promise<SyncContactResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === "re_placeholder") {
    return { ok: true, skipped: true, reason: "no_api_key" };
  }
  const audienceId = audienceIdFor(input.locale);
  if (!audienceId) {
    return { ok: true, skipped: true, reason: "no_audience_configured" };
  }

  const resend = new Resend(apiKey);
  const firstName = (input.name ?? "").trim().split(/\s+/)[0] || undefined;
  try {
    // resend-node v6: contacts.create is idempotent-friendly (upsert by email
    // within an audience). If it errors as "already exists", we swallow.
    const { data, error } = await resend.contacts.create({
      audienceId,
      email: input.email,
      firstName,
      unsubscribed: input.unsubscribed ?? false,
    });
    if (error) {
      const message = (error as { message?: string }).message ?? "unknown_error";
      // "Contact already exists" is not a real error for our purposes.
      if (/already\s+exists/i.test(message)) {
        return { ok: true, contactId: null, audienceId };
      }
      log.warn("newsletter.resend_contact_error", { message: message.slice(0, 200) });
      return { ok: false, audienceId, error: message };
    }
    return { ok: true, contactId: (data?.id as string) ?? null, audienceId };
  } catch (err) {
    const message = (err as Error).message ?? "exception";
    log.warn("newsletter.resend_contact_exception", { name: (err as Error).name });
    return { ok: false, audienceId, error: message };
  }
}

export type UnsubscribeContactInput = { email: string; locale: "es" | "en" };
export async function unsubscribeContactInResend(input: UnsubscribeContactInput): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === "re_placeholder") return { ok: true };
  const audienceId = audienceIdFor(input.locale);
  if (!audienceId) return { ok: true };

  const resend = new Resend(apiKey);
  try {
    const { error } = await resend.contacts.update({
      audienceId,
      email: input.email,
      unsubscribed: true,
    });
    if (error) {
      const message = (error as { message?: string }).message ?? "unknown_error";
      return { ok: false, error: message };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message ?? "exception" };
  }
}
