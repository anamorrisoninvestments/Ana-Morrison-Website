"use client";

import { motion } from "framer-motion";

const includes = [
  "Estrategia integral de la propiedad",
  "Diseño interior premium",
  "Compra de mobiliario y decoración",
  "Instalación y montaje completo",
  "Fotografía profesional",
  "Creación del listing",
  "Publicación en múltiples plataformas",
  "Configuración de software (PMS + Channel Manager)",
  "Automatización de mensajes",
  "Automatización de check-in y check-out",
  "Configuración de limpieza",
  "Configuración de mantenimiento",
  "Configuración de reseñas y reclamos",
  "Precios dinámicos",
  "Marketing digital inicial",
  "Sistema operativo listo para usar",
];

export default function PremiumExperienceSection() {
  return (
    <section id="anfitrion-premium" className="py-28 bg-[#0D0A08] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,164,93,0.08)_0%,transparent_60%)]" />
      <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-[#C8A45D]/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#C8A45D]/10 border border-[#C8A45D]/30 text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-6">
              Servicio High Ticket · Done For You
            </span>
            <h2 className="heading-serif text-5xl sm:text-6xl mb-6 leading-[0.95]">
              <span className="text-[#F7F3EC]">Experiencia </span>
              <span className="text-gold-gradient italic">Anfitrión Premium</span>
            </h2>
            <p className="text-[#F7F3EC]/75 text-lg leading-relaxed mb-6">
              Un servicio Done For You para propietarios e inversionistas que desean una
              operación de alquiler a corto plazo profesional, automatizada y de alto nivel.
            </p>
            <p className="text-[#F7F3EC]/60 text-base leading-relaxed mb-8">
              Servicio integral y hecho a la medida para clientes que desean transformar
              una propiedad en una experiencia de hospitalidad premium sin encargarse de la
              implementación. Puede iniciar desde la compra, construcción, remodelación,
              diseño, publicación o configuración inicial — y queda lista para operar.
            </p>
            <div className="p-5 rounded-2xl bg-[#10145F]/15 border border-[#22AEEF]/20 mb-8">
              <p className="text-[#22AEEF] text-xs tracking-widest uppercase font-semibold mb-2">
                Sitio dedicado
              </p>
              <a
                href="https://anfitrionpremium.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F7F3EC] text-lg font-semibold hover:text-[#22AEEF] transition-colors"
              >
                anfitrionpremium.com →
              </a>
            </div>
            <a
              href="https://anfitrionpremium.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#E2C98A] transition-all hover:shadow-[0_0_40px_rgba(200,164,93,0.4)]"
            >
              Conocer Experiencia Anfitrión Premium
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="p-10 rounded-3xl border border-[#C8A45D]/25 bg-[#1C1916] relative"
          >
            <div className="absolute -top-3 -right-3 w-20 h-20 border-t-2 border-r-2 border-[#C8A45D] rounded-tr-2xl" />
            <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-6">
              ¿Qué incluye?
            </p>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {includes.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-[#C8A45D] mt-1 text-xs">◆</span>
                  <span className="text-[#F7F3EC]/80 text-sm leading-snug">{item}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-[#C8A45D]/15">
              <p className="text-[#888888] text-xs italic leading-relaxed">
                Nota: Este servicio prepara y deja lista la propiedad para operar.
                La administración mensual continua es un servicio independiente
                (ver línea siguiente).
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
