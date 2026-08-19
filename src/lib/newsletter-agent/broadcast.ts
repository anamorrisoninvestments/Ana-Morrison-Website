import "server-only";
import { Resend } from "resend";
import { getSupabaseServer } from "@/lib/supabase-server";
import { log } from "@/lib/log";

// Create a Resend Broadcast per language and mark the edition as sent.
// Only invoked when NEWSLETTER_AUTO_SEND=true. Never called during preview or
// production_generate modes. Never sends to individual contacts one-by-one.
//
// Uses the current Resend Broadcasts API with `segmentId` targeting. The
// deprecated `audienceId` field is not used.

export type BroadcastOptions = {
  editionId: string;
  subjectES: string;
  subjectEN: string;
  contentES: string;   // HTML
  contentEN: string;   // HTML
  segmentIdES: string | null;
  segmentIdEN: string | null;
  fromEmail: string;   // e.g. "noreply@anamorrison.com"
  fromName: string;    // "AnaMaría Morrison"
  autoSend: boolean;   // when false, only creates the drafts
};

export type BroadcastResult = {
  ok: boolean;
  broadcastIdES: string | null;
  broadcastIdEN: string | null;
  error?: string;
  sent: boolean;
};

export async function createAndOptionallySend(opts: BroadcastOptions): Promise<BroadcastResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === "re_placeholder") {
    return { ok: false, broadcastIdES: null, broadcastIdEN: null, error: "no_api_key", sent: false };
  }
  const resend = new Resend(apiKey);
  let idES: string | null = null;
  let idEN: string | null = null;

  try {
    if (opts.segmentIdES) {
      const { data, error } = await resend.broadcasts.create({
        segmentId: opts.segmentIdES,
        from: `${opts.fromName} <${opts.fromEmail}>`,
        subject: opts.subjectES,
        html: opts.contentES,
      });
      if (error) return fail("broadcast_create_es", (error as { message?: string }).message);
      idES = (data?.id as string) ?? null;
    }
    if (opts.segmentIdEN) {
      const { data, error } = await resend.broadcasts.create({
        segmentId: opts.segmentIdEN,
        from: `${opts.fromName} <${opts.fromEmail}>`,
        subject: opts.subjectEN,
        html: opts.contentEN,
      });
      if (error) return fail("broadcast_create_en", (error as { message?: string }).message);
      idEN = (data?.id as string) ?? null;
    }

    let sent = false;
    if (opts.autoSend) {
      if (idES) {
        const { error } = await resend.broadcasts.send(idES);
        if (error) return fail("broadcast_send_es", (error as { message?: string }).message);
      }
      if (idEN) {
        const { error } = await resend.broadcasts.send(idEN);
        if (error) return fail("broadcast_send_en", (error as { message?: string }).message);
      }
      sent = true;
    }

    await persistBroadcastResult({ editionId: opts.editionId, idES, idEN, sent });
    return { ok: true, broadcastIdES: idES, broadcastIdEN: idEN, sent };
  } catch (err) {
    return fail("broadcast_exception", (err as Error).message);
  }
}

function fail(kind: string, message?: string): BroadcastResult {
  log.warn("newsletter.broadcast.failure", { kind, message: message?.slice(0, 200) });
  return { ok: false, broadcastIdES: null, broadcastIdEN: null, error: `${kind}:${message ?? ""}`, sent: false };
}

async function persistBroadcastResult(input: { editionId: string; idES: string | null; idEN: string | null; sent: boolean }): Promise<void> {
  const supabase = getSupabaseServer();
  if (!supabase) return;
  await supabase.from("newsletter_editions").update({
    broadcast_id_es: input.idES,
    broadcast_id_en: input.idEN,
    status: input.sent ? "sent" : "approved",
    sent_at: input.sent ? new Date().toISOString() : null,
  }).eq("id", input.editionId);
}
