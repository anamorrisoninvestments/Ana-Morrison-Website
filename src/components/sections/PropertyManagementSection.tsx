"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const operations = [
  { title: "Comunicación con huéspedes", text: "Respuesta humana profesional + automatizaciones inteligentes." },
  { title: "Mensajes automatizados", text: "Flujos de pre-llegada, bienvenida, durante la estancia y post check-out." },
  { title: "Check-in y check-out", text: "Coordinación de accesos, códigos y experiencia de entrada/salida." },
  { title: "Limpieza y reposición de insumos", text: "Equipos coordinados, estándares de marca, amenities siempre completos." },
  { title: "Coordinación de mantenimiento", text: "Red de proveedores activa para resolver incidencias sin demoras." },
  { title: "Manejo de reseñas", text: "Estrategia para sostener calificación 5★ y responder con tono de marca." },
  { title: "Gestión de reclamos", text: "Protocolos claros para proteger ingresos y relación con plataformas." },
  { title: "Precios dinámicos", text: "Optimización continua según demanda, eventos y temporada." },
  { title: "Reportes y optimización", text: "Visibilidad mensual de desempeño y mejoras accionables." },
];

export default function PropertyManagementSection() {
  return (
    <section id="administracion" className="py-24 bg-[#141210]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-16"
        >
          <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
            Servicio Mensual Independiente
          </span>
          <h2 className="heading-serif text-4xl sm:text-5xl mt-3 mb-5 text-[#F7F3EC]">
            Administración Profesional de <span className="text-gold-gradient italic">Propiedades STR</span>
          </h2>
          <p className="text-[#F7F3EC]/65 text-lg leading-relaxed">
            Para propietarios que ya tienen una propiedad lista o publicada y necesitan una
            administración profesional que se encargue de la operación diaria, la experiencia
            del huésped, la optimización de ingresos y la coordinación completa del negocio.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {operations.map((op, i) => (
            <motion.div
              key={op.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-6 rounded-2xl border border-[#C8A45D]/15 hover:border-[#C8A45D]/40 bg-[#1C1916] transition-all"
            >
              <h3 className="text-[#C8A45D] font-semibold text-base mb-2">{op.title}</h3>
              <p className="text-[#F7F3EC]/65 text-sm leading-relaxed">{op.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/contacto"
            className="inline-block px-8 py-4 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-xs hover:bg-[#E2C98A] transition-all hover:shadow-[0_0_32px_rgba(200,164,93,0.35)]"
          >
            Quiero que Administren mi Propiedad
          </Link>
        </div>
      </div>
    </section>
  );
}
