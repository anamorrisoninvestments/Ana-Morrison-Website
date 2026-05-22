"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const hospitalityLevels = [
  "Mensajes con huéspedes",
  "Check-in",
  "Check-out",
  "Limpieza y reposición de insumos",
  "Mantenimiento",
  "Reseñas",
  "Reclamos",
  "Precios dinámicos",
];

const wealthRoutes = [
  { name: "Co-Hosting", text: "Administra propiedades de otros y cobra por gestión." },
  { name: "Co-Living", text: "Renta por habitación a profesionales y nómadas digitales." },
  { name: "Arbitraje", text: "Arrienda largo plazo y subarrienda en corto plazo." },
  { name: "Compra", text: "Adquiere propiedad propia y optimízala para STR." },
  { name: "Construcción", text: "Diseña y construye con DNA de hospitalidad desde cero." },
];

export default function MembershipSection() {
  return (
    <section id="membresia" className="py-28 bg-[#0D0A08] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(200,164,93,0.06)_0%,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
            Línea 02 · Educación
          </span>
          <h2 className="heading-serif text-4xl sm:text-5xl mt-3 mb-5 text-[#F7F3EC]">
            Membresía: <span className="text-gold-gradient italic">El Negocio de la Hospitalidad</span>
          </h2>
          <p className="text-[#F7F3EC]/65 text-lg leading-relaxed">
            Una membresía educativa para aprender cómo funciona el negocio de la hospitalidad
            y cómo construir riqueza con alquiler a corto plazo.
          </p>
          <div className="inline-flex items-baseline gap-2 mt-8 px-6 py-3 rounded-full bg-[#C8A45D]/8 border border-[#C8A45D]/30">
            <span className="heading-serif text-4xl text-[#C8A45D] font-bold">$19</span>
            <span className="text-[#F7F3EC]/70 text-sm">/ mes</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl border border-[#C8A45D]/20 bg-[#1C1916]"
          >
            <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-3">
              Módulo 01
            </p>
            <h3 className="heading-serif text-2xl text-[#F7F3EC] mb-4">
              El Negocio de la Hospitalidad
            </h3>
            <p className="text-[#F7F3EC]/65 text-sm leading-relaxed mb-6">
              Los 8 niveles esenciales para crear una experiencia premium al huésped a
              través de comunicación clara, limpieza impecable, amenities completos,
              mantenimiento activo, precios actualizados y operación organizada.
            </p>
            <div className="space-y-2">
              {hospitalityLevels.map((lvl, i) => (
                <div key={lvl} className="flex items-center gap-3 text-sm">
                  <span className="heading-serif text-[#C8A45D]/60 text-xs w-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[#F7F3EC]/80">{lvl}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-10 rounded-3xl border border-[#C8A45D]/20 bg-[#1C1916]"
          >
            <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-3">
              Módulo 02
            </p>
            <h3 className="heading-serif text-2xl text-[#F7F3EC] mb-4">
              Las 5 Rutas de la Riqueza con STR
            </h3>
            <p className="text-[#F7F3EC]/65 text-sm leading-relaxed mb-6">
              Cinco modelos probados para construir un portafolio de alquiler a corto plazo
              según tu capital, tiempo y nivel de involucramiento.
            </p>
            <div className="space-y-3">
              {wealthRoutes.map((r) => (
                <div key={r.name} className="border-l-2 border-[#C8A45D]/40 pl-4">
                  <p className="text-[#C8A45D] font-semibold text-sm mb-0.5">{r.name}</p>
                  <p className="text-[#F7F3EC]/65 text-xs leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="text-center">
          <Link
            href="/contacto"
            className="inline-block px-8 py-4 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-xs hover:bg-[#E2C98A] transition-all hover:shadow-[0_0_32px_rgba(200,164,93,0.35)]"
          >
            Unirme a la Membresía · $19/mes
          </Link>
        </div>
      </div>
    </section>
  );
}
