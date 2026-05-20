import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ContactForm from "@/components/ui/ContactForm";
import { CLIENT } from "@/lib/client-data";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Contacta a ${CLIENT.nameShort} para conferencias, mentoría, co-hosting o inversiones inmobiliarias. Respuesta en menos de 24 horas.`,
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="pt-20">
        <section className="py-24 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C8A45D]/5 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mb-12">
              <nav className="text-[#888888] text-sm mb-8">
                <a href="/" className="hover:text-[#C8A45D] transition-colors">Inicio</a>
                <span className="mx-2">/</span>
                <span className="text-[#C8A45D]">Contacto</span>
              </nav>
              <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">Hablemos</span>
              <h1 className="text-5xl font-bold text-[#F7F3EC] mt-3 mb-4">
                Trabajemos<br />
                <span className="text-gold-gradient">Juntos</span>
              </h1>
              <p className="text-[#F7F3EC]/60 text-lg">
                ¿Tienes una propiedad que quieres transformar? ¿Quieres invertir en tax deeds? ¿Buscas mentoría?
                Cuéntame tu situación y te respondo en menos de 24 horas.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-12">
              {/* Form */}
              <div className="lg:col-span-3">
                <ContactForm />
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-2 space-y-6">
                <div className="p-6 border border-[#C8A45D]/30 bg-[#111111]">
                  <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-4">Contacto Directo</p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[#888888] text-xs uppercase tracking-wider mb-1">Email</p>
                      <a href={`mailto:${CLIENT.email}`} className="text-[#F7F3EC]/80 text-sm hover:text-[#C8A45D] transition-colors">
                        {CLIENT.email}
                      </a>
                    </div>
                    <div>
                      <p className="text-[#888888] text-xs uppercase tracking-wider mb-1">WhatsApp</p>
                      <a
                        href={`https://wa.me/${CLIENT.whatsapp.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#F7F3EC]/80 text-sm hover:text-[#C8A45D] transition-colors"
                      >
                        {CLIENT.whatsappDisplay}
                      </a>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/${CLIENT.whatsapp.replace(/\D/g, "")}?text=Hola%20AnaMaria%2C%20me%20interesa%20trabajar%20contigo.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold text-sm tracking-wider uppercase hover:bg-[#1da851] transition-colors"
                  >
                    💬 Escríbeme por WhatsApp
                  </a>
                </div>

                <div className="p-6 border border-[#C8A45D]/20 bg-[#111111]">
                  <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-4">Áreas de Consulta</p>
                  <ul className="space-y-2">
                    {["Conferencias y keynotes", "Mentoría 1:1", "Co-hosting y administración", "Inversión en Tax Deeds", "Estrategias de Airbnb", "Arbitraje inmobiliario"].map((area) => (
                      <li key={area} className="text-[#F7F3EC]/60 text-sm flex items-center gap-2">
                        <span className="text-[#C8A45D]">✦</span> {area}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 bg-[#C8A45D]/10 border border-[#C8A45D]/30">
                  <p className="text-[#C8A45D] font-bold text-sm mb-2">⏱ Tiempo de respuesta</p>
                  <p className="text-[#F7F3EC]/70 text-sm">Respondo todos los mensajes en menos de 24 horas en días hábiles.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
