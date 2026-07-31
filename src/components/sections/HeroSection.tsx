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
          backgroundImage:
            "linear-gradient(#C8A45D 1px, transparent 1px), linear-gradient(90deg, #C8A45D 1px, transparent 1px)",
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
                Ana Morrison · Real Estate Investor &amp; Strategist
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="heading-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95] mb-6 text-[#F7F3EC]"
            >
              Adquiere propiedades estratégicamente y conviértelas en{" "}
              <span className="text-gold-gradient italic">activos rentables</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[#F7F3EC]/75 text-lg leading-relaxed mb-10 max-w-xl"
            >
              Te ayudo a identificar oportunidades en Tax Deed, transformar propiedades
              y monetizarlas mediante alquileres a corto plazo con estrategia, sistemas
              y operación profesional.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 mb-8"
            >
              <Link
                href="#trabaja-conmigo"
                className="px-7 py-3.5 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-xs hover:bg-[#E2C98A] transition-all hover:shadow-[0_0_32px_rgba(200,164,93,0.4)] text-center"
              >
                Explorar cómo trabajar conmigo
              </Link>
              <Link
                href="/sobre-mi"
                className="px-7 py-3.5 rounded-full border border-[#C8A45D]/40 text-[#F7F3EC] tracking-widest uppercase text-xs hover:border-[#C8A45D] hover:text-[#C8A45D] transition-all text-center hover:bg-[#C8A45D]/5"
              >
                Conocer mi experiencia
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-[#888888] text-sm leading-relaxed max-w-xl border-t border-[#C8A45D]/15 pt-6"
            >
              9+ años de experiencia · Operaciones en 4 países · Portafolio inmobiliario
              multimillonario · Analista certificada en subastas Tax Deed
            </motion.p>
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
                  alt="Ana Morrison — Real Estate Investor &amp; STR / Tax Deed Strategist"
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
