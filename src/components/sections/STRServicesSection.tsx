"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  { icon: "✦", title: "Diseño de interiores para STR", text: "Curaduría espacial pensada para fotografía, experiencia y rentabilidad." },
  { icon: "✦", title: "Compra de mobiliario y decoración", text: "Selección estratégica de cada pieza con criterio de marca y huésped." },
  { icon: "✦", title: "Instalación y montaje", text: "Coordinación completa del setup físico hasta dejar la propiedad lista." },
  { icon: "✦", title: "Fotografía profesional", text: "Producción visual que convierte: ángulos, luz, narrativa y atmósfera." },
  { icon: "✦", title: "Creación y publicación de listings", text: "Títulos, descripciones, reglas y precios optimizados para cada plataforma." },
  { icon: "✦", title: "Publicación en múltiples plataformas", text: "Airbnb, Booking, Expedia, VRBO y canales directos sincronizados." },
  { icon: "✦", title: "Sincronización en software de administración", text: "Channel manager y PMS configurados para operar sin choques de calendarios." },
  { icon: "✦", title: "Automatización operativa", text: "Mensajes, check-in, check-out, limpieza, mantenimiento, reseñas y reclamos." },
  { icon: "✦", title: "Marketing digital para STR", text: "Posicionamiento orgánico y de pago para acelerar reservas directas." },
];

export default function STRServicesSection() {
  return (
    <section id="servicios-str" className="py-24 bg-[#141210]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-16"
        >
          <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
            Línea 01 · Servicios Profesionales
          </span>
          <h2 className="heading-serif text-4xl sm:text-5xl mt-3 mb-5 text-[#F7F3EC]">
            Servicios de <span className="text-gold-gradient italic">Hospitalidad & Administración STR</span>
          </h2>
          <p className="text-[#F7F3EC]/65 text-lg leading-relaxed">
            Soluciones diseñadas para propietarios e inversionistas que desean convertir
            una propiedad en una experiencia rentable, profesional y lista para operar en
            plataformas como Airbnb, Booking, Expedia y otros canales de alquiler a corto plazo.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group p-7 rounded-2xl border border-[#C8A45D]/15 hover:border-[#C8A45D]/45 bg-[#1C1916] transition-all hover:-translate-y-1"
            >
              <div className="text-[#C8A45D] text-2xl mb-3 opacity-70">{s.icon}</div>
              <h3 className="text-[#F7F3EC] font-semibold text-base mb-2 group-hover:text-[#C8A45D] transition-colors">
                {s.title}
              </h3>
              <p className="text-[#F7F3EC]/60 text-sm leading-relaxed">{s.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 p-8 rounded-2xl border border-[#C8A45D]/20 bg-[#1C1916]/60 flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          <p className="text-[#F7F3EC]/75 text-base leading-relaxed max-w-2xl">
            Puedes contratar <strong className="text-[#C8A45D]">servicios individuales</strong> según
            la etapa de tu propiedad, o elegir una <strong className="text-[#C8A45D]">solución completa Done For You</strong> con
            Experiencia Anfitrión Premium.
          </p>
          <Link
            href="/contacto"
            className="px-7 py-3.5 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-xs hover:bg-[#E2C98A] transition-all hover:shadow-[0_0_32px_rgba(200,164,93,0.35)] whitespace-nowrap"
          >
            Solicitar Evaluación
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
