# Bloque 1 · Copy para aprobación

**Alcance:** Navbar · Footer · Home completa · LocaleSwitcher · BilingualSuggestionBanner

Formato por sección:
- Texto ES actual (referencia)
- Propuesta EN
- CTA (si aplica)
- SEO title
- SEO meta description
- Ruta ES · Ruta EN

---

## 1.1 · Navbar

**Ruta ES / EN:** aparece en todas las páginas.

### 1.1.1 · Logo + descriptor bajo el nombre

| Elemento | ES actual | Propuesta EN |
|---|---|---|
| Nombre visible | `Ana Morrison` | `Ana Morrison` (nombre propio, no traducir) |
| Descriptor | `STR & Tax Deed Strategist` | `STR & Tax Deed Strategist` (bilingüe intencional, se conserva) |

### 1.1.2 · Enlaces de menú

| # | ES actual | Propuesta EN | Ruta ES | Ruta EN |
|---|---|---|---|---|
| 1 | `Inicio` | `Home` | `/` | `/en` |
| 2 | `Sobre Ana` | `About Ana` | `/sobre-mi` | `/en/about` |
| 3 | `Alquileres a Corto Plazo` | `Short-Term Rentals` | `/alquileres-a-corto-plazo` | `/en/short-term-rentals` |
| 4 | `Tax Deed` | `Tax Deed Investing` | `/tax-deed` | `/en/tax-deed-investing` |
| 5 | `Casos de Éxito` | `Case Studies` | `/casos-de-exito` | `/en/case-studies` |
| 6 | `Recursos` | `Resources` | `/recursos` | `/en/resources` |
| 7 | `Contacto` | `Contact` | `/contacto` | `/en/contact` |

### 1.1.3 · CTA principal

| ES actual | Propuesta EN | Acción |
|---|---|---|
| `Trabaja Conmigo` | `Work With Me` | Link a `/contacto` / `/en/contact` |

**Aria-label del CTA (explícito, no depende del texto visible):**

| Idioma | aria-label |
|---|---|
| ES | `Trabaja conmigo` |
| EN | `Work with Ana Morrison` |

### 1.1.4 · Selector de idioma dentro del Navbar

Ver §1.4 (LocaleSwitcher).

---

## 1.2 · Footer

Sección aparece en todas las páginas. Estructura actual:
- Newsletter bar
- Brand + tagline + redes sociales
- Nav (links internos)
- Contact
- Enlaces legales (P2)
- Selector idioma (retirado en P2, se restaura aquí)
- Copyright

### 1.2.1 · Newsletter bar

| Elemento | ES actual | Propuesta EN |
|---|---|---|
| Eyebrow | `Newsletter gratuito` | `Free Newsletter` |
| Headline | `Estrategias de inversión que no comparto en redes.` | `Investment strategies I don't share on social media.` |
| Placeholder input | (heredado de `NewsletterForm`, fuera de scope PR #3-i18n si es simple email) | `Your email` |
| Botón submit | `Suscribirme` (según `NewsletterForm`) | `Subscribe` |

### 1.2.2 · Brand block

| Elemento | ES actual | Propuesta EN |
|---|---|---|
| Tagline | `No improvisas la riqueza. La construyes con visión, educación, crédito, estrategia, sistemas y acción constante.` | `Wealth isn't improvised. You build it with vision, education, credit, strategy, systems and consistent action.` |
| Alt text redes sociales | `IG`, `FB`, `TK`, `YT`, `LI` (letras) | Igual (letras técnicas neutras) |

### 1.2.3 · Nav (links internos)

| ES actual | Propuesta EN | Ruta ES | Ruta EN |
|---|---|---|---|
| `Sobre Ana` | `About Ana` | `/sobre-mi` | `/en/about` |
| `Alquileres STR` | `Short-Term Rentals` | `/alquileres-a-corto-plazo` | `/en/short-term-rentals` |
| `Tax Deed` | `Tax Deed Investing` | `/tax-deed` | `/en/tax-deed-investing` |
| `Casos de Éxito` | `Case Studies` | `/casos-de-exito` | `/en/case-studies` |
| `Recursos` | `Resources` | `/recursos` | `/en/resources` |
| `Blog` | `Blog` | `/blog` | `/en/blog` |
| `Contacto` | `Contact` | `/contacto` | `/en/contact` |

### 1.2.4 · Contact block

| Elemento | ES actual | Propuesta EN |
|---|---|---|
| Título | `Contacto` | `Contact` |
| Email label | (link directo) | `Email` |
| WhatsApp label | `WhatsApp: {number}` | `WhatsApp: {number}` |
| Botón CTA | `Trabaja Conmigo` | `Work With Me` |

### 1.2.5 · Enlaces legales

| ES actual | Propuesta EN | Ruta ES | Ruta EN |
|---|---|---|---|
| `Política de Privacidad` | `Privacy Policy` | `/politica-de-privacidad` | `/en/privacy-policy` |
| `Política de Cookies` | `Cookie Policy` | `/politica-de-cookies` | `/en/cookie-policy` |
| `Términos de Uso` | `Terms of Use` | `/terminos-de-uso` | `/en/terms-of-use` |
| `Preferencias de cookies` | `Cookie preferences` | (dispara modal) | (dispara modal) |

### 1.2.6 · Selector de idioma (nuevo · restaura la fila retirada en P2)

Ver §1.4 (LocaleSwitcher). Aparece como fila propia arriba del copyright.

### 1.2.7 · Copyright

| ES actual | Propuesta EN |
|---|---|
| `© {year} {name} · The Host Circle · Todos los derechos reservados.` | `© {year} {name} · The Host Circle · All rights reserved.` |

---

## 1.3 · Home (`/` · `/en`)

### 1.3.0 · Metadatos globales del Home (revisado)

**Rutas:** ES `/` · EN `/en`

**SEO title**
- ES actual: `Ana Morrison | Alquileres a Corto Plazo y Tax Deed`
- EN aprobado: `Ana Morrison | Short-Term Rentals & Tax Deed Investing`

**SEO meta description**
- ES actual: `Ana Morrison ayuda a inversionistas y propietarios a adquirir, transformar y rentabilizar propiedades mediante Tax Deed, alquileres a corto plazo, automatización y administración profesional.`
- EN aprobado: `Ana Morrison helps investors and property owners acquire, transform, and monetize real estate through tax deeds, short-term rentals, automation, and professional management.`

**Canonical + hreflang (regla que aplica también a cada par de páginas)**

| Elemento | Página ES | Página EN |
|---|---|---|
| `<link rel="canonical">` | `https://anamorrison.com/` | `https://anamorrison.com/en` |
| `<link rel="alternate" hreflang="es-US">` | `https://anamorrison.com/` | `https://anamorrison.com/` |
| `<link rel="alternate" hreflang="en-US">` | `https://anamorrison.com/en` | `https://anamorrison.com/en` |
| `<link rel="alternate" hreflang="x-default">` | `https://anamorrison.com/` | `https://anamorrison.com/` |

**Open Graph (regla que aplica también a cada par de páginas)**

| Campo | Página ES | Página EN |
|---|---|---|
| `og:type` | `website` | `website` |
| `og:locale` | `es_US` | `en_US` |
| `og:alternateLocale` | `en_US` | `es_US` |
| `og:url` | `https://anamorrison.com/` | `https://anamorrison.com/en` |
| `og:site_name` | `Ana Morrison` | `Ana Morrison` |
| `og:title` | SEO title ES | SEO title EN |
| `og:description` | `Adquiere, transforma y rentabiliza propiedades con estrategia, sistemas y operación profesional.` | `Acquire, transform and monetize properties with strategy, systems and professional operations.` |
| `og:image` | Ver §1.3.0.1 sobre asset por idioma | Ver §1.3.0.1 sobre asset por idioma |
| `og:image:alt` | `Ana Morrison` | `Ana Morrison` |

**Twitter cards** (equivalente a Open Graph)

| Campo | Página ES | Página EN |
|---|---|---|
| `twitter:card` | `summary_large_image` | `summary_large_image` |
| `twitter:title` | SEO title ES | SEO title EN |
| `twitter:description` | igual a `og:description` ES | igual a `og:description` EN |
| `twitter:image` | igual a `og:image` ES | igual a `og:image` EN |

### 1.3.0.1 · Regla de asset para Open Graph image

**Asset actual:** `/images/og-image.jpg` (1200×630).

Regla obligatoria antes de publicar EN:

- **Si el asset no contiene texto en español** → puede utilizarse el mismo asset provisionalmente en ambas versiones (`/` y `/en`).
- **Si el asset contiene texto en español** → obligatorio antes de F8:
  1. Crear versión ES `/images/og-image-es.jpg` (1200×630)
  2. Crear versión EN `/images/og-image-en.jpg` (1200×630) con texto traducido
  3. Cada página referencia el asset correspondiente a su idioma
- **Bajo ningún concepto** se publica la versión EN con texto en español visible.

**Acción pendiente antes de F8:** verificar el contenido textual del asset actual y decidir. Documentar la decisión en `i18n/PARITY-MATRIX.md`.

### 1.3.0.2 · Schema.org JSON-LD

En el `<head>` de cada versión del Home:

**Página ES `/`:**
- `WebPage` con `inLanguage: "es-US"`, `url: "https://anamorrison.com/"`, `name`, `description` (ES), `isPartOf` → `WebSite`
- `WebSite` con `inLanguage: "es-US"`, `url`, `name: "Ana Morrison"`, `potentialAction` SearchAction
- `Person` (Ana) con `description` en ES
- `Organization` (The Host Circle) con `description` en ES

**Página EN `/en`:**
- `WebPage` con `inLanguage: "en-US"`, `url: "https://anamorrison.com/en"`, `description` EN
- `WebSite` clonado con `inLanguage: "en-US"`
- `Person` con `description` EN
- `Organization` con `description` EN

### 1.3.1 · Hero

| Elemento | ES actual | Propuesta EN |
|---|---|---|
| Badge | `Ana Morrison · Real Estate Investor & Strategist` | `Ana Morrison · Real Estate Investor & Strategist` (mismo, ya está en inglés) |
| Título | `Adquiere propiedades estratégicamente y conviértelas en activos rentables.` | `Acquire properties strategically and turn them into profitable assets.` |
| Palabra destacada | `activos rentables` (dorado, itálica) | `profitable assets` (dorado, itálica) |
| Subtítulo | `Te ayudo a identificar oportunidades en Tax Deed, transformar propiedades y monetizarlas mediante alquileres a corto plazo con estrategia, sistemas y operación profesional.` | `I help you spot Tax Deed opportunities, transform properties and monetize them through short-term rentals with strategy, systems and professional operations.` |
| CTA primario | `Explorar cómo trabajar conmigo` | `Explore how to work with me` |
| CTA secundario | `Conocer mi experiencia` | `Learn about my experience` |
| Credenciales | `9+ años de experiencia · Operaciones en 4 países · Portafolio inmobiliario multimillonario · Formación especializada en análisis Tax Deed` | `9+ years of experience · Operations in 4 countries · Multi-million real estate portfolio · Specialized training in Tax Deed analysis` |
| Alt foto | `Ana Morrison — Real Estate Investor & STR / Tax Deed Strategist` | Igual (ya en inglés) |
| Scroll indicator | `Scroll` | `Scroll` |

### 1.3.2 · ValueProp (Propuesta única)

| Elemento | ES actual | Propuesta EN |
|---|---|---|
| Eyebrow | `Mi Propuesta` | `My Approach` |
| Título completo | `No se trata solamente de comprar una propiedad. Se trata de comprar correctamente y saber cómo rentabilizarla.` | `It's not just about buying a property. It's about buying correctly and knowing how to monetize it.` |
| Palabras destacadas (itálica dorada) | `comprar` / `rentabilizarla` | `buying` / `monetize it` |
| Body | `Muchas personas adquieren propiedades sin analizar las variables que determinan si el activo será realmente rentable:` | `Many people acquire properties without analyzing the variables that determine whether the asset will actually be profitable:` |
| Pills de riesgos | 1. Riesgos del título<br>2. Estado físico<br>3. Costos de rehabilitación<br>4. Regulaciones locales<br>5. Demanda del mercado<br>6. Estrategia de monetización<br>7. Operación posterior | 1. `Title risks`<br>2. `Physical condition`<br>3. `Rehabilitation costs`<br>4. `Local regulations`<br>5. `Market demand`<br>6. `Monetization strategy`<br>7. `Ongoing operations` |
| Cierre | `Mi enfoque conecta el análisis de adquisición con la estrategia de rentabilidad del activo.` | `My approach connects acquisition analysis with the asset's profitability strategy.` |

### 1.3.3 · Pillars (Dos Pilares)

| Elemento | ES actual | Propuesta EN |
|---|---|---|
| Eyebrow | `Dos Pilares · Un Ecosistema Inmobiliario` | `Two Pillars · One Real Estate Ecosystem` |
| Título | `Adquisición estratégica y operación profesional` | `Strategic acquisition and professional operation` |
| Destacado | `operación profesional` | `professional operation` |
| Subtítulo | `Todo lo que hago se conecta a dos disciplinas complementarias: comprar correctamente y operar con excelencia.` | `Everything I do connects to two complementary disciplines: buying correctly and operating with excellence.` |

**Pilar 1 (azul, Tax Deed)**

| Elemento | ES actual | Propuesta EN |
|---|---|---|
| Tag | `Pilar 01 · Para Inversionistas` | `Pillar 01 · For Investors` |
| Título | `Tax Deed & Acquisition Intelligence` | Igual |
| Descripción | `Investigación, análisis y estrategia para adquirir propiedades por debajo de valor a través de subastas del condado.` | `Research, analysis and strategy to acquire properties below market value through county auctions.` |
| Items | 1. Investigación de oportunidades<br>2. Filtros de títulos<br>3. Análisis preliminar<br>4. Identificación de riesgos<br>5. Estrategia de adquisición<br>6. Educación para inversionistas<br>7. Evaluación de estrategias de salida | 1. `Opportunity research`<br>2. `Title filtering`<br>3. `Preliminary analysis`<br>4. `Risk identification`<br>5. `Acquisition strategy`<br>6. `Investor education`<br>7. `Exit strategy evaluation` |
| CTA | `Explorar Tax Deed` | `Explore Tax Deed` |

**Pilar 2 (dorado, STR)**

| Elemento | ES actual | Propuesta EN |
|---|---|---|
| Tag | `Pilar 02 · Para Propietarios` | `Pillar 02 · For Property Owners` |
| Título | `Short-Term Rental Strategy` | Igual |
| Descripción | `Diagnóstico, transformación, lanzamiento y operación profesional de tu propiedad como activo de alquiler a corto plazo.` | `Diagnosis, transformation, launch and professional operation of your property as a short-term rental asset.` |
| Items | 1. Análisis de viabilidad<br>2. Estrategia del activo<br>3. Diseño y preparación<br>4. Lanzamiento en plataformas<br>5. Optimización del listing<br>6. Automatización<br>7. Revenue management<br>8. Administración profesional | 1. `Viability analysis`<br>2. `Asset strategy`<br>3. `Design and preparation`<br>4. `Platform launch`<br>5. `Listing optimization`<br>6. `Automation`<br>7. `Revenue management`<br>8. `Professional management` |
| CTA | `Explorar alquileres a corto plazo` | `Explore short-term rentals` |

### 1.3.4 · Method — Adquirir, Transformar y Rentabilizar™

| Elemento | ES actual | Propuesta EN |
|---|---|---|
| Eyebrow | `Método Propietario` | `Proprietary Method` |
| Título | `Método Adquirir, Transformar y Rentabilizar™` | `The Acquire, Transform & Monetize Method™` |
| Palabra destacada (dorado itálica) | `Adquirir, Transformar y Rentabilizar` | `Acquire, Transform & Monetize` |
| Subtítulo | `Un proceso de seis etapas que convierte una oportunidad inmobiliaria en un activo rentable y operable.` | `A six-stage process that turns a real estate opportunity into a profitable, operable asset.` |

**6 etapas**

| # | ES actual | Propuesta EN |
|---|---|---|
| 01 · Analizar | `Estudiar mercado, título, riesgos, regulaciones y demanda antes de mover capital.` | `Analyze` · `Study market, title, risks, regulations and demand before deploying capital.` |
| 02 · Adquirir | `Comprar correctamente vía subasta Tax Deed, adquisición directa o modelos alternativos.` | `Acquire` · `Buy correctly via Tax Deed auction, direct acquisition or alternative models.` |
| 03 · Transformar | `Rehabilitar, diseñar y preparar la propiedad para maximizar valor percibido y rentabilidad.` | `Transform` · `Rehab, design and prepare the property to maximize perceived value and profitability.` |
| 04 · Lanzar | `Publicar en plataformas con listing optimizado, fotografía profesional y pricing estratégico.` | `Launch` · `Publish on platforms with an optimized listing, professional photography and strategic pricing.` |
| 05 · Automatizar | `Sistemas, IA y procesos que sostienen la operación con mínima carga humana.` | `Automate` · `Systems, AI and processes that sustain operations with minimal human load.` |
| 06 · Rentabilizar | `Revenue management, optimización continua y escalamiento del portafolio.` | `Monetize` · `Revenue management, continuous optimization and portfolio scaling.` |

**Trademark note:** el símbolo `™` se preserva en EN. Si registras la marca en USPTO en algún momento, actualizar a `®` cuando corresponda.

### 1.3.5 · AboutSection (bloque About en home)

| Elemento | ES actual | Propuesta EN |
|---|---|---|
| Eyebrow | `Mi Historia` | `My Story` |
| Título | `Más que administrar propiedades, construyo oportunidades.` | `More than managing properties, I build opportunities.` |
| Palabras destacadas | `construyo oportunidades` | `build opportunities` |
| Párrafo 1 | `A los 22 años, adquirí mi primera propiedad en Colombia y la transformé de una renta tradicional a un modelo Airbnb, triplicando los ingresos. Ese momento cambió mi vida —y me mostró el poder real del alquiler a corto plazo.` | `At 22, I acquired my first property in Colombia and transformed it from a traditional long-term rental into an Airbnb model, tripling the income. That moment changed my life — and showed me the real power of short-term rentals.` |
| Párrafo 2 | `Hoy cuento con un portafolio inmobiliario valorado en varios millones de dólares, opero propiedades en 4 países, cuento con formación especializada en análisis de propiedades y subastas Tax Deed, y ayudo a inversionistas a replicar mi metodología a través de The Host Circle.` | `Today I have a multi-million dollar real estate portfolio, operate properties in 4 countries, hold specialized training in Tax Deed property and title analysis, and help investors replicate my methodology through The Host Circle.` |
| Quote | `"La riqueza no se improvisa. Se construye con visión, educación, crédito, estrategia, sistemas y acción constante."` | `"Wealth isn't improvised. It's built with vision, education, credit, strategy, systems and consistent action."` |
| Link "Lee mi historia" | `Lee mi historia completa →` | `Read my full story →` |
| Milestone 1 | `22 años` · `Primera propiedad adquirida en Colombia` | `Age 22` · `First property acquired in Colombia` |
| Milestone 2 | `Triplicó` · `Ingresos al pasar de renta tradicional a Airbnb` | `Tripled` · `Income by moving from traditional rental to Airbnb` |
| Milestone 3 | `9+ años` · `De experiencia en alquiler a corto plazo` | `9+ years` · `Of experience in short-term rentals` |
| Milestone 4 | `4 países` · `Operaciones en EE.UU., México, Colombia y Venezuela` | `4 countries` · `Operations in US, Mexico, Colombia and Venezuela` |
| Countries eyebrow | `Operaciones en` | `Operations in` |
| Country names | `Estados Unidos`, `México`, `Colombia`, `Venezuela` | `United States`, `Mexico`, `Colombia`, `Venezuela` |

### 1.3.6 · WaysToWork (Formas de Trabajar Conmigo)

| Elemento | ES actual | Propuesta EN |
|---|---|---|
| Eyebrow | `Formas de Trabajar Conmigo` | `Ways to Work With Me` |
| Título | `Tres caminos claros según tu momento` | `Three clear paths based on your moment` |
| Destacado | `tu momento` | `your moment` |

**Camino A · Inversionistas**

| Elemento | ES actual | Propuesta EN |
|---|---|---|
| Audiencia | `Para inversionistas` | `For investors` |
| Título | `Tax Deed Intelligence` | Igual |
| Descripción | `Educación, análisis y herramientas para identificar oportunidades y evaluar propiedades antes de participar en subastas del condado.` | `Education, analysis and tools to identify opportunities and evaluate properties before participating in county auctions.` |
| CTA | `Quiero explorar Tax Deed` | `I want to explore Tax Deed` |

**Camino B · Propietarios (destacado)**

| Elemento | ES actual | Propuesta EN |
|---|---|---|
| Audiencia | `Para propietarios` | `For property owners` |
| Título | `STR Strategy & Management` | Igual |
| Descripción | `Diagnóstico, transformación, lanzamiento, automatización y administración profesional de propiedades de alquiler a corto plazo.` | `Diagnosis, transformation, launch, automation and professional management of short-term rental properties.` |
| CTA | `Quiero rentabilizar mi propiedad` | `I want to monetize my property` |

**Camino C · Educación**

| Elemento | ES actual | Propuesta EN |
|---|---|---|
| Audiencia | `Para quienes desean aprender` | `For those who want to learn` |
| Título | `The Host Circle` | Igual |
| Descripción | `Formación práctica para construir y operar un negocio profesional de alquileres a corto plazo.` | `Practical training to build and operate a professional short-term rental business.` |
| CTA | `Conocer The Host Circle` | `Discover The Host Circle` |

### 1.3.7 · AuthoritySection (Autoridad Verificada)

| Elemento | ES actual | Propuesta EN |
|---|---|---|
| Eyebrow | `Autoridad Verificada` | `Verified Expertise` |
| Título | `Experiencia real en inversión y operación inmobiliaria` | `Real experience in real estate investing and operations` |
| Destacado | `inversión y operación inmobiliaria` | `real estate investing and operations` |

**4 pilares numéricos**

| # | ES actual | Propuesta EN |
|---|---|---|
| P1 | `9+` · `Años de experiencia` · `en alquileres a corto plazo` | `9+` · `Years of experience` · `in short-term rentals` |
| P2 | `4` · `Países` · `US · MX · CO · VE` | `4` · `Countries` · `US · MX · CO · VE` |
| P3 | `3` · `Roles` · `propietaria · administradora · inversionista` | `3` · `Roles` · `owner · operator · investor` |
| P4 | `Tax Deed` · `Formación especializada` · `análisis de títulos y oportunidades` | `Tax Deed` · `Specialized training` · `title and opportunity analysis` |

### 1.3.8 · CTASection final

| Elemento | ES actual | Propuesta EN |
|---|---|---|
| Eyebrow | `Tu Próximo Paso` | `Your Next Step` |
| Título línea 1 | `¿Tienes una propiedad` | `Do you own a property` |
| Título línea 2 | `o buscas tu próxima oportunidad de inversión?` | `or are you looking for your next investment opportunity?` |
| Destacado | `oportunidad de inversión?` | `investment opportunity?` |
| Subtítulo | `Elige el camino que corresponde a tu momento y hablemos.` | `Choose the path that matches your moment and let's talk.` |
| CTA 1 (dorado) | `Quiero rentabilizar una propiedad` | `I want to monetize a property` |
| CTA 2 (azul) | `Quiero explorar Tax Deed` | `I want to explore Tax Deed` |

---

## 1.4 · LocaleSwitcher

Componente reusable que aparece en Navbar (desktop + mobile menu) y Footer.

### 1.4.1 · Presentación visual y semántica

**Formato:** dos labels con separador visual `|`. Ambos labels siempre en su idioma nativo (`Español` y `English`), independientemente del idioma de la página.

**Ejemplo en ES (en `/`):**
```
Español | English
```
- `Español` = idioma **actual** · claramente seleccionado (ver §1.4.3) · **no clicable** · `aria-current="page"`
- `English` = idioma **alternativo** · clicable · color dorado · sin `aria-current`

**Ejemplo en EN (en `/en`):**
```
Español | English
```
- `Español` = idioma alternativo · clicable · color dorado
- `English` = idioma **actual** · claramente seleccionado · **no clicable** · `aria-current="page"`

### 1.4.2 · Copy exacto

Ambos labels aparecen **en su idioma nativo**, independientemente del idioma de la página. Estándar UX internacional.

| Elemento | ES (en `/`) | EN (en `/en`) |
|---|---|---|
| Label idioma español | `Español` | `Español` |
| Label idioma inglés | `English` | `English` |
| Aria-label del container | `Selector de idioma` | `Language selector` |
| Aria-label del link al otro idioma | `Cambiar idioma a inglés` | `Switch language to Spanish` |
| Atributo del elemento activo | `aria-current="page"` | `aria-current="page"` |

### 1.4.3 · Indicador visual del idioma activo (no depende solo de color)

El idioma actual **no** se muestra "apagado". Se distingue por **múltiples señales redundantes** que cumplen WCAG 1.4.1 (Uso del color):

1. **Peso de fuente:** activo `font-weight: 600`; inactivo `font-weight: 400`
2. **Color:** activo `#F7F3EC` (marfil brillante); inactivo `#C8A45D` (dorado, indica interactividad)
3. **Subrayado dorado bajo el activo:** `border-bottom: 2px solid #C8A45D` con `padding-bottom: 2px`
4. **Cursor:** activo `cursor: default`; inactivo `cursor: pointer`
5. **Semántica ARIA:** activo lleva `aria-current="page"`; inactivo es un `<Link>` normal
6. **Elemento HTML:** activo es un `<span>` no interactivo; inactivo es `<Link>`

Con estas 6 señales, un usuario con daltonismo o baja visión distingue el estado incluso ignorando el color.

### 1.4.4 · Comportamiento al hacer clic

1. Determinar la ruta equivalente en el otro idioma via `LOCALE_ROUTE_MAP` (§5.4 del PLAN.md)
2. Si existe la equivalencia → `router.push(equivalentPath)`
3. **Fallback (safety net):** si no existe la equivalencia (ej. después de F8 no debería ocurrir, pero se implementa por robustez), redirigir a la landing más cercana del otro idioma con toast **genérico** (no habla de "artículos"):

   | Idioma destino | Copy toast |
   |---|---|
   | EN | `This page is not available in Spanish yet. We'll take you to the closest available page.` |
   | ES | `Esta página aún no está disponible en inglés. Te llevaremos a la página disponible más cercana.` |

   Estrategia de "página más cercana": subir en el árbol de rutas hasta encontrar equivalencia. Ejemplos:
   - `/en/blog/some-slug` sin equivalencia → `/blog`
   - `/en/resources/some-guide` sin equivalencia → `/recursos`
   - `/en/some-orphan` sin equivalencia → `/` (home)

4. Escribir cookie `amc_lang=<locale>` con TTL 12 meses (hint para futuras visitas)

### 1.4.5 · Ubicaciones

- **Navbar desktop:** entre los links del menú y el CTA "Trabaja Conmigo / Work With Me"
- **Navbar mobile (menú desplegado):** fila propia debajo del CTA, arriba del último separador
- **Footer:** fila propia entre los enlaces legales y el copyright

---

## 1.5 · BilingualSuggestionBanner

Sugerencia no intrusiva de cambio de idioma. **Nunca redirige automáticamente.**

### 1.5.1 · Condiciones de aparición

Se muestra si se cumplen **todas** estas condiciones simultáneamente:

1. La URL actual tiene equivalente en el otro idioma según `LOCALE_ROUTE_MAP`
2. `Accept-Language` del navegador coincide con el otro idioma (ES en `/en/*` o EN en `/*` no-EN)
3. **NO** existe cookie `amc_lang` (el usuario aún no eligió idioma manualmente)
4. **NO** existe cookie `amc_lang_suggestion_dismissed` (no cerró la sugerencia previamente)
5. La ruta actual **NO** está en la lista de exclusiones (§1.5.2)

**Aparece en cualquier ruta pública** que tenga equivalente, no solo en `/` o `/en`.

### 1.5.2 · Rutas excluidas (donde nunca aparece)

- `/contacto` y `/en/contact`
- Cualquier ruta con un formulario abierto o flujo transaccional (futuras `/checkout`, `/apply`, etc.)
- Cualquier página con un modal crítico activo (detección: si el DOM contiene un elemento con `role="dialog"` y `aria-modal="true"` distinto del propio banner, el banner se suprime)

### 1.5.3 · Comportamiento de los botones

| Acción del usuario | Efecto | Cookie escrita | TTL |
|---|---|---|---|
| Click "View in English" / "Ver en español" | Navegar a la ruta equivalente en el otro idioma | `amc_lang=<idioma-elegido>` | 12 meses |
| Click "Continue in Spanish" / "Continuar en inglés" | Permanecer en la página actual · no sugerir cambio otra vez | `amc_lang=<idioma-actual>` | 12 meses |
| Click en la X del banner | Cerrar banner sin registrar preferencia de idioma | `amc_lang_suggestion_dismissed=1` | 30 días |
| Tecla `Escape` | Cerrar banner sin registrar preferencia de idioma | `amc_lang_suggestion_dismissed=1` | 30 días |

**Regla clave:** solo la interacción con los dos botones principales registra `amc_lang`. El cierre neutro (X o Escape) solo suprime la sugerencia por 30 días sin afectar la preferencia de idioma.

**El banner nunca redirige automáticamente.** El cambio de idioma requiere click explícito del usuario en el botón primario.

### 1.5.4 · Copy exacto

**En rutas ES (visitante con `Accept-Language: en-*`)**

| Elemento | Copy EN |
|---|---|
| Texto principal | `This site is also available in English.` |
| Botón primario | `View in English` |
| Botón secundario | `Continue in Spanish` |
| Aria-label cerrar (X) | `Close language suggestion` |

**En rutas EN (visitante con `Accept-Language: es-*`)**

| Elemento | Copy ES |
|---|---|
| Texto principal | `Este sitio también está disponible en español.` |
| Botón primario | `Ver en español` |
| Botón secundario | `Continuar en inglés` |
| Aria-label cerrar (X) | `Cerrar sugerencia de idioma` |

### 1.5.5 · Accesibilidad

- `role="dialog"` con `aria-labelledby` apuntando al texto principal
- Focus **NO** se atrapa dentro del banner (no bloquea navegación)
- Cierra con tecla `Escape`
- Botones con área tocable ≥ 44×44 px en móvil
- Contraste AA verificado sobre el fondo espresso
- `z-index` alto pero **inferior** al `ConsentBanner` (que tiene prioridad legal)
- Al aparecer, no roba el focus (evita interrumpir tecleado o navegación con teclado)

### 1.5.6 · No bloquea

- No cubre el CTA principal del hero
- No cubre el ConsentBanner (si ambos aparecen simultáneamente, ConsentBanner tiene prioridad de layout y semántica)
- No bloquea scroll ni clicks fuera de la card
- Cero cambios en el formulario, checkout futuro o cualquier flujo transaccional
- Se oculta automáticamente si el usuario abre un modal en la página (según §1.5.2)

---

## Pendiente de tu aprobación en este Bloque 1

1. Cada línea EN de las 8 secciones del Home
2. Nomenclatura de labels de LocaleSwitcher (`Español · English` en ambos idiomas)
3. Copy del BilingualSuggestionBanner
4. Comportamiento propuesto del banner (mostrar/ocultar/cookie)
5. Si prefieres modificar la ubicación del selector en Navbar/Footer

Marca cambios línea por línea o aprueba en bloque. Cuando digas *"Bloque 1 aprobado"* preparo Bloque 2 (About + Short-Term Rentals + Tax Deed).
