"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CLIENT } from "@/lib/client-data";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#10145F]/20 via-black to-black" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#C8A45D]/5 to-transparent" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "linear-gradient(#C8A45D 1px, transparent 1px), linear-gradient(90deg, #C8A45D 1px, transparent 1px)",
          backgroundSize: "60px 60px",
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
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="h-px w-8 bg-[#C8A45D]" />
              <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
                Founder & CEO · The Host Circle
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
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
              className="text-[#888888] text-sm italic mb-8 border-l-2 border-[#C8A45D]/40 pl-4"
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
                className="px-8 py-4 bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#E2C98A] transition-colors text-center"
              >
                Trabajemos Juntos
              </Link>
              <Link
                href="/sobre-mi"
                className="px-8 py-4 border border-[#C8A45D]/40 text-[#F7F3EC] tracking-widest uppercase text-sm hover:border-[#C8A45D] hover:text-[#C8A45D] transition-colors text-center"
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
                  <p className="text-[#C8A45D] text-2xl sm:text-3xl font-bold">{stat.value}</p>
                  <p className="text-[#888888] text-xs mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: photo placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-[3/4] max-w-md mx-auto">
              {/* Gold frame */}
              <div className="absolute -inset-4 border border-[#C8A45D]/30" />
              <div className="absolute -inset-2 border border-[#C8A45D]/10" />
              <div className="w-full h-full bg-gradient-to-br from-[#1A1A1A] to-[#111111] flex items-center justify-center">
                {/* Placeholder — replace with <Image src="/images/anamaria-morrison.jpg" /> */}
                <div className="text-center">
                  <div className="text-[#C8A45D] text-6xl mb-4">👤</div>
                  <p className="text-[#888888] text-sm">Foto profesional de AnaMaria</p>
                  <p className="text-[#888888] text-xs mt-1">Subir a /public/images/anamaria-morrison.jpg</p>
                </div>
              </div>
              {/* Gold accent */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#C8A45D]" />
              <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-[#C8A45D]" />
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-6 bottom-24 bg-[#10145F] border border-[#22AEEF]/40 px-4 py-3 shadow-xl"
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
