# ISOTEK LATAM — website

New website for ISOTEK LATAM (isoteklatam.com), built from a full audit of the current site. Concept: **"Diagrama Unifilar"**, where the site is drawn like a single-line electrical diagram.

```
research/            Phase 1–5 documents (brand profile, identity, social, competitors, audit, creative direction, build plan)
research/evidence/   Crawl text, URL list and screenshots of the current site
assets/raw/          Original media downloaded from isoteklatam.com
assets/processed/    Web-ready copies used by the site
assets/manifest.json Every media file with source URL, quality and rights flag
scripts/             process_media.py (raw → processed + manifest)
site/                Next.js application
DECISIONS.md  MISSING_CONTENT.md  ASSET_RIGHTS_REVIEW.md  HANDOFF.md  ADMIN_GUIDE.md
```

## Stack

Next.js 16 (App Router, TypeScript) · React 19 · Tailwind CSS 4 · next-intl 4 (ES/EN) · Motion (projects filter) · GSAP ScrollTrigger (page busbar, desktop only) · Sanity 6 (admin, embedded at `/studio`) · zod (form validation). Fonts: Archivo, Source Sans 3 and JetBrains Mono (OFL), self-hosted via `next/font`.

## Run locally

Requires Node 20.9+ (tested on Node 22).

```bash
cd site
```

```bash
npm install
```

```bash
cp .env.example .env.local
```

```bash
npm run dev
```

Open http://localhost:3000 (redirects to `/es`). Production build:

```bash
npm run build && npm start
```

The site works with **no environment variables**: content comes from `site/src/content/seed.ts`, and the contact form reports that delivery is not configured and offers email/WhatsApp.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes, in production | Canonical URLs, sitemap, hreflang, Open Graph (e.g. `https://isoteklatam.com`) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | to enable the admin | Sanity project ID. When set, the site reads content from Sanity. |
| `NEXT_PUBLIC_SANITY_DATASET` | with Sanity | Usually `production` |
| `SANITY_REVALIDATE_SECRET` | with Sanity | Shared secret for the publish webhook |
| `RESEND_API_KEY` | to deliver the form | API key from resend.com |
| `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` | optional | Default `info@isoteklatam.com` / `web@isoteklatam.com` (the sending domain must be verified in Resend) |
| `NEXT_PUBLIC_GA_ID` | optional | GA4 measurement ID (`G-…`). Fires `generate_lead` on successful form submissions. |

Never commit `.env.local`. Only `NEXT_PUBLIC_*` values reach the browser.

## Setting up the admin portal (Sanity)

1. Create a free project at sanity.io/manage, with dataset `production`.
2. Under the project's **API → CORS origins**, add `http://localhost:3000` and the production URL, with "Allow credentials" ticked.
3. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in `.env.local` (and in Vercel).
4. Import all current content and images (run from `site/`):

```bash
npm run seed:export
```

```bash
npx sanity dataset import sanity/seed.ndjson production
```

   (`sanity/seed.ndjson` is generated with absolute file paths to `public/media`, so it is not committed.)
5. Create a webhook under **API → Webhooks**: URL `https://<domain>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>`, trigger on create/update/delete, method POST. Published edits then appear within seconds; otherwise within an hour.
6. Open `/studio` and log in with the Sanity account. Invite editors from sanity.io/manage → Members.

## Deployment (Vercel)

1. Import the repository in Vercel and set **Root Directory** to `site`.
2. Add the environment variables above (Production and Preview).
3. Deploy. All pages are statically generated; `/api/contact` and `/api/revalidate` run as functions.
4. **Only after approval:** add `isoteklatam.com` as the domain. Old WordPress URLs (`/quienes-somos/`, `/producto/…`, each case-study and news slug) already permanently redirect to the new routes (`next.config.ts`).

## Editing content without the CMS

Before Sanity is connected, edit `site/src/content/seed.ts` (content) and `site/messages/{es,en}.json` (interface text). New images go in `site/public/media/…`; then regenerate the size index:

```bash
python3 -I -c "import os,json;from PIL import Image;r='site/public/media';json.dump({'/'+os.path.relpath(os.path.join(d,f),'site/public'):list(Image.open(os.path.join(d,f)).size) for d,_,fs in os.walk(r) for f in fs},open('site/src/content/media-dims.json','w'))"
```

## Quality checks

```bash
cd site && npm run lint && npm run build
```

`npm run lint` runs the TypeScript compiler (`tsc --noEmit`). QA results are summarised in `HANDOFF.md`.
