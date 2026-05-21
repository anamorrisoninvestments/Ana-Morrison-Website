import { getAllSocialStats } from "@/lib/socialStats";
import SocialProofClient from "./SocialProofClient";

/**
 * Server component — corre en el server build / al revalidar.
 * Llama a las APIs sociales (cacheadas 6h vía la función) y entrega
 * datos listos al cliente. Si todo falla, el cliente recibe valores
 * fallback y la página NUNCA se rompe.
 */
export const revalidate = 21600; // 6h

export default async function SocialProofSection() {
  const { stats, generatedAt } = await getAllSocialStats();
  // Sólo mostramos Facebook si hay FACEBOOK_PAGE_ID configurado.
  // Si aún no hay URL/token oficial, ocultamos esa tarjeta del público.
  const visible = stats.filter((s) => {
    if (s.platform === "facebook") return Boolean(process.env.FACEBOOK_PAGE_ID);
    return true;
  });

  return <SocialProofClient stats={visible} generatedAt={generatedAt} />;
}
