import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { CLIENT } from "@/lib/client-data";

export const metadata: Metadata = {
  title: "Cursos & Mentoría | AnaMaria Morrison — The Host Circle",
  description:
    "Programas de mentoría y cursos de inversión inmobiliaria con AnaMaria Morrison. Co-hosting, alquiler a corto plazo, tax deeds y estrategias para crear riqueza.",
  openGraph: {
    title: "Cursos & Mentoría | AnaMaria Morrison",
    description:
      "Aprende directamente con AnaMaria. Programas diseñados para inversionistas que quieren resultados reales.",
    url: `${CLIENT.siteUrl}/cursos`,
  },
};

const PROGRAMS = [
  {
    id: "mentoria-vip",
    badge: "MÁS POPULAR",
    badgeColor: "bg-gold text-black",
    name: "Mentoría 1:1 VIP",
    tagline: "Trabaja directamente con Ana",
    price: "$1,997",
    period: "/ 3 meses",
    description:
      "Sesiones privadas, estrategia personalizada y acompañamiento completo para construir o escalar tu portafolio de alquiler a corto plazo.",
    features: [
      "6 sesiones 1:1 de 60 min (2/mes)",
      "Análisis de mercado personalizado",
      "Plan de acción para tu propiedad específica",
      "Acceso a templates y sistemas de Ana",
      "Soporte por WhatsApp entre sesiones",
      "Revisión de tu Airbnb listing",
    ],
    cta: "Aplicar ahora",
    ctaLink: `https://wa.me/${CLIENT.whatsapp.replace(/\D/g, "")}?text=Hola%20Ana%2C%20quiero%20aplicar%20a%20la%20Mentoría%20VIP`,
    ctaExternal: true,
    highlight: true,
  },
  {
    id: "bootcamp-cohosting",
    badge: "NUEVO",
    badgeColor: "bg-blue-electric/20 text-blue-electric border border-blue-electric/30",
    name: "Bootcamp Co-Hosting",
    tagline: "De cero a tu primer cliente en 30 días",
    price: "$497",
    period: "pago único",
    description:
      "El sistema completo para lanzar y escalar un negocio de co-hosting profesional. Ideal si quieres empezar sin capital propio.",
    features: [
      "4 semanas de contenido en video",
      "Scripts de captación de propietarios",
      "Contratos y documentos legales",
      "Sistema de precios dinámicos",
      "Comunidad privada de co-hosts",
      "Acceso de por vida + actualizaciones",
    ],
    cta: "Unirme al bootcamp",
    ctaLink: `https://wa.me/${CLIENT.whatsapp.replace(/\D/g, "")}?text=Hola%20Ana%2C%20me%20interesa%20el%20Bootcamp%20de%20Co-Hosting`,
    ctaExternal: true,
    highlight: false,
  },
  {
    id: "curso-tax-deed",
    badge: "AVANZADO",
    badgeColor: "bg-ivory/10 text-ivory/70 border border-ivory/20",
    name: "Tax Deed Mastery",
    tagline: "Compra propiedades al condado",
    price: "$797",
    period: "pago único",
    description:
      "Aprende a identificar, analizar y comprar propiedades mediante subastas del condado (tax deeds). La estrategia de mayor ROI del mercado americano.",
    features: [
      "Proceso completo de subasta explicado",
      "Cómo investigar títulos y due diligence",
      "Calculadoras de rentabilidad incluidas",
      "Estrategias de salida (flip, rent, hold)",
      "Mercados recomendados en Florida",
      "Sesión de Q&A en grupo (mensual)",
    ],
    cta: "Quiero aprender Tax Deed",
    ctaLink: `https://wa.me/${CLIENT.whatsapp.replace(/\D/g, "")}?text=Hola%20Ana%2C%20me%20interesa%20el%20curso%20de%20Tax%20Deed%20Mastery`,
    ctaExternal: true,
    highlight: false,
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Con la mentoría de Ana logré conseguir mi primera propiedad en co-hosting en menos de 3 semanas. El sistema funciona.",
    name: "Valentina R.",
    location: "Miami, FL",
    result: "+$2,800/mes",
  },
  {
    quote:
      "Compré mi primer tax deed en una subasta de Hillsborough County. Ana me guió en cada paso del proceso. ROI del 340%.",
    name: "Carlos M.",
    location: "Tampa, FL",
    result: "340% ROI",
  },
  {
    quote:
      "El bootcamp de co-hosting me cambió la vida. En 45 días tenía 2 propiedades bajo gestión y ya cubría mi renta.",
    name: "Daniela S.",
    location: "Orlando, FL",
    result: "2 propiedades en 45 días",
  },
];

const FAQS = [
  {
    q: "¿Necesito experiencia previa en bienes raíces?",
    a: "No. Los programas están diseñados para comenzar desde cero. Lo que sí necesitas es compromiso y disposición para aprender y actuar.",
  },
  {
    q: "¿Cómo sé cuál programa es para mí?",
    a: "Si quieres resultados rápidos y personalizados, la mentoría 1:1 es tu mejor opción. Si prefieres un sistema probado a tu ritmo, los cursos son ideales. Escríbeme por WhatsApp y te ayudo a elegir.",
  },
  {
    q: "¿Los programas son solo para Estados Unidos?",
    a: "El co-hosting y tax deeds están enfocados en mercados de EE.UU., pero las estrategias de alquiler a corto plazo aplican en cualquier país. La mentoría 1:1 es 100% personalizada a tu mercado.",
  },
  {
    q: "¿Ofrecen garantía?",
    a: "Sí. Si completas todos los módulos, implementas los pasos y no ves resultados en 60 días, te devolvemos el 100% de tu inversión. Sin preguntas.",
  },
];

export default function CursosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Programas de Mentoría — AnaMaria Morrison",
    "description": "Cursos y mentoría de inversión inmobiliaria y alquiler a corto plazo",
    "url": `${CLIENT.siteUrl}/cursos`,
    "itemListElement": PROGRAMS.map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Course",
        "name": p.name,
        "description": p.description,
        "provider": {
          "@type": "Person",
          "name": CLIENT.name,
          "url": CLIENT.siteUrl,
        },
        "offers": {
          "@type": "Offer",
          "price": p.price.replace(/[^0-9.]/g, ""),
          "priceCurrency": "USD",
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="bg-black min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-20 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#C8A45D06_0%,transparent_60%)] pointer-events-none" />
          <div className="max-w-3xl mx-auto relative">
            <div className="inline-block bg-gold/10 border border-gold/30 text-gold text-xs tracking-[4px] uppercase px-4 py-2 mb-8">
              The Host Circle · Educación
            </div>
            <h1 className="text-4xl md:text-6xl font-light text-ivory leading-tight mb-6">
              Aprende con quien{" "}
              <span className="text-gold-gradient">ya lo hizo</span>
            </h1>
            <p className="text-xl text-ivory/60 font-light max-w-xl mx-auto leading-relaxed mb-8">
              Programas diseñados desde la experiencia real. Sin teoría innecesaria.
              Solo lo que funciona en el mercado de hoy.
            </p>
            <div className="flex justify-center gap-8 flex-wrap text-center">
              {[
                { v: "9+", l: "Años en el mercado" },
                { v: "$MM", l: "Portafolio gestionado" },
                { v: "4", l: "Países de operación" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-2xl font-light text-gold">{s.v}</div>
                  <div className="text-text-muted text-xs tracking-widest uppercase mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider-gold mx-auto max-w-2xl" />

        {/* Programs grid */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-gold text-xs tracking-[4px] uppercase text-center mb-3">
              Programas disponibles
            </p>
            <h2 className="text-3xl font-light text-ivory text-center mb-16">
              Elige tu ruta
            </h2>

            <div className="grid lg:grid-cols-3 gap-6">
              {PROGRAMS.map((program) => (
                <div
                  key={program.id}
                  className={`relative border p-8 flex flex-col transition-all ${
                    program.highlight
                      ? "border-gold bg-gray-dark"
                      : "border-gray-soft bg-gray-dark/50 hover:border-gold/30"
                  }`}
                >
                  {program.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className="bg-gold text-black text-xs font-bold tracking-[3px] uppercase px-4 py-1">
                        Recomendado
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <span className={`text-xs font-bold tracking-[3px] uppercase px-3 py-1 ${program.badgeColor}`}>
                      {program.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-medium text-ivory mb-1">{program.name}</h3>
                  <p className="text-gold text-sm mb-4">{program.tagline}</p>
                  <p className="text-text-muted text-sm leading-relaxed mb-6">{program.description}</p>

                  <div className="mb-6">
                    <div className="text-3xl font-light text-ivory">
                      {program.price}
                      <span className="text-text-muted text-base ml-1">{program.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-8 flex-1">
                    {program.features.map((f) => (
                      <li key={f} className="flex gap-3 text-sm">
                        <span className="text-gold mt-0.5 shrink-0">✓</span>
                        <span className="text-ivory/80">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={program.ctaLink}
                    target={program.ctaExternal ? "_blank" : undefined}
                    rel={program.ctaExternal ? "noopener noreferrer" : undefined}
                    className={`text-center py-3.5 text-xs font-bold tracking-widest uppercase transition-colors block ${
                      program.highlight
                        ? "bg-gold text-black hover:bg-gold-light"
                        : "border border-gold text-gold hover:bg-gold hover:text-black"
                    }`}
                  >
                    {program.cta}
                  </Link>
                </div>
              ))}
            </div>

            <p className="text-center text-text-muted text-sm mt-8">
              ¿No sabes cuál elegir?{" "}
              <Link
                href={`https://wa.me/${CLIENT.whatsapp.replace(/\D/g, "")}?text=Hola%20Ana%2C%20necesito%20ayuda%20para%20elegir%20un%20programa`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold-light underline underline-offset-4 transition-colors"
              >
                Escríbeme y te oriento
              </Link>
            </p>
          </div>
        </section>

        <div className="divider-gold mx-auto max-w-2xl" />

        {/* Testimonials */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-gold text-xs tracking-[4px] uppercase text-center mb-3">
              Resultados reales
            </p>
            <h2 className="text-3xl font-light text-ivory text-center mb-16">
              Lo que dicen quienes ya lo lograron
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="bg-gray-dark border border-gray-soft p-6 hover:border-gold/20 transition-colors">
                  <div className="text-gold text-xl mb-4">"</div>
                  <p className="text-ivory/80 text-sm leading-relaxed mb-6 italic">{t.quote}</p>
                  <div className="border-t border-gray-soft pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-ivory text-sm font-medium">{t.name}</p>
                      <p className="text-text-muted text-xs">{t.location}</p>
                    </div>
                    <div className="bg-gold/10 border border-gold/30 text-gold text-xs font-bold px-3 py-1">
                      {t.result}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider-gold mx-auto max-w-2xl" />

        {/* FAQ */}
        <section className="py-20 px-6">
          <div className="max-w-2xl mx-auto">
            <p className="text-gold text-xs tracking-[4px] uppercase text-center mb-3">
              Preguntas frecuentes
            </p>
            <h2 className="text-3xl font-light text-ivory text-center mb-12">
              Lo que todos preguntan
            </h2>

            <div className="space-y-4">
              {FAQS.map((faq) => (
                <div key={faq.q} className="border border-gray-soft p-6 hover:border-gold/20 transition-colors">
                  <p className="text-ivory font-medium mb-3">{faq.q}</p>
                  <p className="text-text-muted text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6 text-center bg-gray-dark border-t border-gray-soft">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-light text-ivory mb-4">
              ¿Lista para empezar?
            </h2>
            <p className="text-text-muted mb-8 leading-relaxed">
              Las estrategias están aquí. Los resultados dependen de la acción que tomes hoy.
            </p>
            <Link
              href={`https://wa.me/${CLIENT.whatsapp.replace(/\D/g, "")}?text=Hola%20Ana%2C%20quiero%20empezar%20con%20un%20programa`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gold text-black px-10 py-4 text-sm font-bold tracking-widest uppercase hover:bg-gold-light transition-colors"
            >
              Hablemos hoy
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
