"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Keeps <html lang> in sync with the current locale-scoped route without
// forcing the root layout to be dynamic. SSR emits lang="es"; on hydration and
// on client-side navigation this component updates it if the pathname is /en/*.
// This trades server-rendered accuracy of the lang attribute for keeping the
// site fully static; JS-enabled crawlers observe the correct value.
export default function HtmlLangSync() {
  const pathname = usePathname() || "/";
  useEffect(() => {
    if (typeof document === "undefined") return;
    const isEN = pathname === "/en" || pathname.startsWith("/en/");
    const target = isEN ? "en" : "es";
    if (document.documentElement.lang !== target) {
      document.documentElement.lang = target;
    }
  }, [pathname]);
  return null;
}
