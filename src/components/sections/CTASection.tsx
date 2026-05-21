"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CLIENT } from "@/lib/client-data";

export default function CTASection() {
  return (
    <section className="py-24 bg-[#141210] relative overflow-hidden">
      {/* Warm glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#C8A45D]/5 via-transparent to-[#10145F]/8" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#C8A45D]/4 blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">¿Lista para comenzar?</span>
          <h2 className="heading-serif text-4xl sm:text-5xl mt-4 mb-6">
            <span className="text-[#F7F3EC]">Tu portafolio inmobiliario</span>
            <br />
            <span className="text-gold-gradient">empieza con una conversación.</span>
          </h2>
          <p className="text-[#F7F3EC]/60 text-lg mb-10 max-w-2xl mx-auto">
            Ya sea que estés comenzando desde cero o quieras escalar lo que ya tienes,
            tengo la estrategia correcta para tu situación.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="px-10 py-4 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase hover:bg-[#E2C98A] transition-all hover:shadow-[0_0_40px_rgba(200,164,93,0.4)]"
            >
              Solicitar Consulta
            </Link>
            <a
              href={`https://wa.me/${CLIENT.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 rounded-full border border-[#C8A45D]/40 text-[#F7F3EC] tracking-widest uppercase hover:border-[#C8A45D] hover:text-[#C8A45D] transition-all hover:bg-[#C8A45D]/5"
            >
              WhatsApp Directo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
