import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { CLIENT } from "@/lib/client-data";
import Analytics from "@/components/ui/Analytics";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: `${CLIENT.nameShort} | Experta en Alquileres a Corto Plazo e Inversiones Inmobiliarias`,
    template: `%s | ${CLIENT.nameShort}`,
  },
  description: CLIENT.bio.short,
  keywords: [
    "AnaMaria Morrison",
    "alquiler a corto plazo",
    "Airbnb inversión",
    "tax deed",
    "inversiones inmobiliarias",
    "The Host Circle",
    "co-hosting",
    "libertad financiera",
    "inversionista latina",
    "real estate",
    "short term rental",
  ],
  authors: [{ name: CLIENT.name, url: CLIENT.siteUrl }],
  creator: CLIENT.name,
  metadataBase: new URL(CLIENT.siteUrl),
  alternates: {
    canonical: "/",
    languages: { "es": "/", "en": "/en" },
  },
  openGraph: {
    type: "website",
    locale: "es_US",
    alternateLocale: "en_US",
    url: CLIENT.siteUrl,
    siteName: CLIENT.nameShort,
    title: `${CLIENT.nameShort} | Experta en Alquileres a Corto Plazo e Inversiones Inmobiliarias`,
    description: CLIENT.bio.short,
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: CLIENT.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${CLIENT.nameShort} | Inversiones Inmobiliarias & Alquiler a Corto Plazo`,
    description: CLIENT.bio.short,
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${CLIENT.siteUrl}/#website`,
      url: CLIENT.siteUrl,
      name: CLIENT.nameShort,
      description: CLIENT.bio.short,
      publisher: { "@id": `${CLIENT.siteUrl}/#person` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${CLIENT.siteUrl}/blog?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
      inLanguage: "es-US",
    },
    {
      "@type": "Person",
      "@id": `${CLIENT.siteUrl}/#person`,
      name: CLIENT.name,
      givenName: "AnaMaria",
      familyName: "Morrison",
      gender: "Female",
      nationality: { "@type": "Country", name: "Venezuela" },
      knowsLanguage: ["es", "en"],
      url: CLIENT.siteUrl,
      image: { "@type": "ImageObject", url: `${CLIENT.siteUrl}/images/anamaria-morrison.jpg`, width: 800, height: 800 },
      description: CLIENT.bio.short,
      jobTitle: CLIENT.title,
      worksFor: { "@type": "Organization", name: "The Host Circle", url: CLIENT.siteUrl },
      foundingDate: "2015",
      email: CLIENT.email,
      sameAs: [
        "https://www.instagram.com/anamorrisoninvestments",
        "https://www.tiktok.com/@anamorrisoninvestments",
        "https://youtube.com/@anamorrisoninvestments",
        "https://www.linkedin.com/in/anamar%C3%ADa-morrison-07b83b5b",
        "https://www.facebook.com/anamorrisoninvestments",
      ],
      interactionStatistic: [
        { "@type": "InteractionCounter", interactionType: "https://schema.org/FollowAction", userInteractionCount: 33200, url: "https://www.instagram.com/anamorrisoninvestments" },
        { "@type": "InteractionCounter", interactionType: "https://schema.org/FollowAction", userInteractionCount: 7800, url: "https://www.facebook.com/anamorrisoninvestments" },
        { "@type": "InteractionCounter", interactionType: "https://schema.org/FollowAction", userInteractionCount: 111, url: "https://www.tiktok.com/@anamorrisoninvestments" },
        { "@type": "InteractionCounter", interactionType: "https://schema.org/FollowAction", userInteractionCount: 111, url: "https://youtube.com/@anamorrisoninvestments" },
      ],
      knowsAbout: [
        "Alquiler a corto plazo",
        "Airbnb",
        "Short-term rentals",
        "Inversiones inmobiliarias",
        "Tax deed investments",
        "Co-hosting",
        "Co-living",
        "Arbitraje inmobiliario",
        "Libertad financiera",
        "Educación financiera",
        "Real estate investing",
        "Property management",
        "Subastas del condado",
      ],
      memberOf: [
        { "@type": "Organization", name: "The Host Circle" },
      ],
      hasOccupation: [
        { "@type": "Occupation", name: "Real Estate Investor" },
        { "@type": "Occupation", name: "Entrepreneur" },
        { "@type": "Occupation", name: "Business Coach" },
        { "@type": "Occupation", name: "Author" },
      ],
      mainEntityOfPage: { "@type": "WebPage", "@id": CLIENT.siteUrl },
    },
    {
      "@type": "Organization",
      "@id": `${CLIENT.siteUrl}/#organization`,
      name: "The Host Circle",
      url: CLIENT.siteUrl,
      logo: { "@type": "ImageObject", url: `${CLIENT.siteUrl}/images/logo.png` },
      founder: { "@id": `${CLIENT.siteUrl}/#person` },
      description: "Marca educativa y operativa especializada en alquileres a corto plazo e inversiones inmobiliarias.",
      sameAs: [
        "https://www.instagram.com/anamorrisoninvestments",
        "https://www.facebook.com/anamorrisoninvestments",
      ],
    },
    {
      "@type": "SiteNavigationElement",
      name: ["Inicio", "Sobre Mí", "Servicios", "Libros", "Blog", "Prensa", "Contacto"],
      url: [
        `${CLIENT.siteUrl}/`,
        `${CLIENT.siteUrl}/sobre-mi`,
        `${CLIENT.siteUrl}/servicios`,
        `${CLIENT.siteUrl}/libros`,
        `${CLIENT.siteUrl}/blog`,
        `${CLIENT.siteUrl}/prensa`,
        `${CLIENT.siteUrl}/contacto`,
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0D0A08] text-ivory">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
