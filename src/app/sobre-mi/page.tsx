import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CTASection from "@/components/sections/CTASection";
import { CLIENT } from "@/lib/client-data";

export const metadata: Metadata = {
  title: "Sobre Mí",
  description: `Conoce la historia de ${CLIENT.name} — inversionista inmobiliaria, fundadora de The Host Circle y experta en alquileres a corto plazo con 9+ años de experiencia en 4 países.`,
  alternates: { canonical: "/sobre-mi" },
  openGraph: {
    title: `Sobre Mí | ${CLIENT.nameShort}`,
    description: CLIENT.bio.short,
    url: `${CLIENT.siteUrl}/sobre-mi`,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: CLIENT.faq.sobreMi.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: CLIENT.siteUrl },
    { "@type": "ListItem", position: 2, name: "Sobre Mí", item: `${CLIENT.siteUrl}/sobre-mi` },
  ],
};

export default function SobreMiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#10145F]/20 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <nav className="text-[#888888] text-sm mb-8">
                <a href="/" className="hover:text-[#C8A45D] transition-colors">Inicio</a>
                <span className="mx-2">/</span>
                <span className="text-[#C8A45D]">Sobre Mí</span>
              </nav>
              <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">Mi Historia</span>
              <h1 className="text-5xl sm:text-6xl font-bold text-[#F7F3EC] mt-3 mb-6">
                AnaMaria<br />
                <span className="text-gold-gradient">Morrison</span>
              </h1>
              <p className="text-[#F7F3EC]/70 text-xl leading-relaxed">{CLIENT.bio.short}</p>
            </div>
          </div>
        </section>

        {/* Bio completa */}
        <section className="py-20 bg-[#111111]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2 prose prose-invert max-w-none">
                {CLIENT.bio.long.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-[#F7F3EC]/80 text-base leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="space-y-6">
                <div className="p-6 border border-[#C8A45D]/30 bg-black">
                  <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-4">En Cifras</p>
                  {CLIENT.stats.map((s) => (
                    <div key={s.label} className="flex justify-between items-center py-3 border-b border-[#C8A45D]/10 last:border-0">
                      <span className="text-[#F7F3EC]/60 text-sm">{s.label}</span>
                      <span className="text-[#C8A45D] font-bold">{s.value}</span>
                    </div>
                  ))}
                </div>
                <div className="p-6 border border-[#22AEEF]/20 bg-[#10145F]/10">
                  <p className="text-[#22AEEF] text-xs tracking-widest uppercase font-semibold mb-4">Países de Operación</p>
                  {CLIENT.countries.map((c) => (
                    <p key={c} className="text-[#F7F3EC]/80 text-sm py-1">✓ {c}</p>
                  ))}
                </div>
                <div className="p-6 border border-[#C8A45D]/20 bg-black">
                  <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-4">The Host Circle</p>
                  <p className="text-[#F7F3EC]/60 text-sm leading-relaxed">
                    Marca educativa y operativa creada para enseñar, administrar y transformar propiedades en activos rentables.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-black">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#F7F3EC] mb-12 text-center">
              Preguntas <span className="text-gold-gradient">frecuentes</span>
            </h2>
            <div className="space-y-6">
              {CLIENT.faq.sobreMi.map((item, i) => (
                <div key={i} className="border border-[#C8A45D]/20 p-6">
                  <h3 className="text-[#C8A45D] font-semibold mb-3">{item.q}</h3>
                  <p className="text-[#F7F3EC]/70 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
