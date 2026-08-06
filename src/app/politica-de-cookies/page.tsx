import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import LegalDraftBanner from "@/components/consent/LegalDraftBanner";
import ConsentPreferencesLink from "@/components/consent/ConsentPreferencesLink";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Categorías de cookies utilizadas en anamorrison.com y cómo gestionar tus preferencias.",
  alternates: { canonical: "/politica-de-cookies" },
};

export default function PoliticaCookiesPage() {
  const version = process.env.NEXT_PUBLIC_CONSENT_VERSION || "v1.0";
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16 bg-[#0D0A08]">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-[#F7F3EC]">
          <nav className="text-[#888888] text-sm mb-6">
            <Link href="/" className="hover:text-[#C8A45D]">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-[#C8A45D]">Política de Cookies</span>
          </nav>

          <h1 className="heading-serif text-4xl sm:text-5xl mb-4">Política de Cookies</h1>
          <p className="text-[#888888] text-sm mb-2">Versión: {version}</p>

          <LegalDraftBanner />

          <section className="space-y-6 text-[#F7F3EC]/85 text-base leading-relaxed">
            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">1. Qué son las cookies</h2>
              <p>
                Pequeños archivos que se almacenan en tu navegador para recordar preferencias, medir uso del sitio y ofrecer funcionalidad esencial.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">2. Categorías que usamos</h2>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl border border-[#C8A45D]/20 bg-[#1C1916]">
                  <h3 className="text-[#F7F3EC] font-semibold mb-2">Necesarias (siempre activas)</h3>
                  <p className="text-sm text-[#F7F3EC]/70">
                    Imprescindibles para el consentimiento, la sesión y la seguridad. No pueden desactivarse porque el sitio no funciona sin ellas.
                  </p>
                  <p className="text-xs text-[#888888] mt-3">
                    <code>amc_consent</code> · guarda tus preferencias de cookies (12 meses)<br />
                    <code>amc_session</code> · ID anónimo de sesión (30 días)
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-[#C8A45D]/20 bg-[#1C1916]">
                  <h3 className="text-[#F7F3EC] font-semibold mb-2">Analíticas (opcionales)</h3>
                  <p className="text-sm text-[#F7F3EC]/70">
                    Medición anónima de uso del sitio para mejorar contenido y navegación. Solo se cargan si aceptas.
                  </p>
                  <p className="text-xs text-[#888888] mt-3">
                    <code>_ga*</code> · Google Analytics 4 (hasta 2 años, con IP anonimizada)
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-[#C8A45D]/20 bg-[#1C1916]">
                  <h3 className="text-[#F7F3EC] font-semibold mb-2">Marketing (opcionales)</h3>
                  <p className="text-sm text-[#F7F3EC]/70">
                    Personalización de mensajes y audiencias para campañas publicitarias. Actualmente no hay proveedores de marketing cargados en el sitio.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">3. Gestión de tu consentimiento</h2>
              <p>
                Al primer ingreso ves un banner con opciones: Aceptar todas · Rechazar · Configurar preferencias.
                Puedes cambiar tu decisión en cualquier momento desde este enlace:
              </p>
              <p className="mt-3">
                <ConsentPreferencesLink className="text-[#C8A45D] underline hover:text-[#E2C98A] text-base" />
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">4. Retirada del consentimiento</h2>
              <p>
                Puedes retirar tu consentimiento en cualquier momento desde el modal de preferencias. La retirada:
              </p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Detiene inmediatamente el envío de eventos a analítica o marketing.</li>
                <li>Elimina las cookies de terceros ya establecidas cuando es técnicamente posible.</li>
                <li>Se registra como evidencia con timestamp y hash de IP.</li>
              </ul>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">5. Efecto de rechazar</h2>
              <p>
                Rechazar cookies analíticas o de marketing no afecta el funcionamiento del sitio. Rechazar las necesarias no es posible sin romper funciones básicas de consent.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">6. Trackers de terceros</h2>
              <p>
                Cuando aceptas la categoría analítica, Google Analytics 4 puede usar sus propias cookies sujetas a su política de privacidad.
              </p>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
