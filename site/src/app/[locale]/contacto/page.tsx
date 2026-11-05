import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionNode } from '@/components/ui/SectionNode';
import { WhatsAppGlyph } from '@/components/ui/WhatsAppFab';
import { ContactForm } from '@/components/sections/ContactForm';
import { getSettings } from '@/content';
import { alternates, tr, waLink } from '@/lib/site';
import type { Locale } from '@/content/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return { title: t('metaTitle'), description: t('metaDescription'), alternates: alternates(locale, '/contacto'), openGraph: { title: t('metaTitle'), description: t('metaDescription') } };
}

export default async function Contact({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, c, s] = await Promise.all([getTranslations('contact'), getTranslations('common'), getSettings()]);
  return (
    <section className="bg-paper pb-24 pt-28 lg:pt-36">
      <div className="container-x">
        <div className="relative grid gap-14 lg:grid-cols-12">
          <SectionNode code="IN" />
          <div className="lg:col-span-7">
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <h1 className="mt-6 text-4xl uppercase">{t('title')}</h1>
            <p className="mt-6 max-w-xl text-lg text-steel-600">{t('lead')}</p>
            <div className="mt-12">
              <Suspense fallback={null}><ContactForm email={s.email} whatsapp={s.whatsapp} /></Suspense>
            </div>
          </div>
          <aside className="on-dark self-start bg-ink p-8 text-white lg:sticky lg:top-28 lg:col-span-4 lg:col-start-9">
            <h2 className="mono text-steel-400">{t('direct')}</h2>
            <ul className="mt-6 space-y-5">
              <li><a href={waLink(s.whatsapp)} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 font-semibold"><span className="grid size-11 place-items-center rounded-full bg-signal"><WhatsAppGlyph className="size-5" /></span><span className="link-draw">{c('whatsapp')}</span></a></li>
              <li><a href={`tel:${s.phone.replace(/\s/g, '')}`} className="display link-draw text-3xl tabular">{s.phone}</a></li>
              <li><a href={`mailto:${s.email}`} className="link-draw text-steel-300 hover:text-white">{s.email}</a></li>
            </ul>
            <h2 className="mono mt-10 text-steel-400">{t('address')}</h2>
            <address className="mt-3 not-italic text-steel-300">{s.address.street}<br />{s.address.city}, {s.address.country}</address>
            <h2 className="mono mt-8 text-steel-400">{t('hours')}</h2>
            <p className="mt-3 text-steel-300">{tr(s.hours, locale)}</p>
            <h2 className="mono mt-8 text-steel-400">{t('offices')}</h2>
            <ul className="mt-3 space-y-1 text-steel-300">
              {s.offices.map((o) => <li key={o.city}>{o.city} · <span className="text-steel-400">{tr(o.role, locale)}</span></li>)}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
