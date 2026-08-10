import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ValuePropSection from "@/components/sections/ValuePropSection";
import PillarsSection from "@/components/sections/PillarsSection";
import MethodSection from "@/components/sections/MethodSection";
import AboutSection from "@/components/sections/AboutSection";
import WaysToWorkSection from "@/components/sections/WaysToWorkSection";
import AuthoritySection from "@/components/sections/AuthoritySection";
import CTASection from "@/components/sections/CTASection";
import { CLIENT } from "@/lib/client-data";

export const metadata: Metadata = {
  title: `${CLIENT.nameShort} | Short-Term Rental Strategist & Tax Deed Investor`,
  description:
    "AnaMaría Morrison helps investors and property owners identify Tax Deed opportunities, transform properties, and build stronger short-term rental performance through strategy, systems, and professional operations.",
  alternates: {
    canonical: "/en",
    languages: { "es-US": "/", "en-US": "/en", "x-default": "/" },
  },
  openGraph: {
    locale: "en_US",
    alternateLocale: "es_US",
    url: `${CLIENT.siteUrl}/en`,
    title: `${CLIENT.nameShort} | Short-Term Rental Strategist & Tax Deed Investor`,
    description:
      "Real estate strategy: Tax Deed acquisition intelligence and short-term rental operations across 4 countries.",
  },
};

export default function EnglishHome() {
  return (
    <>
      <Navbar locale="en" />
      <main>
        <HeroSection locale="en" />
        <ValuePropSection locale="en" />
        <PillarsSection locale="en" />
        <MethodSection locale="en" />
        <AboutSection locale="en" />
        <WaysToWorkSection locale="en" />
        <AuthoritySection locale="en" />
        <CTASection locale="en" />
      </main>
      <Footer locale="en" />
    </>
  );
}
