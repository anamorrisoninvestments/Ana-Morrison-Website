import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { getSupabaseServer } from "@/lib/supabase-server";
import { log } from "@/lib/log";
import { CLIENT } from "@/lib/client-data";
import type { LeadPayload } from "@/lib/leads/schema";

export type SendLeadEmailResult =
  | { status: "sent"; resendEmailId: string | null }
  | { status: "failed"; errorName: string; errorCode?: string }
  | { status: "skipped"; reason: "no_api_key" | "no_from_email" | "no_supabase" | "fallback_id" };

/**
 * Cliente Resend inyectable por test. Interfaz mínima para no acoplarse al SDK.
 */
export type ResendLike = {
  emails: {
    send(params: {
      from: string;
      to: string;
      replyTo?: string;
      subject: string;
      html: string;
    }): Promise<{ data: { id: string } | null; error: unknown }>;
  };
};

/**
 * Env vars requeridas para envío de email. Solo server-side.
 */
export type EmailEnv = {
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  CONTACT_NOTIFICATION_EMAIL?: string;
};

function esc(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml(input: { leadId: string; payload: LeadPayload }): string {
  const { leadId, payload } = input;
  const tag = payload.interest || payload.source;

  const rows: [string, string][] = [
    ["Nombre", esc(payload.name)],
    ["Email", `<a href="mailto:${esc(payload.email)}" style="color:#22AEEF">${esc(payload.email)}</a>`],
  ];
  if (payload.whatsapp) {
    const digits = payload.whatsapp.replace(/\D/g, "");
    rows.push([
      "WhatsApp",
      `<a href="https://wa.me/${digits}" style="color:#25D366">${esc(payload.whatsapp)}</a>`,
    ]);
  }
  if (payload.company) rows.push(["Empresa", esc(payload.company)]);
  if (payload.location) rows.push(["Ubicación", esc(payload.location)]);
  if (payload.propertyType) rows.push(["Tipo de propiedad", esc(payload.propertyType)]);
  if (payload.bedrooms) rows.push(["Habitaciones", esc(payload.bedrooms)]);
  if (payload.platform) rows.push(["Plataforma", esc(payload.platform)]);
  if (payload.monthlyIncome) rows.push(["Ingreso mensual", esc(payload.monthlyIncome)]);
  if (payload.startDate) rows.push(["Fecha estimada", esc(payload.startDate)]);
  if (payload.experience) rows.push(["Experiencia", esc(payload.experience)]);
  if (payload.capital) rows.push(["Capital", esc(payload.capital)]);
  if (payload.timeframe) rows.push(["Plazo", esc(payload.timeframe)]);
  if (payload.eventType) rows.push(["Tipo de evento", esc(payload.eventType)]);
  if (payload.eventDate) rows.push(["Fecha del evento", esc(payload.eventDate)]);

  const rowsHtml = rows
    .map(([k, v]) => `<div class="label">${k}</div><div class="value">${v}</div>`)
    .join("");

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
body{font-family:Georgia,serif;background:#000;color:#F7F3EC;margin:0;padding:0}
.c{max-width:600px;margin:0 auto;background:#111}
.h{background:#000;padding:32px;border-bottom:1px solid #C8A45D}
.logo{color:#C8A45D;font-size:20px;font-weight:bold;letter-spacing:3px;text-transform:uppercase}
.b{padding:32px}
.label{color:#888;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px}
.value{color:#F7F3EC;font-size:15px;margin-bottom:18px}
.msg{background:#1a1a1a;border-left:3px solid #C8A45D;padding:16px;margin-top:8px}
.tag{display:inline-block;background:#C8A45D22;color:#C8A45D;padding:4px 10px;font-size:12px;border:1px solid #C8A45D44}
.foot{padding:20px 32px;border-top:1px solid #333;color:#555;font-size:12px}
</style></head><body><div class="c">
<div class="h"><div class="logo">Ana Morrison · Nuevo Lead</div></div>
<div class="b"><div class="tag">${esc(tag)}</div><br><br>${rowsHtml}
<div class="label">Mensaje</div>
<div class="msg">${esc(payload.message).replace(/\n/g, "<br>")}</div>
</div>
<div class="foot">Lead ID: ${esc(leadId)} · Recibido desde anamorrison.com</div>
</div></body></html>`;
}

/**
 * Actualiza email_confirmation_status y registra un lead_event.
 * Devuelve true si Supabase respondió OK, false si falló. Nunca lanza.
 */
async function persistStatus(
  supabase: SupabaseClient | null,
  leadId: string,
  status: "sent" | "failed" | "skipped",
  error: string | null,
): Promise<boolean> {
  if (!supabase) return false;
  if (leadId === "email-fallback") return false;

  try {
    const { error: upErr } = await supabase
      .from("leads")
      .update({ email_confirmation_status: status, email_confirmation_error: error })
      .eq("id", leadId);

    if (upErr) {
      log.error("leadEmail.status_update_failed", { leadId, code: upErr.code });
      return false;
    }

    const eventType =
      status === "sent" ? "email_sent" : status === "failed" ? "email_failed" : "email_skipped";
    const { error: evErr } = await supabase
      .from("lead_events")
      .insert({
        lead_id: leadId,
        type: eventType,
        payload: error ? { error } : {},
      });

    if (evErr) {
      log.error("leadEmail.event_insert_failed", { leadId, code: evErr.code });
      return false;
    }
    return true;
  } catch (err) {
    log.error("leadEmail.persist_exception", { leadId, name: (err as Error).name });
    return false;
  }
}

/**
 * Wrapper de producción. Resuelve deps y delega a sendLeadNotificationWithDeps.
 */
export async function sendLeadNotification(input: {
  leadId: string;
  payload: LeadPayload;
}): Promise<SendLeadEmailResult> {
  const env: EmailEnv = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    CONTACT_NOTIFICATION_EMAIL: process.env.CONTACT_NOTIFICATION_EMAIL,
  };
  const resendFactory: () => ResendLike | null = () => {
    if (!env.RESEND_API_KEY) return null;
    return new Resend(env.RESEND_API_KEY) as unknown as ResendLike;
  };
  const supabase = getSupabaseServer();
  return sendLeadNotificationWithDeps({ ...input, env, resendFactory, supabase });
}

/**
 * Lógica principal testable. Recibe deps por inyección.
 *
 * Contrato:
 * - Sin RESEND_API_KEY o RESEND_FROM_EMAIL → skipped, actualiza status='skipped'
 * - Con Resend OK → sent, actualiza status='sent', log leadEmail.sent
 * - Con Resend error → failed, actualiza status='failed', log leadEmail.failed
 *   con solo errorName, errorCode y leadId. Sin API key, email, PII ni stack.
 * - El lead nunca se borra ni se modifica salvo email_confirmation_status.
 * - Nunca lanza.
 */
export async function sendLeadNotificationWithDeps(input: {
  leadId: string;
  payload: LeadPayload;
  env: EmailEnv;
  resendFactory: () => ResendLike | null;
  supabase: SupabaseClient | null;
}): Promise<SendLeadEmailResult> {
  const { leadId, payload, env, resendFactory, supabase } = input;

  // Guard 1: fallback path (Supabase caído al guardar el lead)
  if (leadId === "email-fallback") {
    log.warn("leadEmail.skipped", { leadId, reason: "fallback_id" });
    return { status: "skipped", reason: "fallback_id" };
  }

  // Guard 2: env vars faltantes → skipped
  if (!env.RESEND_API_KEY) {
    log.info("leadEmail.skipped", { leadId, reason: "no_api_key" });
    await persistStatus(supabase, leadId, "skipped", null);
    return { status: "skipped", reason: "no_api_key" };
  }
  if (!env.RESEND_FROM_EMAIL) {
    log.info("leadEmail.skipped", { leadId, reason: "no_from_email" });
    await persistStatus(supabase, leadId, "skipped", null);
    return { status: "skipped", reason: "no_from_email" };
  }

  const resend = resendFactory();
  if (!resend) {
    log.info("leadEmail.skipped", { leadId, reason: "no_api_key" });
    await persistStatus(supabase, leadId, "skipped", null);
    return { status: "skipped", reason: "no_api_key" };
  }

  const to = env.CONTACT_NOTIFICATION_EMAIL || CLIENT.email;
  const tag = payload.interest || payload.source;

  try {
    const response = await resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to,
      replyTo: payload.email,
      subject: `[Lead] ${tag} — ${payload.name}`,
      html: buildHtml({ leadId, payload }),
    });

    if (response.error) {
      const errObj = response.error as { name?: string; message?: string };
      log.error("leadEmail.failed", {
        leadId,
        errorName: errObj.name || "resend_error",
        errorCode: undefined, // Resend no expone códigos numéricos como Postgres
      });
      await persistStatus(supabase, leadId, "failed", errObj.name || "resend_error");
      return {
        status: "failed",
        errorName: errObj.name || "resend_error",
      };
    }

    const resendEmailId = response.data?.id ?? null;
    log.info("leadEmail.sent", { leadId, resendEmailId });
    await persistStatus(supabase, leadId, "sent", null);
    return { status: "sent", resendEmailId };
  } catch (err) {
    const e = err as Error & { code?: string };
    log.error("leadEmail.failed", {
      leadId,
      errorName: e.name || "exception",
      errorCode: e.code,
    });
    await persistStatus(supabase, leadId, "failed", e.name || "exception");
    return {
      status: "failed",
      errorName: e.name || "exception",
      errorCode: e.code,
    };
  }
}
