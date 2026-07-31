import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Consolidación de servicios dispersos → rutas del nuevo posicionamiento
      { source: "/servicios", destination: "/alquileres-a-corto-plazo", permanent: true },
      { source: "/cursos", destination: "/recursos", permanent: true },
      { source: "/libros", destination: "/recursos", permanent: true },
      { source: "/libros/:slug", destination: "/recursos", permanent: true },
      { source: "/conferencias", destination: "/sobre-mi", permanent: true },
      { source: "/prensa", destination: "/sobre-mi", permanent: true },
      // Versión en inglés desactivada temporalmente (traducción incompleta)
      { source: "/en", destination: "/", permanent: false },
      { source: "/en/:path*", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
