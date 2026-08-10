import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import LegalDraftBanner from "@/components/ui/LegalDraftBanner";
import { CLIENT } from "@/lib/client-data";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for anamorrison.com. Provisional draft pending legal review.",
  alternates: {
    canonical: "/en/terms-of-use",
    languages: { "es-US": "/terminos-de-uso", "en-US": "/en/terms-of-use", "x-default": "/terminos-de-uso" },
  },
  robots: { index: false, follow: true },
  openGraph: {
    locale: "en_US",
    alternateLocale: "es_US",
    url: `${CLIENT.siteUrl}/en/terms-of-use`,
    title: "Terms of Use | AnaMaría Morrison",
  },
};

export default function TermsEN() {
  const lastUpdated = "2026-08-01";
  return (
    <>
      <Navbar locale="en" />
      <main className="pt-32 pb-16 bg-[#0D0A08]">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-[#F7F3EC]">
          <nav className="text-[#888888] text-sm mb-6">
            <Link href="/en" className="hover:text-[#C8A45D]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#C8A45D]">Terms of Use</span>
          </nav>

          <h1 className="heading-serif text-4xl sm:text-5xl mb-4">Terms of Use</h1>
          <p className="text-[#888888] text-sm mb-2">Last updated: {lastUpdated}</p>

          <LegalDraftBanner locale="en" />

          <section className="space-y-6 text-[#F7F3EC]/85 text-base leading-relaxed">
            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">1. Acceptance</h2>
              <p>Use of the site implies acceptance of these terms.</p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">2. Permitted use</h2>
              <p>
                The content of the site is educational and informational in nature. You may use it for your personal decision-making on a non-commercial basis.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">3. Intellectual property</h2>
              <p>
                All content (text, images, the &ldquo;The Host Circle&rdquo; brand, downloadable materials) is the property of AnaMaría Morrison or its respective authors and is protected by copyright. You may not copy, redistribute, resell, or create derivative works without prior written authorization.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">4. Nature of the content</h2>
              <p>
                The site provides educational content, not individualized professional advice.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">5. Results disclaimer</h2>
              <p>
                The content of this site is educational and informational in nature. It does not guarantee economic, commercial, legal, tax, or investment results. Past results do not predict future results. Every decision must be based on your own due diligence and, where applicable, on independent professional advice.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">6. Specific Tax Deed disclaimer</h2>
              <p>
                Content related to Tax Deed is exclusively educational. It does not constitute legal, financial, or tax advice. Tax Deed auctions are regulated by the applicable state and county law, and their rules can vary significantly. Every investment in Tax Deed auctions involves risks, including legal, title, physical condition, occupancy, and market risks. Before participating in an auction you must conduct independent due diligence and, where applicable, consult a real estate attorney licensed in the relevant jurisdiction. AnaMaría Morrison does not provide legal, tax, or fiduciary advisory services.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">7. Limitation of liability</h2>
              <p>
                To the maximum extent permitted by applicable law, AnaMaría Morrison shall not be liable for decisions made based on the content of the site.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">8. Third-party links</h2>
              <p>We do not control or endorse the content of external sites we link to.</p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">9. Modifications</h2>
              <p>We may update these terms. Continued use after changes implies acceptance.</p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">10. Governing law and jurisdiction</h2>
              <p>
                Provisionally, these terms are governed by the laws of the State of Florida, United States, without regard to its conflict-of-laws principles. Any dispute related to use of the site shall provisionally be submitted to the competent courts of the State of Florida, subject to legal review.
              </p>
              <p className="text-[#888888] text-sm italic mt-3">
                Internal note: provisional jurisdiction. Pending confirmation by qualified counsel.
              </p>
            </div>

            <div>
              <h2 className="heading-serif text-2xl text-[#C8A45D] mt-8 mb-3">11. Contact</h2>
              <p>
                Questions about these terms: <a href={`mailto:${CLIENT.email}`} className="text-[#C8A45D] underline">{CLIENT.email}</a>.
              </p>
            </div>
          </section>
        </article>
      </main>
      <Footer locale="en" />
    </>
  );
}
