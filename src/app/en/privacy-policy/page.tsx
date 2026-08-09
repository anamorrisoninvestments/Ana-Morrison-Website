import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import LegalDraftBanner from "@/components/ui/LegalDraftBanner";
import { CLIENT } from "@/lib/client-data";

export const metadata: Metadata = {
  title: "Privacy Policy | AnaMaría Morrison",
  description: "How AnaMaría Morrison collects, uses, and protects your personal data on anamorrison.com. Provisional draft.",
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
  return (
    <>
      <Navbar locale="en" />
      <main className="pt-24 bg-[#0D0A08] text-[#F7F3EC]/85">
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <LegalDraftBanner locale="en" />
            <h1 className="heading-serif text-4xl text-[#F7F3EC] mb-8">Privacy Policy</h1>
            <div className="space-y-6 leading-relaxed">
              <p>This Privacy Policy explains how anamorrison.com, operated by AnaMaría Morrison, collects, uses, and protects the personal information you provide when using this site.</p>

              <h2 className="heading-serif text-2xl text-[#F7F3EC] mt-8">1. Who we are</h2>
              <p>This site is operated by AnaMaría Morrison. Contact: <a href={`mailto:${CLIENT.email}`} className="text-[#C8A45D] hover:underline">{CLIENT.email}</a>.</p>

              <h2 className="heading-serif text-2xl text-[#F7F3EC] mt-8">2. What data we collect</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Contact form data: name, email, phone/WhatsApp (optional), message content.</li>
                <li>Interest, property type, platform, experience, and capital fields when provided.</li>
                <li>Consent record: your choices for necessary, analytics, and marketing cookies.</li>
                <li>Technical logs: IP-derived rate-limit buckets (hashed), timestamps.</li>
              </ul>

              <h2 className="heading-serif text-2xl text-[#F7F3EC] mt-8">3. How we use it</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>To respond to your inquiry.</li>
                <li>To operate and protect the site (rate limiting, spam prevention).</li>
                <li>If you accept analytics cookies, to measure site usage subject to Google Analytics settings and policies.</li>
                <li>We do not use the sale of personal data as a business model.</li>
              </ul>

              <h2 className="heading-serif text-2xl text-[#F7F3EC] mt-8">4. Third-party processors</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Vercel — hosting and deployment.</li>
                <li>Supabase — database for leads and consent records.</li>
                <li>Resend — transactional email delivery.</li>
                <li>Google Analytics 4 — only when analytics consent is granted.</li>
              </ul>

              <h2 className="heading-serif text-2xl text-[#F7F3EC] mt-8">5. Your rights</h2>
              <p>You may request access, correction, or deletion of your personal data by contacting us at the email above. We respond within the time required by applicable law.</p>

              <h2 className="heading-serif text-2xl text-[#F7F3EC] mt-8">6. Cookies</h2>
              <p>See our <a href="/en/cookie-policy" className="text-[#C8A45D] hover:underline">Cookie Policy</a> for details on how we use cookies and how you can change your preferences.</p>

              <h2 className="heading-serif text-2xl text-[#F7F3EC] mt-8">7. Changes to this policy</h2>
              <p>We may update this policy. Material changes will be indicated on this page with an updated date. The current version is provisional and pending legal review.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  );
}
