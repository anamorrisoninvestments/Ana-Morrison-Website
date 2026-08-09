# Parity Matrix · Documentación ES ↔ EN pre-implementación

**Estado:** matriz previa a implementación técnica (F2+). Cobertura documental completa (COPY-BLOCK 1–4 + 5A–5G). Ninguna celda técnica evaluada aún (F2–F13 pendientes).

**Leyenda:**
- ✅ documentado en copy blocks
- 🔨 pendiente de implementación técnica en `src/`
- ⏸ requiere revisión legal humana (páginas legales)
- 📷 requiere asset real (imágenes)

## Rutas principales

| # | Ruta ES | Ruta EN | Copy documentado | Impl. técnica | Metadata | hreflang | Schema | Fuente copy |
|---|---|---|---|---|---|---|---|---|
| 1 | `/` | `/en` | ✅ | 🔨 | ✅ | 🔨 | ✅ | COPY-BLOCK-1 §1.3.* |
| 2 | `/sobre-mi` | `/en/about` | ✅ | 🔨 | ✅ | 🔨 | ✅ | COPY-BLOCK-2 §2.1 |
| 3 | `/alquileres-a-corto-plazo` | `/en/short-term-rentals` | ✅ | 🔨 | ✅ | 🔨 | ✅ | COPY-BLOCK-2 §2.2 |
| 4 | `/tax-deed` | `/en/tax-deed-investing` | ✅ | 🔨 | ✅ | 🔨 | ✅ | COPY-BLOCK-2 §2.3 |
| 5 | `/casos-de-exito` | `/en/case-studies` | ✅ | 🔨 | ✅ | 🔨 | ✅ | COPY-BLOCK-3 §3.1 |
| 6 | `/recursos` | `/en/resources` | ✅ | 🔨 | ✅ | 🔨 | ✅ | COPY-BLOCK-3 §3.2 |
| 7 | `/contacto` | `/en/contact` | ✅ | 🔨 | ✅ | 🔨 | ✅ | COPY-BLOCK-3 §3.3 |
| 8 | `/blog` | `/en/blog` | ✅ (landing en 5A) | 🔨 | ✅ | 🔨 | ✅ | COPY-BLOCK-5A–5G (landing extrapolada) |
| 9 | `/politica-de-privacidad` | `/en/privacy-policy` | ✅ ⏸ | 🔨 | ✅ | 🔨 | ✅ | COPY-BLOCK-4 §4.3 |
| 10 | `/politica-de-cookies` | `/en/cookie-policy` | ✅ ⏸ | 🔨 | ✅ | 🔨 | ✅ | COPY-BLOCK-4 §4.4 |
| 11 | `/terminos-de-uso` | `/en/terms-of-use` | ✅ ⏸ | 🔨 | ✅ | 🔨 | ✅ | COPY-BLOCK-4 §4.5 |

## Blog Posts (20/20)

| # | Slug ES | Slug EN | Copy EN | Fuente |
|---|---|---|---|---|
| 1 | `que-es-el-alquiler-a-corto-plazo` | `what-is-a-short-term-rental` | ✅ | 5A |
| 2 | `tax-deed-que-es` | `what-is-a-tax-deed` | ✅ | 5A |
| 3 | `5-rutas-riqueza-alquiler-corto-plazo` | `5-paths-to-wealth-with-short-term-rentals` | ✅ | 5A |
| 4 | `como-empezar-airbnb-sin-propiedad` | `how-to-start-airbnb-without-a-property` | ✅ | 5B |
| 5 | `diferencia-renta-tradicional-airbnb` | `traditional-rental-vs-airbnb` | ✅ | 5B |
| 6 | `libertad-financiera-bienes-raices` | `financial-freedom-through-real-estate` | ✅ | 5B |
| 7 | `co-hosting-guia-completa` | `airbnb-co-hosting-complete-guide` | ✅ | 5C |
| 8 | `mujer-latina-inversion-inmobiliaria` | `latina-real-estate-investors` | ✅ | 5C |
| 9 | `optimizar-listing-airbnb` | `how-to-optimize-your-airbnb-listing` | ✅ | 5C |
| 10 | `credito-e-inversiones-inmobiliarias` | `credit-and-real-estate-investing` | ✅ | 5D |
| 11 | `automatizacion-airbnb` | `airbnb-automation-for-hosts` | ✅ | 5D |
| 12 | `diseño-interior-airbnb` | `airbnb-interior-design` | ✅ | 5D |
| 13 | `mercados-airbnb-florida` | `best-florida-airbnb-markets` | ✅ | 5E |
| 14 | `estrategia-brrrr-inmobiliaria` | `brrrr-strategy-explained` | ✅ | 5E |
| 15 | `errores-inversionista-principiante` | `beginner-real-estate-investor-mistakes` | ✅ | 5E |
| 16 | `como-usar-el-credito-para-invertir-en-bienes-raices` | `using-credit-to-invest-in-real-estate` | ✅ | 5F |
| 17 | `airbnb-vs-booking-vs-vrbo-cual-plataforma-usar` | `airbnb-vs-booking-vs-vrbo` | ✅ | 5F |
| 18 | `caso-real-primera-propiedad-co-hosting-miami` | `miami-co-hosting-case-study` | ✅ | 5F |
| 19 | `tax-deed-florida-guia-completa-principiantes` | `florida-tax-deed-investing-beginners-guide` | ✅ | 5G |
| 20 | `mentalidad-inversionista-latina-como-vencer-el-miedo` | `overcoming-money-fears-as-a-latina-investor` | ✅ | 5G |

## Componentes compartidos

| Componente | Copy documentado | Estado |
|---|---|---|
| Navbar | ✅ COPY-BLOCK-1 §1.1 | 🔨 impl. |
| Footer | ✅ COPY-BLOCK-1 §1.2 | 🔨 impl. |
| ContactForm | ✅ COPY-BLOCK-3 §3.3 (7-way picker + labels + errors) | 🔨 impl. |
| LocaleSwitcher | ✅ COPY-BLOCK-1 §1.4 | 🔨 impl. (nuevo componente) |
| BilingualSuggestionBanner | ✅ COPY-BLOCK-1 §1.5 | 🔨 impl. (nuevo componente) |
| ConsentBanner | ✅ COPY-BLOCK-4 §4.1 | 🔨 add EN dictionary |
| Cookie Preferences modal | ✅ COPY-BLOCK-4 §4.2 | 🔨 add EN dictionary |
| LegalDraftBanner | ✅ COPY-BLOCK-4 §4.6 | 🔨 impl. (nuevo componente) |
| Analytics | fail-closed preservado | 🔨 verificar `locale` cookie |

## Cross-cutting técnico

| Ítem | Estado |
|---|---|
| Feature flag `NEXT_PUBLIC_I18N_ENABLED=false` | ✅ intacto en Production |
| Redirects `/en → /` en `next.config.ts` | 🔨 remover condicionalmente cuando flag ON |
| `sitemap.ts` | 🔨 ampliar con rutas EN cuando flag ON |
| `robots.ts` | 🔨 revisar hreflang y noindex condicional para páginas legales |
| Schema.org WebSite/Person/Organization en `layout.tsx` | 🔨 normalizar `AnaMaría Morrison` |
| Category F identificadores | ✅ intactos (Verificado en NAME-AUDIT-REPORT) |

## Gaps materiales pendientes (no bloqueantes por diseño)

1. **Assets/imágenes:** cualquier imagen con texto ES no traducido — pendiente audit visual en F10.
2. **Páginas legales:** siguen como provisional draft con LegalDraftBanner + `robots: { index: false, follow: true }` hasta revisión legal humana.
3. **`hasCredential.issuer/identifier`:** no declarados en Schema.org hasta que Ana proporcione evidencia formal.
4. **`Ana Maria Morrison` en Privacy Policy ES:** reemplazar a `AnaMaría Morrison` durante F5 (NAME-AUDIT-REPORT ya lo listó).

## Cero gaps de contenido en EN

- ✅ 100% de rutas públicas con copy EN documentado.
- ✅ 20/20 blog posts EN documentados con metadata, schema, cuerpo, disclaimers.
- ✅ Cero `pending`, `placeholder`, `coming soon`, `Spanish-only`.
- ✅ Reglas maestras aplicadas transversalmente (nombre, credencial, superlativos, cifras).
