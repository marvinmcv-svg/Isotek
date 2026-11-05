'use client';
import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { contactSchema, TOPICS } from '@/lib/contact-schema';
import { waLink } from '@/lib/site';
import { track } from '@/components/seo/Analytics';

type Status = 'idle' | 'sending' | 'ok' | 'error' | 'invalid';

export function ContactForm({ email, whatsapp }: { email: string; whatsapp: string }) {
  const t = useTranslations('contact.form');
  const c = useTranslations('common');
  const locale = useLocale();
  // Pre-select topic / product from ?tema=…&producto=… after mount (keeps the page static, no layout shift).
  const [topic, setTopic] = useState<string>('service');
  const [product, setProduct] = useState('');
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const tema = q.get('tema') || '';
    if ((TOPICS as readonly string[]).includes(tema)) setTopic(tema);
    setProduct(q.get('producto') || '');
  }, []);
  const [status, setStatus] = useState<Status>('idle');
  const [bad, setBad] = useState<string[]>([]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = { ...Object.fromEntries(fd), consent: fd.get('consent') === 'on', locale };
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      setBad(parsed.error.issues.map((i) => String(i.path[0])));
      setStatus('invalid');
      e.currentTarget.querySelector<HTMLElement>('[aria-invalid="true"], :invalid')?.focus();
      return;
    }
    setBad([]);
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(parsed.data) });
      setStatus(res.ok ? 'ok' : 'error');
      if (res.ok) track('generate_lead', { topic: parsed.data.topic });
    } catch {
      setStatus('error');
    }
  }

  const field = 'peer mt-2 block w-full rounded-[2px] border border-steel-150 bg-white px-4 py-3 text-ink outline-none transition-[border-color,box-shadow] focus:border-ink focus:shadow-[inset_3px_0_0_var(--color-signal)] aria-[invalid=true]:border-signal-ink';
  const label = 'block font-semibold';
  const inv = (n: string) => (bad.includes(n) ? true : undefined);
  const req = <span className="mono ml-2 text-[0.625rem] text-signal-ink">{t('required')}</span>;

  if (status === 'ok') {
    return (
      <div role="status" className="border-l-4 border-signal bg-white p-8">
        <p className="display text-2xl uppercase">✓</p>
        <p className="mt-2 text-lg">{t('success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor="cf-name" className={label}>{t('name')}{req}</label>
        <input id="cf-name" name="name" autoComplete="name" required minLength={2} maxLength={120} aria-invalid={inv('name')} className={field} />
      </div>
      <div>
        <label htmlFor="cf-company" className={label}>{t('company')}</label>
        <input id="cf-company" name="company" autoComplete="organization" maxLength={160} className={field} />
      </div>
      <div>
        <label htmlFor="cf-country" className={label}>{t('country')}</label>
        <input id="cf-country" name="country" autoComplete="country-name" maxLength={60} className={field} />
      </div>
      <div>
        <label htmlFor="cf-email" className={label}>{t('email')}{req}</label>
        <input id="cf-email" name="email" type="email" autoComplete="email" required maxLength={200} aria-invalid={inv('email')} className={field} />
      </div>
      <div>
        <label htmlFor="cf-phone" className={label}>{t('phone')}</label>
        <input id="cf-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} aria-invalid={inv('phone')} className={field} />
      </div>
      <fieldset className="sm:col-span-2">
        <legend className={label}>{t('topic')}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {TOPICS.map((tp) => (
            <label key={tp} className="mono cursor-pointer border border-steel-150 bg-white px-3 py-2.5 text-steel-600 transition-colors has-checked:border-ink has-checked:bg-ink has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-signal">
              <input type="radio" name="topic" value={tp} checked={tp === topic} onChange={() => setTopic(tp)} className="sr-only" />
              {t(`topics.${tp}`)}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="sm:col-span-2">
        <label htmlFor="cf-message" className={label}>{t('message')}{req}</label>
        <p id="cf-message-hint" className="text-sm text-steel-600">{t('messageHint')}</p>
        <textarea id="cf-message" name="message" rows={6} required minLength={10} maxLength={4000} aria-describedby="cf-message-hint" aria-invalid={inv('message')} key={product} defaultValue={product ? `${product}: ` : ''} className={field} />
      </div>
      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="flex items-start gap-3 sm:col-span-2">
        <input type="checkbox" name="consent" required aria-invalid={inv('consent')} className="mt-1 size-5 accent-signal" />
        <span className="text-steel-600">{t('consent')}{req}</span>
      </label>

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2" aria-live="polite">
        <button type="submit" disabled={status === 'sending'} className="group relative inline-flex min-h-12 items-center gap-3 overflow-hidden bg-signal px-7 font-semibold text-white disabled:opacity-60">
          <span aria-hidden className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-300 group-hover:scale-x-100" />
          <span className="relative">{status === 'sending' ? t('sending') : t('submit')}</span>
        </button>
        {status === 'invalid' && <p role="alert" className="font-semibold text-signal-ink">{t('invalid')}</p>}
        {status === 'error' && (
          <p role="alert" className="text-signal-ink">
            {t('error')}{' '}
            <a className="font-semibold underline" href={`mailto:${email}`}>{email}</a> ·{' '}
            <a className="font-semibold underline" href={waLink(whatsapp)} target="_blank" rel="noopener noreferrer">{c('whatsapp')}</a>
          </p>
        )}
      </div>
    </form>
  );
}
