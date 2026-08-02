import "server-only";
import { createHash } from "node:crypto";

/**
 * Hash minimizado para IPs. SHA-256(ip + salt) truncado a 12 chars hex.
 * Suficiente para detección de patrones abusivos sin conservar IP en claro.
 *
 * Si CONSENT_IP_HASH_SALT no está configurado → retorna null (fail-safe:
 * mejor perder telemetría que exponer IP en claro).
 */
export function hashIp(ip: string | null | undefined): string | null {
  if (!ip || typeof ip !== "string") return null;
  const salt = process.env.CONSENT_IP_HASH_SALT;
  if (!salt) return null;
  return createHash("sha256").update(ip + salt).digest("hex").slice(0, 12);
}

/**
 * Extrae la IP del request. Considera X-Forwarded-For (Vercel edge) y fallback.
 * NO devuelve valor genérico como "unknown"; retorna null si no se puede
 * determinar de forma segura.
 */
export function getClientIp(headers: Headers): string | null {
  const xff = headers.get("x-forwarded-for");
  if (xff) {
    // Primer valor de la lista, trimmed
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return null;
}

/**
 * Resumen de user agent: browser family + OS family. Máx 60 chars.
 * Descarta versión exacta y device fingerprint.
 */
export function summarizeUserAgent(ua: string | null | undefined): string | null {
  if (!ua) return null;

  const browser = ua.match(/(Chrome|Firefox|Safari|Edge|Opera|SamsungBrowser|CriOS|FxiOS)/i)?.[1] ?? "Unknown";
  const os =
    ua.match(/\bWindows\b/i)?.[0] ??
    ua.match(/\bMac OS X\b/i)?.[0]?.replace(/OS X/, "OS") ??
    ua.match(/\bAndroid\b/i)?.[0] ??
    ua.match(/\biPhone\b/i)?.[0] ??
    ua.match(/\biPad\b/i)?.[0] ??
    ua.match(/\bLinux\b/i)?.[0] ??
    "Unknown";

  // Normalizar
  const b = browser === "CriOS" ? "Chrome" : browser === "FxiOS" ? "Firefox" : browser;
  const o = os === "Mac OS" ? "macOS" : os;

  return `${b}/${o}`.slice(0, 60);
}

/**
 * Hash de email para logs. Nunca escribir email en claro en logs.
 */
export function hashEmail(email: string): string {
  return createHash("sha256").update(email.toLowerCase()).digest("hex").slice(0, 12);
}
