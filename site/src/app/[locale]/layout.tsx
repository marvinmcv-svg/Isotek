import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { archivo, jetbrains, source } from '../fonts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { RevealObserver } from '@/components/motion/RevealObserver';
import { Busbar } from '@/components/motion/Busbar';
import { WhatsAppFab } from '@/components/ui/WhatsAppFab';
import { JsonLd } from '@/components/seo/JsonLd';
import { getSettings } from '@/content';
import { SITE_URL, tr } from '@/lib/site';
import type { Locale } from '@/content/types';
import '../globals.css';

export const viewport: Viewport = { themeColor: '#0e0f11', width: 'device-width', initialScale: 1 };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const s = await getSettings();
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: s.name, template: `%s` },
    description: tr(s.description, locale as Locale),
    applicationName: s.name,
    openGraph: { siteName: s.name, locale: locale === 'es' ? 'es_BO' : 'en_US', type: 'website', images: ['/media/projects/alicorp-1.jpg'] },
    twitter: { card: 'summary_large_image' },
  };
}

// Marks JS as available so reveal styles apply; if the reveal observer never boots
// (script error, blocked bundle) the class is removed and content stays visible.
const bootScript = `document.documentElement.classList.add('js');setTimeout(function(){if(!window.__reveal)document.documentElement.classList.remove('js')},3000);`;

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const [s, t] = await Promise.all([getSettings(), getTranslations('nav')]);

  const org = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${SITE_URL}/#org`,
    name: s.name,
    legalName: s.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/media/brand/logo-black.png`,
    image: `${SITE_URL}/media/projects/alicorp-1.jpg`,
    foundingDate: String(s.founded),
    telephone: s.phone,
    email: s.email,
    address: { '@type': 'PostalAddress', streetAddress: s.address.street, addressLocality: s.address.city, addressCountry: 'BO' },
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:30' }],
    areaServed: ['BO', 'PY', 'PE', 'AR', 'US'],
    sameAs: s.socials.map((x) => x.url),
  };

  return (
    <html lang={locale} className={`${archivo.variable} ${source.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-3 focus:text-ink">
          {t('skip')}
        </a>
        <NextIntlClientProvider>
          <Header settings={s} />
          <main id="main" tabIndex={-1} className="relative outline-none">
            <Busbar />
            {children}
          </main>
          <Footer settings={s} locale={locale as Locale} />
          <WhatsAppFab number={s.whatsapp} label={(await getTranslations('common'))('whatsapp')} />
          <RevealObserver />
        </NextIntlClientProvider>
        <JsonLd data={org} />
      </body>
    </html>
  );
}
