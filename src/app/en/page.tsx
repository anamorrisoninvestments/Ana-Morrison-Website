import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0D0A08]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#10145F]/15 via-[#0D0A08] to-[#0D0A08]" />
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#C8A45D]/6 to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#C8A45D]/4 to-transparent" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#C8A45D 1px, transparent 1px), linear-gradient(90deg, #C8A45D 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-[#C8A45D]/25 bg-[#C8A45D]/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D] animate-pulse" />
                  <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
                    AnaMaría Morrison · Real Estate Investor &amp; Strategist
                  </span>
                </div>
                <h1 className="heading-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95] mb-6 text-[#F7F3EC]">
                  Real estate <span className="text-gold-gradient italic">strategy</span>, from{" "}
                  <span className="text-blue-gradient italic">acquisition</span> to operations.
                </h1>
                <p className="text-[#F7F3EC]/75 text-lg leading-relaxed mb-10 max-w-xl">
                  I help investors and property owners identify Tax Deed opportunities, transform properties, and build stronger short-term rental performance through strategy, systems, and professional operations.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <Link
                    href="/en/contact"
                    className="px-7 py-3.5 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-xs hover:bg-[#E2C98A] transition-all hover:shadow-[0_0_32px_rgba(200,164,93,0.4)] text-center"
                  >
                    Explore How We Can Work Together
                  </Link>
                  <Link
                    href="/en/about"
                    className="px-7 py-3.5 rounded-full border border-[#C8A45D]/40 text-[#F7F3EC] tracking-widest uppercase text-xs hover:border-[#C8A45D] hover:text-[#C8A45D] transition-all text-center hover:bg-[#C8A45D]/5"
                  >
                    See My Track Record
                  </Link>
                </div>
                <p className="text-[#888888] text-xs tracking-wider">
                  9+ years of experience · Operations across 4 countries · Multi-million-dollar real estate portfolio · Specialized training in Tax Deed analysis
                </p>
              </div>

              <div className="relative hidden lg:block">
                <div className="relative w-full aspect-[3/4] max-w-md mx-auto">
                  <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[#C8A45D]/10 to-transparent blur-2xl" />
                  <div className="absolute -inset-4 rounded-[1.75rem] border border-[#C8A45D]/25" />
                  <div className="absolute -inset-2 rounded-[1.5rem] border border-[#C8A45D]/10" />
                  <div className="relative w-full h-full rounded-[1.25rem] overflow-hidden">
                    <Image
                      src="/images/anamaria-morrison.jpg"
                      alt="AnaMaría Morrison — Real Estate Investor &amp; STR / Tax Deed Strategist"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 448px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0A08]/30 via-transparent to-transparent" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-[#C8A45D] rounded-br-xl" />
                  <div className="absolute -top-4 -left-4 w-14 h-14 border-t-2 border-l-2 border-[#C8A45D] rounded-tl-xl" />
                </div>
              </div>
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
