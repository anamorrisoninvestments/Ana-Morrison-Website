import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import HeroSection from "@/components/sections/HeroSection";
import EcosystemSection from "@/components/sections/EcosystemSection";
import AboutSection from "@/components/sections/AboutSection";
import STRServicesSection from "@/components/sections/STRServicesSection";
import PremiumExperienceSection from "@/components/sections/PremiumExperienceSection";
import PropertyManagementSection from "@/components/sections/PropertyManagementSection";
import MembershipSection from "@/components/sections/MembershipSection";
import MentorshipSection from "@/components/sections/MentorshipSection";
import CoachingSection from "@/components/sections/CoachingSection";
import TaxDeedSection from "@/components/sections/TaxDeedSection";
import SocialProofSection from "@/components/sections/SocialProofSection";
import BooksSection from "@/components/sections/BooksSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import CTASection from "@/components/sections/CTASection";
import { CLIENT } from "@/lib/client-data";

export const metadata: Metadata = {
  title: `${CLIENT.nameShort} | Hospitalidad Premium, Inversión & Transformación`,
  description:
    "Ecosistema profesional de alquiler a corto plazo: servicios de hospitalidad, administración profesional, mentoría high-ticket, coaching premium y Tax Deed Intelligence.",
  alternates: { canonical: "/", languages: { en: "/en" } },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <EcosystemSection />
        <AboutSection />
        <STRServicesSection />
        <PremiumExperienceSection />
        <PropertyManagementSection />
        <MembershipSection />
        <MentorshipSection />
        <CoachingSection />
        <TaxDeedSection />
        <SocialProofSection />
        <BooksSection />
        <NewsletterSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
