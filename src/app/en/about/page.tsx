import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { CLIENT } from "@/lib/client-data";

export const metadata: Metadata = {
  title: "About AnaMaría Morrison",
  description:
    "9+ years turning properties into high-performing assets. Operations across 4 countries, a multi-million-dollar real estate portfolio, and specialized training in Tax Deed property and title analysis.",
  alternates: {
    canonical: "/en/about",
    languages: { "es-US": "/sobre-mi", "en-US": "/en/about", "x-default": "/sobre-mi" },
  },
  openGraph: {
    locale: "en_US",
    alternateLocale: "es_US",
    url: `${CLIENT.siteUrl}/en/about`,
    title: "About AnaMaría Morrison",
    description: "9+ years turning properties into high-performing assets across 4 countries.",
  },
};

export default function AboutEN() {
  return (
    <>
      <Navbar locale="en" />
      <main className="pt-20 bg-[#0D0A08]">
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">My Story</span>
            <h1 className="heading-serif text-5xl sm:text-6xl text-[#F7F3EC] mt-4 mb-8 leading-[1.02]">
              Real estate: <span className="text-gold-gradient italic">investing</span> and{" "}
              <span className="text-blue-gradient italic">Tax Deed</span>
            </h1>
            <p className="text-[#F7F3EC]/80 text-lg leading-relaxed mb-6">
              9+ years turning properties into high-performing assets. Operations across 4 countries, a multi-million-dollar real estate portfolio, and specialized training in Tax Deed property and title analysis.
            </p>
            <p className="text-[#F7F3EC]/80 text-lg leading-relaxed mb-6">
              At 22, I bought my first property in Colombia — off-plan, in pre-construction. Years later, once it was delivered, I first operated it as a long-term rental. When I transitioned it to Airbnb, the income tripled. That experience showed me how dramatically the right operating strategy can change what a real estate asset produces.
            </p>
            <p className="text-[#F7F3EC]/80 text-lg leading-relaxed mb-6">
              Today I hold a multi-million-dollar real estate portfolio, operate properties across 4 countries, have specialized training in Tax Deed property and title analysis, and help investors replicate my methodology through The Host Circle.
            </p>
            <blockquote className="border-l-4 border-[#C8A45D] pl-6 my-10 text-[#F7F3EC]/85 italic text-xl leading-relaxed">
              "Wealth isn't improvised. It's built with vision, education, credit, strategy, systems, and consistent action."
            </blockquote>

            <h2 className="heading-serif text-3xl text-[#F7F3EC] mt-16 mb-6">Timeline</h2>
            <ol className="space-y-6 text-[#F7F3EC]/80">
              <li><span className="text-[#C8A45D] font-semibold">Age 22 · Colombia</span> — First property acquired in pre-construction.</li>
              <li><span className="text-[#C8A45D] font-semibold">Years later</span> — Property delivered; operated as a long-term rental.</li>
              <li><span className="text-[#C8A45D] font-semibold">Post-transition</span> — Moved to Airbnb; property revenue tripled.</li>
              <li><span className="text-[#C8A45D] font-semibold">Expansion</span> — Operations across the United States, Mexico, Colombia, and Venezuela.</li>
              <li><span className="text-[#C8A45D] font-semibold">2025 · Tax Deed</span> — Specialized training in Tax Deed title and opportunity analysis with Marcos Jacobs, a Brazilian investor based in the United States who specializes in county auctions.</li>
              <li><span className="text-[#C8A45D] font-semibold">2025 · The Host Circle</span> — Launch of The Host Circle as an educational platform to train property owners, investors, and operators in short-term rentals, hospitality, and systems building.</li>
            </ol>

            <div className="mt-16 flex flex-wrap gap-4">
              <Link href="/en/short-term-rentals" className="px-6 py-3 rounded-full bg-[#C8A45D] text-black font-semibold tracking-wider uppercase text-sm">Explore Short-Term Rentals</Link>
              <Link href="/en/tax-deed-investing" className="px-6 py-3 rounded-full border border-[#22AEEF] text-[#22AEEF] font-semibold tracking-wider uppercase text-sm">Explore Tax Deed Investing</Link>
              <Link href="/en/contact" className="px-6 py-3 rounded-full border border-[#C8A45D]/40 text-[#F7F3EC] font-semibold tracking-wider uppercase text-sm hover:border-[#C8A45D]">Book a 1:1 Strategy Consultation</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  );
}
