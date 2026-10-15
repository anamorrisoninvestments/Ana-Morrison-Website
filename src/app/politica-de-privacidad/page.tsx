import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ConsentPreferencesLink from "@/components/consent/ConsentPreferencesLink";
import { CLIENT } from "@/lib/client-data";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Cómo Apartment Boutique LLC trata tus datos personales en anamorrison.com y Tu Punto de Partida™.",
  alternates: { canonical: "/politica-de-privacidad" },
  robots: { index: true, follow: true },
};

export default function PoliticaPrivacidadPage() {
  const lastUpdated = "2026-10-15";
  const version = process.env.NEXT_PUBLIC_CONSENT_VERSION || "v1.1";
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

          <aside className="my-6 rounded-xl border border-[#C8A45D]/40 bg-[#C8A45D]/10 p-4 text-sm leading-relaxed text-[#F7F3EC]/90">
            <strong className="text-[#C8A45D]">Aviso provisional:</strong>{" "}
            esta política se publica para informar con transparencia y está pendiente de revisión final por un abogado autorizado en Florida. No sustituye asesoría legal.
          </aside>

          <section className="space-y-6 text-[#F7F3EC]/85 text-base leading-relaxed">
            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">1. Responsable</h2>
              <p>
                <strong>Apartment Boutique LLC</strong> es la entidad responsable del tratamiento de datos personales realizado mediante <strong>anamorrison.com</strong>, sus formularios, servicios relacionados y la herramienta <strong>Tu Punto de Partida™</strong>. AnaMaría Morrison participa como creadora y facilitadora de los contenidos y servicios ofrecidos por la compañía, pero no actúa en esta política como responsable a título personal.
              </p>
              <p className="mt-3">
                Para preguntas o solicitudes relacionadas con privacidad, escribe a <a href={"mailto:" + CLIENT.email} className="text-[#C8A45D] underline">{CLIENT.email}</a>.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">2. Datos que recopilamos</h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Identificación y contacto:</strong> nombre, correo electrónico, teléfono o WhatsApp, país, ciudad y los demás datos que decidas proporcionar.</li>
                <li><strong>Formularios y servicios:</strong> ciudad de la propiedad, tipo de propiedad, capital destinado en rangos, mensajes y demás campos de contacto, descarga, reserva o contratación.</li>
                <li><strong>Tu Punto de Partida™:</strong> respuestas seleccionadas en el diagnóstico, rangos de ingresos, metas, retos, expectativas, contexto personal y cualquier texto opcional que escribas para expresarte con libertad.</li>
                <li><strong>Bitácora de Transformación:</strong> notas, avances, cambios, reflexiones, recomendaciones y antecedentes que permitan dar continuidad a tu proceso, cuando aceptes participar.</li>
                <li><strong>Interacciones y transacciones:</strong> reservas, asistencia, comunicaciones, estado de pagos y referencias de transacción. Los datos completos de tarjetas son procesados por el proveedor de pagos y no deben almacenarse en nuestros formularios.</li>
                <li>Datos técnicos: dispositivo, sistema operativo, navegador (resumido, sin fingerprint), páginas visitadas, referrer, parámetros UTM.</li>
                <li>Datos de consentimiento: preferencias de cookies con timestamp y un hash irreversible de la IP.</li>
              </ul>
              <p className="mt-3">
                Los campos de texto libre pueden revelar información personal sensible. Comparte únicamente aquello con lo que te sientas cómoda o cómodo. Las respuestas opcionales no son necesarias para completar el diagnóstico.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">3. Finalidad y base legal</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Procesar el diagnóstico, generar un resultado, reporte o plan educativo personalizado y responder a tus solicitudes.</li>
                <li>Dar continuidad a tu Bitácora de Transformación, observar avances y adaptar el acompañamiento, si has dado tu consentimiento.</li>
                <li>Recomendar contenidos, sesiones o programas que puedan ser pertinentes para tus objetivos, sin que una recomendación implique una decisión automatizada con efectos legales o similares.</li>
                <li>Gestionar reservas, pagos, comunicaciones transaccionales, soporte y la relación contractual o precontractual.</li>
                <li>Analizar de forma agregada o anonimizada el uso de la herramienta para mejorar preguntas, resultados, programas y servicios.</li>
                <li>Enviar comunicaciones promocionales solo cuando otorgues un consentimiento separado y opcional. Negarte al marketing no impide recibir el diagnóstico ni las comunicaciones necesarias del servicio.</li>
                <li>Interés legítimo para operar el sitio, prevenir fraude y mejorar servicios.</li>
                <li>Cumplimiento de obligaciones legales aplicables.</li>
              </ul>
              <p className="mt-3">
                Cuando el tratamiento dependa de tu consentimiento, podrás retirarlo en cualquier momento. El retiro no afecta la licitud del tratamiento realizado antes de recibir tu solicitud.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">4. Inteligencia artificial y revisión humana</h2>
              <p>
                Podemos utilizar herramientas de inteligencia artificial para organizar respuestas, identificar temas, redactar borradores de resultados y apoyar la personalización del acompañamiento. Procuramos aplicar minimización de datos y controles de acceso, y evitamos utilizar más información de la necesaria para cada finalidad.
              </p>
              <p className="mt-3">
                La IA es una herramienta de apoyo: sus resultados pueden ser incompletos o contener errores. Cuando corresponda, una persona autorizada podrá revisar, corregir o complementar el contenido antes de usarlo para acompañarte. No tomamos decisiones exclusivamente automatizadas que produzcan efectos legales o de importancia similar sobre ti.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">5. Con quién compartimos datos</h2>
              <p>
                Compartimos solo la información necesaria con proveedores tecnológicos que apoyan la operación, sujetos a sus contratos y políticas aplicables:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li><strong>Vercel</strong> — hosting y CDN</li>
                <li><strong>Supabase</strong> — base de datos operativa</li>
                <li><strong>Resend</strong> — email transaccional</li>
                <li><strong>2Clicks / HighLevel</strong> — gestión de contactos, formularios, calendario, comunicaciones y automatizaciones</li>
                <li><strong>Stripe u otro proveedor habilitado</strong> — procesamiento de pagos</li>
                <li><strong>Proveedores de inteligencia artificial habilitados para la herramienta</strong> — análisis y generación asistida, únicamente según la configuración vigente y las finalidades descritas en esta política</li>
                <li><strong>Google Analytics 4</strong> — analítica de uso, solo si aceptas cookies analíticas</li>
              </ul>
              <p className="mt-3">No vendemos datos personales. También podremos comunicar información cuando una ley, autoridad competente o la protección de derechos y seguridad lo exija.</p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">6. Transferencias internacionales</h2>
              <p>
                Algunos proveedores pueden procesar datos en Estados Unidos u otros países. Procuramos contratar proveedores que ofrezcan compromisos de seguridad y aplicar las salvaguardas contractuales o mecanismos legales disponibles cuando resulten exigibles.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">7. Retención</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Contactos sin relación comercial activa: hasta 24 meses desde la última interacción, salvo que retires antes tu consentimiento o exista otra obligación aplicable.</li>
                <li>Diagnósticos y Bitácora de Transformación: mientras tu proceso o cuenta permanezca activo y hasta 24 meses después de la última interacción, salvo solicitud de eliminación u obligación legal.</li>
                <li>Relaciones activas: durante la prestación del servicio y por el tiempo razonablemente necesario para darle continuidad.</li>
                <li>Clientes y transacciones: según necesidades contractuales, contables y fiscales aplicables.</li>
                <li>Registros de consentimiento: evidencia mínima necesaria según la normativa aplicable.</li>
              </ul>
              <p className="mt-3">
                Al vencer el plazo aplicable, eliminaremos o anonimizaremos la información, salvo que debamos conservarla para cumplir una obligación legal, resolver una disputa o ejercer derechos.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">8. Tus derechos y opciones</h2>
              <p>
                Puedes solicitar, según corresponda: acceso, corrección, actualización, eliminación, oposición o limitación del tratamiento, portabilidad y retiro del consentimiento. También puedes pedir información sobre el uso de IA o solicitar revisión humana de un resultado.
              </p>
              <p className="mt-3">
                Envía tu solicitud a <a href={"mailto:" + CLIENT.email} className="text-[#C8A45D] underline">{CLIENT.email}</a>. Podremos solicitar información razonable para verificar tu identidad. Procuraremos responder dentro de 30 días naturales, sujeto a los plazos y excepciones de la ley aplicable.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">9. Seguridad</h2>
              <p>
                Aplicamos medidas administrativas, técnicas y organizativas razonables para proteger la información, como controles de acceso, separación de entornos y uso de proveedores especializados. Ningún sistema es completamente infalible; por ello revisamos y mejoramos estas medidas de forma continua.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">10. Cookies</h2>
              <p>
                Ver la <Link href="/politica-de-cookies" className="text-[#C8A45D] underline">Política de Cookies</Link>.
                Puedes cambiar tus preferencias en cualquier momento: <ConsentPreferencesLink className="text-[#C8A45D] underline" />.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">11. Menores</h2>
              <p>
                El sitio no está dirigido a menores de 18 años. Si detectas que un menor ha proporcionado datos, contáctanos para eliminarlos.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">12. Naturaleza educativa del servicio</h2>
              <p>
                Tu Punto de Partida™, la Bitácora de Transformación y los contenidos relacionados ofrecen orientación educativa y de desarrollo personal. No constituyen terapia ni atención médica o de salud mental, ni asesoría legal, fiscal o de inversión. Si necesitas ayuda profesional especializada, consulta a un profesional debidamente acreditado.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">13. Cambios a esta política</h2>
              <p>
                Publicaremos cambios en esta misma página con fecha y versión actualizadas. Cambios materiales serán notificados por email a suscriptores activos y forzarán a re-aceptar el consentimiento vigente.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">14. Ley aplicable</h2>
              <p>
                Ver <Link href="/terminos-de-uso" className="text-[#C8A45D] underline">Términos de Uso</Link>. Jurisdicción: Estado de Florida, Estados Unidos.
              </p>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
