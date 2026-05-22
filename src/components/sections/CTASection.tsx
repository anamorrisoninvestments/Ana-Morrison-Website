"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CLIENT } from "@/lib/client-data";

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
          <h2 className="heading-serif text-4xl sm:text-5xl mt-4 mb-8 leading-tight">
            <span className="text-[#F7F3EC]">No todos los clientes</span>
            <br />
            <span className="text-gold-gradient italic">necesitan lo mismo.</span>
          </h2>
          <p className="text-[#F7F3EC]/70 text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
            Algunos necesitan una propiedad lista para operar. Otros necesitan educación.
            Otros buscan acompañamiento estratégico. Otros buscan oportunidades de inversión.
          </p>
          <p className="text-[#F7F3EC]/60 text-base leading-relaxed mb-12 max-w-2xl mx-auto">
            Mi ecosistema está diseñado para ayudarte exactamente desde la etapa en la que te encuentras.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="px-10 py-4 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#E2C98A] transition-all hover:shadow-[0_0_40px_rgba(200,164,93,0.45)]"
            >
              Quiero Saber Cuál Solución es Para Mí
            </Link>
            <a
              href={`https://wa.me/${CLIENT.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 rounded-full border border-[#C8A45D]/40 text-[#F7F3EC] tracking-widest uppercase text-sm hover:border-[#C8A45D] hover:text-[#C8A45D] transition-all hover:bg-[#C8A45D]/5"
            >
              Agendar Llamada
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
