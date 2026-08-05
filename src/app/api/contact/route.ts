import { NextRequest, NextResponse } from "next/server";
import { saveLead } from "@/lib/leads/save";
import { sendLeadNotification } from "@/lib/email/send-lead-emails";
import { leadPayloadSchema } from "@/lib/leads/schema";
import { log } from "@/lib/log";

/**
 * DEPRECATED: mantiene compatibilidad con el endpoint anterior.
 * Los nuevos formularios llaman a /api/leads.
 * Este stub normaliza el payload legacy y lo reenvía al pipeline nuevo.
 * Se eliminará en un PR posterior tras confirmar que ningún consumidor
 * externo lo usa.
 */
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const CONSENT_VERSION = process.env.NEXT_PUBLIC_CONSENT_VERSION || "v1.0";

    const normalized = {
      source: "contact_form" as const,
      interest: (body.interest || "otro") as string,
      name: String(body.name || ""),
      email: String(body.email || ""),
      whatsapp: body.whatsapp ? String(body.whatsapp) : undefined,
      company: body.company ? String(body.company) : undefined,
      message: String(body.message || ""),
      consent_communications: true, // asumido en el flujo legacy
      consent_marketing: false,
      consent_version: CONSENT_VERSION,
    };

    const parsed = leadPayloadSchema.safeParse(normalized);
    if (!parsed.success) {
      return NextResponse.json({ message: "Faltan campos requeridos." }, { status: 400 });
    }

    const result = await saveLead(parsed.data);
    if (!result.ok) {
      return NextResponse.json({ message: "Error interno." }, { status: 500 });
    }
    try {
      await sendLeadNotification({ leadId: result.id, payload: parsed.data });
    } catch (err) {
      log.error("api.contact.deprecated_stub_email_uncaught", {
        leadId: result.id,
        name: (err as Error).name,
      });
    }
    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (err) {
    log.error("api.contact.deprecated_stub_error", { name: (err as Error).name });
    return NextResponse.json({ message: "Error interno." }, { status: 500 });
  }
}
