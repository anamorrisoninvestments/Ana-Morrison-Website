"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NewsletterFormProps {
  variant?: "hero" | "footer" | "popup" | "standalone";
  leadMagnet?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  showName?: boolean;
}

export default function NewsletterForm({
  variant = "standalone",
  leadMagnet,
  title,
  subtitle,
  ctaText = "Suscribirme gratis",
  showName = false,
}: NewsletterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: showName ? name : undefined, leadMagnet }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.message || "Error al suscribirse.");
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setErrorMsg("Error de conexión. Intenta de nuevo.");
      setStatus("error");
    }
  }

  if (variant === "footer") {
    return (
      <div className="w-full">
        {title && <p className="text-ivory/70 text-sm mb-3">{title}</p>}
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.p
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gold text-sm"
            >
              ¡Bienvenida! Revisa tu email.
            </motion.p>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="flex gap-2 flex-col sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="flex-1 bg-gray-mid border border-gray-soft px-4 py-2.5 text-sm text-ivory placeholder:text-text-muted focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-gold text-black px-5 py-2.5 text-xs font-bold tracking-widest uppercase hover:bg-gold-light transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {status === "loading" ? "..." : "Suscribir"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
        {status === "error" && (
          <p className="text-red-400 text-xs mt-2">{errorMsg}</p>
        )}
      </div>
    );
  }

  return (
    <div className={variant === "hero" ? "w-full max-w-md" : "w-full"}>
      {title && (
        <h3 className="text-xl font-light text-ivory mb-2">{title}</h3>
      )}
      {subtitle && (
        <p className="text-text-muted text-sm mb-6 leading-relaxed">{subtitle}</p>
      )}
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-mid border border-gold/30 p-6 text-center"
          >
            <div className="text-3xl mb-3">🎯</div>
            <p className="text-gold font-semibold mb-1">¡Estás dentro!</p>
            <p className="text-ivory/70 text-sm">
              {leadMagnet
                ? "Revisa tu email — la guía ya está en camino."
                : "Bienvenida a la comunidad de The Host Circle."}
            </p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} className="space-y-3">
            {showName && (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                className="w-full bg-gray-mid border border-gray-soft px-4 py-3 text-sm text-ivory placeholder:text-text-muted focus:outline-none focus:border-gold transition-colors"
              />
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="w-full bg-gray-mid border border-gray-soft px-4 py-3 text-sm text-ivory placeholder:text-text-muted focus:outline-none focus:border-gold transition-colors"
            />
            {status === "error" && (
              <p className="text-red-400 text-xs">{errorMsg}</p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-gold text-black py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-gold-light transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Procesando..." : ctaText}
            </button>
            <p className="text-text-muted text-xs text-center">
              Sin spam. Puedes cancelar cuando quieras.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
