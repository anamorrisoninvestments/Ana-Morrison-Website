import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import BlogClient from "./BlogClient";
import { CLIENT } from "@/lib/client-data";
import { blogPosts } from "@/lib/blog-posts";
import { classifyPost } from "@/lib/blog-taxonomy";

export const metadata: Metadata = {
  title: "Blog | Alquileres a Corto Plazo y Tax Deed",
  description:
    "Artículos y guías sobre alquiler a corto plazo, administración STR, Tax Deed y adquisición inmobiliaria. Contenido educativo por Ana Morrison.",
  alternates: { canonical: "/blog" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: CLIENT.siteUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${CLIENT.siteUrl}/blog` },
  ],
};

export default function BlogPage() {
  const posts = blogPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    date: p.date,
    category: p.category,
    readTime: p.readTime,
    topic: classifyPost(p.category),
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <main className="pt-20 bg-[#0D0A08]">
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C8A45D]/5 via-[#0D0A08] to-[#0D0A08]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-[#888888] text-sm mb-8">
              <Link href="/" className="hover:text-[#C8A45D] transition-colors">
                Inicio
              </Link>
              <span className="mx-2">/</span>
              <span className="text-[#C8A45D]">Blog</span>
            </nav>
            <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
              Recursos &amp; Educación
            </span>
            <h1 className="heading-serif text-5xl sm:text-6xl mt-4 mb-6 leading-[1.02] text-[#F7F3EC]">
              Blog de <span className="text-gold-gradient italic">Inversión Inmobiliaria</span>
            </h1>
            <p className="text-[#F7F3EC]/70 text-lg max-w-2xl">
              Estrategias, análisis y guías sobre alquileres a corto plazo y Tax Deed. Contenido
              educativo, sin promesas irreales.
            </p>
          </div>
        </section>

        <section className="py-16 bg-[#141210]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlogClient posts={posts} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
