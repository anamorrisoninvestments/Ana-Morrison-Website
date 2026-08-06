"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { readConsent } from "@/lib/consent/cookie-store";

/**
 * Analytics con activación fail-closed. Requiere las 3 condiciones simultáneas:
 *   1. NEXT_PUBLIC_ANALYTICS_ENABLED === "true"
 *   2. Provider ID configurado (ej. NEXT_PUBLIC_GA_ID)
 *   3. Consent analytics === true
 *
 * Sin cualquiera de las 3 → nada se carga. Si el usuario cambia consent en
 * runtime, escuchamos amc:consent-changed y actualizamos gtag consent state.
 *
 * Meta Pixel: NO se carga en PR #2 aunque NEXT_PUBLIC_META_PIXEL_ID exista.
 */
export default function Analytics() {
  const enabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  const [analyticsGranted, setAnalyticsGranted] = useState(false);

  useEffect(() => {
    const check = () => {
      const granted = readConsent()?.categories.analytics === true;
      setAnalyticsGranted(granted);
      // Al revocar: notificar a gtag y borrar cookies _ga*
      if (!granted && typeof window !== "undefined") {
        // gtag consent update solo si ya se cargó
        const w = window as unknown as { gtag?: (...args: unknown[]) => void };
        if (typeof w.gtag === "function") {
          w.gtag("consent", "update", { analytics_storage: "denied" });
        }
        document.cookie.split(";").forEach((c) => {
          const name = c.split("=")[0]?.trim();
          if (name && /^_ga/i.test(name)) {
            document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
          }
        });
      }
    };
    check();
    window.addEventListener("amc:consent-changed", check);
    return () => window.removeEventListener("amc:consent-changed", check);
  }, []);

  // Fail-closed: si falta cualquiera de las 3 condiciones → nada
  if (!enabled) return null;
  if (!gaId) return null;
  if (!analyticsGranted) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('consent','default',{ad_storage:'denied',analytics_storage:'granted',ad_user_data:'denied',ad_personalization:'denied'});
gtag('config','${gaId}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
