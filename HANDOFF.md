# Handoff — ISOTEK LATAM website

## The concept: "Diagrama Unifilar"
The site is drawn like the single-line diagram of an Isotek installation. On the home page, a red busbar draws itself, current pulses along it, and four feeders switch on: **Ingeniería · Procura · Fabricación · Puesta en marcha**, under the headline **"Un solo proveedor."** On desktop the busbar then runs down the left edge of every page and fills as you scroll, with a node lighting up at each section. The palette keeps the logo's red and black, the type is condensed like an equipment nameplate, and every photo is Isotek's own work.

**Message:** One supplier, from engineering to commissioning, backed by 200+ projects, its own factory and international certifications.

## Main decisions (detail in `DECISIONS.md`)
- Kept the logo, red and black; dropped the template yellow. New type: Archivo (display), Source Sans 3 (body, continuing the current Source Sans Pro), JetBrains Mono (technical labels).
- 5-item navigation (Soluciones, Proyectos, Productos, Empresa, Novedades) plus a permanent consultation CTA and a WhatsApp button.
- Proof first: named clients, real numbers, certifications and the factory story on the home page.
- 16 case studies with country/industry filters; 10 product pages with full spec tables; brands as text, not logos.
- Every old WordPress URL redirects permanently to its new page.
- Admin: Sanity Studio at `/studio` with every piece of content editable in both languages. Until a Sanity project exists, the site runs from the same content stored in the code.

## Pages
`/es` and `/en` × Home, Soluciones, Proyectos (+16), Productos (+10), Marcas, Empresa, Novedades (+9), Contacto, Privacidad, 404: 95 statically generated pages.

## QA results (production build, 2026-11-05)

| Check | Result |
|---|---|
| Lighthouse mobile (Home, Soluciones, Proyectos, a project, a product, Empresa, Contacto, EN home) | Performance **90–95**; Accessibility **100**; Best Practices **100**; SEO **100** |
| Lighthouse desktop (same pages) | Performance **97–100**; others **100** |
| LCP | Desktop 0.7–1.3 s ✅. **Mobile lab 2.9–3.4 s ❌** (target 2.5 s) under Lighthouse's simulated slow 4G + 4× CPU. The old site measured 7.9 s in a real browser. Main remaining cost: framework JavaScript + webfonts. |
| CLS | 0–0.007 ✅ |
| TBT (INP proxy) | 50–160 ms mobile ✅ |
| Page weight (home) | ~250 KB JS + 11 KB CSS + 148 KB fonts + responsive AVIF/WebP images (old site: ~4.6 MB, 146 requests) |
| Responsive | No horizontal scroll at 360, 390, 768, 1024, 1440, 1920 on 14 representative pages ✅ |
| No JavaScript | All content visible (0 hidden elements) ✅ |
| Reduced motion | No animations run; hero renders in its final state ✅ |
| Keyboard | Skip link, visible focus rings, mobile menu with Esc and focus return ✅ |
| Language toggle | Keeps the current page (e.g. project → same project in EN) ✅ |
| Forms | Client and server validation (zod), honeypot, rate limit; without an email key, returns 503 and shows email/WhatsApp ✅. **Real delivery not tested** (no Resend key). |
| Admin create/edit/delete | **Not tested**: needs a Sanity project. Schemas compile; the Studio route shows setup instructions until configured. |
| SEO | Unique titles/descriptions per page and language, canonical + hreflang (es, en, x-default), sitemap with alternates, robots, Organization/LocalBusiness, Service, FAQPage, Product, NewsArticle, BreadcrumbList JSON-LD ✅ |
| Security | No secrets in the repo; `/studio` and `/api` disallowed in robots; security headers; input validated and HTML-escaped in emails ✅ |
| Content | No lorem ipsum; every fact is traced to the current site (`research/01-brand-profile.md`); the only placeholder is the marked privacy page ✅ |

## What the client must provide or approve (detail in `MISSING_CONTENT.md` and `ASSET_RIGHTS_REVIEW.md`)
1. Privacy policy text.
2. Review of the English translation.
3. Vector logos (ISOTEK LATAM, PROTOS).
4. A Sanity account (free) → enables the admin portal.
5. An email-delivery key (Resend) and the receiving inbox.
6. Confirmation of the team list, the main WhatsApp number, and staff consent for public contact details.
7. Approval to show each client's name and site photos, and the staff in photos.
8. Confirmation of the partner claims ("representante exclusivo Endress+Hauser", "partner oficial exclusivo CUBIC", E+H-certified lab).
9. Recommended: original high-resolution project and factory photos, testimonials, project figures, a custom domain for the Shopify store, a GA4 ID.

## Not done, and why
- **Preview deployment**: needs approval to publish under your Vercel account (the brief requires approval for publishing).
- **Live domain**: not connected (requires approval).
- **Instagram analysis**: Instagram's login wall blocks automated access; a data export is requested.
- **Competitor site visits**: those sites weren't reachable from the build environment; analysis uses search results plus marked prior knowledge.
