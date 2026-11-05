import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/sections/PageHeader';
import { CtaBand } from '@/components/sections/CtaBand';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionNode } from '@/components/ui/SectionNode';
import { JsonLd } from '@/components/seo/JsonLd';
import { getFaqs, getServices, getSettings } from '@/content';
import { alternates, SITE_URL, tr } from '@/lib/site';
import type { Locale } from '@/content/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'solutions' });
  return { title: t('metaTitle'), description: t('metaDescription'), alternates: alternates(locale, '/soluciones'), openGraph: { title: t('metaTitle'), description: t('metaDescription'), images: ['/media/projects/cbn-busbar-1.jpg'] } };
}

export default async function Solutions({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, services, faqs, s] = await Promise.all([getTranslations('solutions'), getServices(), getFaqs(), getSettings()]);
  const ccm = services.find((x) => x.slug === 'ccm')!;

  const ld = [
    ...services.map((sv) => ({
      '@context': 'https://schema.org', '@type': 'Service', name: tr(sv.title, locale), description: tr(sv.summary, locale),
      provider: { '@id': `${SITE_URL}/#org` }, areaServed: ['BO', 'PY', 'PE', 'AR'], url: `${SITE_URL}/${locale}/soluciones#${sv.slug}`,
    })),
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: tr(f.question, locale), acceptedAnswer: { '@type': 'Answer', text: tr(f.answer, locale) } })) },
  ];

  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} image={services[0].image} />

      {/* Index of feeders */}
      <nav aria-label={t('eyebrow')} className="sticky top-16 z-30 border-b border-steel-150 bg-paper/95 backdrop-blur lg:top-20">
        <ul className="container-x flex gap-1 overflow-x-auto py-3 [scrollbar-width:none]">
          {services.map((sv) => (
            <li key={sv.slug} className="shrink-0">
              <a href={`#${sv.slug}`} className="mono block px-3 py-2 text-steel-600 transition-colors hover:text-signal-ink">{sv.code} · {tr(sv.title, locale).split(' ').slice(0, 2).join(' ')}</a>
            </li>
          ))}
        </ul>
      </nav>

      {services.map((sv, i) => (
        <section key={sv.slug} id={sv.slug} aria-labelledby={`h-${sv.slug}`} className={`scroll-mt-36 py-20 lg:py-28 ${i % 2 ? 'bg-white' : 'bg-paper'}`}>
          <div className="container-x">
            <div className="relative grid gap-12 lg:grid-cols-12 lg:items-start">
              <SectionNode code={sv.code} />
              <div className={`lg:col-span-6 ${i % 2 ? 'lg:order-2 lg:col-start-7' : ''}`}>
                <Eyebrow code={sv.code}>{t('eyebrow')}</Eyebrow>
                <h2 id={`h-${sv.slug}`} data-reveal className="mt-5 text-3xl uppercase">{tr(sv.title, locale)}</h2>
                <p data-reveal className="mt-6 text-lg text-steel-600">{tr(sv.summary, locale)}</p>
                <ul className="mt-8 border-t border-steel-150">
                  {sv.scope[locale].map((item, j) => (
                    <li key={j} data-reveal style={{ ['--d' as string]: `${j * 40}ms` }} className="flex gap-4 border-b border-steel-150 py-3.5">
                      <span className="mono mt-1 text-signal-ink">{String(j + 1).padStart(2, '0')}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <ButtonLink href={{ pathname: '/contacto', query: { tema: sv.slug } }} variant="ghost-light" className="mt-8">{t('consult')}</ButtonLink>
              </div>
              {sv.image && (
                <div data-reveal-img className={`relative aspect-[4/5] overflow-hidden bg-ink lg:sticky lg:top-40 lg:col-span-5 ${i % 2 ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8'}`}>
                  <Image src={sv.image.src} alt={tr(sv.image.alt, locale)} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                </div>
              )}
            </div>

            {sv.slug === 'ccm' && (
              <div className="mt-20">
                <h3 className="display text-2xl uppercase">{t('mccTitle')}</h3>
                <div className="mt-8 grid gap-px bg-steel-150 md:grid-cols-2">
                  {ccm.scope[locale].slice(0, 2).map((line, j) => {
                    const [name, ...rest] = line.split(' — ');
                    return (
                      <div key={j} data-reveal style={{ ['--d' as string]: `${j * 100}ms` }} className="bg-paper p-8">
                        <p className="mono text-signal-ink">{j === 0 ? 'EU · ROCKWELL AUTOMATION' : 'BO · PROTOS'}</p>
                        <p className="display mt-4 text-3xl uppercase">{name}</p>
                        <p className="mt-4 text-steel-600">{rest.join(' — ')}</p>
                      </div>
                    );
                  })}
                </div>
                <p className="mono mt-4 text-steel-600">{ccm.scope[locale][2]}</p>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Process */}
      <section aria-labelledby="process" className="on-dark grid-lines bg-ink py-24 text-white lg:py-32">
        <div className="container-x">
          <div className="relative">
            <SectionNode code="SEQ" dark />
            <h2 id="process" className="text-3xl uppercase">{t('processTitle')}</h2>
          </div>
          <ol className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
            {(t.raw('process') as string[]).map((step, i) => (
              <li key={i} data-reveal style={{ ['--d' as string]: `${i * 90}ms` }} className="relative bg-ink p-6 pt-10">
                <span aria-hidden className="absolute left-6 top-0 h-6 w-0.5 bg-signal" />
                <span className="mono text-signal-bright">0{i + 1}</span>
                <p className="display mt-3 text-xl uppercase">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq" className="bg-paper py-24 lg:py-32">
        <div className="container-x">
          <div className="relative grid gap-12 lg:grid-cols-12">
            <SectionNode code="FAQ" />
            <h2 id="faq" className="text-3xl uppercase lg:col-span-4">{t('faqTitle')}</h2>
            <div className="lg:col-span-8">
              {faqs.map((f, i) => (
                <details key={i} className="group border-b border-steel-150 first:border-t">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                    {tr(f.question, locale)}
                    <span aria-hidden className="relative mt-2 size-3 shrink-0">
                      <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-current" />
                      <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-current transition-transform duration-300 group-open:scale-y-0" />
                    </span>
                  </summary>
                  <p className="pb-6 pr-10 text-steel-600">{tr(f.answer, locale)}</p>
                </details>
              ))}
              <p className="mt-8 text-steel-600"><a className="link-draw text-ink" href={`mailto:${s.email}`}>{s.email}</a></p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
      <JsonLd data={ld} />
    </>
  );
}
