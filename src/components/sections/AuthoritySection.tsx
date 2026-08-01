"use client";

import { motion } from "framer-motion";

const pillars = [
  { value: "9+", label: "Años de experiencia", detail: "en alquileres a corto plazo" },
  { value: "4", label: "Países", detail: "US · MX · CO · VE" },
  { value: "3", label: "Roles", detail: "propietaria · administradora · inversionista" },
  { value: "Tax Deed", label: "Formación especializada", detail: "análisis de títulos y oportunidades" },
];

export default function AuthoritySection() {
  return (
    <section
      id="autoridad"
      className="py-24 bg-[#141210] relative overflow-hidden border-y border-[#C8A45D]/10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,164,93,0.05)_0%,transparent_60%)]" />
      <div className="absolute -top-20 right-0 w-96 h-96 rounded-full bg-[#10145F]/15 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
            Autoridad Verificada
          </span>
          <h2 className="heading-serif text-4xl sm:text-5xl mt-4 leading-tight text-[#F7F3EC]">
            Experiencia real en{" "}
            <span className="text-gold-gradient italic">
              inversión y operación inmobiliaria
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center p-7 rounded-2xl border border-[#C8A45D]/15 bg-[#1C1916] hover:border-[#C8A45D]/40 transition-all"
            >
              <p className="heading-serif text-[#C8A45D] text-4xl sm:text-5xl font-bold mb-2 leading-none">
                {p.value}
              </p>
              <p className="text-[#F7F3EC]/85 text-sm font-semibold uppercase tracking-wider mb-1">
                {p.label}
              </p>
              <p className="text-[#888888] text-xs leading-snug">{p.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
