import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Recursos | Alquileres a Corto Plazo y Tax Deed | Ana Morrison",
  description:
    "Guías, artículos, herramientas y formación sobre alquiler a corto plazo y Tax Deed. Contenido educativo para inversionistas y propietarios.",
  alternates: { canonical: "/recursos" },
};

const categories = [
  {
    title: "Alquileres a Corto Plazo",
    description: "Guías, estrategias y herramientas para propietarios y operadores.",
    href: "/blog?categoria=str",
    accent: "text-[#C8A45D]",
    border: "border-[#C8A45D]/25",
  },
  {
    title: "Tax Deed",
    description: "Educación sobre subastas del condado, análisis y debida diligencia.",
    href: "/blog?categoria=tax-deed",
    accent: "text-[#22AEEF]",
    border: "border-[#22AEEF]/25",
  },
  {
    title: "The Host Circle",
    description: "Formación práctica para construir y operar un negocio profesional STR.",
    href: "/contacto?interes=host-circle",
    accent: "text-[#F0E4C8]",
    border: "border-[#C8A45D]/15",
  },
];

export default function RecursosPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0D0A08]">
        <section className="pt-40 pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
              Recursos &amp; Educación
            </span>
            <h1 className="heading-serif text-5xl sm:text-6xl mt-4 mb-6 leading-[1.02] text-[#F7F3EC]">
              Contenido para <span className="text-gold-gradient italic">decidir mejor</span>.
            </h1>
            <p className="text-[#F7F3EC]/70 text-lg leading-relaxed max-w-3xl">
              Guías, artículos y herramientas enfocadas exclusivamente en alquileres a corto
              plazo y Tax Deed.
            </p>
          </div>
        </section>

        <section className="py-16 bg-[#141210]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
            {categories.map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className={`p-8 rounded-2xl border ${c.border} bg-[#1C1916] hover:bg-[#1C1916]/70 transition-all block`}
              >
                <span className={`${c.accent} text-xs tracking-widest uppercase font-semibold`}>
                  Categoría
                </span>
                <h2 className="heading-serif text-2xl text-[#F7F3EC] mt-3 mb-4">{c.title}</h2>
                <p className="text-[#F7F3EC]/70 text-sm leading-relaxed mb-6">{c.description}</p>
                <span className={`${c.accent} text-sm tracking-widest uppercase font-semibold`}>
                  Explorar →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-20 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="heading-serif text-3xl sm:text-4xl text-[#F7F3EC] mb-6">
              Explora el blog completo
            </h2>
            <Link
              href="/blog"
              className="inline-block px-8 py-4 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#E2C98A] transition-all hover:shadow-[0_0_40px_rgba(200,164,93,0.45)]"
            >
              Ver todos los recursos
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
