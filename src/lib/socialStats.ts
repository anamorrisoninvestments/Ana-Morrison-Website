/**
 * Módulo central de estadísticas sociales.
 *
 * Provee:
 *  - Tipos compartidos entre API route y componentes
 *  - Funciones server-only para consultar APIs oficiales (Instagram/FB/YouTube)
 *  - Estrategia de fallback por plataforma (cached → manual)
 *  - Formateo de números (33200 → "33.2K")
 *
 * IMPORTANTE: este archivo se importa desde la API route (server-side).
 * Nunca lo importes desde componentes "use client" — expondrías intentos
 * de leer process.env y romperías el bundle del browser.
 */

import { SOCIAL_FALLBACK, type SocialPlatform } from "@/data/socialStatsFallback";

export type SocialStatus = "live" | "cached" | "manual" | "error";

export interface SocialStat {
  platform: SocialPlatform;
  label: string;
  url: string;
  followers: number;
  formattedFollowers: string;
  metric: "seguidores" | "suscriptores";
  lastUpdated: string; // ISO timestamp
  status: SocialStatus;
}

export interface SocialStatsPayload {
  stats: SocialStat[];
  generatedAt: string;
}

// ─────────────────────────────────────────────────────────────────
// Formateo de números: 33200 → "33.2K", 1500000 → "1.5M"
// ─────────────────────────────────────────────────────────────────
export function formatFollowers(n: number): string {
  if (n < 1000) return String(n);
  if (n < 10_000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  if (n < 1_000_000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
}

// ─────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────
function buildFromFallback(platform: SocialPlatform, status: SocialStatus = "manual"): SocialStat {
  const fb = SOCIAL_FALLBACK[platform];
  return {
    platform: fb.platform,
    label: fb.label,
    url: fb.url,
    followers: fb.followers,
    formattedFollowers: formatFollowers(fb.followers),
    metric: fb.metric,
    lastUpdated: new Date().toISOString(),
    status,
  };
}

async function fetchJSON<T = unknown>(url: string, init?: RequestInit, timeoutMs = 5000): Promise<T> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      ...init,
      signal: ctrl.signal,
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

// ─────────────────────────────────────────────────────────────────
// Instagram (Meta Graph API)
//
// Requisitos:
//  - Cuenta Instagram Business o Creator vinculada a una Página de Facebook
//  - App de Meta con permisos: instagram_basic, pages_show_list,
//    pages_read_engagement
//  - Long-lived Page Access Token (META_ACCESS_TOKEN)
//  - INSTAGRAM_BUSINESS_ACCOUNT_ID (Graph API → /me/accounts → instagram_business_account.id)
//
// Endpoint: https://graph.facebook.com/v21.0/{ig-id}?fields=followers_count
// ─────────────────────────────────────────────────────────────────
async function fetchInstagram(): Promise<SocialStat> {
  const token = process.env.META_ACCESS_TOKEN;
  const igId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
  if (!token || !igId) return buildFromFallback("instagram", "manual");

  try {
    const data = await fetchJSON<{ followers_count?: number }>(
      `https://graph.facebook.com/v21.0/${igId}?fields=followers_count&access_token=${token}`
    );
    const count = data.followers_count;
    if (typeof count !== "number") throw new Error("Missing followers_count");
    return {
      ...buildFromFallback("instagram", "live"),
      followers: count,
      formattedFollowers: formatFollowers(count),
      lastUpdated: new Date().toISOString(),
    };
  } catch (err) {
    console.error("[socialStats] Instagram fetch failed:", err);
    return buildFromFallback("instagram", "error");
  }
}

// ─────────────────────────────────────────────────────────────────
// Facebook Page (Meta Graph API)
//
// Requisitos:
//  - FACEBOOK_PAGE_ID
//  - META_ACCESS_TOKEN (Page Access Token con permiso pages_read_engagement)
//
// Endpoint: https://graph.facebook.com/v21.0/{page-id}?fields=followers_count,fan_count
// ─────────────────────────────────────────────────────────────────
async function fetchFacebook(): Promise<SocialStat> {
  const token = process.env.META_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;
  if (!token || !pageId) return buildFromFallback("facebook", "manual");

  try {
    const data = await fetchJSON<{ followers_count?: number; fan_count?: number }>(
      `https://graph.facebook.com/v21.0/${pageId}?fields=followers_count,fan_count&access_token=${token}`
    );
    const count = data.followers_count ?? data.fan_count;
    if (typeof count !== "number") throw new Error("Missing followers/fan count");
    return {
      ...buildFromFallback("facebook", "live"),
      followers: count,
      formattedFollowers: formatFollowers(count),
      lastUpdated: new Date().toISOString(),
    };
  } catch (err) {
    console.error("[socialStats] Facebook fetch failed:", err);
    return buildFromFallback("facebook", "error");
  }
}

// ─────────────────────────────────────────────────────────────────
// YouTube Data API v3
//
// Requisitos:
//  - YOUTUBE_API_KEY (Google Cloud Console → Credentials → API key)
//  - YOUTUBE_CHANNEL_ID (UC...)
//
// Endpoint: https://www.googleapis.com/youtube/v3/channels?part=statistics&id={id}&key={k}
// ─────────────────────────────────────────────────────────────────
async function fetchYouTube(): Promise<SocialStat> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  if (!apiKey || !channelId) return buildFromFallback("youtube", "manual");

  try {
    const data = await fetchJSON<{
      items?: Array<{ statistics?: { subscriberCount?: string } }>;
    }>(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`
    );
    const raw = data.items?.[0]?.statistics?.subscriberCount;
    const count = raw ? Number(raw) : NaN;
    if (!Number.isFinite(count)) throw new Error("Missing subscriberCount");
    return {
      ...buildFromFallback("youtube", "live"),
      followers: count,
      formattedFollowers: formatFollowers(count),
      lastUpdated: new Date().toISOString(),
    };
  } catch (err) {
    console.error("[socialStats] YouTube fetch failed:", err);
    return buildFromFallback("youtube", "error");
  }
}

// ─────────────────────────────────────────────────────────────────
// TikTok
//
// Estado: TikTok Display API NO expone follower_count para cuentas que
// no estén aprobadas para TikTok for Business / Marketing API. Para una
// cuenta creator personal, hoy no hay endpoint oficial confiable.
//
// Cuando esté disponible TIKTOK_ACCESS_TOKEN para tu cuenta:
//   GET https://open.tiktokapis.com/v2/user/info/?fields=follower_count
// Reemplazar el bloque manual abajo con la llamada real.
//
// Por ahora: fallback manual. NO usar scraping (rompible + viola ToS).
// ─────────────────────────────────────────────────────────────────
async function fetchTikTok(): Promise<SocialStat> {
  const token = process.env.TIKTOK_ACCESS_TOKEN;
  if (!token) return buildFromFallback("tiktok", "manual");

  try {
    const data = await fetchJSON<{ data?: { user?: { follower_count?: number } } }>(
      "https://open.tiktokapis.com/v2/user/info/?fields=follower_count",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const count = data.data?.user?.follower_count;
    if (typeof count !== "number") throw new Error("Missing follower_count");
    return {
      ...buildFromFallback("tiktok", "live"),
      followers: count,
      formattedFollowers: formatFollowers(count),
      lastUpdated: new Date().toISOString(),
    };
  } catch (err) {
    console.error("[socialStats] TikTok fetch failed:", err);
    return buildFromFallback("tiktok", "error");
  }
}

// ─────────────────────────────────────────────────────────────────
// LinkedIn
//
// Estado: LinkedIn NO permite leer followers de un perfil PERSONAL vía
// API oficial (sólo Organizations/Company Pages).
//
// Para activar en el futuro (Company Page):
//   - Crear app en linkedin.com/developers
//   - Solicitar producto "Marketing Developer Platform"
//   - LINKEDIN_ACCESS_TOKEN + LINKEDIN_ORGANIZATION_ID
//   GET https://api.linkedin.com/rest/networkSizes/urn:li:organization:{ID}
//       ?edgeType=CompanyFollowedByMember
//       Headers: LinkedIn-Version: 202405, Authorization: Bearer {token}
//
// Por ahora: fallback manual.
// ─────────────────────────────────────────────────────────────────
async function fetchLinkedIn(): Promise<SocialStat> {
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  const orgId = process.env.LINKEDIN_ORGANIZATION_ID;
  if (!token || !orgId) return buildFromFallback("linkedin", "manual");

  try {
    const data = await fetchJSON<{ firstDegreeSize?: number }>(
      `https://api.linkedin.com/rest/networkSizes/urn:li:organization:${orgId}?edgeType=CompanyFollowedByMember`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "LinkedIn-Version": "202405",
          "X-Restli-Protocol-Version": "2.0.0",
        },
      }
    );
    const count = data.firstDegreeSize;
    if (typeof count !== "number") throw new Error("Missing firstDegreeSize");
    return {
      ...buildFromFallback("linkedin", "live"),
      followers: count,
      formattedFollowers: formatFollowers(count),
      lastUpdated: new Date().toISOString(),
    };
  } catch (err) {
    console.error("[socialStats] LinkedIn fetch failed:", err);
    return buildFromFallback("linkedin", "error");
  }
}

// ─────────────────────────────────────────────────────────────────
// Orquestador — corre todas las plataformas en paralelo, aislando errores.
// ─────────────────────────────────────────────────────────────────
export async function getAllSocialStats(): Promise<SocialStatsPayload> {
  const results = await Promise.allSettled([
    fetchInstagram(),
    fetchFacebook(),
    fetchYouTube(),
    fetchTikTok(),
    fetchLinkedIn(),
  ]);

  const platforms: SocialPlatform[] = ["instagram", "facebook", "youtube", "tiktok", "linkedin"];
  const stats = results.map((r, i) =>
    r.status === "fulfilled" ? r.value : buildFromFallback(platforms[i], "error")
  );

  return { stats, generatedAt: new Date().toISOString() };
}
