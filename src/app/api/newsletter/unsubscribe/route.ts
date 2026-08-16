import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";
import { unsubscribeContactInResend } from "@/lib/newsletter/resend-sync";
import { log } from "@/lib/log";

export const runtime = "nodejs";

// GET /api/newsletter/unsubscribe?token=<unsubscribe_token>
// Also accepts POST for one-click (List-Unsubscribe-Post header)
async function handle(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url);
  const token = url.searchParams.get("token")?.trim();
  if (!token || token.length < 16 || token.length > 200) {
    return htmlResponse(400, esFallback("Enlace inválido."));
  }

  const supabase = getSupabaseServer();
  if (!supabase) {
    return htmlResponse(503, esFallback("Servicio temporalmente no disponible."));
  }

  const { data: row, error: selErr } = await supabase
    .from("newsletter_subscribers")
    .select("id, email, locale, status")
    .eq("unsubscribe_token", token)
    .maybeSingle();
  if (selErr || !row) {
    log.warn("api.newsletter.unsubscribe_lookup_failed", { code: selErr?.code });
    return htmlResponse(404, esFallback("No encontramos tu suscripción."));
  }

  const locale: "es" | "en" = row.locale === "en" ? "en" : "es";
  if (row.status !== "unsubscribed") {
    const { error: updErr } = await supabase
      .from("newsletter_subscribers")
      .update({ status: "unsubscribed", unsubscribed_at: new Date().toISOString() })
      .eq("id", row.id);
    if (updErr) {
      log.warn("api.newsletter.unsubscribe_update_failed", { code: updErr.code });
      return htmlResponse(500, esFallback("No pudimos completar la baja. Inténtalo de nuevo."));
    }
    // Best-effort Resend sync
    await unsubscribeContactInResend({ email: row.email as string, locale });
  }

  return htmlResponse(200, successPage(locale));
}

export async function GET(req: NextRequest) { return handle(req); }
export async function POST(req: NextRequest) { return handle(req); }

function htmlResponse(status: number, html: string): NextResponse {
  return new NextResponse(html, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}

function successPage(locale: "es" | "en"): string {
  const title = locale === "en" ? "Unsubscribed" : "Suscripción cancelada";
  const message = locale === "en"
    ? "You have been unsubscribed from the newsletter. You will not receive further marketing emails."
    : "Has cancelado tu suscripción al newsletter. No recibirás más emails de marketing.";
  const back = locale === "en" ? "Back to the site" : "Volver al sitio";
  const backHref = locale === "en" ? "/en" : "/";
  return `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${title}</title>
<style>body{margin:0;background:#0D0A08;color:#F7F3EC;font-family:Georgia,serif;display:flex;min-height:100vh;align-items:center;justify-content:center;padding:24px}
.card{max-width:520px;padding:40px;background:#1C1916;border:1px solid #C8A45D33;border-radius:20px;text-align:center}
h1{color:#F7F3EC;margin:0 0 16px;font-size:28px}
p{color:#F7F3EC99;line-height:1.6;margin:0 0 24px}
a{display:inline-block;background:#C8A45D;color:#000;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:bold;font-size:12px;letter-spacing:2px;text-transform:uppercase}</style></head>
<body><div class="card"><h1>${title}</h1><p>${message}</p><a href="${backHref}">${back}</a></div></body></html>`;
}

function esFallback(msg: string): string {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><title>Newsletter</title>
<style>body{margin:0;background:#0D0A08;color:#F7F3EC;font-family:Georgia,serif;display:flex;min-height:100vh;align-items:center;justify-content:center;padding:24px}
.card{max-width:520px;padding:40px;background:#1C1916;border:1px solid #C8A45D33;border-radius:20px;text-align:center}
p{color:#F7F3EC99;line-height:1.6}</style></head><body><div class="card"><p>${msg}</p></div></body></html>`;
}
