# 05 — Strengths and weaknesses audit

Measured 2026-11-05 with Playwright + Chromium (Moto G4 emulation for mobile, 1440×900 desktop) against `https://isoteklatam.com/`. Lighthouse itself was not run on the old site (tool install restricted); values below are real browser Performance-API measurements.

| Metric | Mobile | Desktop |
|---|---|---|
| Load event | 9.4 s | 8.8 s |
| LCP | **7.9 s** | **7.2 s** |
| CLS | 0.022 | 0.071 |
| Requests | 146 | 147 |
| Transfer (content-length sum) | ~4.6 MB | ~4.6 MB |
| DOM elements | 1,943 | 1,961 |
| Images without alt | 8 of 46 | 8 of 52 |

| Area | Score /10 | Evidence | Opportunity | Priority |
|---|---|---|---|---|
| Brand clarity and differentiation | 5 | Strong claims exist ("única EPC industrial de Bolivia…", E+H-certified lab, PROTOS) but are buried on /soluciones-y-servicios; the hero has **no headline at first paint** (screenshot `current-desktop.png`) | Lead with the one-supplier EPC promise + proof in the first viewport | High |
| Visual identity | 4 | Good logo, but theme-default yellow, Roboto everywhere, ~15 icon fonts, stamped logos on photos | Build a system from the logo's red/black + engineering diagram language | High |
| UX and navigation | 5 | 8 top-level items wrapping to two rows at 1440 px; "Casos de Éxito" vs "Nuestros Proyectos" naming split; Certificaciones as its own top-level page | 5-item nav: Soluciones, Proyectos, Productos, Empresa, Novedades + CTA | High |
| Conversion path | 5 | "Solicite asesoramiento" everywhere → long form; contact form shows "Required Login — Please Login for Submit Form" text in markup; WhatsApp rotator works | Short form (name, company, email/phone, need), WhatsApp one tap, per-service CTAs | High |
| Content quality | 6 | Rich, specific service and product content; 16 named case studies; but lorem ipsum in a hidden block ("Fusce tellus leo…"), counters render "0" without JS, conflicting team lists, "15 años" vs founded 2015 | Clean, consistent, single source of truth in a CMS | High |
| Trust and social proof | 7 | Blue-chip named clients, ISO 9001 (TÜV ID 9000029079), IEC 61439/62208, 20+ partner brands | Surface clients + certifications on home; no testimonials exist (request them) | Medium |
| Mobile experience | 5 | LCP 7.9 s on mobile; heavy carousels; no horizontal scroll (good) | Mobile-first layouts, sticky WhatsApp/CTA bar | High |
| Performance | 2 | 4.6 MB, 146 requests, LCP 7–8 s, 15 icon fonts, Elementor + ElementsKit + WooCommerce assets on every page | Static-first Next.js, AVIF/WebP, 3 font families subset, no icon fonts | High |
| SEO | 6 | Yoast in place, good page titles on key pages; but post meta descriptions are generic ("Conozca nuestra novedades."), 404 template returned for isotek.bo/sitemap.xml, no structured data beyond Yoast basics | Per-page descriptions, Organization/LocalBusiness/Service/Product schema, hreflang ES/EN, 301 map | Medium |
| Accessibility | 4 | 8 images without alt on home; body text `#7B7B7B` on white ≈ 4.2:1 (fails AA for normal text); icon-only links ("Mdi-email-open-multiple-outline"); carousels | WCAG 2.2 AA tokens, labelled links, reduced motion | High |
| Social media presence | 5 | Instagram/LinkedIn/Facebook exist; site links only FB & LinkedIn (no Instagram); recent content is webinar + partner promotion | Link all channels; reuse webinar/education content as a site section | Low |

## Top 5 strengths to amplify
1. **Named, blue-chip project portfolio** across BO and PY (YPFB, Cargill, Cervepar/AB InBev, CBN/AmBev, Alicorp, Soboce, Bovinsa).
2. **Own manufacturing** — PROTOS brand, two CNC lines, IEC 61439-1/5 and IEC 62208, ISO 9001:2015 (TÜV Rheinland).
3. **Unique services** — E+H-certified calibration lab (only one in Bolivia, brand claim) and exclusive E+H / CUBIC partnerships.
4. **End-to-end EPC** with in-house engineering, fabrication, assembly, commissioning and O&M — real "single supplier".
5. **Authentic photography** of real installations and real people.

## Top 5 weaknesses to fix
1. Slow (LCP 7–8 s, 4.6 MB) — costly for mobile users on site and in the field.
2. No clear message at first paint; stock refinery hero.
3. Generic template identity (yellow accent, Roboto, carousels, icon fonts).
4. Content hygiene: lorem ipsum, zeroed counters, conflicting team, store on raw myshopify domain.
5. Accessibility gaps (contrast, alt text, icon-only links).

## Single biggest business opportunity
**Turn the portfolio into the sales tool.** Isotek's 16 named case studies, its own factory and its certifications are exactly what an industrial buyer (plant manager, maintenance head, EPC procurement) needs to shortlist a supplier — but today they're hidden behind slow pages and generic visuals. A fast site that leads with proof ("200+ proyectos. Un solo proveedor.") and routes each industry/service directly to a short consultation form or WhatsApp should raise qualified quote requests.
