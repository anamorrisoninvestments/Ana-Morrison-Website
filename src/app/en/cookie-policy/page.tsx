import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import LegalDraftBanner from "@/components/ui/LegalDraftBanner";
import { CLIENT } from "@/lib/client-data";

export const metadata: Metadata = {
  title: "Cookie Policy | AnaMaría Morrison",
  description: "How anamorrison.com uses cookies. Provisional draft.",
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
  return (
    <>
      <Navbar locale="en" />
      <main className="pt-24 bg-[#0D0A08] text-[#F7F3EC]/85">
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <LegalDraftBanner locale="en" />
            <h1 className="heading-serif text-4xl text-[#F7F3EC] mb-8">Cookie Policy</h1>
            <div className="space-y-6 leading-relaxed">
              <p>This Cookie Policy explains how we use cookies and similar technologies on anamorrison.com.</p>

              <h2 className="heading-serif text-2xl text-[#F7F3EC] mt-8">1. Categories</h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Necessary</strong> — required for the site to work (session, consent record). Cannot be disabled.</li>
                <li><strong>Analytics</strong> — only when granted: help us understand site usage subject to Google Analytics settings and policies.</li>
                <li><strong>Marketing</strong> — for future campaigns. Currently inactive.</li>
              </ul>

              <h2 className="heading-serif text-2xl text-[#F7F3EC] mt-8">2. Managing your preferences</h2>
              <p>You can change your preferences at any time using the "Cookie preferences" link in the footer or by clearing your browser cookies.</p>

              <h2 className="heading-serif text-2xl text-[#F7F3EC] mt-8">3. Cookies we may set</h2>
              <ul className="list-disc list-inside space-y-2">
                <li><code className="text-[#C8A45D]">amc_consent</code> — records your consent choices.</li>
                <li><code className="text-[#C8A45D]">amc_session</code> — session identifier.</li>
                <li>Google Analytics cookies (only when analytics consent is granted).</li>
              </ul>

              <h2 className="heading-serif text-2xl text-[#F7F3EC] mt-8">4. Contact</h2>
              <p>Questions: <a href={`mailto:${CLIENT.email}`} className="text-[#C8A45D] hover:underline">{CLIENT.email}</a></p>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  );
}
