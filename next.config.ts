import type { NextConfig } from "next";

const I18N_ENABLED = process.env.NEXT_PUBLIC_I18N_ENABLED === "true";

const nextConfig: NextConfig = {
  async redirects() {
    const base = [
      // Consolidación de servicios dispersos → rutas del nuevo posicionamiento
      { source: "/servicios", destination: "/alquileres-a-corto-plazo", permanent: true },
      { source: "/cursos", destination: "/recursos", permanent: true },
      { source: "/libros", destination: "/recursos", permanent: true },
      { source: "/libros/:slug", destination: "/recursos", permanent: true },
      { source: "/conferencias", destination: "/sobre-mi", permanent: true },
      { source: "/prensa", destination: "/sobre-mi", permanent: true },
    ];

    if (!I18N_ENABLED) {
      // Bilingüe apagado: fallback a ES para cualquier ruta EN.
      // Cuando NEXT_PUBLIC_I18N_ENABLED=true, /en/* sirve las rutas EN reales.
      return [
        ...base,
        { source: "/en", destination: "/", permanent: false },
        { source: "/en/:path*", destination: "/", permanent: false },
      ];
    }

    // Bilingüe activo: solo redirect defensivo para slugs EN legacy.
    return [
      ...base,
      { source: "/en/tax-deed", destination: "/en/tax-deed-investing", permanent: true },
    ];
  },
};

export default nextConfig;
