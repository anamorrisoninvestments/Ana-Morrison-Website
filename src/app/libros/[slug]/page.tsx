import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CTASection from "@/components/sections/CTASection";
import { CLIENT } from "@/lib/client-data";

export async function generateStaticParams() {
  return CLIENT.books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const book = CLIENT.books.find((b) => b.slug === slug);
  if (!book) return {};
  return {
    title: book.title,
    description: book.description,
    alternates: { canonical: `/libros/${slug}` },
    openGraph: { title: book.title, description: book.description, url: `${CLIENT.siteUrl}/libros/${slug}` },
  };
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = CLIENT.books.find((b) => b.slug === slug);
  if (!book) notFound();

  const bookSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: { "@type": "Person", name: CLIENT.name, url: CLIENT.siteUrl },
    ...("coAuthor" in book && book.coAuthor ? { contributor: { "@type": "Person", name: book.coAuthor } } : {}),
    description: book.description,
    inLanguage: "es",
    genre: ["Business", "Real Estate", "Personal Finance"],
    url: `${CLIENT.siteUrl}/libros/${book.slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: CLIENT.siteUrl },
      { "@type": "ListItem", position: 2, name: "Libros", item: `${CLIENT.siteUrl}/libros` },
      { "@type": "ListItem", position: 3, name: book.title, item: `${CLIENT.siteUrl}/libros/${book.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="pt-20">
        <section className="py-24 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C8A45D]/5 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-[#888888] text-sm mb-8">
              <a href="/" className="hover:text-[#C8A45D] transition-colors">Inicio</a>
              <span className="mx-2">/</span>
              <a href="/libros" className="hover:text-[#C8A45D] transition-colors">Libros</a>
              <span className="mx-2">/</span>
              <span className="text-[#C8A45D]">{book.title}</span>
            </nav>
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Cover */}
              <div className="relative w-full max-w-sm aspect-[3/4] border border-[#C8A45D]/30 overflow-hidden">
                <div className="absolute -inset-3 border border-[#C8A45D]/10 z-20 pointer-events-none" />
                <Image
                  src={book.cover}
                  alt={`Portada: ${book.title}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#C8A45D] text-black text-xs font-bold uppercase tracking-widest z-30">
                  {book.status}
                </div>
              </div>

              {/* Info */}
              <div>
                <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">{book.status}</span>
                <h1 className="text-4xl sm:text-5xl font-bold text-[#F7F3EC] mt-3 mb-4">{book.title}</h1>
                <p className="text-[#F7F3EC]/70 text-base leading-relaxed mb-4">Por <strong className="text-[#C8A45D]">{CLIENT.name}</strong></p>
                {"coAuthor" in book && book.coAuthor && <p className="text-[#22AEEF] text-sm mb-6">Coescrito con {book.coAuthor}</p>}
                <div className="divider-gold my-6" />
                <p className="text-[#F7F3EC]/80 text-base leading-relaxed mb-8">{book.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {book.topics.map((t) => (
                    <span key={t} className="px-3 py-1 bg-[#C8A45D]/10 text-[#C8A45D] text-sm border border-[#C8A45D]/20">{t}</span>
                  ))}
                </div>
                <div className="p-5 bg-[#C8A45D]/5 border border-[#C8A45D]/30">
                  <p className="text-[#C8A45D] font-semibold text-sm mb-2">📬 Sé el primero en enterarte</p>
                  <p className="text-[#F7F3EC]/60 text-sm">Suscríbete para recibir las novedades de publicación.</p>
                  <a href="/contacto" className="inline-block mt-3 px-6 py-2 bg-[#C8A45D] text-black font-bold text-sm tracking-widest uppercase hover:bg-[#E2C98A] transition-colors">
                    Notifícame
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
