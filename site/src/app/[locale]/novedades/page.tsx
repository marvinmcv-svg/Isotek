import type { Metadata } from 'next';
import Image from 'next/image';
import { getFormatter, getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageHeader } from '@/components/sections/PageHeader';
import { getPosts } from '@/content';
import { alternates, tr } from '@/lib/site';
import type { Locale } from '@/content/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'news' });
  return { title: t('metaTitle'), description: t('metaDescription'), alternates: alternates(locale, '/novedades'), openGraph: { title: t('metaTitle'), description: t('metaDescription') } };
}

export default async function News({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, f, posts] = await Promise.all([getTranslations('news'), getFormatter(), getPosts()]);
  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} />
      <section className="bg-paper py-16 lg:py-24">
        <div className="container-x">
          <ul className="border-t border-ink">
            {posts.map((p, i) => (
              <li key={p.slug} data-reveal style={{ ['--d' as string]: `${(i % 3) * 50}ms` }}>
                <Link href={`/novedades/${p.slug}`} className="group grid grid-cols-[6rem_1fr] gap-4 border-b border-steel-150 py-6 sm:grid-cols-[8rem_10rem_1fr_auto] sm:items-center sm:gap-8">
                  <div className="relative aspect-square overflow-hidden bg-ink sm:order-2">
                    {p.images[0] && <Image src={p.images[0].src} alt={tr(p.images[0].alt, locale)} fill sizes="10rem" className="object-cover transition-transform duration-500 group-hover:scale-105" />}
                  </div>
                  <time dateTime={p.date} className="mono text-steel-600 sm:order-1">{p.date ? f.dateTime(new Date(p.date), { year: 'numeric', month: 'short', day: 'numeric' }) : ''}</time>
                  <h2 className="display col-span-2 text-xl uppercase leading-tight transition-colors group-hover:text-signal-ink sm:order-3 sm:col-span-1 lg:text-2xl">{tr(p.title, locale)}</h2>
                  <svg aria-hidden viewBox="0 0 16 16" className="hidden size-5 transition-transform group-hover:translate-x-1 sm:order-4 sm:block" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M1 8h13M9 3l5 5-5 5" /></svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
