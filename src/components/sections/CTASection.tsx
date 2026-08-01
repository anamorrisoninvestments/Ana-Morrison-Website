"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-28 bg-[#0D0A08] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#C8A45D]/6 via-transparent to-[#10145F]/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-[#C8A45D]/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
            Tu Próximo Paso
          </span>
          <h2 className="heading-serif text-4xl sm:text-5xl mt-4 mb-6 leading-tight">
            <span className="text-[#F7F3EC]">¿Tienes una propiedad</span>
            <br />
            <span className="text-[#F7F3EC]">o buscas tu próxima</span>{" "}
            <span className="text-gold-gradient italic">oportunidad de inversión?</span>
          </h2>
          <p className="text-[#F7F3EC]/70 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            Elige el camino que corresponde a tu momento y hablemos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto?interes=str"
              className="px-8 py-4 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#E2C98A] transition-all hover:shadow-[0_0_40px_rgba(200,164,93,0.45)]"
            >
              Quiero rentabilizar una propiedad
            </Link>
            <Link
              href="/contacto?interes=tax-deed"
              className="px-8 py-4 rounded-full bg-[#22AEEF] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#22AEEF]/90 transition-all hover:shadow-[0_0_40px_rgba(34,174,239,0.45)]"
            >
              Quiero explorar Tax Deed
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
