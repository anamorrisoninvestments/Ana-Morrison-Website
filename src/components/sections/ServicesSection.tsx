"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CLIENT } from "@/lib/client-data";

const icons: Record<string, string> = {
  "Co-Hosting": "🏠",
  "Co-Living": "🏘️",
  "Arbitraje": "📈",
  "Tax Deeds": "⚖️",
  "Compra & Construcción": "🏗️",
  "Mentoría 1:1": "🎯",
};

export default function ServicesSection() {
  return (
    <section id="servicios" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">Las 5 Rutas + Mentoría</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#F7F3EC] mt-3 mb-4">
            Cómo puedo <span className="text-gold-gradient">ayudarte</span>
          </h2>
          <p className="text-[#F7F3EC]/60 text-lg max-w-2xl mx-auto">
            Hay más de una forma de crear riqueza con el alquiler a corto plazo. Encuentra la ruta que se adapta a tu situación.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLIENT.services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 border border-[#C8A45D]/20 hover:border-[#C8A45D] bg-[#111111] hover:bg-[#111111]/80 transition-all cursor-pointer"
            >
              <div className="text-3xl mb-4">{icons[service.title] || "✦"}</div>
              <h3 className="text-[#C8A45D] font-bold text-lg tracking-wide mb-3">{service.title}</h3>
              <p className="text-[#F7F3EC]/60 text-sm leading-relaxed">{service.description}</p>
              <div className="mt-6 h-px bg-gradient-to-r from-[#C8A45D]/0 via-[#C8A45D]/40 to-[#C8A45D]/0 group-hover:via-[#C8A45D] transition-all" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/contacto"
            className="inline-block px-10 py-4 bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#E2C98A] transition-colors"
          >
            Quiero Saber Cuál Ruta Es Para Mí
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
