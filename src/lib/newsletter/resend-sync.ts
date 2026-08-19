import "server-only";
import { Resend } from "resend";
import { log } from "@/lib/log";

// Resend Contacts + Segments model (current, per resend-node v6.12.3).
//
// Contacts are GLOBAL to the workspace. Segment membership determines which
// Broadcasts a contact receives. We use one segment per locale.
//
// Legacy Audience-based API removed. `RESEND_NEWSLETTER_AUDIENCE_ID*` env
// variables replaced with `RESEND_NEWSLETTER_SEGMENT_ID_ES` and
// `RESEND_NEWSLETTER_SEGMENT_ID_EN`.

export type Locale = "es" | "en";

function segmentIdFor(locale: Locale): string | null {
  return locale === "en"
    ? process.env.RESEND_NEWSLETTER_SEGMENT_ID_EN || null
    : process.env.RESEND_NEWSLETTER_SEGMENT_ID_ES || null;
}

function otherSegmentId(locale: Locale): string | null {
  return segmentIdFor(locale === "en" ? "es" : "en");
}

export type SyncContactInput = {
  email: string;
  name?: string | null;
  locale: Locale;
};

export type SyncContactResult =
  | { ok: true; contactId: string | null; segmentId: string; skipped?: false }
  | { ok: true; skipped: true; reason: "no_segment_configured" | "no_api_key" }
  | { ok: false; segmentId: string | null; error: string };

// Idempotent create-or-attach:
//   1. Try `contacts.create` with `segments: [{ id: segmentId }]`.
//      - If contact does not exist yet → creates + attaches in one call.
//      - If contact already exists → Resend returns "already exists" error.
//   2. On "already exists": call `contacts.segments.add({ email, segmentId })`
//      to ensure the segment is attached (add is idempotent).
//   3. Best-effort: `contacts.segments.remove` from the OTHER locale segment
//      (deterministic locale change). Errors ignored — the primary segment
//      assignment is the important one.
//
// Never throws. Returns rich result so caller can persist Resend state.
export async function syncContactToResend(input: SyncContactInput): Promise<SyncContactResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === "re_placeholder") {
    return { ok: true, skipped: true, reason: "no_api_key" };
  }
  const segmentId = segmentIdFor(input.locale);
  if (!segmentId) {
    return { ok: true, skipped: true, reason: "no_segment_configured" };
  }

  const resend = new Resend(apiKey);
  const firstName = (input.name ?? "").trim().split(/\s+/)[0] || undefined;
  const email = input.email.trim().toLowerCase();

  let contactId: string | null = null;

  try {
    const { data, error } = await resend.contacts.create({
      email,
      firstName,
      unsubscribed: false,
      segments: [{ id: segmentId }],
    });

    if (error) {
      const message = (error as { message?: string }).message ?? "unknown_error";
      if (/already\s+exists/i.test(message)) {
        // Contact exists globally. Ensure segment membership.
        const add = await resend.contacts.segments.add({ email, segmentId });
        if (add.error) {
          const addMsg = (add.error as { message?: string }).message ?? "unknown_error";
          if (!/already\s+in\s+segment|already\s+exists/i.test(addMsg)) {
            log.warn("newsletter.resend_segment_add_error", { message: addMsg.slice(0, 200) });
            return { ok: false, segmentId, error: `segment_add:${addMsg}` };
          }
        }
        contactId = null; // we didn't get an id from create; that's fine
      } else {
        log.warn("newsletter.resend_contact_error", { message: message.slice(0, 200) });
        return { ok: false, segmentId, error: message };
      }
    } else {
      contactId = (data?.id as string) ?? null;
    }
  } catch (err) {
    return { ok: false, segmentId, error: (err as Error).message ?? "exception" };
  }

  // Deterministic locale change: remove from OTHER locale's segment if configured.
  // Best-effort only — do not fail the primary sync on this.
  const other = otherSegmentId(input.locale);
  if (other && other !== segmentId) {
    try {
      await resend.contacts.segments.remove({ email, segmentId: other });
    } catch (err) {
      log.warn("newsletter.resend_other_segment_remove_exception", { name: (err as Error).name });
    }
  }

  return { ok: true, contactId, segmentId };
}

// Newsletter unsubscribe: remove contact from the newsletter Segment ONLY.
// Do NOT call `contacts.update({ unsubscribed: true })` — that would set the
// global unsubscribed flag on the Contact and prevent them from ever receiving
// any future Resend marketing program from this workspace, which is broader
// than the user actually opted out of.
export type UnsubscribeContactInput = { email: string; locale: Locale };
export async function unsubscribeContactInResend(input: UnsubscribeContactInput): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === "re_placeholder") return { ok: true };
  const segmentId = segmentIdFor(input.locale);
  if (!segmentId) return { ok: true };

  const resend = new Resend(apiKey);
  const email = input.email.trim().toLowerCase();
  try {
    const { error } = await resend.contacts.segments.remove({ email, segmentId });
    if (error) {
      const message = (error as { message?: string }).message ?? "unknown_error";
      // "Not in segment" or "not found" is not a failure for unsubscribe semantics.
      if (/not\s+in\s+segment|not\s+found/i.test(message)) return { ok: true };
      return { ok: false, error: message };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message ?? "exception" };
  }
}
