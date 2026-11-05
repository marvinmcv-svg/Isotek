import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { ButtonA, ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionNode } from '@/components/ui/SectionNode';
import { JsonLd } from '@/components/seo/JsonLd';
import { getProduct, getProducts, getSettings } from '@/content';
import { alternates, SITE_URL, tr } from '@/lib/site';
import type { Locale } from '@/content/types';

type P = { params: Promise<{ locale: Locale; slug: string }> };

export async function generateStaticParams() {
  const products = await getProducts();
  return routing.locales.flatMap((locale) => products.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = await getProduct(slug);
  if (!p) return {};
  const title = `${tr(p.title, locale)} ${p.line} | ISOTEK LATAM`;
  const description = tr(p.summary, locale).slice(0, 160);
  return { title, description, alternates: alternates(locale, `/productos/${slug}`), openGraph: { title, description, images: p.images[0] ? [p.images[0].src] : [] } };
}

export default async function ProductPage({ params }: P) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const p = await getProduct(slug);
  if (!p) notFound();
  const [t, tp, s] = await Promise.all([getTranslations('common'), getTranslations('products'), getSettings()]);
  const [main, ...gallery] = p.images;
  const ld = {
    '@context': 'https://schema.org', '@type': 'Product', name: tr(p.title, locale), description: tr(p.summary, locale),
    brand: { '@type': 'Brand', name: p.line }, manufacturer: { '@id': `${SITE_URL}/#org` },
    image: p.images.slice(0, 3).map((i) => `${SITE_URL}${i.src}`), url: `${SITE_URL}/${locale}/productos/${p.slug}`,
  };
  return (
    <>
      <section className="bg-paper pb-16 pt-28 lg:pb-24 lg:pt-36">
        <div className="container-x">
          <Link href="/productos" className="mono link-draw text-steel-600 hover:text-ink">← {tp('eyebrow')}</Link>
          <div className="relative mt-8 grid gap-12 lg:grid-cols-12 lg:items-start">
            <SectionNode code={p.line} />
            <div className="relative aspect-square overflow-hidden bg-white lg:col-span-7">
              {main && <Image src={main.src} alt={tr(main.alt, locale)} fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-contain p-6" />}
            </div>
            <div className="lg:col-span-5">
              <Eyebrow code={p.line}>{tp('eyebrow')}</Eyebrow>
              <h1 className="mt-5 text-3xl uppercase">{tr(p.title, locale)}</h1>
              <p className="mt-6 text-lg text-steel-600">{tr(p.summary, locale)}</p>
              {p.standards && (
                <p className="mono mt-6 flex flex-wrap gap-2">
                  {p.standards.map((x) => <span key={x} className="border border-signal-ink px-2 py-1 text-signal-ink">{x}</span>)}
                </p>
              )}
              {p.features && (
                <>
                  <h2 className="mono mt-10 text-steel-600">{t('features')}</h2>
                  <ul className="mt-3 border-t border-steel-150">
                    {p.features[locale].map((f, i) => <li key={i} className="border-b border-steel-150 py-3">{f}</li>)}
                  </ul>
                </>
              )}
              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href={{ pathname: '/contacto', query: { tema: 'product', producto: p.slug } }}>{t('quote')}</ButtonLink>
                <ButtonA href={s.storeUrl} target="_blank" rel="noopener noreferrer" variant="ghost-light">{t('store')}<span className="sr-only"> {t('external')}</span></ButtonA>
              </div>
              {p.model3d && (
                <a href={p.model3d} target="_blank" rel="noopener noreferrer" className="mono link-draw mt-6 inline-block text-steel-600 hover:text-ink">{t('model3d')} ↗<span className="sr-only"> {t('external')}</span></a>
              )}
            </div>
          </div>
        </div>
      </section>

      {p.specs && (
        <section className="on-dark bg-ink py-20 text-white lg:py-28">
          <div className="container-x">
            <h2 className="display text-2xl uppercase">{t('models')}</h2>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[32rem] text-left">
                <tbody>
                  {p.specs.map((sp) => (
                    <tr key={sp.model} className="border-b border-white/10 align-top">
                      <th scope="row" className="mono w-2/5 py-4 pr-6 font-medium text-signal-bright">{sp.model}</th>
                      <td className="py-4 text-steel-300">{tr(sp.description, locale)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {gallery.length > 0 && (
        <section className="bg-paper py-20">
          <div className="container-x">
            <h2 className="display text-2xl uppercase">{t('gallery')}</h2>
            <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {gallery.map((im, i) => (
                <li key={im.src} data-reveal style={{ ['--d' as string]: `${(i % 4) * 60}ms` }} className="relative aspect-square overflow-hidden bg-white">
                  <Image src={im.src} alt={tr(im.alt, locale)} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-contain p-3" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <JsonLd data={ld} />
    </>
  );
}
