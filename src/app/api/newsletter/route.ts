import { NextRequest, NextResponse } from "next/server";
import { CLIENT } from "@/lib/client-data";
import { subscribeNewsletter, markResendSynced, markWelcomeSent } from "@/lib/newsletter/subscribe";
import { syncContactToResend } from "@/lib/newsletter/resend-sync";
import { sendWelcomeEmail, sendInternalNotification } from "@/lib/newsletter/welcome-email";
import { checkRateLimit } from "@/lib/rate-limit";
import { hashIp, getClientIp } from "@/lib/hash";
import { log } from "@/lib/log";

export const runtime = "nodejs";

const MAX_EMAIL_LENGTH = 254;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_FORM_LIFETIME_MS = 1500;
const BLOCKED_UA_PATTERNS = [/^curl\//i, /python-requests/i, /^Go-http-client/i, /^Wget/i];

type NewsletterBody = {
  email?: string;
  name?: string;
  locale?: string;
  leadMagnet?: string;
  hp_website?: string; // honeypot
  form_started_at?: number;
  landing_url?: string;
  referrer?: string;
};

export async function POST(req: NextRequest) {
  const ipHash = hashIp(getClientIp(req.headers));
  const ua = req.headers.get("user-agent") || "";

  if (!ua || BLOCKED_UA_PATTERNS.some((r) => r.test(ua))) {
    log.warn("api.newsletter.blocked_ua", { ipHash });
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const rl = await checkRateLimit("/api/newsletter", ipHash);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please try again in a moment.", error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } },
    );
  }

  let body: NewsletterBody;
  try {
    const text = await req.text();
    if (text.length > 4 * 1024) {
      return NextResponse.json({ ok: false, message: "Payload too large", error: "payload_too_large" }, { status: 413 });
    }
    body = JSON.parse(text) as NewsletterBody;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request.", error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: silent success if filled
  if (body.hp_website && body.hp_website.length > 0) {
    log.warn("api.newsletter.honeypot_hit", { ipHash });
    return NextResponse.json({ ok: true, message: "ok" }, { status: 200 });
  }

  // Timing check: form filled implausibly fast
  if (body.form_started_at) {
    const lifetime = Date.now() - body.form_started_at;
    if (lifetime < MIN_FORM_LIFETIME_MS) {
      log.warn("api.newsletter.too_fast", { ipHash, lifetime });
      return NextResponse.json({ ok: true, message: "ok" }, { status: 200 });
    }
  }

  const rawEmail = typeof body.email === "string" ? body.email.trim() : "";
  if (!rawEmail) {
    return NextResponse.json({ ok: false, message: "Email required.", error: "email_required" }, { status: 400 });
  }
  if (rawEmail.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(rawEmail)) {
    return NextResponse.json({ ok: false, message: "Invalid email.", error: "email_invalid" }, { status: 400 });
  }
  const locale: "es" | "en" = body.locale === "en" ? "en" : "es";
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : null;
  const leadMagnet = typeof body.leadMagnet === "string" ? body.leadMagnet.trim().slice(0, 120) : null;
  const landingUrl = typeof body.landing_url === "string" ? body.landing_url.slice(0, 500) : null;
  const referrer = typeof body.referrer === "string" ? body.referrer.slice(0, 500) : null;
  const consentVersion = process.env.NEXT_PUBLIC_CONSENT_VERSION || "v1.0";

  // 1. Persist (source of truth). Idempotent by lower(email).
  const sub = await subscribeNewsletter({
    email: rawEmail,
    name,
    locale,
    leadMagnet,
    landingUrl,
    referrer,
    consentVersion,
    ipHash,
  });

  if (!sub.ok) {
    log.error("api.newsletter.subscribe_failed", { error: sub.error });
    return NextResponse.json({ ok: false, message: "Subscription temporarily unavailable. Please try again shortly.", error: sub.error }, { status: 500 });
  }

  // 2. Sync to Resend Contacts (best-effort, non-blocking on error).
  const resendSync = await syncContactToResend({ email: sub.email, name, locale });
  if (resendSync.ok && !("skipped" in resendSync)) {
    await markResendSynced({ id: sub.id, contactId: resendSync.contactId, audienceId: resendSync.audienceId });
  } else if (!resendSync.ok) {
    await markResendSynced({ id: sub.id, error: resendSync.error, audienceId: resendSync.audienceId ?? null });
  }

  // 3. Welcome email — only if new or resubscribed (idempotent).
  let welcomeStatus: "sent" | "skipped" | "failed" = "skipped";
  let welcomeError: string | undefined;
  if (sub.welcomeShouldSend) {
    const unsubBase = process.env.NEXT_PUBLIC_SITE_URL || CLIENT.siteUrl;
    const unsubUrl = sub.unsubscribeToken
      ? `${unsubBase}/api/newsletter/unsubscribe?token=${encodeURIComponent(sub.unsubscribeToken)}`
      : `${unsubBase}/${locale === "en" ? "en/cookie-policy" : "politica-de-cookies"}`;
    const welcome = await sendWelcomeEmail({ email: sub.email, name, locale, leadMagnet, unsubscribeUrl: unsubUrl });
    if (welcome.ok && !welcome.skipped) {
      welcomeStatus = "sent";
      await markWelcomeSent({ id: sub.id, status: "sent" });
    } else if (welcome.ok && welcome.skipped) {
      welcomeStatus = "skipped";
      await markWelcomeSent({ id: sub.id, status: "skipped_no_api_key" });
    } else {
      welcomeStatus = "failed";
      welcomeError = (welcome as { error: string }).error;
      await markWelcomeSent({ id: sub.id, status: "failed", error: welcomeError });
    }
  }

  // 4. Internal notification to Ana (best-effort, non-blocking).
  await sendInternalNotification({
    email: sub.email,
    name,
    locale,
    leadMagnet,
    created: sub.created,
    resubscribed: sub.resubscribed,
  });

  log.info("api.newsletter.ok", {
    id: sub.id,
    locale,
    created: sub.created,
    resubscribed: sub.resubscribed,
    alreadySubscribed: sub.alreadySubscribed,
    welcome: welcomeStatus,
    resend: resendSync.ok
      ? ("skipped" in resendSync && resendSync.skipped ? resendSync.reason : "synced")
      : "failed",
  });

  return NextResponse.json(
    {
      ok: true,
      message: locale === "en"
        ? (sub.alreadySubscribed ? "You're already subscribed." : "Welcome! Check your inbox.")
        : (sub.alreadySubscribed ? "Ya estás suscrita." : "¡Bienvenida! Revisa tu email."),
      alreadySubscribed: sub.alreadySubscribed,
      welcome: welcomeStatus,
      welcomeError: welcomeError ? welcomeError.slice(0, 200) : undefined,
    },
    { status: 200 },
  );
}
