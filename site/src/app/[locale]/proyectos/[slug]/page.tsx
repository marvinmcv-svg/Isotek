import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionNode } from '@/components/ui/SectionNode';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { CtaBand } from '@/components/sections/CtaBand';
import { JsonLd } from '@/components/seo/JsonLd';
import { getIndustries, getProject, getProjects, getServices } from '@/content';
import { alternates, SITE_URL, tr } from '@/lib/site';
import type { Locale } from '@/content/types';

type P = { params: Promise<{ locale: Locale; slug: string }> };

export async function generateStaticParams() {
  const projects = await getProjects();
  return routing.locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = await getProject(slug);
  if (!p) return {};
  const title = `${tr(p.title, locale)} — ${p.client} | ISOTEK LATAM`;
  const description = `${tr(p.scope, locale)} ${p.client}, ${tr(p.place, locale)}.`.slice(0, 160);
  return { title, description, alternates: alternates(locale, `/proyectos/${slug}`), openGraph: { title, description, images: p.images[0] ? [p.images[0].src] : [] } };
}

export default async function ProjectPage({ params }: P) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const p = await getProject(slug);
  if (!p) notFound();
  const [t, tp, all, industries, services] = await Promise.all([getTranslations('common'), getTranslations('projects'), getProjects(), getIndustries(), getServices()]);
  const idx = all.findIndex((x) => x.slug === slug);
  const more = [1, 2, 3].map((k) => all[(idx + k) % all.length]);
  const industry = industries.find((i) => i.slug === p.industry);
  const svc = services.filter((s) => p.services.includes(s.slug));
  const [hero, ...rest] = p.images;

  const crumbs = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ISOTEK LATAM', item: `${SITE_URL}/${locale}` },
    { '@type': 'ListItem', position: 2, name: tp('eyebrow'), item: `${SITE_URL}/${locale}/proyectos` },
    { '@type': 'ListItem', position: 3, name: tr(p.title, locale) },
  ] };

  return (
    <>
      <section className="on-dark bg-ink pb-12 pt-28 text-white lg:pt-36">
        <div className="container-x">
          <div className="relative">
            <SectionNode code={p.country} dark />
            <Link href="/proyectos" className="mono link-draw text-steel-400 hover:text-white">← {tp('eyebrow')}</Link>
            <p className="mono mt-8 text-signal-bright">{p.client}</p>
            <h1 className="mt-4 max-w-5xl text-4xl uppercase">{tr(p.title, locale)}</h1>
          </div>
          <dl className="mt-12 grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
            {[
              [t('client'), p.client],
              [t('location'), tr(p.place, locale)],
              [t('industry'), industry ? tr(industry.name, locale) : '—'],
              [t('service'), svc.map((s) => tr(s.title, locale)).join(' · ') || '—'],
            ].map(([k, v]) => (
              <div key={k} className="bg-ink py-5 pr-4">
                <dt className="mono text-steel-400">{k}</dt>
                <dd className="mt-2 font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {hero && (
        <div className="bg-ink">
          <div className="container-x">
            <div data-reveal-img className="relative aspect-[16/10] overflow-hidden lg:aspect-[16/8]">
              <Image src={hero.src} alt={tr(hero.alt, locale)} fill priority sizes="(min-width: 1440px) 1330px, 100vw" className="object-cover" />
            </div>
          </div>
        </div>
      )}

      <section className="bg-paper py-20 lg:py-28">
        <div className="container-x">
          <div className="relative grid gap-12 lg:grid-cols-12">
            <SectionNode code="SCOPE" />
            {p.about && (
              <div className="lg:col-span-5">
                <Eyebrow>{t('about')}</Eyebrow>
                <p data-reveal className="mt-6 text-lg text-steel-600">{tr(p.about, locale)}</p>
              </div>
            )}
            <div className={p.about ? 'lg:col-span-6 lg:col-start-7' : 'lg:col-span-8'}>
              <Eyebrow>{t('scope')}</Eyebrow>
              <p data-reveal className="display mt-6 text-2xl uppercase leading-tight">{tr(p.scope, locale)}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {svc.map((s) => (
                  <Link key={s.slug} href={`/soluciones#${s.slug}`} className="mono border border-steel-150 px-3 py-2 text-steel-600 hover:border-ink hover:text-ink">{s.code} · {tr(s.title, locale)}</Link>
                ))}
              </div>
            </div>
          </div>
          {rest.length > 0 && (
            <ul className="mt-16 grid gap-4 sm:grid-cols-2">
              {rest.map((im, i) => (
                <li key={im.src} data-reveal-img style={{ ['--d' as string]: `${i * 100}ms` }} className="relative aspect-[4/3] overflow-hidden bg-ink">
                  <Image src={im.src} alt={tr(im.alt, locale)} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="border-t border-steel-150 bg-paper py-20">
        <div className="container-x">
          <h2 className="display text-2xl uppercase">{tp('more')}</h2>
          <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((m, i) => <li key={m.slug}><ProjectCard p={m} locale={locale} index={i} /></li>)}
          </ul>
        </div>
      </section>
      <CtaBand topic={p.services[0]} />
      <JsonLd data={crumbs} />
    </>
  );
}
