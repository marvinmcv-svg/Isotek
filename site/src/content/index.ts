// Content access layer. Reads from Sanity when NEXT_PUBLIC_SANITY_PROJECT_ID is set,
// otherwise from the typed local seed. Pages only import from here.
import 'server-only';
import { createClient } from 'next-sanity';
import * as seed from './seed';
import type { Brand, Certification, Faq, Industry, Post, Product, Project, Service, SiteSettings, TeamMember } from './types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const client = projectId
  ? createClient({ projectId, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production', apiVersion: '2025-01-01', useCdn: true })
  : null;

// Images are projected to the same { src, alt, width, height } shape as the seed.
const IMG = `{ "src": asset->url, alt, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height }`;

async function q<T>(groq: string, fallback: T, params: Record<string, string> = {}): Promise<T> {
  if (!client) return fallback;
  try {
    const data = await client.fetch<T>(groq, params, { next: { revalidate: 3600, tags: ['sanity'] } });
    return (data ?? fallback) as T;
  } catch (err) {
    console.error('[content] Sanity fetch failed, using seed', err);
    return fallback;
  }
}

export const getSettings = () => q<SiteSettings>(`*[_type=="siteSettings"][0]`, seed.settings);
export const getServices = () => q<Service[]>(`*[_type=="service"]|order(order asc){..., "slug": slug.current, image${IMG}}`, seed.services);
export const getIndustries = () => q<Industry[]>(`*[_type=="industry"]|order(order asc){..., "slug": slug.current}`, seed.industries);
export const getProjects = () =>
  q<Project[]>(`*[_type=="project"]|order(order asc){..., "slug": slug.current, "industry": industry->slug.current, "services": services[]->slug.current, images[]${IMG}}`, seed.projects);
export const getProducts = () => q<Product[]>(`*[_type=="product"]|order(order asc){..., "slug": slug.current, images[]${IMG}}`, seed.products);
export const getBrands = () => q<Brand[]>(`*[_type=="brand"]|order(order asc)`, seed.brands);
export const getTeam = () => q<TeamMember[]>(`*[_type=="teamMember"]|order(order asc)`, seed.team);
export const getPosts = () => q<Post[]>(`*[_type=="post"]|order(date desc){..., "slug": slug.current, images[]${IMG}}`, seed.posts);
export const getFaqs = () => q<Faq[]>(`*[_type=="faq"]|order(order asc)`, seed.faqs);
export const getCertifications = () => q<Certification[]>(`*[_type=="certification"]|order(order asc){..., image${IMG}}`, seed.certifications);

export async function getProject(slug: string) {
  return (await getProjects()).find((p) => p.slug === slug);
}
export async function getProduct(slug: string) {
  return (await getProducts()).find((p) => p.slug === slug);
}
export async function getPost(slug: string) {
  return (await getPosts()).find((p) => p.slug === slug);
}
