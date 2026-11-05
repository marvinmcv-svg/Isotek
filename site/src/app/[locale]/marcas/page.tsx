import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/sections/PageHeader';
import { CtaBand } from '@/components/sections/CtaBand';
import { getBrands } from '@/content';
import { alternates, tr } from '@/lib/site';
import type { Locale } from '@/content/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'brands' });
  return { title: t('metaTitle'), description: t('metaDescription'), alternates: alternates(locale, '/marcas'), openGraph: { title: t('metaTitle'), description: t('metaDescription') } };
}

export default async function Brands({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, c, brands] = await Promise.all([getTranslations('brands'), getTranslations('common'), getBrands()]);
  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} />
      <section className="bg-paper py-16 lg:py-24">
        <div className="container-x">
          <ul className="border-t border-ink">
            {brands.map((b, i) => (
              <li key={b.name} data-reveal style={{ ['--d' as string]: `${(i % 5) * 40}ms` }} className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-1 border-b border-steel-150 py-5 sm:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1fr)_auto]">
                <span className="mono text-steel-600">{String(i + 1).padStart(2, '0')}</span>
                <span className="display text-2xl uppercase lg:text-3xl">{b.name}</span>
                <span className="col-start-2 text-steel-600 sm:col-start-3">{tr(b.category, locale)}</span>
                {b.url ? (
                  <a href={b.url} target="_blank" rel="noopener noreferrer" className="mono link-draw col-start-2 text-steel-600 hover:text-ink sm:col-start-4">{t('visit')} ↗<span className="sr-only"> {b.name} {c('external')}</span></a>
                ) : <span className="hidden sm:block" />}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
