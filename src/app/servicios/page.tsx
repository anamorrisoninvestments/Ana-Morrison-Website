import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CTASection from "@/components/sections/CTASection";
import { CLIENT } from "@/lib/client-data";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Servicios",
  description: `Servicios de ${CLIENT.nameShort}: co-hosting, co-living, arbitraje, tax deeds, mentoría 1:1 y administración profesional de propiedades de alquiler a corto plazo.`,
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-24 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C8A45D]/5 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-[#888888] text-sm mb-8">
              <a href="/" className="hover:text-[#C8A45D] transition-colors">Inicio</a>
              <span className="mx-2">/</span>
              <span className="text-[#C8A45D]">Servicios</span>
            </nav>
            <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">Las 5 Rutas + Mentoría</span>
            <h1 className="text-5xl sm:text-6xl font-bold text-[#F7F3EC] mt-3 mb-6">
              Cómo puedo <span className="text-gold-gradient">ayudarte</span>
            </h1>
            <p className="text-[#F7F3EC]/60 text-xl max-w-2xl">
              Cada inversionista tiene un punto de partida diferente. Mi trabajo es encontrar la ruta correcta para el tuyo.
            </p>
          </div>
        </section>

        <section className="py-20 bg-[#111111]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {CLIENT.services.map((service, i) => (
                <div key={service.title} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? "lg:direction-rtl" : ""}`}>
                  <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
                    <div className="w-14 h-14 border border-[#C8A45D]/40 flex items-center justify-center text-2xl mb-6">
                      {i + 1 < 10 ? `0${i + 1}` : i + 1}
                    </div>
                    <h2 className="text-3xl font-bold text-[#C8A45D] mb-4">{service.title}</h2>
                    <p className="text-[#F7F3EC]/70 text-base leading-relaxed mb-6">{service.description}</p>
                    <Link href="/contacto" className="inline-flex items-center gap-2 text-[#C8A45D] text-sm tracking-wider uppercase font-semibold hover:gap-4 transition-all">
                      Explorar esta ruta →
                    </Link>
                  </div>
                  <div className={`p-10 border border-[#C8A45D]/20 bg-black ${i % 2 !== 0 ? "lg:order-1" : ""}`}>
                    <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-4">¿Para quién es?</p>
                    <ul className="space-y-3">
                      {i === 0 && [
                        "Propietarios que no quieren gestionar su propiedad",
                        "Anfitriones que quieren mejorar su operación",
                        "Personas que buscan ingresos pasivos reales",
                      ].map((t) => <li key={t} className="text-[#F7F3EC]/70 text-sm flex items-start gap-2"><span className="text-[#C8A45D] mt-0.5">✦</span>{t}</li>)}
                      {i === 1 && [
                        "Propietarios con espacios de habitaciones disponibles",
                        "Personas que buscan maximizar metros cuadrados",
                        "Inversionistas en mercados universitarios o corporativos",
                      ].map((t) => <li key={t} className="text-[#F7F3EC]/70 text-sm flex items-start gap-2"><span className="text-[#C8A45D] mt-0.5">✦</span>{t}</li>)}
                      {i === 2 && [
                        "Personas sin capital para comprar propiedades",
                        "Emprendedores que quieren un negocio inmobiliario desde cero",
                        "Quienes buscan ingresos STR sin ser propietarios",
                      ].map((t) => <li key={t} className="text-[#F7F3EC]/70 text-sm flex items-start gap-2"><span className="text-[#C8A45D] mt-0.5">✦</span>{t}</li>)}
                      {i === 3 && [
                        "Inversionistas que buscan propiedades a precios de subasta",
                        "Personas con capital para invertir en Florida, Texas o Georgia",
                        "Quienes quieren diversificar su portafolio inmobiliario",
                      ].map((t) => <li key={t} className="text-[#F7F3EC]/70 text-sm flex items-start gap-2"><span className="text-[#C8A45D] mt-0.5">✦</span>{t}</li>)}
                      {i === 4 && [
                        "Inversionistas con capital para adquirir propiedades",
                        "Personas que quieren construir un portafolio a largo plazo",
                        "Quienes buscan maximizar el ROI desde el diseño",
                      ].map((t) => <li key={t} className="text-[#F7F3EC]/70 text-sm flex items-start gap-2"><span className="text-[#C8A45D] mt-0.5">✦</span>{t}</li>)}
                      {i === 5 && [
                        "Personas que quieren un camino personalizado",
                        "Inversionistas que ya están en el mercado y quieren escalar",
                        "Mujeres latinas que quieren construir su primer portafolio",
                      ].map((t) => <li key={t} className="text-[#F7F3EC]/70 text-sm flex items-start gap-2"><span className="text-[#C8A45D] mt-0.5">✦</span>{t}</li>)}
                    </ul>
                  </div>
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
