import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CTASection from "@/components/sections/CTASection";
import { CLIENT } from "@/lib/client-data";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conferencias y Keynotes",
  description: `${CLIENT.nameShort} ofrece conferencias sobre alquileres a corto plazo, tax deeds, libertad financiera e inversión inmobiliaria para eventos corporativos, congresos y programas educativos.`,
  alternates: { canonical: "/conferencias" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: CLIENT.faq.conferencias.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const topics = [
  { title: "Las 5 Rutas Hacia la Riqueza con Airbnb", desc: "Cómo co-hosting, co-living, arbitraje, compra y construcción pueden generar libertad financiera para cualquier persona." },
  { title: "Tax Deeds: El Secreto Mejor Guardado del Inmobiliario", desc: "Cómo comprar propiedades directamente al condado a fracción de su precio de mercado." },
  { title: "De 0 a Portafolio: Mi Historia Real", desc: "El camino desde la primera propiedad en Colombia hasta operar en 4 países." },
  { title: "Mujeres Latinas y el Poder del Inmobiliario", desc: "Inspiración y estrategia para que más mujeres latinas construyan riqueza a través del real estate." },
  { title: "Automatización y Sistemas para Anfitriones", desc: "Cómo operar propiedades de forma escalable usando tecnología y equipos remotos." },
  { title: "Mentalidad de Inversionista", desc: "El shift mental necesario para dejar de ver propiedades como gastos y empezar a verlas como activos." },
];

export default function ConferenciasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#10145F]/20 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-[#888888] text-sm mb-8">
              <a href="/" className="hover:text-[#C8A45D] transition-colors">Inicio</a>
              <span className="mx-2">/</span>
              <span className="text-[#C8A45D]">Conferencias</span>
            </nav>
            <div className="max-w-3xl">
              <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">Speaking & Keynotes</span>
              <h1 className="text-5xl sm:text-6xl font-bold text-[#F7F3EC] mt-3 mb-6">
                Conferencias que<br />
                <span className="text-gold-gradient">transforman perspectivas.</span>
              </h1>
              <p className="text-[#F7F3EC]/70 text-xl leading-relaxed mb-8">
                AnaMaria Morrison lleva su experiencia real en inversión inmobiliaria y alquileres a corto plazo
                a escenarios corporativos, congresos y eventos de emprendimiento en toda Latinoamérica y Estados Unidos.
              </p>
              <Link
                href="/contacto"
                className="inline-block px-10 py-4 bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#E2C98A] transition-colors"
              >
                Contratar para tu Evento
              </Link>
            </div>
          </div>
        </section>

        {/* Topics */}
        <section className="py-20 bg-[#111111]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">Temas de Conferencia</span>
              <h2 className="text-3xl font-bold text-[#F7F3EC] mt-3">Keynotes disponibles</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((t, i) => (
                <div key={i} className="p-8 border border-[#C8A45D]/20 hover:border-[#C8A45D] transition-colors bg-black">
                  <div className="text-[#C8A45D] text-2xl font-bold mb-1">0{i + 1}</div>
                  <h3 className="text-[#F7F3EC] font-bold text-lg mb-3">{t.title}</h3>
                  <p className="text-[#F7F3EC]/60 text-sm leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Formats */}
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                { title: "Keynote", time: "45–60 min", desc: "Conferencia magistral ideal para inaugurar o cerrar un evento." },
                { title: "Workshop", time: "2–4 horas", desc: "Taller interactivo con ejercicios prácticos y herramientas aplicables." },
                { title: "Panel", time: "30–45 min", desc: "Participación como panelista experta en temas inmobiliarios." },
              ].map((f) => (
                <div key={f.title} className="p-8 border border-[#C8A45D]/20 bg-[#111111] text-center">
                  <p className="text-[#C8A45D] font-bold text-2xl mb-1">{f.title}</p>
                  <p className="text-[#888888] text-sm mb-4">{f.time}</p>
                  <p className="text-[#F7F3EC]/60 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-[#111111]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#F7F3EC] mb-12 text-center">
              Preguntas <span className="text-gold-gradient">frecuentes</span>
            </h2>
            <div className="space-y-6">
              {CLIENT.faq.conferencias.map((item, i) => (
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
