"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Locale } from "@/lib/i18n/config";

interface NewsletterFormProps {
  variant?: "hero" | "footer" | "popup" | "standalone";
  leadMagnet?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  showName?: boolean;
  locale?: Locale;
}

export default function NewsletterForm({
  variant = "standalone",
  leadMagnet,
  title,
  subtitle,
  ctaText,
  showName = false,
  locale = "es",
}: NewsletterFormProps) {
  const isEN = locale === "en";
  const L = {
    placeholderEmail: isEN ? "you@email.com" : "tu@email.com",
    placeholderName: isEN ? "Your name (optional)" : "Tu nombre (opcional)",
    ctaShort: isEN ? "Subscribe" : "Suscribir",
    ctaLong: ctaText ?? (isEN ? "Subscribe for free" : "Suscribirme gratis"),
    loading: isEN ? "Processing…" : "Procesando…",
    successShort: isEN ? "Welcome! Check your inbox." : "¡Bienvenida! Revisa tu email.",
    successTitle: isEN ? "You're in!" : "¡Estás dentro!",
    successBodyGeneric: isEN ? "Welcome to The Host Circle community." : "Bienvenida a la comunidad de The Host Circle.",
    successBodyLead: isEN ? "Check your inbox — the guide is on its way." : "Revisa tu email — la guía ya está en camino.",
    successAlready: isEN ? "You're already subscribed." : "Ya estás suscrita.",
    footnote: isEN ? "No spam. Unsubscribe anytime." : "Sin spam. Puedes cancelar cuando quieras.",
    errFallback: isEN ? "Subscription error. Please try again." : "Error al suscribirse.",
    errNetwork: isEN ? "Connection error. Please try again." : "Error de conexión. Intenta de nuevo.",
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [formStartedAt] = useState<number>(() => Date.now());

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setErrorMsg("");
    const form = e.currentTarget;
    const hp = (form.elements.namedItem("hp_website") as HTMLInputElement | null)?.value ?? "";

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: showName ? name : undefined,
          leadMagnet,
          locale,
          hp_website: hp,
          form_started_at: formStartedAt,
          landing_url: typeof window !== "undefined" ? window.location.href : undefined,
          referrer: typeof document !== "undefined" ? document.referrer : undefined,
        }),
      });
      const data = await res.json().catch(() => ({} as { message?: string; alreadySubscribed?: boolean }));
      if (!res.ok) {
        setErrorMsg(data.message || L.errFallback);
        setStatus("error");
      } else {
        setAlreadySubscribed(Boolean(data.alreadySubscribed));
        setStatus("success");
      }
    } catch {
      setErrorMsg(L.errNetwork);
      setStatus("error");
    }
  }

  const inputClass = "flex-1 bg-[#1C1916] border border-[#2A2520] rounded-xl px-4 py-2.5 text-sm text-[#F7F3EC] placeholder:text-[#888888] focus:outline-none focus:border-[#C8A45D] transition-colors";
  const honeypot = (
    <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: 0 }}>
      <label>
        Website
        <input type="text" name="hp_website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );

  if (variant === "footer") {
    return (
      <div className="w-full">
        {title && <p className="text-[#F7F3EC]/70 text-sm mb-3">{title}</p>}
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.p
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#C8A45D] text-sm"
            >
              {alreadySubscribed ? L.successAlready : L.successShort}
            </motion.p>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="flex gap-2 flex-col sm:flex-row relative"
            >
              {honeypot}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={L.placeholderEmail}
                required
                aria-label={L.placeholderEmail}
                className={inputClass}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-[#C8A45D] text-black px-5 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-[#E2C98A] transition-all disabled:opacity-50 whitespace-nowrap"
              >
                {status === "loading" ? "…" : L.ctaShort}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
        {status === "error" && <p className="text-red-400 text-xs mt-2">{errorMsg}</p>}
      </div>
    );
  }

  return (
    <div className={variant === "hero" ? "w-full max-w-md" : "w-full"}>
      {title && <h3 className="heading-serif text-xl text-[#F7F3EC] mb-2">{title}</h3>}
      {subtitle && <p className="text-[#888888] text-sm mb-6 leading-relaxed">{subtitle}</p>}
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1C1916] border border-[#C8A45D]/30 p-6 rounded-2xl text-center"
          >
            <div className="text-3xl mb-3">🎯</div>
            <p className="text-[#C8A45D] font-semibold mb-1">{alreadySubscribed ? L.successAlready : L.successTitle}</p>
            <p className="text-[#F7F3EC]/70 text-sm">{leadMagnet ? L.successBodyLead : L.successBodyGeneric}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3 relative"
          >
            {honeypot}
            {showName && (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={L.placeholderName}
                className="w-full bg-[#1C1916] border border-[#2A2520] rounded-xl px-4 py-3 text-sm text-[#F7F3EC] placeholder:text-[#888888] focus:outline-none focus:border-[#C8A45D] transition-colors"
              />
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={L.placeholderEmail}
              required
              aria-label={L.placeholderEmail}
              className="w-full bg-[#1C1916] border border-[#2A2520] rounded-xl px-4 py-3 text-sm text-[#F7F3EC] placeholder:text-[#888888] focus:outline-none focus:border-[#C8A45D] transition-colors"
            />
            {status === "error" && <p className="text-red-400 text-xs">{errorMsg}</p>}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#C8A45D] text-black py-3.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#E2C98A] transition-all disabled:opacity-50 hover:shadow-[0_0_24px_rgba(200,164,93,0.35)]"
            >
              {status === "loading" ? L.loading : L.ctaLong}
            </button>
            <p className="text-[#888888] text-xs text-center">{L.footnote}</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
