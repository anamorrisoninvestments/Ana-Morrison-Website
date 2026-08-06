import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import LegalDraftBanner from "@/components/consent/LegalDraftBanner";
import ConsentPreferencesLink from "@/components/consent/ConsentPreferencesLink";
import { CLIENT } from "@/lib/client-data";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Cómo tratamos tus datos personales en anamorrison.com. Borrador provisional pendiente de revisión legal.",
  alternates: { canonical: "/politica-de-privacidad" },
  robots: { index: true, follow: true },
};

export default function PoliticaPrivacidadPage() {
  const lastUpdated = "2026-08-01";
  const version = process.env.NEXT_PUBLIC_CONSENT_VERSION || "v1.0";
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16 bg-[#0D0A08]">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-[#F7F3EC]">
          <nav className="text-[#888888] text-sm mb-6">
            <Link href="/" className="hover:text-[#C8A45D]">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-[#C8A45D]">Política de Privacidad</span>
          </nav>

          <h1 className="heading-serif text-4xl sm:text-5xl mb-4">Política de Privacidad</h1>
          <p className="text-[#888888] text-sm mb-2">Última actualización: {lastUpdated} · Versión: {version}</p>

          <LegalDraftBanner />

          <section className="space-y-6 text-[#F7F3EC]/85 text-base leading-relaxed">
            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">1. Responsable</h2>
              <p>
                El sitio <strong>anamorrison.com</strong> es operado por Ana Maria Morrison.
                Para consultas relacionadas con esta política: <a href={`mailto:${CLIENT.email}`} className="text-[#C8A45D] underline">{CLIENT.email}</a>.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">2. Datos que recopilamos</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Datos que tú nos das: nombre, email, WhatsApp, ciudad de la propiedad, tipo de propiedad, capital destinado (rango), mensaje libre y demás campos del formulario de contacto o descarga de recursos.</li>
                <li>Datos técnicos: dispositivo, sistema operativo, navegador (resumido, sin fingerprint), páginas visitadas, referrer, parámetros UTM.</li>
                <li>Datos de consentimiento: preferencias de cookies con timestamp y un hash irreversible de la IP.</li>
              </ul>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">3. Finalidad y base legal</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Consentimiento explícito para envío de comunicaciones y contenido educativo.</li>
                <li>Ejecución de solicitud previa (responder a tu formulario).</li>
                <li>Interés legítimo para operar el sitio, prevenir fraude y mejorar servicios.</li>
                <li>Cumplimiento de obligaciones legales aplicables.</li>
              </ul>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">4. Con quién compartimos datos</h2>
              <p>
                Colaboramos con proveedores tecnológicos que actúan como encargados del tratamiento:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li><strong>Vercel</strong> — hosting y CDN</li>
                <li><strong>Supabase</strong> — base de datos operativa</li>
                <li><strong>Resend</strong> — email transaccional</li>
                <li><strong>Google Analytics 4</strong> — analítica de uso, solo si aceptas cookies analíticas</li>
              </ul>
              <p className="mt-3">No vendemos datos personales a terceros.</p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">5. Transferencias internacionales</h2>
              <p>
                Algunos proveedores procesan datos en Estados Unidos. Se aplican las salvaguardas contractuales estándar de cada proveedor.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">6. Retención (provisional, pendiente de revisión legal)</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Leads sin relación comercial activa: máximo provisional 24 meses desde la última actividad; luego anonimización.</li>
                <li>Leads con relación comercial activa: sin cutoff automático mientras estén activos.</li>
                <li>Clientes y transacciones: según necesidades contractuales, contables y fiscales aplicables.</li>
                <li>Registros de consentimiento: evidencia mínima necesaria; periodo sujeto a revisión legal.</li>
              </ul>
              <p className="text-[#888888] text-sm italic mt-3">
                Estos periodos son provisionales y quedan sujetos a la revisión de un abogado autorizado en Florida.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">7. Tus derechos</h2>
              <p>
                Puedes solicitar en cualquier momento: acceso, rectificación, oposición, supresión, portabilidad y retiro de consentimiento.
                Solicitudes a <a href={`mailto:${CLIENT.email}`} className="text-[#C8A45D] underline">{CLIENT.email}</a>. Respuesta en máximo 30 días naturales.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">8. Cookies</h2>
              <p>
                Ver la <Link href="/politica-de-cookies" className="text-[#C8A45D] underline">Política de Cookies</Link>.
                Puedes cambiar tus preferencias en cualquier momento: <ConsentPreferencesLink className="text-[#C8A45D] underline" />.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">9. Menores</h2>
              <p>
                El sitio no está dirigido a menores de 18 años. Si detectas que un menor ha proporcionado datos, contáctanos para eliminarlos.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">10. Cambios a esta política</h2>
              <p>
                Publicaremos cambios en esta misma página con fecha y versión actualizadas. Cambios materiales serán notificados por email a suscriptores activos y forzarán a re-aceptar el consentimiento vigente.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">11. Ley aplicable</h2>
              <p>
                Ver <Link href="/terminos-de-uso" className="text-[#C8A45D] underline">Términos de Uso</Link>. Jurisdicción provisional: Estado de Florida, Estados Unidos.
              </p>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
