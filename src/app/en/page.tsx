import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { CLIENT } from "@/lib/client-data";
import Link from "next/link";

export const metadata: Metadata = {
  title: `${CLIENT.nameShort} | Short-Term Rental Expert & Real Estate Investor`,
  description: CLIENT.bio.shortEN,
  alternates: { canonical: "/en", languages: { es: "/" } },
  openGraph: {
    locale: "en_US",
    alternateLocale: "es_US",
    title: `${CLIENT.nameShort} | Short-Term Rental Expert & Real Estate Investor`,
    description: CLIENT.bio.shortEN,
  },
};

export default function EnglishPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="min-h-screen flex items-center bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#10145F]/20 via-black to-black" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="h-px w-8 bg-[#C8A45D]" />
                <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
                  Founder & CEO · The Host Circle
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="text-[#F7F3EC]">Ana</span>
                <span className="text-gold-gradient">Maria</span>
                <br />
                <span className="text-[#F7F3EC]">Morrison</span>
              </h1>
              <p className="text-[#F7F3EC]/70 text-xl leading-relaxed mb-4 max-w-2xl">
                Entrepreneur, real estate investor, and short-term rental strategist with over{" "}
                <strong className="text-[#C8A45D]">9 years of experience</strong> turning properties into
                vehicles of financial freedom across 4 countries.
              </p>
              <p className="text-[#888888] text-sm italic mb-10 border-l-2 border-[#C8A45D]/40 pl-4">
                "{CLIENT.taglineEN}"
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <Link href="/contacto" className="px-8 py-4 bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#E2C98A] transition-colors text-center">
                  Let&apos;s Work Together
                </Link>
                <Link href="/" className="px-8 py-4 border border-[#C8A45D]/40 text-[#F7F3EC] tracking-widest uppercase text-sm hover:border-[#C8A45D] hover:text-[#C8A45D] transition-colors text-center">
                  Ver en Español →
                </Link>
              </div>
              <div className="grid grid-cols-4 gap-4 pt-10 border-t border-[#C8A45D]/20">
                {CLIENT.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-[#C8A45D] text-2xl sm:text-3xl font-bold">{stat.value}</p>
                    <p className="text-[#888888] text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About EN */}
        <section className="py-24 bg-[#111111]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-[#F7F3EC] mb-8">
              More than managing properties,<br />
              <span className="text-gold-gradient">I build opportunities.</span>
            </h2>
            <p className="text-[#F7F3EC]/70 text-base leading-relaxed mb-6">{CLIENT.bio.shortEN}</p>
            <p className="text-[#F7F3EC]/70 text-base leading-relaxed mb-8">
              At 22, she acquired her first property in Colombia and transformed it from a traditional rental to an Airbnb model, tripling its income.
              Today, her portfolio spans millions of dollars, she operates in 4 countries, and is certified as a county auction analyst (tax deeds).
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {["Short-Term Rentals (STR)", "Tax Deed Investments", "Co-Hosting & Management", "Co-Living Strategies", "Real Estate Arbitrage", "1:1 Mentorship"].map((s) => (
                <div key={s} className="p-4 border border-[#C8A45D]/20 text-[#F7F3EC]/70 text-sm">✦ {s}</div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
