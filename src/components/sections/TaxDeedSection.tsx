"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const sevenSteps = [
  {
    n: "01",
    title: "Oficina de Impuestos",
    text: "Verificación de posesión 100%, interés indiviso, dirección oficial y tamaño exacto de cada parcela.",
  },
  {
    n: "02",
    title: "Tasación & GIS",
    text: "Cruce con el Appraisal District del condado y capas GIS para confirmar identidad de la propiedad.",
  },
  {
    n: "03",
    title: "Mapa & Geolocalización",
    text: "Validación geográfica con Google Maps y vista satelital para confirmar ubicación real.",
  },
  {
    n: "04",
    title: "Zona de Inundación",
    text: "Análisis automático con FloodFactor. Si el riesgo es alto, el título se descarta antes de subasta.",
  },
  {
    n: "05",
    title: "Valor Justo de Mercado",
    text: "Comparables en Zillow, Trulia y MLS para proyectar ganancia con margen de 30–40% bajo mercado.",
  },
  {
    n: "06",
    title: "Oficina del Secretario (Clerk)",
    text: "Búsqueda profunda de gravámenes: IRS liens, demolición, juicios, hipotecas y cargas activas.",
  },
  {
    n: "07",
    title: "Verificación Visual",
    text: "Confirmación con fotografía actual de la propiedad para descartar deterioro, ocupación o riesgo físico.",
  },
];

export default function TaxDeedSection() {
  return (
    <section id="tax-deed" className="py-28 bg-[#141210] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,174,239,0.06)_0%,transparent_55%)]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#10145F]/15 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-start mb-20">
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
              Tax Deed en Estados Unidos. Cada título que recibes pasa por el
              <span className="text-[#22AEEF]"> Método del Cazador</span> — un protocolo
              de 7 pasos de validación profesional ejecutado por nuestro sistema de
              inteligencia artificial.
            </p>
            <div className="p-5 rounded-2xl border border-[#22AEEF]/20 bg-[#10145F]/10 mb-6">
              <p className="text-[#22AEEF] text-xs tracking-widest uppercase font-semibold mb-2">
                Tecnología propietaria
              </p>
              <p className="text-[#F7F3EC]/70 text-sm leading-relaxed">
                Opero el sistema más actualizado del mercado para el análisis de
                títulos en subastas Tax Deed: <strong className="text-[#F7F3EC]">cientos
                de agentes virtuales con inteligencia artificial</strong> trabajando 24/7
                para rastrear oficinas de impuestos, cruzar registros del condado,
                analizar zonas de inundación, validar valor de mercado y filtrar
                gravámenes ocultos antes de cada subasta.
              </p>
            </div>
            <p className="text-[#F7F3EC]/55 text-sm leading-relaxed italic">
              Lo que un inversionista promedio tarda semanas en investigar — y
              probablemente nunca termina — nuestros agentes lo procesan en horas
              para cada título listado.
            </p>
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
              Listado Mensual de Títulos Pre-Validados por Condado
            </h3>
            <p className="text-[#F7F3EC]/70 text-sm leading-relaxed mb-8">
              Cada mes recibes una selección curada de los títulos más prometedores
              del condado de tu interés. Todos pasaron por los 7 filtros del Método
              del Cazador antes de llegar a tu bandeja.
            </p>
            <div className="flex items-baseline gap-3 mb-8 pb-6 border-b border-[#22AEEF]/15">
              <span className="heading-serif text-5xl text-[#22AEEF] font-bold">$200</span>
              <span className="text-[#F7F3EC]/70 text-sm">/ mes por condado</span>
            </div>
            <ul className="space-y-2.5 mb-8">
              {[
                "Títulos pre-filtrados con los 7 pasos del método",
                "Cientos de agentes virtuales analizando 24/7",
                "Información clave: dirección, valor estimado, riesgos, ganancia proyectada",
                "Alertas de subasta y soporte por email",
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-[#22AEEF] text-xs tracking-widest uppercase font-semibold">
            El Método del Cazador
          </span>
          <h3 className="heading-serif text-3xl sm:text-4xl mt-3 mb-4 text-[#F7F3EC]">
            7 pasos de <span className="text-blue-gradient italic">validación profesional</span>
          </h3>
          <p className="text-[#F7F3EC]/60 text-base leading-relaxed">
            Cada título listado pasa por estos siete filtros automatizados antes de
            recomendarse. Lo que hacemos por ti en horas, otros tardan semanas — y a
            menudo se les escapan los gravámenes ocultos que arruinan la inversión.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sevenSteps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="p-6 rounded-2xl border border-[#22AEEF]/15 bg-[#1C1916] hover:border-[#22AEEF]/40 transition-all"
            >
              <span className="heading-serif text-3xl italic text-[#22AEEF]/60">
                {step.n}
              </span>
              <h4 className="text-[#F7F3EC] font-semibold text-base mt-2 mb-2">
                {step.title}
              </h4>
              <p className="text-[#F7F3EC]/60 text-xs leading-relaxed">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
