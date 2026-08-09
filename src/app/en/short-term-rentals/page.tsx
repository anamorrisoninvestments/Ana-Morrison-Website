import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { CLIENT } from "@/lib/client-data";

export const metadata: Metadata = {
  title: "Short-Term Rentals | Strategy & Professional Operations",
  description:
    "Property assessment, transformation, launch, optimization, and professional short-term rental management. Systems that support stronger performance.",
  alternates: {
    canonical: "/en/short-term-rentals",
    languages: { "es-US": "/alquileres-a-corto-plazo", "en-US": "/en/short-term-rentals", "x-default": "/alquileres-a-corto-plazo" },
  },
  openGraph: {
    locale: "en_US",
    alternateLocale: "es_US",
    url: `${CLIENT.siteUrl}/en/short-term-rentals`,
    title: "Short-Term Rentals | Strategy & Professional Operations",
    description: "Professional short-term rental strategy, launch, and management.",
  },
};

export default function ShortTermRentalsEN() {
  return (
    <>
      <Navbar locale="en" />
      <main className="pt-20 bg-[#0D0A08]">
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">For Property Owners</span>
            <h1 className="heading-serif text-5xl sm:text-6xl text-[#F7F3EC] mt-4 mb-6 leading-[1.02]">
              Short-Term Rental <span className="text-gold-gradient italic">Strategy</span>.
            </h1>
            <p className="text-[#F7F3EC]/80 text-lg leading-relaxed max-w-3xl mb-12">
              Property assessment, transformation, launch, optimization, and professional management designed to position your property for stronger short-term rental performance.
            </p>

            <ul className="grid sm:grid-cols-2 gap-4 mb-16">
              {[
                ["Viability analysis", "Underwrite before you commit capital or design."],
                ["Asset positioning", "Guest, market, and price positioning."],
                ["Design & setup", "Design, furnishing, and photography aligned with guest expectations."],
                ["Multi-platform launch", "Airbnb, Booking, VRBO — each with the right settings."],
                ["Listing optimization", "Copy, pricing, response times, and reviews."],
                ["Automation", "Channel manager, dynamic pricing, message templates, smart locks."],
                ["Revenue management", "Ongoing pricing and yield strategy."],
                ["Professional property management", "Full operational responsibility on your behalf."],
              ].map(([title, desc]) => (
                <li key={title} className="p-6 rounded-2xl bg-[#141210] border border-[#C8A45D]/20">
                  <p className="text-[#C8A45D] font-semibold mb-1">{title}</p>
                  <p className="text-[#F7F3EC]/70 text-sm">{desc}</p>
                </li>
              ))}
            </ul>

            <div className="p-8 rounded-2xl bg-[#1C1916] border border-[#C8A45D]/20 mb-10">
              <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-2">A Note on Expectations</p>
              <p className="text-[#F7F3EC]/80 leading-relaxed">
                Revenue potential can differ substantially from traditional rentals depending on location, demand, pricing, regulation, operating costs, and execution. Short-term rentals are not inherently passive — strong systems and professional management reduce day-to-day owner involvement, but no operating model runs itself with zero oversight.
              </p>
            </div>

            <Link
              href="/en/contact"
              className="inline-block px-8 py-4 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#E2C98A] transition-all hover:shadow-[0_0_40px_rgba(200,164,93,0.45)]"
            >
              Improve My Property's Performance
            </Link>
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  );
}
