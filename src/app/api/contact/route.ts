import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { CLIENT } from "@/lib/client-data";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || "re_placeholder");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, whatsapp, company, consultType, message } = body;

    if (!name || !email || !consultType || !message) {
      return NextResponse.json({ message: "Faltan campos requeridos." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: "Email inválido." }, { status: 400 });
    }

    if (message.length > 3000) {
      return NextResponse.json({ message: "Mensaje demasiado largo." }, { status: 400 });
    }

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
body { font-family: Georgia, serif; background: #000; color: #F7F3EC; margin: 0; padding: 0; }
.container { max-width: 600px; margin: 0 auto; background: #111; }
.header { background: #000; padding: 32px; border-bottom: 1px solid #C8A45D; }
.logo { color: #C8A45D; font-size: 20px; font-weight: bold; letter-spacing: 3px; text-transform: uppercase; }
.content { padding: 32px; }
.label { color: #888; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px; }
.value { color: #F7F3EC; font-size: 15px; margin-bottom: 20px; }
.message-box { background: #1a1a1a; border-left: 3px solid #C8A45D; padding: 16px; margin-top: 8px; }
.footer { padding: 20px 32px; border-top: 1px solid #333; color: #555; font-size: 12px; }
.tag { display: inline-block; background: #C8A45D22; color: #C8A45D; padding: 4px 10px; font-size: 12px; border: 1px solid #C8A45D44; }
</style></head>
<body>
<div class="container">
  <div class="header">
    <div class="logo">Ana Morrison · Nuevo Lead</div>
  </div>
  <div class="content">
    <div class="tag">${consultType}</div>
    <br><br>
    <div class="label">Nombre</div>
    <div class="value">${name}</div>
    <div class="label">Email</div>
    <div class="value"><a href="mailto:${email}" style="color:#22AEEF">${email}</a></div>
    ${whatsapp ? `<div class="label">WhatsApp</div><div class="value"><a href="https://wa.me/${whatsapp.replace(/\D/g, "")}" style="color:#25D366">${whatsapp}</a></div>` : ""}
    ${company ? `<div class="label">Empresa</div><div class="value">${company}</div>` : ""}
    <div class="label">Mensaje</div>
    <div class="message-box">${message.replace(/\n/g, "<br>")}</div>
  </div>
  <div class="footer">Lead recibido desde anamorrison.com · ${new Date().toLocaleString("es-US", { timeZone: "America/New_York" })}</div>
</div>
</body>
</html>`;

    await getResend().emails.send({
      from: "AnaMaria Morrison <noreply@anamorrison.com>",
      to: CLIENT.email,
      replyTo: email,
      subject: `[Nuevo Lead] ${consultType} — ${name}`,
      html,
    });

    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ message: "Error interno. Intenta de nuevo." }, { status: 500 });
  }
}
