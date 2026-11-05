// Exports the local seed as Sanity NDJSON (with image assets) for:
//   npx sanity dataset import sanity/seed.ndjson production
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import * as seed from '../src/content/seed';
import type { Img } from '../src/content/types';

const pub = resolve(process.cwd(), 'public');
let k = 0;
const key = () => `k${(k++).toString(36)}`;
const asset = (i: Img) => ({ _type: 'image', _key: key(), _sanityAsset: `image@file://${pub}${i.src}`, alt: i.alt });
const one = (i?: Img) => (i ? { ...asset(i), _key: undefined } : undefined);
const ref = (id: string) => ({ _type: 'reference', _ref: id, _key: key() });
const slug = (s: string) => ({ _type: 'slug', current: s });

const docs: Record<string, unknown>[] = [
  { _id: 'siteSettings', _type: 'siteSettings', ...seed.settings, socials: seed.settings.socials.map((s) => ({ ...s, _key: key() })), offices: seed.settings.offices.map((o) => ({ ...o, _key: key() })), stats: seed.settings.stats.map((s) => ({ ...s, _key: key() })) },
  ...seed.services.map((s, i) => ({ _id: `service-${s.slug}`, _type: 'service', order: i, slug: slug(s.slug), code: s.code, title: s.title, summary: s.summary, scope: s.scope, image: one(s.image) })),
  ...seed.industries.map((s, i) => ({ _id: `industry-${s.slug}`, _type: 'industry', order: i, slug: slug(s.slug), name: s.name })),
  ...seed.projects.map((p, i) => ({
    _id: `project-${p.slug}`, _type: 'project', order: i, slug: slug(p.slug), client: p.client, country: p.country, place: p.place,
    industry: p.industry ? { _type: 'reference', _ref: `industry-${p.industry}` } : undefined,
    services: p.services.map((s) => ref(`service-${s}`)), title: p.title, about: p.about, scope: p.scope, images: p.images.map(asset), featured: !!p.featured,
  })),
  ...seed.products.map((p, i) => ({ _id: `product-${p.slug}`, _type: 'product', order: i, slug: slug(p.slug), line: p.line, title: p.title, summary: p.summary, features: p.features, specs: p.specs?.map((s) => ({ ...s, _key: key() })), standards: p.standards, images: p.images.map(asset), model3d: p.model3d })),
  ...seed.brands.map((b, i) => ({ _id: `brand-${i}`, _type: 'brand', order: i, ...b })),
  ...seed.team.map((m, i) => ({ _id: `team-${i}`, _type: 'teamMember', order: i, ...m })),
  ...seed.posts.map((p) => ({ _id: `post-${p.slug}`, _type: 'post', slug: slug(p.slug), date: p.date, title: p.title, body: p.body, images: p.images.map(asset), videoUrl: p.videoUrl })),
  ...seed.faqs.map((f, i) => ({ _id: `faq-${i}`, _type: 'faq', order: i, ...f })),
  ...seed.certifications.map((c, i) => ({ _id: `cert-${i}`, _type: 'certification', order: i, name: c.name, issuer: c.issuer, reference: c.reference, description: c.description, image: one(c.image) })),
];

const out = resolve(process.cwd(), 'sanity/seed.ndjson');
writeFileSync(out, docs.map((d) => JSON.stringify(d, (_k, v) => (v === undefined ? undefined : v))).join('\n') + '\n');
console.log(`Wrote ${docs.length} documents to ${out}`);
