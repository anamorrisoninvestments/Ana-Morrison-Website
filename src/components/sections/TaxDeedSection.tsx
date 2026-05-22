"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function TaxDeedSection() {
  return (
    <section id="tax-deed" className="py-28 bg-[#141210] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,174,239,0.06)_0%,transparent_55%)]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#10145F]/15 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#22AEEF] text-xs tracking-widest uppercase font-semibold">
              Línea 04 · Inversión Inmobiliaria
            </span>
            <h2 className="heading-serif text-4xl sm:text-5xl mt-3 mb-5 text-[#F7F3EC]">
              Tax Deed <span className="text-blue-gradient italic">Title Intelligence</span>
            </h2>
            <p className="text-[#F7F3EC]/70 text-lg leading-relaxed mb-5">
              Servicio especializado para inversionistas interesados en subastas de
              Tax Deed en Estados Unidos. A través de un software propio diseñado con
              inteligencia artificial, se filtran oportunidades y se identifican los
              mejores títulos disponibles en cada subasta.
            </p>
            <div className="p-5 rounded-2xl border border-[#22AEEF]/20 bg-[#10145F]/10 mb-6">
              <p className="text-[#22AEEF] text-xs tracking-widest uppercase font-semibold mb-2">
                Sobre el software
              </p>
              <p className="text-[#F7F3EC]/70 text-sm leading-relaxed">
                El software no está disponible al público por ahora porque se encuentra
                en construcción. Actualmente se ofrece un servicio mensual de listados
                curados por condado.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-10 rounded-3xl border border-[#22AEEF]/30 bg-gradient-to-br from-[#10145F]/25 to-[#1C1916] relative"
          >
            <div className="absolute -top-3 -right-3 w-20 h-20 border-t-2 border-r-2 border-[#22AEEF] rounded-tr-2xl" />
            <span className="text-[#22AEEF] text-xs tracking-widest uppercase font-semibold">
              Oferta Activa
            </span>
            <h3 className="heading-serif text-2xl text-[#F7F3EC] mt-3 mb-4">
              Listado Mensual de Mejores Títulos por Condado
            </h3>
            <p className="text-[#F7F3EC]/70 text-sm leading-relaxed mb-8">
              Recibe cada mes una selección curada por inteligencia artificial de los
              títulos más prometedores disponibles en el condado de tu interés.
            </p>
            <div className="flex items-baseline gap-3 mb-8 pb-6 border-b border-[#22AEEF]/15">
              <span className="heading-serif text-5xl text-[#22AEEF] font-bold">$200</span>
              <span className="text-[#F7F3EC]/70 text-sm">/ mes por condado</span>
            </div>
            <ul className="space-y-2.5 mb-8">
              {[
                "Listado curado mensualmente",
                "Filtrado con inteligencia artificial propia",
                "Información clave por título",
                "Soporte por email",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <span className="text-[#22AEEF] mt-1 text-xs">◆</span>
                  <span className="text-[#F7F3EC]/80">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/contacto"
              className="inline-block w-full text-center px-6 py-3.5 rounded-full bg-[#22AEEF] text-black font-bold tracking-widest uppercase text-xs hover:bg-[#22AEEF]/90 transition-all hover:shadow-[0_0_32px_rgba(34,174,239,0.4)]"
            >
              Solicitar Listado de mi Condado
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
