import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { CLIENT } from "@/lib/client-data";

export const metadata: Metadata = {
  title: "About AnaMaría Morrison",
  description:
    "AnaMaría Morrison — Real Estate Investor & Strategist. 9+ years turning properties into high-performing assets through short-term rentals and Tax Deed. Operations across 4 countries.",
  alternates: {
    canonical: "/en/about",
    languages: { "es-US": "/sobre-mi", "en-US": "/en/about", "x-default": "/sobre-mi" },
  },
  openGraph: {
    locale: "en_US",
    alternateLocale: "es_US",
    url: `${CLIENT.siteUrl}/en/about`,
    title: "About AnaMaría Morrison",
    description: "9+ years in short-term rentals, professional management, and Tax Deed. Operations across 4 countries.",
  },
};

type TimelineEvent = { year: string; title: string; description: string };

const timeline: TimelineEvent[] = [
  {
    year: "2012–2013",
    title: "First real estate investment",
    description:
      "Acquired her first property in Colombia off-plan, in pre-construction, at age 22.",
  },
  {
    year: "2016",
    title: "First property delivered",
    description:
      "After roughly four years of construction, the property is delivered and initially operated as a long-term rental.",
  },
  {
    year: "March 2017",
    title: "Move to the United States",
    description:
      "Relocation to the United States while the property in Colombia continues to operate as a long-term rental.",
  },
  {
    year: "June 2017",
    title: "Transition to short-term rental",
    description:
      "Property transitioned to the STR model, managed remotely from the United States. Starting point of a professional trajectory in hospitality and short-term rentals.",
  },
  {
    year: "2023",
    title: "International expansion of operations",
    description:
      "Simultaneous management of short-term rental properties in the United States, Mexico, and Venezuela, in addition to continued operations in Colombia.",
  },
  {
    year: "2025",
    title: "Specialized Tax Deed training",
    description:
      "Specialized training in Tax Deed title and opportunity analysis with Marcos Jacobs, a Brazilian investor based in the United States who specializes in county auctions.",
  },
  {
    year: "2025",
    title: "Founding of The Host Circle",
    description:
      "Launch of The Host Circle as an educational platform to train property owners, investors, and operators in short-term rentals, hospitality, and systems building.",
  },
];

const philosophy = [
  {
    title: "Acquire with discipline",
    text: "Buying correctly is as important as knowing how to operate. Every property requires real prior analysis, not impulses.",
  },
  {
    title: "Systems before effort",
    text: "Sustainable profitability comes from processes, automation, and standards. Not from working more hours.",
  },
  {
    title: "Data, not promises",
    text: "Every investment decision should rest on verifiable numbers, not on optimism or storytelling.",
  },
  {
    title: "Honest education",
    text: "Talking about real risks, disclaimers, and due diligence matters as much as talking about returns.",
  },
];

const expertise = [
  { area: "Short-Term Rentals", detail: "Strategy, design, operations, and automation" },
  { area: "Professional Property Management", detail: "Co-hosting, arbitrage, and owner-operator models" },
  { area: "Tax Deed", detail: "Title analysis, screening, and county-level opportunities" },
  { area: "Real Estate Acquisition", detail: "Portfolio strategy and asset evaluation" },
  { area: "AI-Assisted Automation", detail: "Replicable systems for managing multiple properties" },
  { area: "Revenue Management", detail: "Dynamic pricing and income optimization" },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${CLIENT.siteUrl}/en` },
    { "@type": "ListItem", position: 2, name: "About", item: `${CLIENT.siteUrl}/en/about` },
  ],
};

export default function AboutEN() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar locale="en" />
      <main className="bg-[#0D0A08]">
        {/* Hero */}
        <section className="pt-40 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#10145F]/15 via-[#0D0A08] to-[#0D0A08]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-[#888888] text-sm mb-8">
              <Link href="/en" className="hover:text-[#C8A45D] transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-[#C8A45D]">About</span>
            </nav>
            <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
              <div>
                <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
                  AnaMaría Morrison · Real Estate Investor &amp; Strategist
                </span>
                <h1 className="heading-serif text-5xl sm:text-6xl mt-4 mb-6 leading-[1.02] text-[#F7F3EC]">
                  Real estate investor and strategist in{" "}
                  <span className="text-gold-gradient italic">short-term rentals</span>{" "}
                  and <span className="text-blue-gradient italic">Tax Deed</span>.
                </h1>
                <p className="text-[#F7F3EC]/75 text-lg leading-relaxed mb-8 max-w-2xl">
                  9+ years turning properties into high-performing assets. Operations across 4 countries, a multi-million-dollar real estate portfolio, and specialized training in Tax Deed property and title analysis.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/en/contact"
                    className="px-7 py-3.5 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-xs hover:bg-[#E2C98A] transition-all hover:shadow-[0_0_32px_rgba(200,164,93,0.4)]"
                  >
                    Work With Me
                  </Link>
                  <Link
                    href="/en/case-studies"
                    className="px-7 py-3.5 rounded-full border border-[#C8A45D]/40 text-[#F7F3EC] tracking-widest uppercase text-xs hover:border-[#C8A45D] hover:text-[#C8A45D] transition-all hover:bg-[#C8A45D]/5"
                  >
                    See Case Studies
                  </Link>
                </div>
              </div>

              <div className="relative hidden lg:block max-w-md mx-auto w-full">
                <div className="relative w-full aspect-[3/4]">
                  <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#C8A45D]/10 to-transparent blur-2xl" />
                  <div className="absolute -inset-3 rounded-[1.75rem] border border-[#C8A45D]/25" />
                  <div className="relative w-full h-full rounded-[1.25rem] overflow-hidden">
                    <Image
                      src="/images/anamaria-about.jpg"
                      alt="AnaMaría Morrison — Real Estate Investor &amp; Strategist"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 448px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0A08]/30 via-transparent to-transparent" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-[#C8A45D] rounded-br-xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Origin story */}
        <section className="py-20 bg-[#141210]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">Origin Story</span>
            <h2 className="heading-serif text-3xl sm:text-4xl mt-3 mb-8 text-[#F7F3EC]">
              From a first property to an <span className="text-gold-gradient italic">operating portfolio</span>
            </h2>
            <div className="space-y-5 text-[#F7F3EC]/80 text-base leading-relaxed">
              <p>
                I bought my first property off-plan at 22. After it was delivered in 2016, I initially kept it as a long-term rental. In June 2017, already living in the United States, I transitioned it to short-term rental and began managing it remotely. That experience became the starting point of an international trajectory in hospitality, property management, and real estate investing.
              </p>
              <p>
                Since 2023 I have managed operations in the United States, Mexico, Venezuela, and Colombia. In 2025 I expanded my training in Tax Deed title and property analysis and founded The Host Circle to share systems, hands-on experience, and real estate profitability strategies.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 bg-[#0D0A08] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,164,93,0.04)_0%,transparent_60%)]" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-14 text-center">
              <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">Professional Trajectory</span>
              <h2 className="heading-serif text-4xl sm:text-5xl mt-4 text-[#F7F3EC]">
                <span className="text-gold-gradient italic">Timeline</span>
              </h2>
            </div>

            <ol className="relative border-l-2 border-[#C8A45D]/25 ml-3 space-y-10">
              {timeline.map((t) => (
                <li key={t.title} className="pl-8 relative">
                  <span className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-[#C8A45D] border-4 border-[#0D0A08]" />
                  <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-1">{t.year}</p>
                  <h3 className="heading-serif text-2xl text-[#F7F3EC] mb-2">{t.title}</h3>
                  <p className="text-[#F7F3EC]/70 text-sm leading-relaxed">{t.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Areas of expertise */}
        <section className="py-20 bg-[#141210]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">Areas of Expertise</span>
              <h2 className="heading-serif text-4xl sm:text-5xl mt-4 text-[#F7F3EC]">
                Technical <span className="text-gold-gradient italic">specialties</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {expertise.map((e) => (
                <div key={e.area} className="p-6 rounded-2xl border border-[#C8A45D]/15 bg-[#1C1916] hover:border-[#C8A45D]/40 transition-all">
                  <h3 className="heading-serif text-xl text-[#F7F3EC] mb-2">{e.area}</h3>
                  <p className="text-[#F7F3EC]/70 text-sm leading-relaxed">{e.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-24 bg-[#0D0A08]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">Investment Philosophy</span>
              <h2 className="heading-serif text-4xl sm:text-5xl mt-4 text-[#F7F3EC]">
                How I <span className="text-gold-gradient italic">think</span> about real estate
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {philosophy.map((p) => (
                <div key={p.title} className="p-7 rounded-2xl border border-[#C8A45D]/15 bg-[#1C1916]">
                  <h3 className="heading-serif text-xl text-[#C8A45D] mb-3">{p.title}</h3>
                  <p className="text-[#F7F3EC]/75 text-sm leading-relaxed">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Markets */}
        <section className="py-16 bg-[#141210]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 rounded-2xl border border-[#22AEEF]/25 bg-[#10145F]/12">
              <p className="text-[#22AEEF] text-xs tracking-widest uppercase font-semibold mb-4">Markets with Operations or Experience</p>
              <div className="flex flex-wrap gap-3">
                {["United States", "Mexico", "Colombia", "Venezuela"].map((c) => (
                  <span key={c} className="px-4 py-2 rounded-full bg-[#22AEEF]/10 text-[#22AEEF] text-sm border border-[#22AEEF]/25">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-[#0D0A08] text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#C8A45D]/5 blur-3xl pointer-events-none" />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="heading-serif text-4xl sm:text-5xl mb-6 text-[#F7F3EC] leading-tight">
              Shall we start working on your <span className="text-gold-gradient italic">next asset</span>?
            </h2>
            <p className="text-[#F7F3EC]/70 text-lg mb-10">
              Pick the option that matches your situation and let's talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/en/contact?interes=str-rentabilizar"
                className="px-8 py-4 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#E2C98A] transition-all hover:shadow-[0_0_40px_rgba(200,164,93,0.45)]"
              >
                Improve My Property's Performance
              </Link>
              <Link
                href="/en/contact?interes=tax-deed-oportunidades"
                className="px-8 py-4 rounded-full bg-[#22AEEF] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#22AEEF]/90 transition-all hover:shadow-[0_0_40px_rgba(34,174,239,0.45)]"
              >
                Explore Tax Deed
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  );
}
