import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { CLIENT } from "@/lib/client-data";

export const metadata: Metadata = {
  title: "Resources | Short-Term Rentals and Tax Deed | AnaMaría Morrison",
  description:
    "Guides, articles, tools, and education on short-term rentals and Tax Deed. Educational content for investors and property owners.",
  alternates: {
    canonical: "/en/resources",
    languages: { "es-US": "/recursos", "en-US": "/en/resources", "x-default": "/recursos" },
  },
  openGraph: {
    locale: "en_US",
    alternateLocale: "es_US",
    url: `${CLIENT.siteUrl}/en/resources`,
    title: "Resources | AnaMaría Morrison",
    description: "Short-term rental, Tax Deed, and real estate strategy resources.",
  },
};

const categories = [
  {
    title: "Short-Term Rentals",
    description: "Guides, strategies, and tools for property owners and operators.",
    href: "/en/blog?categoria=str",
    accent: "text-[#C8A45D]",
    border: "border-[#C8A45D]/25",
  },
  {
    title: "Tax Deed",
    description: "Education on county auctions, title analysis, and due diligence.",
    href: "/en/blog?categoria=tax-deed",
    accent: "text-[#22AEEF]",
    border: "border-[#22AEEF]/25",
  },
  {
    title: "The Host Circle",
    description: "Practical training to build and operate a professional short-term rental business.",
    href: "/en/contact?interes=host-circle",
    accent: "text-[#F0E4C8]",
    border: "border-[#C8A45D]/15",
  },
];

export default function ResourcesEN() {
  return (
    <>
      <Navbar locale="en" />
      <main className="bg-[#0D0A08]">
        <section className="pt-40 pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">Resources &amp; Education</span>
            <h1 className="heading-serif text-5xl sm:text-6xl mt-4 mb-6 leading-[1.02] text-[#F7F3EC]">
              Content to <span className="text-gold-gradient italic">decide better</span>.
            </h1>
            <p className="text-[#F7F3EC]/70 text-lg leading-relaxed max-w-3xl">
              Guides, articles, and tools focused exclusively on short-term rentals and Tax Deed.
            </p>
          </div>
        </section>

        <section className="py-16 bg-[#141210]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
            {categories.map((c) => (
              <Link key={c.title} href={c.href} className={`p-8 rounded-2xl border ${c.border} bg-[#1C1916] hover:bg-[#1C1916]/70 transition-all block`}>
                <span className={`${c.accent} text-xs tracking-widest uppercase font-semibold`}>Category</span>
                <h2 className="heading-serif text-2xl text-[#F7F3EC] mt-3 mb-4">{c.title}</h2>
                <p className="text-[#F7F3EC]/70 text-sm leading-relaxed mb-6">{c.description}</p>
                <span className={`${c.accent} text-sm tracking-widest uppercase font-semibold`}>Explore →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-20 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="heading-serif text-3xl sm:text-4xl text-[#F7F3EC] mb-6">Explore the full blog</h2>
            <Link
              href="/en/blog"
              className="inline-block px-8 py-4 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#E2C98A] transition-all hover:shadow-[0_0_40px_rgba(200,164,93,0.45)]"
            >
              See all resources
            </Link>
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  );
}
