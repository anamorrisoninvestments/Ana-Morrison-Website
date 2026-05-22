"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ecosystem = [
  {
    code: "01",
    title: "Servicios Profesionales STR",
    subtitle: "Hospitalidad & Administración",
    description:
      "Soluciones profesionales para propietarios e inversionistas que desean preparar, publicar, automatizar o administrar una propiedad de alquiler a corto plazo.",
    href: "#servicios-str",
    cta: "Ver servicios",
    accent: "gold",
  },
  {
    code: "02",
    title: "Educación & Mentoría",
    subtitle: "Membresía + Programa Anual",
    description:
      "Para quienes quieren aprender el negocio de la hospitalidad y construir riqueza con las cinco rutas del alquiler a corto plazo.",
    href: "#membresia",
    cta: "Ver programas",
    accent: "gold",
  },
  {
    code: "03",
    title: "Coaching Premium",
    subtitle: "Amor Consciente & Expansión",
    description:
      "Acompañamiento exclusivo para personas comprometidas con su transformación personal, emocional, espiritual, financiera y de propósito.",
    href: "#coaching",
    cta: "Conocer más",
    accent: "blue",
  },
  {
    code: "04",
    title: "Tax Deed Intelligence",
    subtitle: "Inversión Inmobiliaria con IA",
    description:
      "Servicio especializado para inversionistas: listados mensuales filtrados de los mejores títulos disponibles en subastas Tax Deed en Estados Unidos.",
    href: "#tax-deed",
    cta: "Ver listado",
    accent: "blue",
  },
];

export default function EcosystemSection() {
  return (
    <section id="ecosistema" className="py-24 bg-[#0D0A08] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#141210]/40 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
            Ecosistema de Soluciones
          </span>
          <h2 className="heading-serif text-4xl sm:text-5xl mt-3 mb-5">
            <span className="text-[#F7F3EC]">Cuatro líneas, </span>
            <span className="text-gold-gradient italic">una visión.</span>
          </h2>
          <p className="text-[#F7F3EC]/60 text-lg leading-relaxed">
            Cada cliente está en una etapa diferente. Mi ecosistema está diseñado para
            acompañarte exactamente desde donde te encuentras hoy.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {ecosystem.map((item, i) => {
            const isGold = item.accent === "gold";
            const accentColor = isGold ? "#C8A45D" : "#22AEEF";
            return (
              <motion.div
                key={item.code}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-10 rounded-3xl border border-[#C8A45D]/15 bg-[#1C1916] hover:border-[#C8A45D]/45 transition-all hover:-translate-y-1 hover:shadow-[0_16px_60px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-start justify-between mb-6">
                  <span
                    className="heading-serif text-5xl italic opacity-40"
                    style={{ color: accentColor }}
                  >
                    {item.code}
                  </span>
                  <span
                    className="text-xs tracking-widest uppercase font-semibold"
                    style={{ color: accentColor }}
                  >
                    {item.subtitle}
                  </span>
                </div>
                <h3 className="heading-serif text-2xl text-[#F7F3EC] mb-4 group-hover:text-[#C8A45D] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[#F7F3EC]/65 text-base leading-relaxed mb-8">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 text-sm tracking-widest uppercase font-semibold transition-all group-hover:gap-4"
                  style={{ color: accentColor }}
                >
                  {item.cta} <span>→</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
