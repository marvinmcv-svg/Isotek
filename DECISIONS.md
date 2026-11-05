# Decisions log

Run mode: **autonomous** (default; no `RUN_MODE` given). Every decision below was made without stopping, per section 2 of the brief.

## Phase 0 — Assumptions

| # | Assumption | Basis |
|---|---|---|
| A1 | The brand is **ISOTEK LATAM** (legal name *ISOTEK Innovative Solutions SRL*), an industrial electrical/instrumentation EPC company headquartered in Santa Cruz de la Sierra, Bolivia. | isoteklatam.com/quienes-somos; `isotek.bo` redirects to `isoteklatam.com` (verified with curl: same WordPress install). The Instagram handle `isotek.bo` matches the `.bo` domain. Only one business matched, so no blocker. |
| A2 | Primary goal = **qualified B2B leads** (quote / technical consultation requests), secondary = product-store visits and WhatsApp contact. | Every CTA on the current site is "Solicite asesoramiento" → /consultas, plus a WhatsApp rotator and Shopify store. Inference. |
| A3 | Spanish is the primary language; English is a toggle (default from brief). | Brief default; audience in BO/PY/PE/AR, plus a USA (Miami warehouse) presence. |
| A4 | Admin portal = yes (default) → Sanity Studio embedded at `/studio`. | Brief default. |
| A5 | Tech stack = brief default (Next.js App Router + TS, Tailwind, Motion + GSAP, Sanity, next-intl, Vercel). | Brief section 8. |
| A6 | The existing WordPress URLs must keep working (they are indexed by Google via Yoast sitemaps), so the new site ships 301 redirects. | Sitemaps at /sitemap_index.xml. |

## Phase 0 — Environment

- `isoteklatam.com`, `isotek.bo` and Instagram were blocked by the session's network policy. With the user's approval I created a personal cloud environment named **Isotek** that allows those hosts plus Google Fonts, and moved this session onto it.
- `npx skills add multica-ai/andrej-karpathy-skills` was refused by the sandbox's safety policy (running remote code). Per section 4's fallback, I apply the four principles directly: think first, simplicity, surgical changes, goal-driven loops.
- Instagram: the public profile page sits behind a login wall for automated clients, and the sandbox refused a browser-spoofing request (correctly — the brief forbids bypassing access controls). Logged as a gap; see `MISSING_CONTENT.md`.
- Competitor/inspiration sites are not on the allowed network list, so Phase 2 relies on web search results plus prior knowledge, each marked as such.

## Phase 4 — Concept choice

Three concepts were developed (see `research/06-creative-direction.md`). **Chosen: "Diagrama Unifilar" (Single-Line).**

Why it wins:
1. It is the brand's native language. Isotek designs switchgear, MCCs and distribution boards; the single-line diagram is the document every one of their clients signs off on. Using it as the visual system makes the site *feel like engineering*, not like a template.
2. It solves the biggest audit weakness (generic, stock-led identity) without throwing away brand equity: it keeps the black/red/white of the logo.
3. Its signature moment — a busbar that runs down the whole page and "energises" each section as you scroll — maps 1:1 onto the business story (one supplier, one line, from engineering to commissioning).
4. It is cheap to render (SVG strokes + CSS), so it supports the performance goal, unlike the 3D or video-heavy alternatives.

## Brand-equity decisions

- **Logo:** kept unchanged. Only raster PNGs (≤266 px wide) exist; the site uses them at ≤ 1× their native width per device pixel. A vector (SVG/AI/PDF) master is requested in `MISSING_CONTENT.md`.
- **Colors:** kept logo red (`#E41E18`) and black. **Dropped the yellow `#FFC815`** that the WordPress theme used as an accent: it is not in the logo, it appears only in Elementor theme settings, and two warm accents competed. Red becomes the single "live circuit" signal. A warm steel off-white (`#F2F0EC`) replaces pure white for long reading surfaces.
- **Type:** current site uses Roboto / Roboto Condensed / Roboto Slab / Source Sans Pro plus ~15 icon fonts. New pairing:
  - Display: **Archivo** (variable, width axis 62–125, OFL) — condensed heavy weights echo industrial nameplates and the condensed headings the brand already uses, but with far more character than Roboto Condensed.
  - Body: **Source Sans 3** (OFL) — the renamed successor of Source Sans Pro, which is the brand's existing body font. Kept for continuity.
  - Technical labels: **JetBrains Mono** (OFL) — used for IEC codes, specs, coordinates, and diagram labels.
  - All three are licensed under the SIL Open Font License, which permits web use. No substitution of a licensed brand font was needed.

## Technical decisions

- **CMS fallback:** Sanity needs a project ID (free tier, but it requires the client's account → a credential/approval blocker under section 3). The site therefore reads from Sanity when `NEXT_PUBLIC_SANITY_PROJECT_ID` is set, and otherwise from a typed local seed (`site/src/content/seed.ts`) that mirrors the Sanity schema exactly. A seed export (`site/sanity/seed.ndjson`) lets the client import all content in one command. This keeps the site fully working today without inventing credentials.
- **Lenis (smooth scroll): not used.** The single-line concept relies on native scroll position; smooth-scroll hijacking adds latency and hurts accessibility for a B2B audience reading technical content. Recorded as a deliberate replacement of a default.
- **React Three Fiber: not used.** The concept does not need 3D; the brand already hosts a Sketchfab model of the PROTOS cabinet, which is linked from the product page instead.
- **Contact form delivery:** `/api/contact` validates with zod, applies a honeypot and a per-IP rate limit, and sends via Resend when `RESEND_API_KEY` is configured. Without a key, it returns a clear 503 and the UI offers the direct email and WhatsApp paths — it never pretends a message was sent.
- **Images:** originals live in `assets/raw`; the site serves processed copies from `site/public/media` through `next/image` (AVIF/WebP, responsive sizes, lazy below the fold).
- **Team section:** the current home page shows two conflicting team lists. I used the LATAM management list (it has titles that match the 2025 "ISOTEK ahora es ISOTEK LATAM" announcement and has email links). No photos exist for most of that list, so the team is presented typographically; flagged for client confirmation.
- **"15 años":** the home page says "15 años de trayectoria", but the company was founded in 2015. The FAQ clarifies the 15+ years refers to the *team's* experience. The new site says "desde 2015" for the company and "más de 15 años de experiencia del equipo" only where the FAQ supports it.
