import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import LegalDraftBanner from "@/components/consent/LegalDraftBanner";

export const metadata: Metadata = {
  title: "Términos de Uso",
  description:
    "Términos de uso del sitio anamorrison.com. Borrador provisional pendiente de revisión legal por abogado autorizado en Florida.",
  alternates: { canonical: "/terminos-de-uso" },
};

export default function TerminosPage() {
  const lastUpdated = "2026-08-01";
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16 bg-[#0D0A08]">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-[#F7F3EC]">
          <nav className="text-[#888888] text-sm mb-6">
            <Link href="/" className="hover:text-[#C8A45D]">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-[#C8A45D]">Términos de Uso</span>
          </nav>

          <h1 className="heading-serif text-4xl sm:text-5xl mb-4">Términos de Uso</h1>
          <p className="text-[#888888] text-sm mb-2">Última actualización: {lastUpdated}</p>

          <LegalDraftBanner />

          <section className="space-y-6 text-[#F7F3EC]/85 text-base leading-relaxed">
            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">1. Aceptación</h2>
              <p>El uso del sitio implica aceptación de estos términos.</p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">2. Uso permitido</h2>
              <p>
                El contenido del sitio es de carácter educativo e informativo. Puedes usarlo para tu decisión personal de forma no comercial.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">3. Propiedad intelectual</h2>
              <p>
                Todo el contenido (textos, imágenes, marca &ldquo;The Host Circle&rdquo;, materiales descargables) es propiedad de Ana Morrison o de sus respectivos autores y está protegido por derechos de autor. No puedes copiar, redistribuir, revender ni crear obras derivadas sin autorización expresa por escrito.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">4. Naturaleza del contenido</h2>
              <p>
                El sitio ofrece contenido educativo, no asesoría profesional individualizada.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">5. Disclaimer de resultados</h2>
              <p>
                El contenido de este sitio tiene carácter educativo e informativo. No garantiza resultados económicos, comerciales, legales, tributarios ni de inversión. Los resultados anteriores no predicen resultados futuros. Toda decisión debe basarse en tu propia debida diligencia y, cuando aplique, en asesoría profesional independiente.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">6. Disclaimer específico Tax Deed</h2>
              <p>
                El contenido relacionado con Tax Deed es exclusivamente educativo. No constituye asesoría legal, financiera ni tributaria. Las subastas Tax Deed están reguladas por la ley del estado y del condado correspondiente, y sus reglas pueden variar significativamente. Toda inversión en subastas Tax Deed implica riesgos, incluidos riesgos legales, de título, de estado físico, de ocupación y de mercado. Antes de participar en una subasta debes realizar debida diligencia independiente y, cuando corresponda, consultar con un abogado especializado en bienes raíces del estado aplicable. Ana Morrison no ofrece servicios legales, tributarios ni de asesoría fiduciaria.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">7. Limitación de responsabilidad</h2>
              <p>
                En la máxima medida permitida por la ley aplicable, Ana Morrison no será responsable por decisiones tomadas con base en el contenido del sitio.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">8. Enlaces a terceros</h2>
              <p>No controlamos ni respaldamos contenido de sitios externos enlazados.</p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">9. Modificaciones</h2>
              <p>Podemos actualizar estos términos. El uso posterior implica aceptación.</p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">10. Ley aplicable y jurisdicción</h2>
              <p>
                Provisionalmente, estos términos se rigen por las leyes del Estado de Florida, Estados Unidos, sin considerar sus principios de conflicto de leyes. Cualquier controversia relacionada con el uso del sitio se someterá provisionalmente a los tribunales competentes del Estado de Florida, sujeto a revisión legal.
              </p>
              <p className="text-[#888888] text-sm italic mt-3">
                Nota interna: jurisdicción provisional. Pendiente de confirmación por abogado autorizado en Florida.
              </p>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
