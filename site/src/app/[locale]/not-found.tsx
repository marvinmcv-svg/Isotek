import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('notFound');
  const nav = useTranslations('nav');
  return (
    <section className="on-dark grid-lines flex min-h-[80svh] items-center bg-ink pb-20 pt-32 text-white">
      <div className="container-x">
        <p className="mono text-signal-bright">{t('code')}</p>
        {/* Broken busbar */}
        <div aria-hidden className="mt-8 flex items-center gap-3">
          <span className="h-[3px] w-24 bg-signal sm:w-48" />
          <span className="h-[3px] w-6 rotate-[-28deg] bg-steel-400" />
          <span className="h-[3px] w-24 bg-steel-900 sm:w-48" />
        </div>
        <h1 className="mt-10 max-w-4xl text-4xl uppercase">{t('title')}</h1>
        <p className="mt-6 text-lg text-steel-300">{t('lead')}</p>
        <ul className="mt-8 flex flex-wrap gap-3">
          {([['home', '/'], ['solutions', '/soluciones'], ['projects', '/proyectos'], ['contact', '/contacto']] as const).map(([k, href]) => (
            <li key={k}><Link href={href} className="mono inline-block border border-white/25 px-4 py-3 hover:border-signal hover:text-signal-bright">{k === 'home' ? t('home') : nav(k)}</Link></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
