import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { CLIENT } from "@/lib/client-data";

export const metadata: Metadata = {
  title: "Tax Deed Investing | Real Estate Through County Auctions | AnaMaría Morrison",
  description:
    "Education, analysis, and tools to identify Tax Deed opportunities. Learn how to evaluate properties before you bid at a county auction. Written by AnaMaría Morrison, Certified Tax Deed Title Analyst.",
  alternates: {
    canonical: "/en/tax-deed-investing",
    languages: { "es-US": "/tax-deed", "en-US": "/en/tax-deed-investing", "x-default": "/tax-deed" },
  },
  openGraph: {
    locale: "en_US",
    alternateLocale: "es_US",
    url: `${CLIENT.siteUrl}/en/tax-deed-investing`,
    title: "Tax Deed Investing | Real Estate Through County Auctions",
    description: "Education and analysis for county Tax Deed auctions.",
  },
};

const filters = [
  "Opportunity sourcing at the county level",
  "Preliminary title screening on available records",
  "Legal-risk identification (surviving interests, encumbrances)",
  "Property-condition analysis based on available records",
  "Post-acquisition cost estimation",
  "Exit-strategy evaluation (resell, LTR, STR)",
  "Structured education for investors",
];

const risks = [
  "Liens or encumbrances that may survive the tax deed sale",
  "Property condition unknown until on-site inspection is possible",
  "Regulatory differences between states and counties",
  "Holding and rehabilitation costs",
  "Legal timelines that vary by process and jurisdiction",
];

export default function TaxDeedInvestingEN() {
  return (
    <>
      <Navbar locale="en" />
      <main className="bg-[#0D0A08]">
        {/* Hero */}
        <section className="pt-40 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#10145F]/25 via-[#0D0A08] to-[#0D0A08]" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#22AEEF] text-xs tracking-widest uppercase font-semibold">
              For Investors · Tax Deed &amp; Strategic Acquisition
            </span>
            <h1 className="heading-serif text-5xl sm:text-6xl mt-4 mb-6 leading-[1.02] text-[#F7F3EC]">
              Identify{" "}
              <span className="text-blue-gradient italic">real estate opportunities</span>{" "}
              before the auction.
            </h1>
            <p className="text-[#F7F3EC]/70 text-lg leading-relaxed max-w-3xl mb-8">
              Education, analysis, and tools for investors who want to acquire properties through county Tax Deed auctions with real due diligence.
            </p>
            <Link
              href="/en/contact?interes=tax-deed-oportunidades"
              className="inline-block px-8 py-4 rounded-full bg-[#22AEEF] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#22AEEF]/90 transition-all hover:shadow-[0_0_40px_rgba(34,174,239,0.45)]"
            >
              Explore Tax Deed Investing
            </Link>
          </div>
        </section>

        {/* What it is */}
        <section className="py-20 bg-[#141210]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="heading-serif text-4xl text-[#F7F3EC] mb-6">
              What is a <span className="text-blue-gradient italic">Tax Deed sale</span>?
            </h2>
            <p className="text-[#F7F3EC]/75 text-lg leading-relaxed mb-4">
              It is a mechanism through which a county may auction the title of properties whose owners have fallen behind on property taxes. With a Tax Deed sale, the winning bidder may acquire ownership of the property rather than purchasing only the tax debt. The exact rights, procedures, surviving interests, and title requirements vary by state and county.
            </p>
            <p className="text-[#F7F3EC]/60 text-base leading-relaxed">
              Difference from a Tax Lien: with a Tax Lien Certificate the investor purchases the right to collect the delinquent tax debt plus interest; with a Tax Deed the property itself is auctioned. The exact rules vary by state and county.
            </p>
          </div>
        </section>

        {/* About the credential */}
        <section className="py-16 bg-[#0D0A08]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 rounded-2xl bg-[#0f1226] border border-[#22AEEF]/30">
              <p className="text-[#22AEEF] text-xs tracking-widest uppercase font-semibold mb-2">About the Credential</p>
              <p className="text-[#F7F3EC]/85 leading-relaxed">
                AnaMaría Morrison is a <strong className="text-white">Certified Tax Deed Title Analyst</strong>. Her methodology is designed to support a more structured due diligence process. It does not eliminate risk. Outcomes depend on the specific property, jurisdiction, county rules, market conditions, and execution.
              </p>
            </div>
          </div>
        </section>

        {/* Filters and Risks */}
        <section className="py-20 bg-[#141210]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
            <div>
              <span className="text-[#22AEEF] text-xs tracking-widest uppercase font-semibold">How I Help</span>
              <h3 className="heading-serif text-3xl text-[#F7F3EC] mt-3 mb-6">Analysis filters</h3>
              <ul className="space-y-3">
                {filters.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[#F7F3EC]/80">
                    <span className="text-[#22AEEF] mt-1.5">◆</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">Risks to Consider</span>
              <h3 className="heading-serif text-3xl text-[#F7F3EC] mt-3 mb-6">Due diligence is essential</h3>
              <ul className="space-y-3">
                {risks.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-[#F7F3EC]/80">
                    <span className="text-[#C8A45D] mt-1.5">◇</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Tax Deed disclaimer */}
        <section className="py-16 bg-[#0D0A08]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 rounded-2xl border border-[#C8A45D]/25 bg-[#1C1916]">
              <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-3">Tax Deed Disclaimer</p>
              <p className="text-[#F7F3EC]/75 text-sm leading-relaxed">
                This page is for educational purposes only. It is not legal, tax, or investment advice. Tax deed rules, procedures, auction mechanics, surviving interests, title requirements, and buyer eligibility vary by state and county. Regulations change over time. Before participating in any tax deed auction, consult qualified legal, tax, and title professionals licensed in the relevant jurisdiction. No specific outcome is promised or guaranteed.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-[#141210] text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="heading-serif text-4xl sm:text-5xl mb-6 text-[#F7F3EC] leading-tight">
              Want to evaluate specific <span className="text-blue-gradient italic">opportunities</span>?
            </h2>
            <p className="text-[#F7F3EC]/70 text-lg mb-10">
              Book a strategic conversation to talk through your specific case.
            </p>
            <Link
              href="/en/contact?interes=tax-deed-oportunidades"
              className="inline-block px-8 py-4 rounded-full bg-[#22AEEF] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#22AEEF]/90 transition-all hover:shadow-[0_0_40px_rgba(34,174,239,0.45)]"
            >
              Book a 1:1 Strategy Consultation
            </Link>
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  );
}
