import Link from "next/link";
import { CLIENT } from "@/lib/client-data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#111111] border-t border-[#C8A45D]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <p className="text-[#C8A45D] font-bold text-xl tracking-widest uppercase mb-1">{CLIENT.nameShort}</p>
            <p className="text-[#888888] text-xs tracking-widest uppercase mb-4">The Host Circle</p>
            <p className="text-[#F7F3EC]/60 text-sm leading-relaxed max-w-xs">{CLIENT.tagline}</p>
            <div className="flex gap-4 mt-6">
              {Object.entries(CLIENT.social).map(([key, s]) => (
                <a
                  key={key}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-[#C8A45D]/30 flex items-center justify-center text-[#C8A45D] hover:bg-[#C8A45D] hover:text-black transition-all text-xs font-bold uppercase"
                  aria-label={key}
                >
                  {key === "instagram" ? "IG" : key === "facebook" ? "FB" : key === "tiktok" ? "TK" : key === "youtube" ? "YT" : "LI"}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-4">Navegación</p>
            <ul className="space-y-2">
              {[
                ["Sobre Mí", "/sobre-mi"],
                ["Servicios", "/servicios"],
                ["Libros", "/libros"],
                ["Blog", "/blog"],
                ["Prensa", "/prensa"],
                ["Contacto", "/contacto"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-[#F7F3EC]/60 text-sm hover:text-[#C8A45D] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-4">Contacto</p>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${CLIENT.email}`} className="text-[#F7F3EC]/60 text-sm hover:text-[#C8A45D] transition-colors break-all">
                  {CLIENT.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${CLIENT.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F7F3EC]/60 text-sm hover:text-[#C8A45D] transition-colors"
                >
                  WhatsApp: {CLIENT.whatsappDisplay}
                </a>
              </li>
            </ul>
            <Link
              href="/contacto"
              className="inline-block mt-6 px-5 py-2 bg-[#C8A45D] text-black text-sm font-semibold tracking-wider uppercase hover:bg-[#E2C98A] transition-colors"
            >
              Trabajemos Juntos
            </Link>
          </div>
        </div>

        <div className="divider-gold mt-12 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[#888888] text-xs">
          <p>© {year} {CLIENT.name} · The Host Circle · Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/en" className="hover:text-[#C8A45D] transition-colors uppercase tracking-wider">English</Link>
            <span>·</span>
            <Link href="/" className="hover:text-[#C8A45D] transition-colors uppercase tracking-wider">Español</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
