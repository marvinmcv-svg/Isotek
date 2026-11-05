import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { projects, posts, products } from './src/content/seed';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// 301s from the old WordPress URLs (indexed via Yoast sitemaps) to the new routes.
const legacy: [string, string][] = [
  ['/soluciones-y-servicios', '/es/soluciones'],
  ['/nuestros-proyectos', '/es/proyectos'],
  ['/category/proyectos', '/es/proyectos'],
  ['/productos', '/es/productos'],
  ['/categoria-de-productos/productos-protos', '/es/productos'],
  ['/nuestras-marcas', '/es/marcas'],
  ['/quienes-somos', '/es/empresa'],
  ['/certificaciones', '/es/empresa#certificaciones'],
  ['/novedades', '/es/novedades'],
  ['/category/novedades', '/es/novedades'],
  ['/consultas', '/es/contacto'],
  ...projects.map((p): [string, string] => [`/${p.slug}`, `/es/proyectos/${p.slug}`]),
  ...posts.map((p): [string, string] => [`/${p.slug}`, `/es/novedades/${p.slug}`]),
  ...products.map((p): [string, string] => [`/producto/${p.slug}`, `/es/productos/${p.slug}`]),
];

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [50, 75],
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
  async redirects() {
    return legacy.flatMap(([from, to]) => [
      { source: from, destination: to, permanent: true },
      { source: `${from}/`, destination: to, permanent: true },
    ]);
  },
  async headers() {
    return [
      {
        source: '/((?!studio).*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
