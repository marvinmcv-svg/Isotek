import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getFormatter, getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { JsonLd } from '@/components/seo/JsonLd';
import { getPost, getPosts } from '@/content';
import { alternates, SITE_URL, tr } from '@/lib/site';
import type { Locale } from '@/content/types';

type P = { params: Promise<{ locale: Locale; slug: string }> };

export async function generateStaticParams() {
  const posts = await getPosts();
  return routing.locales.flatMap((locale) => posts.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = await getPost(slug);
  if (!p) return {};
  const title = `${tr(p.title, locale)} | ISOTEK LATAM`;
  const description = p.body[locale][0]?.slice(0, 160);
  return { title, description, alternates: alternates(locale, `/novedades/${slug}`), openGraph: { type: 'article', title, description, publishedTime: p.date, images: p.images[0] ? [p.images[0].src] : [] } };
}

export default async function PostPage({ params }: P) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const p = await getPost(slug);
  if (!p) notFound();
  const [t, c, f, posts] = await Promise.all([getTranslations('news'), getTranslations('common'), getFormatter(), getPosts()]);
  const others = posts.filter((x) => x.slug !== slug).slice(0, 4);
  const ld = { '@context': 'https://schema.org', '@type': 'NewsArticle', headline: tr(p.title, locale), datePublished: p.date, image: p.images.map((i) => `${SITE_URL}${i.src}`), publisher: { '@id': `${SITE_URL}/#org` }, inLanguage: locale };
  return (
    <>
      <article className="bg-paper pb-20 pt-28 lg:pt-36">
        <div className="container-x">
          <Link href="/novedades" className="mono link-draw text-steel-600 hover:text-ink">← {t('eyebrow')}</Link>
          <header className="mt-8 max-w-4xl">
            {p.date && <time dateTime={p.date} className="mono text-signal-ink">{f.dateTime(new Date(p.date), { dateStyle: 'long' })}</time>}
            <h1 className="mt-4 text-3xl uppercase">{tr(p.title, locale)}</h1>
          </header>
          <div className="mt-12 grid gap-12 lg:grid-cols-12">
            <div className="space-y-6 text-lg lg:col-span-7">
              {p.body[locale].map((para, i) => <p key={i}>{para}</p>)}
              {p.videoUrl && <p><a href={p.videoUrl} target="_blank" rel="noopener noreferrer" className="link-draw font-semibold text-signal-ink">{c('video')} ↗<span className="sr-only"> {c('external')}</span></a></p>}
            </div>
            <div className="grid gap-4 lg:col-span-5">
              {p.images.map((im, i) => (
                <div key={im.src} className="relative overflow-hidden bg-ink" style={{ aspectRatio: `${im.width} / ${im.height}` }}>
                  <Image src={im.src} alt={tr(im.alt, locale)} fill priority={i === 0} sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
      <section className="border-t border-steel-150 bg-paper py-16">
        <div className="container-x">
          <h2 className="display text-2xl uppercase">{t('more')}</h2>
          <ul className="mt-6">
            {others.map((o) => (
              <li key={o.slug} className="border-b border-steel-150"><Link href={`/novedades/${o.slug}`} className="link-draw block py-4 font-semibold">{tr(o.title, locale)}</Link></li>
            ))}
          </ul>
        </div>
      </section>
      <JsonLd data={ld} />
    </>
  );
}
