import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { CLIENT } from "@/lib/client-data";

export const metadata: Metadata = {
  title: "Case Studies | AnaMaría Morrison",
  description:
    "Real property transformations and acquisition strategies. Verifiable short-term rental, management, and Tax Deed cases.",
  alternates: {
    canonical: "/en/case-studies",
    languages: { "es-US": "/casos-de-exito", "en-US": "/en/case-studies", "x-default": "/casos-de-exito" },
  },
  openGraph: {
    locale: "en_US",
    alternateLocale: "es_US",
    url: `${CLIENT.siteUrl}/en/case-studies`,
    title: "Case Studies | AnaMaría Morrison",
    description: "Verified real estate transformations.",
  },
};

const cases = [
  {
    type: "STR Transformation",
    market: "Colombia",
    situation: "AnaMaría's first property initially operated under a traditional long-term rental model.",
    strategy: "Repositioning to a short-term rental model: design, professional listing, and operations across STR platforms.",
    result: "Revenue tripled after moving from long-term rental to short-term rental.",
    role: "Full strategy and operations",
    highlight: "From long-term rental to short-term rental: 3× in revenue",
  },
];

export default function CaseStudiesEN() {
  return (
    <>
      <Navbar locale="en" />
      <main className="bg-[#0D0A08]">
        <section className="pt-40 pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">Case Studies</span>
            <h1 className="heading-serif text-5xl sm:text-6xl mt-4 mb-6 leading-[1.02] text-[#F7F3EC]">
              Real property <span className="text-gold-gradient italic">transformations</span>.
            </h1>
            <p className="text-[#F7F3EC]/70 text-lg leading-relaxed max-w-3xl">
              Each case represents a strategic decision: analyze, acquire, transform, launch, automate, and monetize. No unrealistic promises — results with context.
            </p>
          </div>
        </section>

        <section className="py-16 bg-[#141210]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
            {cases.map((c) => (
              <article key={c.highlight} className="p-8 rounded-2xl border border-[#C8A45D]/15 bg-[#1C1916] flex flex-col">
                <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-2">{c.type} · {c.market}</span>
                <h2 className="heading-serif text-2xl text-[#F7F3EC] mb-4">{c.highlight}</h2>
                <div className="space-y-3 text-sm mb-6 flex-1">
                  <div><p className="text-[#888888] uppercase tracking-wider text-xs mb-1">Situation</p><p className="text-[#F7F3EC]/80">{c.situation}</p></div>
                  <div><p className="text-[#888888] uppercase tracking-wider text-xs mb-1">Strategy</p><p className="text-[#F7F3EC]/80">{c.strategy}</p></div>
                  <div><p className="text-[#888888] uppercase tracking-wider text-xs mb-1">Result</p><p className="text-[#F7F3EC]/80">{c.result}</p></div>
                  <div><p className="text-[#888888] uppercase tracking-wider text-xs mb-1">AnaMaría's role</p><p className="text-[#F7F3EC]/80">{c.role}</p></div>
                </div>
              </article>
            ))}

            <div className="p-8 rounded-2xl border border-dashed border-[#C8A45D]/25 bg-[#1C1916]/40 flex flex-col items-center justify-center text-center">
              <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-3">More cases in preparation</p>
              <p className="text-[#F7F3EC]/60 text-sm leading-relaxed max-w-xs">
                We're preparing additional cases across management, Tax Deed acquisition, revenue optimization, and automation.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="heading-serif text-3xl sm:text-4xl text-[#F7F3EC] mb-6">Want your property to be the next case?</h2>
            <Link href="/en/contact" className="inline-block px-8 py-4 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#E2C98A] transition-all">
              Let's Talk
            </Link>
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  );
}
