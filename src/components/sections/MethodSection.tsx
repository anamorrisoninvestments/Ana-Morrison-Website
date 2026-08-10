"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n/config";

type Props = { locale?: Locale };

export default function MethodSection({ locale = "es" }: Props) {
  const isEN = locale === "en";
  const stages = isEN
    ? [
        { n: "01", title: "Analyze", icon: "◇", description: "Study the market, title, risks, regulations, and demand before capital moves." },
        { n: "02", title: "Acquire", icon: "◈", description: "Buy the right way — through a Tax Deed auction, direct acquisition, or an alternative model." },
        { n: "03", title: "Transform", icon: "◆", description: "Rehab, design, and stage the property to maximize perceived value and income potential." },
        { n: "04", title: "Launch", icon: "◉", description: "Go live on the right platforms with an optimized listing, professional photography, and strategic pricing." },
        { n: "05", title: "Automate", icon: "◎", description: "Systems, AI, and processes that keep operations running with minimal human load." },
        { n: "06", title: "Scale", icon: "★", description: "Revenue management, continuous optimization, and portfolio growth." },
      ]
    : [
        { n: "01", title: "Analizar", icon: "◇", description: "Estudiar mercado, título, riesgos, regulaciones y demanda antes de mover capital." },
        { n: "02", title: "Adquirir", icon: "◈", description: "Comprar correctamente vía subasta Tax Deed, adquisición directa o modelos alternativos." },
        { n: "03", title: "Transformar", icon: "◆", description: "Rehabilitar, diseñar y preparar la propiedad para maximizar valor percibido y rentabilidad." },
        { n: "04", title: "Lanzar", icon: "◉", description: "Publicar en plataformas con listing optimizado, fotografía profesional y pricing estratégico." },
        { n: "05", title: "Automatizar", icon: "◎", description: "Sistemas, IA y procesos que sostienen la operación con mínima carga humana." },
        { n: "06", title: "Rentabilizar", icon: "★", description: "Revenue management, optimización continua y escalamiento del portafolio." },
      ];

  const L = {
    chip: isEN ? "Signature Method" : "Método Propietario",
    h2a: isEN ? "The" : "Método",
    h2accent: isEN ? "Acquire, Transform & Monetize" : "Adquirir, Transformar y Rentabilizar",
    h2b: isEN ? " Method" : "",
    lead: isEN
      ? "A six-stage process that turns a real estate opportunity into an operating, income-producing asset."
      : "Un proceso de seis etapas que convierte una oportunidad inmobiliaria en un activo rentable y operable.",
  };

  return (
    <section id="metodo" className="py-28 bg-[#141210] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(34,174,239,0.05)_0%,transparent_55%)]" />
      <div className="absolute -top-20 left-0 w-96 h-96 rounded-full bg-[#C8A45D]/8 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#C8A45D]/10 border border-[#C8A45D]/30 text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-6">
            {L.chip}
          </span>
          <h2 className="heading-serif text-5xl sm:text-6xl mb-5 leading-[0.95] text-[#F7F3EC]">
            {L.h2a}{" "}
            <span className="text-gold-gradient italic">{L.h2accent}</span>
            <sup className="text-lg align-super text-[#C8A45D]">™</sup>
            {L.h2b}
          </h2>
          <p className="text-[#F7F3EC]/70 text-lg leading-relaxed">{L.lead}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stages.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="p-8 rounded-2xl border border-[#C8A45D]/15 bg-[#1C1916] hover:border-[#C8A45D]/45 transition-all group"
            >
              <div className="flex items-start justify-between mb-5">
                <span className="text-[#C8A45D] text-3xl group-hover:scale-110 transition-transform inline-block">
                  {s.icon}
                </span>
                <span className="text-[#888888] text-xs tracking-widest">{s.n}</span>
              </div>
              <h3 className="heading-serif text-2xl text-[#F7F3EC] mb-3">{s.title}</h3>
              <p className="text-[#F7F3EC]/70 text-sm leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
