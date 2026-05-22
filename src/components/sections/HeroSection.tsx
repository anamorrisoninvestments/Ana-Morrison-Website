"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0D0A08]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#10145F]/15 via-[#0D0A08] to-[#0D0A08]" />
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#C8A45D]/6 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#C8A45D]/4 to-transparent" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#C8A45D 1px, transparent 1px), linear-gradient(90deg, #C8A45D 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-[#C8A45D]/25 bg-[#C8A45D]/5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D] animate-pulse" />
              <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
                AnaMaria Morrison · The Host Circle
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="heading-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95] mb-6 text-[#F7F3EC]"
            >
              Construye, automatiza y escala tu negocio de{" "}
              <span className="text-gold-gradient italic">alquiler a corto plazo</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[#F7F3EC]/75 text-lg leading-relaxed mb-6 max-w-xl"
            >
              Estrategia profesional de hospitalidad, inversión inmobiliaria,
              automatización con inteligencia artificial y acompañamiento de alto nivel.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-[#888888] text-base leading-relaxed mb-10 max-w-xl"
            >
              Ayudo a propietarios, inversionistas y emprendedores a transformar
              propiedades en activos rentables mediante administración profesional,
              hospitalidad premium, automatización con IA, educación estratégica
              y acompañamiento de transformación personal.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 flex-wrap"
            >
              <Link
                href="#ecosistema"
                className="px-7 py-3.5 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-xs hover:bg-[#E2C98A] transition-all hover:shadow-[0_0_32px_rgba(200,164,93,0.4)] text-center"
              >
                Explorar Servicios
              </Link>
              <Link
                href="#membresia"
                className="px-7 py-3.5 rounded-full border border-[#C8A45D]/40 text-[#F7F3EC] tracking-widest uppercase text-xs hover:border-[#C8A45D] hover:text-[#C8A45D] transition-all text-center hover:bg-[#C8A45D]/5"
              >
                Ver Programas Educativos
              </Link>
              <Link
                href="/contacto"
                className="px-7 py-3.5 rounded-full border border-[#22AEEF]/40 text-[#22AEEF] tracking-widest uppercase text-xs hover:border-[#22AEEF] hover:bg-[#22AEEF]/10 transition-all text-center"
              >
                Solicitar Llamada
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-[3/4] max-w-md mx-auto">
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[#C8A45D]/10 to-transparent blur-2xl" />
              <div className="absolute -inset-4 rounded-[1.75rem] border border-[#C8A45D]/25" />
              <div className="absolute -inset-2 rounded-[1.5rem] border border-[#C8A45D]/10" />
              <div className="relative w-full h-full rounded-[1.25rem] overflow-hidden">
                <Image
                  src="/images/anamaria-morrison.jpg"
                  alt="AnaMaria Morrison — Fundadora de The Host Circle"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 448px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0A08]/30 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-[#C8A45D] rounded-br-xl" />
              <div className="absolute -top-4 -left-4 w-14 h-14 border-t-2 border-l-2 border-[#C8A45D] rounded-tl-xl" />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-[#888888] text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#C8A45D] to-transparent" />
      </motion.div>
    </section>
  );
}
