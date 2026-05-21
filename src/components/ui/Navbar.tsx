"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CLIENT } from "@/lib/client-data";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/sobre-mi", label: "Sobre Mí" },
  { href: "/servicios", label: "Servicios" },
  { href: "/cursos", label: "Cursos" },
  { href: "/libros", label: "Libros" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isEN = pathname.startsWith("/en");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = isEN
    ? navLinks.map((l) => ({ ...l, href: `/en${l.href === "/" ? "" : l.href}` }))
    : navLinks;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#0D0A08]/95 backdrop-blur-md border-b border-[#C8A45D]/20" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href={isEN ? "/en" : "/"} className="flex flex-col leading-tight group">
          <span className="text-[#C8A45D] font-bold text-lg tracking-widest uppercase group-hover:text-[#E2C98A] transition-colors">
            {CLIENT.nameShort}
          </span>
          <span className="text-[#888888] text-xs tracking-widest uppercase">The Host Circle</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {links.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && link.href !== "/en" && pathname.startsWith(link.href));
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm tracking-wider uppercase transition-colors ${
                    active ? "text-[#C8A45D]" : "text-[#F7F3EC]/70 hover:text-[#C8A45D]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href={isEN ? "/" : "/en"}
            className="text-xs text-[#888888] hover:text-[#C8A45D] tracking-widest uppercase transition-colors"
          >
            {isEN ? "ES" : "EN"}
          </Link>
          <Link
            href="/contacto"
            className="px-5 py-2 rounded-full bg-[#C8A45D] text-black text-sm font-semibold tracking-wider uppercase hover:bg-[#E2C98A] transition-all hover:shadow-[0_0_20px_rgba(200,164,93,0.35)]"
          >
            Trabajemos Juntos
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-[#F7F3EC]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <div className="w-6 space-y-1.5">
            <span className={`block h-0.5 bg-[#C8A45D] transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 bg-[#C8A45D] transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-[#C8A45D] transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0D0A08]/98 border-t border-[#C8A45D]/20"
          >
            <ul className="flex flex-col px-6 py-6 gap-4">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-base tracking-wider uppercase text-[#F7F3EC]/80 hover:text-[#C8A45D] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4 border-t border-[#C8A45D]/20">
                <Link
                  href="/contacto"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center px-5 py-3 rounded-full bg-[#C8A45D] text-black font-semibold tracking-wider uppercase"
                >
                  Trabajemos Juntos
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
