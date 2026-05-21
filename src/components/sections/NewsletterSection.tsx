"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import NewsletterForm from "@/components/ui/NewsletterForm";

export default function NewsletterSection() {
  return (
    <section className="bg-[#141210] py-24 px-6 relative overflow-hidden">
      {/* Warm radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,164,93,0.05)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#C8A45D]/4 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#C8A45D] text-xs tracking-[4px] uppercase mb-4">
              Newsletter · The Host Circle
            </p>
            <h2 className="heading-serif text-4xl md:text-5xl text-[#F7F3EC] leading-tight mb-6">
              Estrategias que no
              <br />
              <span className="text-gold-gradient">comparto en redes</span>
            </h2>
            <p className="text-[#888888] leading-relaxed mb-8">
              Cada semana: análisis de mercado, oportunidades de inversión, estrategias de co-hosting
              y lecciones aprendidas en mis operaciones reales. Directo a tu inbox. Sin spam.
            </p>

            <div className="space-y-3 mb-8">
              {[
                "Análisis de mercados en tiempo real",
                "Estrategias de precios que multiplican ingresos",
                "Oportunidades de tax deeds antes de que lleguen a todos",
                "Errores que debes evitar (los cometí yo por ti)",
              ].map((item) => (
                <div key={item} className="flex gap-3 items-start">
                  <span className="text-[#C8A45D] mt-1 text-xs">▸</span>
                  <span className="text-[#F7F3EC]/70 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="/recursos/guia-5-rutas"
              className="text-[#C8A45D]/70 text-sm hover:text-[#C8A45D] transition-colors underline underline-offset-4"
            >
              También: descarga gratis "Las 5 Rutas" →
            </Link>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-[#1C1916] border border-[#C8A45D]/20 p-8 rounded-2xl"
          >
            <NewsletterForm
              showName
              title="Únete a la comunidad"
              subtitle="Más de 3,000 inversionistas latinos ya reciben el newsletter. Sé el próximo."
              ctaText="Quiero el newsletter gratis"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
