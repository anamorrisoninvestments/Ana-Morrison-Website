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
