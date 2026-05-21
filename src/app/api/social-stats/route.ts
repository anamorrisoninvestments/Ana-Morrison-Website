import { NextResponse } from "next/server";
import { getAllSocialStats } from "@/lib/socialStats";

/**
 * GET /api/social-stats
 *
 * Devuelve los conteos de seguidores de todas las redes sociales.
 * Server-side: lee tokens desde env, jamás los expone al cliente.
 *
 * Caché: Next.js revalida esta respuesta cada 6 horas (21600s).
 * Tanto las visitas como cualquier consumidor interno reciben la versión
 * ya cacheada salvo que haya pasado la ventana de revalidación.
 */
export const revalidate = 21600; // 6 horas

export async function GET() {
  const payload = await getAllSocialStats();
  return NextResponse.json(payload, {
    headers: {
      // CDN cache: 6h fresh, 24h stale-while-revalidate
      "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400",
    },
  });
}
