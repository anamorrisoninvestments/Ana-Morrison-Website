"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

type Props = { locale?: Locale };

export default function PillarsSection({ locale = "es" }: Props) {
  const isEN = locale === "en";
  const pillars = [
    {
      tag: isEN ? "Pillar 01 · For Investors" : "Pilar 01 · Para Inversionistas",
      title: isEN ? "Tax Deed & Strategic Acquisition" : "Tax Deed & Acquisition Intelligence",
      accent: "#22AEEF",
      accentClass: "text-[#22AEEF]",
      borderClass: "border-[#22AEEF]/30",
      bgClass: "from-[#10145F]/25 to-[#1C1916]",
      buttonClass: "bg-[#22AEEF] hover:bg-[#22AEEF]/90",
      shadowClass: "hover:shadow-[0_0_32px_rgba(34,174,239,0.4)]",
      description: isEN
        ? "Research, due diligence, and strategy to identify and evaluate below-market real estate opportunities through county Tax Deed auctions."
        : "Investigación, análisis y estrategia para adquirir propiedades por debajo de valor a través de subastas del condado.",
      items: isEN
        ? [
            "Opportunity sourcing",
            "Title screening",
            "Pre-auction analysis",
            "Risk assessment",
            "Acquisition strategy",
            "Investor education",
            "Exit strategy analysis",
          ]
        : [
            "Investigación de oportunidades",
            "Filtros de títulos",
            "Análisis preliminar",
            "Identificación de riesgos",
            "Estrategia de adquisición",
            "Educación para inversionistas",
            "Evaluación de estrategias de salida",
          ],
      cta: isEN ? "Explore Tax Deed Investing" : "Explorar Tax Deed",
      href: isEN ? "/en/tax-deed-investing" : "/tax-deed",
    },
    {
      tag: isEN ? "Pillar 02 · For Property Owners" : "Pilar 02 · Para Propietarios",
      title: "Short-Term Rental Strategy",
      accent: "#C8A45D",
      accentClass: "text-[#C8A45D]",
      borderClass: "border-[#C8A45D]/30",
      bgClass: "from-[#C8A45D]/8 to-[#1C1916]",
      buttonClass: "bg-[#C8A45D] hover:bg-[#E2C98A]",
      shadowClass: "hover:shadow-[0_0_32px_rgba(200,164,93,0.4)]",
      description: isEN
        ? "Property assessment, transformation, launch, optimization, and professional management designed to position your property for stronger short-term rental performance."
        : "Diagnóstico, transformación, lanzamiento y operación profesional de tu propiedad como activo de alquiler a corto plazo.",
      items: isEN
        ? [
            "Viability analysis",
            "Asset positioning",
            "Design & setup",
            "Multi-platform launch",
            "Listing optimization",
            "Automation",
            "Revenue management",
            "Professional property management",
          ]
        : [
            "Análisis de viabilidad",
            "Estrategia del activo",
            "Diseño y preparación",
            "Lanzamiento en plataformas",
            "Optimización del listing",
            "Automatización",
            "Revenue management",
            "Administración profesional",
          ],
      cta: isEN ? "Explore Short-Term Rentals" : "Explorar alquileres a corto plazo",
      href: isEN ? "/en/short-term-rentals" : "/alquileres-a-corto-plazo",
    },
  ];

  const L = {
    eyebrow: isEN ? "Two Pillars · One Real Estate Ecosystem" : "Dos Pilares · Un Ecosistema Inmobiliario",
    h2a: isEN ? "Strategic acquisition and" : "Adquisición estratégica y",
    h2accent: isEN ? "professional operations" : "operación profesional",
    lead: isEN
      ? "Everything I do connects two complementary disciplines: acquiring with intention and operating with excellence."
      : "Todo lo que hago se conecta a dos disciplinas complementarias: comprar correctamente y operar con excelencia.",
  };

  return (
    <section id="pilares" className="py-28 bg-[#0D0A08] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,164,93,0.04)_0%,transparent_55%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
            {L.eyebrow}
          </span>
          <h2 className="heading-serif text-4xl sm:text-5xl mt-4 mb-5 text-[#F7F3EC]">
            {L.h2a}{" "}
            <span className="text-gold-gradient italic">{L.h2accent}</span>
          </h2>
          <p className="text-[#F7F3EC]/70 text-lg leading-relaxed">{L.lead}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 rounded-3xl border ${p.borderClass} bg-gradient-to-br ${p.bgClass} relative flex flex-col`}
            >
              <span className={`${p.accentClass} text-xs tracking-widest uppercase font-semibold mb-3`}>
                {p.tag}
              </span>
              <h3 className="heading-serif text-3xl text-[#F7F3EC] mb-4">{p.title}</h3>
              <p className="text-[#F7F3EC]/70 text-base leading-relaxed mb-6">{p.description}</p>

              <ul className="space-y-2.5 mb-8 flex-1">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span className={`${p.accentClass} mt-1.5 text-xs`}>◆</span>
                    <span className="text-[#F7F3EC]/80">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={p.href}
                className={`inline-block w-full text-center px-6 py-3.5 rounded-full ${p.buttonClass} text-black font-bold tracking-widest uppercase text-xs transition-all ${p.shadowClass}`}
              >
                {p.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
