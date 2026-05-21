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

  const inputClass = "flex-1 bg-[#1C1916] border border-[#2A2520] rounded-xl px-4 py-2.5 text-sm text-[#F7F3EC] placeholder:text-[#888888] focus:outline-none focus:border-[#C8A45D] transition-colors";

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
                className={inputClass}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-[#C8A45D] text-black px-5 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-[#E2C98A] transition-all disabled:opacity-50 whitespace-nowrap"
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
        <h3 className="heading-serif text-xl text-[#F7F3EC] mb-2">{title}</h3>
      )}
      {subtitle && (
        <p className="text-[#888888] text-sm mb-6 leading-relaxed">{subtitle}</p>
      )}
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1C1916] border border-[#C8A45D]/30 p-6 rounded-2xl text-center"
          >
            <div className="text-3xl mb-3">🎯</div>
            <p className="text-[#C8A45D] font-semibold mb-1">¡Estás dentro!</p>
            <p className="text-[#F7F3EC]/70 text-sm">
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
                className="w-full bg-[#1C1916] border border-[#2A2520] rounded-xl px-4 py-3 text-sm text-[#F7F3EC] placeholder:text-[#888888] focus:outline-none focus:border-[#C8A45D] transition-colors"
              />
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="w-full bg-[#1C1916] border border-[#2A2520] rounded-xl px-4 py-3 text-sm text-[#F7F3EC] placeholder:text-[#888888] focus:outline-none focus:border-[#C8A45D] transition-colors"
            />
            {status === "error" && (
              <p className="text-red-400 text-xs">{errorMsg}</p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#C8A45D] text-black py-3.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#E2C98A] transition-all disabled:opacity-50 hover:shadow-[0_0_24px_rgba(200,164,93,0.35)]"
            >
              {status === "loading" ? "Procesando..." : ctaText}
            </button>
            <p className="text-[#888888] text-xs text-center">
              Sin spam. Puedes cancelar cuando quieras.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
