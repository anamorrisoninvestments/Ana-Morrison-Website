import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import LegalDraftBanner from "@/components/ui/LegalDraftBanner";
import { CLIENT } from "@/lib/client-data";

export const metadata: Metadata = {
  title: "Terms of Use | AnaMaría Morrison",
  description: "Terms of use for anamorrison.com. Provisional draft.",
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
  return (
    <>
      <Navbar locale="en" />
      <main className="pt-24 bg-[#0D0A08] text-[#F7F3EC]/85">
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <LegalDraftBanner locale="en" />
            <h1 className="heading-serif text-4xl text-[#F7F3EC] mb-8">Terms of Use</h1>
            <div className="space-y-6 leading-relaxed">
              <p>These Terms of Use govern your access to and use of anamorrison.com. By using this site, you agree to these terms.</p>

              <h2 className="heading-serif text-2xl text-[#F7F3EC] mt-8">1. Educational content</h2>
              <p>All content on this site is provided for educational and informational purposes only. It is not legal, tax, financial, or investment advice. Consult qualified professionals before making decisions.</p>

              <h2 className="heading-serif text-2xl text-[#F7F3EC] mt-8">2. No guarantees</h2>
              <p>Any historical results, case studies, or examples described are specific to the situation described and do not represent averages, expectations, projections, or guarantees. Individual results depend on many factors beyond our control.</p>

              <h2 className="heading-serif text-2xl text-[#F7F3EC] mt-8">3. Intellectual property</h2>
              <p>All content, brand elements, and materials on this site are owned by AnaMaría Morrison and The Host Circle unless otherwise credited. You may not reproduce or distribute content without permission.</p>

              <h2 className="heading-serif text-2xl text-[#F7F3EC] mt-8">4. Prohibited use</h2>
              <p>You may not use this site to violate applicable law, harm others, or attempt to access parts of the site not intended for public use.</p>

              <h2 className="heading-serif text-2xl text-[#F7F3EC] mt-8">5. Third-party links</h2>
              <p>External links are provided for convenience. We are not responsible for third-party content or practices.</p>

              <h2 className="heading-serif text-2xl text-[#F7F3EC] mt-8">6. Tax Deed disclaimer</h2>
              <p>This site is for educational purposes only. It is not legal, tax, or investment advice. Tax deed rules, procedures, auction mechanics, surviving interests, title requirements, and buyer eligibility vary by state and county. Regulations change over time. Before participating in any tax deed auction, consult qualified legal, tax, and title professionals licensed in the relevant jurisdiction. No specific outcome is promised or guaranteed.</p>

              <h2 className="heading-serif text-2xl text-[#F7F3EC] mt-8">7. Changes</h2>
              <p>These terms may change. Continued use of the site after changes indicates acceptance of the new terms. Current version is provisional and pending legal review.</p>

              <h2 className="heading-serif text-2xl text-[#F7F3EC] mt-8">8. Contact</h2>
              <p>Questions about these terms: <a href={`mailto:${CLIENT.email}`} className="text-[#C8A45D] hover:underline">{CLIENT.email}</a></p>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  );
}
