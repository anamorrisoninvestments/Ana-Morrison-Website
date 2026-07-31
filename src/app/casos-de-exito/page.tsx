import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Casos de Éxito | Ana Morrison",
  description:
    "Transformaciones reales de propiedades y estrategias de adquisición. Casos verificables de alquiler a corto plazo, administración y Tax Deed.",
  alternates: { canonical: "/casos-de-exito" },
};

// Casos con métricas y fotografías verificadas. Los demás casos permanecen ocultos
// hasta contar con material real proporcionado por Ana.
const cases = [
  {
    type: "Transformación STR",
    market: "Colombia",
    situation:
      "Primera propiedad de Ana operada inicialmente bajo modelo de renta tradicional.",
    strategy:
      "Reposicionamiento al modelo de alquiler a corto plazo: diseño, listing profesional y operación en plataformas STR.",
    result:
      "Los ingresos de la propiedad se triplicaron al pasar del modelo de renta tradicional al modelo STR.",
    role: "Estrategia integral y operación",
    highlight: "De renta tradicional a alquiler a corto plazo: 3× en ingresos",
  },
];

export default function CasosPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0D0A08]">
        <section className="pt-40 pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
              Casos de Éxito
            </span>
            <h1 className="heading-serif text-5xl sm:text-6xl mt-4 mb-6 leading-[1.02] text-[#F7F3EC]">
              Transformaciones{" "}
              <span className="text-gold-gradient italic">reales</span> de propiedades.
            </h1>
            <p className="text-[#F7F3EC]/70 text-lg leading-relaxed max-w-3xl">
              Cada caso representa una decisión estratégica: analizar, adquirir, transformar,
              lanzar, automatizar y rentabilizar. Sin promesas irreales, solo resultados con contexto.
            </p>
          </div>
        </section>

        <section className="py-16 bg-[#141210]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
            {cases.map((c, i) => (
              <article
                key={i}
                className="p-8 rounded-2xl border border-[#C8A45D]/15 bg-[#1C1916] flex flex-col"
              >
                <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-2">
                  {c.type} · {c.market}
                </span>
                <h2 className="heading-serif text-2xl text-[#F7F3EC] mb-4">{c.highlight}</h2>
                <div className="space-y-3 text-sm mb-6 flex-1">
                  <div>
                    <p className="text-[#888888] uppercase tracking-wider text-xs mb-1">Situación</p>
                    <p className="text-[#F7F3EC]/80">{c.situation}</p>
                  </div>
                  <div>
                    <p className="text-[#888888] uppercase tracking-wider text-xs mb-1">Estrategia</p>
                    <p className="text-[#F7F3EC]/80">{c.strategy}</p>
                  </div>
                  <div>
                    <p className="text-[#888888] uppercase tracking-wider text-xs mb-1">Resultado</p>
                    <p className="text-[#F7F3EC]/80">{c.result}</p>
                  </div>
                  <div>
                    <p className="text-[#888888] uppercase tracking-wider text-xs mb-1">Rol de Ana</p>
                    <p className="text-[#F7F3EC]/80">{c.role}</p>
                  </div>
                </div>
              </article>
            ))}

            {/* Placeholder card para más casos por venir */}
            <div className="p-8 rounded-2xl border border-dashed border-[#C8A45D]/25 bg-[#1C1916]/40 flex flex-col items-center justify-center text-center">
              <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-3">
                Más casos próximamente
              </p>
              <p className="text-[#F7F3EC]/60 text-sm leading-relaxed max-w-xs">
                Estamos preparando casos adicionales de administración, adquisición Tax Deed,
                optimización de ingresos y automatización.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="heading-serif text-3xl sm:text-4xl text-[#F7F3EC] mb-6">
              ¿Quieres que tu propiedad sea el próximo caso?
            </h2>
            <Link
              href="/contacto"
              className="inline-block px-8 py-4 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#E2C98A] transition-all hover:shadow-[0_0_40px_rgba(200,164,93,0.45)]"
            >
              Conversemos
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
