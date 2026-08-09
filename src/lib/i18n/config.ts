export type Locale = "es" | "en";
export const LOCALES: Locale[] = ["es", "en"];
export const DEFAULT_LOCALE: Locale = "es";

export const I18N_ENABLED =
  process.env.NEXT_PUBLIC_I18N_ENABLED === "true";

export function otherLocale(locale: Locale): Locale {
  return locale === "es" ? "en" : "es";
}

export function localeLang(locale: Locale): string {
  return locale === "es" ? "es-US" : "en-US";
}

export function ogLocale(locale: Locale): string {
  return locale === "es" ? "es_US" : "en_US";
}
