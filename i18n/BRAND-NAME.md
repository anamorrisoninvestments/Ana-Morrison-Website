# Regla maestra de identidad de marca

**Nombre público oficial · única forma correcta en TODO el sitio:**

# `AnaMaría Morrison`

## Reglas obligatorias

- `Ana` y `María` van **JUNTOS**, sin espacio → `AnaMaría`
- `María` lleva **tilde en la í** → `María` (no `Maria`)
- **Espacio** después de `AnaMaría` antes de `Morrison` → `AnaMaría Morrison`
- **NO** usar ninguna de estas variantes: `Ana Maria Morrison`, `AnaMaria Morrison`, `Ana María Morrison`, `Ana Morrison`, `AnaMaria`, `Ana María`
- **NO** modificar el nombre según el idioma. La forma oficial es idéntica en ES y EN.

## Aplicación obligatoria

Aplica en:
- Navbar, Footer, Home, About/Sobre mí, Short-Term Rentals, Tax Deed Investing, Case Studies, Resources, Blog, Contact
- Formularios, CTAs, breadcrumbs
- `alt` text de imágenes informativas
- `aria-label` de elementos interactivos
- Metadata: SEO titles, meta descriptions cuando aparezca el nombre, Open Graph, Twitter Cards
- Schema.org / JSON-LD: WebPage, WebSite, Person, Organization
- Copyright del Footer
- Emails generados por el sitio cuando aparezca el nombre
- Texto accesible para lectores de pantalla
- Cualquier string reutilizable o centralizado (`CLIENT.name`, `CLIENT.nameShort`, etc.)
- Cualquier versión ES o EN

## Ejemplos correctos

```
AnaMaría Morrison
AnaMaría Morrison · Real Estate Investor & Strategist
AnaMaría Morrison — Real Estate Investor & STR / Tax Deed Strategist
Work with AnaMaría Morrison
Contact AnaMaría Morrison on WhatsApp
AnaMaría Morrison on Instagram
AnaMaría Morrison on Facebook
AnaMaría Morrison on TikTok
AnaMaría Morrison on YouTube
AnaMaría Morrison on LinkedIn
AnaMaría Morrison · Go to home
© {year} AnaMaría Morrison · The Host Circle · All rights reserved.
```

Y sus equivalentes ES:

```
Trabaja con AnaMaría Morrison
Contactar a AnaMaría Morrison por WhatsApp
AnaMaría Morrison en Instagram
AnaMaría Morrison · Ir a inicio
© {year} AnaMaría Morrison · The Host Circle · Todos los derechos reservados.
```

## Excepciones documentadas (NO renombrar sin autorización)

Los siguientes son **identificadores técnicos** o **contenido externo** donde renombrar puede romper integraciones. **NO se tocan sin autorización explícita:**

- Dominio: `anamorrison.com` (registro DNS · propiedad legal)
- Emails funcionales: `anamorrisoninvestments@gmail.com`, `ana@anamorrison.com`, `noreply@anamorrison.com`, `hello@anamorrison.com`, etc.
- URL de LinkedIn actual: `https://www.linkedin.com/in/anamar%C3%ADa-morrison-07b83b5b` (URL histórica del perfil)
- Handles/usernames de redes sociales: `@anamorrisoninvestments`, `anamorrisoninvestments` en YouTube/TikTok/Facebook
- Nombre del repositorio GitHub: `anamorrisoninvestments/Ana-Morrison-Website`
- Nombres de archivos legacy: `anamaria-morrison.jpg`, `anamaria-about.jpg` (referenciados por múltiples componentes)
- Nombre de la organización Vercel: `anamorrisoninvestments-projects`
- Slugs de rutas ES existentes (no aplica renombrar por consistencia SEO)

**Estos identificadores se auditan pero no se cambian** en el scope de PR #3-i18n. Cualquier cambio requiere autorización explícita por separado y coordinación con DNS/APIs/redes.

## Reporte de variantes al momento de esta auditoría

Ver `i18n/NAME-AUDIT-REPORT.md` para el listado completo clasificado A–F.

---

## Credencial oficial aprobada — Category B

Ana posee una credencial real y aprobada que debe registrarse en la documentación maestra. Esta credencial es la **única** excepción a la regla de prudencia sobre la palabra `certified`/`certificada` en el sitio.

### Forma oficial pública

| Idioma | Formulación exacta |
|---|---|
| **ES** | `Certificada como Analista de Títulos en Subastas del Condado (Tax Deed)` |
| **EN** | `Certified Tax Deed Title Analyst` |

Ambas formulaciones comunican la **misma** credencial. Registrar como equivalencia oficial.

### Justificación de la formulación ES

Gran parte de la audiencia hispanohablante puede no conocer completamente el término "Tax Deed". Por eso la forma ES presenta primero el concepto en español (`Analista de Títulos en Subastas del Condado`) y luego el término técnico entre paréntesis (`(Tax Deed)`).

### Adaptación narrativa admitida

En prosa se puede adaptar gramaticalmente conservando siempre los tres conceptos (`Analista de Títulos` · `Subastas del Condado` · `Tax Deed`):

- ES: *"Como Analista de Títulos en Subastas del Condado (Tax Deed) certificada, mi metodología incluye…"*
- EN: *"As a Certified Tax Deed Title Analyst, my methodology includes…"*

### Formas NO admitidas en español como título oficial

- `Certificada como Analista de Títulos en Tax Deed`
- `Analista Tax Deed`
- `Analista de Tax Deed`
- `Certified Tax Deed Title Analyst` (dejar en inglés dentro de copy ES)
- `Certified Tax Deed Analyst`

### Formas NO admitidas en inglés como título oficial

- `Certified County Auction Title Analyst`
- `Certified County Auction Analyst`
- `Certified Tax Deed Analyst`
- `Certified Title Analyst`
- `County Auction Analyst`

### Alcance NO implicado por la credencial

Esta credencial **no** implica ni permite comunicar públicamente que Ana es:

- abogada
- title attorney
- title agent
- broker
- CPA
- financial advisor
- ninguna otra licencia profesional distinta a la certificación real

### Datos NO documentados — NO inventar

No se declaran públicamente hasta contar con evidencia aprobada por Ana:

- entidad emisora / issuer / issuingOrganization
- número de certificado / identifier
- número de licencia
- organismo acreditador / recognizedBy / credentialCategory
- alcance regulatorio adicional
- `dateCreated`, `validFor`, `expirationDate`

En Schema.org sólo se declara el `name` de la credencial:

```json
"hasCredential": {
  "@type": "EducationalOccupationalCredential",
  "name": "Certified Tax Deed Title Analyst"
}
```

### Diferenciación · Formación vs. Credencial

Son conceptos **distintos** que pueden coexistir cuando ambos son factualmente correctos. No convertir automáticamente uno en el otro.

| Concepto | ES | EN | Uso típico |
|---|---|---|---|
| Formación / entrenamiento | `Formación especializada en análisis Tax Deed` | `Specialized training in Tax Deed analysis` | About subheadline, timeline 2025, eyebrows generales de trayectoria |
| Credencial formal | `Certificada como Analista de Títulos en Subastas del Condado (Tax Deed)` | `Certified Tax Deed Title Analyst` | Post 2 del blog, `author.hasCredential`, Authority Tax Deed cuando refiera específicamente a la credencial, bio autor |

Cuando una sección refiere específicamente a **la credencial**, se usa la credencial. Cuando refiere a **formación**, se usa `specialized training`. No se degrada la credencial a "specialized training" ni se amplía "specialized training" a "certified" por defecto.

### Regla operativa maestra sobre `certified`

`certified` / `certificada` **no** está prohibido universalmente. Es admisible **únicamente** cuando refiere específicamente a la credencial real aprobada (`Certified Tax Deed Title Analyst` / `Certificada como Analista de Títulos en Subastas del Condado (Tax Deed)`). Cualquier otro uso permanece bajo la regla de prudencia y requiere evidencia aprobada.

Auditorías automáticas deben tratar apariciones de `certified` / `certificada` como aceptables sólo cuando el contexto refiera literalmente a esta credencial.

