"use client";

import { motion } from "framer-motion";
import { CLIENT } from "@/lib/client-data";

const socialPlatforms = [
  { name: "Instagram", count: "33.2K", handle: "@anamorrisoninvestments", platform: "seguidores" },
  { name: "Facebook", count: "7.8K", handle: "Ana Morrison Investments", platform: "seguidores" },
  { name: "YouTube", count: "111", handle: "@anamorrisoninvestments", platform: "suscriptores" },
  { name: "TikTok", count: "111", handle: "@anamorrisoninvestments", platform: "seguidores" },
];

const testimonials = [
  {
    quote: "AnaMaria me ayudó a transformar mi propiedad en un negocio rentable. En 3 meses recuperé mi inversión inicial.",
    name: "María G.",
    role: "Inversionista inmobiliaria, Miami",
  },
  {
    quote: "Gracias a su metodología de tax deeds, adquirí mi primera propiedad en subasta del condado con una fracción del precio de mercado.",
    name: "Carlos R.",
    role: "Emprendedor, Colombia",
  },
  {
    quote: "Su programa de co-hosting me permitió generar ingresos pasivos sin ser dueño de ninguna propiedad. Libertad financiera real.",
    name: "Alejandra M.",
    role: "Profesional, México",
  },
];

export default function SocialProofSection() {
  return (
    <>
      {/* Social numbers */}
      <section className="py-16 bg-[#10145F]/10 border-y border-[#22AEEF]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {socialPlatforms.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-[#22AEEF] text-3xl font-bold mb-1">{p.count}</p>
                <p className="text-[#F7F3EC]/80 text-sm font-semibold">{p.name}</p>
                <p className="text-[#888888] text-xs">{p.platform}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">Lo Que Dicen</span>
            <h2 className="text-4xl font-bold text-[#F7F3EC] mt-3">
              Historias de <span className="text-gold-gradient">transformación</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 border border-[#C8A45D]/20 bg-[#111111] relative"
              >
                <div className="text-[#C8A45D] text-5xl font-serif leading-none mb-4 opacity-50">"</div>
                <p className="text-[#F7F3EC]/80 text-sm leading-relaxed mb-6 italic">{t.quote}</p>
                <div className="border-t border-[#C8A45D]/20 pt-4">
                  <p className="text-[#C8A45D] font-semibold text-sm">{t.name}</p>
                  <p className="text-[#888888] text-xs">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
