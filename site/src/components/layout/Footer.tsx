import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Logo } from '@/components/ui/Logo';
import { getServices } from '@/content';
import { tr, waLink } from '@/lib/site';
import type { Locale, SiteSettings } from '@/content/types';

export async function Footer({ settings: s, locale }: { settings: SiteSettings; locale: Locale }) {
  const [t, nav, services] = await Promise.all([getTranslations('footer'), getTranslations('nav'), getServices()]);
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark grid-lines relative bg-ink pb-24 pt-20 text-white sm:pb-12">
      <div className="container-x">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" className="h-12 w-auto" />
            <p className="mt-6 max-w-xs text-steel-300">{t('tagline')}</p>
            <address className="mt-8 space-y-1 not-italic text-steel-300">
              <p>{s.address.street}</p>
              <p>{s.address.city}, {s.address.country}</p>
              <p className="mono pt-3 text-steel-400">{tr(s.hours, locale)}</p>
            </address>
          </div>

          <nav aria-label={nav('solutions')} className="lg:col-span-3">
            <h2 className="mono text-steel-400">{nav('solutions')}</h2>
            <ul className="mt-5 space-y-2.5">
              {services.map((sv) => (
                <li key={sv.slug}>
                  <Link href={`/soluciones#${sv.slug}`} className="link-draw text-steel-300 hover:text-white">{tr(sv.title, locale)}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="ISOTEK LATAM" className="lg:col-span-2">
            <h2 className="mono text-steel-400">ISOTEK</h2>
            <ul className="mt-5 space-y-2.5">
              {(['projects', 'products', 'brands', 'company', 'news', 'contact'] as const).map((k) => (
                <li key={k}>
                  <Link href={{ projects: '/proyectos', products: '/productos', brands: '/marcas', company: '/empresa', news: '/novedades', contact: '/contacto' }[k]} className="link-draw text-steel-300 hover:text-white">
                    {nav(k)}
                  </Link>
                </li>
              ))}
              <li>
                <a href={s.storeUrl} target="_blank" rel="noopener noreferrer" className="link-draw text-steel-300 hover:text-white">{nav('store')} ↗</a>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="mono text-steel-400">{nav('contact')}</h2>
            <ul className="mt-5 space-y-2.5">
              <li><a href={`tel:${s.phone.replace(/\s/g, '')}`} className="link-draw display text-2xl tabular">{s.phone}</a></li>
              <li><a href={`mailto:${s.email}`} className="link-draw text-steel-300 hover:text-white">{s.email}</a></li>
              <li><a href={waLink(s.whatsapp)} target="_blank" rel="noopener noreferrer" className="link-draw text-steel-300 hover:text-white">WhatsApp +{s.whatsapp.slice(0, 3)} {s.whatsapp.slice(3)}</a></li>
            </ul>
            <h2 className="mono mt-10 text-steel-400">{t('follow')}</h2>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {s.socials.map((x) => (
                <li key={x.label}><a href={x.url} target="_blank" rel="noopener noreferrer" className="link-draw text-steel-300 hover:text-white">{x.label}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mono flex flex-col gap-3 pt-8 text-steel-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {s.legalName}. {t('rights')}</p>
          <div className="flex gap-6">
            <Link href="/privacidad" className="link-draw hover:text-white">{t('privacy')}</Link>
            <a href="/studio" className="link-draw hover:text-white" rel="nofollow">{t('admin')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
