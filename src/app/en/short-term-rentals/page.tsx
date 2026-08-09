import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { CLIENT } from "@/lib/client-data";

export const metadata: Metadata = {
  title: "Short-Term Rentals | AnaMaría Morrison",
  description:
    "Property assessment, transformation, launch, and professional management of short-term rental properties. Strategy, systems, and professional operations.",
  alternates: {
    canonical: "/en/short-term-rentals",
    languages: { "es-US": "/alquileres-a-corto-plazo", "en-US": "/en/short-term-rentals", "x-default": "/alquileres-a-corto-plazo" },
  },
  openGraph: {
    locale: "en_US",
    alternateLocale: "es_US",
    url: `${CLIENT.siteUrl}/en/short-term-rentals`,
    title: "Short-Term Rentals | AnaMaría Morrison",
    description: "Property assessment, transformation, launch, automation, and professional STR management.",
  },
};

const steps = [
  { n: "01", t: "Viability analysis", d: "Market study, demand review, and local regulation check before investing in preparation." },
  { n: "02", t: "Asset positioning", d: "Defining positioning, ideal guest, base pricing, and channel strategy." },
  { n: "03", t: "Design & setup", d: "Furnishing, functional decoration, professional photography, and a differentiated experience." },
  { n: "04", t: "Multi-platform launch", d: "Optimized publishing on Airbnb, Booking, and other strategic channels." },
  { n: "05", t: "Listing optimization", d: "Continuous improvement of title, description, photos, rules, and automated replies." },
  { n: "06", t: "Automation", d: "AI and systems for messaging, access codes, cleaning, maintenance, and reviews." },
  { n: "07", t: "Revenue management", d: "Dynamic price adjustment and seasonal strategies designed to strengthen income potential." },
  { n: "08", t: "Professional property management", d: "Full operations on your behalf, with clear reports and real oversight for the owner." },
];

const benefits = [
  "Stronger revenue potential (not a guarantee — dependent on property, market, and execution)",
  "Lower day-to-day operational load for the owner",
  "Asset protection through documented protocols",
  "Better guest experience through consistent standards",
  "Professional, standardized operations",
  "Visibility and control through reporting",
  "Systems and AI-assisted automation",
];

export default function ShortTermRentalsEN() {
  return (
    <>
      <Navbar locale="en" />
      <main className="bg-[#0D0A08]">
        {/* Hero */}
        <section className="pt-40 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C8A45D]/6 via-[#0D0A08] to-[#0D0A08]" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
              For Property Owners · Short-Term Rental Strategy
            </span>
            <h1 className="heading-serif text-5xl sm:text-6xl mt-4 mb-6 leading-[1.02] text-[#F7F3EC]">
              Turn your property into a{" "}
              <span className="text-gold-gradient italic">high-performing asset</span> in the short-term rental market.
            </h1>
            <p className="text-[#F7F3EC]/70 text-lg leading-relaxed max-w-3xl mb-8">
              Property assessment, transformation, launch, automation, and professional management of short-term rental properties — with strategy, systems, and professional operations.
            </p>
            <Link
              href="/en/contact?interes=str-rentabilizar"
              className="inline-block px-8 py-4 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#E2C98A] transition-all hover:shadow-[0_0_40px_rgba(200,164,93,0.45)]"
            >
              Improve My Property's Performance
            </Link>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-[#141210]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="heading-serif text-3xl sm:text-4xl text-[#F7F3EC] mb-10">
              What you get from working together
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((b) => (
                <div key={b} className="p-5 rounded-2xl border border-[#C8A45D]/15 bg-[#1C1916] flex items-start gap-3">
                  <span className="text-[#C8A45D] mt-1">◆</span>
                  <span className="text-[#F7F3EC]/85 text-base">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-24 bg-[#0D0A08]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-14">
              <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">How We Work</span>
              <h2 className="heading-serif text-4xl sm:text-5xl mt-4 text-[#F7F3EC]">
                From idle property to <span className="text-gold-gradient italic">operating asset</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {steps.map((s) => (
                <div key={s.n} className="p-7 rounded-2xl border border-[#C8A45D]/15 bg-[#1C1916] hover:border-[#C8A45D]/45 transition-all">
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="text-[#C8A45D] heading-serif text-2xl">{s.n}</span>
                    <h3 className="heading-serif text-xl text-[#F7F3EC]">{s.t}</h3>
                  </div>
                  <p className="text-[#F7F3EC]/70 text-sm leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Note on expectations */}
        <section className="py-16 bg-[#141210]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 rounded-2xl bg-[#1C1916] border border-[#C8A45D]/20">
              <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-2">A Note on Expectations</p>
              <p className="text-[#F7F3EC]/85 leading-relaxed">
                Revenue potential can differ substantially from traditional rentals depending on location, demand, pricing, regulation, operating costs, and execution. Short-term rentals are not inherently passive — strong systems and professional management reduce day-to-day owner involvement, but no operating model runs itself with zero oversight.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-[#0D0A08] text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="heading-serif text-4xl sm:text-5xl mb-6 text-[#F7F3EC] leading-tight">
              Is your property ready to <span className="text-gold-gradient italic">perform</span>?
            </h2>
            <p className="text-[#F7F3EC]/70 text-lg mb-10">
              Tell me about your property and let's evaluate its potential together.
            </p>
            <Link
              href="/en/contact?interes=str-rentabilizar"
              className="inline-block px-8 py-4 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#E2C98A] transition-all hover:shadow-[0_0_40px_rgba(200,164,93,0.45)]"
            >
              Request a Diagnostic
            </Link>
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  );
}
