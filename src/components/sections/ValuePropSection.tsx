"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n/config";

type Props = { locale?: Locale };

export default function ValuePropSection({ locale = "es" }: Props) {
  const isEN = locale === "en";
  const risks = isEN
    ? [
        "Title risks",
        "Physical condition",
        "Rehabilitation costs",
        "Local regulations",
        "Market demand",
        "Monetization strategy",
        "Post-acquisition operations",
      ]
    : [
        "Riesgos del título",
        "Estado físico",
        "Costos de rehabilitación",
        "Regulaciones locales",
        "Demanda del mercado",
        "Estrategia de monetización",
        "Operación posterior",
      ];

  const L = {
    eyebrow: isEN ? "My Approach" : "Mi Propuesta",
    h2a: isEN ? "It is not simply about" : "No se trata solamente de",
    h2accent1: isEN ? "buying" : "comprar",
    h2b: isEN ? " a property." : " una propiedad.",
    h2c: isEN ? "It is about buying strategically and knowing how to" : "Se trata de comprar correctamente y saber cómo",
    h2accent2: isEN ? "turn it into a profitable asset" : "rentabilizarla",
    lead: isEN
      ? "Many investors acquire properties without analyzing the variables that determine whether the asset will actually perform:"
      : "Muchas personas adquieren propiedades sin analizar las variables que determinan si el activo será realmente rentable:",
    footer: isEN
      ? "My approach connects acquisition analysis with the profitability strategy of the asset."
      : "Mi enfoque conecta el análisis de adquisición con la estrategia de rentabilidad del activo.",
  };

  return (
    <section className="py-28 bg-[#141210] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,164,93,0.05)_0%,transparent_60%)]" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
            {L.eyebrow}
          </span>
          <h2 className="heading-serif text-4xl sm:text-5xl mt-4 leading-tight text-[#F7F3EC]">
            {L.h2a}{" "}
            <span className="text-gold-gradient italic">{L.h2accent1}</span>{L.h2b}
            <br />
            {L.h2c}{" "}
            <span className="text-gold-gradient italic">{L.h2accent2}</span>.
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[#F7F3EC]/70 text-lg leading-relaxed text-center max-w-3xl mx-auto mb-12"
        >
          {L.lead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {risks.map((r) => (
            <span
              key={r}
              className="px-5 py-2 rounded-full border border-[#C8A45D]/25 bg-[#1C1916] text-[#F7F3EC]/80 text-sm"
            >
              {r}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="heading-serif text-2xl sm:text-3xl text-center text-[#F7F3EC] italic leading-snug max-w-3xl mx-auto"
        >
          {L.footer}
        </motion.p>
      </div>
    </section>
  );
}
