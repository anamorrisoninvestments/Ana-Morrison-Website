import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { CLIENT } from "@/lib/client-data";

export const metadata: Metadata = {
  title: "Tax Deed Investing | Real Estate Through County Auctions",
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

export default function TaxDeedInvestingEN() {
  return (
    <>
      <Navbar locale="en" />
      <main className="pt-20 bg-[#0D0A08]">
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#22AEEF] text-xs tracking-widest uppercase font-semibold">For Investors</span>
            <h1 className="heading-serif text-5xl sm:text-6xl text-[#F7F3EC] mt-4 mb-6 leading-[1.02]">
              Tax Deed <span className="text-blue-gradient italic">Investing</span>.
            </h1>
            <p className="text-[#F7F3EC]/80 text-lg leading-relaxed max-w-3xl mb-12">
              Education, analysis, and tools to identify Tax Deed opportunities. Learn how to evaluate properties before you bid at a county auction.
            </p>

            <ul className="grid sm:grid-cols-2 gap-4 mb-16">
              {[
                ["Opportunity sourcing", "Where and when auctions happen."],
                ["Title screening", "Chain of title, surviving interests, encumbrances."],
                ["Pre-auction analysis", "Comparables, value context, renovation estimation."],
                ["Risk assessment", "The specific risks that matter before bidding."],
                ["Acquisition strategy", "Maximum bid discipline with a documented safety margin."],
                ["Investor education", "How the process actually works, jurisdiction by jurisdiction."],
                ["Exit strategy analysis", "Resell, long-term rental, or short-term rental."],
              ].map(([title, desc]) => (
                <li key={title} className="p-6 rounded-2xl bg-[#141210] border border-[#22AEEF]/20">
                  <p className="text-[#22AEEF] font-semibold mb-1">{title}</p>
                  <p className="text-[#F7F3EC]/70 text-sm">{desc}</p>
                </li>
              ))}
            </ul>

            <div className="p-8 rounded-2xl bg-[#0f1226] border border-[#22AEEF]/30 mb-10">
              <p className="text-[#22AEEF] text-xs tracking-widest uppercase font-semibold mb-2">About the Credential</p>
              <p className="text-[#F7F3EC]/85 leading-relaxed">
                AnaMaría Morrison is a <strong className="text-white">Certified Tax Deed Title Analyst</strong>. Her methodology is designed to support a more structured due diligence process. It does not eliminate risk. Outcomes depend on the specific property, jurisdiction, county rules, market conditions, and execution.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#1C1916] border border-[#C8A45D]/20 mb-10">
              <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-2">Tax Deed Disclaimer</p>
              <p className="text-[#F7F3EC]/80 leading-relaxed text-sm">
                This page is for educational purposes only. It is not legal, tax, or investment advice. Tax deed rules, procedures, auction mechanics, surviving interests, title requirements, and buyer eligibility vary by state and county. Regulations change over time. Before participating in any tax deed auction, consult qualified legal, tax, and title professionals licensed in the relevant jurisdiction. No specific outcome is promised or guaranteed.
              </p>
            </div>

            <Link
              href="/en/contact"
              className="inline-block px-8 py-4 rounded-full bg-[#22AEEF] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#5cc7ff] transition-all"
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
