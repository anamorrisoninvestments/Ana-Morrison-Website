import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CTASection from "@/components/sections/CTASection";
import { CLIENT } from "@/lib/client-data";
import { blogPosts } from "@/lib/blog-posts";
import Link from "next/link";

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${CLIENT.siteUrl}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [CLIENT.name],
    },
  };
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const result: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      result.push(<h2 key={i} className="text-2xl font-bold text-[#C8A45D] mt-10 mb-4">{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      result.push(<h3 key={i} className="text-xl font-bold text-[#F7F3EC] mt-8 mb-3">{line.slice(4)}</h3>);
    } else if (line.startsWith("**") && line.endsWith("**")) {
      result.push(<p key={i} className="text-[#C8A45D] font-semibold mt-4 mb-2">{line.slice(2, -2)}</p>);
    } else if (line.match(/^\d+\. \*\*/)) {
      const text = line.replace(/^\d+\. \*\*(.+?)\*\*:?(.*)/, (_, bold, rest) => `${bold}${rest}`);
      const num = line.match(/^(\d+)\./)?.[1];
      result.push(
        <li key={i} className="text-[#F7F3EC]/80 text-base leading-relaxed mb-2 ml-4">
          <strong className="text-[#C8A45D]">{num}. </strong>
          {text}
        </li>
      );
    } else if (line.startsWith("- ")) {
      result.push(<li key={i} className="text-[#F7F3EC]/80 text-base leading-relaxed mb-2 ml-4 list-disc">{line.slice(2)}</li>);
    } else if (line.startsWith("| ") && line.includes("|")) {
      result.push(<p key={i} className="text-[#F7F3EC]/70 text-sm font-mono border-b border-[#C8A45D]/10 py-1">{line}</p>);
    } else if (line.trim() === "") {
      result.push(<div key={i} className="h-2" />);
    } else {
      const bold = line.replace(/\*\*(.+?)\*\*/g, (_, t) => `<strong class="text-[#F7F3EC] font-semibold">${t}</strong>`);
      result.push(<p key={i} className="text-[#F7F3EC]/80 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: bold }} />);
    }
    i++;
  }
  return result;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: { "@type": "Person", name: CLIENT.name, url: CLIENT.siteUrl },
    publisher: { "@type": "Organization", name: "The Host Circle", url: CLIENT.siteUrl },
    datePublished: post.date,
    url: `${CLIENT.siteUrl}/blog/${post.slug}`,
    keywords: post.keywords.join(", "),
    inLanguage: "es",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: CLIENT.siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${CLIENT.siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${CLIENT.siteUrl}/blog/${post.slug}` },
    ],
  };

  const related = blogPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <section className="py-20 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C8A45D]/5 to-transparent" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-[#888888] text-sm mb-8">
              <Link href="/" className="hover:text-[#C8A45D] transition-colors">Inicio</Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-[#C8A45D] transition-colors">Blog</Link>
              <span className="mx-2">/</span>
              <span className="text-[#C8A45D] line-clamp-1">{post.title}</span>
            </nav>
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-[#C8A45D]/10 text-[#C8A45D] text-xs border border-[#C8A45D]/20 uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-[#888888] text-sm">{post.readTime} de lectura</span>
              <span className="text-[#888888] text-sm">
                {new Date(post.date).toLocaleDateString("es-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#F7F3EC] mb-6 leading-tight">{post.title}</h1>
            <p className="text-[#F7F3EC]/60 text-lg leading-relaxed mb-8">{post.description}</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#C8A45D] flex items-center justify-center text-black text-xs font-bold">AM</div>
              <div>
                <p className="text-[#F7F3EC] text-sm font-semibold">{CLIENT.name}</p>
                <p className="text-[#888888] text-xs">Fundadora, The Host Circle</p>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 bg-[#111111]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <article className="space-y-2">
              {renderContent(post.content)}
            </article>

            <div className="divider-gold my-12" />

            {/* Keywords */}
            <div className="flex flex-wrap gap-2 mb-12">
              {post.keywords.map((kw) => (
                <span key={kw} className="px-3 py-1 bg-[#C8A45D]/5 text-[#888888] text-xs border border-[#C8A45D]/10">
                  {kw}
                </span>
              ))}
            </div>

            {/* Author bio */}
            <div className="p-8 border border-[#C8A45D]/30 bg-black">
              <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-3">Sobre la Autora</p>
              <p className="text-[#F7F3EC] font-bold text-lg mb-2">{CLIENT.name}</p>
              <p className="text-[#F7F3EC]/60 text-sm leading-relaxed mb-4">{CLIENT.bio.short}</p>
              <Link href="/sobre-mi" className="text-[#C8A45D] text-sm underline">Conoce más →</Link>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="py-16 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-[#F7F3EC] mb-8">Artículos relacionados</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {related.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="group border border-[#C8A45D]/20 hover:border-[#C8A45D] p-6 bg-[#111111] transition-all">
                    <p className="text-[#C8A45D] text-xs uppercase tracking-wider mb-2">{p.category}</p>
                    <h3 className="text-[#F7F3EC] font-semibold text-sm leading-tight group-hover:text-[#C8A45D] transition-colors">{p.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
