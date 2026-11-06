import { getLocale, getTranslations } from 'next-intl/server';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { QuoteFunnel } from '@/components/sections/QuoteFunnel';
import { getIndustries, getSettings } from '@/content';
import { tr } from '@/lib/site';
import type { Locale } from '@/content/types';

/** Closing call to action on every page: the guided WhatsApp enquiry. */
export async function CtaBand({ topic, first = false }: { topic?: string; first?: boolean }) {
  const [t, s, industries, locale] = await Promise.all([getTranslations('funnel'), getSettings(), getIndustries(), getLocale()]);
  const Heading = first ? 'h1' : 'h2';
  return (
    <section id="cotizar" aria-labelledby="cotizar-title" className={`on-dark relative isolate overflow-hidden bg-ink text-white ${first ? 'pb-24 pt-28 lg:pb-32 lg:pt-36' : 'py-24 lg:py-32'}`}>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_100%_0%,rgb(216_38_31/0.18),transparent_50%),radial-gradient(ellipse_at_0%_100%,rgb(199_154_99/0.08),transparent_45%)]" />
      <div className="container-x">
        <div className="max-w-3xl">
          <Eyebrow dark>{t('eyebrow')}</Eyebrow>
          <Heading id="cotizar-title" className={`mt-6 uppercase ${first ? 'text-4xl' : 'text-3xl'}`}>{t('title')}</Heading>
          <p className="mt-6 max-w-xl text-lg text-steel-300">{t('lead')}</p>
        </div>
        <div className="mt-14 lg:mt-16">
          <QuoteFunnel whatsapp={s.whatsapp} email={s.email} topic={topic} industries={industries.map((i) => tr(i.name, locale as Locale))} />
        </div>
      </div>
    </section>
  );
}
