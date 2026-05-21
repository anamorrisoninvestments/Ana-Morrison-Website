"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CLIENT } from "@/lib/client-data";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0D0A08]">
      {/* Warm radial glows */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#10145F]/15 via-[#0D0A08] to-[#0D0A08]" />
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#C8A45D]/6 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#C8A45D]/4 to-transparent" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#C8A45D 1px, transparent 1px), linear-gradient(90deg, #C8A45D 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-[#C8A45D]/25 bg-[#C8A45D]/5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D] animate-pulse" />
              <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
                Founder & CEO · The Host Circle
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="heading-serif text-6xl sm:text-7xl lg:text-8xl leading-[0.92] mb-8"
            >
              <span className="text-[#F7F3EC]">Ana</span>
              <span className="text-gold-gradient">Maria</span>
              <br />
              <span className="text-[#F7F3EC]">Morrison</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[#F7F3EC]/70 text-lg sm:text-xl leading-relaxed mb-4 max-w-lg"
            >
              Empresaria, inversionista inmobiliaria y estratega de alquileres a corto plazo.
              Más de <strong className="text-[#C8A45D]">9 años</strong> transformando propiedades en vehículos de libertad financiera.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-[#888888] text-sm italic mb-10 border-l-2 border-[#C8A45D]/40 pl-4 font-serif"
            >
              "{CLIENT.tagline}"
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/contacto"
                className="px-8 py-4 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#E2C98A] transition-all hover:shadow-[0_0_32px_rgba(200,164,93,0.4)] text-center"
              >
                Trabajemos Juntos
              </Link>
              <Link
                href="/sobre-mi"
                className="px-8 py-4 rounded-full border border-[#C8A45D]/40 text-[#F7F3EC] tracking-widest uppercase text-sm hover:border-[#C8A45D] hover:text-[#C8A45D] transition-all text-center hover:bg-[#C8A45D]/5"
              >
                Conoce Mi Historia
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-4 gap-4 mt-14 pt-10 border-t border-[#C8A45D]/20"
            >
              {CLIENT.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="heading-serif text-[#C8A45D] text-3xl sm:text-4xl font-bold">{stat.value}</p>
                  <p className="text-[#888888] text-xs mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-[3/4] max-w-md mx-auto">
              {/* Warm glow behind photo */}
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[#C8A45D]/10 to-transparent blur-2xl" />
              {/* Gold frame */}
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
                {/* Subtle warm overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0A08]/30 via-transparent to-transparent" />
              </div>
              {/* Gold accent corners */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-[#C8A45D] rounded-br-xl" />
              <div className="absolute -top-4 -left-4 w-14 h-14 border-t-2 border-l-2 border-[#C8A45D] rounded-tl-xl" />
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-6 bottom-24 bg-[#10145F] border border-[#22AEEF]/40 px-5 py-4 rounded-2xl shadow-xl backdrop-blur-sm"
            >
              <p className="text-[#22AEEF] text-xs tracking-wider uppercase font-semibold">USA · México · Colombia</p>
              <p className="text-white text-sm font-bold mt-0.5">4 Países de Operación</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
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
