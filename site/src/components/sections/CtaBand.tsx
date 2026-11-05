import { getTranslations } from 'next-intl/server';
import { ButtonLink } from '@/components/ui/Button';
import { SectionNode } from '@/components/ui/SectionNode';
import { WhatsAppGlyph } from '@/components/ui/WhatsAppFab';
import { getSettings } from '@/content';
import { waLink } from '@/lib/site';

export async function CtaBand({ topic }: { topic?: string }) {
  const [t, c, s] = await Promise.all([getTranslations('home'), getTranslations('common'), getSettings()]);
  return (
    <section className="relative overflow-hidden bg-signal py-20 text-white lg:py-28">
      <div aria-hidden className="grid-lines absolute inset-0 opacity-60" />
      <div className="container-x relative">
        <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionNode dark />
          <div className="lg:col-span-7">
            <h2 className="text-4xl uppercase">{t('ctaTitle')}</h2>
            <p className="mt-6 max-w-xl text-lg text-white/90">{t('ctaLead')}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <ButtonLink href={topic ? { pathname: '/contacto', query: { tema: topic } } : '/contacto'} variant="ghost-dark" className="bg-ink !border-ink">
              {t('ctaPrimary')}
            </ButtonLink>
            <a href={waLink(s.whatsapp)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-3 border border-white/50 px-6 font-semibold transition-colors hover:border-white hover:bg-white hover:text-signal-ink">
              <WhatsAppGlyph className="size-5" /> {c('whatsapp')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
