'use client';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Logo } from '@/components/ui/Logo';
import { LangToggle } from './LangToggle';
import type { SiteSettings } from '@/content/types';

const NAV = [
  ['solutions', '/soluciones'],
  ['projects', '/proyectos'],
  ['products', '/productos'],
  ['company', '/empresa'],
  ['news', '/novedades'],
] as const;

export function Header({ settings }: { settings: SiteSettings }) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && (setOpen(false), menuBtn.current?.focus());
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const active = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header
      className={`on-dark fixed inset-x-0 top-0 z-50 text-white transition-[background-color,box-shadow] duration-300 ${
        scrolled || open ? 'bg-ink/95 shadow-[0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-md' : 'bg-gradient-to-b from-ink/70 to-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link href="/" className="shrink-0" aria-label="ISOTEK LATAM — inicio">
          <Logo tone="light" className="h-9 w-auto lg:h-11" />
        </Link>

        <nav aria-label={t('primary')} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map(([key, href]) => (
              <li key={key}>
                <Link
                  href={href}
                  aria-current={active(href) ? 'page' : undefined}
                  className="group relative block px-3 py-2 text-[0.95rem] font-semibold text-white/80 transition-colors hover:text-white aria-[current=page]:text-white"
                >
                  {t(key)}
                  <span aria-hidden className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-signal transition-transform duration-300 ease-out group-hover:scale-x-100 group-aria-[current=page]:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <LangToggle className="hidden sm:inline-flex" />
          <Link href="/contacto" className="hidden min-h-11 items-center bg-signal px-5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-ink lg:inline-flex">
            {t('cta')}
          </Link>
          <button
            ref={menuBtn}
            type="button"
            className="grid size-11 place-items-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? t('close') : t('menu')}</span>
            <span aria-hidden className="relative block h-3 w-6">
              <span className={`absolute left-0 top-0 h-0.5 w-6 bg-white transition-transform duration-300 ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
              <span className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${open ? 'w-6 -translate-y-[5px] -rotate-45' : 'w-4'}`} />
            </span>
          </button>
        </div>
      </div>

          <div
            id="mobile-nav"
            inert={!open}
            className={`grid-lines fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-ink transition-[clip-path,visibility] duration-500 ease-out lg:hidden ${open ? 'visible [clip-path:inset(0_0_0_0)]' : 'invisible [clip-path:inset(0_0_100%_0)]'}`}
          >
            <nav aria-label={t('primary')} className="container-x flex min-h-full flex-col pb-28 pt-8">
              <ul className="border-l border-white/15">
                {[['home', '/'] as const, ...NAV, ['brands', '/marcas'] as const, ['contact', '/contacto'] as const].map(([key, href], i) => (
                  <li
                    key={key}
                    style={{ transitionDelay: open ? `${120 + i * 40}ms` : '0ms' }}
                    className={`transition-[opacity,translate] duration-500 ease-out ${open ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'}`}
                  >
                    <Link href={href} aria-current={active(href) && href !== '/' ? 'page' : undefined} className="group flex items-center gap-4 py-2.5">
                      <span aria-hidden className="h-px w-5 bg-white/30 transition-all group-hover:w-8 group-hover:bg-signal group-aria-[current=page]:bg-signal" />
                      <span className="mono w-8 text-steel-400">{String(i).padStart(2, '0')}</span>
                      <span className="display text-4xl uppercase">{t(key)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center gap-4 pt-10">
                <LangToggle />
                <a href={settings.storeUrl} target="_blank" rel="noopener noreferrer" className="mono link-draw text-steel-300">
                  {t('store')} ↗
                </a>
              </div>
            </nav>
          </div>

    </header>
  );
}
