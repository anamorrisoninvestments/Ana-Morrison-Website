"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ways = [
  {
    audience: "Para inversionistas",
    title: "Tax Deed Intelligence",
    description:
      "Educación, análisis y herramientas para identificar oportunidades y evaluar propiedades antes de participar en subastas del condado.",
    cta: "Quiero explorar Tax Deed",
    href: "/tax-deed",
    accent: "text-[#22AEEF]",
    border: "border-[#22AEEF]/25",
    bg: "from-[#10145F]/20 to-[#1C1916]",
    button: "bg-[#22AEEF] hover:bg-[#22AEEF]/90 shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_0_32px_rgba(34,174,239,0.4)]",
  },
  {
    audience: "Para propietarios",
    title: "STR Strategy & Management",
    description:
      "Diagnóstico, transformación, lanzamiento, automatización y administración profesional de propiedades de alquiler a corto plazo.",
    cta: "Quiero rentabilizar mi propiedad",
    href: "/alquileres-a-corto-plazo",
    accent: "text-[#C8A45D]",
    border: "border-[#C8A45D]/30",
    bg: "from-[#C8A45D]/8 to-[#1C1916]",
    button: "bg-[#C8A45D] hover:bg-[#E2C98A] hover:shadow-[0_0_32px_rgba(200,164,93,0.4)]",
    featured: true,
  },
  {
    audience: "Para quienes desean aprender",
    title: "The Host Circle",
    description:
      "Formación práctica para construir y operar un negocio profesional de alquileres a corto plazo.",
    cta: "Conocer The Host Circle",
    href: "/recursos",
    accent: "text-[#F0E4C8]",
    border: "border-[#C8A45D]/15",
    bg: "from-[#1C1916] to-[#141210]",
    button: "bg-[#F7F3EC]/10 border border-[#C8A45D]/30 hover:bg-[#C8A45D]/10 hover:border-[#C8A45D] !text-[#F7F3EC]",
  },
];

export default function WaysToWorkSection() {
  return (
    <section id="trabaja-conmigo" className="py-28 bg-[#0D0A08] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,174,239,0.05)_0%,transparent_55%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
            Formas de Trabajar Conmigo
          </span>
          <h2 className="heading-serif text-4xl sm:text-5xl mt-4 mb-5 text-[#F7F3EC]">
            Tres caminos claros según{" "}
            <span className="text-gold-gradient italic">tu momento</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {ways.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-3xl border ${w.border} bg-gradient-to-br ${w.bg} flex flex-col relative ${
                w.featured ? "md:-translate-y-3 md:shadow-[0_20px_60px_-15px_rgba(200,164,93,0.15)]" : ""
              }`}
            >
              <span className={`${w.accent} text-xs tracking-widest uppercase font-semibold mb-3`}>
                {w.audience}
              </span>
              <h3 className="heading-serif text-2xl text-[#F7F3EC] mb-4">{w.title}</h3>
              <p className="text-[#F7F3EC]/70 text-sm leading-relaxed mb-8 flex-1">
                {w.description}
              </p>
              <Link
                href={w.href}
                className={`inline-block w-full text-center px-6 py-3.5 rounded-full text-black font-bold tracking-widest uppercase text-xs transition-all ${w.button}`}
              >
                {w.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
