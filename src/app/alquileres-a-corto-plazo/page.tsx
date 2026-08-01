import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Alquileres a Corto Plazo | Ana Morrison",
  description:
    "Diagnóstico, transformación, lanzamiento y administración profesional de propiedades de alquiler a corto plazo. Estrategia, sistemas y operación de alto nivel.",
  alternates: { canonical: "/alquileres-a-corto-plazo" },
};

const steps = [
  { n: "01", t: "Análisis de viabilidad", d: "Estudio de mercado, demanda y regulación local antes de invertir en preparación." },
  { n: "02", t: "Estrategia del activo", d: "Definición de posicionamiento, huésped ideal, pricing base y estrategia de canal." },
  { n: "03", t: "Diseño y preparación", d: "Amoblado, decoración funcional, fotografía profesional y experiencia diferenciada." },
  { n: "04", t: "Lanzamiento en plataformas", d: "Publicación optimizada en Airbnb, Booking y otros canales estratégicos." },
  { n: "05", t: "Optimización del listing", d: "Mejora continua de título, descripción, fotos, reglas y respuestas automáticas." },
  { n: "06", t: "Automatización", d: "IA y sistemas para mensajería, códigos, limpieza, mantenimiento y reseñas." },
  { n: "07", t: "Revenue management", d: "Ajuste dinámico de precios y estrategias temporadas para maximizar ingresos." },
  { n: "08", t: "Administración profesional", d: "Operación completa mientras el propietario recibe reportes claros y control real." },
];

const benefits = [
  "Mayor rentabilidad potencial",
  "Menos carga operativa",
  "Protección del activo",
  "Mejor experiencia del huésped",
  "Operación profesional y estandarizada",
  "Visibilidad y control con reportes",
  "Sistemas y automatización con IA",
];

export default function AlquileresPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0D0A08]">
        {/* Hero */}
        <section className="pt-40 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C8A45D]/6 via-[#0D0A08] to-[#0D0A08]" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
              Para Propietarios · Short-Term Rental Strategy
            </span>
            <h1 className="heading-serif text-5xl sm:text-6xl mt-4 mb-6 leading-[1.02] text-[#F7F3EC]">
              Convierte tu propiedad en un{" "}
              <span className="text-gold-gradient italic">activo rentable</span> de alquiler a corto plazo.
            </h1>
            <p className="text-[#F7F3EC]/70 text-lg leading-relaxed max-w-3xl mb-8">
              Diagnóstico, transformación, lanzamiento, automatización y administración profesional
              de propiedades de alquiler a corto plazo — con estrategia, sistemas y operación de alto nivel.
            </p>
            <Link
              href="/contacto?interes=str"
              className="inline-block px-8 py-4 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#E2C98A] transition-all hover:shadow-[0_0_40px_rgba(200,164,93,0.45)]"
            >
              Quiero rentabilizar mi propiedad
            </Link>
          </div>
        </section>

        {/* Beneficios */}
        <section className="py-20 bg-[#141210]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="heading-serif text-3xl sm:text-4xl text-[#F7F3EC] mb-10">
              Qué obtienes al trabajar conmigo
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((b) => (
                <div
                  key={b}
                  className="p-5 rounded-2xl border border-[#C8A45D]/15 bg-[#1C1916] flex items-start gap-3"
                >
                  <span className="text-[#C8A45D] mt-1">◆</span>
                  <span className="text-[#F7F3EC]/85 text-base">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proceso */}
        <section className="py-24 bg-[#0D0A08]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-14">
              <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
                Cómo Trabajamos
              </span>
              <h2 className="heading-serif text-4xl sm:text-5xl mt-4 text-[#F7F3EC]">
                De propiedad ociosa a{" "}
                <span className="text-gold-gradient italic">activo operativo</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {steps.map((s) => (
                <div
                  key={s.n}
                  className="p-7 rounded-2xl border border-[#C8A45D]/15 bg-[#1C1916] hover:border-[#C8A45D]/45 transition-all"
                >
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="text-[#C8A45D] heading-serif text-2xl">{s.n}</span>
                    <h3 className="heading-serif text-xl text-[#F7F3EC]">{s.t}</h3>
                  </div>
                  <p className="text-[#F7F3EC]/70 text-sm leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-[#141210] text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="heading-serif text-4xl sm:text-5xl mb-6 text-[#F7F3EC] leading-tight">
              ¿Tu propiedad ya está lista para{" "}
              <span className="text-gold-gradient italic">producir</span>?
            </h2>
            <p className="text-[#F7F3EC]/70 text-lg mb-10">
              Cuéntame de tu propiedad y evaluemos juntos su potencial.
            </p>
            <Link
              href="/contacto?interes=str"
              className="inline-block px-8 py-4 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#E2C98A] transition-all hover:shadow-[0_0_40px_rgba(200,164,93,0.45)]"
            >
              Solicitar diagnóstico
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
