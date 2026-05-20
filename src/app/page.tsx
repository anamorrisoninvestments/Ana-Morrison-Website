import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import BooksSection from "@/components/sections/BooksSection";
import SocialProofSection from "@/components/sections/SocialProofSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import CTASection from "@/components/sections/CTASection";
import { CLIENT } from "@/lib/client-data";

export const metadata: Metadata = {
  title: `${CLIENT.nameShort} | Experta en Alquileres a Corto Plazo e Inversiones Inmobiliarias`,
  description: CLIENT.bio.short,
  alternates: { canonical: "/", languages: { en: "/en" } },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <BooksSection />
        <SocialProofSection />
        <NewsletterSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
