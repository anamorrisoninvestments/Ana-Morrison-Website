import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CTASection from "@/components/sections/CTASection";
import { CLIENT } from "@/lib/client-data";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Libros",
  description: `Libros de ${CLIENT.nameShort}: "La Ruta de la Riqueza con el Alquiler a Corto Plazo" y "Crea tu Suerte". Metodología probada para construir libertad financiera.`,
  alternates: { canonical: "/libros" },
};

const booksSchema = {
  "@context": "https://schema.org",
  "@graph": CLIENT.books.map((book) => ({
    "@type": "Book",
    name: book.title,
    author: { "@type": "Person", name: CLIENT.name, url: CLIENT.siteUrl },
    ...(book.coAuthor ? { contributor: { "@type": "Person", name: book.coAuthor } } : {}),
    description: book.description,
    inLanguage: "es",
    url: `${CLIENT.siteUrl}/libros/${book.slug}`,
    genre: ["Business", "Real Estate", "Personal Finance"],
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: CLIENT.faq.libros.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: CLIENT.siteUrl },
    { "@type": "ListItem", position: 2, name: "Libros", item: `${CLIENT.siteUrl}/libros` },
  ],
};

export default function LibrosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(booksSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C8A45D]/5 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-[#888888] text-sm mb-8">
              <a href="/" className="hover:text-[#C8A45D] transition-colors">Inicio</a>
              <span className="mx-2">/</span>
              <span className="text-[#C8A45D]">Libros</span>
            </nav>
            <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">Próximas Publicaciones</span>
            <h1 className="text-5xl sm:text-6xl font-bold text-[#F7F3EC] mt-3 mb-4">
              Mis <span className="text-gold-gradient">Libros</span>
            </h1>
            <p className="text-[#F7F3EC]/60 text-xl max-w-2xl">
              Años de experiencia real, condensados en dos obras diseñadas para transformar tu relación con las propiedades y la riqueza.
            </p>
          </div>
        </section>

        {/* Books */}
        <section className="py-20 bg-[#111111]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {CLIENT.books.map((book, i) => (
                <div key={book.slug} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? "lg:grid-flow-col-dense" : ""}`}>
                  {/* Cover */}
                  <div className={`relative ${i % 2 !== 0 ? "lg:col-start-2" : ""}`}>
                    <div className="relative w-full max-w-sm mx-auto aspect-[3/4] border border-[#C8A45D]/30 overflow-hidden">
                      <div className="absolute -inset-2 border border-[#C8A45D]/10 z-20 pointer-events-none" />
                      <Image
                        src={book.cover}
                        alt={`Portada: ${book.title}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 400px"
                        className="object-cover"
                      />
                      <div className="absolute top-4 right-4 px-3 py-1 bg-[#C8A45D] text-black text-xs font-bold tracking-widest uppercase z-30">
                        {book.status}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h2 className="text-3xl font-bold text-[#F7F3EC] mb-4">{book.title}</h2>
                    {book.coAuthor && (
                      <p className="text-[#22AEEF] text-base mb-4 tracking-wide">Coescrito con {book.coAuthor}</p>
                    )}
                    <p className="text-[#F7F3EC]/70 text-base leading-relaxed mb-6">{book.description}</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {book.topics.map((t) => (
                        <span key={t} className="px-3 py-1 bg-[#C8A45D]/10 text-[#C8A45D] text-sm border border-[#C8A45D]/20">
                          {t}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/libros/${book.slug}`}
                      className="inline-block px-8 py-3 bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#E2C98A] transition-colors"
                    >
                      Más Información
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-black">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#F7F3EC] mb-12 text-center">
              Preguntas <span className="text-gold-gradient">frecuentes</span>
            </h2>
            <div className="space-y-6">
              {CLIENT.faq.libros.map((item, i) => (
                <div key={i} className="border border-[#C8A45D]/20 p-6">
                  <h3 className="text-[#C8A45D] font-semibold mb-3">{item.q}</h3>
                  <p className="text-[#F7F3EC]/70 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
