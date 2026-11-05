import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageHeader } from '@/components/sections/PageHeader';
import { CtaBand } from '@/components/sections/CtaBand';
import { ButtonA } from '@/components/ui/Button';
import { SectionNode } from '@/components/ui/SectionNode';
import { getProducts, getSettings } from '@/content';
import { alternates, tr } from '@/lib/site';
import type { Locale } from '@/content/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });
  return { title: t('metaTitle'), description: t('metaDescription'), alternates: alternates(locale, '/productos'), openGraph: { title: t('metaTitle'), description: t('metaDescription'), images: ['/media/products/porta-barras-1.jpg'] } };
}

export default async function Products({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, c, products, s] = await Promise.all([getTranslations('products'), getTranslations('common'), getProducts(), getSettings()]);
  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} />
      <section className="bg-paper py-16 lg:py-24">
        <div className="container-x">
          <div className="relative"><SectionNode code="PROTOS" /></div>
          <ul className="grid gap-px border border-steel-150 bg-steel-150 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <li key={p.slug} className="bg-white">
                <Link href={`/productos/${p.slug}`} className="group flex h-full flex-col p-5" data-reveal style={{ ['--d' as string]: `${(i % 3) * 70}ms` }}>
                  <div className="relative aspect-square overflow-hidden bg-white">
                    {p.images[0] && <Image src={p.images[0].src} alt={tr(p.images[0].alt, locale)} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-contain transition-transform duration-700 ease-out group-hover:scale-105" />}
                  </div>
                  <div className="mt-5 flex items-end justify-between gap-4 border-t border-steel-150 pt-4">
                    <div>
                      <p className="mono text-steel-600 group-hover:text-signal-ink">{t('line')} {p.line}{p.standards?.length ? ` · ${p.standards[0]}` : ''}</p>
                      <h2 className="display mt-2 text-2xl uppercase leading-none">{tr(p.title, locale)}</h2>
                    </div>
                    <span className="sr-only">{c('viewProduct')}</span>
                    <svg aria-hidden viewBox="0 0 16 16" className="size-5 shrink-0 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M1 8h13M9 3l5 5-5 5" /></svg>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="on-dark mt-16 grid gap-8 bg-ink p-8 text-white lg:grid-cols-12 lg:items-center lg:p-12">
            <div className="lg:col-span-8">
              <h2 className="display text-2xl uppercase">{t('storeTitle')}</h2>
              <p className="mt-3 text-steel-300">{t('storeLead')}</p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <ButtonA href={s.storeUrl} target="_blank" rel="noopener noreferrer">{t('storeCta')} <span className="sr-only">{c('external')}</span></ButtonA>
            </div>
          </div>
        </div>
      </section>
      <CtaBand topic="product" />
    </>
  );
}
