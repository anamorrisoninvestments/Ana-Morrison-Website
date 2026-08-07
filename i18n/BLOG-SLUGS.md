# Blog · Mapa de slugs ES ↔ EN para aprobación

**Total real de posts en `src/lib/blog-posts.ts`: 20** (no 21 — el conteo previo incluía la definición de tipo `slug: string;`).

## Criterios de propuesta

- **Slug EN natural, en inglés**, sin traducción literal. Optimizado para lectura y SEO EN.
- **Preservar palabras clave técnicas** que ya funcionan (`airbnb`, `tax-deed`, `brrrr`, `co-hosting`, `vrbo`, `booking`).
- **Longitud objetivo**: 3–6 palabras. Slugs largos se simplifican.
- **Guiones**, minúsculas, sin acentos, sin caracteres especiales.
- Si el slug ES ya es técnico y compatible con EN (ej. `tax-deed-que-es`), se propone equivalente natural EN sin forzar cambio si SEO ES ya está posicionado.
- **hreflang bidireccional** en cada par ES ↔ EN.
- **Sin redirects necesarios** porque los slugs EN son URLs nuevas (`/en/blog/*`); no reemplazan las ES. Los slugs ES quedan intactos.

## Base

- Canonical ES: `https://anamorrison.com/blog/<slug-es>`
- Canonical EN: `https://anamorrison.com/en/blog/<slug-en>`
- hreflang ES: `<link rel="alternate" hreflang="es-US" href="...blog/<slug-es>">`
- hreflang EN: `<link rel="alternate" hreflang="en-US" href="...en/blog/<slug-en>">`
- x-default: apunta a la ES

## Tabla propuesta

| # | Título ES | Slug ES | Título EN propuesto | Slug EN propuesto | Redirect necesario |
|---|---|---|---|---|---|
| 1 | ¿Qué es el Alquiler a Corto Plazo y Por Qué Es el Vehículo Más Poderoso para Generar Ingresos Pasivos? | `que-es-el-alquiler-a-corto-plazo` | What is a Short-Term Rental and Why It's the Most Powerful Vehicle for Passive Income | `what-is-a-short-term-rental` | No |
| 2 | Tax Deed: Qué Es y Cómo Comprar Propiedades al Condado a Precio de Subasta | `tax-deed-que-es` | Tax Deed: What It Is and How to Buy County Properties at Auction Prices | `what-is-a-tax-deed` | No |
| 3 | Las 5 Rutas para Crear Riqueza con el Alquiler a Corto Plazo | `5-rutas-riqueza-alquiler-corto-plazo` | The 5 Paths to Build Wealth Through Short-Term Rentals | `5-paths-to-wealth-with-short-term-rentals` | No |
| 4 | Cómo Empezar en Airbnb Sin Tener una Propiedad (Guía Práctica 2026) | `como-empezar-airbnb-sin-propiedad` | How to Start with Airbnb Without Owning a Property (2026 Practical Guide) | `how-to-start-airbnb-without-a-property` | No |
| 5 | Renta Tradicional vs Airbnb: ¿Cuál Genera Más Ingresos en 2026? | `diferencia-renta-tradicional-airbnb` | Traditional Rental vs Airbnb: Which Generates More Income in 2026? | `traditional-rental-vs-airbnb` | No |
| 6 | Libertad Financiera a Través de los Bienes Raíces: El Camino Real | `libertad-financiera-bienes-raices` | Financial Freedom Through Real Estate: The Real Path | `financial-freedom-through-real-estate` | No |
| 7 | Co-Hosting en Airbnb: Guía Completa para Comenzar a Gestionar Propiedades de Otros | `co-hosting-guia-completa` | Airbnb Co-Hosting: Complete Guide to Managing Other People's Properties | `airbnb-co-hosting-complete-guide` | No |
| 8 | Mujer Latina e Inversión Inmobiliaria: Rompiendo las Barreras para Construir Riqueza | `mujer-latina-inversion-inmobiliaria` | Latina Women in Real Estate Investing: Breaking Barriers to Build Wealth | `latina-real-estate-investors` | No |
| 9 | Cómo Optimizar tu Listing de Airbnb para Aparecer Primero y Reservar Más | `optimizar-listing-airbnb` | How to Optimize Your Airbnb Listing to Rank First and Book More | `how-to-optimize-your-airbnb-listing` | No |
| 10 | Crédito e Inversiones Inmobiliarias: Por Qué tu Score Crediticio Es tu Mayor Activo | `credito-e-inversiones-inmobiliarias` | Credit and Real Estate Investing: Why Your Credit Score Is Your Greatest Asset | `credit-and-real-estate-investing` | No |
| 11 | Automatización para Anfitriones: Cómo Gestionar 10 Propiedades en 2 Horas al Día | `automatizacion-airbnb` | Automation for Hosts: How to Manage 10 Properties in 2 Hours a Day | `airbnb-automation-for-hosts` | No |
| 12 | Diseño Interior para Airbnb: Cómo Crear un Espacio que Genera 5 Estrellas Constantemente | `diseño-interior-airbnb` | Airbnb Interior Design: How to Create a Space That Consistently Earns 5 Stars | `airbnb-interior-design` | No |
| 13 | Los Mejores Mercados de Airbnb en Florida para Invertir en 2026 | `mercados-airbnb-florida` | The Best Florida Airbnb Markets to Invest In in 2026 | `best-florida-airbnb-markets` | No |
| 14 | La Estrategia BRRRR Explicada: Buy, Rehab, Rent, Refinance, Repeat | `estrategia-brrrr-inmobiliaria` | The BRRRR Strategy Explained: Buy, Rehab, Rent, Refinance, Repeat | `brrrr-strategy-explained` | No |
| 15 | Los 10 Errores que Cometen los Inversionistas Inmobiliarios Principiantes (y Cómo Evitarlos) | `errores-inversionista-principiante` | The 10 Mistakes Beginner Real Estate Investors Make (and How to Avoid Them) | `beginner-real-estate-investor-mistakes` | No |
| 16 | Cómo usar el crédito inteligentemente para invertir en bienes raíces | `como-usar-el-credito-para-invertir-en-bienes-raices` | How to Use Credit Wisely to Invest in Real Estate | `using-credit-to-invest-in-real-estate` | No |
| 17 | Airbnb vs. Booking vs. VRBO: ¿Cuál plataforma usar para tu propiedad? | `airbnb-vs-booking-vs-vrbo-cual-plataforma-usar` | Airbnb vs Booking vs VRBO: Which Platform Should You Use? | `airbnb-vs-booking-vs-vrbo` | No |
| 18 | Caso real: cómo conseguí mi primer cliente de co-hosting en Miami | `caso-real-primera-propiedad-co-hosting-miami` | Real Case: How I Landed My First Co-Hosting Client in Miami | `miami-co-hosting-case-study` | No |
| 19 | Tax Deed en Florida: guía completa para principiantes | `tax-deed-florida-guia-completa-principiantes` | Tax Deed in Florida: The Complete Beginner's Guide | `florida-tax-deed-investing-beginners-guide` | No |
| 20 | Mentalidad de inversionista latina: cómo vencer el miedo al dinero | `mentalidad-inversionista-latina-como-vencer-el-miedo` | Latina Investor Mindset: How to Overcome the Fear of Money | `overcoming-money-fears-as-a-latina-investor` | No |

## Notas técnicas

- **Cero redirects necesarios ahora.** Todos los slugs EN son URLs nuevas bajo `/en/blog/*`. No colisionan con ES.
- Si en el futuro cambias un slug EN aprobado, se implementará redirect 301 desde el anterior al nuevo.
- La estructura de datos en `blog-posts.ts` necesita añadir campos EN opcionales sin romper compatibilidad ES:
  ```ts
  type BlogPost = {
    // existentes...
    slug: string;
    title: string;
    // ...
    en?: {
      slug: string;
      title: string;
      description: string;
      keywords: string[];
      content: string;
      // metaTitle, ogTitle, ogDescription si difieren del title/description
    };
  };
  ```
- `getPostBySlug(slug, locale)` resuelve al post correcto según idioma sin ambigüedad.

## Revisiones aplicadas por Ana

| # | Slug anterior | Slug aprobado | Motivo |
|---|---|---|---|
| 8 | `latina-women-in-real-estate-investing` | `latina-real-estate-investors` | Más conciso, palabra clave principal al final |
| 18 | `first-co-hosting-client-miami-case-study` | `miami-co-hosting-case-study` | Mercado (Miami) al inicio, tema en el medio, tipo al final |
| 19 | `tax-deed-florida-beginners-guide` | `florida-tax-deed-investing-beginners-guide` | Añade "investing" (intent SEO EN) y coloca "florida" al inicio |
| 20 | `latina-investor-mindset-fear-of-money` | `overcoming-money-fears-as-a-latina-investor` | Verbo de acción al inicio, más natural en EN |

Slugs no modificados (los 16 restantes): mantengo la propuesta original porque respetan naturalidad EN, orden de palabras clave y longitud objetivo. Ninguno requirió ajuste tras revisión.

## Decisión de ruta principal: `/en/tax-deed` vs `/en/tax-deed-investing`

**Recomendación final: cambiar a `/en/tax-deed-investing`.**

### Análisis SEO

| Query search volume EN estimado (relativo) | Match |
|---|---|
| `tax deed investing` | Alto |
| `tax deed investing florida` | Alto |
| `tax deed investing for beginners` | Medio-alto |
| `tax deed` solo | Ambiguo (mezcla usuarios buscando el documento legal, no la inversión) |

**"Tax deed" solo** captura búsquedas de:
- Investors buscando la estrategia (deseado)
- Property owners buscando qué hacer con un tax deed recibido (no target)
- Legal researchers estudiando el documento (no target)

**"Tax deed investing"** filtra desde la URL a la audiencia correcta.

### Análisis de claridad de marca

- La página `/tax-deed` en ES vende **el servicio Tax Deed & Acquisition Intelligence**, no explica el concepto legal
- El slug EN debe reflejar la propuesta de valor, no solo el término técnico
- Consistente con `/en/short-term-rentals` (descriptivo del servicio, no del inmueble)

### Impacto operativo

- Cero: no hay página `/en/tax-deed` en producción hoy (redirect 307 activo)
- El archivo se crea directamente como `src/app/en/tax-deed-investing/page.tsx`
- Redirect defensivo `/en/tax-deed → /en/tax-deed-investing` (301) por si alguien copia mal el slug o infiere del ES
- ES sigue como `/tax-deed` — asimetría intencional justificada por SEO EN

### Impacto en blog post #19

`florida-tax-deed-investing-beginners-guide` (recientemente aprobado) es coherente con `/en/tax-deed-investing` — refuerza el clúster semántico.

### Impacto en mapa de rutas

Actualizado en §2 del PLAN.md (mapa ES↔EN) y en la sección de mapa central de código (§5.4).

## Pendiente de tu aprobación

- ✅ / ✏️ Los 20 slugs EN (4 revisados aplicados, 16 originales conservados)
- ✅ / ✏️ Recomendación de cambiar `/en/tax-deed` → `/en/tax-deed-investing`
- Si prefieres mantener `/en/tax-deed` por simetría ES, dilo — es implementable pero pierde optimización SEO EN
