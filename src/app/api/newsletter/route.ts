import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { CLIENT } from "@/lib/client-data";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || "re_placeholder");
}

const MAX_EMAIL_LENGTH = 254;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, leadMagnet } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ message: "Email requerido." }, { status: 400 });
    }
    if (email.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ message: "Email inválido." }, { status: 400 });
    }

    const resend = getResend();

    // Notification to Ana
    await resend.emails.send({
      from: "AnaMaria Morrison <noreply@anamorrison.com>",
      to: CLIENT.email,
      subject: `[Newsletter] Nueva suscripción${leadMagnet ? ` — ${leadMagnet}` : ""}`,
      html: `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:Georgia,serif;background:#000;color:#F7F3EC;margin:0;padding:32px;">
<div style="max-width:500px;margin:0 auto;background:#111;padding:32px;border:1px solid #C8A45D22;">
<div style="color:#C8A45D;font-size:13px;letter-spacing:3px;text-transform:uppercase;margin-bottom:24px;">Nueva Suscripción</div>
${name ? `<div style="color:#888;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;">Nombre</div><div style="margin-bottom:16px;">${name}</div>` : ""}
<div style="color:#888;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;">Email</div>
<div style="margin-bottom:16px;"><a href="mailto:${email}" style="color:#22AEEF">${email}</a></div>
${leadMagnet ? `<div style="color:#888;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;">Lead Magnet</div><div style="background:#C8A45D22;color:#C8A45D;padding:6px 12px;display:inline-block;">${leadMagnet}</div>` : ""}
<div style="color:#555;font-size:12px;margin-top:24px;">Recibido el ${new Date().toLocaleString("es-US", { timeZone: "America/New_York" })}</div>
</div></body></html>`,
    });

    // Welcome email to subscriber
    const welcomeHtml = buildWelcomeEmail(name || email.split("@")[0], leadMagnet);
    await resend.emails.send({
      from: "AnaMaria Morrison <ana@anamorrison.com>",
      to: email,
      subject: leadMagnet
        ? `¡Tu guía gratuita está aquí! 🎯 — ${leadMagnet}`
        : "Bienvenida a la comunidad de The Host Circle",
      html: welcomeHtml,
    });

    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (err) {
    console.error("Newsletter error:", err);
    return NextResponse.json({ message: "Error interno. Intenta de nuevo." }, { status: 500 });
  }
}

function buildWelcomeEmail(name: string, leadMagnet?: string): string {
  const isGuia = leadMagnet?.toLowerCase().includes("guía") || leadMagnet?.toLowerCase().includes("guia") || leadMagnet?.toLowerCase().includes("ruta");

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
body{font-family:Georgia,serif;background:#000;color:#F7F3EC;margin:0;padding:0}
.wrap{max-width:600px;margin:0 auto;background:#0a0a0a}
.header{background:#000;padding:40px 32px;border-bottom:1px solid #C8A45D}
.logo{color:#C8A45D;font-size:13px;letter-spacing:4px;text-transform:uppercase}
.content{padding:40px 32px}
h1{color:#F7F3EC;font-size:28px;font-weight:400;line-height:1.3;margin:0 0 24px}
p{color:#ccc;line-height:1.8;margin:0 0 18px;font-size:15px}
.highlight{color:#F7F3EC}
.cta{display:inline-block;background:#C8A45D;color:#000;padding:14px 32px;text-decoration:none;font-size:13px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;margin:8px 0}
.divider{height:1px;background:linear-gradient(90deg,transparent,#C8A45D44,transparent);margin:32px 0}
.footer{padding:24px 32px;border-top:1px solid #1a1a1a;color:#555;font-size:12px;line-height:1.6}
.social{color:#C8A45D;text-decoration:none}
</style></head>
<body>
<div class="wrap">
  <div class="header">
    <div class="logo">Ana Morrison · The Host Circle</div>
  </div>
  <div class="content">
    <h1>Hola, <span style="color:#C8A45D">${name}</span>.</h1>
    ${isGuia ? `
    <p>¡Gracias por unirte a la comunidad de The Host Circle! Tu guía <strong class="highlight">"Las 5 Rutas Hacia la Riqueza con el Alquiler a Corto Plazo"</strong> está lista para ti.</p>
    <p>En esta guía encontrarás las estrategias exactas que yo usé para construir un portafolio inmobiliario rentable: desde co-hosting hasta la compra de propiedades propias, pasando por el arbitraje y el co-living.</p>
    <div style="background:#111;border:1px solid #C8A45D44;padding:24px;margin:24px 0">
      <div style="color:#C8A45D;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin-bottom:12px">Las 5 Rutas</div>
      <div style="color:#F7F3EC;margin-bottom:8px">① Co-Hosting — administra sin ser dueña</div>
      <div style="color:#F7F3EC;margin-bottom:8px">② Co-Living — maximiza espacios grandes</div>
      <div style="color:#F7F3EC;margin-bottom:8px">③ Arbitraje — renta larga, subarrienda corta</div>
      <div style="color:#F7F3EC;margin-bottom:8px">④ Compra — tu propio activo</div>
      <div style="color:#F7F3EC">⑤ Construcción — de cero al diseño ideal</div>
    </div>
    <p>Te estaré enviando contenido exclusivo, estrategias y oportunidades que no comparto en redes. Esta comunidad es pequeña e intencional — me alegra que estés aquí.</p>
    ` : `
    <p>Me alegra tenerte en esta comunidad. Aquí comparto estrategias reales de inversión inmobiliaria, alquiler a corto plazo, tax deeds y libertad financiera.</p>
    <p>No es contenido genérico. Es lo que yo aplico en mi portafolio y lo que enseño a mis clientes. Construido desde la experiencia de <strong class="highlight">9+ años en el mercado</strong>.</p>
    `}
    <div class="divider"></div>
    <p style="font-size:14px;color:#888">¿Tienes una propiedad o estás pensando en tu primera inversión? Hablemos:</p>
    <a href="https://anamorrison.com/contacto" class="cta">Conversemos →</a>
    <div class="divider"></div>
    <p>Con propósito,</p>
    <p style="color:#C8A45D;font-size:17px">AnaMaria Morrison</p>
    <p style="color:#666;font-size:13px">Fundadora · The Host Circle</p>
  </div>
  <div class="footer">
    Sígueme en
    <a href="https://instagram.com/anamariamofficial" class="social">Instagram</a> ·
    <a href="https://facebook.com/anamariamofficial" class="social">Facebook</a> ·
    <a href="https://tiktok.com/@anamariamofficial" class="social">TikTok</a>
    <br><br>
    Estás recibiendo este email porque te suscribiste en anamorrison.com.<br>
    <a href="#" style="color:#555">Cancelar suscripción</a>
  </div>
</div>
</body></html>`;
}
