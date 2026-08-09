import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { CLIENT } from "@/lib/client-data";
import { blogPostsEN, getBlogPostEN } from "@/lib/blog-posts-en";

export async function generateStaticParams() {
  return blogPostsEN.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostEN(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/en/blog/${slug}`,
      languages: {
        "es-US": `/blog/${post.esSlug}`,
        "en-US": `/en/blog/${slug}`,
        "x-default": `/blog/${post.esSlug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${CLIENT.siteUrl}/en/blog/${slug}`,
      locale: "en_US",
      alternateLocale: "es_US",
      type: "article",
      publishedTime: post.date,
      authors: [CLIENT.name],
    },
  };
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const out: React.ReactNode[] = [];
  let i = 0;
  let listBuf: string[] = [];
  const flushList = () => {
    if (listBuf.length) {
      out.push(
        <ul key={`ul-${i}`} className="list-disc pl-6 space-y-2 my-4 text-[#F7F3EC]/80">
          {listBuf.map((li, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: mdInline(li) }} />
          ))}
        </ul>,
      );
      listBuf = [];
    }
  };
  const flushOList = (arr: string[], key: string) => {
    if (arr.length) {
      out.push(
        <ol key={key} className="list-decimal pl-6 space-y-2 my-4 text-[#F7F3EC]/80">
          {arr.map((li, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: mdInline(li) }} />
          ))}
        </ol>,
      );
    }
  };
  let olBuf: string[] = [];
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      flushList();
      flushOList(olBuf, `ol-${i}`);
      olBuf = [];
      out.push(
        <h2 key={i} className="heading-serif text-2xl sm:text-3xl text-[#F7F3EC] mt-10 mb-4">
          {line.slice(3)}
        </h2>,
      );
    } else if (line.startsWith("### ")) {
      flushList();
      flushOList(olBuf, `ol-${i}`);
      olBuf = [];
      out.push(
        <h3 key={i} className="heading-serif text-xl text-[#F7F3EC] mt-6 mb-3">
          {line.slice(4)}
        </h3>,
      );
    } else if (/^\d+\.\s/.test(line)) {
      flushList();
      olBuf.push(line.replace(/^\d+\.\s/, ""));
    } else if (line.startsWith("- ")) {
      flushOList(olBuf, `ol-${i}`);
      olBuf = [];
      listBuf.push(line.slice(2));
    } else if (line.trim() === "") {
      flushList();
      flushOList(olBuf, `ol-${i}`);
      olBuf = [];
    } else {
      flushList();
      flushOList(olBuf, `ol-${i}`);
      olBuf = [];
      out.push(
        <p key={i} className="text-[#F7F3EC]/85 leading-relaxed my-4" dangerouslySetInnerHTML={{ __html: mdInline(line) }} />,
      );
    }
    i++;
  }
  flushList();
  flushOList(olBuf, `ol-end`);
  return out;
}

function mdInline(s: string): string {
  return s
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, '<code class="text-[#C8A45D]">$1</code>');
}

export default async function BlogPostEN({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostEN(slug);
  if (!post) notFound();

  const related = blogPostsEN.filter((p) => p.slug !== slug).slice(0, 3);

  const isTaxDeed = post.category === "Tax Deed" || slug.includes("tax-deed");
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: CLIENT.name,
      ...(isTaxDeed && {
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          name: "Certified Tax Deed Title Analyst",
        },
      }),
    },
    publisher: { "@type": "Person", name: CLIENT.name },
    datePublished: post.date,
    mainEntityOfPage: `${CLIENT.siteUrl}/en/blog/${slug}`,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${CLIENT.siteUrl}/en` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${CLIENT.siteUrl}/en/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${CLIENT.siteUrl}/en/blog/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar locale="en" />
      <main className="pt-24 bg-[#0D0A08]">
        <section className="py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-[#888888] text-sm mb-6">
              <Link href="/en" className="hover:text-[#C8A45D]">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/en/blog" className="hover:text-[#C8A45D]">Blog</Link>
              <span className="mx-2">/</span>
              <span className="text-[#C8A45D]">{post.title}</span>
            </nav>
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 rounded-full bg-[#C8A45D]/10 text-[#C8A45D] text-xs uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-[#888888] text-sm">{post.readTime} read</span>
              <span className="text-[#888888] text-sm">
                {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#F7F3EC] mb-6 leading-tight heading-serif">{post.title}</h1>
            <p className="text-[#F7F3EC]/60 text-lg leading-relaxed mb-8">{post.description}</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#C8A45D] flex items-center justify-center text-black text-xs font-bold rounded-full">AM</div>
              <div>
                <p className="text-[#F7F3EC] text-sm font-semibold">{CLIENT.name}</p>
                <p className="text-[#888888] text-xs">{isTaxDeed ? "Certified Tax Deed Title Analyst · Founder, The Host Circle" : "Founder, The Host Circle"}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 bg-[#141210]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <article className="space-y-2">{renderContent(post.content)}</article>

            <div className="divider-gold my-12" />

            <div className="flex flex-wrap gap-2 mb-12">
              {post.keywords.map((kw) => (
                <span key={kw} className="px-3 py-1 bg-[#C8A45D]/5 text-[#888888] text-xs border border-[#C8A45D]/10">
                  {kw}
                </span>
              ))}
            </div>

            <div className="p-8 rounded-2xl border border-[#C8A45D]/30 bg-black">
              <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-3">About the Author</p>
              <p className="text-[#F7F3EC] font-bold text-lg mb-2">{CLIENT.name}</p>
              <p className="text-[#F7F3EC]/60 text-sm leading-relaxed mb-4">{CLIENT.bio.shortEN}</p>
              <Link href="/en/about" className="text-[#C8A45D] text-sm underline">Learn more →</Link>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="py-16 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-[#F7F3EC] mb-8">Related articles</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {related.map((p) => (
                  <Link key={p.slug} href={`/en/blog/${p.slug}`} className="group border border-[#C8A45D]/20 hover:border-[#C8A45D] p-6 bg-[#141210] transition-all">
                    <p className="text-[#C8A45D] text-xs uppercase tracking-wider mb-2">{p.category}</p>
                    <h3 className="text-[#F7F3EC] font-semibold text-sm leading-tight group-hover:text-[#C8A45D] transition-colors">{p.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-16 text-center bg-[#0D0A08]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="heading-serif text-3xl text-[#F7F3EC] mb-6">Want to talk about your specific case?</h2>
            <Link href="/en/contact" className="inline-block px-8 py-4 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#E2C98A] transition-all">
              Book a 1:1 Strategy Consultation
            </Link>
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  );
}
