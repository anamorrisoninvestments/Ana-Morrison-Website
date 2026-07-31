import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ContactForm from "@/components/ui/ContactForm";
import { CLIENT } from "@/lib/client-data";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Habla directamente con Ana Morrison sobre alquileres a corto plazo, administración STR, preparación de propiedad o inversión Tax Deed. Respuesta en menos de 24 horas hábiles.",
  alternates: { canonical: "/contacto" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: CLIENT.siteUrl },
    { "@type": "ListItem", position: 2, name: "Contacto", item: `${CLIENT.siteUrl}/contacto` },
  ],
};

export default function ContactoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <main className="pt-20 bg-[#0D0A08]">
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C8A45D]/5 via-[#0D0A08] to-[#0D0A08]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <nav className="text-[#888888] text-sm mb-8">
                <Link href="/" className="hover:text-[#C8A45D] transition-colors">Inicio</Link>
                <span className="mx-2">/</span>
                <span className="text-[#C8A45D]">Contacto</span>
              </nav>
              <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
                Trabaja Conmigo
              </span>
              <h1 className="heading-serif text-5xl sm:text-6xl text-[#F7F3EC] mt-4 mb-6 leading-[1.02]">
                Cuéntame de tu <span className="text-gold-gradient italic">propiedad</span> o tu{" "}
                <span className="text-blue-gradient italic">oportunidad</span>.
              </h1>
              <p className="text-[#F7F3EC]/70 text-lg leading-relaxed">
                Elige la opción que mejor describe tu momento. El formulario se adaptará a lo que
                realmente necesitas. Respondo personalmente en menos de 24 horas hábiles.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-10">
              <div className="lg:col-span-3">
                <div className="p-8 rounded-3xl border border-[#C8A45D]/15 bg-[#1C1916]">
                  <ContactForm />
                </div>
              </div>

              <aside className="lg:col-span-2 space-y-6">
                <div className="p-6 rounded-2xl border border-[#C8A45D]/30 bg-[#141210]">
                  <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-4">
                    Contacto Directo
                  </p>
                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-[#888888] text-xs uppercase tracking-wider mb-1">Email</p>
                      <a
                        href={`mailto:${CLIENT.email}`}
                        className="text-[#F7F3EC]/85 text-sm hover:text-[#C8A45D] transition-colors break-all"
                      >
                        {CLIENT.email}
                      </a>
                    </div>
                    <div>
                      <p className="text-[#888888] text-xs uppercase tracking-wider mb-1">WhatsApp</p>
                      <a
                        href={`https://wa.me/${CLIENT.whatsapp.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#F7F3EC]/85 text-sm hover:text-[#C8A45D] transition-colors"
                      >
                        {CLIENT.whatsappDisplay}
                      </a>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/${CLIENT.whatsapp.replace(/\D/g, "")}?text=Hola%20Ana%2C%20quiero%20conversar%20contigo.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold text-xs tracking-widest uppercase hover:bg-[#1da851] transition-colors"
                  >
                    Escríbeme por WhatsApp
                  </a>
                </div>

                <div className="p-6 rounded-2xl border border-[#C8A45D]/20 bg-[#141210]">
                  <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-4">
                    Áreas de Trabajo
                  </p>
                  <ul className="space-y-2.5">
                    {[
                      "Estrategia y transformación STR",
                      "Administración profesional STR",
                      "Preparación y lanzamiento",
                      "Educación Tax Deed",
                      "Análisis de oportunidades Tax Deed",
                      "Entrevistas, podcasts y conferencias",
                    ].map((area) => (
                      <li
                        key={area}
                        className="text-[#F7F3EC]/75 text-sm flex items-start gap-2"
                      >
                        <span className="text-[#C8A45D] mt-0.5">◆</span> {area}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-[#C8A45D]/8 border border-[#C8A45D]/30">
                  <p className="text-[#C8A45D] font-bold text-sm mb-2">Tiempo de respuesta</p>
                  <p className="text-[#F7F3EC]/75 text-sm">
                    Respondo todos los mensajes en menos de 24 horas en días hábiles.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
