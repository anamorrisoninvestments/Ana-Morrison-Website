"use client";

import { motion } from "framer-motion";

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
      <section className="py-16 bg-[#10145F]/8 border-y border-[#22AEEF]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {socialPlatforms.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-[#10145F]/10 border border-[#22AEEF]/10 hover:border-[#22AEEF]/30 transition-all"
              >
                <p className="heading-serif text-[#22AEEF] text-4xl font-bold mb-1">{p.count}</p>
                <p className="text-[#F7F3EC]/80 text-sm font-semibold">{p.name}</p>
                <p className="text-[#888888] text-xs">{p.platform}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#0D0A08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">Lo Que Dicen</span>
            <h2 className="heading-serif text-4xl mt-3">
              <span className="text-[#F7F3EC]">Historias de </span>
              <span className="text-gold-gradient">transformación</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl border border-[#C8A45D]/15 bg-[#1C1916] relative hover:border-[#C8A45D]/35 transition-all hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
              >
                <div className="heading-serif text-[#C8A45D] text-6xl leading-none mb-4 opacity-40 select-none">"</div>
                <p className="text-[#F7F3EC]/80 text-sm leading-relaxed mb-6 italic font-serif">{t.quote}</p>
                <div className="border-t border-[#C8A45D]/15 pt-4">
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
