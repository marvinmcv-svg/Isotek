'use client';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

/** ES/EN selector styled like a two-position selector switch. */
export function LangToggle({ className = '' }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('nav');
  return (
    <div role="group" aria-label={t('language')} className={`relative inline-flex h-9 items-center rounded-full border border-white/25 p-0.5 ${className}`}>
      <span
        aria-hidden
        className={`absolute top-0.5 h-8 w-10 rounded-full bg-signal transition-transform duration-200 ease-snap ${locale === 'en' ? 'translate-x-10' : 'translate-x-0'}`}
      />
      {(['es', 'en'] as const).map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          hrefLang={l}
          aria-current={l === locale ? 'true' : undefined}
          lang={l}
          className="mono relative z-10 grid h-8 w-10 place-items-center rounded-full text-white/70 aria-[current=true]:text-white"
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
