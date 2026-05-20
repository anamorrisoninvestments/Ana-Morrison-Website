import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/ui/NewsletterForm";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { CLIENT } from "@/lib/client-data";

export const metadata: Metadata = {
  title: "Guía Gratuita: Las 5 Rutas Hacia la Riqueza | Ana Morrison",
  description:
    "Descarga gratis la guía de AnaMaria Morrison con las 5 rutas para crear riqueza con alquileres a corto plazo: co-hosting, co-living, arbitraje, compra y construcción.",
  openGraph: {
    title: "Guía Gratuita: Las 5 Rutas Hacia la Riqueza con Alquileres a Corto Plazo",
    description:
      "Las estrategias que AnaMaria Morrison usó para construir un portafolio de varios millones. Descárgalas gratis.",
    url: `${CLIENT.siteUrl}/recursos/guia-5-rutas`,
  },
};

const BENEFITS = [
  {
    number: "01",
    title: "Co-Hosting",
    desc: "Administra propiedades de terceros sin invertir capital. La ruta más rápida para empezar y generar ingresos desde el primer mes.",
  },
  {
    number: "02",
    title: "Co-Living",
    desc: "Transforma propiedades grandes en múltiples unidades rentables. Maximiza el ingreso por metro cuadrado sin comprar.",
  },
  {
    number: "03",
    title: "Arbitraje",
    desc: "Firma contrato de renta larga y subarrienda en plataformas de corto plazo. Crea flujo de caja sin ser dueño.",
  },
  {
    number: "04",
    title: "Compra",
    desc: "Adquiere tu propia propiedad y conviértela en un activo que trabaje para ti. La ruta del patrimonio real.",
  },
  {
    number: "05",
    title: "Construcción",
    desc: "Diseña y construye desde cero el inmueble ideal para alquiler a corto plazo. Máximo control, máximo retorno.",
  },
];

export default function Guia5RutasPage() {
  return (
    <>
      <Navbar />
      <main className="bg-black min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-20 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#C8A45D08_0%,transparent_60%)] pointer-events-none" />
          <div className="max-w-3xl mx-auto relative">
            <div className="inline-block bg-gold/10 border border-gold/30 text-gold text-xs tracking-[4px] uppercase px-4 py-2 mb-8">
              Recurso Gratuito
            </div>
            <h1 className="text-4xl md:text-6xl font-light text-ivory leading-tight mb-6">
              Las{" "}
              <span className="text-gold-gradient">5 Rutas</span>
              <br />
              hacia la riqueza
            </h1>
            <p className="text-xl text-ivory/70 font-light mb-4">
              con el alquiler a corto plazo
            </p>
            <p className="text-text-muted max-w-xl mx-auto leading-relaxed mb-12">
              Las estrategias exactas que AnaMaria Morrison aplicó para construir un portafolio
              inmobiliario de varios millones de dólares en 4 países. Ahora disponibles para ti,
              sin costo.
            </p>

            {/* Form */}
            <div className="max-w-md mx-auto bg-gray-dark border border-gray-soft p-8">
              <div className="flex items-center gap-2 mb-6 justify-center">
                <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-gold" />
                </div>
                <span className="text-gold text-xs tracking-[3px] uppercase">Descarga inmediata</span>
              </div>
              <NewsletterForm
                showName
                leadMagnet="Guía 5 Rutas"
                ctaText="Quiero mi guía gratis"
                subtitle="Ingresa tu email y recibe la guía + estrategias exclusivas que no comparto en redes."
              />
            </div>
          </div>
        </section>

        <div className="divider-gold mx-auto max-w-2xl" />

        {/* What you'll get */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-gold text-xs tracking-[4px] uppercase text-center mb-3">
              Lo que recibirás
            </p>
            <h2 className="text-3xl font-light text-ivory text-center mb-16">
              Las 5 rutas explicadas a detalle
            </h2>
            <div className="space-y-6">
              {BENEFITS.map((item) => (
                <div
                  key={item.number}
                  className="flex gap-6 items-start border border-gray-soft bg-gray-dark p-6 hover:border-gold/30 transition-colors"
                >
                  <div className="text-3xl font-light text-gold/30 tabular-nums shrink-0">
                    {item.number}
                  </div>
                  <div>
                    <h3 className="text-ivory font-medium mb-2">{item.title}</h3>
                    <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider-gold mx-auto max-w-2xl" />

        {/* Social proof */}
        <section className="py-20 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-text-muted text-sm mb-8">
              Únete a miles de inversionistas latinas que ya están construyendo riqueza con estas estrategias.
            </p>
            <div className="flex justify-center gap-12 flex-wrap mb-12">
              {[
                { value: "9+", label: "Años de experiencia" },
                { value: "4", label: "Países" },
                { value: "$MM", label: "Portafolio" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl font-light text-gold-gradient mb-1">{s.value}</div>
                  <div className="text-text-muted text-xs tracking-widest uppercase">{s.label}</div>
                </div>
              ))}
            </div>
            <Link
              href="/sobre-mi"
              className="text-gold/70 text-sm hover:text-gold transition-colors underline underline-offset-4"
            >
              Conoce la historia de AnaMaria →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
