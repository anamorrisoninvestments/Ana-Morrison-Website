import "server-only";
import { getResend } from "./resend-client";
import { getSupabaseServer } from "@/lib/supabase-server";
import { log } from "@/lib/log";
import { hashEmail } from "@/lib/hash";
import { CLIENT } from "@/lib/client-data";
import type { LeadPayload } from "@/lib/leads/schema";

function esc(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Envía email de notificación interna a Ana con el detalle del lead.
 * Actualiza `leads.email_confirmation_status` en Supabase con el resultado.
 * Nunca lanza — cualquier fallo se registra y no bloquea la respuesta al cliente.
 */
export async function sendLeadNotification(input: {
  leadId: string;
  payload: LeadPayload;
}): Promise<void> {
  const { leadId, payload } = input;
  const resend = getResend();
  const supabase = getSupabaseServer();

  if (!resend) {
    log.info("sendLeadNotification.skipped_no_resend", { leadId });
    void updateStatus(supabase, leadId, "skipped", null);
    return;
  }

  const to = process.env.CONTACT_NOTIFICATION_EMAIL || CLIENT.email;
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

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
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

  try {
    const { error } = await resend.client.emails.send({
      from: resend.from,
      to,
      replyTo: payload.email,
      subject: `[Lead] ${tag} — ${payload.name}`,
      html,
    });
    if (error) {
      log.error("sendLeadNotification.resend_error", { leadId, code: (error as { name?: string }).name });
      void updateStatus(supabase, leadId, "failed", "resend_error");
      return;
    }
    log.info("sendLeadNotification.ok", { leadId, emailHash: hashEmail(payload.email) });
    void updateStatus(supabase, leadId, "sent", null);
  } catch (err) {
    log.error("sendLeadNotification.exception", { leadId, name: (err as Error).name });
    void updateStatus(supabase, leadId, "failed", "exception");
  }
}

async function updateStatus(
  supabase: ReturnType<typeof getSupabaseServer>,
  leadId: string,
  status: "sent" | "failed" | "skipped",
  error: string | null,
) {
  if (!supabase || leadId === "email-fallback") return;
  await supabase
    .from("leads")
    .update({ email_confirmation_status: status, email_confirmation_error: error })
    .eq("id", leadId);

  await supabase.from("lead_events").insert({
    lead_id: leadId,
    type: status === "sent" ? "email_sent" : status === "failed" ? "email_failed" : "email_skipped",
    payload: error ? { error } : {},
  });
}
