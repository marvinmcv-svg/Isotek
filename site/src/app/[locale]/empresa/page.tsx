import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/sections/PageHeader';
import { CtaBand } from '@/components/sections/CtaBand';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionNode } from '@/components/ui/SectionNode';
import { WhatsAppGlyph } from '@/components/ui/WhatsAppFab';
import { img } from '@/content/seed';
import { getCertifications, getSettings, getTeam } from '@/content';
import { alternates, tr, waLink } from '@/lib/site';
import type { Locale } from '@/content/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'company' });
  return { title: t('metaTitle'), description: t('metaDescription'), alternates: alternates(locale, '/empresa'), openGraph: { title: t('metaTitle'), description: t('metaDescription'), images: ['/media/company/field-team.jpg'] } };
}

export default async function Company({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, s, team, certs] = await Promise.all([getTranslations('company'), getSettings(), getTeam(), getCertifications()]);
  const field = img('/media/company/field-team.jpg', 'Ingenieros de ISOTEK con casco en planta industrial', 'ISOTEK engineers in hard hats at an industrial plant');
  const warehouse = img('/media/company/warehouse.jpg', 'Equipo de ISOTEK en el almacén', 'ISOTEK team in the warehouse');

  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} image={field} />

      <section className="bg-paper py-20 lg:py-28">
        <div className="container-x">
          <div className="relative grid gap-12 lg:grid-cols-12">
            <SectionNode code="2015" />
            <div className="space-y-6 text-lg lg:col-span-6">
              {(t.raw('story') as string[]).map((para, i) => <p key={i} data-reveal className={i === 0 ? 'text-xl font-semibold' : 'text-steel-600'}>{para}</p>)}
            </div>
            <div className="grid gap-4 lg:col-span-5 lg:col-start-8">
              <div data-reveal-img className="relative aspect-[4/3] overflow-hidden bg-ink"><Image src={field.src} alt={tr(field.alt, locale)} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" /></div>
              <div data-reveal-img style={{ ['--d' as string]: '120ms' }} className="relative aspect-[3/2] overflow-hidden bg-ink"><Image src={warehouse.src} alt={tr(warehouse.alt, locale)} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" /></div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="people" className="on-dark grid-lines bg-ink py-20 text-white lg:py-28">
        <div className="container-x">
          <div className="relative"><SectionNode code="HR" dark /><h2 id="people" className="text-3xl uppercase">{t('peopleTitle')}</h2></div>
          <dl className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {(t.raw('people') as [string, string][]).map(([v, l], i) => (
              <div key={i} data-reveal style={{ ['--d' as string]: `${i * 60}ms` }} className="bg-ink p-6">
                <dt className="sr-only">{l}</dt>
                <dd><span className="display block text-4xl text-signal">{v}</span><span className="mt-2 block text-steel-300">{l}</span></dd>
              </div>
            ))}
          </dl>
          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <div><h3 className="mono text-signal-bright">{t('missionTitle')}</h3><p className="display mt-4 text-2xl uppercase leading-tight">{t('mission')}</p></div>
            <div><h3 className="mono text-signal-bright">{t('visionTitle')}</h3><p className="display mt-4 text-2xl uppercase leading-tight">{t('vision')}</p></div>
          </div>
        </div>
      </section>

      <section id="certificaciones" aria-labelledby="certs" className="scroll-mt-24 bg-white py-20 lg:py-28">
        <div className="container-x">
          <div className="relative"><SectionNode code="ISO" /><Eyebrow>{t('certsEyebrow')}</Eyebrow><h2 id="certs" className="mt-6 max-w-3xl text-3xl uppercase">{t('certsTitle')}</h2></div>
          <ul className="mt-12 grid gap-px bg-steel-150 sm:grid-cols-2 lg:grid-cols-4">
            {certs.map((ce, i) => (
              <li key={ce.name} data-reveal style={{ ['--d' as string]: `${i * 70}ms` }} className="flex flex-col bg-white p-6">
                {ce.image ? (
                  <a href={ce.image.src} target="_blank" rel="noopener noreferrer" className="relative block aspect-[3/4] overflow-hidden border border-steel-150 bg-paper">
                    <Image src={ce.image.src} alt={tr(ce.image.alt, locale)} fill sizes="(min-width: 1024px) 22vw, 50vw" className="object-contain" />
                  </a>
                ) : <div aria-hidden className="grid aspect-[3/4] place-items-center border border-dashed border-steel-150 bg-paper"><span className="display text-3xl text-steel-300">{ce.name}</span></div>}
                <p className="display mt-5 text-2xl uppercase">{ce.name}</p>
                <p className="mono mt-1 text-signal-ink">{ce.issuer}{ce.reference ? ` · ${ce.reference}` : ''}</p>
                <p className="mt-3 text-steel-600">{tr(ce.description, locale)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="team" className="bg-paper py-20 lg:py-28">
        <div className="container-x">
          <div className="relative"><SectionNode code="TEAM" /><Eyebrow>{t('teamEyebrow')}</Eyebrow><h2 id="team" className="mt-6 text-3xl uppercase">{t('teamTitle')}</h2></div>
          <ul className="mt-12 border-t border-ink">
            {team.map((m, i) => (
              <li key={m.name} data-reveal style={{ ['--d' as string]: `${(i % 4) * 40}ms` }} className="grid gap-x-6 gap-y-1 border-b border-steel-150 py-5 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto] sm:items-baseline">
                <p className="display text-2xl uppercase">{m.name}</p>
                <p className="text-steel-600">{tr(m.role, locale)} <span className="mono text-steel-600">· {m.region}</span></p>
                <p className="mt-2 flex gap-4 sm:mt-0">
                  {m.email && <a href={`mailto:${m.email}`} className="mono link-draw text-steel-600 hover:text-ink">Email<span className="sr-only"> {m.name}</span></a>}
                  {m.whatsapp && <a href={waLink(m.whatsapp)} target="_blank" rel="noopener noreferrer" className="mono link-draw inline-flex items-center gap-1 text-steel-600 hover:text-ink"><WhatsAppGlyph className="size-3.5" />WhatsApp<span className="sr-only"> {m.name}</span></a>}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="offices" className="on-dark bg-ink py-20 text-white">
        <div className="container-x">
          <h2 id="offices" className="display text-2xl uppercase">{t('officesTitle')}</h2>
          <ul className="mt-8 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {s.offices.map((o) => (
              <li key={o.city} className="bg-ink p-6"><p className="display text-2xl uppercase">{o.city}</p><p className="mono mt-1 text-steel-400">{o.country} · {tr(o.role, locale)}</p></li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
