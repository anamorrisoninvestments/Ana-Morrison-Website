"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CLIENT } from "@/lib/client-data";

export default function BooksSection() {
  return (
    <section id="libros" className="py-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">Próximas Publicaciones</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#F7F3EC] mt-3 mb-4">
            Mis <span className="text-gold-gradient">Libros</span>
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
              className="group border border-[#C8A45D]/20 hover:border-[#C8A45D]/60 transition-all bg-black overflow-hidden"
            >
              {/* Cover placeholder */}
              <div className="w-full h-56 bg-gradient-to-br from-[#1A1A1A] to-[#10145F]/30 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: "linear-gradient(45deg, #C8A45D 1px, transparent 1px), linear-gradient(-45deg, #C8A45D 1px, transparent 1px)", backgroundSize: "30px 30px" }}
                />
                <div className="text-center z-10">
                  <div className="text-5xl mb-2">📖</div>
                  <p className="text-[#888888] text-xs">Portada próximamente</p>
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#C8A45D] text-black text-xs font-bold tracking-widest uppercase">
                  {book.status}
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-[#F7F3EC] font-bold text-xl mb-3 group-hover:text-[#C8A45D] transition-colors">
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
                    <span key={t} className="px-2 py-1 bg-[#C8A45D]/10 text-[#C8A45D] text-xs border border-[#C8A45D]/20">
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
