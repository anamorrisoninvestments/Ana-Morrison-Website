# Bloque 2 · Copy aprobado

**Scope:** 3 páginas · About · Short-Term Rentals · Tax Deed Investing
**Estado:** aprobado por Ana con correcciones. Ver `i18n/COPY-BLOCK-1.md` para Partes 1–4 previas.

---

## Regla maestra de identidad

Nombre público obligatorio: **`AnaMaría Morrison`**
- Ana y María juntas, sin espacio
- María con tilde en la í
- Espacio antes de Morrison
- Idéntico en ES y EN
- Aplica a SEO titles, meta descriptions, OG, Twitter Cards, Schema.org (WebPage/WebSite/Person/Organization), aria-labels, alt text, breadcrumbs, copy visible, emails, formularios

Ver `i18n/BRAND-NAME.md` para reglas completas y `i18n/NAME-AUDIT-REPORT.md` para categorías A–F.

**Categoría F preservada sin cambios en scope PR #3-i18n:** `anamorrison.com`, emails funcionales, handles de redes, URL histórica de LinkedIn, repo GitHub, proyecto Vercel, archivos `public/images/anamaria-*.jpg`, slugs ES existentes.

---

## Regla de paridad total antes de activar i18n

`NEXT_PUBLIC_I18N_ENABLED=false` permanece durante F2, F3, F4, F5, F6, F7. Solo se activa en Preview durante F8, y en Producción solo tras autorización explícita de Ana.

Antes de esa activación deben existir y haber pasado la matriz de paridad (10 criterios de `i18n/F8-EXIT-CRITERIA.md`) para:

- Home ES/EN
- About ES/EN
- Short-Term Rentals ES/EN
- Tax Deed Investing ES/EN
- Case Studies ES/EN
- Resources ES/EN
- Contact ES/EN
- Blog landing ES/EN
- **Todos** los posts del blog ES/EN incluidos en el scope
- Privacy Policy ES/EN
- Cookie Policy ES/EN
- Terms of Use ES/EN
- Navbar
- Footer
- LocaleSwitcher
- Formularios
- Success/error/loading states
- Consent banner y modal
- Breadcrumbs
- Sitemap
- Metadata
- Canonical
- hreflang bidireccional
- Open Graph
- Schema.org con `inLanguage` correcto
- Aria-labels y accesibilidad

**No se admite ninguna celda en `pending`, `placeholder`, `Spanish-only`, `coming soon` o `post-merge`.** Cero excepciones.

---

# 2.1 · About page

**Rutas:** ES `/sobre-mi` · EN `/en/about`

## 2.1.M · Metadata / SEO

| Campo | ES | EN |
|---|---|---|
| `<title>` | `Sobre AnaMaría Morrison \| Inversión Inmobiliaria & STR` | `About AnaMaría Morrison \| Real Estate & STR` |
| Meta description | `AnaMaría Morrison — Real Estate Investor & Strategist. 9+ años transformando propiedades en activos rentables a través de alquiler a corto plazo y Tax Deed. Operaciones en 4 países.` | `AnaMaría Morrison — Real Estate Investor & Strategist. 9+ years turning properties into high-performing assets through short-term rentals and Tax Deed. Operations across 4 countries.` |
| OG title | `Sobre AnaMaría Morrison` | `About AnaMaría Morrison` |
| OG description | `9+ años en alquileres a corto plazo, administración profesional y Tax Deed. Operaciones en 4 países.` | `9+ years in short-term rentals, professional property management, and Tax Deed. Operations across 4 countries.` |
| Canonical | `https://anamorrison.com/sobre-mi` | `https://anamorrison.com/en/about` |
| hreflang | bidireccional es-US ↔ en-US · x-default → ES | idem |
| Schema.org BreadcrumbList items | `Inicio · Sobre AnaMaría Morrison` | `Home · About AnaMaría Morrison` |
| Schema.org WebPage inLanguage | `es-US` | `en-US` |

## 2.1.B · Breadcrumbs

| Elemento | ES | EN |
|---|---|---|
| Root | `Inicio` | `Home` |
| Página actual | `Sobre Ana` | `About Ana` |

## 2.1.H · Hero

| Elemento | ES | EN |
|---|---|---|
| Eyebrow | `AnaMaría Morrison · Real Estate Investor & Strategist` | `AnaMaría Morrison · Real Estate Investor & Strategist` |
| Headline (marfil) | `Inversionista inmobiliaria y estratega en` | `Real estate investor and strategist in` |
| Highlight 1 (dorado + itálica) | `alquileres a corto plazo` | `short-term rentals` |
| Conector | `y` | `and` |
| Highlight 2 (azul + itálica) | `Tax Deed` | `Tax Deed` |
| Subheadline | `9+ años transformando propiedades en activos rentables. Operaciones en 4 países, portafolio inmobiliario multimillonario y formación especializada en análisis de propiedades y subastas Tax Deed.` | `9+ years turning properties into high-performing assets. Operations across 4 countries, a multi-million-dollar real estate portfolio, and specialized training in Tax Deed property and title analysis.` |
| CTA primario | `Trabaja conmigo` | `Work With Me` |
| Aria-label CTA primario | `Trabaja conmigo · Ir a Contacto` | `Work with AnaMaría Morrison` |
| CTA secundario | `Ver casos de éxito` | `See Case Studies` |
| Alt foto | `AnaMaría Morrison — Real Estate Investor & Strategist` | `AnaMaría Morrison — Real Estate Investor & Strategist` |

## 2.1.S1 · Sección Historia de Origen

| Elemento | ES | EN |
|---|---|---|
| Eyebrow | `Historia de Origen` | `Origin Story` |
| Headline línea 1 (marfil) | `De una primera propiedad a un` | `From a first property to an` |
| Highlight (dorado + itálica) | `portafolio operativo` | `operating portfolio` |
| P1 | `Compré mi primera propiedad sobre planos a los 22 años. Después de recibirla en 2016, la mantuve inicialmente en renta tradicional. En junio de 2017, ya viviendo en Estados Unidos, la transformé en un alquiler a corto plazo y comencé a administrarla remotamente. Esa experiencia se convirtió en el punto de partida de una trayectoria internacional en hospitalidad, administración de propiedades e inversión inmobiliaria.` | `I bought my first property off-plan at 22, in pre-construction. Once it was delivered in 2016, I first operated it as a long-term rental. In June 2017, already living in the United States, I transitioned it to a short-term rental and began managing it remotely. That experience became the starting point of an international path in hospitality, property management, and real estate investing.` |
| P2 | `Desde 2023 he gestionado operaciones en Estados Unidos, México, Venezuela y Colombia. En 2025 amplié mi formación en análisis de títulos y propiedades Tax Deed y fundé The Host Circle para compartir sistemas, experiencia práctica y estrategias de rentabilidad inmobiliaria.` | `Since 2023 I've managed operations across the United States, Mexico, Venezuela, and Colombia. In 2025 I expanded my specialized training in Tax Deed title and property analysis, and founded The Host Circle to share systems, hands-on experience, and real estate performance strategies.` |

**Cronología preservada:** compra 22 años en pre-construction → entrega 2016 → long-term rental → junio 2017 STR remoto → 2023 expansión → 2025 Tax Deed training + Host Circle.

## 2.1.S2 · Timeline profesional

| Elemento | ES | EN |
|---|---|---|
| Eyebrow | `Trayectoria Profesional` | `Professional Timeline` |
| Headline línea 1 (marfil) | `Línea de` | `A` |
| Highlight (dorado + itálica) | `tiempo` | `timeline` |

### 7 eventos del timeline

| # | ES `year` | EN `year` | ES `title` | EN `title` | ES `description` | EN `description` |
|---|---|---|---|---|---|---|
| 1 | `2012–2013` | `2012–2013` | `Primera inversión inmobiliaria` | `First real estate investment` | `Adquisición de la primera propiedad en Colombia sobre planos, en etapa de preconstrucción, a los 22 años.` | `Acquired first property in Colombia off-plan, in pre-construction, at age 22.` |
| 2 | `2016` | `2016` | `Entrega de la primera propiedad` | `First property delivered` | `Tras aproximadamente cuatro años de construcción, la propiedad es entregada y destinada inicialmente al modelo de renta tradicional.` | `After roughly four years of construction, the property is delivered and initially operated under a long-term rental model.` |
| 3 | `Marzo 2017` | `March 2017` | `Migración a Estados Unidos` | `Move to the United States` | `Traslado a Estados Unidos mientras la propiedad en Colombia continúa operando bajo renta tradicional.` | `Relocation to the United States while the Colombia property continues operating as a long-term rental.` |
| 4 | `Junio 2017` | `June 2017` | `Transición al alquiler a corto plazo` | `Transition to short-term rental` | `Transformación de la propiedad al modelo STR, con administración remota desde Estados Unidos. Punto de partida de la trayectoria profesional en hospitalidad y alquiler a corto plazo.` | `Property transformed into a short-term rental, managed remotely from the United States. Starting point of a professional path in hospitality and short-term rentals.` |
| 5 | `2023` | `2023` | `Expansión internacional de operaciones` | `International expansion of operations` | `Administración simultánea de propiedades de alquiler a corto plazo en Estados Unidos, México y Venezuela, además de la operación continuada en Colombia.` | `Simultaneous management of short-term rental properties across the United States, Mexico, and Venezuela, alongside continued operations in Colombia.` |
| 6 | `2025` | `2025` | `Formación especializada en Tax Deed` | `Specialized training in Tax Deed` | `Formación especializada en análisis de títulos y oportunidades Tax Deed con Marcos Jacobs, inversionista brasileño radicado en Estados Unidos y especialista en subastas del condado.` | `Specialized training in Tax Deed title and opportunity analysis with Marcos Jacobs, a Brazilian investor based in the United States who specializes in county auctions.` |
| 7 | `2025` | `2025` | `Fundación de The Host Circle` | `Founding of The Host Circle` | `Creación de The Host Circle como plataforma educativa para formar propietarios, inversionistas y operadores en alquileres a corto plazo, hospitalidad y creación de sistemas.` | `Launch of The Host Circle as an educational platform to train property owners, investors, and operators in short-term rentals, hospitality, and systems building.` |

**Formulación prudente Tax Deed preservada:** "Specialized training" — no "certified".

## 2.1.S3 · Áreas de Experiencia (6 cards)

| Elemento | ES | EN |
|---|---|---|
| Eyebrow | `Áreas de Experiencia` | `Areas of Expertise` |
| Headline (marfil, sin highlight) | `Áreas de Experiencia` | `Areas of Expertise` |

| # | ES `area` | EN `area` | ES `detail` | EN `detail` |
|---|---|---|---|---|
| 1 | `Alquiler a Corto Plazo` | `Short-Term Rentals` | `Estrategia, diseño, operación y automatización` | `Strategy, design, operations, and automation` |
| 2 | `Administración Profesional` | `Professional Property Management` | `Co-hosting, arbitraje y modelo propietario` | `Co-hosting, arbitrage, and owner-operator model` |
| 3 | `Tax Deed` | `Tax Deed` | `Análisis de títulos, filtros y oportunidades por condado` | `Title analysis, filtering, and county-level opportunities` |
| 4 | `Adquisición Inmobiliaria` | `Real Estate Acquisition` | `Estrategia de portafolio y evaluación de activos` | `Portfolio strategy and asset evaluation` |
| 5 | `Automatización con IA` | `AI-Driven Automation` | `Sistemas replicables para operar múltiples propiedades` | `Repeatable systems for operating multiple properties` |
| 6 | `Revenue Management` | `Revenue Management` | `Pricing dinámico y optimización de ingresos` | `Dynamic pricing and income optimization` |

## 2.1.S4 · Filosofía de Inversión (4 cards)

| Elemento | ES | EN |
|---|---|---|
| Eyebrow | `Filosofía de Inversión` | `Investment Philosophy` |
| Headline línea 1 (marfil) | `Cómo` | `How I` |
| Highlight (dorado + itálica) | `pienso` | `think` |
| Headline línea 2 (marfil) | `el inmobiliario` | `about real estate` |

| # | ES `title` | EN `title` | ES `text` | EN `text` |
|---|---|---|---|---|
| 1 | `Adquirir con criterio` | `Acquire with judgment` | `Comprar correctamente es tan importante como saber operar. Cada propiedad requiere análisis previo real, no impulsos.` | `Buying correctly matters as much as knowing how to operate. Every property demands real prior analysis — not impulse.` |
| 2 | `Sistemas antes que esfuerzo` | `Systems before effort` | `La rentabilidad sostenible viene de procesos, automatización y estándares. No de trabajar más horas.` | `Sustainable performance comes from processes, automation, and standards — not from working more hours.` |
| 3 | `Datos, no promesas` | `Data, not promises` | `Cada decisión de inversión debe apoyarse en números verificables, no en optimismo o storytelling.` | `Every investment decision has to rest on verifiable numbers — not on optimism or storytelling.` |
| 4 | `Educación honesta` | `Honest education` | `Hablar de riesgos reales, disclaimers y debida diligencia importa tanto como hablar del retorno.` | `Talking about real risks, disclaimers, and due diligence matters as much as talking about returns.` |

## 2.1.S5 · Mercados

| Elemento | ES | EN |
|---|---|---|
| Eyebrow card | `Mercados con Operación o Experiencia` | `Markets with Operations or Experience` |
| País 1 | `Estados Unidos` | `United States` |
| País 2 | `México` | `Mexico` |
| País 3 | `Colombia` | `Colombia` |
| País 4 | `Venezuela` | `Venezuela` |

## 2.1.S6 · CTA final About

| Elemento | ES | EN |
|---|---|---|
| Headline línea 1 | `¿Empezamos a trabajar en tu` | `Ready to start working on your` |
| Highlight (dorado + itálica) | `próximo activo?` | `next asset?` |
| Subtítulo | `Elige la opción que corresponde a tu momento y hablemos.` | `Pick the path that fits where you are — and let's talk.` |
| CTA 1 (dorado) | `Rentabilizar una propiedad` | `Make My Property Perform` |
| CTA 2 (azul) | `Explorar Tax Deed` | `Explore Tax Deed Investing` |

---

# 2.2 · Short-Term Rentals page

**Rutas:** ES `/alquileres-a-corto-plazo` · EN `/en/short-term-rentals`

## 2.2.M · Metadata / SEO

| Campo | ES | EN |
|---|---|---|
| `<title>` | `Alquileres a Corto Plazo \| AnaMaría Morrison` | `Short-Term Rentals \| AnaMaría Morrison` |
| Meta description | `Diagnóstico, transformación, lanzamiento y administración profesional de propiedades de alquiler a corto plazo. Estrategia, sistemas y operación de alto nivel.` | `Property assessment, transformation, launch, and professional management for short-term rentals. Strategy, systems, and high-level operations.` |
| OG title | `Short-Term Rental Strategy \| AnaMaría Morrison` | `Short-Term Rental Strategy \| AnaMaría Morrison` |
| OG description | igual meta description ES | igual meta description EN |
| Canonical | `https://anamorrison.com/alquileres-a-corto-plazo` | `https://anamorrison.com/en/short-term-rentals` |
| hreflang | bidireccional | idem |
| Schema.org WebPage inLanguage | `es-US` | `en-US` |
| Schema.org Service (opcional) | `Short-Term Rental Strategy & Management` | idem |

## 2.2.B · Breadcrumbs

| Elemento | ES | EN |
|---|---|---|
| Root | `Inicio` | `Home` |
| Página actual | `Alquileres a Corto Plazo` | `Short-Term Rentals` |

## 2.2.H · Hero

| Elemento | ES | EN |
|---|---|---|
| Eyebrow | `Para Propietarios · Short-Term Rental Strategy` | `For Property Owners · Short-Term Rental Strategy` |
| Headline línea 1 (marfil) | `Convierte tu propiedad en un` | `Turn your property into a` |
| Highlight (dorado + itálica) | `activo rentable` | `high-performing asset` |
| Headline línea 2 (marfil) | `de alquiler a corto plazo.` | `in short-term rentals.` |
| Subheadline | `Diagnóstico, transformación, lanzamiento, automatización y administración profesional de propiedades de alquiler a corto plazo — con estrategia, sistemas y operación de alto nivel.` | `Property assessment, transformation, launch, automation, and professional property management for short-term rentals — with strategy, systems, and high-level operations.` |
| CTA primario | `Quiero rentabilizar mi propiedad` | `Make My Property Perform` |
| Aria-label CTA | `Quiero rentabilizar mi propiedad · contactar` | `Make my property perform · contact AnaMaría Morrison` |

## 2.2.S1 · Beneficios (título + 7 items)

| Elemento | ES | EN |
|---|---|---|
| Headline | `Qué obtienes al trabajar conmigo` | `What you get when you work with me` |

| # | ES | EN |
|---|---|---|
| 1 | `Mayor rentabilidad potencial` | `Higher income potential` |
| 2 | `Menos carga operativa` | `Less operational load` |
| 3 | `Protección del activo` | `Asset protection` |
| 4 | `Mejor experiencia del huésped` | `Better guest experience` |
| 5 | `Operación profesional y estandarizada` | `Professional, standardized operations` |
| 6 | `Visibilidad y control con reportes` | `Visibility and control through reporting` |
| 7 | `Sistemas y automatización con IA` | `AI-driven systems and automation` |

## 2.2.S2 · Proceso (eyebrow + headline + 8 steps)

| Elemento | ES | EN |
|---|---|---|
| Eyebrow | `Cómo Trabajamos` | `How We Work Together` |
| Headline línea 1 (marfil) | `De propiedad ociosa a` | `From an idle property to an` |
| Highlight (dorado + itálica) | `activo operativo` | `operating asset` |

### 8 pasos del proceso

| # | ES `t` (título) | EN `title` | ES `d` (descripción) | EN `description` |
|---|---|---|---|---|
| 01 | `Análisis de viabilidad` | `Viability analysis` | `Estudio de mercado, demanda y regulación local antes de invertir en preparación.` | `Market, demand, and local regulation review before investing in preparation.` |
| 02 | `Estrategia del activo` | `Asset positioning` | `Definición de posicionamiento, huésped ideal, pricing base y estrategia de canal.` | `Defining positioning, ideal guest, base pricing, and channel strategy.` |
| 03 | `Diseño y preparación` | `Design & setup` | `Amoblado, decoración funcional, fotografía profesional y experiencia diferenciada.` | `Furnishing, functional decor, professional photography, and a differentiated guest experience.` |
| 04 | `Lanzamiento en plataformas` | `Multi-platform launch` | `Publicación optimizada en Airbnb, Booking y otros canales estratégicos.` | `Optimized listings on Airbnb, Booking, and other strategic channels.` |
| 05 | `Optimización del listing` | `Listing optimization` | `Mejora continua de título, descripción, fotos, reglas y respuestas automáticas.` | `Continuous improvement of title, description, photos, house rules, and automated responses.` |
| 06 | `Automatización` | `Automation` | `IA y sistemas para mensajería, códigos, limpieza, mantenimiento y reseñas.` | `AI and systems for messaging, access codes, cleaning, maintenance, and reviews.` |
| 07 | `Revenue management` | `Revenue management` | `Ajuste dinámico de precios y estrategias temporadas para maximizar ingresos.` | `Dynamic pricing adjustments and seasonal strategies to maximize income.` |
| 08 | `Administración profesional` | `Professional property management` | `Operación completa mientras el propietario recibe reportes claros y control real.` | `End-to-end operations while the owner receives clear reporting and real control.` |

## 2.2.S3 · CTA final STR

| Elemento | ES | EN |
|---|---|---|
| Headline línea 1 (marfil) | `¿Tu propiedad ya está lista para` | `Is your property ready to` |
| Highlight (dorado + itálica) | `producir` | `produce` |
| Headline línea 2 (marfil) | `?` | `?` |
| Subtítulo | `Cuéntame de tu propiedad y evaluemos juntos su potencial.` | `Tell me about your property and let's evaluate its potential together.` |
| CTA (dorado) | `Solicitar diagnóstico` | `Request a Property Assessment` |

---

# 2.3 · Tax Deed Investing page

**Rutas:** ES `/tax-deed` · EN `/en/tax-deed-investing`

## 2.3.M · Metadata / SEO

| Campo | ES | EN |
|---|---|---|
| `<title>` | `Tax Deed \| Inversión Inmobiliaria vía Subastas \| AnaMaría Morrison` | `Tax Deed Investing \| Real Estate Through County Auctions \| AnaMaría Morrison` |
| Meta description | `Educación, análisis y herramientas para identificar oportunidades Tax Deed. Aprende a evaluar propiedades antes de participar en subastas del condado.` | `Education, analysis, and tools to identify Tax Deed opportunities. Learn how to evaluate properties before you bid at a county auction.` |
| OG title | igual `<title>` ES | igual `<title>` EN |
| OG description | igual meta description ES | igual meta description EN |
| Canonical | `https://anamorrison.com/tax-deed` | `https://anamorrison.com/en/tax-deed-investing` |
| hreflang | bidireccional + redirect defensivo `/en/tax-deed → /en/tax-deed-investing` | idem |
| Schema.org WebPage inLanguage | `es-US` | `en-US` |

## 2.3.B · Breadcrumbs

| Elemento | ES | EN |
|---|---|---|
| Root | `Inicio` | `Home` |
| Página actual | `Tax Deed` | `Tax Deed Investing` |

## 2.3.H · Hero

| Elemento | ES | EN |
|---|---|---|
| Eyebrow | `Para Inversionistas · Tax Deed & Strategic Acquisition` | `For Investors · Tax Deed & Strategic Acquisition` |
| Headline línea 1 (marfil) | `Identifica` | `Spot` |
| Highlight (azul + itálica) | `oportunidades inmobiliarias` | `real estate opportunities` |
| Headline línea 2 (marfil) | `antes de la subasta.` | `before the auction.` |
| Subheadline | `Educación, análisis y herramientas para inversionistas que buscan adquirir propiedades a través de subastas Tax Deed del condado con debida diligencia real.` | `Education, analysis, and tools for investors looking to acquire properties through county Tax Deed auctions — with real due diligence.` |
| CTA primario | `Quiero explorar Tax Deed` | `Explore Tax Deed Investing` |

## 2.3.S1 · Qué es una subasta Tax Deed

| Elemento | ES | EN |
|---|---|---|
| Headline línea 1 (marfil) | `¿Qué es una` | `What is a` |
| Highlight (azul + itálica) | `subasta Tax Deed` | `Tax Deed auction` |
| Headline línea 2 (marfil) | `?` | `?` |
| Body | `Es un mecanismo por el cual el condado pone en subasta el título de propiedades cuyos dueños dejaron de pagar impuestos. El inversionista puede adquirir la propiedad —no solo la deuda— siguiendo el proceso del condado.` | `It's a mechanism in which the county auctions the title of properties whose owners stopped paying property taxes. The investor can acquire the property itself — not just the debt — by following the county's process.` |
| Nota diferencial | `En una subasta Tax Deed, el adjudicatario puede adquirir la propiedad en lugar de comprar únicamente la deuda tributaria. Los derechos adquiridos, procedimientos, gravámenes que puedan subsistir y requisitos de título varían según el estado y el condado.` | `With a Tax Deed sale, the winning bidder may acquire ownership of the property rather than purchasing only the tax debt. The exact rights, procedures, surviving interests, and title requirements vary by state and county.` |

## 2.3.S2 · Filtros y Riesgos (columnas paralelas)

### Columna A · Filtros de análisis

| Elemento | ES | EN |
|---|---|---|
| Eyebrow | `Cómo Ayudo` | `How I Help` |
| Headline | `Filtros de análisis` | `Analysis filters` |

| # | ES | EN |
|---|---|---|
| 1 | `Investigación de oportunidades por condado` | `County-level opportunity sourcing` |
| 2 | `Filtro preliminar de títulos disponibles` | `Preliminary title screening` |
| 3 | `Identificación de riesgos legales` | `Legal risk assessment` |
| 4 | `Análisis del estado físico del inmueble` | `Physical condition review of the property` |
| 5 | `Estimación de costos posteriores` | `Post-acquisition cost estimation` |
| 6 | `Evaluación de estrategias de salida` | `Exit strategy analysis` |
| 7 | `Educación estructurada para inversionistas` | `Structured investor education` |

### Columna B · Riesgos que debes considerar

| Elemento | ES | EN |
|---|---|---|
| Eyebrow | `Riesgos que debes considerar` | `Risks you need to consider` |
| Headline | `La debida diligencia es esencial` | `Due Diligence Is Essential` |

| # | ES | EN |
|---|---|---|
| 1 | `Cargas o gravámenes remanentes sobre el título` | `Remaining liens or encumbrances on the title` |
| 2 | `Estado desconocido del inmueble hasta la inspección` | `Unknown property condition until inspection` |
| 3 | `Diferencias regulatorias entre estados y condados` | `Regulatory differences between states and counties` |
| 4 | `Costos de posesión y rehabilitación` | `Holding and rehab costs` |
| 5 | `Tiempos legales variables según el proceso` | `Variable legal timelines depending on the process` |

## 2.3.S3 · Disclaimer

| Elemento | ES | EN |
|---|---|---|
| Eyebrow | `Aviso Importante` | `Important Notice` |
| Body | `El contenido de esta página es exclusivamente educativo. No constituye asesoría legal, financiera ni tributaria. Toda inversión implica riesgos y cada inversionista debe realizar su propia debida diligencia. Las reglas y procesos pueden variar según el estado y el condado. Los resultados anteriores no garantizan resultados futuros.` | `The content of this page is educational in nature. It does not constitute legal, financial, or tax advice. Every investment involves risk, and every investor must conduct their own due diligence. Rules and processes may vary by state and county. Past results do not guarantee future results.` |

## 2.3.S4 · CTA final Tax Deed

| Elemento | ES | EN |
|---|---|---|
| Headline línea 1 (marfil) | `¿Quieres analizar oportunidades` | `Ready to analyze` |
| Highlight (azul + itálica) | `reales` | `real` |
| Headline línea 2 (marfil) | `?` | `opportunities?` |
| Subtítulo | `Solicita información sobre Tax Deed o agenda una conversación estratégica.` | `Request Tax Deed information or schedule a strategy conversation.` |
| CTA (azul) | `Solicitar información` | `Request Information` |

---

## Consistencia con Partes 1–4 aprobadas

- ✅ `AnaMaría Morrison` en todas las apariciones del nombre
- ✅ `Tax Deed Investing` (título de página, ruta, CTA)
- ✅ `Tax Deed & Strategic Acquisition` (eyebrow Hero Tax Deed EN)
- ✅ `Short-Term Rental Strategy` (título STR page + Areas of Expertise)
- ✅ `Professional property management` (Areas of Expertise + paso 08 STR)
- ✅ `Make My Property Perform` (STR Hero CTA + About CTA1)
- ✅ `Explore Tax Deed Investing` (Tax Deed Hero CTA + About CTA2)
- ✅ `Request a Property Assessment` (STR CTA final)
- ✅ `Specialized training in Tax Deed analysis` (About Hero + timeline evento 6)

## Cero credenciales / cifras / claims nuevos

Verificado en las 3 páginas:
- Ninguna certificación nueva mencionada
- Ninguna palabra `certified` usada como credencial
- Cero cifras de ROI, rentabilidad, ocupación, ingresos esperados
- Cero garantías de resultados
- Cero promesas de productos o listados curados que no existen
- Formulaciones absolutas eliminadas (ver §2.3.S1)
- Cronología About preservada correctamente
