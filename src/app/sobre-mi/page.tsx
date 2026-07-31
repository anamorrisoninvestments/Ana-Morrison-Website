import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { CLIENT } from "@/lib/client-data";

export const metadata: Metadata = {
  title: "Sobre Ana Morrison",
  description:
    "Ana Morrison — Real Estate Investor & Strategist. 9+ años transformando propiedades en activos rentables a través de alquiler a corto plazo y Tax Deed. Operaciones en 4 países.",
  alternates: { canonical: "/sobre-mi" },
  openGraph: {
    title: "Sobre Ana Morrison",
    description:
      "9+ años en alquileres a corto plazo, administración profesional y Tax Deed. Operaciones en 4 países.",
    url: `${CLIENT.siteUrl}/sobre-mi`,
  },
};

// Timeline profesional. Solo se muestra públicamente lo que está confirmado.
// Los eventos sin año calendario documentado se marcan `year: null` en la
// config interna y se renderizan con etiqueta descriptiva prudente.
type TimelineEvent = {
  year: string | null; // año público a mostrar; null si no está confirmado
  publicLabel: string; // etiqueta que se muestra cuando no hay year
  title: string;
  description: string;
};

const timeline: TimelineEvent[] = [
  {
    year: "2012–2013",
    publicLabel: "2012–2013",
    title: "Primera propiedad en Colombia",
    description:
      "Adquisición de la primera propiedad en Colombia, financiada y operada inicialmente bajo modelo de renta tradicional.",
  },
  {
    year: null,
    publicLabel: "Transición operativa",
    title: "De renta tradicional a alquiler a corto plazo",
    description:
      "Conversión de la primera propiedad al modelo STR, triplicando los ingresos del inmueble.",
  },
  {
    year: null,
    publicLabel: "Expansión internacional",
    title: "Expansión de operaciones internacionales",
    description:
      "Desarrollo de operaciones y experiencia en Estados Unidos, México, Colombia y Venezuela.",
  },
  {
    year: null,
    publicLabel: "Operaciones en EE.UU.",
    title: "Inicio de operaciones en Estados Unidos",
    description:
      "Combinación de propiedades propias, operación en arbitraje y administración de propiedades de inversionistas en el mercado estadounidense.",
  },
  {
    year: null,
    publicLabel: "Formación Tax Deed",
    title: "Formación especializada en análisis de propiedades y subastas Tax Deed",
    description:
      "Formación técnica para identificar y evaluar oportunidades inmobiliarias a través de subastas del condado.",
  },
  {
    year: null,
    publicLabel: "Marca educativa",
    title: "Fundación de The Host Circle",
    description:
      "Creación de la marca educativa y operativa enfocada en formar operadores profesionales de alquiler a corto plazo.",
  },
];

const philosophy = [
  {
    title: "Adquirir con criterio",
    text: "Comprar correctamente es tan importante como saber operar. Cada propiedad requiere análisis previo real, no impulsos.",
  },
  {
    title: "Sistemas antes que esfuerzo",
    text: "La rentabilidad sostenible viene de procesos, automatización y estándares. No de trabajar más horas.",
  },
  {
    title: "Datos, no promesas",
    text: "Cada decisión de inversión debe apoyarse en números verificables, no en optimismo o storytelling.",
  },
  {
    title: "Educación honesta",
    text: "Hablar de riesgos reales, disclaimers y debida diligencia importa tanto como hablar del retorno.",
  },
];

const expertise = [
  { area: "Alquiler a Corto Plazo", detail: "Estrategia, diseño, operación y automatización" },
  { area: "Administración Profesional", detail: "Co-hosting, arbitraje y modelo propietario" },
  { area: "Tax Deed", detail: "Análisis de títulos, filtros y oportunidades por condado" },
  { area: "Adquisición Inmobiliaria", detail: "Estrategia de portafolio y evaluación de activos" },
  { area: "Automatización con IA", detail: "Sistemas replicables para operar múltiples propiedades" },
  { area: "Revenue Management", detail: "Pricing dinámico y optimización de ingresos" },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: CLIENT.siteUrl },
    { "@type": "ListItem", position: 2, name: "Sobre Ana", item: `${CLIENT.siteUrl}/sobre-mi` },
  ],
};

export default function SobreMiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <main className="bg-[#0D0A08]">
        {/* Hero */}
        <section className="pt-40 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#10145F]/15 via-[#0D0A08] to-[#0D0A08]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-[#888888] text-sm mb-8">
              <Link href="/" className="hover:text-[#C8A45D] transition-colors">Inicio</Link>
              <span className="mx-2">/</span>
              <span className="text-[#C8A45D]">Sobre Ana</span>
            </nav>
            <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
              <div>
                <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
                  Ana Morrison · Real Estate Investor &amp; Strategist
                </span>
                <h1 className="heading-serif text-5xl sm:text-6xl mt-4 mb-6 leading-[1.02] text-[#F7F3EC]">
                  Inversionista inmobiliaria y estratega en{" "}
                  <span className="text-gold-gradient italic">alquileres a corto plazo</span>{" "}
                  y <span className="text-blue-gradient italic">Tax Deed</span>.
                </h1>
                <p className="text-[#F7F3EC]/75 text-lg leading-relaxed mb-8 max-w-2xl">
                  9+ años transformando propiedades en activos rentables. Operaciones en 4 países,
                  portafolio inmobiliario multimillonario y formación especializada en análisis de
                  propiedades y subastas Tax Deed.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contacto"
                    className="px-7 py-3.5 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-xs hover:bg-[#E2C98A] transition-all hover:shadow-[0_0_32px_rgba(200,164,93,0.4)]"
                  >
                    Trabaja conmigo
                  </Link>
                  <Link
                    href="/casos-de-exito"
                    className="px-7 py-3.5 rounded-full border border-[#C8A45D]/40 text-[#F7F3EC] tracking-widest uppercase text-xs hover:border-[#C8A45D] hover:text-[#C8A45D] transition-all hover:bg-[#C8A45D]/5"
                  >
                    Ver casos de éxito
                  </Link>
                </div>
              </div>

              <div className="relative hidden lg:block max-w-md mx-auto w-full">
                <div className="relative w-full aspect-[3/4]">
                  <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#C8A45D]/10 to-transparent blur-2xl" />
                  <div className="absolute -inset-3 rounded-[1.75rem] border border-[#C8A45D]/25" />
                  <div className="relative w-full h-full rounded-[1.25rem] overflow-hidden">
                    <Image
                      src="/images/anamaria-about.jpg"
                      alt="Ana Morrison — Real Estate Investor &amp; Strategist"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 448px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0A08]/30 via-transparent to-transparent" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-[#C8A45D] rounded-br-xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Historia de origen */}
        <section className="py-20 bg-[#141210]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
              Historia de Origen
            </span>
            <h2 className="heading-serif text-3xl sm:text-4xl mt-3 mb-8 text-[#F7F3EC]">
              De una primera propiedad a un{" "}
              <span className="text-gold-gradient italic">portafolio operativo</span>
            </h2>
            <div className="space-y-5 text-[#F7F3EC]/80 text-base leading-relaxed">
              <p>
                Compré mi primera propiedad a los 22 años. Cuando la transformé de renta tradicional
                a alquiler a corto plazo, tripliqué sus ingresos y entendí que la rentabilidad
                inmobiliaria no depende solamente de poseer una propiedad, sino de adquirirla,
                posicionarla y operarla estratégicamente.
              </p>
              <p>
                Durante más de nueve años he desarrollado experiencia en alquileres a corto plazo,
                administración, automatización y análisis de propiedades para adquisición mediante
                subastas del condado. Hoy ayudo a propietarios e inversionistas a tomar mejores
                decisiones y convertir oportunidades inmobiliarias en activos rentables.
              </p>
              <p>
                Combino tres modelos de trabajo: propiedades propias, propiedades operadas en
                arbitraje, y administración de propiedades de otros inversionistas, con operaciones
                en Estados Unidos, México, Colombia y Venezuela.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 bg-[#0D0A08] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,164,93,0.04)_0%,transparent_60%)]" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-14 text-center">
              <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
                Trayectoria Profesional
              </span>
              <h2 className="heading-serif text-4xl sm:text-5xl mt-4 text-[#F7F3EC]">
                Línea de <span className="text-gold-gradient italic">tiempo</span>
              </h2>
            </div>

            <ol className="relative border-l-2 border-[#C8A45D]/25 ml-3 space-y-10">
              {timeline.map((t) => (
                <li key={t.title} className="pl-8 relative">
                  <span className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-[#C8A45D] border-4 border-[#0D0A08]" />
                  <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-1">
                    {t.year ?? t.publicLabel}
                  </p>
                  <h3 className="heading-serif text-2xl text-[#F7F3EC] mb-2">{t.title}</h3>
                  <p className="text-[#F7F3EC]/70 text-sm leading-relaxed">{t.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Áreas de experiencia */}
        <section className="py-20 bg-[#141210]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
                Áreas de Experiencia
              </span>
              <h2 className="heading-serif text-4xl sm:text-5xl mt-4 text-[#F7F3EC]">
                Especialidades <span className="text-gold-gradient italic">técnicas</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {expertise.map((e) => (
                <div
                  key={e.area}
                  className="p-6 rounded-2xl border border-[#C8A45D]/15 bg-[#1C1916] hover:border-[#C8A45D]/40 transition-all"
                >
                  <h3 className="heading-serif text-xl text-[#F7F3EC] mb-2">{e.area}</h3>
                  <p className="text-[#F7F3EC]/70 text-sm leading-relaxed">{e.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filosofía */}
        <section className="py-24 bg-[#0D0A08]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
                Filosofía de Inversión
              </span>
              <h2 className="heading-serif text-4xl sm:text-5xl mt-4 text-[#F7F3EC]">
                Cómo <span className="text-gold-gradient italic">pienso</span> el inmobiliario
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {philosophy.map((p) => (
                <div
                  key={p.title}
                  className="p-7 rounded-2xl border border-[#C8A45D]/15 bg-[#1C1916]"
                >
                  <h3 className="heading-serif text-xl text-[#C8A45D] mb-3">{p.title}</h3>
                  <p className="text-[#F7F3EC]/75 text-sm leading-relaxed">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mercados */}
        <section className="py-16 bg-[#141210]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 rounded-2xl border border-[#22AEEF]/25 bg-[#10145F]/12">
              <p className="text-[#22AEEF] text-xs tracking-widest uppercase font-semibold mb-4">
                Mercados con Operación o Experiencia
              </p>
              <div className="flex flex-wrap gap-3">
                {CLIENT.countries.map((c) => (
                  <span
                    key={c}
                    className="px-4 py-2 rounded-full bg-[#22AEEF]/10 text-[#22AEEF] text-sm border border-[#22AEEF]/25"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-[#0D0A08] text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#C8A45D]/5 blur-3xl pointer-events-none" />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="heading-serif text-4xl sm:text-5xl mb-6 text-[#F7F3EC] leading-tight">
              ¿Empezamos a trabajar en tu{" "}
              <span className="text-gold-gradient italic">próximo activo</span>?
            </h2>
            <p className="text-[#F7F3EC]/70 text-lg mb-10">
              Elige la opción que corresponde a tu momento y hablemos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto?interes=str-rentabilizar"
                className="px-8 py-4 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#E2C98A] transition-all hover:shadow-[0_0_40px_rgba(200,164,93,0.45)]"
              >
                Rentabilizar una propiedad
              </Link>
              <Link
                href="/contacto?interes=tax-deed-oportunidades"
                className="px-8 py-4 rounded-full bg-[#22AEEF] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#22AEEF]/90 transition-all hover:shadow-[0_0_40px_rgba(34,174,239,0.45)]"
              >
                Explorar Tax Deed
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
