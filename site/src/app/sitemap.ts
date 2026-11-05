import type { MetadataRoute } from 'next';
import { getPosts, getProducts, getProjects } from '@/content';
import { SITE_URL } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, products, posts] = await Promise.all([getProjects(), getProducts(), getPosts()]);
  const paths = [
    '', '/soluciones', '/proyectos', '/productos', '/marcas', '/empresa', '/novedades', '/contacto',
    ...projects.map((p) => `/proyectos/${p.slug}`),
    ...products.map((p) => `/productos/${p.slug}`),
    ...posts.map((p) => `/novedades/${p.slug}`),
  ];
  return paths.map((p) => ({
    url: `${SITE_URL}/es${p}`,
    changeFrequency: p === '' ? 'weekly' : 'monthly',
    priority: p === '' ? 1 : p.split('/').length > 2 ? 0.6 : 0.8,
    alternates: { languages: { es: `${SITE_URL}/es${p}`, en: `${SITE_URL}/en${p}` } },
  }));
}
