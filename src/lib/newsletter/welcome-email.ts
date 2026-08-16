import "server-only";
import { Resend } from "resend";
import { CLIENT } from "@/lib/client-data";
import { log } from "@/lib/log";

export type SendWelcomeInput = {
  email: string;
  name?: string | null;
  locale: "es" | "en";
  leadMagnet?: string | null;
  unsubscribeUrl: string;
};

export type SendWelcomeResult = { ok: true; skipped?: boolean; id?: string } | { ok: false; error: string };

const FROM_DEFAULT = process.env.NEWSLETTER_FROM_EMAIL || "noreply@anamorrison.com";
const FROM_NAME = "AnaMaría Morrison";

export async function sendWelcomeEmail(input: SendWelcomeInput): Promise<SendWelcomeResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === "re_placeholder") {
    log.warn("newsletter.welcome.skipped_no_api_key");
    return { ok: true, skipped: true };
  }

  const resend = new Resend(apiKey);
  const subject = input.locale === "en"
    ? "Welcome to AnaMaría Morrison's Community"
    : "Bienvenida a la comunidad de AnaMaría Morrison";
  const html = buildWelcomeHtml(input);

  try {
    const { data, error } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_DEFAULT}>`,
      to: input.email,
      subject,
      html,
      headers: {
        "List-Unsubscribe": `<${input.unsubscribeUrl}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    });
    if (error) {
      const message = (error as { message?: string }).message ?? "unknown_error";
      log.warn("newsletter.welcome.resend_error", { message: message.slice(0, 200) });
      return { ok: false, error: message };
    }
    return { ok: true, id: (data?.id as string) ?? undefined };
  } catch (err) {
    return { ok: false, error: (err as Error).message ?? "exception" };
  }
}

export async function sendInternalNotification(input: { email: string; name?: string | null; locale: "es" | "en"; leadMagnet?: string | null; created: boolean; resubscribed: boolean; }): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === "re_placeholder") return;
  const resend = new Resend(apiKey);
  const tag = input.resubscribed ? "Re-suscripción" : input.created ? "Nueva suscripción" : "Actualización";
  try {
    await resend.emails.send({
      from: `${FROM_NAME} <${FROM_DEFAULT}>`,
      to: CLIENT.email,
      subject: `[Newsletter · ${input.locale.toUpperCase()}] ${tag}${input.leadMagnet ? ` — ${input.leadMagnet}` : ""}`,
      html: `<div style="font-family:Georgia,serif;background:#000;color:#F7F3EC;padding:24px">
        <div style="color:#C8A45D;font-size:13px;letter-spacing:3px;text-transform:uppercase;margin-bottom:24px">${tag} · ${input.locale === "en" ? "English" : "Español"}</div>
        <div style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:2px">Email</div>
        <div style="margin-bottom:16px"><a href="mailto:${esc(input.email)}" style="color:#22AEEF">${esc(input.email)}</a></div>
        ${input.name ? `<div style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:2px">Name</div><div style="margin-bottom:16px">${esc(input.name)}</div>` : ""}
        ${input.leadMagnet ? `<div style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:2px">Lead magnet</div><div style="margin-bottom:16px">${esc(input.leadMagnet)}</div>` : ""}
      </div>`,
    });
  } catch (err) {
    log.warn("newsletter.internal_notif_error", { name: (err as Error).name });
  }
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function buildWelcomeHtml(input: SendWelcomeInput): string {
  const firstName = (input.name ?? input.email.split("@")[0]).trim();
  if (input.locale === "en") return buildEN(firstName, input.unsubscribeUrl);
  return buildES(firstName, input.unsubscribeUrl);
}

const STYLES = `body{font-family:Georgia,serif;background:#000;color:#F7F3EC;margin:0;padding:0}
.wrap{max-width:600px;margin:0 auto;background:#0a0a0a}
.hdr{background:#000;padding:40px 32px;border-bottom:1px solid #C8A45D}
.logo{color:#C8A45D;font-size:13px;letter-spacing:4px;text-transform:uppercase}
.content{padding:40px 32px}
h1{color:#F7F3EC;font-size:28px;font-weight:400;line-height:1.3;margin:0 0 24px}
p{color:#ccc;line-height:1.8;margin:0 0 18px;font-size:15px}
.hl{color:#F7F3EC}
.cta{display:inline-block;background:#C8A45D;color:#000;padding:14px 32px;text-decoration:none;font-size:13px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;margin:8px 0}
.div{height:1px;background:linear-gradient(90deg,transparent,#C8A45D44,transparent);margin:32px 0}
.foot{padding:24px 32px;border-top:1px solid #1a1a1a;color:#666;font-size:12px;line-height:1.6}
.foot a{color:#888;text-decoration:underline}`;

function buildES(firstName: string, unsubUrl: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${STYLES}</style></head>
<body><div class="wrap">
<div class="hdr"><div class="logo">AnaMaría Morrison · The Host Circle</div></div>
<div class="content">
<h1>Bienvenida, <span style="color:#C8A45D">${esc(firstName)}</span>.</h1>
<p>Me alegra tenerte en esta comunidad. Aquí comparto contenido práctico sobre estrategia inmobiliaria, alquiler a corto plazo, educación Tax Deed e inversión y construcción de patrimonio.</p>
<p>No es contenido genérico: es lo que aplico en mi propio portafolio y lo que trabajo con mis clientes. Sin promesas de ingresos, sin fórmulas mágicas. Estrategia, sistemas y decisiones informadas.</p>
<div style="background:#111;border:1px solid #C8A45D44;padding:24px;margin:24px 0">
<div style="color:#C8A45D;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin-bottom:12px">Lo que puedes esperar</div>
<div class="hl" style="margin-bottom:8px">◆ Estrategias reales de alquiler a corto plazo</div>
<div class="hl" style="margin-bottom:8px">◆ Educación práctica sobre Tax Deed y análisis de títulos</div>
<div class="hl" style="margin-bottom:8px">◆ Marcos de decisión para inversión inmobiliaria</div>
<div class="hl">◆ Perspectivas sobre construcción de patrimonio a largo plazo</div>
</div>
<p style="font-size:14px;color:#888">¿Tienes una propiedad o estás evaluando una oportunidad específica? Podemos conversar:</p>
<a href="https://anamorrison.com/contacto" class="cta">Conversemos →</a>
<div class="div"></div>
<p>Con propósito,</p>
<p style="color:#C8A45D;font-size:17px">AnaMaría Morrison</p>
<p style="color:#666;font-size:13px">Fundadora · The Host Circle</p>
</div>
<div class="foot">
Recibes este email porque te suscribiste en anamorrison.com.<br>
<a href="${unsubUrl}">Cancelar suscripción</a> · <a href="https://anamorrison.com/politica-de-privacidad">Política de privacidad</a>
</div>
</div></body></html>`;
}

function buildEN(firstName: string, unsubUrl: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${STYLES}</style></head>
<body><div class="wrap">
<div class="hdr"><div class="logo">AnaMaría Morrison · The Host Circle</div></div>
<div class="content">
<h1>Welcome, <span style="color:#C8A45D">${esc(firstName)}</span>.</h1>
<p>I'm glad to have you in this community. Here I share practical content on real estate strategy, short-term rentals, Tax Deed education, and investing and wealth-building.</p>
<p>Not generic content — this is what I apply in my own portfolio and what I work on with my clients. No income promises, no magic formulas. Strategy, systems, and informed decisions.</p>
<div style="background:#111;border:1px solid #C8A45D44;padding:24px;margin:24px 0">
<div style="color:#C8A45D;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin-bottom:12px">What to expect</div>
<div class="hl" style="margin-bottom:8px">◆ Real short-term rental strategy</div>
<div class="hl" style="margin-bottom:8px">◆ Practical Tax Deed and title-analysis education</div>
<div class="hl" style="margin-bottom:8px">◆ Decision frameworks for real estate investing</div>
<div class="hl">◆ Perspectives on long-term wealth-building</div>
</div>
<p style="font-size:14px;color:#888">Have a property or evaluating a specific opportunity? Let's talk:</p>
<a href="https://anamorrison.com/en/contact" class="cta">Book a conversation →</a>
<div class="div"></div>
<p>With purpose,</p>
<p style="color:#C8A45D;font-size:17px">AnaMaría Morrison</p>
<p style="color:#666;font-size:13px">Founder · The Host Circle</p>
</div>
<div class="foot">
You're receiving this email because you subscribed at anamorrison.com.<br>
<a href="${unsubUrl}">Unsubscribe</a> · <a href="https://anamorrison.com/en/privacy-policy">Privacy Policy</a>
</div>
</div></body></html>`;
}
