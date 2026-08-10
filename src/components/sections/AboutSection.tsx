"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";

type Props = { locale?: Locale };

export default function AboutSection({ locale = "es" }: Props) {
  const isEN = locale === "en";
  const milestones = isEN
    ? [
        { year: "Age 22", text: "First property acquired in Colombia" },
        { year: "Tripled", text: "Income after moving from long-term rental to Airbnb" },
        { year: "9+ years", text: "Of experience in short-term rentals" },
        { year: "4 countries", text: "Operations in the US, Mexico, Colombia, and Venezuela" },
      ]
    : [
        { year: "22 años", text: "Primera propiedad adquirida en Colombia" },
        { year: "Triplicó", text: "Ingresos al pasar de renta tradicional a Airbnb" },
        { year: "9+ años", text: "De experiencia en alquiler a corto plazo" },
        { year: "4 países", text: "Operaciones en EE.UU., México, Colombia y Venezuela" },
      ];
  const countries = isEN
    ? ["United States", "Mexico", "Colombia", "Venezuela"]
    : ["Estados Unidos", "México", "Colombia", "Venezuela"];

  const L = {
    eyebrow: isEN ? "My Story" : "Mi Historia",
    h2a: isEN ? "More than managing properties," : "Más que administrar propiedades,",
    h2b: isEN ? "I build opportunities." : "construyo oportunidades.",
    p1: isEN
      ? "At 22, I bought my first property in Colombia — off-plan, in pre-construction. Years later, once it was delivered, I first operated it as a long-term rental. When I transitioned it to Airbnb, the income tripled. That experience showed me how dramatically the right operating strategy can change what a real estate asset produces."
      : "A los 22 años, adquirí mi primera propiedad en Colombia y la transformé de una renta tradicional a un modelo Airbnb, triplicando los ingresos. Ese momento cambió mi vida —y me mostró el poder real del alquiler a corto plazo.",
    p2a: isEN
      ? "Today I hold a multi-million-dollar real estate portfolio, operate properties across 4 countries, have specialized training in Tax Deed property and title analysis, and help investors replicate my methodology through "
      : "Hoy cuento con un portafolio inmobiliario valorado en varios millones de dólares, opero propiedades en 4 países, cuento con formación especializada en análisis de propiedades y subastas Tax Deed, y ayudo a inversionistas a replicar mi metodología a través de ",
    quote: isEN
      ? '"Wealth isn\'t improvised. It\'s built with vision, education, credit, strategy, systems, and consistent action."'
      : '"La riqueza no se improvisa. Se construye con visión, educación, crédito, estrategia, sistemas y acción constante."',
    readMore: isEN ? "Read my full story" : "Lee mi historia completa",
    aboutHref: isEN ? "/en/about" : "/sobre-mi",
    opsIn: isEN ? "Operations in" : "Operaciones en",
    alt: "AnaMaría Morrison",
  };

  return (
    <section id="sobre-mi" className="py-24 bg-[#141210]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative max-w-md mx-auto w-full"
            >
              <div className="relative w-full aspect-[3/4]">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#C8A45D]/8 to-transparent blur-xl" />
                <div className="absolute -inset-3 rounded-[1.75rem] border border-[#C8A45D]/20" />
                <div className="relative w-full h-full rounded-[1.25rem] overflow-hidden">
                  <Image
                    src="/images/anamaria-about.jpg"
                    alt={L.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0A08]/25 via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-[#C8A45D] rounded-br-2xl" />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">{L.eyebrow}</span>
            <h2 className="heading-serif text-4xl sm:text-5xl mt-3 mb-6">
              <span className="text-[#F7F3EC]">{L.h2a}</span>
              <br />
              <span className="text-gold-gradient">{L.h2b}</span>
            </h2>
            <p className="text-[#F7F3EC]/70 text-base leading-relaxed mb-4">{L.p1}</p>
            <p className="text-[#F7F3EC]/70 text-base leading-relaxed mb-6">
              {L.p2a}
              <strong className="text-[#C8A45D]">The Host Circle</strong>.
            </p>
            <blockquote className="border-l-2 border-[#C8A45D] pl-4 italic text-[#F7F3EC]/60 text-sm mb-8 font-serif">
              {L.quote}
            </blockquote>
            <Link
              href={L.aboutHref}
              className="inline-flex items-center gap-2 text-[#C8A45D] text-sm tracking-wider uppercase font-semibold hover:gap-4 transition-all mb-10"
            >
              {L.readMore} <span>→</span>
            </Link>

            <div className="space-y-3 mt-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 items-start p-5 rounded-2xl border border-[#C8A45D]/15 hover:border-[#C8A45D]/40 transition-all bg-[#1C1916]/60 hover:bg-[#1C1916]"
                >
                  <div className="flex-shrink-0 text-[#C8A45D] font-bold text-lg min-w-[80px] heading-serif">{m.year}</div>
                  <p className="text-[#F7F3EC]/80 text-sm leading-relaxed">{m.text}</p>
                </motion.div>
              ))}

              <div className="p-5 rounded-2xl bg-[#10145F]/15 border border-[#22AEEF]/20">
                <p className="text-[#22AEEF] text-xs tracking-widest uppercase font-semibold mb-3">{L.opsIn}</p>
                <div className="flex flex-wrap gap-2">
                  {countries.map((c) => (
                    <span key={c} className="px-3 py-1.5 rounded-full bg-[#22AEEF]/8 text-[#22AEEF] text-sm border border-[#22AEEF]/20">
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
