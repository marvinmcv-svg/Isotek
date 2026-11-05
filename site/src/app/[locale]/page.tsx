import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { HeroEnergize } from '@/components/home/HeroEnergize';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionNode } from '@/components/ui/SectionNode';
import { Counter } from '@/components/motion/Counter';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { CtaBand } from '@/components/sections/CtaBand';
import { getBrands, getIndustries, getProducts, getProjects, getServices, getSettings } from '@/content';
import { alternates, tr } from '@/lib/site';
import type { Locale } from '@/content/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  return { title: t('metaTitle'), description: t('metaDescription'), alternates: alternates(locale, '/'), openGraph: { title: t('metaTitle'), description: t('metaDescription') } };
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, s, services, projects, industries, brands, products] = await Promise.all([
    getTranslations('home'), getSettings(), getServices(), getProjects(), getIndustries(), getBrands(), getProducts(),
  ]);
  const featured = projects.filter((p) => p.featured).slice(0, 5);
  const hero = projects.find((p) => p.slug === 'centro-de-control-de-motores-inteligente')!.images[0];
  const productShots = ['porta-barras', 'barras-de-cobre', 'tableros-autoportantes', 'aisladores-electricos']
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean)
    .map((p) => ({ slug: p!.slug, title: tr(p!.title, locale), img: p!.images[0] }));

  return (
    <>
      <HeroEnergize
        eyebrow={t('eyebrow')} title1={t('title1')} title2={t('title2')} lead={t('lead')}
        feeders={t.raw('feeders') as string[]} ctaPrimary={t('ctaPrimary')} ctaProjects={t('ctaProjects')}
        image={hero} imageAlt={tr(hero.alt, locale)}
      />

      {/* Proof strip */}
      <section aria-labelledby="proof" className="border-b border-steel-150 bg-paper py-14 lg:py-20">
        <div className="container-x">
          <div className="relative">
            <SectionNode code="BUS-01" />
            <h2 id="proof" className="sr-only">{t('proofTitle')}</h2>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-5">
              <div data-reveal className="border-l border-signal pl-4">
                <dt className="mono text-steel-600">{(await getTranslations('common'))('since')}</dt>
                <dd className="display mt-2 text-3xl tabular">{s.founded}</dd>
              </div>
              {s.stats.map((st, i) => (
                <div key={i} data-reveal style={{ ['--d' as string]: `${(i + 1) * 70}ms` }} className="border-l border-steel-150 pl-4">
                  <dt className="mono text-steel-600">{tr(st.label, locale)}</dt>
                  <dd className="display mt-2 text-3xl"><Counter value={st.value} prefix={st.prefix} suffix={st.suffix} /></dd>
                </div>
              ))}
            </dl>
            <p className="mono mt-10 flex flex-wrap gap-x-6 gap-y-2 text-steel-600">
              <span className="text-signal-ink">ISO 9001:2015 · TÜV Rheinland</span><span>IEC 61439-1/5</span><span>IEC 62208</span><span>IEC 61537</span>
            </p>
          </div>
        </div>
      </section>

      {/* Services as feeders */}
      <section aria-labelledby="services" className="bg-paper py-24 lg:py-36">
        <div className="container-x">
          <div className="relative grid gap-10 lg:grid-cols-12">
            <SectionNode code="FDR" />
            <div className="lg:col-span-5">
              <Eyebrow>{t('servicesEyebrow')}</Eyebrow>
              <h2 id="services" data-reveal className="mt-6 text-3xl uppercase">{t('servicesTitle')}</h2>
            </div>
            <p data-reveal className="max-w-xl self-end text-lg text-steel-600 lg:col-span-6 lg:col-start-7">{t('servicesLead')}</p>
          </div>
          <ol className="mt-16 border-t border-ink">
            {services.map((sv, i) => (
              <li key={sv.slug} data-reveal style={{ ['--d' as string]: `${(i % 4) * 50}ms` }}>
                <Link href={`/soluciones#${sv.slug}`} className="group relative grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-x-4 border-b border-steel-150 py-6 transition-colors hover:border-signal lg:grid-cols-[6rem_minmax(0,5fr)_minmax(0,5fr)_auto] lg:py-8">
                  <span className="mono text-steel-600 transition-colors group-hover:text-signal-ink">{sv.code}</span>
                  <h3 className="display text-xl uppercase transition-[font-stretch] duration-300 group-hover:[font-stretch:85%] lg:text-2xl">{tr(sv.title, locale)}</h3>
                  <p className="col-start-2 mt-2 text-steel-600 lg:col-start-3 lg:mt-0">{tr(sv.summary, locale)}</p>
                  <svg aria-hidden viewBox="0 0 16 16" className="col-start-3 row-start-1 size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-signal lg:col-start-4" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M1 8h13M9 3l5 5-5 5" /></svg>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Featured projects */}
      <section aria-labelledby="projects" className="on-dark relative bg-ink py-24 text-white lg:py-36">
        <div className="container-x">
          <div className="relative flex flex-wrap items-end justify-between gap-8">
            <SectionNode code="FDR-PRJ" dark />
            <div>
              <Eyebrow dark>{t('projectsEyebrow')}</Eyebrow>
              <h2 id="projects" data-reveal className="mt-6 max-w-3xl text-3xl uppercase">{t('projectsTitle')}</h2>
            </div>
            <ButtonLink href="/proyectos" variant="ghost-dark">{(await getTranslations('common'))('viewAll')} ({projects.length})</ButtonLink>
          </div>
          <div className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-12">
            {featured.map((p, i) => (
              <div key={p.slug} className={i === 0 ? 'sm:col-span-2 lg:col-span-7' : i === 1 ? 'lg:col-span-5 lg:mt-24' : 'lg:col-span-4'}>
                <ProjectCard p={p} locale={locale} index={i} size={i === 0 ? 'lg' : 'md'} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Made in Bolivia */}
      <section aria-labelledby="factory" className="bg-white py-24 lg:py-36">
        <div className="container-x">
          <div className="relative grid gap-14 lg:grid-cols-12 lg:items-center">
            <SectionNode code="PROTOS" />
            <div className="lg:col-span-5">
              <Eyebrow>{t('factoryEyebrow')}</Eyebrow>
              <h2 id="factory" data-reveal className="mt-6 text-3xl uppercase">{t('factoryTitle')}</h2>
              <p data-reveal className="mt-8 text-lg text-steel-600">{t('factoryLead')}</p>
              <ul className="mono mt-8 space-y-2 text-steel-600">
                <li className="flex gap-3"><span className="text-signal-ink">—</span>ISO 9001:2015 · TÜV Rheinland ID 9000029079</li>
                <li className="flex gap-3"><span className="text-signal-ink">—</span>IEC 61439-1/5 · IEC 62208 · IEC 61537</li>
                <li className="flex gap-3"><span className="text-signal-ink">—</span>{locale === 'es' ? 'Líneas CNC y soldadura láser' : 'CNC lines and laser welding'}</li>
              </ul>
              <ButtonLink href="/productos" className="mt-10">{t('factoryCta')}</ButtonLink>
            </div>
            <ul className="grid grid-cols-2 gap-3 lg:col-span-6 lg:col-start-7">
              {productShots.map((p, i) => (
                <li key={p.slug} className={i % 2 === 1 ? 'translate-y-10' : ''}>
                  <Link href={`/productos/${p.slug}`} className="group block">
                    <div data-reveal-img style={{ ['--d' as string]: `${i * 90}ms` }} className="relative aspect-square overflow-hidden bg-paper">
                      <Image src={p.img.src} alt={tr(p.img.alt, locale)} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-105" />
                    </div>
                    <p className="mono mt-3 text-steel-600 group-hover:text-signal-ink">{p.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section aria-labelledby="industries" className="on-dark grid-lines relative bg-ink-2 py-24 text-white lg:py-32">
        <div className="container-x">
          <div className="relative">
            <SectionNode code="IND" dark />
            <Eyebrow dark>{t('industriesEyebrow')}</Eyebrow>
            <h2 id="industries" data-reveal className="mt-6 max-w-3xl text-3xl uppercase">{t('industriesTitle')}</h2>
          </div>
          <ol className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <li key={ind.slug} data-reveal style={{ ['--d' as string]: `${(i % 3) * 60}ms` }} className="flex items-baseline gap-4 border-b border-white/10 py-5">
                <span className="mono text-signal-bright">{String(i + 1).padStart(2, '0')}</span>
                <span className="display text-2xl uppercase">{tr(ind.name, locale)}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Calibration lab */}
      <section aria-labelledby="lab" className="bg-paper py-24 lg:py-36">
        <div className="container-x">
          <div className="relative grid gap-12 lg:grid-cols-12 lg:items-center">
            <SectionNode code="LAB" />
            <div data-reveal-img className="relative aspect-[4/5] overflow-hidden bg-ink lg:col-span-5">
              <Image src={services.find((x) => x.slug === 'instrumentacion')!.image!.src} alt={tr(services.find((x) => x.slug === 'instrumentacion')!.image!.alt, locale)} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <Eyebrow code="E+H">{t('labEyebrow')}</Eyebrow>
              <h2 id="lab" data-reveal className="mt-6 text-3xl uppercase">{t('labTitle')}</h2>
              <p data-reveal className="mt-8 text-lg text-steel-600">{tr(services.find((x) => x.slug === 'instrumentacion')!.summary, locale)}</p>
              <ButtonLink href={{ pathname: '/contacto', query: { tema: 'calibration' } }} className="mt-10">{t('labCta')}</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section aria-labelledby="brands" className="border-t border-steel-150 bg-paper py-24 lg:py-32">
        <div className="container-x">
          <div className="relative flex flex-wrap items-end justify-between gap-8">
            <SectionNode code="BRD" />
            <div>
              <Eyebrow>{t('brandsEyebrow')}</Eyebrow>
              <h2 id="brands" data-reveal className="mt-6 max-w-3xl text-3xl uppercase">{t('brandsTitle')}</h2>
            </div>
            <ButtonLink href="/marcas" variant="ghost-light">{(await getTranslations('nav'))('brands')}</ButtonLink>
          </div>
          <ul className="mt-14 grid grid-cols-2 border-l border-t border-steel-150 sm:grid-cols-3 lg:grid-cols-5">
            {brands.slice(0, 15).map((b) => (
              <li key={b.name} className="group flex min-h-28 flex-col justify-between border-b border-r border-steel-150 p-4 transition-colors hover:bg-white">
                <span className="display text-lg uppercase leading-tight lg:text-xl">{b.name}</span>
                <span className="mono mt-3 text-[0.625rem] text-steel-600">{tr(b.category, locale)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Offices */}
      <section aria-labelledby="offices" className="on-dark bg-ink py-24 text-white lg:py-32">
        <div className="container-x">
          <div className="relative grid gap-12 lg:grid-cols-12">
            <SectionNode code="NET" dark />
            <div className="lg:col-span-5">
              <Eyebrow dark>{t('officesEyebrow')}</Eyebrow>
              <h2 id="offices" data-reveal className="mt-6 text-3xl uppercase">{t('officesTitle')}</h2>
            </div>
            <ul className="lg:col-span-6 lg:col-start-7">
              {s.offices.map((o, i) => (
                <li key={o.city} data-reveal style={{ ['--d' as string]: `${i * 50}ms` }} className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-white/10 py-4 first:border-t">
                  <span><span className="display text-2xl uppercase">{o.city}</span> <span className="text-steel-400">· {o.country}</span></span>
                  <span className={`mono ${i === 0 ? 'text-signal-bright' : 'text-steel-400'}`}>{tr(o.role, locale)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
