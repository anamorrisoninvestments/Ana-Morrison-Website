import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { CLIENT } from "@/lib/client-data";
import { blogPosts } from "@/lib/blog-posts";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: `Blog de ${CLIENT.nameShort}: artículos sobre alquiler a corto plazo, tax deeds, Airbnb, inversión inmobiliaria y libertad financiera.`,
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

const categories = Array.from(new Set(blogPosts.map((p) => p.category)));

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="pt-20">
        <section className="py-24 bg-[#0D0A08] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C8A45D]/5 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-[#888888] text-sm mb-8">
              <a href="/" className="hover:text-[#C8A45D] transition-colors">Inicio</a>
              <span className="mx-2">/</span>
              <span className="text-[#C8A45D]">Blog</span>
            </nav>
            <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">Conocimiento Gratuito</span>
            <h1 className="text-5xl sm:text-6xl font-bold text-[#F7F3EC] mt-3 mb-4">
              Blog de <span className="text-gold-gradient">Inversión Inmobiliaria</span>
            </h1>
            <p className="text-[#F7F3EC]/60 text-xl max-w-2xl">
              Estrategias reales, sin filtro. Alquiler a corto plazo, tax deeds, Airbnb y libertad financiera.
            </p>
          </div>
        </section>

        <section className="py-20 bg-[#141210]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Categories */}
            <div className="flex flex-wrap gap-3 mb-12">
              <span className="px-4 py-2 bg-[#C8A45D] text-black text-xs font-bold tracking-wider uppercase">Todos</span>
              {categories.map((cat) => (
                <span key={cat} className="px-4 py-2 rounded-2xl border border-[#C8A45D]/30 text-[#C8A45D] text-xs tracking-wider uppercase hover:bg-[#C8A45D]/10 cursor-pointer transition-colors">
                  {cat}
                </span>
              ))}
            </div>

            {/* Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group border border-[#C8A45D]/20 hover:border-[#C8A45D] bg-black transition-all flex flex-col"
                >
                  <div className="h-40 bg-gradient-to-br from-[#1A1A1A] to-[#10145F]/20 flex items-center justify-center">
                    <span className="text-4xl">📝</span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[#C8A45D] text-xs tracking-wider uppercase font-semibold">{post.category}</span>
                      <span className="text-[#888888] text-xs">{post.readTime}</span>
                    </div>
                    <h2 className="text-[#F7F3EC] font-bold text-base leading-tight mb-3 group-hover:text-[#C8A45D] transition-colors flex-1">
                      {post.title}
                    </h2>
                    <p className="text-[#F7F3EC]/50 text-sm leading-relaxed mb-4 line-clamp-2">{post.description}</p>
                    <div className="flex items-center justify-between text-xs text-[#888888]">
                      <span>{new Date(post.date).toLocaleDateString("es-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                      <span className="text-[#C8A45D] group-hover:underline">Leer →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
