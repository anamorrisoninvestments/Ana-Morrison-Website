import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { CLIENT } from "@/lib/client-data";

export const metadata: Metadata = {
  title: "Resources | AnaMaría Morrison",
  description:
    "Educational resources on short-term rentals, Tax Deed investing, credit, and building a real estate business — from operations to strategy.",
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

const resources = [
  { title: "The 5 Paths to Building a Short-Term Rental Business", href: "/en/blog/5-paths-to-wealth-with-short-term-rentals", tag: "Strategy" },
  { title: "What Is a Tax Deed", href: "/en/blog/what-is-a-tax-deed", tag: "Tax Deed" },
  { title: "What Is a Short-Term Rental", href: "/en/blog/what-is-a-short-term-rental", tag: "Basics" },
  { title: "Tax Deed Investing in Florida · Beginner's Guide", href: "/en/blog/florida-tax-deed-investing-beginners-guide", tag: "Tax Deed" },
  { title: "Airbnb Co-Hosting Complete Guide", href: "/en/blog/airbnb-co-hosting-complete-guide", tag: "Operations" },
  { title: "Best Florida Airbnb Markets", href: "/en/blog/best-florida-airbnb-markets", tag: "Market" },
];

export default function ResourcesEN() {
  return (
    <>
      <Navbar locale="en" />
      <main className="pt-20 bg-[#0D0A08]">
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">Resources</span>
            <h1 className="heading-serif text-5xl sm:text-6xl text-[#F7F3EC] mt-4 mb-6 leading-[1.02]">
              Learn the <span className="text-gold-gradient italic">strategy</span>.
            </h1>
            <p className="text-[#F7F3EC]/70 text-lg max-w-3xl mb-12">
              A curated selection of articles and guides on short-term rentals, Tax Deed investing, credit, and the systems that make growth sustainable.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((r) => (
                <Link key={r.href} href={r.href} className="p-6 rounded-2xl border border-[#C8A45D]/15 bg-[#141210] hover:border-[#C8A45D]/50 transition-colors block">
                  <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-3">{r.tag}</p>
                  <p className="text-[#F7F3EC] font-medium leading-snug">{r.title}</p>
                </Link>
              ))}
            </div>
            <div className="mt-12">
              <Link href="/en/blog" className="inline-block px-6 py-3 rounded-full border border-[#C8A45D]/40 text-[#F7F3EC] font-semibold tracking-wider uppercase text-sm hover:border-[#C8A45D] hover:text-[#C8A45D]">
                See the full blog
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  );
}
