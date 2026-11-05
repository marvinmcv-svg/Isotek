# 07 — Build plan

## Sitemap (both locales under `/es` and `/en`; `/` redirects by Accept-Language, default `es`)

```
/[locale]                     Home
/[locale]/soluciones          Services (8 service lines, anchored)
/[locale]/proyectos           Case studies index (filter by country + industry)
/[locale]/proyectos/[slug]    Case study detail (16)
/[locale]/productos           PROTOS + ISOTEK products
/[locale]/productos/[slug]    Product detail (11)
/[locale]/marcas              Partner brands
/[locale]/empresa             About + certifications + team + offices
/[locale]/novedades           News index
/[locale]/novedades/[slug]    News detail (9)
/[locale]/contacto            Consultation form + offices + WhatsApp
/studio                       Sanity Studio (admin)
/api/contact                  Form handler
```
Old WordPress URLs are 301-redirected (`/soluciones-y-servicios/` → `/es/soluciones`, `/nuestros-proyectos/` → `/es/proyectos`, each project/news post → its new slug, `/producto/x/` → `/es/productos/x`, `/quienes-somos/` and `/certificaciones/` → `/es/empresa`, `/consultas/` → `/es/contacto`, `/nuestras-marcas/` → `/es/marcas`, `/novedades/` → `/es/novedades`).

## Primary journeys
1. **Plant/maintenance manager with a need** → Home hero → Industry or Service → relevant case study → "Solicitar asesoramiento" (pre-filled service) or WhatsApp.
2. **Procurement checking credibility** → Home proof strip → Empresa (certificates, factory, team) → Contacto.
3. **Buyer of a specific product** → Productos → product detail → Tienda online (Shopify) or quote.
4. **Partner/brand search** ("Endress+Hauser Bolivia") → Marcas → Soluciones/Calibración → Contacto.

## Pages

| Page | Purpose | Sections | Content source | Media | Main CTA |
|---|---|---|---|---|---|
| Home | 5-second clarity + proof | Hero "Energizar" · Proof strip (since 2015, 200+ projects, 100+ people, 5 countries) · Services as feeders (8) · Featured projects (4) · Fabricado en Bolivia (PROTOS + CNC + certifications) · Industries (10) · Brands wall (text) · Calibration lab callout · Offices · CTA band | home, quienes-somos, soluciones | Alicorp MCC, CBN busbar, Planta etanol, Emapa, PROTOS products | Solicitar asesoramiento / WhatsApp |
| Soluciones | Explain each service line concretely | Intro · 8 service blocks with bullet scope · CCM CUBIC vs PROTOS comparison · Process (5 steps) · FAQ (10, from site) · CTA | soluciones-y-servicios | field photos | Consult (pre-filled) |
| Proyectos | Proof by filterable index | Filters (country, industry) · grid of 16 | posts | project photos | Case detail |
| Proyecto detail | Specific proof | Data strip (client, place, scope) · About the plant · Isotek scope · gallery · next project · CTA | posts | 1–4 photos | Consult |
| Productos | Product catalogue | Intro PROTOS · grid of 11 · store link | productos | product shots | Detail / Tienda |
| Producto detail | Specs | Hero shot · spec table · models · gallery · standards · 3D link (if any) · CTA | product pages | product photos | Cotizar / Tienda |
| Marcas | Partner authority | Grouped list by category | nuestras-marcas | none (text) | Consult |
| Empresa | Trust | Story (2015→LATAM) · numbers · mission/vision · certifications (TÜV) · team · offices map list | quienes-somos, certificaciones | QuienesSomos photos, certificate | Contact |
| Novedades | Activity | list + detail | posts | event photos | — |
| Contacto | Convert | form · direct channels · offices · hours | consultas, footer | — | Submit |
| 404 | Recover | "Circuito abierto" + links | — | — | Home |

## Motion spec

| Section | Trigger | Effect | Duration | Easing |
|---|---|---|---|---|
| Hero diagram | page load (after fonts) | SVG strokes draw incomer→busbar→feeders, staggered 120 ms | 1200 ms | inOut |
| Hero pulse | after draw | red dot travels along busbar, lights feeder nodes | 900 ms | inOut |
| Hero headline | after first feeder | lines rise 24px + fade, stagger 60 ms | 700 ms | out |
| Hero photo | after last node | opacity 0→0.55, scale 1.06→1 | 1400 ms | out |
| Page busbar | scroll | stroke length scrubbed to scroll progress | scrub | linear |
| Section node | section top hits 70% viewport | node scales 0.6→1, glow on | 280 ms | snap |
| Section heading | enters viewport (once) | rise + fade | 700 ms | out |
| Images | enter viewport (once) | clip-path inset(50% 0 50% 0) → inset(0) | 900 ms | out |
| Counters | enter viewport (once) | count 0→value, tabular nums | 1200 ms | out |
| Project card hover | hover/focus | img scale 1.03, label red, arrow shifts 4px | 280 ms | out |
| Buttons | hover/focus | red wipe left→right | 280 ms | out |
| Lang toggle | click | contact slides between ES/EN | 160 ms | snap |
| Reduced motion | `prefers-reduced-motion: reduce` | all of the above render in end state, no transforms | 0 | — |

## Content model (Sanity — mirrors `site/src/content/types.ts`)
- `siteSettings` (singleton): company name, legal name, tagline (i18n), phone, email, whatsapp, address, hours (i18n), store URL, socials[], offices[] {city, country, role (i18n)}, stats[] {value, suffix, label (i18n)}
- `service`: slug, order, title (i18n), summary (i18n), scope[] (i18n), image
- `industry`: order, name (i18n)
- `project`: slug, client, country, place, industry ref, service refs, title (i18n), about (i18n), scope (i18n), images[], featured (bool), order
- `product`: slug, brand (PROTOS/ISOTEK), title (i18n), summary (i18n), specs[] {model, description (i18n)}, standards[], images[], sketchfabUrl
- `brand`: name, category (i18n), url, order
- `teamMember`: name, role (i18n), region, email, whatsapp, order
- `post`: slug, date, title (i18n), body (i18n portable text/plain paragraphs), images[], videoUrl
- `faq`: order, question (i18n), answer (i18n)
- `certification`: name, issuer, id, image, description (i18n)
i18n fields are objects `{ es, en }` (field-level translation; one document per entity keeps editing simple for a non-technical admin).

## SEO plan
- **Keywords (ES primary):** tableros eléctricos Bolivia · centro de control de motores CCM Bolivia · EPC industrial Bolivia · calibración Endress+Hauser Bolivia · tableros IEC 61439 · ducto barras · bandejas portacables Santa Cruz · automatización industrial Santa Cruz · CUBIC Rockwell Bolivia · mantenimiento eléctrico industrial. **EN:** switchgear manufacturer Bolivia · MCC Bolivia · industrial EPC Bolivia.
- **Metadata:** unique title (≤ 60 chars) and description (≤ 155) per page and locale; OG image per page (project photo) with a generated default.
- **Schema:** `Organization` + `LocalBusiness` (address, phone, hours, sameAs) site-wide; `Service` on Soluciones; `Product` on products (no price — `offers` omitted); `Article`/`NewsArticle` on news; `BreadcrumbList` on details; `FAQPage` on Soluciones.
- **URLs:** `/{locale}/{section}/{slug}`; slugs kept from WordPress where they existed.
- `sitemap.xml` with `alternates.languages`; `robots.txt` disallowing `/studio` and `/api`; `hreflang` es, en, x-default.

## Components
Layout: `Header` (logo, nav, lang toggle, CTA), `MobileNav`, `Footer`, `Busbar` (page-long line + nodes), `SkipLink`.
Sections: `HeroEnergize`, `ProofStrip`, `FeederList` (services), `ProjectGrid`/`ProjectCard`, `FactoryBand`, `IndustryRail`, `BrandWall`, `LabCallout`, `OfficeList`, `CtaBand`, `FaqList`, `CompareMcc`, `ProcessSteps`, `TeamList`, `CertCard`, `SpecTable`, `Gallery`.
Primitives: `Button`, `LinkArrow`, `MonoLabel`, `Reveal`, `ImageReveal`, `Counter`, `SectionNode`, `ContactForm`, `WhatsAppButton`.

## Architecture
- Next.js 16 App Router, React 19, TypeScript strict, static generation for every page (`generateStaticParams`) — CMS edits revalidate via `revalidate = 3600` and a Sanity webhook to `/api/revalidate` (documented).
- Content layer `src/content/index.ts` → Sanity (GROQ) if configured, else typed seed.
- Tailwind v4 with tokens in CSS `@theme`.
- Motion (`motion/react`) for UI reveals; GSAP + ScrollTrigger only in `Busbar` and `HeroEnergize` (dynamically imported, client-only).
- next-intl v4 for routing + UI strings (`messages/es.json`, `messages/en.json`); content translations live in the CMS fields.
- `/api/contact`: zod validation, honeypot, in-memory IP rate limit, Resend if `RESEND_API_KEY`.

## Acceptance criteria
1. Every page in the sitemap renders in ES and EN with no missing keys and no lorem ipsum.
2. Hero message + primary CTA visible in the first viewport at 360 px and 1440 px.
3. Every CTA reaches a working path (form, `wa.me/59169224248`, `mailto:`, `tel:`, store).
4. Form rejects invalid input client- and server-side; honeypot submissions are dropped.
5. Lighthouse ≥ 90 (performance, accessibility, best practices, SEO) on Home, a project page and Contacto, mobile and desktop.
6. No horizontal scroll at 360, 390, 768, 1024, 1440, 1920.
7. With JS disabled, all content is visible and readable.
8. With reduced motion, no animated transforms.
9. Studio schema matches seed; `seed.ndjson` imports cleanly.
10. Old WordPress URLs return 301 to the right new page.
