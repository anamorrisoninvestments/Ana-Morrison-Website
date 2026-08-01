import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Rutas legacy redirigidas en next.config (301 → nuevas rutas del reposicionamiento).
    // Se conservan como respaldo hasta la limpieza definitiva en fase P3.
    "src/app/servicios/**",
    "src/app/cursos/**",
    "src/app/libros/**",
    "src/app/conferencias/**",
    "src/app/prensa/**",
    "src/app/en/**",
    // Componentes archivados (fuera del home tras el reposicionamiento).
    "src/components/sections/MentorshipSection.tsx",
    "src/components/sections/NewsletterSection.tsx",
    "src/components/sections/CoachingSection.tsx",
    "src/components/sections/MembershipSection.tsx",
    "src/components/sections/PremiumExperienceSection.tsx",
    "src/components/sections/PropertyManagementSection.tsx",
    "src/components/sections/STRServicesSection.tsx",
    "src/components/sections/EcosystemSection.tsx",
    "src/components/sections/BooksSection.tsx",
    "src/components/sections/ServicesSection.tsx",
  ]),
]);

export default eslintConfig;
