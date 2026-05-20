import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { CLIENT } from "@/lib/client-data";

export const metadata: Metadata = {
  title: "Prensa y Medios",
  description: `Cobertura mediática de ${CLIENT.nameShort}. Menciones en medios, entrevistas y recursos para prensa.`,
  alternates: { canonical: "/prensa" },
};

const pressItems = [
  { outlet: "Próxima publicación", title: "AnaMaria Morrison: La Inversionista que Está Cambiando el Juego del Airbnb", url: "#", date: "2026", category: "Entrevista" },
  { outlet: "The Host Circle Blog", title: "Las 5 Rutas para Crear Riqueza con Alquileres a Corto Plazo", url: "#", date: "2026", category: "Artículo" },
];

export default function PrensaPage() {
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
              <span className="text-[#C8A45D]">Prensa</span>
            </nav>
            <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">Medios y Cobertura</span>
            <h1 className="text-5xl sm:text-6xl font-bold text-[#F7F3EC] mt-3 mb-6">
              Prensa <span className="text-gold-gradient">& Medios</span>
            </h1>
            <p className="text-[#F7F3EC]/60 text-xl max-w-2xl">
              Para solicitar una entrevista, material de prensa o colaboración editorial, contacta al equipo de comunicaciones.
            </p>
          </div>
        </section>

        {/* Press items */}
        <section className="py-20 bg-[#111111]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {pressItems.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target={item.url !== "#" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group p-6 border border-[#C8A45D]/20 hover:border-[#C8A45D] bg-black transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">{item.outlet}</span>
                    <span className="text-[#888888] text-xs">{item.date}</span>
                  </div>
                  <h3 className="text-[#F7F3EC] font-semibold text-base mb-3 group-hover:text-[#C8A45D] transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <span className="inline-block px-2 py-0.5 bg-[#C8A45D]/10 text-[#C8A45D] text-xs border border-[#C8A45D]/20">
                    {item.category}
                  </span>
                </a>
              ))}
            </div>

            {/* Press kit */}
            <div className="border border-[#C8A45D]/30 p-10 bg-black text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-[#F7F3EC] mb-4">Kit de Prensa</h2>
              <p className="text-[#F7F3EC]/60 text-sm mb-6">
                Periodistas y productores: solicita el media kit completo con bio, fotografías de alta resolución, temas de conferencia y datos de contacto.
              </p>
              <a
                href={`mailto:${CLIENT.email}?subject=Solicitud%20de%20Media%20Kit%20-%20AnaMaria%20Morrison`}
                className="inline-block px-8 py-3 bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#E2C98A] transition-colors"
              >
                Solicitar Media Kit
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
