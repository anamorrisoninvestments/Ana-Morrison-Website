# Auditoría de nombre público · variantes actuales en el repo

**Fecha:** Fase 1 de PR #3-i18n
**Regla maestra:** ver `i18n/BRAND-NAME.md`
**Forma correcta única:** `AnaMaría Morrison`

## Resumen numérico

| Variante encontrada | Archivos | Estado |
|---|---|---|
| `Ana Morrison` | 25 | ❌ incorrecto — normalizar a `AnaMaría Morrison` |
| `AnaMaria Morrison` (sin tilde) | 14 | ❌ incorrecto — normalizar |
| `AnaMaria` (solo) | 14 | ❌ incorrecto — normalizar |
| `Ana Maria Morrison` (con espacio, sin tilde) | 2 | ❌ incorrecto — normalizar |
| `Ana María Morrison` / `Ana María` | 0 | — |
| `AnaMaría Morrison` (correcto) | 0 | ⚠️ ninguna aparición usa la forma correcta actualmente |

**Total apariciones no-técnicas categorizables:** ~99 líneas de código
**Total archivos únicos afectados por variantes visibles:** ~30

---

## Clasificación A–F

### CATEGORÍA A · Nombre público visible (renombrar en scope PR #3-i18n)

Texto que un usuario ve renderizado en la página. Debe cambiarse a `AnaMaría Morrison` en el pipeline de i18n (F2–F7).

| Archivo | Variante actual | Contexto |
|---|---|---|
| `src/components/sections/HeroSection.tsx` | `Ana Morrison` | Badge del Hero (marfil) |
| `src/components/sections/AboutSection.tsx` | `AnaMaria` (referencias en body) | Nota: componente en ES · texto de párrafo |
| `src/components/sections/MentorshipSection.tsx` | `AnaMaria` | Componente archivado desde P1 (no en home actual) |
| `src/components/sections/CoachingSection.tsx` | `AnaMaria` | Componente archivado desde P1 |
| `src/app/page.tsx` | `Ana Morrison` (metadata title) | Cambiar en F2 al centralizar contenido |
| `src/app/layout.tsx` | `AnaMaria`, `Ana Morrison` (schema.org, metadata) | Ver categoría B |
| `src/app/sobre-mi/page.tsx` | `Ana Morrison` | Copy visible |
| `src/app/alquileres-a-corto-plazo/page.tsx` | `Ana Morrison` | Copy visible |
| `src/app/tax-deed/page.tsx` | `Ana Morrison` | Copy visible + disclaimer |
| `src/app/casos-de-exito/page.tsx` | `Ana Morrison` | Copy visible |
| `src/app/recursos/page.tsx` | `Ana Morrison` | Copy visible |
| `src/app/recursos/guia-5-rutas/page.tsx` | `Ana Morrison`, `AnaMaria` | Copy visible |
| `src/app/blog/page.tsx` | `Ana Morrison` | Landing del blog |
| `src/app/contacto/page.tsx` | `Ana Morrison` | Copy visible |
| `src/app/terminos-de-uso/page.tsx` | `Ana Morrison` | Copy legal visible |
| `src/app/politica-de-privacidad/page.tsx` | `Ana Maria Morrison` | Copy legal visible |
| `src/components/ui/ContactForm.tsx` | `Ana Morrison` | Texto del consent y mensajes visibles |
| `src/app/cursos/page.tsx` | `AnaMaria` | Legacy · redirect activo pero código presente |
| `src/app/conferencias/page.tsx` | `AnaMaria` | Legacy · redirect activo |
| `src/app/prensa/page.tsx` | `AnaMaria` | Legacy · redirect activo |
| `pr/press-kit.md` | `AnaMaria` | Documento del press kit |
| `pr/pitch-emails.md` | `AnaMaria` | Plantillas de outreach |

### CATEGORÍA B · Metadata / SEO (renombrar en scope PR #3-i18n)

Aparece en `<title>`, meta description, Open Graph, Schema.org JSON-LD. Se cambia al centralizar en `content/*` durante F2.

| Archivo | Aparición |
|---|---|
| `src/app/layout.tsx` | `Person.name`, `Organization.name`, OG, Twitter Cards, Schema.org |
| `src/app/page.tsx` | Metadata home ES |
| `src/app/{sobre-mi,alquileres-a-corto-plazo,tax-deed,casos-de-exito,recursos,contacto,blog,politica-de-privacidad,politica-de-cookies,terminos-de-uso}/page.tsx` | Metadata de cada página ES |
| `src/lib/client-data.ts` | `CLIENT.name` (`AnaMaria Morrison`) · `CLIENT.nameShort` (`Ana Morrison`) · `CLIENT.bio.short` · `CLIENT.bio.long` |
| `src/lib/blog-posts.ts` | Autor/bio en algunos posts |

### CATEGORÍA C · Accessibility (renombrar en scope PR #3-i18n)

`aria-label`, `alt` de imágenes informativas.

| Archivo | Aparición |
|---|---|
| `src/components/sections/HeroSection.tsx` | `alt="Ana Morrison — Real Estate Investor..."` |
| `src/components/sections/AboutSection.tsx` | `alt="AnaMaria Morrison"` |
| `src/app/sobre-mi/page.tsx` | `alt` de foto About |
| `src/components/ui/Footer.tsx` | aria-labels de iconos sociales (actualmente solo el nombre técnico) |
| `src/components/ui/Navbar.tsx` | aria-label CTA (a añadir en F2 según Parte 1 aprobada) |

### CATEGORÍA D · Contenido (renombrar en scope PR #3-i18n)

Copy en párrafos, quotes, bio, milestones, secciones editoriales.

| Archivo | Aparición |
|---|---|
| `src/lib/client-data.ts` | `CLIENT.bio.long` (biografía completa ES) |
| `src/app/sobre-mi/page.tsx` | Historia de origen + timeline |
| `src/app/politica-de-privacidad/page.tsx` | `"...operado por Ana Maria Morrison."` |
| `src/app/terminos-de-uso/page.tsx` | Referencias en propiedad intelectual y disclaimer |
| `src/lib/blog-posts.ts` | Body content de posts que mencionan al autor |
| `pr/press-kit.md`, `pr/pitch-emails.md` | Documentos de outreach |

### CATEGORÍA E · Código técnico (NO renombrar sin autorización)

Constantes, keys, propiedades de objetos donde el string es un valor técnico que otras partes del código consumen.

| Archivo | Referencia | Riesgo si se renombra |
|---|---|---|
| `src/lib/client-data.ts` | `CLIENT.name = "AnaMaria Morrison"` · `CLIENT.nameShort = "Ana Morrison"` | **NORMALIZABLE.** Estos valores fluyen a Schema.org, meta, footer, emails. Cambiarlos a `AnaMaría Morrison` es exactamente lo que la regla maestra requiere. Se hace en F2. |
| `src/app/api/newsletter/route.ts` línea 28 | `from: "AnaMaria Morrison <noreply@anamorrison.com>"` | **NORMALIZABLE.** Cambiar el display name a `AnaMaría Morrison`. El email técnico (`noreply@anamorrison.com`) NO se toca. |
| `src/app/api/newsletter/route.ts` línea 48 | `from: "AnaMaria Morrison <ana@anamorrison.com>"` | **NORMALIZABLE** (mismo criterio). |
| `src/lib/email/send-lead-emails.ts` | `from: "AnaMaria Morrison <noreply@anamorrison.com>"` (verificar) | **NORMALIZABLE** display name. |
| `src/lib/client-data.ts` línea 117 | `linkedin.handle = "AnaMaria Morrison"` | **ESPECIAL:** el `handle` es texto de display del social; puede normalizarse. El **`url`** de LinkedIn (`.../in/anamar%C3%ADa-morrison-07b83b5b`) NO se toca — es URL histórica del perfil. |

### CATEGORÍA F · Nombres de archivo, URLs, identifiers legacy (NO tocar)

| Recurso | Motivo de excepción |
|---|---|
| `public/images/anamaria-morrison.jpg` | Nombre de archivo. Referenciado por HeroSection y layout Schema.org. Renombrar requiere actualización en múltiples archivos + posible pérdida de referencias externas si alguien enlazó la imagen. Se puede hacer en un PR posterior de "asset cleanup" con redirect de imagen. |
| `public/images/anamaria-about.jpg` | Mismo criterio. |
| `public/images/anamaria-*.jpg` (varios) | Mismo criterio. |
| `anamorrison.com` (dominio) | Propiedad legal registrada. |
| `anamorrisoninvestments@gmail.com` (email actual funcional) | Cuenta de email real activa. |
| `noreply@anamorrison.com`, `ana@anamorrison.com`, etc. | Cuentas SMTP configuradas en Resend. |
| Handles `@anamorrisoninvestments` (Instagram, YouTube, TikTok, Facebook) | Usernames de plataformas · cambiarlos rompe URLs históricas de posts, followers, backlinks SEO. |
| LinkedIn URL: `/in/anamar%C3%ADa-morrison-07b83b5b` | URL histórica del perfil personal. |
| Repositorio GitHub: `anamorrisoninvestments/Ana-Morrison-Website` | Nombre del repo · renombrar requiere actualizar remote, cambiar integraciones (Vercel, Supabase webhooks, actions). |
| Nombre del proyecto Vercel: `ana-morrison-website` (y `-tur1` desconectado) | Renombrar rompe URL de preview y deployment CI. |
| Slugs ES existentes: `/sobre-mi`, `/alquileres-a-corto-plazo`, etc. | Fuera del scope de identidad de nombre. |

---

## Plan de normalización por fases (dentro de PR #3-i18n)

### Ahora (fase de documentación de copy)
- ✅ Documentar la regla maestra en `i18n/BRAND-NAME.md`
- ✅ Este reporte `i18n/NAME-AUDIT-REPORT.md`
- ✅ Actualizar `i18n/COPY-BLOCK-1.md` para que **todos los ejemplos y propuestas EN/ES usen `AnaMaría Morrison`**
- ✅ Actualizar `i18n/PLAN.md` para reemplazar el ejemplo `Ana Maria Morrison` de la Privacy Policy por `AnaMaría Morrison`

### F2 (andamio técnico)
- Cambiar `CLIENT.name`, `CLIENT.nameShort` en `src/lib/client-data.ts` a `AnaMaría Morrison`
- El resto del código consumirá automáticamente el valor centralizado
- Cambiar hardcoded strings restantes en componentes de home a `AnaMaría Morrison`

### F3–F5 (páginas EN + páginas ES normalizadas)
- Cada página que se traduce se normaliza en ES al mismo tiempo (approach de "toca-una-vez") si el copy ES mencionaba mal el nombre
- Ninguna página EN se crea con nombre incorrecto (regla desde el primer commit)

### F6 (formularios + consent)
- Consent text, botones, emails de notificación llevarán `AnaMaría Morrison`
- Display name en `from` de Resend: `AnaMaría Morrison <noreply@anamorrison.com>`

### F7 (metadata + Schema.org)
- Schema.org `Person.name`, `Organization.name` → `AnaMaría Morrison`
- OG, Twitter Cards, meta titles/descriptions
- Aria-labels sociales EN: `AnaMaría Morrison on Instagram`, etc.
- Aria-labels sociales ES: `AnaMaría Morrison en Instagram`, etc.

### F8 (validación pre-merge)
- Grep final del repo: cero apariciones de `Ana Morrison`, `AnaMaria`, `Ana Maria` (excepto categoría F documentada)
- Verificación visual en Preview de todas las páginas ES y EN

---

## Confirmaciones

- ✅ Cero cambios de código realizados en esta fase
- ✅ Cero identificadores técnicos (categoría F) modificados
- ✅ Se documenta la regla y el plan · se aplica progresivamente en F2–F7
- ✅ Autorización explícita se solicitará para cualquier renombrado que caiga en categoría E/F que no esté en este plan
