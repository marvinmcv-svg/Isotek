import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getSettings } from '@/content';
import { alternates } from '@/lib/site';
import type { Locale } from '@/content/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return { title: `${t('title')} | ISOTEK LATAM`, description: t('metaDescription'), alternates: alternates(locale, '/privacidad'), robots: { index: false } };
}

// The legal text must come from the client. Only verifiable facts about this site are stated.
export default async function Privacy({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, s] = await Promise.all([getTranslations('privacy'), getSettings()]);
  const es = locale === 'es';
  return (
    <section className="bg-paper pb-24 pt-28 lg:pt-36">
      <div className="container-x max-w-3xl">
        <h1 className="text-3xl uppercase">{t('title')}</h1>
        <p className="mono mt-6 inline-block border border-dashed border-signal-ink px-3 py-2 text-signal-ink">[NEEDS CLIENT INPUT]</p>
        <div className="mt-8 space-y-5 text-lg text-steel-600">
          <p>{es ? `Responsable: ${s.legalName}, ${s.address.street}, ${s.address.city}, ${s.address.country}. Contacto: ${s.email}.` : `Controller: ${s.legalName}, ${s.address.street}, ${s.address.city}, ${s.address.country}. Contact: ${s.email}.`}</p>
          <p>{es ? 'Este sitio recoge los datos que usted envía en el formulario de consulta (nombre, empresa, correo, teléfono, país y mensaje) únicamente para responder su consulta.' : 'This site collects the data you submit in the enquiry form (name, company, email, phone, country and message) solely to answer your enquiry.'}</p>
          <p>{es ? 'El texto legal completo de la política de privacidad debe ser provisto por ISOTEK LATAM.' : 'The full legal text of the privacy policy must be provided by ISOTEK LATAM.'}</p>
        </div>
      </div>
    </section>
  );
}
