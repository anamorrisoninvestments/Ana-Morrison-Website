"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CLIENT } from "@/lib/client-data";

export default function BooksSection() {
  return (
    <section id="libros" className="py-24 bg-[#141210]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">Próximas Publicaciones</span>
          <h2 className="heading-serif text-4xl sm:text-5xl mt-3 mb-4">
            <span className="text-[#F7F3EC]">Mis </span>
            <span className="text-gold-gradient">Libros</span>
          </h2>
          <p className="text-[#F7F3EC]/60 text-lg max-w-2xl mx-auto">
            Metodología probada y visión transformadora, condensadas en dos obras que cambiarán tu relación con el dinero y los bienes raíces.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {CLIENT.books.map((book, i) => (
            <motion.div
              key={book.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group rounded-2xl border border-[#C8A45D]/15 hover:border-[#C8A45D]/50 bg-[#1C1916] overflow-hidden transition-all hover:shadow-[0_12px_50px_rgba(0,0,0,0.6)] hover:-translate-y-1"
            >
              {/* Cover */}
              <div className="relative w-full aspect-[3/4] max-h-96 bg-[#141210] flex items-center justify-center overflow-hidden">
                <Image
                  src={book.cover}
                  alt={`Portada: ${book.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-contain"
                />
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[#C8A45D] text-black text-xs font-bold tracking-widest uppercase z-10">
                  {book.status}
                </div>
              </div>

              <div className="p-8">
                <h3 className="heading-serif text-[#F7F3EC] text-2xl mb-3 group-hover:text-[#C8A45D] transition-colors">
                  {book.title}
                </h3>
                {book.coAuthor && (
                  <p className="text-[#22AEEF] text-sm mb-3 tracking-wide">
                    Coescrito con {book.coAuthor}
                  </p>
                )}
                <p className="text-[#F7F3EC]/60 text-sm leading-relaxed mb-6">{book.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {book.topics.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full bg-[#C8A45D]/8 text-[#C8A45D] text-xs border border-[#C8A45D]/20">
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/libros/${book.slug}`}
                  className="text-[#C8A45D] text-sm tracking-wider uppercase font-semibold hover:underline"
                >
                  Más información →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
