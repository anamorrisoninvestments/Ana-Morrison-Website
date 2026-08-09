"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import type { ConsentCategories, ConsentAction, ConsentSource } from "@/lib/consent/types";
import {
  readConsent,
  writeConsent,
  clearConsent,
  getOrCreateSessionId,
  DEFAULT_CATEGORIES_ACCEPTED,
  DEFAULT_CATEGORIES_REJECTED,
} from "@/lib/consent/cookie-store";

const CONSENT_VERSION = process.env.NEXT_PUBLIC_CONSENT_VERSION || "v1.0";

// Event que dispara el link de "Preferencias de cookies" en footer
const OPEN_PREFERENCES_EVENT = "amc:open-consent-preferences";

/**
 * Servicio para persistir el consent tanto en cookie (fuente local) como en
 * Supabase (evidencia legal). Nunca lanza — cualquier fallo se registra en
 * consola sin exponer detalles.
 */
async function logConsentToServer(input: {
  action: ConsentAction;
  categories: ConsentCategories;
  source: ConsentSource;
}) {
  try {
    await fetch("/api/consent/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: input.action,
        consent_type: "cookies",
        consent_version: CONSENT_VERSION,
        categories: input.categories,
        source: input.source,
        session_id: getOrCreateSessionId(),
        page_url: window.location.href,
      }),
    });
  } catch {
    // fail-safe: el consent local en cookie ya se guardó; el registro server
    // no bloquea la experiencia del usuario
  }
}

export default function ConsentBanner() {
  // Estado inicial: SSR-safe (readConsent lee document.cookie que no existe
  // en SSR, así que arrancamos sin banner y lo activamos tras montar).
  const pathname = usePathname() || "/";
  const isEN = pathname === "/en" || pathname.startsWith("/en/");
  const L = isEN
    ? {
        title: "We use cookies",
        body: "Cookies necessary to operate the site, and optional cookies for analytics and marketing. You can accept all, reject non-essential ones, or configure your preferences.",
        seePolicy: "See policy",
        policyHref: "/en/cookie-policy",
        acceptAll: "Accept all",
        reject: "Reject",
        manage: "Manage",
        prefsTitle: "Cookie preferences",
        prefsBody: "Choose which categories you allow. Necessary cookies cannot be disabled.",
        catNecessary: "Necessary",
        catNecessaryDesc: "Essential cookies for consent, session, and security. Always active.",
        catAnalytics: "Analytics",
        catAnalyticsDesc: "Measurement of site usage subject to Google Analytics settings and policies.",
        catMarketing: "Marketing",
        catMarketingDesc: "Personalization of messages and audiences for advertising campaigns.",
        save: "Save preferences",
        withdraw: "Withdraw consent",
        close: "Close",
      }
    : {
        title: "Usamos cookies",
        body: "Cookies necesarias para operar el sitio, y opcionales para analítica y marketing. Puedes aceptar todas, rechazar las no necesarias o configurar tus preferencias.",
        seePolicy: "Ver política",
        policyHref: "/politica-de-cookies",
        acceptAll: "Aceptar todas",
        reject: "Rechazar",
        manage: "Configurar",
        prefsTitle: "Preferencias de cookies",
        prefsBody: "Elige qué categorías permites. Las necesarias no pueden desactivarse.",
        catNecessary: "Necesarias",
        catNecessaryDesc: "Cookies imprescindibles para el consentimiento, la sesión y la seguridad. Siempre activas.",
        catAnalytics: "Analíticas",
        catAnalyticsDesc: "Medición del uso del sitio sujeta a la configuración y políticas de Google Analytics.",
        catMarketing: "Marketing",
        catMarketingDesc: "Personalización de mensajes y audiencias para campañas publicitarias.",
        save: "Guardar preferencias",
        withdraw: "Retirar consentimiento",
        close: "Cerrar",
      };

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [prefs, setPrefs] = useState<ConsentCategories>(DEFAULT_CATEGORIES_REJECTED);

  // Al montar: hidratar desde cookie (no accesible en SSR) o mostrar banner.
  // Lint suprimido intencionalmente: SSR no puede leer document.cookie por lo
  // que setState post-mount es la única forma correcta.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const existing = readConsent();
    if (existing) {
      setPrefs(existing.categories);
    } else {
      setVisible(true);
    }
    setMounted(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Escuchar evento global para abrir preferencias desde footer
  useEffect(() => {
    const handler = () => {
      const existing = readConsent();
      if (existing) setPrefs(existing.categories);
      setModalOpen(true);
    };
    window.addEventListener(OPEN_PREFERENCES_EVENT, handler);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, handler);
  }, []);

  const persist = useCallback(
    async (categories: ConsentCategories, action: ConsentAction, source: ConsentSource) => {
      writeConsent(categories);
      setPrefs(categories);
      // Refresh reactivo: notificar a Analytics para que cargue/descargue
      window.dispatchEvent(new CustomEvent("amc:consent-changed"));
      await logConsentToServer({ action, categories, source });
    },
    [],
  );

  const acceptAll = async () => {
    await persist(DEFAULT_CATEGORIES_ACCEPTED, "accepted", "banner_initial");
    setVisible(false);
    setModalOpen(false);
  };

  const rejectAll = async () => {
    await persist(DEFAULT_CATEGORIES_REJECTED, "rejected", "banner_initial");
    setVisible(false);
    setModalOpen(false);
  };

  const saveCustom = async () => {
    const wasExisting = readConsent() !== null;
    await persist(
      prefs,
      wasExisting ? "updated" : "accepted",
      "preferences_modal",
    );
    setVisible(false);
    setModalOpen(false);
  };

  const withdraw = async () => {
    // Retirada: reduce a solo necesarias + registra 'withdrawn'
    await persist(DEFAULT_CATEGORIES_REJECTED, "withdrawn", "withdrawal_link");
    clearConsent();
    setModalOpen(false);
    setVisible(true);
  };

  if (!mounted) return null;
  if (!visible && !modalOpen) return null;

  return (
    <>
      {/* Banner inicial */}
      {visible && !modalOpen && (
        <div
          role="dialog"
          aria-labelledby="amc-consent-title"
          className="fixed bottom-4 left-4 right-4 md:left-6 md:right-6 lg:left-auto lg:right-6 lg:max-w-md z-[100] rounded-2xl border border-[#C8A45D]/30 bg-[#141210]/98 backdrop-blur-md p-6 shadow-2xl"
        >
          <h2 id="amc-consent-title" className="heading-serif text-lg text-[#F7F3EC] mb-2">
            {L.title}
          </h2>
          <p className="text-[#F7F3EC]/70 text-sm leading-relaxed mb-5">
            {L.body}
            {" "}
            <a href={L.policyHref} className="text-[#C8A45D] underline hover:text-[#E2C98A]">
              {L.seePolicy}
            </a>
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={acceptAll}
              className="px-5 py-2.5 rounded-full bg-[#C8A45D] text-black text-xs tracking-widest uppercase font-bold hover:bg-[#E2C98A] transition-all"
            >
              {L.acceptAll}
            </button>
            <button
              onClick={rejectAll}
              className="px-5 py-2.5 rounded-full border border-[#C8A45D]/40 text-[#F7F3EC] text-xs tracking-widest uppercase hover:border-[#C8A45D] hover:bg-[#C8A45D]/5 transition-all"
            >
              {L.reject}
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="px-5 py-2.5 rounded-full border border-[#C8A45D]/25 text-[#F7F3EC]/80 text-xs tracking-widest uppercase hover:text-[#C8A45D] transition-all"
            >
              {L.manage}
            </button>
          </div>
        </div>
      )}

      {/* Modal de preferencias */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="amc-prefs-title"
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className="relative max-w-lg w-full max-h-[85vh] overflow-y-auto rounded-2xl border border-[#C8A45D]/30 bg-[#141210] p-8 shadow-2xl">
            <h2 id="amc-prefs-title" className="heading-serif text-2xl text-[#F7F3EC] mb-2">
              {L.prefsTitle}
            </h2>
            <p className="text-[#F7F3EC]/60 text-sm mb-6">
              {L.prefsBody}
            </p>

            <div className="space-y-4 mb-6">
              <CategoryRow
                title={L.catNecessary}
                description={L.catNecessaryDesc}
                checked={true}
                disabled
                onChange={() => {}}
              />
              <CategoryRow
                title={L.catAnalytics}
                description={L.catAnalyticsDesc}
                checked={prefs.analytics}
                onChange={(v) => setPrefs({ ...prefs, analytics: v })}
              />
              <CategoryRow
                title={L.catMarketing}
                description={L.catMarketingDesc}
                checked={prefs.marketing}
                onChange={(v) => setPrefs({ ...prefs, marketing: v })}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <button
                onClick={saveCustom}
                className="flex-1 px-5 py-3 rounded-full bg-[#C8A45D] text-black text-xs tracking-widest uppercase font-bold hover:bg-[#E2C98A] transition-all"
              >
                {L.save}
              </button>
              <button
                onClick={acceptAll}
                className="flex-1 px-5 py-3 rounded-full border border-[#C8A45D]/40 text-[#F7F3EC] text-xs tracking-widest uppercase hover:border-[#C8A45D] hover:bg-[#C8A45D]/5 transition-all"
              >
                {L.acceptAll}
              </button>
            </div>

            {readConsent() && (
              <button
                onClick={withdraw}
                className="w-full text-[#888888] text-xs underline hover:text-[#F7F3EC] transition-colors"
              >
                {L.withdraw}
              </button>
            )}

            <button
              onClick={() => setModalOpen(false)}
              aria-label={L.close}
              className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[#C8A45D]/25 text-[#F7F3EC] hover:border-[#C8A45D] flex items-center justify-center"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function CategoryRow({
  title,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl border border-[#C8A45D]/15 bg-[#1C1916]">
      <label className="flex items-center gap-3 cursor-pointer flex-shrink-0">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="w-5 h-5 accent-[#C8A45D] cursor-pointer disabled:cursor-not-allowed"
        />
      </label>
      <div className="flex-1">
        <p className="text-[#F7F3EC] font-semibold text-sm mb-1">
          {title}
          {disabled && <span className="text-[#888888] text-xs ml-2">(siempre activas)</span>}
        </p>
        <p className="text-[#F7F3EC]/60 text-xs leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
