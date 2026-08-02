// Client-safe: solo lee/escribe cookie via document.cookie. Sin dependencia server.
import type { ConsentCategories, ConsentState } from "./types";

const COOKIE_NAME = "amc_consent";
const SESSION_COOKIE = "amc_session";
const MAX_AGE = 60 * 60 * 24 * 365; // 12 meses
const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 días

function getCurrentVersion(): string {
  // NEXT_PUBLIC_ vars están disponibles en cliente.
  return process.env.NEXT_PUBLIC_CONSENT_VERSION || "v1.0";
}

function generateSessionId(): string {
  // ID anónimo. crypto.randomUUID() disponible en browsers modernos y Node.
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[-.]/g, "\\$&")}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string, maxAgeSec: number) {
  if (typeof document === "undefined") return;
  const secure = typeof window !== "undefined" && window.location.protocol === "https:";
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSec}; samesite=lax${secure ? "; secure" : ""}`;
}

function eraseCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
}

export function getOrCreateSessionId(): string {
  const existing = readCookie(SESSION_COOKIE);
  if (existing) return existing;
  const id = generateSessionId();
  writeCookie(SESSION_COOKIE, id, SESSION_MAX_AGE);
  return id;
}

export function readConsent(): ConsentState | null {
  const raw = readCookie(COOKIE_NAME);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as ConsentState;
    // Invalidación por versión: si cambió la versión de política, forzar re-consent
    if (parsed.version !== getCurrentVersion()) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsent(categories: ConsentCategories): ConsentState {
  const state: ConsentState = {
    categories,
    version: getCurrentVersion(),
    timestamp: Date.now(),
    sessionId: getOrCreateSessionId(),
  };
  writeCookie(COOKIE_NAME, JSON.stringify(state), MAX_AGE);
  return state;
}

export function clearConsent() {
  eraseCookie(COOKIE_NAME);
}

export const DEFAULT_CATEGORIES_ACCEPTED: ConsentCategories = {
  necessary: true,
  analytics: true,
  marketing: true,
};

export const DEFAULT_CATEGORIES_REJECTED: ConsentCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
};
