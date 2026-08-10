import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import LegalDraftBanner from "@/components/ui/LegalDraftBanner";
import ConsentPreferencesLink from "@/components/consent/ConsentPreferencesLink";
import { CLIENT } from "@/lib/client-data";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Cookie categories used on anamorrison.com and how to manage your preferences.",
  alternates: {
    canonical: "/en/cookie-policy",
    languages: { "es-US": "/politica-de-cookies", "en-US": "/en/cookie-policy", "x-default": "/politica-de-cookies" },
  },
  robots: { index: false, follow: true },
  openGraph: {
    locale: "en_US",
    alternateLocale: "es_US",
    url: `${CLIENT.siteUrl}/en/cookie-policy`,
    title: "Cookie Policy | AnaMaría Morrison",
  },
};

export default function CookiePolicyEN() {
  const version = process.env.NEXT_PUBLIC_CONSENT_VERSION || "v1.0";
  return (
    <>
      <Navbar locale="en" />
      <main className="pt-32 pb-16 bg-[#0D0A08]">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-[#F7F3EC]">
          <nav className="text-[#888888] text-sm mb-6">
            <Link href="/en" className="hover:text-[#C8A45D]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#C8A45D]">Cookie Policy</span>
          </nav>

          <h1 className="heading-serif text-4xl sm:text-5xl mb-4">Cookie Policy</h1>
          <p className="text-[#888888] text-sm mb-2">Version: {version}</p>

          <LegalDraftBanner locale="en" />

          <section className="space-y-6 text-[#F7F3EC]/85 text-base leading-relaxed">
            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">1. What cookies are</h2>
              <p>
                Small files stored in your browser to remember preferences, measure site usage, and provide essential functionality.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">2. Categories we use</h2>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl border border-[#C8A45D]/20 bg-[#1C1916]">
                  <h3 className="text-[#F7F3EC] font-semibold mb-2">Necessary (always active)</h3>
                  <p className="text-sm text-[#F7F3EC]/70">
                    Essential for consent, session, and security. Cannot be disabled because the site does not function without them.
                  </p>
                  <p className="text-xs text-[#888888] mt-3">
                    <code>amc_consent</code> · stores your cookie preferences (12 months)<br />
                    <code>amc_session</code> · anonymous session ID (30 days)
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-[#C8A45D]/20 bg-[#1C1916]">
                  <h3 className="text-[#F7F3EC] font-semibold mb-2">Analytics (optional)</h3>
                  <p className="text-sm text-[#F7F3EC]/70">
                    Measurement of site usage subject to Google Analytics settings and policies. Loaded only if you accept.
                  </p>
                  <p className="text-xs text-[#888888] mt-3">
                    <code>_ga*</code> · Google Analytics 4 (up to 2 years, subject to provider settings)
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-[#C8A45D]/20 bg-[#1C1916]">
                  <h3 className="text-[#F7F3EC] font-semibold mb-2">Marketing (optional)</h3>
                  <p className="text-sm text-[#F7F3EC]/70">
                    Personalization of messages and audiences for advertising campaigns. No marketing providers are currently loaded on the site.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">3. Managing your consent</h2>
              <p>
                On your first visit you see a banner with options: Accept all · Reject · Manage preferences.
                You can change your decision at any time from this link:
              </p>
              <p className="mt-3">
                <ConsentPreferencesLink className="text-[#C8A45D] underline hover:text-[#E2C98A] text-base" />
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">4. Withdrawing consent</h2>
              <p>
                You can withdraw your consent at any time from the preferences modal. Withdrawal:
              </p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Immediately stops the sending of events to analytics or marketing.</li>
                <li>Removes third-party cookies previously set when technically possible.</li>
                <li>Is recorded as evidence with a timestamp and IP hash.</li>
              </ul>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">5. Effect of rejecting</h2>
              <p>
                Rejecting analytics or marketing cookies does not affect the operation of the site. Rejecting the necessary category is not possible without breaking the basic consent functionality.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">6. Third-party trackers</h2>
              <p>
                When you accept the analytics category, Google Analytics 4 may use its own cookies subject to its privacy policy.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">7. Contact</h2>
              <p>
                Questions about this Cookie Policy: <a href={`mailto:${CLIENT.email}`} className="text-[#C8A45D] underline">{CLIENT.email}</a>.
              </p>
            </div>
          </section>
        </article>
      </main>
      <Footer locale="en" />
    </>
  );
}
