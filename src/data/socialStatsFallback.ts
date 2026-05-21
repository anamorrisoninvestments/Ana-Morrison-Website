/**
 * Fallback manual de seguidores de redes sociales.
 *
 * Estos valores se usan cuando:
 *  - Las APIs oficiales fallan
 *  - Aún no se han configurado los tokens
 *  - No hay datos en caché
 *
 * Actualizar manualmente si los números cambian significativamente
 * y aún no hay integración API activa para esa plataforma.
 */

export type SocialPlatform = "instagram" | "facebook" | "youtube" | "tiktok" | "linkedin";

export interface SocialFallback {
  platform: SocialPlatform;
  label: string;
  url: string;
  followers: number;
  metric: "seguidores" | "suscriptores";
}

export const SOCIAL_FALLBACK: Record<SocialPlatform, SocialFallback> = {
  instagram: {
    platform: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/anamorrisoninvestments",
    followers: 33200,
    metric: "seguidores",
  },
  facebook: {
    platform: "facebook",
    label: "Facebook",
    url: "https://www.facebook.com/anamorrisoninvestments",
    followers: 7800,
    metric: "seguidores",
  },
  youtube: {
    platform: "youtube",
    label: "YouTube",
    url: "https://youtube.com/@anamorrisoninvestments",
    followers: 111,
    metric: "suscriptores",
  },
  tiktok: {
    platform: "tiktok",
    label: "TikTok",
    url: "https://www.tiktok.com/@anamorrisoninvestments",
    followers: 111,
    metric: "seguidores",
  },
  linkedin: {
    platform: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/anamar%C3%ADa-morrison-07b83b5b",
    followers: 111,
    metric: "seguidores",
  },
};
