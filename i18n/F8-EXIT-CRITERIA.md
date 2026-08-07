# F8 · Criterios de salida revisados

**Principio rector:** *el selector EN solo se activa cuando el sitio EN está completo, verificado y a paridad con el sitio ES.* No se acepta bilingüe parcial, ni placeholders, ni "coming soon" ni contenido solo-español oculto tras el selector.

## Matriz de paridad obligatoria pre-merge

Antes de mergear PR #3-i18n, cada ruta pública debe pasar los 10 criterios en ambos idiomas.

### Formato de la matriz

Se genera al final de F7 como `i18n/PARITY-MATRIX.md`. Estructura:

| # | Ruta ES | Ruta EN | 1. Contenido | 2. Nav | 3. Formularios | 4. Metadata | 5. Canonical | 6. hreflang | 7. Schema.org | 8. Responsive | 9. Accesibilidad | 10. Pruebas |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `/` | `/en` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 2 | `/sobre-mi` | `/en/about` | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... |

**Ninguna celda puede estar en:** `pending`, `placeholder`, `Spanish-only`, `post-merge`, `TODO`, `WIP`, `partial`.
Solo `✅` (verificado) o `❌` (bloqueante).

Si **cualquier** celda está en `❌`, el merge queda bloqueado.

## Los 10 criterios en detalle

### 1. Contenido completo
- Texto principal traducido y adaptado culturalmente (no traducción literal)
- Todos los headings, subheadings, párrafos, listas, quotes
- Todos los CTAs con label traducido
- Placeholders y helper text de formularios
- Imágenes con `alt` traducido cuando el original es en español
- Captions y epígrafes
- Cero texto en el idioma incorrecto en la página
- Cero `TODO`, `Coming soon`, `Próximamente`, `placeholder`, `lorem ipsum`
- Cero mezcla ES/EN dentro de la misma página

### 2. Navegación
- Navbar muestra los 7 links con labels en el idioma correcto
- Cada link apunta a la ruta correcta en ese idioma
- CTA principal del navbar traducido
- LocaleSwitcher visible y funcional
- Footer con nav de 7 links traducidos y apuntando correctamente
- Breadcrumbs en el idioma de la página
- Enlaces internos dentro del contenido apuntan a rutas del mismo idioma
- Enlaces externos (WhatsApp, Instagram, Facebook, YouTube, LinkedIn, TikTok) no rompen ni cambian según idioma
- Menú mobile con LocaleSwitcher accesible

### 3. Formularios
- ContactForm en `/en/contact` con:
  - Interest picker con 7 opciones y descripciones traducidas
  - Todos los labels, placeholders, helper text traducidos
  - Todas las opciones de dropdowns (propertyType, platform, experience, capital) traducidas
  - Botón submit y estado loading traducidos
  - Mensaje de consentimiento traducido
  - Mensaje de éxito traducido
  - 4 tipos de mensajes de error traducidos (rate limit, invalid input, generic, network)
- Envío desde formulario EN persiste `payload.locale='en'` en `public.leads`
- Evento `form_submitted` incluye `locale` en payload
- Email de notificación llega con `[Lead · EN]` en subject
- Fila "Language / Idioma: English" en el email
- Fila "Source page: /en/contact" en el email
- Newsletter form (si aplica en `/en`) traducido
- Honeypot, timing check, rate limit funcionan en EN idéntico a ES
- Doble click bloqueado en EN igual que en ES

### 4. Metadata
- `<title>` traducido y optimizado SEO por página
- `<meta name="description">` traducido, ≤ 160 chars
- `<meta name="keywords">` (si se usa) traducido
- `<meta property="og:title">` traducido
- `<meta property="og:description">` traducido
- `<meta property="og:locale">` = `es_US` en páginas ES, `en_US` en EN
- `<meta property="og:alternateLocale">` = el otro
- `<meta property="og:url">` = URL absoluta canónica de la página
- `<meta property="og:image">` presente (misma imagen o versión traducida)
- Twitter cards equivalentes traducidas

### 5. Canonical
- `<link rel="canonical">` presente en cada página
- URL canónica absoluta (`https://anamorrison.com/...`)
- Página ES canonical apunta a sí misma
- Página EN canonical apunta a sí misma
- Cero `canonical` mal configurado apuntando al otro idioma
- Redirects legacy no filtran canonical erróneo

### 6. hreflang bidireccional
- `<link rel="alternate" hreflang="es-US" href="...">` presente
- `<link rel="alternate" hreflang="en-US" href="...">` presente
- `<link rel="alternate" hreflang="x-default" href="...">` presente (apunta a ES)
- Los pares son verdaderamente bidireccionales: si `/sobre-mi` declara `/en/about` como EN, entonces `/en/about` debe declarar `/sobre-mi` como ES
- Rutas sin traducción NO incluyen hreflang (evita señales rotas)
- URLs absolutas en hreflang
- Sin trailing slash inconsistente entre ES y EN
- Sitemap.xml refleja las mismas relaciones

### 7. Schema.org
- Cada página tiene JSON-LD estructurado apropiado a su tipo
- `WebPage` / `Article` / `FAQPage` / `BreadcrumbList` con `inLanguage` correcto (`es-US` o `en-US`)
- `Person` y `Organization` se mantienen (idioma-neutros salvo `description`)
- `description` de Schema.org traducida
- `BreadcrumbList` con nombres en el idioma de la página
- Rich Results Test de Google pasa sin errores en ambas versiones
- Sin schemas que anuncien contenido que no existe en la página

### 8. Responsive
- Desktop (≥1280px): layout completo verificado en ES y EN
- Tablet (768-1279px): layout adaptado verificado
- Mobile (≤767px): layout stack, menú hamburguesa, botones tocables ≥44×44 px
- LocaleSwitcher visible y funcional en mobile
- ConsentBanner + BilingualSuggestionBanner no se solapan
- Sin overflow horizontal en ningún viewport
- Formularios en mobile sin cortes de labels

### 9. Accesibilidad
- `<html lang="es">` en páginas ES, `<html lang="en">` en páginas EN
- Todas las imágenes con `alt` en el idioma correcto (o `alt=""` si decorativas)
- Aria-labels traducidos: LocaleSwitcher, ConsentBanner, hamburger menu, close buttons, form fields
- Contraste AA verificado (mismo diseño, pero validar por si algún texto EN es más largo y cambia el layout)
- Focus visible en teclado
- Skip links si aplican
- Formularios con `<label>` asociados correctamente
- Errores de formulario anunciados a lectores de pantalla en el idioma correcto
- Sin dependencia de color para transmitir información

### 10. Pruebas
- Todos los tests automatizados (vitest) pasan: existentes (11) + nuevos i18n
- Pruebas manuales de la §9.2 y §9.3 del PLAN.md ejecutadas y documentadas
- Pruebas de leads en ambos idiomas ejecutadas contra Supabase Preview:
  - Lead ES desde `/contacto` → guardado, event creado, email recibido con `[Lead · ES]`
  - Lead EN desde `/en/contact` → guardado, event creado, email recibido con `[Lead · EN]`
  - Payload EN contiene `locale='en'`
  - Fila `Language` en email EN muestra `English`
- Consent flow ejecutado en ambos idiomas: aceptar, rechazar, configurar, retirar
- Verificación de logs: cero PII, cero secretos, en ambos idiomas
- Rate limit probado en ambos endpoints con IPs simuladas
- RLS verifica que anon no lee tablas desde `/en/*`

## Pre-flight completo antes de subir el flag

1. `NEXT_PUBLIC_I18N_ENABLED=false` en Vercel Preview y Production hasta que la matriz esté completa
2. Toda F7 completa: metadata, hreflang, sitemap, schema.org, tests i18n verdes
3. Matriz de paridad `i18n/PARITY-MATRIX.md` commiteada con **cero** ❌
4. Tests automatizados: `npm test` verde
5. Lint: `npm run lint` 0 errors
6. TypeScript: `npx tsc --noEmit` 0 errors
7. Build: `npm run build` sin errores
8. Preview de Vercel del último commit de F7 en Ready
9. Preview manual verificado por Ana en desktop y móvil (ES y EN)

## Activación del feature flag

1. Editar `NEXT_PUBLIC_I18N_ENABLED=true` en Vercel **Preview** primero
2. Redeploy Preview → verificar LocaleSwitcher visible
3. Ejecutar batería de pruebas integrales en Preview (Test 1-9 del PLAN.md §9)
4. Autorización explícita de Ana: *"Autorizo merge y activación de i18n en producción."*
5. `NEXT_PUBLIC_I18N_ENABLED=true` en Vercel **Production**
6. Merge de PR #3 a `main`
7. Vercel Production redeploy
8. Verificación post-deploy en `www.anamorrison.com` en ambos idiomas
9. Confirmar hreflang en Search Console
10. Enviar sitemap actualizado a Google Search Console y Bing Webmaster Tools

## Post-activación (dentro del scope de PR #3)

- Añadir `/en` a Google Search Console como propiedad si no está
- Enviar sitemap bilingüe
- Verificar en 24-48h que Google indexa las URLs EN
- Verificar rich results de una página EN cualquiera

## Ninguna excepción admitida

- No se activa el flag si falta traducción de una sola página pública
- No se activa si un blog post EN tiene body vacío o placeholder
- No se activa si un formulario EN tiene labels ES
- No se activa si hreflang de una ruta es unidireccional
- No se activa si la Preview no aprobó pruebas integrales

Si en la Preview aparece un problema no anticipado, se corrige antes de activar. Nunca se activa con problemas conocidos.
