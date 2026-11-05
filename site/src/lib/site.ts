import type { I18n, Locale } from '@/content/types';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

export const tr = (v: I18n | undefined, l: Locale) => (v ? v[l] || v.es : '');

export const waLink = (number: string, text?: string) =>
  `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

/** Canonical + hreflang alternates for a locale-less path like "/proyectos". */
export function alternates(locale: Locale, path: string) {
  const p = path === '/' ? '' : path;
  return {
    canonical: `${SITE_URL}/${locale}${p}`,
    languages: { es: `${SITE_URL}/es${p}`, en: `${SITE_URL}/en${p}`, 'x-default': `${SITE_URL}/es${p}` },
  };
}

export const countryName: Record<string, I18n> = {
  BO: { es: 'Bolivia', en: 'Bolivia' },
  PY: { es: 'Paraguay', en: 'Paraguay' },
};
