# Bloque 3 · Copy aprobado

**Scope:** Case Studies · Resources · Contact page · ContactForm completo (7 interests, campos condicionales, validaciones, success/error/loading, aria-labels)
**Estado:** aprobado por Ana con decisiones y condiciones (contradicciones A y B resueltas).
**Ver también:** `i18n/BRAND-NAME.md`, `i18n/COPY-BLOCK-1.md`, `i18n/COPY-BLOCK-2.md`, `i18n/F8-EXIT-CRITERIA.md`.

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

Antes de esa activación deben existir y haber pasado la matriz de paridad (10 criterios de `i18n/F8-EXIT-CRITERIA.md`) para todas las rutas y elementos globales listados en `COPY-BLOCK-2.md`.

**Cero excepciones:** `pending`, placeholder de idioma, `Spanish-only`, coming soon como sustituto de traducción, `post-merge`, rutas faltantes, metadata faltante, formularios faltantes, estados faltantes.

**Excepción documentada NO viola paridad:** card estructural "Más casos próximamente / More case studies coming" en Case Studies — existe conceptualmente en ambos idiomas.

---

## Regla de pipeline crítico intacto

Cero cambios técnicos al pipeline validado en PR #2. El ContactForm bilingüe reutiliza al 100%:

- Endpoint `/api/leads` (mismo URL, mismo contrato)
- `saveLead` (dedup 5 min, compensación DELETE si falla `lead_events`)
- `sendLeadNotification` (Resend con status persistido)
- Schema zod `.strict()` con mismos enums y allowlist
- Rate limit por IP hash (5/min · 20/hora)
- Honeypot `hp_website`
- Timing check `form_started_at`
- RLS de Supabase
- Consent append-only
- Logs sin PII sin secretos

**Único cambio propuesto para F2/F6:** añadir campo opcional `locale: 'es' | 'en'` al payload. NO implementar todavía. Documentado para fase de implementación.

---

# 3.1 · Case Studies

**Rutas:** ES `/casos-de-exito` · EN `/en/case-studies`

## 3.1.M · Metadata / SEO

| Campo | ES | EN |
|---|---|---|
| `<title>` | `Casos de Éxito \| AnaMaría Morrison` | `Case Studies \| AnaMaría Morrison` |
| Meta description | `Transformaciones reales de propiedades y estrategias de adquisición. Casos verificables de alquiler a corto plazo, administración y Tax Deed.` | `Real property transformations and acquisition strategies. Verifiable case studies in short-term rentals, property management, and Tax Deed.` |
| OG title | igual `<title>` | igual `<title>` |
| OG description | igual meta description ES | igual meta description EN |
| Canonical | `https://anamorrison.com/casos-de-exito` | `https://anamorrison.com/en/case-studies` |
| hreflang | bidireccional es-US ↔ en-US · x-default → ES | idem |
| Schema.org WebPage `inLanguage` | `es-US` | `en-US` |
| Schema.org BreadcrumbList | `Inicio · Casos de Éxito` | `Home · Case Studies` |

## 3.1.B · Breadcrumbs

| Elemento | ES | EN |
|---|---|---|
| Root | `Inicio` | `Home` |
| Página actual | `Casos de Éxito` | `Case Studies` |

## 3.1.H · Hero

| Elemento | ES | EN |
|---|---|---|
| Eyebrow | `Casos de Éxito` | `Case Studies` |
| Headline línea 1 (marfil) | `Transformaciones` | `Real property` |
| Highlight (dorado + itálica) | `reales` | `transformations` |
| Headline línea 2 (marfil) | `de propiedades.` | `.` |
| Subheadline | `Cada caso representa una decisión estratégica: analizar, adquirir, transformar, lanzar, automatizar y rentabilizar. Sin promesas irreales, solo resultados con contexto.` | `Every case is a strategic decision: analyze, acquire, transform, launch, automate, and scale. No unrealistic promises — just results with context.` |

## 3.1.S1 · Caso publicado (único caso verificable)

| Elemento | ES | EN |
|---|---|---|
| Type + Market (chip) | `Transformación STR · Colombia` | `STR Transformation · Colombia` |
| Highlight (headline card) | `De renta tradicional a alquiler a corto plazo: 3× en ingresos` | `From long-term rental to short-term rental: 3× income` |
| Label `Situación` | `Situación` | `Situation` |
| Situación body | `Primera propiedad de AnaMaría Morrison operada inicialmente bajo modelo de renta tradicional.` | `AnaMaría Morrison's first property, initially operated under a long-term rental model.` |
| Label `Estrategia` | `Estrategia` | `Strategy` |
| Estrategia body | `Reposicionamiento al modelo de alquiler a corto plazo: diseño, listing profesional y operación en plataformas STR.` | `Repositioned as a short-term rental: design, professional listing, and operations across STR platforms.` |
| Label `Resultado` | `Resultado` | `Result` |
| Resultado body | `Los ingresos de la propiedad se triplicaron al pasar del modelo de renta tradicional al modelo STR.` | `The property's income tripled after moving from the long-term rental model to the short-term rental model.` |
| Label `Rol de AnaMaría` | `Rol de AnaMaría` | `AnaMaría's role` |
| Rol body | `Estrategia integral y operación` | `Full strategy and operations` |

**Cero cifras nuevas, cero certificaciones nuevas.** Preservada exclusivamente la métrica 3× ya aprobada.

## 3.1.S2 · Card estructural "Más casos próximamente"

**Card válida bilingüe** (aprobada por Ana): existe conceptualmente en ambos idiomas, no representa contenido faltante ni traducción pendiente.

| Elemento | ES | EN |
|---|---|---|
| Eyebrow (dorado) | `Más casos próximamente` | `More case studies coming` |
| Body | `Estamos preparando casos adicionales de administración, adquisición Tax Deed, optimización de ingresos y automatización.` | `More case studies are in preparation — property management, Tax Deed acquisitions, income optimization, and automation.` |

## 3.1.S3 · CTA final

| Elemento | ES | EN |
|---|---|---|
| Headline | `¿Quieres que tu propiedad sea el próximo caso?` | `Want your property to be the next case?` |
| CTA (dorado) | `Conversemos` | `Let's Talk` |

---

# 3.2 · Resources

**Rutas:** ES `/recursos` · EN `/en/resources`

## 3.2.M · Metadata / SEO

| Campo | ES | EN |
|---|---|---|
| `<title>` | `Recursos \| Alquileres a Corto Plazo y Tax Deed \| AnaMaría Morrison` | `Resources \| Short-Term Rentals & Tax Deed \| AnaMaría Morrison` |
| Meta description | `Guías, artículos, herramientas y formación sobre alquiler a corto plazo y Tax Deed. Contenido educativo para inversionistas y propietarios.` | `Guides, articles, tools, and training on short-term rentals and Tax Deed. Educational content for investors and property owners.` |
| OG title | igual `<title>` | igual `<title>` |
| OG description | igual meta description ES | igual meta description EN |
| Canonical | `https://anamorrison.com/recursos` | `https://anamorrison.com/en/resources` |
| hreflang | bidireccional | idem |
| Schema.org WebPage `inLanguage` | `es-US` | `en-US` |
| Schema.org BreadcrumbList | `Inicio · Recursos` | `Home · Resources` |

## 3.2.B · Breadcrumbs

| Elemento | ES | EN |
|---|---|---|
| Root | `Inicio` | `Home` |
| Página actual | `Recursos` | `Resources` |

## 3.2.H · Hero

| Elemento | ES | EN |
|---|---|---|
| Eyebrow | `Recursos & Educación` | `Resources & Education` |
| Headline línea 1 (marfil) | `Contenido para` | `Content for` |
| Highlight (dorado + itálica) | `decidir mejor` | `better decisions` |
| Headline línea 2 | `.` | `.` |
| Subheadline | `Guías, artículos y herramientas enfocadas exclusivamente en alquileres a corto plazo y Tax Deed.` | `Guides, articles, and tools focused exclusively on short-term rentals and Tax Deed.` |

## 3.2.S1 · 3 categorías cards

| Categoría | ES `title` | EN `title` | ES `desc` | EN `desc` | ES `cta` | EN `cta` |
|---|---|---|---|---|---|---|
| 1 (dorado) | `Alquileres a Corto Plazo` | `Short-Term Rentals` | `Guías, estrategias y herramientas para propietarios y operadores.` | `Guides, strategies, and tools for property owners and operators.` | `Explorar →` | `Explore →` |
| 2 (azul) | `Tax Deed` | `Tax Deed` | `Educación sobre subastas del condado, análisis y debida diligencia.` | `Education on county auctions, analysis, and due diligence.` | `Explorar →` | `Explore →` |
| 3 (sutil) | `The Host Circle` | `The Host Circle` | `Formación práctica para construir y operar un negocio profesional STR.` | `Practical training to build and operate a professional short-term rental business.` | `Explorar →` | `Explore →` |

`The Host Circle` es nombre propio, sin traducir.

## 3.2.S2 · CTA final

| Elemento | ES | EN |
|---|---|---|
| Headline | `Explora el blog completo` | `Explore the full blog` |
| CTA (dorado) | `Ver todos los recursos` | `See All Resources` |

---

# 3.3 · Contact page

**Rutas:** ES `/contacto` · EN `/en/contact`

## 3.3.M · Metadata / SEO

| Campo | ES | EN |
|---|---|---|
| `<title>` | `Contacto \| AnaMaría Morrison` | `Contact \| AnaMaría Morrison` |
| Meta description | `Habla directamente con AnaMaría Morrison sobre alquileres a corto plazo, administración STR, preparación de propiedad o inversión Tax Deed. Respuesta en menos de 24 horas hábiles.` | `Reach AnaMaría Morrison directly about short-term rentals, STR management, property setup, or Tax Deed investing. Response within 24 business hours.` |
| OG title | igual `<title>` | igual `<title>` |
| OG description | igual meta description ES | igual meta description EN |
| Canonical | `https://anamorrison.com/contacto` | `https://anamorrison.com/en/contact` |
| hreflang | bidireccional | idem |
| Schema.org WebPage `inLanguage` | `es-US` | `en-US` |
| Schema.org ContactPage (opcional) | `ContactPage inLanguage=es-US` | `ContactPage inLanguage=en-US` |

## 3.3.B · Breadcrumbs

| Elemento | ES | EN |
|---|---|---|
| Root | `Inicio` | `Home` |
| Página actual | `Contacto` | `Contact` |

## 3.3.H · Hero

| Elemento | ES | EN |
|---|---|---|
| Eyebrow | `Trabaja Conmigo` | `Work With Me` |
| Headline línea 1 (marfil) | `Cuéntame de tu` | `Tell me about your` |
| Highlight 1 (dorado + itálica) | `propiedad` | `property` |
| Conector | `o tu` | `or your` |
| Highlight 2 (azul + itálica) | `oportunidad` | `opportunity` |
| Cierre | `.` | `.` |
| Subheadline | `Elige la opción que mejor describe tu momento. El formulario se adaptará a lo que realmente necesitas. Respondo personalmente en menos de 24 horas hábiles.` | `Pick the option that best describes where you are. The form will adapt to what you actually need. I respond personally within 24 business hours.` |

## 3.3.S1 · Sidebar (3 cards)

### Card A · Contacto Directo

| Elemento | ES | EN |
|---|---|---|
| Eyebrow card | `Contacto Directo` | `Direct Contact` |
| Label email | `Email` | `Email` |
| Email value | `{CLIENT.email}` (categoría F · sin cambio) | `{CLIENT.email}` |
| Label WhatsApp | `WhatsApp` | `WhatsApp` |
| WhatsApp display | `{CLIENT.whatsappDisplay}` | `{CLIENT.whatsappDisplay}` |
| CTA WhatsApp button | `Escríbeme por WhatsApp` | `Message Me on WhatsApp` |
| Aria-label CTA WhatsApp | `Escríbeme por WhatsApp a AnaMaría Morrison` | `Message AnaMaría Morrison on WhatsApp` |
| Mensaje pre-cargado WA | `Hola AnaMaría, quiero conversar contigo.` | `Hi AnaMaría, I'd like to talk.` |

### Card B · Áreas de Trabajo (6 items)

| Elemento | ES | EN |
|---|---|---|
| Eyebrow card | `Áreas de Trabajo` | `Areas of Work` |
| Item 1 | `Estrategia y transformación STR` | `STR strategy and transformation` |
| Item 2 | `Administración profesional STR` | `Professional STR management` |
| Item 3 | `Preparación y lanzamiento` | `Property setup and launch` |
| Item 4 | `Educación Tax Deed` | `Tax Deed education` |
| Item 5 | `Análisis de oportunidades Tax Deed` | `Tax Deed opportunity analysis` |
| Item 6 | `Entrevistas, podcasts y conferencias` | `Interviews, podcasts, and speaking engagements` |

### Card C · Tiempo de respuesta

| Elemento | ES | EN |
|---|---|---|
| Eyebrow card | `Tiempo de respuesta` | `Response time` |
| Body | `Respondo todos los mensajes en menos de 24 horas en días hábiles.` | `I respond to every message within 24 business hours.` |

---

# 3.4 · ContactForm — flujo bilingüe completo

**Componente:** `src/components/ui/ContactForm.tsx`

**Pipeline crítico intacto.** Solo cambia UI. Enums internos, keys, contrato del backend, endpoint, honeypot, timing check, rate limit, dedup, RLS, consent, logs — todo preservado.

Único cambio propuesto para F2/F6 (NO implementar todavía): campo opcional `locale: 'es' | 'en'` en el payload que se agrega al `payload jsonb` de Supabase y a la fila `Language` del email interno de notificación.

## 3.4.step1 · Selector de interés (paso 1)

| Elemento | ES | EN |
|---|---|---|
| Headline | `¿Cómo podemos ayudarte?` | `How can we help you?` |
| Subheadline | `Elige la opción que mejor describe tu momento y te mostraré el formulario adecuado.` | `Pick the option that best describes where you are and I'll show you the right form.` |

### 7 opciones de interés

**Enum internal `key` NO cambia.** Solo cambia UI visible.

| # | `key` (interno · sin cambio) | ES `label` visible | EN `label` visible | ES `description` | EN `description` |
|---|---|---|---|---|---|
| 1 | `str-rentabilizar` | `Quiero rentabilizar una propiedad` | `Make My Property Perform` | `Tengo una propiedad y quiero convertirla en alquiler a corto plazo.` | `I own a property and want to turn it into a short-term rental.` |
| 2 | `str-administracion` | `Quiero administración STR` | `I need STR management` | `Necesito que administren profesionalmente mi propiedad STR.` | `I need professional management for my short-term rental.` |
| 3 | `str-preparacion` | `Quiero preparar y lanzar una propiedad` | `I want to prepare and launch a property` | `Diseño, amoblado, fotos, listing y puesta en marcha.` | `Design, furnishing, photography, listing, and go-live.` |
| 4 | `tax-deed-aprender` | `Quiero aprender sobre Tax Deed` | `I want to learn about Tax Deed` | `Formación y educación sobre subastas del condado.` | `Education on county auctions.` |
| 5 | `tax-deed-oportunidades` | `Quiero analizar oportunidades Tax Deed` | `I want to analyze Tax Deed opportunities` | `Solicito información sobre oportunidades Tax Deed en un condado específico.` | `I want information about Tax Deed opportunities in a specific county.` |
| 6 | `entrevista` | `Invitar a AnaMaría a una entrevista o evento` | `Invite AnaMaría to an interview or event` | `Podcasts, medios, keynotes o eventos corporativos.` | `Podcasts, media, keynotes, or corporate events.` |
| 7 | `otro` | `Otro` | `Other` | `Cuéntame de qué se trata.` | `Tell me what it's about.` |

**Reformulación aprobada opción 5:** eliminadas todas las promesas de listados de títulos por condado sin soporte de producto. Alineado con Bloque 2 aprobado.

## 3.4.step2 · Formulario adaptado (paso 2)

### Header del formulario

| Elemento | ES | EN |
|---|---|---|
| Eyebrow del form | `Formulario Seleccionado` | `Selected form` |
| Botón "Cambiar" | `Cambiar` | `Change` |
| Aria-label cambiar | `Cambiar selección de interés` | `Change interest selection` |

### Campos comunes (siempre visibles)

| Campo (input `name` interno) | ES `label` | EN `label` | ES `placeholder` | EN `placeholder` |
|---|---|---|---|---|
| `name` (required) | `Nombre *` | `Name *` | `Tu nombre completo` | `Your full name` |
| `email` (required) | `Email *` | `Email *` | `tu@email.com` | `you@email.com` |
| `whatsapp` (required) | `WhatsApp *` | `WhatsApp *` | `+1 (786) 000-0000` | `+1 (786) 000-0000` |

### Campo condicional (según interés)

| Trigger | Campo | ES `label` | EN `label` | ES `placeholder` | EN `placeholder` |
|---|---|---|---|---|---|
| Interview | `company` | `Medio / Empresa` | `Media outlet / Company` | `Nombre del podcast, medio o empresa` | `Podcast, media outlet, or company name` |
| STR (propiedad) | `location` (required) | `Ciudad de la propiedad` | `City of the property` | `Ej: Miami, FL` | `e.g. Miami, FL` |
| Tax Deed (inversionista) | `location` (required) | `Ciudad / Estado / Condado de interés` | `City / State / County of interest` | `Ej: Miami-Dade, FL` | `e.g. Miami-Dade, FL` |

### Campos condicionales STR (adicionales)

| Campo | ES `label` | EN `label` | ES opciones/placeholder | EN opciones/placeholder |
|---|---|---|---|---|
| `propertyType` (select) | `Tipo de propiedad` | `Property type` | `Apartamento, Casa, Villa, Loft, Estudio, Otro` | `Apartment, House, Villa, Loft, Studio, Other` |
| `bedrooms` (number) | `Habitaciones` | `Bedrooms` | `Ej: 2` | `e.g. 2` |
| `platform` (select) | `¿Ya está publicada?` | `Currently listed?` | `Airbnb, Booking, VRBO, Expedia, Otra, Aún no está publicada` | `Airbnb, Booking, VRBO, Expedia, Other, Not listed yet` |
| `monthlyIncome` (text) | `Ingreso mensual aproximado` | `Approximate monthly income` | `Opcional · USD` | `Optional · USD` |
| `startDate` (text) | `Fecha estimada para comenzar` | `Estimated start date` | `Ej: en 1 mes, próximos 3 meses, ya` | `e.g. in 1 month, next 3 months, now` |

**Nota importante:** los `value` internos del select (los `enum values` de zod) permanecen exactamente como están hoy en el schema. Cambia únicamente el `label` visible al usuario según `locale`. Ejemplo: `Apartamento` (ES visible) → `Apartment` (EN visible) → ambos mapean al mismo `value=Apartamento` en el payload al backend, sin romper Supabase ni analytics.

### Campos condicionales Tax Deed (adicionales)

| Campo | ES `label` | EN `label` | ES opciones/placeholder | EN opciones/placeholder |
|---|---|---|---|---|
| `experience` (select) | `Experiencia previa` | `Prior experience` | `Ninguna, Menos de 1 año, 1–3 años, 3+ años` | `None, Less than 1 year, 1–3 years, 3+ years` |
| `capital` (select) | `Capital destinado (segmentación, no exclusión)` | `Capital allocated (segmentation, not exclusion)` | `Menos de $10,000; $10,000–$50,000; $50,000–$150,000; $150,000–$500,000; Más de $500,000; Prefiero no responder` | `Under $10,000; $10,000–$50,000; $50,000–$150,000; $150,000–$500,000; Over $500,000; Prefer not to say` |
| `timeframe` (text) | `Plazo estimado para invertir` | `Estimated investment timeline` | `Ej: en 30 días, 3 meses, explorando` | `e.g. in 30 days, 3 months, exploring` |

### Campos condicionales Entrevista (adicionales)

| Campo | ES `label` | EN `label` | Placeholder |
|---|---|---|---|
| `eventType` (text) | `Tipo de evento` | `Event type` | ES: `Podcast, evento, keynote, etc.` · EN: `Podcast, event, keynote, etc.` |
| `eventDate` (text) | `Fecha estimada` | `Estimated date` | ES: `Opcional` · EN: `Optional` |

### Campo mensaje (required)

| Elemento | ES | EN |
|---|---|---|
| Label | `Mensaje *` | `Message *` |
| Placeholder Entrevista | `Cuéntame del formato, la audiencia, la fecha y qué te gustaría abordar.` | `Tell me about the format, audience, date, and what you'd like to cover.` |
| Placeholder STR | `Cuéntame de tu propiedad, tu objetivo y cualquier detalle relevante.` | `Tell me about your property, your goal, and any relevant details.` |
| Placeholder Tax Deed | `Cuéntame qué buscas: aprender, filtrar oportunidades específicas, etc.` | `Tell me what you're looking for — learning, filtering specific opportunities, etc.` |
| Placeholder Otro | `Cuéntame en qué puedo ayudarte.` | `Tell me how I can help.` |

### Consentimiento

| Elemento | ES | EN |
|---|---|---|
| Consent checkbox label | `Acepto que AnaMaría Morrison me contacte por email, WhatsApp o teléfono en relación a esta consulta. Sin spam, nunca.` | `I agree that AnaMaría Morrison may contact me by email, WhatsApp, or phone regarding this inquiry. No spam, ever.` |

### Botón submit y estado loading

| Elemento | ES | EN |
|---|---|---|
| Botón idle | `Enviar Mensaje` | `Send Message` |
| Botón loading | `Enviando...` | `Sending...` |

## 3.4.msg · Success / Error

### Success (tras 200 OK)

| Elemento | ES | EN |
|---|---|---|
| Icono | `✓` | `✓` |
| Título | `¡Mensaje recibido!` | `Message received!` |
| Body | `Te respondo en menos de 24 horas hábiles. Mientras tanto, sígueme en Instagram para más contenido.` | `I'll respond within 24 business hours. In the meantime, follow me on Instagram for more content.` |
| Link "enviar otro" | `Enviar otro mensaje` | `Send another message` |

### Errores del backend (mensaje global, sin inline por campo)

| Código HTTP | Trigger backend | ES | EN |
|---|---|---|---|
| 429 rate_limited | Excedió 5 req/min o 20 req/hora por IP hash | `Demasiadas solicitudes. Intenta de nuevo en un minuto.` | `Too many requests. Please try again in a minute.` |
| 400 invalid_input | Zod validation falló | `Revisa los campos: algún valor no es válido.` | `Please review the form — one or more fields are invalid.` |
| 500 internal_error | Fallback | `Ocurrió un error. Intenta de nuevo en unos minutos.` | `Something went wrong. Please try again in a few minutes.` |
| network fail | fetch throw | `Error de conexión. Verifica tu internet.` | `Connection error. Please check your internet.` |

**Validaciones inline por campo:** NO se implementan en este bloque. Se documenta como posible mejora futura fuera del scope de i18n. Comportamiento actual (mensaje global) se preserva.

## 3.4.aria · Aria-labels del formulario

| Elemento | ES | EN |
|---|---|---|
| Container form | `Formulario de contacto` | `Contact form` |
| Selector de interés (radio group) | `Selecciona el tipo de consulta` | `Select the type of inquiry` |
| Cerrar/cambiar selección | `Cambiar selección de interés` | `Change interest selection` |
| Success card role | `role="status" aria-live="polite"` | idem |
| Error banner role | `role="alert"` | idem |

## 3.4.pipeline · Confirmación de pipeline intacto

**Cero cambios técnicos en el backend.**

Solo se preserva. El flujo bilingüe se logra únicamente:
1. Frontend añade `locale: 'es' | 'en'` opcional al `payload` del POST a `/api/leads` (en F2/F6, NO ahora).
2. `saveLead` acepta ese campo como parte del `payload jsonb` flexible; si no viene, funciona como hoy.
3. `sendLeadNotification` inspecciona `locale` para añadir `[Lead · EN]` o `[Lead · ES]` al subject del email interno + fila `Language / Idioma`.

**Nada más cambia:** endpoint, schema zod strict, enum values, Supabase, honeypot, timing check, rate limit, dedup 5 min, RLS, compensación DELETE, consent append-only, logs sin PII sin secretos.

**Cero endpoint duplicado, cero contrato roto, cero regresión sobre PR #2 validado.**

---

## Consistencia con Bloques 1–2 aprobados

- ✅ `AnaMaría Morrison` en todo el copy (consent, aria, WhatsApp pre-fill, sidebar, opciones de interés que lo mencionan)
- ✅ `Tax Deed` / `Tax Deed Investing` (nomenclatura correcta)
- ✅ `Make My Property Perform` (opción 1 EN, coherente con Bloque 1 CTA aprobado)
- ✅ `The Host Circle` (Resources card 3, sin traducir)
- ✅ `Professional STR management` / `Professional property management` (área sidebar + labels de interés)
- ✅ Formulación prudente Tax Deed preservada (sin promesas de listados sin soporte)
- ✅ Cero placeholder de idioma faltante
- ✅ Card estructural "Más casos próximamente / More case studies coming" preservada

## Cero credenciales / cifras / claims nuevos

Verificado:
- Cero certificaciones nuevas
- Cero uso de `certified` como credencial
- Cero cifras de ROI, rentabilidad, ocupación
- Cero garantías de resultados
- Cero promesas de listados de títulos por condado sin soporte real de producto
- Cero adición de servicios que no existan
- Preservada exclusivamente la métrica 3× en el caso verificado de Case Studies
