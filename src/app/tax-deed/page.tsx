import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Tax Deed | Inversión Inmobiliaria vía Subastas | Ana Morrison",
  description:
    "Educación, análisis y herramientas para identificar oportunidades Tax Deed. Aprende a evaluar propiedades antes de participar en subastas del condado.",
  alternates: { canonical: "/tax-deed" },
};

const filters = [
  "Investigación de oportunidades por condado",
  "Filtro preliminar de títulos disponibles",
  "Identificación de riesgos legales",
  "Análisis del estado físico del inmueble",
  "Estimación de costos posteriores",
  "Evaluación de estrategias de salida",
  "Educación estructurada para inversionistas",
];

const risks = [
  "Cargas o gravámenes remanentes sobre el título",
  "Estado desconocido del inmueble hasta la inspección",
  "Diferencias regulatorias entre estados y condados",
  "Costos de posesión y rehabilitación",
  "Tiempos legales variables según el proceso",
];

export default function TaxDeedPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0D0A08]">
        {/* Hero */}
        <section className="pt-40 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#10145F]/25 via-[#0D0A08] to-[#0D0A08]" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#22AEEF] text-xs tracking-widest uppercase font-semibold">
              Para Inversionistas · Tax Deed &amp; Acquisition Intelligence
            </span>
            <h1 className="heading-serif text-5xl sm:text-6xl mt-4 mb-6 leading-[1.02] text-[#F7F3EC]">
              Identifica{" "}
              <span className="text-blue-gradient italic">oportunidades inmobiliarias</span>{" "}
              antes de la subasta.
            </h1>
            <p className="text-[#F7F3EC]/70 text-lg leading-relaxed max-w-3xl mb-8">
              Educación, análisis y herramientas para inversionistas que buscan adquirir
              propiedades a través de subastas Tax Deed del condado con debida diligencia real.
            </p>
            <Link
              href="/contacto?interes=tax-deed"
              className="inline-block px-8 py-4 rounded-full bg-[#22AEEF] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#22AEEF]/90 transition-all hover:shadow-[0_0_40px_rgba(34,174,239,0.45)]"
            >
              Quiero explorar Tax Deed
            </Link>
          </div>
        </section>

        {/* Qué es */}
        <section className="py-20 bg-[#141210]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="heading-serif text-4xl text-[#F7F3EC] mb-6">
              ¿Qué es una <span className="text-blue-gradient italic">subasta Tax Deed</span>?
            </h2>
            <p className="text-[#F7F3EC]/75 text-lg leading-relaxed mb-4">
              Es un mecanismo por el cual el condado pone en subasta el título de propiedades
              cuyos dueños dejaron de pagar impuestos. El inversionista puede adquirir la
              propiedad —no solo la deuda— siguiendo el proceso del condado.
            </p>
            <p className="text-[#F7F3EC]/60 text-base leading-relaxed">
              Diferencia con Tax Lien: en Tax Lien se compra la deuda con intereses; en Tax
              Deed se compra directamente la propiedad. Las reglas exactas varían por estado
              y condado.
            </p>
          </div>
        </section>

        {/* Filtros y Riesgos */}
        <section className="py-20 bg-[#0D0A08]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
            <div>
              <span className="text-[#22AEEF] text-xs tracking-widest uppercase font-semibold">
                Cómo Ayudo
              </span>
              <h3 className="heading-serif text-3xl text-[#F7F3EC] mt-3 mb-6">
                Filtros de análisis
              </h3>
              <ul className="space-y-3">
                {filters.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[#F7F3EC]/80">
                    <span className="text-[#22AEEF] mt-1.5">◆</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
                Riesgos que debes considerar
              </span>
              <h3 className="heading-serif text-3xl text-[#F7F3EC] mt-3 mb-6">
                Debida diligencia obligatoria
              </h3>
              <ul className="space-y-3">
                {risks.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-[#F7F3EC]/80">
                    <span className="text-[#C8A45D] mt-1.5">◇</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-16 bg-[#141210]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 rounded-2xl border border-[#C8A45D]/25 bg-[#1C1916]">
              <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-3">
                Aviso Importante
              </p>
              <p className="text-[#F7F3EC]/75 text-sm leading-relaxed">
                El contenido de esta página es exclusivamente educativo. No constituye
                asesoría legal, financiera ni tributaria. Toda inversión implica riesgos y
                cada inversionista debe realizar su propia debida diligencia. Las reglas y
                procesos pueden variar según el estado y el condado. Los resultados
                anteriores no garantizan resultados futuros.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-[#0D0A08] text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="heading-serif text-4xl sm:text-5xl mb-6 text-[#F7F3EC] leading-tight">
              ¿Quieres analizar oportunidades{" "}
              <span className="text-blue-gradient italic">reales</span>?
            </h2>
            <p className="text-[#F7F3EC]/70 text-lg mb-10">
              Solicita el listado curado por condado o agenda una conversación estratégica.
            </p>
            <Link
              href="/contacto?interes=tax-deed"
              className="inline-block px-8 py-4 rounded-full bg-[#22AEEF] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#22AEEF]/90 transition-all hover:shadow-[0_0_40px_rgba(34,174,239,0.45)]"
            >
              Solicitar información
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
