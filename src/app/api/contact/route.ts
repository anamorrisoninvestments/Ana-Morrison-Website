import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { CLIENT } from "@/lib/client-data";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || "re_placeholder");
}

function escape(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      whatsapp,
      message,
      interest,
      interestLabel,
      // Legacy compatibility
      company,
      consultType,
      // STR fields
      location,
      propertyType,
      bedrooms,
      platform,
      monthlyIncome,
      startDate,
      // Tax Deed fields
      experience,
      capital,
      timeframe,
      // Interview fields
      eventType,
      eventDate,
    } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ message: "Faltan campos requeridos." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: "Email inválido." }, { status: 400 });
    }

    if (String(message).length > 3000) {
      return NextResponse.json({ message: "Mensaje demasiado largo." }, { status: 400 });
    }

    const tag = interestLabel || consultType || "Consulta general";

    const rows: { label: string; value: string; link?: string; linkColor?: string }[] = [
      { label: "Nombre", value: escape(name) },
      { label: "Email", value: escape(email), link: `mailto:${email}`, linkColor: "#22AEEF" },
    ];
    if (whatsapp)
      rows.push({
        label: "WhatsApp",
        value: escape(whatsapp),
        link: `https://wa.me/${String(whatsapp).replace(/\D/g, "")}`,
        linkColor: "#25D366",
      });
    if (company) rows.push({ label: "Empresa", value: escape(company) });
    if (location) rows.push({ label: "Ciudad / Ubicación", value: escape(location) });
    if (propertyType) rows.push({ label: "Tipo de propiedad", value: escape(propertyType) });
    if (bedrooms) rows.push({ label: "Habitaciones", value: escape(bedrooms) });
    if (platform) rows.push({ label: "Plataforma actual", value: escape(platform) });
    if (monthlyIncome) rows.push({ label: "Ingreso mensual", value: escape(monthlyIncome) });
    if (startDate) rows.push({ label: "Fecha estimada", value: escape(startDate) });
    if (experience) rows.push({ label: "Experiencia previa", value: escape(experience) });
    if (capital) rows.push({ label: "Capital destinado", value: escape(capital) });
    if (timeframe) rows.push({ label: "Plazo estimado", value: escape(timeframe) });
    if (eventType) rows.push({ label: "Tipo de evento", value: escape(eventType) });
    if (eventDate) rows.push({ label: "Fecha del evento", value: escape(eventDate) });

    const rowsHtml = rows
      .map((r) =>
        r.link
          ? `<div class="label">${r.label}</div><div class="value"><a href="${r.link}" style="color:${r.linkColor}">${r.value}</a></div>`
          : `<div class="label">${r.label}</div><div class="value">${r.value}</div>`,
      )
      .join("");

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
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
</style></head><body><div class="container">
<div class="header"><div class="logo">Ana Morrison · Nuevo Lead</div></div>
<div class="content"><div class="tag">${escape(tag)}</div><br><br>${rowsHtml}
<div class="label">Mensaje</div>
<div class="message-box">${escape(message).replace(/\n/g, "<br>")}</div>
</div>
<div class="footer">Lead recibido desde anamorrison.com · ${new Date().toLocaleString("es-US", { timeZone: "America/New_York" })}${
      interest ? ` · Interés: ${escape(interest)}` : ""
    }</div>
</div></body></html>`;

    await getResend().emails.send({
      from: "Ana Morrison <noreply@anamorrison.com>",
      to: CLIENT.email,
      replyTo: email,
      subject: `[Lead] ${tag} — ${name}`,
      html,
    });

    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ message: "Error interno. Intenta de nuevo." }, { status: 500 });
  }
}
