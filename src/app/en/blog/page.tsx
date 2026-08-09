import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { CLIENT } from "@/lib/client-data";
import { blogPostsEN } from "@/lib/blog-posts-en";

export const metadata: Metadata = {
  title: "Blog | AnaMaría Morrison",
  description:
    "Articles on short-term rentals, Tax Deed investing, credit, and building a real estate business. Educational content — no income promises.",
  alternates: {
    canonical: "/en/blog",
    languages: { "es-US": "/blog", "en-US": "/en/blog", "x-default": "/blog" },
  },
  openGraph: {
    locale: "en_US",
    alternateLocale: "es_US",
    url: `${CLIENT.siteUrl}/en/blog`,
    title: "Blog | AnaMaría Morrison",
    description: "Real estate investing and short-term rental strategy articles.",
  },
};

export default function BlogListEN() {
  const posts = [...blogPostsEN].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <>
      <Navbar locale="en" />
      <main className="pt-24 bg-[#0D0A08]">
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">Blog</span>
            <h1 className="heading-serif text-5xl sm:text-6xl text-[#F7F3EC] mt-4 mb-6 leading-[1.02]">
              Real estate <span className="text-gold-gradient italic">strategy</span> and operations.
            </h1>
            <p className="text-[#F7F3EC]/70 text-lg max-w-3xl mb-12">
              Short-term rentals, Tax Deed investing, credit, and the systems that make growth sustainable. Educational content, not personalized advice.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/en/blog/${p.slug}`}
                  className="p-6 rounded-2xl border border-[#C8A45D]/15 bg-[#141210] hover:border-[#C8A45D]/50 transition-colors block"
                >
                  <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-3">
                    {p.category} · {p.readTime}
                  </p>
                  <h2 className="text-[#F7F3EC] font-medium leading-snug mb-2 heading-serif text-lg">{p.title}</h2>
                  <p className="text-[#F7F3EC]/60 text-sm">{p.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  );
}
