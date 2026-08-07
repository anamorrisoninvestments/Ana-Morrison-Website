# PR #3-i18n · Plan completo del modo bilingüe

**Rama:** `claude/p3-pr3-i18n-complete`
**Base:** `main` @ `7e70e4b` (post P3-PR#2)
**Estado:** documentación previa. Cero código de implementación.

---

## ⚠️ CORRECCIONES v2 · Requisitos obligatorios de Ana

Esta versión incorpora las 7 correcciones aprobadas antes de F2. Prevalecen sobre cualquier redacción anterior del documento:

1. **Sitio 100% bilingüe pre-merge.** No se autoriza publicar, activar el selector ni hacer merge final con páginas o contenidos públicos disponibles solo en español.
2. **Los 20 posts del blog** (no 21 — el conteo previo incluía la definición de tipo `slug: string;`) deben tener versión completa EN antes de activar el flag: título, cuerpo completo, excerpt, meta title, meta description, Open Graph, canonical, hreflang bidireccional, enlaces internos equivalentes, imágenes con alt traducido.
3. **Cero `/en/blog` vacío o placeholder "Coming soon".** El blog EN se entrega completo o el flag no sube.
4. **Slugs EN naturales** (no reutilizar slug ES por defecto). Tabla completa en `i18n/BLOG-SLUGS.md`.
5. **Copy dividido en bloques manejables** (5 bloques + N para posts). Bloque 1 entregado en `i18n/COPY-BLOCK-1.md`. Cada bloque requiere aprobación explícita antes de continuar al siguiente.
6. **BilingualSuggestionBanner autorizado** solo como sugerencia no intrusiva: detección Accept-Language, cero redirect automático, una vez por sesión, botones "View in English" / "Continue in Spanish", respeta preferencia guardada, no bloquea contenido ni formularios, accesible y funcional en móvil.
7. **Matriz de paridad total** con 10 criterios por ruta antes del merge. Detalle en `i18n/F8-EXIT-CRITERIA.md`. Ninguna celda puede quedar en `pending`, `placeholder`, `Spanish-only` o `post-merge`. Cero excepciones.

---

---

## 1 · Inventario total de rutas públicas

### 1.1 Rutas activas (deben tener versión EN)

| # | Ruta ES | Tipo | Fuente | En sitemap | Prioridad i18n |
|---|---|---|---|---|---|
| 1 | `/` | Home | `src/app/page.tsx` | sí (1.0) | crítica |
| 2 | `/sobre-mi` | About | `src/app/sobre-mi/page.tsx` | sí (0.9) | crítica |
| 3 | `/alquileres-a-corto-plazo` | Servicio STR | `src/app/alquileres-a-corto-plazo/page.tsx` | sí (0.95) | crítica |
| 4 | `/tax-deed` | Servicio Tax Deed | `src/app/tax-deed/page.tsx` | sí (0.95) | crítica |
| 5 | `/casos-de-exito` | Case studies | `src/app/casos-de-exito/page.tsx` | sí (0.85) | alta |
| 6 | `/recursos` | Resources hub | `src/app/recursos/page.tsx` | sí (0.8) | alta |
| 7 | `/recursos/guia-5-rutas` | Sub-ruta recursos | `src/app/recursos/guia-5-rutas/page.tsx` | no | media |
| 8 | `/blog` | Blog landing | `src/app/blog/page.tsx` | sí (0.8) | alta |
| 9 | `/blog/[slug]` × 21 posts | Blog posts | `src/app/blog/[slug]/page.tsx` + `src/lib/blog-posts.ts` | sí (0.6 c/u) | fase 2 |
| 10 | `/contacto` | Contact form | `src/app/contacto/page.tsx` | sí (0.75) | crítica |
| 11 | `/politica-de-privacidad` | Legal | `src/app/politica-de-privacidad/page.tsx` | sí (0.3) | alta |
| 12 | `/politica-de-cookies` | Legal | `src/app/politica-de-cookies/page.tsx` | sí (0.3) | alta |
| 13 | `/terminos-de-uso` | Legal | `src/app/terminos-de-uso/page.tsx` | sí (0.3) | alta |
| 14 | `/en` | Home EN preexistente | `src/app/en/page.tsx` | no | reescribir |

### 1.2 Rutas legacy con redirect 301/307 (NO se traducen — quedan igual)

Ya están en `next.config.ts` redirigidas hacia rutas nuevas o home:

| Ruta ES | Destino | Acción i18n |
|---|---|---|
| `/servicios` → `/alquileres-a-corto-plazo` | 301 permanent | añadir redirect equivalente `/en/services → /en/short-term-rentals` |
| `/cursos` → `/recursos` | 301 permanent | añadir `/en/courses → /en/resources` |
| `/libros` → `/recursos` | 301 permanent | añadir `/en/books → /en/resources` |
| `/libros/:slug` → `/recursos` | 301 permanent | añadir `/en/books/:slug → /en/resources` |
| `/conferencias` → `/sobre-mi` | 301 permanent | añadir `/en/speaking → /en/about` |
| `/prensa` → `/sobre-mi` | 301 permanent | añadir `/en/press → /en/about` |
| `/en` → `/` | 307 temporary | **eliminar** este redirect cuando PR #3 se apruebe |
| `/en/:path*` → `/` | 307 temporary | **eliminar** este redirect cuando PR #3 se apruebe |
| `/en/tax-deed` → `/en/tax-deed-investing` | 301 permanent · defensivo | Añadir tras eliminar los 307. Cubre visitantes que infieran el slug desde ES. |

### 1.3 API routes (no requieren i18n de URL, sí de mensajes)

| Ruta | Acción i18n |
|---|---|
| `POST /api/leads` | Mismo endpoint. Añadir campo `locale` al schema zod para propagar el idioma del formulario al email interno. Sin nuevas rutas. |
| `POST /api/consent/log` | Igual. Ya acepta `page_url` que revela el idioma. |
| `POST /api/contact` | Stub deprecated. Sin cambios. |
| `POST /api/newsletter` | Fuera de scope PR #3 (no se toca). |

---

## 2 · Mapa completo ES ↔ EN de rutas

| # | ES | EN | Notas |
|---|---|---|---|
| 1 | `/` | `/en` | Homepage. `/en/page.tsx` ya existe, se reescribe con posicionamiento nuevo. |
| 2 | `/sobre-mi` | `/en/about` | About page. |
| 3 | `/alquileres-a-corto-plazo` | `/en/short-term-rentals` | STR service. |
| 4 | `/tax-deed` | `/en/tax-deed-investing` | **Cambiado tras revisión SEO.** Ver justificación en `i18n/BLOG-SLUGS.md`. Añade "investing" para filtrar la audiencia correcta y refuerza el clúster semántico con el post `florida-tax-deed-investing-beginners-guide`. Redirect defensivo `/en/tax-deed → /en/tax-deed-investing` (301). |
| 5 | `/casos-de-exito` | `/en/case-studies` | Case studies. |
| 6 | `/recursos` | `/en/resources` | Resources hub. |
| 7 | `/recursos/guia-5-rutas` | `/en/resources/5-wealth-paths-guide` | Sub-recurso. |
| 8 | `/blog` | `/en/blog` | Blog landing. |
| 9 | `/blog/[slug]` | `/en/blog/[slug]` | Ver §9 sobre slugs traducidos. |
| 10 | `/contacto` | `/en/contact` | Contact + form. |
| 11 | `/politica-de-privacidad` | `/en/privacy-policy` | Legal. |
| 12 | `/politica-de-cookies` | `/en/cookie-policy` | Legal. |
| 13 | `/terminos-de-uso` | `/en/terms-of-use` | Legal. |

---

## 3 · Contenido faltante que necesitas aprobar/proporcionar

### 3.1 Copy — proporcionado en §7 de este documento

Lo redacto yo dentro del plan como propuesta para tu aprobación línea por línea.

### 3.2 Contenido tuyo que aún no tengo (no bloquea el PR)

| Item | Impacto si falta |
|---|---|
| Fotos con captions bilingües de la homepage | Usa `alt` traducido genérico basado en el existente |
| Traducciones legales revisadas por abogado FL | Se mantiene el banner "Provisional draft pending legal review" |
| Casos verificables adicionales | Solo el caso existente (3× ingresos) se traduce |
| Blog posts EN (20) | **Bloquea el merge.** Los 20 posts deben tener versión completa EN (título, cuerpo, excerpt, meta, OG, canonical, hreflang) antes de activar el flag. Aprobación por lotes de 3 posts por bloque de copy (Bloques 5+). |

---

## 4 · Riesgos

| # | Riesgo | Severidad | Mitigación |
|---|---|---|---|
| R1 | Duplicación masiva de código (páginas EN espejo de ES) puede desincronizarse | Media | Extraer contenido a módulos `content/es/*.ts` y `content/en/*.ts` para que la página sea shell + import de contenido. Ver §5. |
| R2 | ContactForm inyecta `interest`, `location`, etc. como enums en zod → todo texto de opciones debe estar traducido y coincidir con el schema | Alta | Los enum values quedan fijos (identificadores técnicos). Labels visibles se traducen. Schema no cambia. |
| R3 | Blog posts individuales sin traducir → 404s si alguien accede desde SEO | Media | `/en/blog` muestra solo posts marcados `has_en: true`. Los sin traducir no aparecen listados y sus URLs `/en/blog/[slug-es]` responden 404 explícito. |
| R4 | hreflang mal configurado → penalización SEO | Media | Componente `<LocaleAlternates>` server-side que genera `<link rel="alternate" hreflang>` automático desde un mapa central. Tests de sitemap validan pares. |
| R5 | Cookie de idioma persiste elección → conflicto con visitantes multilingües en la misma computadora | Baja | Cookie es hint, no obligatoria. Selector siempre visible en Navbar y Footer. |
| R6 | Meta emails de notificación siempre en ES aunque el lead venga de formulario EN → confuso para Ana | Media | Añadir header `[EN]` o `[ES]` visible en subject y body del email interno con el `locale`. |
| R7 | Duplicación de rutas puede afectar rendimiento de build | Baja | Se estima +10-15s en `next build`. Aceptable. |
| R8 | Sitemap crece de ~35 URLs a ~70 con las EN | Baja | Positivo para SEO. Sin problema técnico. |
| R9 | Los redirects legacy en `/en/services`, `/en/courses`, etc. añaden ruido | Baja | Se documentan explícitamente en `next.config.ts` con comentario. |
| R10 | Regresión del pipeline de leads / consent probado en PR #2 | Alta | Cero cambios en `save.ts`, `sendLeadNotification`, endpoint `/api/leads`, `/api/consent/log`. Solo se añade `locale` opcional al schema. Se re-corren los 11 tests existentes y se añaden 3-5 nuevos para EN. |

---

## 5 · Arquitectura técnica

### 5.1 Estructura de rutas

**Decisión:** rutas paralelas `/en/*` como espejo de `/*`, NO middleware con `[locale]` segments.

**Justificación:**
- Cero riesgo sobre pipeline de leads/consent ya validado
- Cero movimiento de archivos existentes → no rompe SEO ni analítica
- Compatible con `/en/page.tsx` que ya existe
- Explicito y auditable

**Estructura resultante:**
```
src/app/
  page.tsx                             ES home
  sobre-mi/page.tsx                    ES
  alquileres-a-corto-plazo/page.tsx    ES
  tax-deed/page.tsx                    ES
  casos-de-exito/page.tsx              ES
  recursos/page.tsx                    ES
  blog/page.tsx                        ES
  blog/[slug]/page.tsx                 ES
  contacto/page.tsx                    ES
  politica-de-privacidad/page.tsx      ES
  politica-de-cookies/page.tsx         ES
  terminos-de-uso/page.tsx             ES

  en/
    page.tsx                           EN home (existe, reescribir)
    about/page.tsx                     EN
    short-term-rentals/page.tsx        EN
    tax-deed-investing/page.tsx        EN (renombrado tras revisión SEO — ver BLOG-SLUGS.md)
    case-studies/page.tsx              EN
    resources/page.tsx                 EN
    resources/5-wealth-paths-guide/page.tsx  EN
    blog/page.tsx                      EN (landing)
    blog/[slug]/page.tsx               EN
    contact/page.tsx                   EN
    privacy-policy/page.tsx            EN
    cookie-policy/page.tsx             EN
    terms-of-use/page.tsx              EN
```

### 5.2 Extracción de contenido a módulos

Para evitar desincronización ES/EN, cada página que hoy tiene texto hardcodeado se refactoriza en:

```
src/content/
  home/es.ts      home/en.ts
  about/es.ts     about/en.ts
  str/es.ts       str/en.ts
  ...
```

La página en `src/app/sobre-mi/page.tsx` importa `import { about } from "@/content/about/es"` y consume la data. La página `src/app/en/about/page.tsx` importa `en` en su lugar. **Estructura de datos idéntica en ambos idiomas** garantiza sincronización.

### 5.3 Locale detector + selector

**Componente cliente `<LocaleSwitcher>`:**
- Lee `pathname` con `usePathname()`
- Deriva `currentLocale` (`es` si NO empieza con `/en`, `en` en caso contrario)
- Deriva `equivalentPath` usando el mapa `LOCALE_ROUTE_MAP` (ver §5.4)
- Renderiza link a la ruta equivalente en el otro idioma
- Al click: escribe cookie `amc_lang=<locale>` con TTL 12 meses (hint para futuras visitas)

**Componente `<LanguageAwareLink>`:**
- Reemplaza `<Link>` genérico en Navbar y Footer
- Recibe `href` en ES y, si el usuario está en `/en/*`, mapea al equivalente EN via `LOCALE_ROUTE_MAP`

**Auto-detección primera visita:**
- Server-side, en `src/app/page.tsx` (home ES): NO redirigir por Accept-Language (rompe SEO). Sí mostrar un discreto banner: "This site is also available in English → [switch]" que aparece si Accept-Language empieza con `en-*` Y no hay cookie `amc_lang`. El banner es cerrable y persiste su cierre en cookie.

### 5.4 Mapa central de rutas

```ts
// src/lib/i18n/routes.ts
export const LOCALE_ROUTE_MAP = {
  "/": "/en",
  "/sobre-mi": "/en/about",
  "/alquileres-a-corto-plazo": "/en/short-term-rentals",
  "/tax-deed": "/en/tax-deed-investing",
  "/casos-de-exito": "/en/case-studies",
  "/recursos": "/en/resources",
  "/recursos/guia-5-rutas": "/en/resources/5-wealth-paths-guide",
  "/blog": "/en/blog",
  "/contacto": "/en/contact",
  "/politica-de-privacidad": "/en/privacy-policy",
  "/politica-de-cookies": "/en/cookie-policy",
  "/terminos-de-uso": "/en/terms-of-use",
} as const;

export const REVERSE_LOCALE_ROUTE_MAP = Object.fromEntries(
  Object.entries(LOCALE_ROUTE_MAP).map(([es, en]) => [en, es])
);
```

Blog posts individuales usan slug lookup:
```ts
// getEquivalentBlogSlug(esSlug) → enSlug | null
// getEquivalentBlogSlug(enSlug, "en" → "es") → esSlug | null
```

### 5.5 Metadata + hreflang + Open Graph + schema.org

**Helper server-side `buildLocalizedMetadata()`:**

```ts
// src/lib/i18n/metadata.ts
export function buildLocalizedMetadata({
  locale,     // "es" | "en"
  path,       // "/sobre-mi" o "/en/about"
  title,
  description,
  image = "/images/og-image.jpg",
}): Metadata
```

Retorna:
- `title`, `description` en el idioma correspondiente
- `alternates.canonical` = URL absoluta del propio path
- `alternates.languages` = mapa `{ es: <es-url>, en: <en-url>, "x-default": <es-url> }`
- `openGraph.locale` = `es_US` o `en_US`
- `openGraph.alternateLocale` = el otro
- Referencia a las 2 URLs completas

**Schema.org por página:**
- Añadir `inLanguage: "es-US"` o `"en-US"` al `WebPage`
- `BreadcrumbList` con nombres en el idioma correspondiente
- Person y Organization se conservan (son idioma-neutros salvo `description`)

**hreflang en el `<head>` (además de metadata alternates):**
- Next 16 emite automáticamente los `<link rel="alternate" hreflang>` desde `alternates.languages`. Verificado en la doc oficial. Sin necesidad de componente custom.

### 5.6 Sitemap bilingüe

`src/app/sitemap.ts` retorna las 13 URLs ES + 13 URLs EN + posts. Cada entry con `alternates.languages`:

```ts
{
  url: `${base}/sobre-mi`,
  lastModified: now,
  changeFrequency: "monthly",
  priority: 0.9,
  alternates: {
    languages: {
      es: `${base}/sobre-mi`,
      en: `${base}/en/about`,
    }
  }
}
```

Next 16 emite el sitemap.xml con los tags `<xhtml:link rel="alternate">` correctos.

### 5.7 ContactForm bilingüe

**Reutiliza el pipeline al 100%:**
- Mismo `POST /api/leads`
- Mismo Supabase, mismas tablas, mismos triggers
- Mismo `saveLead()`, mismo `sendLeadNotification()`
- Misma validación zod (los `enum` values quedan idénticos)
- Mismo rate limit, honeypot, timing check, dedup, RLS

**Cambios necesarios:**
- Nuevo prop `locale: "es" | "en"` en el componente
- Labels, placeholders, mensajes de error traducidos según prop
- Opciones de dropdowns (`propertyType`, `platform`, `interest`, etc.) mantienen `value` técnico en español (para no romper Supabase / HubSpot futuro) pero muestran `label` en el idioma correspondiente
- El payload al backend añade `locale: "en" | "es"` (nuevo campo opcional en el schema)
- El email de notificación interna lleva `[EN]` o `[ES]` en el subject

**Impacto en schema Supabase:** ninguno. `payload jsonb` acepta el nuevo campo sin migración.

### 5.8 Consent banner + cookies bilingüe

`ConsentBanner`, `ConsentModal`, `ConsentPreferencesLink` reciben las cadenas traducidas via prop `locale`. Detección: `usePathname().startsWith("/en") ? "en" : "es"`.

Cookie `amc_consent` no cambia (guarda el consent, no el idioma).

### 5.9 Notificación de email interno enriquecida

`src/lib/email/send-lead-emails.ts` recibe `locale` en `payload` y añade al email:

- Subject: `[Lead · EN] Short-Term Rental Strategy — <name>` (o `[Lead · ES] ...`)
- Cuerpo del email: nueva fila `Idioma / Language: EN` o `ES`
- Nueva fila `Página de origen / Source page: /en/short-term-rentals` (ya se tenía `landing_url` en el payload, ahora se destaca)
- Fila `Interés / Interest`, `Datos del lead / Lead data` ya existen

Sin PII adicional. Sin cambios en `hashEmail`, `hashIp`, `summarizeUserAgent`.

### 5.10 Accesibilidad

- `<html lang="es">` cambia dinámicamente a `lang="en"` en páginas `/en/*` via `layout.tsx` local a `/en/`
- Selector con `aria-label="Cambiar idioma / Change language"`
- Enfoque teclado preservado al cambiar idioma
- Contraste ya validado en P1 (mismo diseño)

### 5.11 Estructura de archivos nueva vs modificada

**Nuevos** (~35 archivos):
```
i18n/PLAN.md                                                (este archivo)
src/content/home/{es,en}.ts
src/content/about/{es,en}.ts
src/content/str/{es,en}.ts
src/content/tax-deed/{es,en}.ts
src/content/case-studies/{es,en}.ts
src/content/resources/{es,en}.ts
src/content/contact/{es,en}.ts
src/content/blog-landing/{es,en}.ts
src/content/legal/{es,en}.ts
src/content/nav/{es,en}.ts
src/content/consent/{es,en}.ts
src/content/forms/{es,en}.ts
src/lib/i18n/routes.ts
src/lib/i18n/metadata.ts
src/lib/i18n/detect.ts
src/components/i18n/LocaleSwitcher.tsx
src/components/i18n/LanguageAwareLink.tsx
src/components/i18n/BilingualSuggestionBanner.tsx
src/app/en/about/page.tsx
src/app/en/short-term-rentals/page.tsx
src/app/en/tax-deed/page.tsx
src/app/en/case-studies/page.tsx
src/app/en/resources/page.tsx
src/app/en/resources/5-wealth-paths-guide/page.tsx
src/app/en/blog/page.tsx
src/app/en/blog/[slug]/page.tsx
src/app/en/contact/page.tsx
src/app/en/privacy-policy/page.tsx
src/app/en/cookie-policy/page.tsx
src/app/en/terms-of-use/page.tsx
src/app/en/layout.tsx                                        (lang="en" wrapper)
tests/i18n-routes.test.ts
tests/i18n-metadata.test.ts
tests/localeSwitcher.test.ts
```

**Modificados** (~15 archivos):
```
next.config.ts                          (elimina redirect /en, añade redirects legacy EN)
src/app/sitemap.ts                      (bilingüe + alternates)
src/app/layout.tsx                      (lang dinámico? o mantener es y overridear en /en/layout)
src/components/ui/Navbar.tsx            (LocaleSwitcher + LanguageAwareLink)
src/components/ui/Footer.tsx            (restaurar fila EN/ES con LocaleSwitcher)
src/components/ui/ContactForm.tsx       (prop locale, traducciones)
src/components/consent/ConsentBanner.tsx (prop locale)
src/components/consent/LegalDraftBanner.tsx (traducir)
src/components/consent/ConsentPreferencesLink.tsx (traducir label)
src/lib/leads/schema.ts                 (añade locale opcional)
src/lib/leads/save.ts                   (propaga locale en payload)
src/lib/email/send-lead-emails.ts       (subject + fila locale + página origen)
src/app/api/leads/route.ts              (sin cambios materiales, valida locale)
src/components/sections/HeroSection.tsx (extrae texto a content/home/es.ts)
src/app/page.tsx                        (usa content/home/es.ts)
```

**NO se tocan** (garantía anti-regresión):
- `src/lib/supabase-server.ts`
- `src/lib/hash.ts`
- `src/lib/log.ts`
- `src/lib/rate-limit.ts`
- Migraciones SQL
- `src/lib/consent/{types,cookie-store,guards}.ts`
- `src/app/api/consent/log/route.ts`
- Tests existentes de `saveLead` y `sendLeadEmails` siguen pasando sin cambios

---

## 6 · Estrategia de rollout

### 6.1 Filosofía: "cero bilingüe parcial en producción"

Por instrucción explícita de Ana: el selector EN solo se activa cuando **todas** las páginas públicas ES tienen su equivalente EN completo y verificado, incluyendo los 20 blog posts. No hay excepciones, ni placeholders, ni "coming soon".

Durante toda F2–F7:
- `NEXT_PUBLIC_I18N_ENABLED=false` en Preview y Production
- `next.config.ts` mantiene el redirect `/en/:path* → /` como respaldo (el flag ya bloquea el selector visual)
- Un test de smoke verifica que ninguna ruta EN es alcanzable con flag OFF
- El código EN se acumula en el repo sin exposición pública

Cuando la matriz de paridad (`i18n/F8-EXIT-CRITERIA.md`) esté completa con **cero** ❌:
- Se activa `NEXT_PUBLIC_I18N_ENABLED=true` primero en Preview para verificación integral
- Ana ejecuta las pruebas integrales en Preview
- Con OK explícito, se elimina el redirect `/en → /` en `next.config.ts`
- Se activa el flag en Production y se mergea PR #3

### 6.2 Fases dentro del PR #3 (revisadas)

| Fase | Alcance | Requiere aprobación tuya antes de continuar |
|---|---|---|
| **F1** | Este documento + tabla slugs + Bloque 1 copy + criterios F8 | Empezar F2 |
| **F2** | Andamio técnico: `content/*`, `lib/i18n/*`, feature flag OFF, tests unitarios básicos. Cero páginas EN. | Aprobar Bloque 2 copy antes de F3 |
| **F3** | Páginas EN: about, short-term-rentals, tax-deed (Bloque 2 aprobado) | Aprobar Bloque 3 copy antes de F4 |
| **F4** | Páginas EN: case-studies, resources, contact, blog landing (Bloque 3 aprobado) | Aprobar Bloque 4 copy antes de F5 |
| **F5** | Páginas EN legales: privacy-policy, cookie-policy, terms-of-use (Bloque 4 aprobado) | Aprobar primer sub-bloque de posts (3 posts) antes de F6 |
| **F6** | Navbar + Footer + LocaleSwitcher + BilingualSuggestionBanner + ContactForm bilingüe + Consent bilingüe | Aprobar sub-bloques restantes de posts en paralelo |
| **F7-blog** | **Todos los 20 blog posts** EN con contenido completo (traducción, meta, canonical, hreflang, alt). Se ejecuta en paralelo a F6-F7 técnico. Cada sub-bloque de 3 posts requiere aprobación tuya. | Continuar solo con posts aprobados |
| **F7-tech** | Sitemap bilingüe + metadata + schema.org + hreflang + tests i18n + matriz de paridad | Empezar F8 |
| **F8** | Activación del flag en Preview + pruebas integrales bilingües + aprobación tuya para producción | Merge final |

### 6.3 Cada fase = commits atómicos

Cada fase produce uno o varios commits atómicos con prefijo `feat(i18n-fN):`. Estimación revisada: **~25-35 commits** en total (crece por los 20 posts que van en sub-bloques). PR se abre en draft desde F2 y se marca ready al final de F7-tech (después de F7-blog).

---

## 7 · Copy completo para aprobación

Todos los textos siguientes son **borradores en inglés preservando el tono premium/profesional del sitio actual**. Traducción cultural, no literal. Cada bloque etiquetado con su archivo destino en `src/content/*/en.ts`.

### 7.1 Navigation (`src/content/nav/en.ts`)

```
nav.home           = "Home"
nav.about          = "About Ana"
nav.str            = "Short-Term Rentals"
nav.taxDeed        = "Tax Deed"
nav.caseStudies    = "Case Studies"
nav.resources      = "Resources"
nav.blog           = "Blog"
nav.contact        = "Contact"
nav.ctaWorkWithMe  = "Work With Me"
descriptor         = "STR & Tax Deed Strategist"
langSwitcher.es    = "Español"
langSwitcher.en    = "English"
langSwitcher.aria  = "Change language"
```

### 7.2 Footer (`src/content/footer/en.ts`)

```
footer.newsletter.eyebrow  = "Free Newsletter"
footer.newsletter.headline = "Investment strategies I don't share on social media."
footer.nav.title           = "Navigation"
footer.contact.title       = "Contact"
footer.contact.email       = "Email"
footer.contact.whatsapp    = "WhatsApp"
footer.legal.privacy       = "Privacy Policy"
footer.legal.cookies       = "Cookie Policy"
footer.legal.terms         = "Terms of Use"
footer.legal.preferences   = "Cookie preferences"
footer.copyright           = "© {year} {name} · The Host Circle · All rights reserved."
```

### 7.3 Home — Hero, ValueProp, Pillars, Method, WaysToWork, CTA (`src/content/home/en.ts`)

**Hero**
```
hero.badge     = "AnaMaría Morrison · Real Estate Investor & Strategist"
hero.title     = "Acquire properties strategically and turn them into"
hero.titleGold = "profitable assets."
hero.subtitle  = "I help you spot Tax Deed opportunities, transform properties and monetize them through short-term rentals with strategy, systems and professional operations."
hero.ctaPrimary   = "Explore how to work with me"
hero.ctaSecondary = "Learn about my experience"
hero.credentials  = "9+ years of experience · Operations in 4 countries · Multi-million real estate portfolio · Specialized training in Tax Deed property analysis"
```

**ValueProp**
```
value.eyebrow = "My Approach"
value.title.a = "It's not just about"
value.titleAccent1 = "buying"
value.title.b = "a property."
value.title.c = "It's about buying correctly and knowing how to"
value.titleAccent2 = "monetize it."
value.body    = "Many people acquire properties without analyzing the variables that determine whether the asset will actually be profitable:"
value.risks   = ["Title risks", "Physical condition", "Rehabilitation costs", "Local regulations", "Market demand", "Monetization strategy", "Ongoing operations"]
value.closing = "My approach connects acquisition analysis with the asset's profitability strategy."
```

**Pillars**
```
pillars.eyebrow = "Two Pillars · One Real Estate Ecosystem"
pillars.title.a = "Strategic acquisition and"
pillars.titleAccent = "professional operation"
pillars.subtitle = "Everything I do connects to two complementary disciplines: buying correctly and operating with excellence."

pillars.p1.tag       = "Pillar 01 · For Investors"
pillars.p1.title     = "Tax Deed & Acquisition Intelligence"
pillars.p1.desc      = "Research, analysis and strategy to acquire properties below market value through county auctions."
pillars.p1.items     = [
  "Opportunity research",
  "Title filtering",
  "Preliminary analysis",
  "Risk identification",
  "Acquisition strategy",
  "Education for investors",
  "Exit strategy evaluation",
]
pillars.p1.cta       = "Explore Tax Deed"

pillars.p2.tag       = "Pillar 02 · For Property Owners"
pillars.p2.title     = "Short-Term Rental Strategy"
pillars.p2.desc      = "Diagnosis, transformation, launch, and professional operation of your property as a short-term rental asset."
pillars.p2.items     = [
  "Viability analysis",
  "Asset strategy",
  "Design and preparation",
  "Platform launch",
  "Listing optimization",
  "Automation",
  "Revenue management",
  "Professional management",
]
pillars.p2.cta       = "Explore short-term rentals"
```

**Method — Adquirir, Transformar y Rentabilizar™**
```
method.eyebrow  = "Proprietary Method"
method.title.a  = "The"
method.titleAccent = "Acquire, Transform & Monetize"
method.title.tm = "™"
method.title.b  = "Method"
method.subtitle = "A six-stage process that turns a real estate opportunity into a profitable, operable asset."

method.stages = [
  { n: "01", title: "Analyze",   desc: "Study market, title, risks, regulations and demand before deploying capital." },
  { n: "02", title: "Acquire",   desc: "Buy correctly via Tax Deed auction, direct acquisition or alternative models." },
  { n: "03", title: "Transform", desc: "Rehab, design and prepare the property to maximize perceived value and profitability." },
  { n: "04", title: "Launch",    desc: "List on platforms with an optimized listing, professional photography and strategic pricing." },
  { n: "05", title: "Automate",  desc: "Systems, AI and processes that sustain operations with minimal human load." },
  { n: "06", title: "Monetize",  desc: "Revenue management, continuous optimization and portfolio scaling." },
]
```

**Ways to Work With Me**
```
ways.eyebrow  = "Ways to Work With Me"
ways.title.a  = "Three clear paths based on"
ways.titleAccent = "your moment"

ways.a.audience  = "For investors"
ways.a.title     = "Tax Deed Intelligence"
ways.a.desc      = "Education, analysis and tools to identify opportunities and evaluate properties before participating in county auctions."
ways.a.cta       = "I want to explore Tax Deed"

ways.b.audience  = "For property owners"
ways.b.title     = "STR Strategy & Management"
ways.b.desc      = "Diagnosis, transformation, launch, automation and professional management of short-term rental properties."
ways.b.cta       = "I want to monetize my property"

ways.c.audience  = "For those who want to learn"
ways.c.title     = "The Host Circle"
ways.c.desc      = "Practical training to build and operate a professional short-term rental business."
ways.c.cta       = "Discover The Host Circle"
```

**Authority Section**
```
authority.eyebrow = "Verified Expertise"
authority.title.a = "Real experience in"
authority.titleAccent = "real estate investing and operations"
authority.pillars = [
  { value: "9+",       label: "Years of experience", detail: "in short-term rentals" },
  { value: "4",        label: "Countries",           detail: "US · MX · CO · VE" },
  { value: "3",        label: "Roles",               detail: "owner · operator · investor" },
  { value: "Tax Deed", label: "Specialized training", detail: "title and opportunity analysis" },
]
```

**CTA Final**
```
cta.eyebrow  = "Your Next Step"
cta.title.a  = "Do you own a property"
cta.title.b  = "or are you looking for your next"
cta.titleAccent = "investment opportunity?"
cta.subtitle = "Choose the path that matches your moment and let's talk."
cta.buttonSTR = "I want to monetize a property"
cta.buttonTaxDeed = "I want to explore Tax Deed"
```

### 7.4 About page (`src/content/about/en.ts`)

**Hero**
```
about.breadcrumb  = "About Ana"
about.badge       = "AnaMaría Morrison · Real Estate Investor & Strategist"
about.title.a     = "Real estate investor and strategist in"
about.titleAccent1 = "short-term rentals"
about.title.and   = "and"
about.titleAccent2 = "Tax Deed"
about.subtitle    = "9+ years transforming properties into profitable assets. Operations in 4 countries, multi-million real estate portfolio and specialized training in Tax Deed property analysis."
about.ctaPrimary  = "Work with me"
about.ctaSecondary = "See case studies"
```

**Origin story (bio)**
```
about.originEyebrow = "Origin Story"
about.originTitle.a = "From a first property to an"
about.originTitleAccent = "operating portfolio"
about.originBody = [
  "I bought my first property off-plan when I was 22. After receiving it in 2016, I initially operated it as a traditional long-term rental. In June 2017, already living in the United States, I transformed it into a short-term rental and started managing it remotely. That experience became the starting point of an international journey in hospitality, property management and real estate investing.",
  "Since 2023 I have managed operations in the United States, Mexico, Venezuela and Colombia. In 2025 I expanded my training in Tax Deed title and property analysis and founded The Host Circle to share systems, hands-on experience and profitability strategies for real estate.",
]
```

**Timeline** (same 7 milestones translated)
```
about.timelineEyebrow = "Professional Timeline"
about.timelineTitle   = "Timeline"
about.timeline = [
  { year: "2012–2013",  title: "First real estate investment",              desc: "Acquisition of my first property in Colombia off-plan, in pre-construction phase, at age 22." },
  { year: "2016",       title: "Property delivered",                        desc: "After roughly four years of construction, the property was delivered and initially used as a traditional long-term rental." },
  { year: "March 2017", title: "Move to the United States",                 desc: "Relocation to the US while the Colombia property continued operating under a traditional rental." },
  { year: "June 2017",  title: "Transition to short-term rental",           desc: "Conversion of the property to the STR model, managed remotely from the United States. Starting point of a professional path in hospitality and short-term rentals." },
  { year: "2023",       title: "International expansion of operations",     desc: "Simultaneous management of short-term rental properties in the US, Mexico and Venezuela, in addition to continued operation in Colombia." },
  { year: "2025",       title: "Specialized training in Tax Deed",          desc: "Specialized training in Tax Deed title and opportunity analysis with Marcos Jacobs, a Brazilian investor based in the United States and specialist in county auctions." },
  { year: "2025",       title: "The Host Circle founded",                   desc: "Creation of The Host Circle as an educational platform to train property owners, investors and operators in short-term rentals, hospitality and systems." },
]
```

**Expertise areas**
```
about.expertiseEyebrow = "Areas of Expertise"
about.expertiseTitle.a = "Technical"
about.expertiseTitleAccent = "specialties"
about.expertise = [
  { area: "Short-Term Rentals",       detail: "Strategy, design, operations and automation" },
  { area: "Professional Management",  detail: "Co-hosting, arbitrage and owner-operator models" },
  { area: "Tax Deed",                 detail: "Title analysis, filters and county opportunities" },
  { area: "Real Estate Acquisition",  detail: "Portfolio strategy and asset evaluation" },
  { area: "AI-Driven Automation",     detail: "Replicable systems for operating multiple properties" },
  { area: "Revenue Management",       detail: "Dynamic pricing and income optimization" },
]
```

**Philosophy**
```
about.philosophyEyebrow = "Investment Philosophy"
about.philosophyTitle.a = "How I"
about.philosophyTitleAccent = "think"
about.philosophyTitle.b = "about real estate"
about.philosophy = [
  { title: "Acquire with judgment",       text: "Buying correctly is just as important as knowing how to operate. Every property demands real prior analysis, not impulses." },
  { title: "Systems before effort",       text: "Sustainable profitability comes from processes, automation and standards — not from working more hours." },
  { title: "Data, not promises",          text: "Every investment decision must rest on verifiable numbers, not on optimism or storytelling." },
  { title: "Honest education",            text: "Talking about real risks, disclaimers and due diligence matters as much as talking about returns." },
]
```

**Markets + CTA final**
```
about.marketsEyebrow = "Markets with Operations or Experience"
about.markets        = ["United States", "Mexico", "Colombia", "Venezuela"]

about.ctaTitle.a     = "Shall we start working on your"
about.ctaTitleAccent = "next asset?"
about.ctaSubtitle    = "Choose the option that matches your moment and let's talk."
about.ctaButtonSTR   = "Monetize a property"
about.ctaButtonTaxDeed = "Explore Tax Deed"
```

### 7.5 Short-Term Rentals page (`src/content/str/en.ts`)

```
str.badge         = "For Property Owners · Short-Term Rental Strategy"
str.title.a       = "Turn your property into a"
str.titleAccent   = "profitable asset"
str.title.b       = "for short-term rental."
str.subtitle      = "Diagnosis, transformation, launch, automation and professional management of short-term rental properties — with strategy, systems and high-level operations."
str.ctaPrimary    = "I want to monetize my property"

str.benefitsTitle = "What you get when you work with me"
str.benefits = [
  "Higher potential profitability",
  "Reduced operational load",
  "Asset protection",
  "Better guest experience",
  "Professional and standardized operations",
  "Visibility and control through reporting",
  "AI-driven systems and automation",
]

str.processEyebrow = "How We Work Together"
str.processTitle.a = "From an idle property to an"
str.processTitleAccent = "operating asset"
str.processSteps = [
  { n: "01", t: "Viability analysis",      d: "Market, demand and local regulation review before investing in preparation." },
  { n: "02", t: "Asset strategy",          d: "Positioning, ideal guest, baseline pricing and channel strategy." },
  { n: "03", t: "Design and preparation",  d: "Furnishing, functional decoration, professional photography and differentiated experience." },
  { n: "04", t: "Platform launch",         d: "Optimized publication on Airbnb, Booking and other strategic channels." },
  { n: "05", t: "Listing optimization",    d: "Continuous improvement of title, description, photos, rules and automated messaging." },
  { n: "06", t: "Automation",              d: "AI and systems for messaging, codes, cleaning, maintenance and reviews." },
  { n: "07", t: "Revenue management",      d: "Dynamic pricing adjustments and seasonal strategies to maximize income." },
  { n: "08", t: "Professional management", d: "Full operations while the owner receives clear reports and real control." },
]

str.ctaTitle.a     = "Is your property ready to"
str.ctaTitleAccent = "produce"
str.ctaSubtitle    = "Tell me about your property and let's evaluate its potential together."
str.ctaButton      = "Request a diagnosis"
```

### 7.6 Tax Deed page (`src/content/tax-deed/en.ts`)

```
td.badge         = "For Investors · Tax Deed & Acquisition Intelligence"
td.title.a       = "Identify"
td.titleAccent   = "real estate opportunities"
td.title.b       = "before the auction."
td.subtitle      = "Education, analysis and tools for investors looking to acquire properties through county Tax Deed auctions with real due diligence."
td.ctaPrimary    = "I want to explore Tax Deed"

td.whatIsTitle.a = "What is a"
td.whatIsAccent  = "Tax Deed auction"
td.whatIsBody    = "It is a mechanism through which the county auctions the title of properties whose owners stopped paying taxes. The investor can acquire the property itself — not just the debt — by following the county's process."
td.whatIsNote    = "Difference vs. Tax Lien: with Tax Lien you buy the debt plus interest; with Tax Deed you buy the property directly. Exact rules vary by state and county."

td.filtersEyebrow  = "How I Help"
td.filtersTitle    = "Analysis filters"
td.filters = [
  "County-level opportunity research",
  "Preliminary filtering of available titles",
  "Identification of legal risks",
  "Physical condition analysis of the property",
  "Post-acquisition cost estimation",
  "Exit strategy evaluation",
  "Structured investor education",
]

td.risksEyebrow  = "Risks to consider"
td.risksTitle    = "Mandatory due diligence"
td.risks = [
  "Remaining liens or encumbrances on the title",
  "Unknown property condition until inspection",
  "Regulatory differences between states and counties",
  "Ownership and rehabilitation costs",
  "Variable legal timelines depending on the process",
]

td.disclaimerEyebrow = "Important Notice"
td.disclaimerBody = "The content of this page is exclusively educational. It does not constitute legal, financial or tax advice. Every investment involves risk and each investor must conduct their own due diligence. Rules and processes may vary by state and county. Prior results do not guarantee future results."

td.ctaTitle.a     = "Do you want to analyze"
td.ctaTitleAccent = "real"
td.ctaTitle.b     = "opportunities?"
td.ctaSubtitle    = "Request the curated county listing or schedule a strategy conversation."
td.ctaButton      = "Request information"
```

### 7.7 Case Studies page (`src/content/case-studies/en.ts`)

```
cases.badge     = "Case Studies"
cases.title.a   = "Real"
cases.titleAccent = "transformations"
cases.title.b   = "of properties."
cases.subtitle  = "Every case represents a strategic decision: analyze, acquire, transform, launch, automate, monetize. No unrealistic promises, only results with context."

cases.cases = [
  {
    type: "STR Transformation",
    market: "Colombia",
    highlight: "From traditional rental to short-term rental: 3× income",
    situation: "Ana's first property, initially operated under a traditional long-term rental model.",
    strategy: "Repositioning to the short-term rental model: design, professional listing and operations across STR platforms.",
    result: "The property's income tripled after transitioning from the traditional rental model to the STR model.",
    role: "Full strategy and operations",
  }
]

cases.placeholder.title = "More cases coming soon"
cases.placeholder.body  = "Additional cases in management, Tax Deed acquisition, income optimization and automation are in preparation."

cases.ctaTitle     = "Do you want your property to be the next case?"
cases.ctaButton    = "Let's talk"
```

### 7.8 Resources page (`src/content/resources/en.ts`)

```
resources.badge     = "Resources & Education"
resources.title.a   = "Content for"
resources.titleAccent = "better decisions"
resources.title.b   = "."
resources.subtitle  = "Guides, articles and tools focused exclusively on short-term rentals and Tax Deed."

resources.categories = [
  {
    title: "Short-Term Rentals",
    desc: "Guides, strategies and tools for property owners and operators.",
    cta: "Explore",
  },
  {
    title: "Tax Deed",
    desc: "Education on county auctions, analysis and due diligence.",
    cta: "Explore",
  },
  {
    title: "The Host Circle",
    desc: "Practical training to build and operate a professional STR business.",
    cta: "Explore",
  },
]

resources.ctaTitle  = "Explore the full blog"
resources.ctaButton = "See all resources"
```

### 7.9 Blog landing (`src/content/blog-landing/en.ts`)

**Corrección v2:** cero "Coming soon". La landing EN muestra los 20 posts traducidos igual que la ES. Si algún post aún no está aprobado durante F5-F7-blog, se filtra internamente y NO aparece en la landing hasta que su traducción esté aprobada — pero al activar el flag en F8, todos los 20 deben estar visibles.

```
blog.badge     = "Resources & Education"
blog.title.a   = "Real Estate"
blog.titleAccent = "Investment Blog"
blog.subtitle  = "Strategies, analysis and guides on short-term rentals and Tax Deed. Educational content, no unrealistic promises."

blog.filters = [
  { key: "all",       label: "All" },
  { key: "str",       label: "Short-Term Rentals" },
  { key: "tax-deed",  label: "Tax Deed" },
  { key: "archived",  label: "Archive" },
]

blog.emptyMessage = "No articles in this category yet."

blog.postCard.readTime = "min read"
blog.postCard.readMore = "Read →"
```

### 7.10 Contact page (`src/content/contact/en.ts`)

```
contact.breadcrumb = "Contact"
contact.badge      = "Work With Me"
contact.title.a    = "Tell me about your"
contact.titleAccent1 = "property"
contact.title.or   = "or your"
contact.titleAccent2 = "opportunity"
contact.title.b    = "."
contact.subtitle   = "Pick the option that best describes your moment. The form will adapt to what you actually need. I answer personally within 24 business hours."

contact.sidebar.directEyebrow = "Direct Contact"
contact.sidebar.email         = "Email"
contact.sidebar.whatsapp      = "WhatsApp"
contact.sidebar.whatsappBtn   = "Message me on WhatsApp"

contact.sidebar.areasEyebrow  = "Areas of Work"
contact.sidebar.areas = [
  "STR strategy and transformation",
  "Professional STR management",
  "Preparation and launch",
  "Tax Deed education",
  "Tax Deed opportunity analysis",
  "Interviews, podcasts and conferences",
]

contact.sidebar.responseTitle = "Response time"
contact.sidebar.responseBody  = "I answer every message within 24 hours on business days."
```

### 7.11 Contact form (`src/content/forms/en.ts`)

**Interest options (label EN, value stays technical)**
```
form.interestPickerTitle    = "How can I help you?"
form.interestPickerSubtitle = "Pick the option that best describes your moment and I'll show you the right form."

form.interests = [
  { key: "str-rentabilizar",       label: "I want to monetize a property",         desc: "I own a property and want to turn it into a short-term rental.", color: "gold" },
  { key: "str-administracion",     label: "I want STR management",                 desc: "I need professional management of my STR property.",              color: "gold" },
  { key: "str-preparacion",        label: "I want to prepare and launch a property", desc: "Design, furnishing, photos, listing and go-live.",              color: "gold" },
  { key: "tax-deed-aprender",      label: "I want to learn about Tax Deed",        desc: "Training and education on county auctions.",                      color: "blue" },
  { key: "tax-deed-oportunidades", label: "I want to analyze Tax Deed opportunities", desc: "Curated title listings by county.",                            color: "blue" },
  { key: "entrevista",             label: "Invite Ana to an interview or event",   desc: "Podcasts, media, keynotes or corporate events.",                  color: "gold" },
  { key: "otro",                   label: "Other",                                 desc: "Tell me what it is about.",                                       color: "gold" },
]

form.selectedFormBadge  = "Selected form"
form.changeSelection    = "Change"

form.fields.name              = "Name *"
form.fields.namePlaceholder   = "Your full name"
form.fields.email             = "Email *"
form.fields.emailPlaceholder  = "you@email.com"
form.fields.whatsapp          = "WhatsApp *"
form.fields.whatsappPlaceholder = "+1 (786) 000-0000"
form.fields.company           = "Media / Company"
form.fields.companyPlaceholder = "Podcast, media or company name"
form.fields.location          = "Property city"
form.fields.locationInvestor  = "City / State / County of interest"
form.fields.locationPlaceholderProperty = "e.g. Miami, FL"
form.fields.locationPlaceholderInvestor = "e.g. Miami-Dade, FL"
form.fields.propertyType      = "Property type"
form.fields.propertyTypeOptions = ["Apartment", "House", "Villa", "Loft", "Studio", "Other"]
form.fields.bedrooms          = "Bedrooms"
form.fields.bedroomsPlaceholder = "e.g. 2"
form.fields.platform          = "Currently listed?"
form.fields.platformOptions   = ["Airbnb", "Booking", "VRBO", "Expedia", "Other", "Not listed yet"]
form.fields.monthlyIncome     = "Approximate monthly income"
form.fields.monthlyIncomePlaceholder = "Optional · USD"
form.fields.startDate         = "Estimated start date"
form.fields.startDatePlaceholder = "e.g. in 1 month, next 3 months, now"

form.fields.experience        = "Prior experience"
form.fields.experienceOptions = ["None", "Less than 1 year", "1–3 years", "3+ years"]
form.fields.capital           = "Capital allocated (segmentation, not exclusion)"
form.fields.capitalOptions    = ["Under $10,000", "$10,000–$50,000", "$50,000–$150,000", "$150,000–$500,000", "Over $500,000", "Prefer not to say"]
form.fields.timeframe         = "Estimated timeline to invest"
form.fields.timeframePlaceholder = "e.g. in 30 days, 3 months, exploring"

form.fields.eventType         = "Event type"
form.fields.eventTypePlaceholder = "Podcast, event, keynote, etc."
form.fields.eventDate         = "Estimated date"
form.fields.eventDatePlaceholder = "Optional"

form.fields.message           = "Message *"
form.fields.messagePlaceholderProperty = "Tell me about your property, your goal and any relevant details."
form.fields.messagePlaceholderInvestor = "Tell me what you're looking for: learning, filtering specific opportunities, etc."
form.fields.messagePlaceholderInterview = "Tell me about the format, audience, date and topics you'd like to cover."
form.fields.messagePlaceholderOther = "Tell me how I can help."

form.consent = "I agree that AnaMaría Morrison may contact me by email, WhatsApp or phone regarding this inquiry. No spam, ever."

form.submit         = "Send Message"
form.submitLoading  = "Sending..."

form.errors.rateLimit    = "Too many requests. Please try again in a minute."
form.errors.invalidInput = "Please review the form: one or more fields are invalid."
form.errors.generic      = "Something went wrong. Please try again in a few minutes."
form.errors.network      = "Connection error. Please check your internet."

form.success.title = "Message received!"
form.success.body  = "I'll get back to you within 24 business hours. Meanwhile, follow me on Instagram for more content."
form.success.reset = "Send another message"
```

### 7.12 Consent banner + modal (`src/content/consent/en.ts`)

```
consent.banner.title        = "We use cookies"
consent.banner.body         = "Necessary cookies to operate the site, and optional ones for analytics and marketing. You can accept all, reject non-essential, or configure your preferences."
consent.banner.viewPolicy   = "View policy"
consent.banner.acceptAll    = "Accept all"
consent.banner.reject       = "Reject"
consent.banner.configure    = "Configure"

consent.modal.title         = "Cookie preferences"
consent.modal.subtitle      = "Choose which categories to allow. Necessary cookies cannot be disabled."

consent.categories.necessary.title = "Necessary"
consent.categories.necessary.desc  = "Essential cookies for consent, session and security. Always active."
consent.categories.necessary.badge = "(always active)"

consent.categories.analytics.title = "Analytics"
consent.categories.analytics.desc  = "Anonymous measurement of site usage to improve content and navigation."

consent.categories.marketing.title = "Marketing"
consent.categories.marketing.desc  = "Personalization of messages and audiences for advertising campaigns."

consent.modal.save          = "Save preferences"
consent.modal.acceptAll     = "Accept all"
consent.modal.withdraw      = "Withdraw consent"
consent.modal.closeAria     = "Close"

consent.preferencesLink     = "Cookie preferences"

consent.legalDraftBadge     = "Provisional draft"
consent.legalDraftBody      = "This document is a provisional draft pending legal review by an attorney licensed in Florida. It should not be interpreted as legal advice or as a professionally reviewed document."
```

### 7.13 Legal pages (`src/content/legal/en.ts`)

**Privacy Policy — full text**

```
legal.privacy.title = "Privacy Policy"
legal.privacy.lastUpdated = "Last updated:"
legal.privacy.version     = "Version:"

legal.privacy.sections = [
  {
    heading: "1. Data controller",
    body: "The site anamorrison.com is operated by AnaMaría Morrison. For inquiries related to this policy: {email}.",
  },
  {
    heading: "2. Data we collect",
    body: [
      "Data you provide: name, email, WhatsApp, property city, property type, capital allocation (range), free-form message, and other fields from the contact form or resource download.",
      "Technical data: device, operating system, browser (summarized, no fingerprint), pages visited, referrer, UTM parameters.",
      "Consent data: cookie preferences with timestamp and an irreversible hash of the IP.",
    ],
  },
  {
    heading: "3. Purpose and legal basis",
    body: [
      "Explicit consent for sending communications and educational content.",
      "Execution of prior request (responding to your form).",
      "Legitimate interest to operate the site, prevent fraud and improve services.",
      "Compliance with applicable legal obligations.",
    ],
  },
  {
    heading: "4. Who we share data with",
    body: [
      "We work with technology providers acting as data processors: Vercel (hosting), Supabase (operational database), Resend (transactional email), Google Analytics 4 (usage analytics, only if you accept analytics cookies).",
      "We do not sell personal data to third parties.",
    ],
  },
  {
    heading: "5. International transfers",
    body: "Some providers process data in the United States. Each provider's standard contractual safeguards apply.",
  },
  {
    heading: "6. Retention (provisional, pending legal review)",
    body: [
      "Leads without active commercial relationship: provisional maximum of 24 months from last activity; then anonymization.",
      "Leads with active commercial relationship: no automatic cutoff while active.",
      "Clients and transactions: per applicable contractual, accounting and tax requirements.",
      "Consent records: minimum necessary evidence; period subject to legal review.",
      "These periods are provisional and subject to review by an attorney licensed in Florida.",
    ],
  },
  {
    heading: "7. Your rights",
    body: "You may request at any time: access, rectification, opposition, erasure, portability and consent withdrawal. Requests to {email}. Response within a maximum of 30 calendar days.",
  },
  {
    heading: "8. Cookies",
    body: "See the Cookie Policy. You can change your preferences at any time from: {cookiePreferencesLink}.",
  },
  {
    heading: "9. Minors",
    body: "The site is not directed at minors under 18. If you detect that a minor has provided data, please contact us to delete it.",
  },
  {
    heading: "10. Changes to this policy",
    body: "We will publish changes on this same page with an updated date and version. Material changes will be notified by email to active subscribers and will require re-accepting the current consent.",
  },
  {
    heading: "11. Governing law",
    body: "See Terms of Use. Provisional jurisdiction: State of Florida, United States.",
  },
]
```

**Cookie Policy — full text**

```
legal.cookies.title = "Cookie Policy"
legal.cookies.version = "Version:"

legal.cookies.sections = [
  {
    heading: "1. What cookies are",
    body: "Small files stored in your browser to remember preferences, measure site usage and offer essential functionality.",
  },
  {
    heading: "2. Categories we use",
    subsections: [
      {
        title: "Necessary (always active)",
        body: "Essential for consent, session and security. Cannot be disabled because the site does not work without them.",
        details: "amc_consent · stores your cookie preferences (12 months) | amc_session · anonymous session ID (30 days)",
      },
      {
        title: "Analytics (optional)",
        body: "Anonymous measurement of site usage to improve content and navigation. Only loaded if you accept.",
        details: "_ga* · Google Analytics 4 (up to 2 years, with anonymized IP)",
      },
      {
        title: "Marketing (optional)",
        body: "Personalization of messages and audiences for advertising campaigns. Currently no marketing providers are loaded on the site.",
      },
    ],
  },
  {
    heading: "3. Managing your consent",
    body: "On your first visit you see a banner with options: Accept all · Reject · Configure preferences. You can change your decision at any time from this link: {preferencesLink}.",
  },
  {
    heading: "4. Withdrawing consent",
    body: [
      "You can withdraw your consent at any time from the preferences modal. Withdrawal:",
      "Immediately stops sending events to analytics or marketing.",
      "Removes already-set third-party cookies when technically possible.",
      "Is recorded as evidence with timestamp and IP hash.",
    ],
  },
  {
    heading: "5. Effect of rejecting",
    body: "Rejecting analytics or marketing cookies does not affect site functionality. Rejecting necessary cookies is not possible without breaking basic consent functions.",
  },
  {
    heading: "6. Third-party trackers",
    body: "When you accept the analytics category, Google Analytics 4 may use its own cookies subject to its privacy policy.",
  },
]
```

**Terms of Use — full text**

```
legal.terms.title = "Terms of Use"
legal.terms.lastUpdated = "Last updated:"

legal.terms.sections = [
  {
    heading: "1. Acceptance",
    body: "Use of the site implies acceptance of these terms.",
  },
  {
    heading: "2. Permitted use",
    body: "The site's content is educational and informational in nature. You may use it for your personal decision-making on a non-commercial basis.",
  },
  {
    heading: "3. Intellectual property",
    body: "All content (text, images, \"The Host Circle\" brand, downloadable materials) is the property of AnaMaría Morrison or their respective authors and is protected by copyright. You may not copy, redistribute, resell or create derivative works without express written authorization.",
  },
  {
    heading: "4. Nature of the content",
    body: "The site provides educational content, not individualized professional advice.",
  },
  {
    heading: "5. Results disclaimer",
    body: "The content of this site is educational and informational in nature. It does not guarantee economic, commercial, legal, tax or investment results. Prior results do not predict future results. Every decision must be based on your own due diligence and, where applicable, on independent professional advice.",
  },
  {
    heading: "6. Tax Deed specific disclaimer",
    body: "Content related to Tax Deed is exclusively educational. It does not constitute legal, financial or tax advice. Tax Deed auctions are regulated by the law of the applicable state and county, and their rules may vary significantly. Every Tax Deed investment involves risks, including legal, title, physical condition, occupancy and market risks. Before participating in an auction you must conduct independent due diligence and, where appropriate, consult with a real estate attorney licensed in the applicable state. AnaMaría Morrison does not provide legal, tax or fiduciary services.",
  },
  {
    heading: "7. Limitation of liability",
    body: "To the maximum extent permitted by applicable law, AnaMaría Morrison will not be liable for decisions made based on the site's content.",
  },
  {
    heading: "8. Third-party links",
    body: "We do not control or endorse content on linked external sites.",
  },
  {
    heading: "9. Modifications",
    body: "We may update these terms. Continued use implies acceptance.",
  },
  {
    heading: "10. Governing law and jurisdiction",
    body: "Provisionally, these terms are governed by the laws of the State of Florida, United States, without regard to its conflict of laws principles. Any dispute related to the use of the site shall be submitted provisionally to the competent courts of the State of Florida, subject to legal review.",
    footnote: "Internal note: provisional jurisdiction. Pending confirmation by attorney licensed in Florida.",
  },
]
```

### 7.14 Email notification enhancement (`src/lib/email/send-lead-emails.ts` changes)

Subject template:
```
[Lead · EN] {interestLabel} — {name}
[Lead · ES] {interestLabel} — {name}
```

Body rows (bilingual labels):
```
| Language / Idioma | English |
| Source page / Página de origen | https://anamorrison.com/en/short-term-rentals |
| Interest / Interés | STR — I want to monetize a property |
```

The rest of the email HTML stays as is (already contains `escape()` for all values).

### 7.15 Blog posts (dentro del scope de PR #3, NO diferido)

**20 posts existentes** (corrección: el count 21 anterior incluía el `slug: string` del type definition).

**Los 20 posts EN se entregan como parte del scope de este PR.** Sin ellos, el flag no se activa.

**Mapa de slugs EN naturales aprobado en `i18n/BLOG-SLUGS.md`.** No se reutiliza el slug ES por defecto.

**Traducción de cada post debe incluir:**
- Título EN natural (no traducción literal)
- Cuerpo completo traducido y adaptado culturalmente
- Excerpt EN
- Meta title EN
- Meta description EN (≤160 chars)
- Open Graph completo EN
- Canonical propia (`https://anamorrison.com/en/blog/<slug-en>`)
- hreflang bidireccional con la versión ES
- Enlaces internos actualizados al equivalente EN (o marcados con nota si el destino aún no tiene traducción — pero como todo debe estar traducido pre-merge, esto no aplicará)
- Imágenes con alt EN cuando el original es en español

**Estructura de datos revisada en `blog-posts.ts`:**
```ts
type BlogPost = {
  // existentes...
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  keywords: string[];
  content: string;

  // Nuevos, opcionales al principio, obligatorios al final de F7-blog:
  en?: {
    slug: string;         // slug natural EN de i18n/BLOG-SLUGS.md
    title: string;
    description: string;
    keywords: string[];
    content: string;
    readTime?: string;    // Recalculado si difiere significativamente
    metaTitle?: string;   // Si difiere del title
    ogTitle?: string;     // Si difiere del title
    ogDescription?: string; // Si difiere de description
  };
};
```

**Aprobación por lotes de 3 posts** en Bloques 5, 6, 7 del copy. Cada sub-bloque requiere OK explícito antes de commitear los siguientes. El componente `/en/blog` y `/en/blog/[slug]` solo se marca listo cuando los 20 posts están aprobados y sus datos EN presentes.

---

## 8 · Estimación por fases

| Fase | Alcance | Tiempo estimado |
|---|---|---|
| F1 (este documento) | Documentación + copy | Entregado |
| F2 | Andamio técnico + feature flag + tests | ~2 h |
| F3 | Páginas EN críticas: about, short-term-rentals, tax-deed, contact | ~3 h |
| F4 | Páginas EN alta: case-studies, resources, blog landing | ~2 h |
| F5 | Páginas EN legales (3) | ~1.5 h |
| F6 | Navbar, Footer, LocaleSwitcher, ContactForm bilingüe, Consent bilingüe | ~3 h |
| F7 | Sitemap, metadata, hreflang, schema.org, tests | ~2 h |
| F8 | Pruebas integrales en Preview + activación feature flag | ~1 h + tu revisión |
| Post-merge | Traducción de blog posts (uno por uno tras revisión) | Diferido |

**Total estimado dentro del PR #3:** ~14-16 horas de trabajo mío + tu revisión.

---

## 9 · Plan de pruebas

### 9.1 Automatizadas (vitest)

**tests/i18n-routes.test.ts**
- Cada URL EN definida en `LOCALE_ROUTE_MAP` tiene su equivalente ES y viceversa
- `getEquivalentPath("/sobre-mi", "en")` → `/en/about`
- `getEquivalentPath("/en/about", "es")` → `/sobre-mi`
- Todas las URLs son parseables por Next Router (regex de segments)

**tests/i18n-metadata.test.ts**
- `buildLocalizedMetadata()` emite `alternates.languages` bidireccional
- `canonical` es URL absoluta
- `openGraph.locale` matchea el idioma

**tests/localeSwitcher.test.ts** (componente client)
- Renderiza link al equivalente EN cuando `pathname='/sobre-mi'`
- Renderiza link al equivalente ES cuando `pathname='/en/about'`
- Click escribe cookie `amc_lang`

**tests/leads-locale.test.ts** (extiende saveLead tests)
- Payload con `locale='en'` se persiste correctamente
- Email notificación incluye `[EN]` en subject si `locale='en'`
- Ningún cambio rompe los 11 tests existentes

**tests/sitemap.test.ts**
- Sitemap contiene cada ruta ES + su equivalente EN
- `alternates.languages` presente en cada entry

**Total: ~5 archivos de test nuevos, ~15-20 casos.**

### 9.2 Manuales · desktop

- [ ] `/` cambia a `/en` al clicar EN → contenido en inglés visible
- [ ] `/en` cambia a `/` al clicar ES
- [ ] Navbar en `/en/*` muestra links EN, mantiene equivalencia al navegar
- [ ] Cookie `amc_lang` escrita tras selección manual
- [ ] Botón "Trabaja Conmigo / Work With Me" muestra label correcto según idioma
- [ ] Footer muestra selector ES/EN con estado activo visible
- [ ] Formulario en `/en/contact` muestra labels EN
- [ ] Envío de lead desde formulario EN llega a Supabase con `payload.locale = 'en'`
- [ ] Email de notificación llega con subject `[Lead · EN]`
- [ ] Consent banner en `/en/*` muestra texto EN
- [ ] Modal de preferencias en EN
- [ ] Retirar consent en EN funciona
- [ ] Página legal EN carga con banner "Provisional draft"
- [ ] hreflang visible en HTML source de cada página
- [ ] Cambiar de `/sobre-mi` a `/en/about` preserva la sección visitada (mismo scroll position aproximado)
- [ ] Banner "This site is also available in English" aparece solo si Accept-Language empieza con `en-*` Y sin cookie `amc_lang`
- [ ] Blog landing EN muestra placeholder "Coming soon" o similar
- [ ] `/en/blog/<slug-inexistente>` responde 404
- [ ] `/servicios` sigue redirigiendo a `/alquileres-a-corto-plazo` (español, sin regresión)
- [ ] `/en/services` redirige a `/en/short-term-rentals`

### 9.3 Manuales · móvil

- [ ] Menú hamburguesa incluye LocaleSwitcher visible
- [ ] Selector EN/ES accesible con dedo (área tocable ≥44×44 px)
- [ ] Modal de consent responsive en EN
- [ ] Formulario EN scrollea sin corte de labels

### 9.4 SEO check

- [ ] `curl -sSI https://anamorrison.com/sitemap.xml` retorna sitemap con URLs bilingües
- [ ] `<link rel="canonical">` presente en cada página
- [ ] `<link rel="alternate" hreflang="en">` y `hreflang="es"` presentes bidireccionalmente
- [ ] `<link rel="alternate" hreflang="x-default">` apunta a la versión ES
- [ ] Schema.org JSON-LD incluye `inLanguage`
- [ ] Google Rich Results Test pasa sin errores

### 9.5 Seguridad / regresión

- [ ] Los 11 tests de saveLead + sendLeadEmails siguen pasando
- [ ] `POST /api/leads` con y sin `locale` siguen respondiendo 200
- [ ] Rate limit sigue funcionando
- [ ] RLS bloquea anon en `/en/*`
- [ ] Ningún log EN muestra PII (mismo redact que ES)
- [ ] Ninguna URL EN filtra secretos ni env vars

---

## 10 · Feature flag

Nueva env var **solo en PR #3**:

```
NEXT_PUBLIC_I18N_ENABLED    (default "false")
```

**Comportamiento:**
- `false` → LocaleSwitcher oculto en Navbar/Footer. `next.config.ts` mantiene redirect `/en/:path* → /`. Solo `/en/page.tsx` es visible con redirect. Todas las páginas EN nuevas existen en el repo pero son inalcanzables.
- `true` → LocaleSwitcher visible. Redirect `/en → /` eliminado. Todas las páginas EN alcanzables.

**Estrategia:** empezar en `false` durante F2-F7. Activar `true` solo en F8, en Preview, para pruebas integrales tuyas. Al aprobar → merge + set `true` en Production.

---

## 11 · Acción concreta que requiere tu autorización (revisada)

Antes de que empiece F2, necesito de ti:

1. **Aprobación de los 20 slugs EN** en `i18n/BLOG-SLUGS.md` (o cambios línea por línea)
2. **Aprobación del Bloque 1 del copy** en `i18n/COPY-BLOCK-1.md` (Navbar, Footer, Home completa, LocaleSwitcher, BilingualSuggestionBanner)
3. **Aprobación de los criterios F8** en `i18n/F8-EXIT-CRITERIA.md` (matriz de paridad con 10 criterios)
4. **Confirmación del feature flag** `NEXT_PUBLIC_I18N_ENABLED=false` durante F2–F7
5. **Confirmación explícita:** blog completo (20 posts) forma parte del alcance pre-merge; nada se activa con placeholders

Cuando escribas **"Bloque 1 aprobado. Inicia F2."** empiezo el andamio técnico. Bloques 2–4+ se irán presentando por separado. El scope de blog posts se irá presentando en sub-bloques de 3 posts a partir del Bloque 5.

---

**Estado actual:** Documentación revisada con las 7 correcciones. Cero código de implementación. Rama `claude/p3-pr3-i18n-complete` creada desde `main` @ `7e70e4b`. Archivos presentes:

- `i18n/PLAN.md` (este archivo, actualizado)
- `i18n/BLOG-SLUGS.md` (tabla de 20 slugs para aprobación)
- `i18n/COPY-BLOCK-1.md` (Bloque 1 completo del copy)
- `i18n/F8-EXIT-CRITERIA.md` (criterios de salida F8)
