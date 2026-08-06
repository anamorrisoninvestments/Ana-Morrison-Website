import "server-only";
import { Resend } from "resend";

let cached: Resend | null = null;

/**
 * Cliente Resend. Devuelve null si RESEND_API_KEY o RESEND_FROM_EMAIL faltan
 * (feature-flag). Los consumidores deben tratar null como "email deshabilitado
 * de forma esperada" — no como error.
 */
export function getResend(): { client: Resend; from: string } | null {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) return null;
  if (!cached) cached = new Resend(apiKey);
  return { client: cached, from };
}
