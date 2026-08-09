# Bloque 4 · Copy aprobado

**Scope:** Cookie Banner · Cookie Preferences Modal · Privacy Policy · Cookie Policy · Terms of Use
**Estado:** aprobado por Ana con correcciones finales (robots Option B + GA4 IP neutral + Privacy §4 modelo de negocio).
**Ver también:** `i18n/BRAND-NAME.md`, `i18n/COPY-BLOCK-1.md`, `i18n/COPY-BLOCK-2.md`, `i18n/COPY-BLOCK-3.md`, `i18n/F8-EXIT-CRITERIA.md`.

---

## Regla maestra de identidad

Nombre público obligatorio: **`AnaMaría Morrison`**
- Ana y María juntas, sin espacio
- María con tilde en la í
- Espacio antes de Morrison
- Idéntico en ES y EN

Categoría F preservada sin cambios: `anamorrison.com`, emails funcionales, handles sociales, LinkedIn histórico, GitHub repo, proyecto Vercel, assets legacy, slugs ES existentes.

---

## Regla de paridad total antes de activar i18n

`NEXT_PUBLIC_I18N_ENABLED=false` durante F2–F7. Solo se activa en Preview durante F8 y en Producción tras autorización explícita.

**Cero excepciones:** `pending`, placeholder de idioma, `Spanish-only`, coming soon como sustituto de traducción, `post-merge`, rutas faltantes.

**Excepción documentada NO viola paridad:** card estructural "Más casos próximamente / More case studies coming" en Case Studies.

---

## Regla de indexación de borradores legales · Opción B aprobada

Mientras exista `LegalDraftBanner` en las 3 páginas legales:

- `/politica-de-privacidad` y `/en/privacy-policy`
- `/politica-de-cookies` y `/en/cookie-policy`
- `/terminos-de-uso` y `/en/terms-of-use`

Configurar en `export const metadata` de cada página:

```
robots: { index: false, follow: true }
```

**Decisión técnica:** los enlaces internos siguen siendo seguidos (`follow: true`) para que el crawler encuentre el resto del sitio, pero las páginas legales en borrador NO se indexan (`index: false`).

Cuando en una fase posterior las políticas hayan recibido revisión legal final y se retire `LegalDraftBanner`, restaurar en cada `metadata`:

```
robots: { index: true, follow: true }
```

Este cambio es en 3 líneas por versión (ES + EN = 6 líneas totales) y se ejecuta en el mismo PR que retira el `LegalDraftBanner`.

---

## Regla de pipeline crítico intacto

**Cero cambios técnicos** al pipeline de consent, cookies, analytics, Supabase y Resend validado en PR #2. Bloque 4 únicamente documenta y traduce.

Se preserva sin modificación:
- Cookie `amc_consent` (JSON con categorías, TTL 12 meses, invalidación por `NEXT_PUBLIC_CONSENT_VERSION`)
- Cookie `amc_session` (ID anónimo, TTL 30 días)
- Cookie `amc_lang_suggestion_dismissed` (banner de sugerencia de idioma, TTL 30 días · pendiente F2)
- Categorías: `necessary` (siempre true, no editable), `analytics`, `marketing`
- Acciones append-only en `public.consents`: `accepted`, `rejected`, `updated`, `withdrawn`
- Evento runtime `amc:consent-changed` para reactividad
- `<Analytics>` fail-closed con 3 condiciones simultáneas: `NEXT_PUBLIC_ANALYTICS_ENABLED === "true"` AND `NEXT_PUBLIC_GA_ID` presente AND consent analytics=true
- Endpoint `POST /api/consent/log` con rate limit + validación zod + `ip_hash` sin PII en claro
- Cero import de Meta Pixel · cero script de marketing cargado

---

# 4.1 · Cookie Banner (banner inicial)

**Componente:** `src/components/consent/ConsentBanner.tsx` (implementado PR #2).

## 4.1.C · Copy exacto

| Elemento | ES | EN |
|---|---|---|
| Título | `Usamos cookies` | `We use cookies` |
| Body | `Cookies necesarias para operar el sitio, y opcionales para analítica y marketing. Puedes aceptar todas, rechazar las no necesarias o configurar tus preferencias.` | `Necessary cookies to operate the site, plus optional cookies for analytics and marketing. You can accept all, reject non-essential, or configure your preferences.` |
| Link `Ver política` | `Ver política` | `View policy` |
| Botón "Aceptar todas" | `Aceptar todas` | `Accept all` |
| Botón "Rechazar" | `Rechazar` | `Reject` |
| Botón "Configurar" | `Configurar` | `Configure` |

## 4.1.A · Aria-labels

| Elemento | ES | EN |
|---|---|---|
| Container role | `role="dialog"` con `aria-labelledby` al título | idem |
| Aria-label banner (contenedor) | `Aviso de cookies` | `Cookie notice` |
| Aria-label botón "Aceptar todas" | `Aceptar todas las cookies` | `Accept all cookies` |
| Aria-label botón "Rechazar" | `Rechazar cookies no necesarias` | `Reject non-essential cookies` |
| Aria-label botón "Configurar" | `Configurar preferencias de cookies` | `Configure cookie preferences` |

**Confirmación:** el botón "Rechazar" afecta únicamente a las categorías opcionales. Las Necesarias permanecen activas por diseño y así se documenta en 4.2.

## 4.1.behavior · Comportamiento (sin cambios técnicos)

Aparece si no existe cookie `amc_consent` de la versión actual. Cierra con clic en cualquiera de los tres botones. Persiste elección en `amc_consent` (TTL 12 meses) y registra fila append-only en `public.consents` con `action` = `accepted / rejected / updated`.

---

# 4.2 · Cookie Preferences Modal

**Componente:** `src/components/consent/ConsentBanner.tsx` (sección modal · implementado PR #2).

## 4.2.C · Header del modal

| Elemento | ES | EN |
|---|---|---|
| Título modal | `Preferencias de cookies` | `Cookie preferences` |
| Subtítulo | `Elige qué categorías permites. Las necesarias no pueden desactivarse.` | `Choose which categories you allow. Necessary cookies cannot be disabled.` |
| Aria-label cerrar (X) | `Cerrar modal de preferencias de cookies` | `Close cookie preferences modal` |

## 4.2.cats · 3 categorías

### Necesarias (siempre activa, no editable)

| Elemento | ES | EN |
|---|---|---|
| Título | `Necesarias` | `Necessary` |
| Badge | `(siempre activas)` | `(always active)` |
| Descripción | `Cookies imprescindibles para el consentimiento, la sesión y la seguridad. Siempre activas.` | `Essential cookies for consent, session, and security. Always active.` |

### Analíticas (opcional · descripción prudente)

| Elemento | ES | EN |
|---|---|---|
| Título | `Analíticas` | `Analytics` |
| Descripción | `Medición del uso del sitio para comprender el rendimiento y mejorar el contenido y la navegación.` | `Measurement of site usage to understand performance and improve content and navigation.` |

**Nota técnica:** se removió la palabra `anónima / anonymous`. GA4 recibe identificadores + cookies + IP procesada.

### Marketing (opcional · sin trackers activos hoy)

| Elemento | ES | EN |
|---|---|---|
| Título | `Marketing` | `Marketing` |
| Descripción | `Permite tecnologías opcionales de marketing si se habilitan en el sitio. Actualmente no hay proveedores de marketing activos.` | `Allows optional marketing technologies if enabled on the site. No marketing providers are currently active.` |

## 4.2.btn · Botones del modal

| Elemento | ES | EN |
|---|---|---|
| Botón primario | `Guardar preferencias` | `Save preferences` |
| Botón secundario | `Aceptar todas` | `Accept all` |
| Link "Retirar consentimiento" (solo si existe consent previo) | `Retirar consentimiento` | `Withdraw consent` |

---

# 4.3 · Privacy Policy

**Rutas:** ES `/politica-de-privacidad` · EN `/en/privacy-policy`
**Estado:** borrador provisional con `LegalDraftBanner` · `robots: { index: false, follow: true }`

## 4.3.M · Metadata / SEO

| Campo | ES | EN |
|---|---|---|
| `<title>` | `Política de Privacidad \| AnaMaría Morrison` | `Privacy Policy \| AnaMaría Morrison` |
| Meta description | `Cómo tratamos tus datos personales en anamorrison.com. Borrador provisional pendiente de revisión legal.` | `How we handle your personal data on anamorrison.com. Provisional draft pending legal review.` |
| Canonical | `https://anamorrison.com/politica-de-privacidad` | `https://anamorrison.com/en/privacy-policy` |
| hreflang | bidireccional | idem |
| **`robots`** | **`{ index: false, follow: true }`** mientras exista `LegalDraftBanner` | idem |
| Schema.org WebPage `inLanguage` | `es-US` | `en-US` |

## 4.3.B · Breadcrumbs

| ES | EN |
|---|---|
| `Inicio · Política de Privacidad` | `Home · Privacy Policy` |

## 4.3.H · Header

| Elemento | ES | EN |
|---|---|---|
| H1 | `Política de Privacidad` | `Privacy Policy` |
| Meta línea | `Última actualización: {date} · Versión: {version}` | `Last updated: {date} · Version: {version}` |

## 4.3.LDB · LegalDraftBanner (aplicado también a Cookie Policy y Terms of Use)

| Elemento | ES | EN |
|---|---|---|
| Eyebrow | `Borrador provisional` | `Provisional draft` |
| Body | `Este documento es un borrador provisional pendiente de revisión legal. No debe interpretarse como asesoría legal ni como un documento revisado profesionalmente.` | `This document is a provisional draft pending legal review. It should not be interpreted as legal advice or as a professionally reviewed document.` |

**Removido explícitamente:** mención de una jurisdicción específica para el abogado revisor. El copy visible dice únicamente "pendiente de revisión legal" en ES y "pending legal review" en EN.

## 4.3.S · 11 secciones

### §1 · Responsable / Data controller

| ES | EN |
|---|---|
| `1. Responsable` | `1. Data controller` |
| `El sitio anamorrison.com es operado por AnaMaría Morrison. Para consultas relacionadas con esta política: {email}.` | `The site anamorrison.com is operated by AnaMaría Morrison. For questions related to this policy: {email}.` |

### §2 · Datos que recopilamos / Data we collect

| ES headline | EN headline |
|---|---|
| `2. Datos que recopilamos` | `2. Data we collect` |

Lista de 3 items:

| # | ES | EN |
|---|---|---|
| 1 | `Datos que tú nos das: nombre, email, WhatsApp, ciudad de la propiedad, tipo de propiedad, capital destinado (rango), mensaje libre y demás campos del formulario de contacto o descarga de recursos.` | `Data you provide: name, email, WhatsApp, property city, property type, capital allocation (range), free-form message, and other fields from the contact form or resource download.` |
| 2 | `Datos técnicos: dispositivo, sistema operativo, navegador (resumido, sin fingerprint), páginas visitadas, referrer, parámetros UTM.` | `Technical data: device, operating system, browser (summarized, no fingerprint), pages visited, referrer, UTM parameters.` |
| 3 | `Datos de consentimiento: preferencias de cookies con timestamp y un hash irreversible de la IP.` | `Consent data: cookie preferences with timestamp and an irreversible hash of the IP.` |

### §3 · Finalidad y base legal / Purpose and legal basis

| ES headline | EN headline |
|---|---|
| `3. Finalidad y base legal` | `3. Purpose and legal basis` |

Lista de 4 items:

| # | ES | EN |
|---|---|---|
| 1 | `Consentimiento explícito para envío de comunicaciones y contenido educativo.` | `Explicit consent for sending communications and educational content.` |
| 2 | `Ejecución de solicitud previa (responder a tu formulario).` | `Execution of prior request (responding to your form).` |
| 3 | `Interés legítimo para operar el sitio, prevenir fraude y mejorar servicios.` | `Legitimate interest to operate the site, prevent fraud, and improve services.` |
| 4 | `Cumplimiento de obligaciones legales aplicables.` | `Compliance with applicable legal obligations.` |

### §4 · Con quién compartimos datos / Who we share data with

| ES headline | EN headline |
|---|---|
| `4. Con quién compartimos datos` | `4. Who we share data with` |

**Encabezado:**

| ES | EN |
|---|---|
| `Actualmente colaboramos con los siguientes proveedores tecnológicos que actúan como encargados del tratamiento. La lista puede actualizarse en el futuro y se reflejará en esta página:` | `We currently work with the following technology providers acting as data processors. This list may change over time and any updates will be reflected on this page:` |

**Lista de proveedores confirmados hoy:**

| # | ES | EN |
|---|---|---|
| 1 | `Vercel (hosting)` | `Vercel (hosting)` |
| 2 | `Supabase (base de datos operativa)` | `Supabase (operational database)` |
| 3 | `Resend (email transaccional)` | `Resend (transactional email)` |
| 4 | `Google Analytics 4 (analítica de uso, solo se carga cuando existe consentimiento activo de la categoría Analíticas)` | `Google Analytics 4 (usage analytics; loaded only when active consent for the Analytics category is present)` |

**Cierre del §4 (formulación aprobada):**

| ES | EN |
|---|---|
| `No utilizamos la venta de datos personales como modelo de negocio. Podemos compartir información con proveedores y servicios necesarios para operar, analizar y mejorar el sitio, según se describe en esta política y sujeto a la legislación aplicable.` | `We do not use the sale of personal data as a business model. We may share information with providers and services necessary to operate, analyze, and improve the site, as described in this policy and subject to applicable law.` |

**Nota interna (NO visible al público):** *Legal review required to determine whether any specific disclosure, opt-out mechanism, or "Do Not Sell or Share My Personal Information" notice is required under applicable law.*

### §5 · Transferencias internacionales / International transfers

| ES headline | EN headline |
|---|---|
| `5. Transferencias internacionales` | `5. International transfers` |

| ES body | EN body |
|---|---|
| `Algunos proveedores procesan datos en Estados Unidos. Se aplican las salvaguardas contractuales estándar de cada proveedor.` | `Some providers process data in the United States. Each provider's standard contractual safeguards apply.` |

### §6 · Retención (provisional, pendiente de revisión legal)

| ES headline | EN headline |
|---|---|
| `6. Retención (provisional, pendiente de revisión legal)` | `6. Retention (provisional, pending legal review)` |

Lista de 4 items + nota provisional:

| # | ES | EN |
|---|---|---|
| 1 | `Leads sin relación comercial activa: máximo provisional 24 meses desde la última actividad; luego anonimización.` | `Leads without active commercial relationship: provisional maximum of 24 months from last activity; then anonymization.` |
| 2 | `Leads con relación comercial activa: sin cutoff automático mientras estén activos.` | `Leads with active commercial relationship: no automatic cutoff while active.` |
| 3 | `Clientes y transacciones: según necesidades contractuales, contables y fiscales aplicables.` | `Clients and transactions: per applicable contractual, accounting, and tax requirements.` |
| 4 | `Registros de consentimiento: evidencia mínima necesaria; periodo sujeto a revisión legal.` | `Consent records: minimum necessary evidence; period subject to legal review.` |
| Nota | `Estos periodos son provisionales y quedan sujetos a la revisión legal correspondiente.` | `These periods are provisional and subject to appropriate legal review.` |

### §7 · Tus derechos / Your rights (formulación condicionada por jurisdicción)

| ES headline | EN headline |
|---|---|
| `7. Tus derechos` | `7. Your rights` |

| ES body | EN body |
|---|---|
| `Dependiendo de la legislación aplicable, puedes tener determinados derechos sobre tus datos personales, que pueden incluir acceso, corrección, eliminación, portabilidad, oposición o retiro del consentimiento. Puedes ejercerlos escribiendo a {email}. Responderemos a las solicitudes de privacidad dentro del plazo exigido por la legislación aplicable.` | `Depending on applicable law, you may have certain rights regarding your personal data, which may include access, correction, deletion, portability, objection, or withdrawal of consent. You may exercise them by writing to {email}. We will respond to privacy requests within the time required by applicable law.` |

### §8 · Cookies

| ES headline | EN headline |
|---|---|
| `8. Cookies` | `8. Cookies` |

| ES body | EN body |
|---|---|
| `Ver la Política de Cookies. Puedes cambiar tus preferencias en cualquier momento desde el link "Preferencias de cookies" del footer.` | `See the Cookie Policy. You can change your preferences at any time from the "Cookie preferences" link in the footer.` |

### §9 · Menores / Minors (formulación prudente sin cambios)

| ES headline | EN headline |
|---|---|
| `9. Menores` | `9. Minors` |

| ES body | EN body |
|---|---|
| `El sitio no está dirigido a menores de 18 años. Si detectas que un menor ha proporcionado datos, contáctanos para eliminarlos.` | `The site is not directed at minors under 18. If you detect that a minor has provided data, please contact us to delete it.` |

### §10 · Cambios a esta política / Changes to this policy

| ES headline | EN headline |
|---|---|
| `10. Cambios a esta política` | `10. Changes to this policy` |

| ES body | EN body |
|---|---|
| `Publicaremos cambios en esta misma página con fecha y versión actualizadas. Cambios materiales serán notificados por email a suscriptores activos y forzarán a re-aceptar el consentimiento vigente.` | `We will publish changes on this same page with an updated date and version. Material changes will be notified by email to active subscribers and will require re-accepting the current consent.` |

### §11 · Ley aplicable / Governing law (placeholder revisión legal)

| ES headline | EN headline |
|---|---|
| `11. Ley aplicable` | `11. Governing law` |

| ES body | EN body |
|---|---|
| `La ley aplicable y cualquier disposición sobre jurisdicción se establecerán en la versión final después de revisión legal. Ver Términos de Uso.` | `Applicable law and any jurisdiction provisions will be established in the final version after legal review. See Terms of Use.` |

---

# 4.4 · Cookie Policy

**Rutas:** ES `/politica-de-cookies` · EN `/en/cookie-policy`
**Estado:** borrador provisional con `LegalDraftBanner` · `robots: { index: false, follow: true }`

## 4.4.M · Metadata / SEO

| Campo | ES | EN |
|---|---|---|
| `<title>` | `Política de Cookies \| AnaMaría Morrison` | `Cookie Policy \| AnaMaría Morrison` |
| Meta description | `Categorías de cookies utilizadas en anamorrison.com y cómo gestionar tus preferencias.` | `Cookie categories used on anamorrison.com and how to manage your preferences.` |
| Canonical | `https://anamorrison.com/politica-de-cookies` | `https://anamorrison.com/en/cookie-policy` |
| hreflang | bidireccional | idem |
| **`robots`** | **`{ index: false, follow: true }`** mientras exista `LegalDraftBanner` | idem |
| Schema.org WebPage `inLanguage` | `es-US` | `en-US` |

## 4.4.B · Breadcrumbs

| ES | EN |
|---|---|
| `Inicio · Política de Cookies` | `Home · Cookie Policy` |

## 4.4.H · Header

| Elemento | ES | EN |
|---|---|---|
| H1 | `Política de Cookies` | `Cookie Policy` |
| Meta línea | `Versión: {version}` | `Version: {version}` |

## 4.4.LDB

Idéntico al banner de Privacy Policy (§4.3.LDB) · sin mención de "Florida".

## 4.4.S · 6 secciones

### §1 · Qué son las cookies / What cookies are

| ES headline | EN headline |
|---|---|
| `1. Qué son las cookies` | `1. What cookies are` |

| ES body | EN body |
|---|---|
| `Pequeños archivos que se almacenan en tu navegador para recordar preferencias, medir uso del sitio y ofrecer funcionalidad esencial.` | `Small files stored in your browser to remember preferences, measure site usage, and offer essential functionality.` |

### §2 · Categorías que usamos

| ES headline | EN headline |
|---|---|
| `2. Categorías que usamos` | `2. Categories we use` |

#### §2.1 · Necesarias / Necessary (siempre activas)

| Elemento | ES | EN |
|---|---|---|
| Título card | `Necesarias (siempre activas)` | `Necessary (always active)` |
| Body | `Imprescindibles para el consentimiento, la sesión y la seguridad. No pueden desactivarse porque el sitio no funciona sin ellas.` | `Essential for consent, session, and security. Cannot be disabled because the site does not work without them.` |
| Details | `amc_consent · guarda tus preferencias de cookies (12 meses)` · `amc_session · ID anónimo de sesión (30 días)` | `amc_consent · stores your cookie preferences (12 months)` · `amc_session · anonymous session ID (30 days)` |

#### §2.2 · Analíticas / Analytics (opcional · descripción prudente)

| Elemento | ES | EN |
|---|---|---|
| Título card | `Analíticas (opcionales)` | `Analytics (optional)` |
| Body | `Medición del uso del sitio para comprender el rendimiento y mejorar el contenido y la navegación. Solo se carga cuando existe consentimiento activo de la categoría Analíticas.` | `Measurement of site usage to understand performance and improve content and navigation. Loaded only when active consent for the Analytics category is present.` |
| Details | `_ga* · Google Analytics 4 (hasta 2 años, sujeto a la configuración y políticas de Google Analytics)` | `_ga* · Google Analytics 4 (up to 2 years, subject to Google Analytics settings and policies)` |

**Nota técnica interna (NO visible al público):** el TTL "hasta 2 años" refleja la vida útil por defecto de las cookies `_ga` según la documentación pública de Google Analytics 4 y depende de la configuración del proveedor. No se afirma como propiedad de privacidad del sitio.

#### §2.3 · Marketing (opcional · sin trackers activos)

| Elemento | ES | EN |
|---|---|---|
| Título card | `Marketing (opcionales)` | `Marketing (optional)` |
| Body | `Permite tecnologías opcionales de marketing si se habilitan en el sitio en el futuro. Actualmente no hay proveedores de marketing cargados en el sitio.` | `Allows optional marketing technologies if enabled on the site in the future. Currently no marketing providers are loaded on the site.` |

### §3 · Gestión de tu consentimiento

| ES headline | EN headline |
|---|---|
| `3. Gestión de tu consentimiento` | `3. Managing your consent` |

| ES body | EN body |
|---|---|
| `Al primer ingreso ves un banner con opciones: Aceptar todas · Rechazar · Configurar preferencias. Puedes cambiar tu decisión en cualquier momento desde el link "Preferencias de cookies" del footer.` | `On your first visit you see a banner with options: Accept all · Reject · Configure preferences. You can change your decision at any time from the "Cookie preferences" link in the footer.` |

### §4 · Retirada del consentimiento / Withdrawing consent

| ES headline | EN headline |
|---|---|
| `4. Retirada del consentimiento` | `4. Withdrawing consent` |

Lista de 3 items:

| # | ES | EN |
|---|---|---|
| 1 | `Detiene inmediatamente el envío de eventos a analítica o marketing.` | `Immediately stops sending events to analytics or marketing.` |
| 2 | `Elimina las cookies de terceros ya establecidas cuando es técnicamente posible.` | `Removes already-set third-party cookies when technically possible.` |
| 3 | `Se registra como evidencia con timestamp y hash de IP.` | `Is recorded as evidence with timestamp and IP hash.` |

### §5 · Efecto de rechazar / Effect of rejecting

| ES headline | EN headline |
|---|---|
| `5. Efecto de rechazar` | `5. Effect of rejecting` |

| ES body | EN body |
|---|---|
| `Rechazar cookies analíticas o de marketing no afecta el funcionamiento del sitio. Las cookies necesarias permanecen activas porque el sitio no funciona sin ellas.` | `Rejecting analytics or marketing cookies does not affect site functionality. Necessary cookies remain active because the site does not work without them.` |

### §6 · Trackers de terceros / Third-party trackers

| ES headline | EN headline |
|---|---|
| `6. Trackers de terceros` | `6. Third-party trackers` |

| ES body | EN body |
|---|---|
| `Cuando aceptas la categoría Analíticas, Google Analytics 4 puede usar sus propias cookies sujetas a la política de privacidad de Google. Si en el futuro se habilitan proveedores de marketing, cada uno usaría sus propias cookies y estarían sujetos a la elección de consentimiento de la categoría Marketing.` | `When you accept the Analytics category, Google Analytics 4 may use its own cookies subject to Google's privacy policy. If marketing providers are enabled in the future, each would use its own cookies and be subject to the Marketing category consent.` |

---

# 4.5 · Terms of Use

**Rutas:** ES `/terminos-de-uso` · EN `/en/terms-of-use`
**Estado:** borrador provisional con `LegalDraftBanner` · `robots: { index: false, follow: true }`

## 4.5.M · Metadata / SEO

| Campo | ES | EN |
|---|---|---|
| `<title>` | `Términos de Uso \| AnaMaría Morrison` | `Terms of Use \| AnaMaría Morrison` |
| Meta description | `Términos de uso del sitio anamorrison.com. Borrador provisional pendiente de revisión legal.` | `Terms of use for anamorrison.com. Provisional draft pending legal review.` |
| Canonical | `https://anamorrison.com/terminos-de-uso` | `https://anamorrison.com/en/terms-of-use` |
| hreflang | bidireccional | idem |
| **`robots`** | **`{ index: false, follow: true }`** mientras exista `LegalDraftBanner` | idem |
| Schema.org WebPage `inLanguage` | `es-US` | `en-US` |

## 4.5.B · Breadcrumbs

| ES | EN |
|---|---|
| `Inicio · Términos de Uso` | `Home · Terms of Use` |

## 4.5.H · Header

| Elemento | ES | EN |
|---|---|---|
| H1 | `Términos de Uso` | `Terms of Use` |
| Meta línea | `Última actualización: {date}` | `Last updated: {date}` |

## 4.5.LDB

Idéntico al banner de Privacy Policy y Cookie Policy · sin mención de "Florida".

## 4.5.S · 10 secciones

### §1 · Aceptación / Acceptance

| ES headline | EN headline | ES body | EN body |
|---|---|---|---|
| `1. Aceptación` | `1. Acceptance` | `El uso del sitio implica aceptación de estos términos.` | `Use of the site implies acceptance of these terms.` |

### §2 · Uso permitido / Permitted use

| ES headline | EN headline | ES body | EN body |
|---|---|---|---|
| `2. Uso permitido` | `2. Permitted use` | `El contenido del sitio es de carácter educativo e informativo. Puedes usarlo para tu decisión personal de forma no comercial.` | `The site's content is educational and informational in nature. You may use it for your personal decision-making on a non-commercial basis.` |

### §3 · Propiedad intelectual / Intellectual property

| ES headline | EN headline |
|---|---|
| `3. Propiedad intelectual` | `3. Intellectual property` |

| ES body | EN body |
|---|---|
| `Todo el contenido (textos, imágenes, marca "The Host Circle", materiales descargables) es propiedad de AnaMaría Morrison o de sus respectivos autores y está protegido por derechos de autor. No puedes copiar, redistribuir, revender ni crear obras derivadas sin autorización expresa por escrito.` | `All content (text, images, "The Host Circle" brand, downloadable materials) is the property of AnaMaría Morrison or their respective authors and is protected by copyright. You may not copy, redistribute, resell, or create derivative works without express written authorization.` |

### §4 · Naturaleza del contenido / Nature of the content

| ES headline | EN headline | ES body | EN body |
|---|---|---|---|
| `4. Naturaleza del contenido` | `4. Nature of the content` | `El sitio ofrece contenido educativo, no asesoría profesional individualizada.` | `The site provides educational content, not individualized professional advice.` |

### §5 · Disclaimer de resultados / Results disclaimer

| ES headline | EN headline |
|---|---|
| `5. Disclaimer de resultados` | `5. Results disclaimer` |

| ES body | EN body |
|---|---|
| `El contenido de este sitio tiene carácter educativo e informativo. No garantiza resultados económicos, comerciales, legales, tributarios ni de inversión. Los resultados anteriores no predicen resultados futuros. Toda decisión debe basarse en tu propia debida diligencia y, cuando aplique, en asesoría profesional independiente.` | `The content of this site is educational and informational in nature. It does not guarantee economic, commercial, legal, tax, or investment results. Prior results do not predict future results. Every decision must be based on your own due diligence and, where applicable, on independent professional advice.` |

### §6 · Disclaimer específico Tax Deed / Tax Deed specific disclaimer

| ES headline | EN headline |
|---|---|
| `6. Disclaimer específico Tax Deed` | `6. Tax Deed specific disclaimer` |

| ES body | EN body |
|---|---|
| `El contenido relacionado con Tax Deed es exclusivamente educativo. No constituye asesoría legal, financiera ni tributaria. Las subastas Tax Deed están reguladas por la ley del estado y del condado correspondiente, y sus reglas pueden variar significativamente. Toda inversión en subastas Tax Deed implica riesgos, incluidos riesgos legales, de título, de estado físico, de ocupación y de mercado. Antes de participar en una subasta debes realizar debida diligencia independiente y, cuando corresponda, consultar con un abogado especializado en bienes raíces del estado aplicable. AnaMaría Morrison no ofrece servicios legales, tributarios ni de asesoría fiduciaria.` | `Content related to Tax Deed is exclusively educational. It does not constitute legal, financial, or tax advice. Tax Deed auctions are regulated by the law of the applicable state and county, and their rules may vary significantly. Every Tax Deed investment involves risks, including legal, title, physical condition, occupancy, and market risks. Before participating in an auction you must conduct independent due diligence and, where appropriate, consult with a real estate attorney licensed in the applicable state. AnaMaría Morrison does not provide legal, tax, or fiduciary services.` |

### §7 · Limitación de responsabilidad / Limitation of liability

| ES headline | EN headline |
|---|---|
| `7. Limitación de responsabilidad` | `7. Limitation of liability` |

| ES body | EN body |
|---|---|
| `En la máxima medida permitida por la ley aplicable, AnaMaría Morrison no será responsable por decisiones tomadas con base en el contenido del sitio.` | `To the maximum extent permitted by applicable law, AnaMaría Morrison will not be liable for decisions made based on the site's content.` |

### §8 · Enlaces a terceros / Third-party links

| ES headline | EN headline | ES body | EN body |
|---|---|---|---|
| `8. Enlaces a terceros` | `8. Third-party links` | `No controlamos ni respaldamos contenido de sitios externos enlazados.` | `We do not control or endorse content on linked external sites.` |

### §9 · Modificaciones / Modifications

| ES headline | EN headline | ES body | EN body |
|---|---|---|---|
| `9. Modificaciones` | `9. Modifications` | `Podemos actualizar estos términos. El uso posterior implica aceptación.` | `We may update these terms. Continued use implies acceptance.` |

### §10 · Ley aplicable y jurisdicción / Governing law and jurisdiction (placeholder revisión legal)

| ES headline | EN headline |
|---|---|
| `10. Ley aplicable y jurisdicción` | `10. Governing law and jurisdiction` |

| ES body | EN body |
|---|---|
| `La ley aplicable y cualquier disposición sobre jurisdicción se establecerán en la versión final después de revisión legal.` | `Applicable law and any jurisdiction provisions will be established in the final version after legal review.` |

| Footnote interna ES | Footnote interna EN |
|---|---|
| `Nota interna: pendiente de definición contractual en revisión legal.` | `Internal note: pending contractual definition during legal review.` |

---

## Consistencia con Bloques 1–3 aprobados

- ✅ `AnaMaría Morrison` en todo el copy (Privacy §1, §7, §11; Cookie Policy sin menciones directas del nombre; Terms §3, §6, §7)
- ✅ `The Host Circle` (Terms §3) preservado como nombre propio sin traducir
- ✅ Disclaimer Tax Deed idéntico en página Tax Deed (Bloque 2 §2.3.S3) y Terms §6
- ✅ Cero cifras nuevas · cero certificaciones inventadas · cero claims financieros (la credencial real `Certified Tax Deed Title Analyst` / `Certificada como Analista de Títulos en Subastas del Condado (Tax Deed)` permanece admisible cuando aplique, según `i18n/BRAND-NAME.md` §"Credencial oficial aprobada — Category B")
- ✅ Sin mención de "Florida" en documento visible o LegalDraftBanner
- ✅ Sin plazo universal de 30 días
- ✅ Sin palabra "anónima / anonymous" en Analytics
- ✅ Sin frase absoluta sobre venta/compartición de datos
- ✅ Sin claim de "cero proveedores futuros" — lista descrita como actualizable
- ✅ Proveedores confirmados: Vercel, Supabase, Resend, GA4 (condicional). Cero mención de HubSpot, Meta Pixel, Google Ads, Stripe, Twilio, Zapier, WhatsApp API.

## Notas internas de revisión legal (NO visibles al público)

- Privacy §4: revisar aplicabilidad de aviso "Do Not Sell or Share My Personal Information" bajo CCPA/CPRA si audiencia incluye visitantes de California
- Privacy §5: validar si mención de "salvaguardas contractuales estándar" es suficiente o requiere SCCs específicas por proveedor
- Privacy §6: períodos de retención marcados como provisionales; requieren validación legal para dar valor vinculante
- Terms §10: requiere cláusula contractual concreta de governing law + venue antes de publicar versión final
- Todas las páginas: revisar si es requerida designación de Data Protection Officer bajo alguna jurisdicción aplicable
