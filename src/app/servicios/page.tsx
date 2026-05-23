import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import EcosystemSection from "@/components/sections/EcosystemSection";
import STRServicesSection from "@/components/sections/STRServicesSection";
import PremiumExperienceSection from "@/components/sections/PremiumExperienceSection";
import PropertyManagementSection from "@/components/sections/PropertyManagementSection";
import MembershipSection from "@/components/sections/MembershipSection";
import MentorshipSection from "@/components/sections/MentorshipSection";
import CoachingSection from "@/components/sections/CoachingSection";
import TaxDeedSection from "@/components/sections/TaxDeedSection";
import CTASection from "@/components/sections/CTASection";
import { CLIENT } from "@/lib/client-data";

export const metadata: Metadata = {
  title: "Servicios · Ecosistema de Soluciones",
  description: `Ecosistema profesional de ${CLIENT.nameShort}: hospitalidad y administración STR, Experiencia Anfitrión Premium, membresía educativa, mentoría high-ticket, coaching premium en Amor Consciente y Tax Deed Intelligence.`,
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-24 bg-[#0D0A08] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C8A45D]/6 to-transparent" />
          <div className="absolute top-1/2 -right-40 w-[480px] h-[480px] rounded-full bg-[#C8A45D]/5 blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-[#888888] text-sm mb-10">
              <a href="/" className="hover:text-[#C8A45D] transition-colors">Inicio</a>
              <span className="mx-2">/</span>
              <span className="text-[#C8A45D]">Servicios</span>
            </nav>

            <div className="max-w-3xl">
              <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
                Ecosistema de Soluciones · 4 Líneas
              </span>
              <h1 className="heading-serif text-5xl sm:text-6xl mt-4 mb-6 leading-[1.05]">
                <span className="text-[#F7F3EC]">Hospitalidad, inversión, educación </span>
                <span className="text-gold-gradient italic">y transformación.</span>
              </h1>
              <p className="text-[#F7F3EC]/70 text-xl leading-relaxed mb-4">
                Un ecosistema profesional para construir, automatizar y escalar tu negocio
                de alquiler a corto plazo — con estrategia, hospitalidad premium, inteligencia
                artificial y acompañamiento de alto nivel.
              </p>
              <p className="text-[#F7F3EC]/55 text-base leading-relaxed">
                Cada cliente está en una etapa diferente. Explora la línea que corresponde
                a tu momento: servicios profesionales para tu propiedad, educación y mentoría,
                coaching premium o inteligencia de inversión Tax Deed.
              </p>
            </div>
          </div>
        </section>

        <EcosystemSection />
        <STRServicesSection />
        <PremiumExperienceSection />
        <PropertyManagementSection />
        <MembershipSection />
        <MentorshipSection />
        <CoachingSection />
        <TaxDeedSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
