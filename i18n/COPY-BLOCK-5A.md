# COPY-BLOCK-5A · Blog Posts 1–3 · EN aprobado v3

**Estado:** aprobado v3 por Ana. Solo copy. Cero código modificado en este commit.
**Slugs EN:** alineados con `i18n/BLOG-SLUGS.md` aprobado.
**Reglas maestras aplicadas:** `i18n/BRAND-NAME.md` (nombre + credencial), `i18n/PLAN.md`, `i18n/F8-EXIT-CRITERIA.md`.
**Rama:** `claude/p3-pr3-i18n-complete`.
**Feature flag:** `NEXT_PUBLIC_I18N_ENABLED=false` (intacto).

---

## Índice

- Reglas globales aplicadas a este bloque
- Post 1 · `/en/resources/what-is-a-short-term-rental`
- Post 2 · `/en/resources/what-is-a-tax-deed`
- Post 3 · `/en/resources/5-paths-to-wealth-with-short-term-rentals`
- Tabla final de cifras / claims que sobreviven
- Tabla de credenciales
- Cambios futuros ES requeridos (F2)

---

## Reglas globales aplicadas

- Nombre público oficial: **`AnaMaría Morrison`**
- Credencial oficial:
  - **EN:** `Certified Tax Deed Title Analyst`
  - **ES:** `Certificada como Analista de Títulos en Subastas del Condado (Tax Deed)`
- Diferenciación estricta `specialized training` vs. credencial formal (D3).
- Cero rangos financieros genéricos publicados (D5, D6, D7). Único claim numérico que sobrevive: Colombia ≈3× como caso histórico documentado.
- Cero superlativos ni promesas: `fastest`, `best`, `most powerful`, `guaranteed`, `right starting point`, `most efficient`.
- Tax Deed: lenguaje `may` / `can` / `subject to` / `varies by jurisdiction`.
- CTA único para conversación individual: `1:1 strategy consultation`.
- Schema `publisher` = `Person` (no Organization inventada); si el validador exige Organization en F7, omitir `publisher` antes que inventar.
- `datePublished` EN preserva la fecha ES original.

---

## Post 1 · `/en/resources/what-is-a-short-term-rental`

### 1.1 · Identificación

| Campo | Valor EN |
|---|---|
| slug | `what-is-a-short-term-rental` |
| canonical EN | `https://anamorrison.com/en/resources/what-is-a-short-term-rental` |
| canonical ES equivalente | `https://anamorrison.com/recursos/que-es-el-alquiler-a-corto-plazo` |
| category | `Basic Education` |
| readTime | `8 min` |
| author | `AnaMaría Morrison` |
| datePublished | `2026-05-01` (preservada; ver PLAN.md §9) |
| keywords | `["short-term rental", "STR model", "Airbnb hosting", "real estate business"]` |

### 1.2 · Metadata / SEO

**`title`:** `What Is a Short-Term Rental? How the STR Model Works`

**`meta description`:** `A clear introduction to how short-term rentals (STRs) work as a business, the main operating models, and what they actually require. No promises of specific income.`

**Open Graph:**
- `og:title` = `title`
- `og:description` = `meta description`
- `og:type` = `article`
- `og:locale` = `en_US`
- `og:alternateLocale` = `es_US`
- `og:url` = canonical EN
- `og:image` = pendiente asset real (no inventar)

**Twitter Card:** `summary_large_image` · handle `@anamorrisoninvestments` (Category F preservado).

### 1.3 · Schema.org

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "What Is a Short-Term Rental? How the STR Model Works",
  "description": "A clear introduction to how short-term rentals (STRs) work as a business, the main operating models, and what they actually require. No promises of specific income.",
  "inLanguage": "en-US",
  "author": { "@type": "Person", "name": "AnaMaría Morrison" },
  "publisher": { "@type": "Person", "name": "AnaMaría Morrison" },
  "datePublished": "2026-05-01",
  "mainEntityOfPage": "https://anamorrison.com/en/resources/what-is-a-short-term-rental"
}
```

**Nota F7:** si el validador exige `publisher: Organization`, omitir `publisher` — no inventar organización.

### 1.4 · BreadcrumbList

1. `Home` → `/en`
2. `Resources` → `/en/resources`
3. `What Is a Short-Term Rental? How the STR Model Works` → canonical EN

### 1.5 · hreflang

- `es-US` → `https://anamorrison.com/recursos/que-es-el-alquiler-a-corto-plazo`
- `en-US` → canonical EN
- `x-default` → versión ES

### 1.6 · Cuerpo completo (EN)

**Intro**

> Short-term rentals (STRs) have become an important segment of the modern hospitality and real estate market. Platforms like Airbnb, Booking.com, VRBO, and Expedia give hosts and property owners direct access to travelers, without requiring the infrastructure of a traditional hotel.
>
> This article explains what a short-term rental actually is, how the main operating models work, and what the real work looks like day to day. It does not promise specific income.

**## How is it different from a traditional long-term rental?**

> With a traditional lease, a tenant signs for 12 months or more and pays the same amount each month. A short-term rental operates by the night, with pricing that can vary based on season, local demand, and events. Revenue potential can differ substantially from traditional rentals depending on location, demand, pricing, regulation, operating costs, and execution.
>
> My first property, in Colombia, is a specific historical example: after switching from a traditional lease to a short-term rental model, the property's revenue increased approximately 3×. That figure describes one property in one market at one point in time. It is not an average, an expectation, a projection, or a guarantee, and it does not extrapolate to other properties.

**## The 5 short-term rental operating models**

1. **Owner-host** — You own the property and operate it directly.
2. **Co-hosting** — You manage short-term rental properties for owners in exchange for an agreed management or co-hosting fee.
3. **Rental arbitrage** — You lease a property long-term, with the owner's written authorization, and re-rent it by the night where permitted by the lease and local regulations.
4. **Co-living** — You rent by the room with shared services and amenities.
5. **Build-to-STR** — You develop or renovate properties designed from the outset for short-term rental use.

**## Is it really "passive income"?**

> Short-term rentals are not inherently passive. They require pricing decisions, guest communication, cleaning coordination, maintenance, guest safety, review management, and ongoing regulatory awareness. Strong systems, clear protocols, and professional management can reduce day-to-day owner involvement, but there is no operating model where a property runs itself with zero oversight.

**## What actually drives results**

The properties that perform well over time tend to share:
- Realistic underwriting before acquisition or before leasing
- Photography and listing copy that describe the property accurately
- Pricing informed by real market data, updated regularly
- Prompt, professional guest communication
- Cleaning and maintenance standards that hold up across every turnover
- Attention to local regulations, taxes, and permits

**## Is this model for you?**

> Whether a short-term rental makes sense for you depends on the specific property, your market, your available time, your capital, your risk tolerance, and your goals. The right answer for one person can be the wrong answer for another.

**## Continue reading**

- What Is a Tax Deed → `/en/resources/what-is-a-tax-deed`
- 5 Paths to Building a Short-Term Rental Business → `/en/resources/5-paths-to-wealth-with-short-term-rentals`
- Short-Term Rentals (services) → `/en/short-term-rentals`
- Case Studies → `/en/case-studies`

**## CTA (final)**

> If you're evaluating whether a short-term rental makes sense for a specific property, a **1:1 strategy consultation** can help you work through the analysis.
>
> **Button:** `Book a 1:1 Strategy Consultation` → `/en/contact`

**## Editorial disclaimer**

> This article is for educational purposes only and does not constitute legal, tax, financial, or investment advice. Short-term rental regulations, taxation, and licensing requirements vary by jurisdiction. Consult qualified professionals before making decisions.

### 1.7 · Imágenes / alt

| Slot | Estado | Alt EN |
|---|---|---|
| Featured image | Pendiente asset real (no inventar) | — |
| Inline images | Ninguna | — |

### 1.8 · Cambios futuros ES requeridos (F2)

- Cambiar `title` ES a versión sin `"Más Poderoso"`. Propuesta: **`¿Qué es el alquiler a corto plazo? Cómo funciona el modelo STR`**.
- Reescribir intro ES para eliminar `"que ha crecido más rápido en la última década"`.
- Eliminar cifras Miami `$4,000–$8,000` y `150%` del cuerpo ES.
- Reformular §"El rol de la optimización" para explicitar que STR **no es pasivo por defecto**.
- Añadir editorial disclaimer al pie (equivalente al de 1.6).
- Eliminar rango `15–30%` (aplicar D2 v3).

---

## Post 2 · `/en/resources/what-is-a-tax-deed`

### 2.1 · Identificación

| Campo | Valor EN |
|---|---|
| slug | `what-is-a-tax-deed` |
| canonical EN | `https://anamorrison.com/en/resources/what-is-a-tax-deed` |
| canonical ES equivalente | `https://anamorrison.com/recursos/tax-deed-que-es` |
| category | `Advanced Investing` |
| readTime | `10 min` |
| author | `AnaMaría Morrison` |
| datePublished | `2026-04-20` |
| keywords | `["tax deed", "county auction", "tax deed title analysis", "US real estate investing"]` |

### 2.2 · Metadata / SEO

**`title`:** `Tax Deed: What It Is and How County Property Auctions Work`

**`meta description`:** `A prudent guide to Tax Deed sales: how certain U.S. counties handle delinquent property taxes through public auctions, what varies by jurisdiction, the role of title analysis, and why due diligence is essential. Written by AnaMaría Morrison, Certified Tax Deed Title Analyst.`

**Open Graph:** idéntico patrón Post 1 con canonical EN de Post 2.

### 2.3 · Schema.org (con `hasCredential` aprobado)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Tax Deed: What It Is and How County Property Auctions Work",
  "description": "(meta description above)",
  "inLanguage": "en-US",
  "author": {
    "@type": "Person",
    "name": "AnaMaría Morrison",
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "name": "Certified Tax Deed Title Analyst"
    }
  },
  "publisher": { "@type": "Person", "name": "AnaMaría Morrison" },
  "datePublished": "2026-04-20",
  "mainEntityOfPage": "https://anamorrison.com/en/resources/what-is-a-tax-deed"
}
```

**Reglas de `hasCredential`:** sólo se declara `name`. No inventar `credentialCategory`, `recognizedBy`, `issuer`, `issuingOrganization`, `identifier`, `certificate number`, `license number`, `dateCreated`, `validFor`, `expirationDate`.

### 2.4 · BreadcrumbList

1. `Home` → `/en`
2. `Resources` → `/en/resources`
3. `Tax Deed: What It Is and How County Property Auctions Work` → canonical EN

### 2.5 · hreflang

- `es-US` → `https://anamorrison.com/recursos/tax-deed-que-es`
- `en-US` → canonical EN
- `x-default` → ES

### 2.6 · Cuerpo completo (EN)

**Intro**

> Tax deed sales are one way certain U.S. counties address delinquent property taxes through public auctions. When a property owner falls behind on property taxes for long enough, the county may eventually sell the property at auction to recover the unpaid amounts.
>
> With a Tax Deed sale, the winning bidder may acquire ownership of the property rather than purchasing only the tax debt. The exact rights, procedures, surviving interests, and title requirements vary by state and county.
>
> This article explains the general shape of the process and the questions that matter before participating. It is not legal advice.

**## How the process generally works**

> The exact steps and timelines vary by jurisdiction. In broad terms:
>
> 1. The property owner falls behind on property taxes.
> 2. The county follows its statutory process before a sale can occur. Timelines vary by state and can span months or years.
> 3. The county announces and holds a public auction to address the delinquency.
> 4. The winning bidder may receive a deed to the property, subject to the rules and any surviving interests defined by state and county law.
> 5. Auction prices, deed types, and post-sale title status vary significantly across jurisdictions.

**## Why this can be relevant to investors**

> Some properties may sell below estimated market value, but acquisition price alone does not determine the economics of the investment. Renovation cost, occupancy status, surviving liens or interests, title marketability, and the eventual exit strategy all shape whether a specific opportunity makes sense.

**## Risks you need to understand before bidding**

- **Property condition** — Many properties available at tax deed auction have been vacant or neglected. Renovation costs can be substantial.
- **Occupancy** — Some properties may be occupied, which may require a legal process to resolve.
- **Prior due diligence is essential** — Review the property, available records, and applicable rules before bidding. In many jurisdictions, physical inspection prior to sale is restricted.
- **Surviving interests** — Depending on jurisdiction, certain liens, encumbrances, or interests may survive the sale.
- **Title requirements** — Making the title marketable after a tax deed sale may require additional steps that vary by state and county.
- **Access to the property before purchase** — Often limited or not permitted.

**## My Methodology as a Certified Tax Deed Title Analyst**

> As a Certified Tax Deed Title Analyst, my methodology includes:
>
> 1. Market-value context using recent comparables
> 2. Reasoned renovation-cost estimation based on exterior review and available records
> 3. Review of the title chain and any surviving liens, encumbrances, or interests disclosed in the record
> 4. A maximum bid defined in advance with a documented safety margin
> 5. An exit hypothesis formulated before the auction: resell, long-term rental, or short-term rental — evaluated against the specific property and market

> This methodology is designed to support a more structured due diligence process. It does not eliminate risk. Outcomes depend on the specific property, jurisdiction, county rules, market conditions, and execution.

**## Can this be done from outside the United States?**

> In many counties, portions of the process can be completed remotely, and some auctions are conducted online. The specifics — including whether a non-U.S. resident can participate directly, and any tax, banking, or entity requirements — vary by jurisdiction and by the buyer's individual situation. Professional advice is essential before participating from abroad.

**## Continue reading**

- What Is a Short-Term Rental → `/en/resources/what-is-a-short-term-rental`
- 5 Paths to Building a Short-Term Rental Business → `/en/resources/5-paths-to-wealth-with-short-term-rentals`
- Tax Deed Investing (services) → `/en/tax-deed-investing`
- Case Studies → `/en/case-studies`

**## CTA (final)**

> If you're evaluating a specific tax deed opportunity or want to understand whether this approach may fit your goals, a **1:1 strategy consultation** can be a useful starting point.
>
> **Button:** `Book a 1:1 Strategy Consultation` → `/en/contact`

**## Tax Deed disclaimer (obligatorio, alineado con Bloque 2 §2.3.S3 y Terms §6)**

> **Tax Deed disclaimer.** This article is for educational purposes only. It is not legal, tax, or investment advice. Tax deed rules, procedures, auction mechanics, surviving interests, title requirements, and buyer eligibility vary by state and county. Regulations change over time. Before participating in any tax deed auction, consult qualified legal, tax, and title professionals licensed in the relevant jurisdiction. No specific outcome is promised or guaranteed.

### 2.7 · Imágenes / alt

| Slot | Estado | Alt EN |
|---|---|---|
| Featured image | Pendiente asset real (no inventar) | — |

### 2.8 · Cambios futuros ES requeridos (F2)

- `description` ES: sustituir `AnaMaria Morrison` → `AnaMaría Morrison`.
- H2 ES: `"Mi metodología como analista certificada"` → `"Mi metodología como Analista de Títulos en Subastas del Condado (Tax Deed)"`.
- Añadir apertura narrativa: *"Como Analista de Títulos en Subastas del Condado (Tax Deed) certificada, mi metodología incluye…"*.
- Atenuar paso 4 del "¿Cómo funciona el proceso?" con `puede recibir el título…`.
- Eliminar ejemplo `$150,000 subastarse por $8,000–$15,000`.
- Reformular §"¿Por qué es tan poderoso?" (retirar el marco "poderoso").
- Añadir Tax Deed disclaimer al pie.

---

## Post 3 · `/en/resources/5-paths-to-wealth-with-short-term-rentals`

### 3.1 · Identificación

| Campo | Valor EN |
|---|---|
| slug | `5-paths-to-wealth-with-short-term-rentals` |
| canonical EN | `https://anamorrison.com/en/resources/5-paths-to-wealth-with-short-term-rentals` |
| canonical ES equivalente | `https://anamorrison.com/recursos/5-rutas-riqueza-alquiler-corto-plazo` |
| category | `Strategy` |
| readTime | `9 min` |
| author | `AnaMaría Morrison` |
| datePublished | `2026-04-10` |
| keywords | `["short-term rental business", "co-hosting", "rental arbitrage", "co-living", "STR strategy"]` |

### 3.2 · Metadata / SEO

**`title`:** `5 Paths to Building a Short-Term Rental Business` (Opción B aprobada · slug SEO preservado)

**`meta description`:** `Co-hosting, co-living, rental arbitrage, ownership, and build-to-STR: five practical paths into the short-term rental business. Trade-offs, capital, and skill requirements — no income promises.`

**Open Graph:** patrón consistente con Post 1/2, canonical EN de Post 3.

### 3.3 · Schema.org

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "5 Paths to Building a Short-Term Rental Business",
  "description": "(meta description above)",
  "inLanguage": "en-US",
  "author": { "@type": "Person", "name": "AnaMaría Morrison" },
  "publisher": { "@type": "Person", "name": "AnaMaría Morrison" },
  "datePublished": "2026-04-10",
  "mainEntityOfPage": "https://anamorrison.com/en/resources/5-paths-to-wealth-with-short-term-rentals"
}
```

### 3.4 · BreadcrumbList

1. `Home` → `/en`
2. `Resources` → `/en/resources`
3. `5 Paths to Building a Short-Term Rental Business` → canonical EN

### 3.5 · hreflang

- `es-US` → `https://anamorrison.com/recursos/5-rutas-riqueza-alquiler-corto-plazo`
- `en-US` → canonical EN
- `x-default` → ES

### 3.6 · Cuerpo completo (EN)

**Intro**

> One of the questions I hear most is: *"AnaMaría, I don't own a property — can I still start in short-term rentals?"* The answer is: possibly, yes. There are five practical paths into the short-term rental business, and only one of them requires you to own a property from the beginning. Each path has different capital, skill, time, and risk requirements. This article walks through what each one actually looks like.

**## Path 1 · Co-Hosting**

> You manage short-term rental properties for owners in exchange for an agreed management or co-hosting fee. The fee structure depends on the agreement, property, market, and scope of services.
>
> Co-hosting can often require significantly less upfront capital than purchasing a property, although business expenses and operating resources may still be required — communication tools, cleaning coordination, insurance, and time.
>
> **Best suited for:** People with operational discipline who want to learn the business from the operator side.

**## Path 2 · Co-Living**

> You lease a whole property, with the owner's written authorization, and re-rent it by the room with shared services (WiFi, cleaning, amenities). Where permitted, the model can be listed on co-living platforms in addition to standard STR channels.
>
> **Best suited for:** Operators who want a hands-on model without owning the property, and who are comfortable managing multi-guest coordination.

**## Path 3 · Rental Arbitrage**

> You lease a property with the owner's written authorization and operate it as a short-term rental where permitted. Whether rental arbitrage is permitted depends on the lease, the owner's written authorization, building rules (HOA / condo association), and applicable local regulations.
>
> Profitability depends on rent, occupancy, nightly rates, operating expenses, seasonality, taxes, and local regulations. This article does not present any specific spread as typical or expected.
>
> **Best suited for:** Operators comfortable with contract-heavy setup and ongoing regulatory awareness.

**## Path 4 · Purchase / Ownership**

> The classic path: you acquire a property — outright or with financing — and operate it as a short-term rental. A well-underwritten, well-located, well-operated property may generate cash flow that covers financing and operating costs and produces a return; that outcome is a goal, not a guarantee. Underwriting matters more than the label on the model.
>
> Financing does not need to be conventional. Tax deed acquisition, seller financing, partnerships, and other structures exist. Each has its own requirements, risks, and trade-offs.
>
> **Best suited for:** Investors with capital or access to structured financing, who want long-term ownership and the associated responsibilities.

**## Path 5 · Build / Build-to-STR**

> Building or renovating specifically for STR use can offer greater control over design, operations, and positioning, but it also involves additional capital, development risk, and regulatory considerations — including zoning, permitting, and future changes in short-term rental regulation.
>
> **Best suited for:** Investors comfortable with development risk and longer timelines, working with experienced professionals.

**## Which path is right for you?**

> It depends on your capital, your available time, your risk tolerance, and your goals. There is no single "best" path.
>
> In a **1:1 strategy consultation**, we can evaluate your situation, resources, goals, and risk profile to identify which path may be worth exploring. This is not a promise of a specific outcome — it is a structured conversation about your specific case.

**## Continue reading**

- What Is a Short-Term Rental → `/en/resources/what-is-a-short-term-rental`
- What Is a Tax Deed → `/en/resources/what-is-a-tax-deed`
- Short-Term Rentals (services) → `/en/short-term-rentals`
- Tax Deed Investing (services) → `/en/tax-deed-investing`

**## CTA (final)**

> **Button:** `Book a 1:1 Strategy Consultation` → `/en/contact`

**## Editorial disclaimer**

> This article is for educational purposes only and does not constitute legal, tax, financial, or investment advice. Business results depend on the specific case, market, regulations, execution, and factors beyond any single operator's control. Consult qualified professionals before making decisions.

### 3.7 · Imágenes / alt

| Slot | Estado | Alt EN |
|---|---|---|
| Featured image | Pendiente asset real (no inventar) | — |

### 3.8 · Cambios futuros ES requeridos (F2)

- Sustituir `"AnaMaria"` en intro (línea 100 de `src/lib/blog-posts.ts`) por `"AnaMaría"` (vocativo) o `"AnaMaría Morrison"` según contexto.
- Eliminar rangos `$1,500–$5,000/mes gestionando 3–8 propiedades`.
- Eliminar `$2,500–$4,000 de ganancia mensual` en Ruta 3.
- Reformular Ruta 4 como objetivo, no garantía.
- Reformular Ruta 5 eliminando `"Mayor inversión inicial, mayor retorno"`.
- Sustituir `"En mis mentorías…"` por `"En una consulta estratégica 1:1…"`.
- Añadir editorial disclaimer al pie.

---

## Tabla final · cifras / claims que sobreviven en Posts 1–3

| Post | Claim | Estado | Motivo |
|---|---|---|---|
| 1 | Colombia ≈3× | ✅ SOBREVIVE — caso histórico documentado. No promedio. No expectativa. No garantía. | `casos-de-exito/page.tsx:24` + `COPY-BLOCK-3.md §3.1.S1` |
| 1 | Miami $4,000–$8,000/mes | ❌ | Sin evidencia |
| 1 | 150% sobre renta tradicional | ❌ | Sin evidencia |
| 1 | 2×–4× revenue | ❌ | Claim general prohibido |
| 1 | "Fastest-growing" | ❌ | Sin fuente |
| 1 | "Most powerful vehicle" | ❌ | Prohibido |
| 1 | "No starting capital required" | ❌ | Prohibido |
| 1 | Co-host fee 15–30% | ❌ | Retirado v3 · sin evidencia como rango público |
| 1 | CTA "fastest way" | ❌ | Retirado v3 · superlativo |
| 2 | Credencial `Certified Tax Deed Title Analyst` | ✅ SOBREVIVE — Category B aprobada | `BRAND-NAME.md` §Credencial oficial |
| 2 | $150,000 → $8,000–$15,000 | ❌ | Sin evidencia |
| 2 | "Least-known and most powerful" | ❌ | Reformulado |
| 2 | "100% online" | ❌ | Reformulado |
| 2 | "2–5 años" timeline universal | ❌ | Reformulado a `varies by state; can span months or years` |
| 2 | "Buy outright / receive title" absoluto | ❌ | Atenuado a `may acquire ownership…subject to` |
| 2 | "Fraction of market value" universal | ❌ | Reformulado |
| 2 | "Right starting point" | ❌ | Retirado v3 |
| 2 | "Methodology reduces avoidable mistakes" | ❌ | Retirado v3 · reemplazado por `designed to support a more structured due diligence process` |
| 3 | Co-host $1,500–$5,000/mes · 3–8 propiedades | ❌ | Sin evidencia |
| 3 | Arbitraje $2,000/$4,500–$6,000/$2,500–$4,000 | ❌ | Sin evidencia |
| 3 | Co-host fee 15–30% | ❌ | Retirado v3 |
| 3 | "5 proven paths" | ❌ | Reemplazado por `five practical paths` |
| 3 | "It can be done 100% legally" | ❌ | Reformulado |
| 3 | "Higher investment, higher return" | ❌ | Reformulado |
| 3 | "Mentorías" como CTA | ❌ | Reemplazado por `1:1 strategy consultation` |

**Resultado neto:** en Posts 1–3, la única cifra o claim financiero que sobrevive es **Colombia ≈3×** como resultado histórico específico documentado.

---

## Tabla de credenciales

| Concepto | Formulación EN | Formulación ES | Dónde se usa | Dónde NO se usa |
|---|---|---|---|---|
| Formación / entrenamiento | `Specialized training in Tax Deed analysis` (variante `…in Tax Deed property and title analysis` en COPY-BLOCK-2) | `Formación especializada en análisis Tax Deed` (variante ampliada en COPY-BLOCK-2) | About subheadline (COPY-BLOCK-1 §1.3.1, COPY-BLOCK-2 §2.1 timeline 2025), eyebrows generales de trayectoria | No sustituir a la credencial cuando la sección refiere específicamente a la credencial |
| Credencial formal | `Certified Tax Deed Title Analyst` | `Certificada como Analista de Títulos en Subastas del Condado (Tax Deed)` | Post 2 H2 y cuerpo; `author.hasCredential.name` en Post 2; secciones futuras que refieran específicamente a la credencial (Authority Tax Deed page si Ana lo aprueba en F5); bio autor (componente Author en F5) | No usar como reemplazo automático de "specialized training"; no usar en eyebrows generales; no expandir a otras profesiones |

Alcance **NO** implicado por la credencial: abogada · title attorney · title agent · broker · CPA · financial advisor · cualquier otra licencia profesional distinta.

---

## Cambios futuros ES requeridos (F2) — resumen consolidado

**Post 1:**
- Nuevo `title` sin `"Más Poderoso"`.
- Intro sin `"que ha crecido más rápido en la última década"`.
- Cuerpo sin cifras Miami $4k–$8k ni 150%.
- Aclarar que STR no es pasivo por defecto.
- Eliminar rango `15–30%`.
- Añadir editorial disclaimer.

**Post 2:**
- `description` corregir nombre `AnaMaría Morrison`.
- H2 con credencial ES completa.
- Cuerpo con lenguaje `puede` / `varía por jurisdicción` / `subject to`.
- Eliminar ejemplo `$150,000 → $8,000–$15,000`.
- Añadir Tax Deed disclaimer al pie.

**Post 3:**
- Intro corregir nombre `AnaMaría`.
- Rangos eliminados (co-host, arbitraje).
- Ruta 4 como objetivo, no garantía.
- Ruta 5 sin `"Mayor inversión, mayor retorno"`.
- CTA `"mentorías"` → `"consulta estratégica 1:1"`.
- Añadir editorial disclaimer.

Estos cambios se aplican al código en F2 (extracción de contenido / normalización ES), NO en este commit.

---

## Cero acciones destructivas confirmadas

- 0 archivos de código modificados
- 0 rutas EN creadas
- `NEXT_PUBLIC_I18N_ENABLED=false` intacto
- 0 merge · 0 deploy · Production intacta
- Supabase, Resend, `/api/leads`, `saveLead`, consent, analytics, rate limiting, honeypot, timing checks, RLS, logs: intactos
- Identificadores Category F: intactos
