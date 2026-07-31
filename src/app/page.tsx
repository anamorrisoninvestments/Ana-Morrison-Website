import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ValuePropSection from "@/components/sections/ValuePropSection";
import PillarsSection from "@/components/sections/PillarsSection";
import MethodSection from "@/components/sections/MethodSection";
import AboutSection from "@/components/sections/AboutSection";
import WaysToWorkSection from "@/components/sections/WaysToWorkSection";
import SocialProofSection from "@/components/sections/SocialProofSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Ana Morrison | Alquileres a Corto Plazo y Tax Deed",
  description:
    "Ana Morrison ayuda a inversionistas y propietarios a adquirir, transformar y rentabilizar propiedades mediante Tax Deed, alquileres a corto plazo, automatización y administración profesional.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ValuePropSection />
        <PillarsSection />
        <MethodSection />
        <AboutSection />
        <WaysToWorkSection />
        <SocialProofSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
