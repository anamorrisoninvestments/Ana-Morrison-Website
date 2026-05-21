"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CLIENT } from "@/lib/client-data";

const milestones = [
  { year: "22 años", text: "Primera propiedad adquirida en Colombia" },
  { year: "Triplicó", text: "Ingresos al pasar de renta tradicional a Airbnb" },
  { year: "9+ años", text: "De experiencia en alquiler a corto plazo" },
  { year: "4 países", text: "Operaciones en EE.UU., México, Colombia y Venezuela" },
];

export default function AboutSection() {
  return (
    <section id="sobre-mi" className="py-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
          {/* Photo + Milestones */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative max-w-md mx-auto w-full"
            >
              <div className="relative w-full aspect-[3/4]">
                <div className="absolute -inset-3 border border-[#C8A45D]/20" />
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="/images/anamaria-about.jpg"
                    alt="AnaMaria Morrison"
                    fill
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-[#C8A45D]" />
              </div>
            </motion.div>
          </div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">Mi Historia</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#F7F3EC] mt-3 mb-6">
              Más que administrar propiedades,
              <br />
              <span className="text-gold-gradient">construyo oportunidades.</span>
            </h2>
            <p className="text-[#F7F3EC]/70 text-base leading-relaxed mb-4">
              A los 22 años, adquirí mi primera propiedad en Colombia y la transformé de una renta tradicional a un modelo Airbnb,
              triplicando los ingresos. Ese momento cambió mi vida —y me mostró el poder real del alquiler a corto plazo.
            </p>
            <p className="text-[#F7F3EC]/70 text-base leading-relaxed mb-6">
              Hoy cuento con un portafolio inmobiliario valorado en varios millones de dólares, opero propiedades en 4 países,
              estoy certificada como analista de subastas del condado (tax deeds), y ayudo a inversionistas a replicar
              mi metodología a través de <strong className="text-[#C8A45D]">The Host Circle</strong>.
            </p>
            <blockquote className="border-l-2 border-[#C8A45D] pl-4 italic text-[#F7F3EC]/60 text-sm mb-8">
              "La riqueza no se improvisa. Se construye con visión, educación, crédito, estrategia, sistemas y acción constante."
            </blockquote>
            <Link
              href="/sobre-mi"
              className="inline-flex items-center gap-2 text-[#C8A45D] text-sm tracking-wider uppercase font-semibold hover:gap-4 transition-all mb-10"
            >
              Lee mi historia completa <span>→</span>
            </Link>

            {/* Milestones */}
            <div className="space-y-4 mt-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 items-start p-5 border border-[#C8A45D]/20 hover:border-[#C8A45D]/50 transition-colors bg-black/50"
                >
                  <div className="flex-shrink-0 text-[#C8A45D] font-bold text-lg min-w-[80px]">{m.year}</div>
                  <p className="text-[#F7F3EC]/80 text-sm leading-relaxed">{m.text}</p>
                </motion.div>
              ))}

              {/* Countries */}
              <div className="p-5 bg-[#10145F]/20 border border-[#22AEEF]/20">
                <p className="text-[#22AEEF] text-xs tracking-widest uppercase font-semibold mb-3">Operaciones en</p>
                <div className="flex flex-wrap gap-2">
                  {CLIENT.countries.map((c) => (
                    <span key={c} className="px-3 py-1 bg-[#22AEEF]/10 text-[#22AEEF] text-sm border border-[#22AEEF]/20">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
