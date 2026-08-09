import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { CLIENT } from "@/lib/client-data";

export const metadata: Metadata = {
  title: `${CLIENT.nameShort} | Short-Term Rental Strategist & Tax Deed Investor`,
  description:
    "AnaMaría Morrison helps investors and property owners identify Tax Deed opportunities, transform properties, and build stronger short-term rental performance through strategy, systems, and professional operations.",
  alternates: {
    canonical: "/en",
    languages: { "es-US": "/", "en-US": "/en", "x-default": "/" },
  },
  openGraph: {
    locale: "en_US",
    alternateLocale: "es_US",
    url: `${CLIENT.siteUrl}/en`,
    title: `${CLIENT.nameShort} | Short-Term Rental Strategist & Tax Deed Investor`,
    description:
      "Real estate strategy: Tax Deed acquisition intelligence and short-term rental operations across 4 countries.",
  },
};

export default function EnglishHome() {
  return (
    <>
      <Navbar locale="en" />
      <main className="pt-20 bg-[#0D0A08]">
        <section className="min-h-screen flex items-center bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#10145F]/20 via-black to-black" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="h-px w-8 bg-[#C8A45D]" />
                <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
                  AnaMaría Morrison · Real Estate Investor &amp; Strategist
                </span>
              </div>
              <h1 className="heading-serif text-5xl sm:text-6xl lg:text-7xl text-[#F7F3EC] mb-6 leading-[1.02]">
                Real estate <span className="text-gold-gradient italic">strategy</span>, from{" "}
                <span className="text-blue-gradient italic">acquisition</span> to operations.
              </h1>
              <p className="text-[#F7F3EC]/70 text-lg leading-relaxed max-w-2xl mb-8">
                I help investors and property owners identify Tax Deed opportunities, transform properties, and build stronger short-term rental performance through strategy, systems, and professional operations.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/en/contact"
                  className="px-8 py-4 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#E2C98A] transition-all hover:shadow-[0_0_40px_rgba(200,164,93,0.45)]"
                >
                  Explore How We Can Work Together
                </Link>
                <Link
                  href="/en/about"
                  className="px-8 py-4 rounded-full border border-[#C8A45D]/40 text-[#F7F3EC] font-semibold tracking-widest uppercase text-sm hover:border-[#C8A45D] hover:text-[#C8A45D] transition-colors"
                >
                  See My Track Record
                </Link>
              </div>
              <p className="mt-8 text-[#888888] text-xs tracking-wider">
                9+ years of experience · Operations across 4 countries · Multi-million-dollar real estate portfolio · Specialized training in Tax Deed analysis
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#0D0A08]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
            <article className="p-8 rounded-3xl border border-[#10145F]/40 bg-[#0f1226]">
              <p className="text-[#22AEEF] text-xs tracking-widest uppercase font-semibold mb-2">Pillar 01 · For Investors</p>
              <h2 className="heading-serif text-3xl text-[#F7F3EC] mb-4">Tax Deed &amp; Strategic Acquisition</h2>
              <p className="text-[#F7F3EC]/75 leading-relaxed mb-6">
                Research, due diligence, and strategy to identify and evaluate below-market real estate opportunities through county Tax Deed auctions.
              </p>
              <Link href="/en/tax-deed-investing" className="text-[#22AEEF] font-semibold hover:text-[#5cc7ff] transition-colors text-sm">
                Explore Tax Deed Investing →
              </Link>
            </article>

            <article className="p-8 rounded-3xl border border-[#C8A45D]/40 bg-[#1C1916]">
              <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-2">Pillar 02 · For Property Owners</p>
              <h2 className="heading-serif text-3xl text-[#F7F3EC] mb-4">Short-Term Rental Strategy</h2>
              <p className="text-[#F7F3EC]/75 leading-relaxed mb-6">
                Property assessment, transformation, launch, optimization, and professional management designed to position your property for stronger short-term rental performance.
              </p>
              <Link href="/en/short-term-rentals" className="text-[#C8A45D] font-semibold hover:text-[#E2C98A] transition-colors text-sm">
                Explore Short-Term Rentals →
              </Link>
            </article>
          </div>
        </section>

        <section className="py-20 text-center bg-[#141210]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-4">Your Next Step</p>
            <h2 className="heading-serif text-4xl sm:text-5xl text-[#F7F3EC] mb-8">
              Do you own a property, or are you looking for your next <span className="text-gold-gradient italic">investment opportunity?</span>
            </h2>
            <Link
              href="/en/contact"
              className="inline-block px-8 py-4 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#E2C98A] transition-all hover:shadow-[0_0_40px_rgba(200,164,93,0.45)]"
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
