// Taxonomía del blog reorganizada alrededor del posicionamiento actual:
// solo dos categorías principales visibles (STR y Tax Deed).
// El resto de artículos queda archivado — accesible pero no protagónico.

export type TopicKey = "str" | "tax-deed" | "archivado";

export const TOPIC_LABELS: Record<TopicKey, string> = {
  str: "Alquileres a Corto Plazo",
  "tax-deed": "Tax Deed",
  archivado: "Archivado",
};

const STR_CATEGORIES = new Set([
  "Educación Básica",
  "Estrategia",
  "Guías Prácticas",
  "Comparativas",
  "Operaciones",
  "Educación Financiera",
  "Análisis de Mercado",
  "Finanzas",
  "Casos Reales",
]);

const TAX_DEED_CATEGORIES = new Set([
  "Tax Deed",
  "Inversión Avanzada",
]);

export function classifyPost(category: string): TopicKey {
  if (TAX_DEED_CATEGORIES.has(category)) return "tax-deed";
  if (STR_CATEGORIES.has(category)) return "str";
  return "archivado";
}
