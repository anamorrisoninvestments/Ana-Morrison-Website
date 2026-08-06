import { readConsent } from "./cookie-store";

export function hasAnalyticsConsent(): boolean {
  return readConsent()?.categories.analytics === true;
}

export function hasMarketingConsent(): boolean {
  return readConsent()?.categories.marketing === true;
}

export function hasAnyConsent(): boolean {
  return readConsent() !== null;
}
