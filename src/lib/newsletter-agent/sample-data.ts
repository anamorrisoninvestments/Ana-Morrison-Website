import "server-only";
import type { CandidateStory, EditionDraft } from "./types";

// Deterministic sample used by the admin preview endpoint in dry mode and by
// the test suite. Zero live network calls; illustrates the schema and output
// format so Ana can review the pipeline without spending OpenAI tokens.
// Every URL below is an official primary source that existed at the time of
// authoring; we do not invent facts, only shape.

export const SAMPLE_CANDIDATES: CandidateStory[] = [
  {
    id: "s1",
    category: "str",
    headline: "Airbnb announces new host tools during quarterly release",
    summary: "Airbnb rolled out product updates for hosts in its recurring release cycle, including changes to listing management surfaces and calendar tools. Coverage confirmed via the official newsroom.",
    why_it_matters: "Host-facing product changes affect listing performance workflows; operators should review whether pricing and calendar automations still behave the same.",
    practical_takeaway: "Re-audit any third-party channel manager configuration against the new host surfaces this week.",
    jurisdiction: null,
    published_at: null,
    source_urls: ["https://news.airbnb.com/"],
    source_quality: "official",
    confidence: 0.75,
    freshness_score: 0.9,
    relevance_score: 0.85,
    dedup_key: "airbnb-quarterly-release-host-tools",
  },
  {
    id: "s2",
    category: "str",
    headline: "Multiple U.S. municipalities continue tightening short-term rental permitting rules",
    summary: "City councils across several U.S. municipalities have been updating short-term rental permitting rules through the year, addressing registration, primary-residence requirements, and cap limits. Operators should check each jurisdiction's official notice.",
    why_it_matters: "Regulation is now the dominant STR risk factor in many U.S. markets; a single ordinance can materially change unit economics overnight.",
    practical_takeaway: "Maintain an active watchlist of the municipal code pages for every city where you operate; do not rely on secondary summaries alone.",
    jurisdiction: "Multiple U.S. municipalities",
    published_at: null,
    source_urls: ["https://www.municode.com/"],
    source_quality: "primary",
    confidence: 0.7,
    freshness_score: 0.85,
    relevance_score: 0.9,
    dedup_key: "us-municipal-str-permitting-tightening",
  },
  {
    id: "s3",
    category: "str",
    headline: "Booking.com continues expanding vacation-rental supply in North America",
    summary: "Booking Holdings has publicly identified vacation-rental supply expansion as a strategic priority in recent investor communications, with continuing focus on North American markets.",
    why_it_matters: "For operators, more Booking supply means more comparable inventory and, potentially, more pricing pressure — but also more channel distribution.",
    practical_takeaway: "Test whether Booking as a secondary channel materially affects your fill rate for shoulder-season nights.",
    jurisdiction: "North America",
    published_at: null,
    source_urls: ["https://www.bookingholdings.com/investors/"],
    source_quality: "official",
    confidence: 0.65,
    freshness_score: 0.7,
    relevance_score: 0.75,
    dedup_key: "booking-vacation-rental-supply-north-america",
  },
  {
    id: "t1",
    category: "tax_deed",
    headline: "Florida county tax deed auction calendars remain online-first",
    summary: "Multiple Florida counties continue conducting tax deed auctions via RealAuction and similar platforms. Sale calendars, minimum bids, and required deposits are published on official Clerk of Court sites.",
    why_it_matters: "Investors bidding remotely must confirm each county's registration, deposit, and payment deadlines before the sale — rules vary by county.",
    practical_takeaway: "Do not rely on cross-county assumptions; pull the specific Clerk's rules PDF for every auction you enter.",
    jurisdiction: "Florida (multiple counties)",
    published_at: null,
    source_urls: ["https://www.realauction.com/"],
    source_quality: "primary",
    confidence: 0.75,
    freshness_score: 0.75,
    relevance_score: 0.85,
    dedup_key: "florida-tax-deed-online-auction-rules-reminder",
  },
  {
    id: "t2",
    category: "tax_deed",
    headline: "Surviving federal tax liens continue to be a critical Tax Deed due-diligence checkpoint",
    summary: "IRS federal tax liens generally survive a Florida tax deed sale under statutory redemption rights. Investor guidance continues to emphasize independent title review before bidding.",
    why_it_matters: "Assuming a tax deed sale automatically produces marketable title is one of the most common — and expensive — investor errors.",
    practical_takeaway: "Confirm every property's federal lien status before bidding; consult a Florida real estate attorney where anything is unclear.",
    jurisdiction: "Florida",
    published_at: null,
    source_urls: ["https://www.irs.gov/businesses/small-businesses-self-employed/federal-tax-liens"],
    source_quality: "primary",
    confidence: 0.8,
    freshness_score: 0.6,
    relevance_score: 0.9,
    dedup_key: "irs-federal-tax-liens-survive-tax-deed-fl",
  },
  {
    id: "t3",
    category: "tax_deed",
    headline: "Investor education on Tax Deed title curing remains a recurring gap",
    summary: "Multiple investor communities continue to discuss the trade-offs between quiet-title actions and specialized tax-deed title insurance. Timeline and cost expectations vary by county and case.",
    why_it_matters: "Title curing strategy directly affects exit-strategy flexibility; a fix-and-flip and a fix-and-STR do not tolerate the same title uncertainty.",
    practical_takeaway: "Decide your exit strategy before bidding, and price the title-curing timeline into your maximum bid.",
    jurisdiction: "United States (educational)",
    published_at: null,
    source_urls: ["https://www.floridabar.org/"],
    source_quality: "official",
    confidence: 0.7,
    freshness_score: 0.55,
    relevance_score: 0.85,
    dedup_key: "tax-deed-title-curing-education-recurring",
  },
];

const SAMPLE_CONTENT_EN = `# AnaMaría Morrison · Weekly Real Estate Intelligence

**This week's pattern.** Two forces continue to shape the short-term rental and Tax Deed environments this week: platform product velocity on the STR side, and county-by-county regulatory precision on the Tax Deed side. Operators who treat both as fast-moving rather than fixed will keep a durable edge.

## This week in Short-Term Rentals

### Airbnb pushes new host-facing product updates
Airbnb rolled out product updates for hosts in its recurring release cycle, including changes to listing management surfaces and calendar tools.

**Why it matters:** Host-facing product changes affect listing performance workflows; operators should confirm that pricing and calendar automations still behave as expected.

**Do this week:** Re-audit any third-party channel-manager configuration against the new host surfaces. → [Read more](https://news.airbnb.com/)

### U.S. municipalities keep tightening short-term rental permitting
City councils in several U.S. jurisdictions have been updating short-term rental rules through the year, addressing registration, primary-residence requirements, and cap limits.

**Why it matters:** Regulation is now the dominant STR risk factor in many U.S. markets — a single ordinance can change unit economics overnight.

**Do this week:** Maintain an active watchlist of the municipal-code page for every city where you operate; do not rely on secondary summaries. → [Read more](https://www.municode.com/)

### Booking.com continues vacation-rental supply expansion in North America
Booking Holdings has publicly identified vacation-rental supply expansion as a strategic priority in recent investor communications, with continued focus on North America.

**Why it matters:** More Booking supply means more comparable inventory and possibly more pricing pressure — but also more distribution reach.

**Do this week:** Test whether Booking as a secondary channel materially affects your fill rate for shoulder-season nights. → [Read more](https://www.bookingholdings.com/investors/)

## This week in Tax Deed

### Florida tax deed auctions remain online-first, county by county
Florida counties continue to conduct tax deed auctions via RealAuction and similar platforms. Sale calendars, minimum bids, and required deposits are published on official Clerk of Court sites.

**Why it matters:** Rules vary by county. Remote bidders must confirm registration, deposit, and payment deadlines before every sale.

**Do this week:** Pull the specific Clerk's rules PDF for every auction you plan to enter. → [Read more](https://www.realauction.com/)

### Federal tax liens continue to be a critical Tax Deed checkpoint
IRS federal tax liens generally survive a Florida tax deed sale under statutory redemption rights. Independent title review before bidding remains essential.

**Why it matters:** Assuming a tax deed sale automatically produces marketable title is one of the most common — and expensive — investor errors.

**Do this week:** Confirm every property's federal lien status before bidding; consult a Florida real estate attorney where anything is unclear. → [Read more](https://www.irs.gov/businesses/small-businesses-self-employed/federal-tax-liens)

### Title-curing strategy is an under-discussed edge
The trade-off between quiet-title actions and specialized tax-deed title insurance keeps coming up in investor communities. Timelines and costs vary by county and case.

**Why it matters:** Title curing strategy directly affects exit-strategy flexibility. A fix-and-flip and a fix-and-STR do not tolerate the same title uncertainty.

**Do this week:** Decide your exit strategy before bidding, and price the title-curing timeline into your maximum bid. → [Read more](https://www.floridabar.org/)

## Ana's Lens · What this means for investors and property owners

The two pillars keep sending the same signal: **treat regulation and platform mechanics as living systems, not fixtures.** STR operators who audit their compliance and their listings every quarter compound faster than operators who "set and forget." Tax Deed investors who price the entire title-curing arc into their maximum bid win more of the deals worth winning.

An editorial framework: never buy a property (STR or tax deed) whose winning condition depends on a rule staying exactly where it is today.

## One thing to watch next week
The pace of municipal STR ordinance activity in Florida and Texas — two of the highest-volume markets for both pillars in this newsletter.

## Educational disclaimer
This edition is for educational purposes only. It is not legal, tax, or investment advice. Tax deed rules vary by jurisdiction; short-term rental regulations vary by municipality. Consult qualified professionals before making decisions.

---

**Explore Tax Deed Investing** → https://anamorrison.com/en/tax-deed-investing

**Work with AnaMaría Morrison** → https://anamorrison.com/en/contact
`;

const SAMPLE_CONTENT_ES = `# AnaMaría Morrison · Inteligencia Semanal de Real Estate

**El patrón de esta semana.** Dos fuerzas siguen dando forma al entorno de alquileres a corto plazo y Tax Deed: la velocidad de producto de las plataformas en STR, y la precisión regulatoria condado por condado en Tax Deed. Los operadores que traten ambas como sistemas en movimiento — no como marcos fijos — mantendrán una ventaja duradera.

## Esta semana en Alquileres a Corto Plazo

### Airbnb publica nuevas herramientas para anfitriones
Airbnb liberó actualizaciones de producto para anfitriones en su ciclo de releases, incluyendo cambios en la gestión de listings y en las herramientas de calendario.

**Por qué importa:** Los cambios en el producto de anfitrión afectan flujos de rendimiento; conviene confirmar que los automatismos de pricing y calendario siguen comportándose igual.

**Acción esta semana:** Re-auditar la configuración de cualquier channel manager frente a las nuevas superficies. → [Leer más](https://news.airbnb.com/)

### Múltiples municipios de EE.UU. siguen endureciendo el permitting STR
Consejos municipales de distintas jurisdicciones han actualizado reglas STR durante el año — registros, requisitos de residencia principal, límites máximos.

**Por qué importa:** La regulación es hoy el factor de riesgo dominante para STR en muchos mercados de EE.UU. Una sola ordenanza puede cambiar la unit economics de la noche a la mañana.

**Acción esta semana:** Mantener una lista activa del código municipal de cada ciudad donde operas; no depender de resúmenes secundarios. → [Leer más](https://www.municode.com/)

### Booking.com continúa expandiendo la oferta de alquileres vacacionales en Norteamérica
Booking Holdings ha identificado públicamente la expansión de alquileres vacacionales como prioridad estratégica en comunicaciones recientes a inversores, con foco continuado en Norteamérica.

**Por qué importa:** Más oferta en Booking significa más inventario comparable y posible presión de precios — pero también más alcance de distribución.

**Acción esta semana:** Testear si Booking como canal secundario mueve materialmente tu ocupación en noches de temporada media. → [Leer más](https://www.bookingholdings.com/investors/)

## Esta semana en Tax Deed

### Las subastas Tax Deed en Florida siguen operando principalmente online
Los condados de Florida siguen conduciendo subastas Tax Deed en plataformas como RealAuction. Calendarios, pujas mínimas y depósitos exigidos se publican en los sitios oficiales del Clerk of Court.

**Por qué importa:** Las reglas varían por condado. Los inversores remotos deben confirmar registro, depósito y fechas de pago antes de cada subasta.

**Acción esta semana:** Descargar el PDF de reglas del Clerk específico de cada subasta que planees entrar. → [Leer más](https://www.realauction.com/)

### Los gravámenes federales del IRS siguen siendo un checkpoint crítico
Los gravámenes federales del IRS generalmente sobreviven a una venta Tax Deed en Florida bajo derechos estatutarios de redención. La revisión independiente de títulos antes de pujar sigue siendo esencial.

**Por qué importa:** Asumir que una venta Tax Deed produce automáticamente un título mercadeable es uno de los errores más comunes — y más costosos — del inversor.

**Acción esta semana:** Verificar el estado de gravámenes federales de cada propiedad antes de pujar; consultar con un abogado inmobiliario licenciado en Florida cuando algo no esté claro. → [Leer más](https://www.irs.gov/businesses/small-businesses-self-employed/federal-tax-liens)

### La estrategia de cura de título sigue siendo una ventaja poco discutida
El trade-off entre una acción de quiet title y el seguro de título especializado para Tax Deed reaparece constantemente en comunidades de inversionistas. Los tiempos y costos varían por condado y por caso.

**Por qué importa:** La estrategia de cura de título afecta directamente la flexibilidad de salida. Un fix-and-flip y un fix-and-STR no toleran la misma incertidumbre de título.

**Acción esta semana:** Decidir tu estrategia de salida antes de pujar y descontar el tiempo de cura de título dentro de tu puja máxima. → [Leer más](https://www.floridabar.org/)

## La perspectiva de AnaMaría Morrison · Qué significa para inversores y propietarios

Los dos pilares mandan la misma señal: **trata la regulación y la mecánica de plataformas como sistemas vivos, no como fotografías.** Los operadores STR que auditan cumplimiento y listings cada trimestre componen más rápido que los que "configuran y olvidan". Los inversores Tax Deed que descuentan todo el arco de cura de título en su puja máxima ganan más de los deals que valen la pena ganar.

Un marco editorial: nunca compres una propiedad (STR o tax deed) cuya condición de éxito dependa de que una regla se quede exactamente donde está hoy.

## Lo que vale la pena vigilar la próxima semana
El ritmo de ordenanzas municipales STR en Florida y Texas — dos de los mercados de mayor volumen para ambos pilares de este newsletter.

## Aviso educativo
Esta edición es exclusivamente educativa. No constituye asesoría legal, financiera ni tributaria. Las reglas Tax Deed varían por jurisdicción; las regulaciones de alquileres a corto plazo varían por municipio. Consulta con profesionales calificados antes de tomar decisiones.

---

**Explora Tax Deed Investing** → https://anamorrison.com/tax-deed

**Trabaja con AnaMaría Morrison** → https://anamorrison.com/contacto
`;

export const SAMPLE_DRAFT: EditionDraft = {
  subject_es: "AnaMaría Morrison · Inteligencia semanal · Regulación STR + reglas Tax Deed",
  subject_en: "AnaMaría Morrison · Weekly briefing · STR regulation + Tax Deed rules",
  content_es: SAMPLE_CONTENT_ES,
  content_en: SAMPLE_CONTENT_EN,
  selected: SAMPLE_CANDIDATES.map((c, i) => ({ ...c, rank: i + 1 })),
  rejected: [],
  candidates: SAMPLE_CANDIDATES,
  metadata: {
    model: "sample-fixture",
    period_start: "2026-08-10",
    period_end: "2026-08-17",
  },
};
