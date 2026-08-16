import Link from "next/link";
import { CLIENT } from "@/lib/client-data";
import NewsletterForm from "@/components/ui/NewsletterForm";
import ConsentPreferencesLink from "@/components/consent/ConsentPreferencesLink";
import type { Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dict";
import { ROUTE_MAP } from "@/lib/i18n/route-map";

type Props = { locale?: Locale };

export default function Footer({ locale = "es" }: Props) {
  const year = new Date().getFullYear();
  const dict = getDict(locale);

  const navLinks: [string, string][] = [
    [dict.nav.about, ROUTE_MAP.about[locale]],
    [locale === "en" ? "Short-Term Rentals" : "Alquileres STR", ROUTE_MAP.shortTermRentals[locale]],
    [locale === "en" ? "Tax Deed Investing" : "Tax Deed", ROUTE_MAP.taxDeed[locale]],
    [dict.nav.caseStudies, ROUTE_MAP.caseStudies[locale]],
    [dict.nav.resources, ROUTE_MAP.resources[locale]],
    [dict.nav.blog, ROUTE_MAP.blog[locale]],
    [dict.nav.contact, ROUTE_MAP.contact[locale]],
  ];

  return (
    <footer className="bg-[#0D0A08] border-t border-[#C8A45D]/15">
      <div className="border-b border-[#C8A45D]/15 py-10 px-4 sm:px-6 lg:px-8 bg-[#141210]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="md:max-w-xs">
            <p className="text-[#C8A45D] text-xs tracking-[4px] uppercase mb-2">{dict.footer.newsletter}</p>
            <p className="text-[#F7F3EC] font-light text-lg leading-snug">
              {dict.footer.newsletterSub}
            </p>
          </div>
          <div className="w-full md:max-w-sm">
            <NewsletterForm variant="footer" locale={locale} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <p className="text-[#C8A45D] font-bold text-xl tracking-widest uppercase mb-1">{CLIENT.nameShort}</p>
            <p className="text-[#888888] text-xs tracking-widest uppercase mb-4">The Host Circle</p>
            <p className="text-[#F7F3EC]/60 text-sm leading-relaxed max-w-xs">{locale === "en" ? CLIENT.taglineEN : CLIENT.tagline}</p>
            <div className="flex gap-4 mt-6">
              {Object.entries(CLIENT.social).map(([key, s]) => (
                <a
                  key={key}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[#C8A45D]/30 flex items-center justify-center text-[#C8A45D] hover:bg-[#C8A45D] hover:text-black transition-all text-xs font-bold uppercase"
                  aria-label={`${CLIENT.nameShort} ${locale === "en" ? "on" : "en"} ${key}`}
                >
                  {key === "instagram" ? "IG" : key === "facebook" ? "FB" : key === "tiktok" ? "TK" : key === "youtube" ? "YT" : "LI"}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-4">{dict.footer.navigation}</p>
            <ul className="space-y-2">
              {navLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-[#F7F3EC]/60 text-sm hover:text-[#C8A45D] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-4">{dict.footer.contact}</p>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${CLIENT.email}`} className="text-[#F7F3EC]/60 text-sm hover:text-[#C8A45D] transition-colors break-all">
                  {CLIENT.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${CLIENT.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F7F3EC]/60 text-sm hover:text-[#C8A45D] transition-colors"
                >
                  {dict.footer.whatsapp}: {CLIENT.whatsappDisplay}
                </a>
              </li>
            </ul>
            <Link
              href={ROUTE_MAP.contact[locale]}
              className="inline-block mt-6 px-5 py-2 rounded-full bg-[#C8A45D] text-black text-sm font-semibold tracking-wider uppercase hover:bg-[#E2C98A] transition-all"
            >
              {dict.footer.ctaWork}
            </Link>
          </div>
        </div>

        <div className="divider-gold mt-12 mb-6" />

        <div className="flex flex-col gap-4 text-[#888888] text-xs">
          <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center sm:justify-start">
            <Link href={ROUTE_MAP.privacy[locale]} className="hover:text-[#C8A45D] transition-colors">
              {dict.footer.privacy}
            </Link>
            <span aria-hidden="true">·</span>
            <Link href={ROUTE_MAP.cookies[locale]} className="hover:text-[#C8A45D] transition-colors">
              {dict.footer.cookies}
            </Link>
            <span aria-hidden="true">·</span>
            <Link href={ROUTE_MAP.terms[locale]} className="hover:text-[#C8A45D] transition-colors">
              {dict.footer.terms}
            </Link>
            <span aria-hidden="true">·</span>
            <ConsentPreferencesLink className="hover:text-[#C8A45D] transition-colors" />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>© {year} {CLIENT.name} · The Host Circle · {dict.footer.rights}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
