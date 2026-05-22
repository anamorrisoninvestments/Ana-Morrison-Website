"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CoachingSection() {
  return (
    <section id="coaching" className="py-28 bg-[#0D0A08] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,174,239,0.05)_0%,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-[#22AEEF] text-xs tracking-widest uppercase font-semibold">
            Línea 03 · Transformación Personal
          </span>
          <h2 className="heading-serif text-4xl sm:text-5xl mt-3 mb-5 text-[#F7F3EC]">
            Coaching Premium de <span className="text-blue-gradient italic">Amor Consciente</span>
          </h2>
          <p className="text-[#F7F3EC]/65 text-lg leading-relaxed mb-4">
            Un acompañamiento exclusivo para personas realmente comprometidas con su
            transformación personal, emocional, espiritual, financiera y de propósito.
          </p>
          <p className="text-[#22AEEF] text-sm tracking-wide italic">
            AnaMaria Morrison está certificada como Coach en Amor Consciente.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Initial — Charla amena */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl border border-[#22AEEF]/25 bg-gradient-to-br from-[#10145F]/20 to-[#1C1916] relative"
          >
            <span className="absolute top-6 right-6 text-[#22AEEF] text-xs tracking-widest uppercase font-semibold">
              Servicio Inicial
            </span>
            <h3 className="heading-serif text-2xl text-[#F7F3EC] mb-4 max-w-xs">
              Charla Amena de Claridad y Conexión
            </h3>
            <p className="text-[#F7F3EC]/70 text-sm leading-relaxed mb-6">
              Una conversación profunda y sin afán para conocernos, entender tus objetivos,
              tu momento de vida, tus bloqueos, tu visión y determinar si existe alineación
              para un proceso de coaching más profundo.
            </p>
            <div className="space-y-2 mb-8 text-sm">
              <div className="flex justify-between border-b border-[#22AEEF]/15 py-2">
                <span className="text-[#888888]">Duración</span>
                <span className="text-[#F7F3EC]">2 a 3 horas</span>
              </div>
              <div className="flex justify-between border-b border-[#22AEEF]/15 py-2">
                <span className="text-[#888888]">Modalidad ideal</span>
                <span className="text-[#F7F3EC]">Presencial</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#888888]">Inversión</span>
                <span className="heading-serif text-[#22AEEF] text-xl font-semibold">$600</span>
              </div>
            </div>
            <Link
              href="/contacto"
              className="inline-block w-full text-center px-6 py-3.5 rounded-full bg-[#22AEEF] text-black font-bold tracking-widest uppercase text-xs hover:bg-[#22AEEF]/90 transition-all hover:shadow-[0_0_28px_rgba(34,174,239,0.4)]"
            >
              Solicitar Charla Amena
            </Link>
          </motion.div>

          {/* Main — Paquete completo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-10 rounded-3xl border border-[#C8A45D]/30 bg-gradient-to-br from-[#C8A45D]/8 to-[#1C1916] relative"
          >
            <span className="absolute top-6 right-6 text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
              Oferta Principal
            </span>
            <h3 className="heading-serif text-2xl text-[#F7F3EC] mb-4 max-w-xs">
              Paquete de Coaching Premium
            </h3>
            <p className="text-[#F7F3EC]/70 text-sm leading-relaxed mb-6">
              Doce sesiones de acompañamiento profundo diseñadas para sostener una
              transformación real en las dimensiones emocional, espiritual, relacional,
              financiera y de propósito.
            </p>
            <div className="space-y-2 mb-8 text-sm">
              <div className="flex justify-between border-b border-[#C8A45D]/15 py-2">
                <span className="text-[#888888]">Sesiones</span>
                <span className="text-[#F7F3EC]">12 sesiones</span>
              </div>
              <div className="flex justify-between border-b border-[#C8A45D]/15 py-2">
                <span className="text-[#888888]">Modalidad</span>
                <span className="text-[#F7F3EC]">Presencial / Virtual</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#888888]">Inversión</span>
                <span className="heading-serif text-[#C8A45D] text-xl font-semibold">$6,000</span>
              </div>
            </div>
            <Link
              href="/contacto"
              className="inline-block w-full text-center px-6 py-3.5 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-xs hover:bg-[#E2C98A] transition-all hover:shadow-[0_0_28px_rgba(200,164,93,0.4)]"
            >
              Aplicar al Programa Completo
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
