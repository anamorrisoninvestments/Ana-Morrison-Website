"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { I18N_ENABLED, otherLocale } from "@/lib/i18n/config";
import { ROUTE_MAP, BLOG_SLUG_MAP } from "@/lib/i18n/route-map";

function localeFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

function mappedPath(pathname: string, target: Locale): string {
  const current = localeFromPath(pathname);
  if (current === target) return pathname;

  // Blog post detail: /blog/<slug-es> <-> /en/blog/<slug-en>
  const esBlogMatch = pathname.match(/^\/blog\/([^/]+)$/);
  const enBlogMatch = pathname.match(/^\/en\/blog\/([^/]+)$/);
  if (esBlogMatch) {
    const pair = BLOG_SLUG_MAP.find((p) => p.es === esBlogMatch[1]);
    if (pair) return `/en/blog/${pair.en}`;
  }
  if (enBlogMatch) {
    const pair = BLOG_SLUG_MAP.find((p) => p.en === enBlogMatch[1]);
    if (pair) return `/blog/${pair.es}`;
  }

  // Route-map lookup by exact path
  const entry = Object.values(ROUTE_MAP).find(
    (r) => r[current] === pathname || (current === "es" && r.es === pathname) || (current === "en" && r.en === pathname),
  );
  if (entry) return entry[target];

  // Fallback: return the target home
  return target === "en" ? "/en" : "/";
}

export default function LocaleSwitcher({ className = "" }: { className?: string }) {
  const pathname = usePathname() || "/";
  if (!I18N_ENABLED) return null;

  const current = localeFromPath(pathname);
  const other = otherLocale(current);
  const targetHref = mappedPath(pathname, other);
  const otherLabel = other === "en" ? "EN" : "ES";
  const otherFull = other === "en" ? "View in English" : "Ver en español";

  return (
    <Link
      href={targetHref}
      hrefLang={other === "en" ? "en-US" : "es-US"}
      aria-label={otherFull}
      className={`inline-flex items-center gap-1 rounded-full border border-[#C8A45D]/40 px-3 py-1 text-xs uppercase tracking-widest text-[#F7F3EC]/85 hover:border-[#C8A45D] hover:text-[#C8A45D] transition-colors ${className}`}
    >
      <span aria-current="page" className="opacity-60">{current === "en" ? "EN" : "ES"}</span>
      <span aria-hidden="true">·</span>
      <span>{otherLabel}</span>
    </Link>
  );
}
