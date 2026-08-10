"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

type Props = { locale?: Locale };

export default function CTASection({ locale = "es" }: Props) {
  const isEN = locale === "en";
  const L = {
    eyebrow: isEN ? "Your Next Step" : "Tu Próximo Paso",
    h2a: isEN ? "Do you own a property," : "¿Tienes una propiedad",
    h2b: isEN ? "or are you looking for your next" : "o buscas tu próxima",
    h2accent: isEN ? "investment opportunity?" : "oportunidad de inversión?",
    lead: isEN
      ? "Pick the path that matches your situation and let's talk."
      : "Elige el camino que corresponde a tu momento y hablemos.",
    ctaStr: isEN ? "Improve My Property's Performance" : "Quiero rentabilizar una propiedad",
    ctaTax: isEN ? "Explore Tax Deed Investing" : "Quiero explorar Tax Deed",
    strHref: isEN ? "/en/contact?interes=str-rentabilizar" : "/contacto?interes=str",
    taxHref: isEN ? "/en/contact?interes=tax-deed-oportunidades" : "/contacto?interes=tax-deed",
  };
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
            {L.eyebrow}
          </span>
          <h2 className="heading-serif text-4xl sm:text-5xl mt-4 mb-6 leading-tight">
            <span className="text-[#F7F3EC]">{L.h2a}</span>
            <br />
            <span className="text-[#F7F3EC]">{L.h2b}</span>{" "}
            <span className="text-gold-gradient italic">{L.h2accent}</span>
          </h2>
          <p className="text-[#F7F3EC]/70 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            {L.lead}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={L.strHref}
              className="px-8 py-4 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#E2C98A] transition-all hover:shadow-[0_0_40px_rgba(200,164,93,0.45)]"
            >
              {L.ctaStr}
            </Link>
            <Link
              href={L.taxHref}
              className="px-8 py-4 rounded-full bg-[#22AEEF] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#22AEEF]/90 transition-all hover:shadow-[0_0_40px_rgba(34,174,239,0.45)]"
            >
              {L.ctaTax}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
