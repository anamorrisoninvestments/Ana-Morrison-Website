import type { Locale } from "./config";

export type RouteKey =
  | "home"
  | "about"
  | "shortTermRentals"
  | "taxDeed"
  | "caseStudies"
  | "resources"
  | "contact"
  | "blog"
  | "privacy"
  | "cookies"
  | "terms";

type RouteEntry = { es: string; en: string };

export const ROUTE_MAP: Record<RouteKey, RouteEntry> = {
  home: { es: "/", en: "/en" },
  about: { es: "/sobre-mi", en: "/en/about" },
  shortTermRentals: { es: "/alquileres-a-corto-plazo", en: "/en/short-term-rentals" },
  taxDeed: { es: "/tax-deed", en: "/en/tax-deed-investing" },
  caseStudies: { es: "/casos-de-exito", en: "/en/case-studies" },
  resources: { es: "/recursos", en: "/en/resources" },
  contact: { es: "/contacto", en: "/en/contact" },
  blog: { es: "/blog", en: "/en/blog" },
  privacy: { es: "/politica-de-privacidad", en: "/en/privacy-policy" },
  cookies: { es: "/politica-de-cookies", en: "/en/cookie-policy" },
  terms: { es: "/terminos-de-uso", en: "/en/terms-of-use" },
};

export function routePath(key: RouteKey, locale: Locale): string {
  return ROUTE_MAP[key][locale];
}

// Blog slug ES ↔ EN pairs (per i18n/BLOG-SLUGS.md aprobado)
export const BLOG_SLUG_MAP: { es: string; en: string }[] = [
  { es: "que-es-el-alquiler-a-corto-plazo", en: "what-is-a-short-term-rental" },
  { es: "tax-deed-que-es", en: "what-is-a-tax-deed" },
  { es: "5-rutas-riqueza-alquiler-corto-plazo", en: "5-paths-to-wealth-with-short-term-rentals" },
  { es: "como-empezar-airbnb-sin-propiedad", en: "how-to-start-airbnb-without-a-property" },
  { es: "diferencia-renta-tradicional-airbnb", en: "traditional-rental-vs-airbnb" },
  { es: "libertad-financiera-bienes-raices", en: "financial-freedom-through-real-estate" },
  { es: "co-hosting-guia-completa", en: "airbnb-co-hosting-complete-guide" },
  { es: "mujer-latina-inversion-inmobiliaria", en: "latina-real-estate-investors" },
  { es: "optimizar-listing-airbnb", en: "how-to-optimize-your-airbnb-listing" },
  { es: "credito-e-inversiones-inmobiliarias", en: "credit-and-real-estate-investing" },
  { es: "automatizacion-airbnb", en: "airbnb-automation-for-hosts" },
  { es: "diseño-interior-airbnb", en: "airbnb-interior-design" },
  { es: "mercados-airbnb-florida", en: "best-florida-airbnb-markets" },
  { es: "estrategia-brrrr-inmobiliaria", en: "brrrr-strategy-explained" },
  { es: "errores-inversionista-principiante", en: "beginner-real-estate-investor-mistakes" },
  { es: "como-usar-el-credito-para-invertir-en-bienes-raices", en: "using-credit-to-invest-in-real-estate" },
  { es: "airbnb-vs-booking-vs-vrbo-cual-plataforma-usar", en: "airbnb-vs-booking-vs-vrbo" },
  { es: "caso-real-primera-propiedad-co-hosting-miami", en: "miami-co-hosting-case-study" },
  { es: "tax-deed-florida-guia-completa-principiantes", en: "florida-tax-deed-investing-beginners-guide" },
  { es: "mentalidad-inversionista-latina-como-vencer-el-miedo", en: "overcoming-money-fears-as-a-latina-investor" },
];

export function blogSlugFor(slug: string, targetLocale: Locale): string | null {
  const pair = BLOG_SLUG_MAP.find((p) => p.es === slug || p.en === slug);
  if (!pair) return null;
  return pair[targetLocale];
}

export function blogPath(slug: string, locale: Locale): string {
  const base = ROUTE_MAP.blog[locale];
  return `${base}/${slug}`;
}
