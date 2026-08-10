import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import LegalDraftBanner from "@/components/ui/LegalDraftBanner";
import ConsentPreferencesLink from "@/components/consent/ConsentPreferencesLink";
import { CLIENT } from "@/lib/client-data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How we handle your personal data on anamorrison.com. Provisional draft pending legal review.",
  alternates: {
    canonical: "/en/privacy-policy",
    languages: { "es-US": "/politica-de-privacidad", "en-US": "/en/privacy-policy", "x-default": "/politica-de-privacidad" },
  },
  robots: { index: false, follow: true },
  openGraph: {
    locale: "en_US",
    alternateLocale: "es_US",
    url: `${CLIENT.siteUrl}/en/privacy-policy`,
    title: "Privacy Policy | AnaMaría Morrison",
  },
};

export default function PrivacyEN() {
  const lastUpdated = "2026-08-01";
  const version = process.env.NEXT_PUBLIC_CONSENT_VERSION || "v1.0";
  return (
    <>
      <Navbar locale="en" />
      <main className="pt-32 pb-16 bg-[#0D0A08]">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-[#F7F3EC]">
          <nav className="text-[#888888] text-sm mb-6">
            <Link href="/en" className="hover:text-[#C8A45D]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#C8A45D]">Privacy Policy</span>
          </nav>

          <h1 className="heading-serif text-4xl sm:text-5xl mb-4">Privacy Policy</h1>
          <p className="text-[#888888] text-sm mb-2">Last updated: {lastUpdated} · Version: {version}</p>

          <LegalDraftBanner locale="en" />

          <section className="space-y-6 text-[#F7F3EC]/85 text-base leading-relaxed">
            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">1. Controller</h2>
              <p>
                The site <strong>anamorrison.com</strong> is operated by AnaMaría Morrison.
                For questions related to this policy: <a href={`mailto:${CLIENT.email}`} className="text-[#C8A45D] underline">{CLIENT.email}</a>.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">2. Data we collect</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Data you provide: name, email, WhatsApp, property city, property type, allocated capital (range), free-text message and other contact-form or resource-download fields.</li>
                <li>Technical data: device, operating system, summarized browser signal (no fingerprint), pages visited, referrer, UTM parameters.</li>
                <li>Consent data: cookie preferences with timestamp and an irreversible hash of your IP address.</li>
              </ul>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">3. Purpose and legal basis</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Explicit consent for the sending of communications and educational content.</li>
                <li>Performance of a request submitted by you (responding to your form).</li>
                <li>Legitimate interest in operating the site, preventing fraud, and improving services.</li>
                <li>Compliance with applicable legal obligations.</li>
              </ul>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">4. Who we share data with</h2>
              <p>
                We work with technology providers acting as data processors:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li><strong>Vercel</strong> — hosting and CDN</li>
                <li><strong>Supabase</strong> — operational database</li>
                <li><strong>Resend</strong> — transactional email</li>
                <li><strong>Google Analytics 4</strong> — usage analytics, only if you accept analytics cookies</li>
              </ul>
              <p className="mt-3">We do not use the sale of personal data as a business model.</p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">5. International transfers</h2>
              <p>
                Some providers process data in the United States. The standard contractual safeguards of each provider apply.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">6. Retention (provisional, pending legal review)</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Leads without an active commercial relationship: provisional maximum of 24 months from last activity, then anonymization.</li>
                <li>Leads with an active commercial relationship: no automatic cutoff while active.</li>
                <li>Clients and transactions: as required by applicable contractual, accounting, and tax obligations.</li>
                <li>Consent records: minimum evidence required; period subject to legal review.</li>
              </ul>
              <p className="text-[#888888] text-sm italic mt-3">
                These periods are provisional and remain subject to review by qualified counsel.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">7. Your rights</h2>
              <p>
                You may request at any time: access, rectification, objection, deletion, portability, and withdrawal of consent.
                Requests to <a href={`mailto:${CLIENT.email}`} className="text-[#C8A45D] underline">{CLIENT.email}</a>. We respond within the time required by applicable law.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">8. Cookies</h2>
              <p>
                See the <Link href="/en/cookie-policy" className="text-[#C8A45D] underline">Cookie Policy</Link>.
                You can change your preferences at any time: <ConsentPreferencesLink className="text-[#C8A45D] underline" />.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">9. Minors</h2>
              <p>
                This site is not directed at persons under 18 years of age. If you become aware that a minor has provided data, please contact us to have it removed.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">10. Changes to this policy</h2>
              <p>
                We will publish changes on this same page with an updated date and version. Material changes will be notified by email to active subscribers and will require re-acceptance of the applicable consent.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">11. Governing law</h2>
              <p>
                See the <Link href="/en/terms-of-use" className="text-[#C8A45D] underline">Terms of Use</Link>. Provisional jurisdiction: State of Florida, United States.
              </p>
            </div>
          </section>
        </article>
      </main>
      <Footer locale="en" />
    </>
  );
}
