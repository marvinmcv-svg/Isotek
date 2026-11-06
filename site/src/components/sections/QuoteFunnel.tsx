'use client';
import { useEffect, useId, useState } from 'react';
import { useTranslations } from 'next-intl';
import { WhatsAppGlyph } from '@/components/ui/WhatsAppFab';
import { track } from '@/components/seo/Analytics';
import { waLink } from '@/lib/site';

const NEEDS = ['tableros', 'epc', 'instrumentacion', 'consulta'] as const;
const TIMELINES = ['urgent', 'soon', 'planning'] as const;
type Need = (typeof NEEDS)[number];

// ?tema=… values used elsewhere on the site → funnel option
const FROM_TOPIC: Record<string, Need> = {
  ccm: 'tableros', 'electricas-bt-mt': 'tableros', metalmecanica: 'tableros', product: 'tableros',
  epc: 'epc', 'control-automatico': 'epc', 'soluciones-especificas': 'epc',
  instrumentacion: 'instrumentacion', calibration: 'instrumentacion',
};

/**
 * Guided enquiry: four short steps that compose a WhatsApp message, previewed
 * live in a phone mock-up, then open wa.me with the text ready to send.
 */
export function QuoteFunnel({ whatsapp, email, industries, topic }: { whatsapp: string; email: string; industries: string[]; topic?: string }) {
  const t = useTranslations('funnel');
  const uid = useId();
  const [step, setStep] = useState(0);
  const [need, setNeed] = useState<Need | null>(topic ? FROM_TOPIC[topic] ?? null : null);
  const [industry, setIndustry] = useState('');
  const [timeline, setTimeline] = useState('');
  const [notes, setNotes] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [city, setCity] = useState('');
  const [showRequired, setShowRequired] = useState(false);

  useEffect(() => {
    const tema = new URLSearchParams(window.location.search).get('tema') || '';
    if (FROM_TOPIC[tema]) setNeed(FROM_TOPIC[tema]);
  }, []);

  const lines = [
    t('msgHello'),
    name.trim() && [t('msgIam', { name: name.trim() }), company.trim() && t('msgFrom', { company: company.trim() })].filter(Boolean).join(' ') + '.',
    need && t('msgNeed', { need: t(`needs.${need}.msg`) }),
    industry && t('msgIndustry', { v: industry }),
    timeline && t('msgTimeline', { v: t(`timelines.${timeline}`) }),
    city.trim() && t('msgCity', { v: city.trim() }),
    notes.trim() && t('msgNotes', { v: notes.trim() }),
  ].filter(Boolean) as string[];
  const message = lines.join('\n');
  const started = step > 0 || need !== null;

  const canNext = step === 0 ? need !== null : step === 2 ? name.trim().length > 1 : true;
  const next = () => {
    if (!canNext) return setShowRequired(true);
    setShowRequired(false);
    setStep((s) => Math.min(3, s + 1));
  };

  const chip = (on: boolean) =>
    `min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors ${on ? 'border-copper bg-copper text-ink' : 'border-white/20 text-steel-300 hover:border-white/50 hover:text-white'}`;
  const field = 'mt-2 block w-full rounded-none border-0 border-b border-white/25 bg-transparent px-0 py-3 text-lg text-white placeholder:text-steel-400/70 focus:border-copper focus:outline-none focus:ring-0';
  const label = 'mono text-steel-400';

  return (
    <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        {/* Progress */}
        <ol className="grid grid-cols-4 gap-3" aria-label={t('stepLabel', { n: step + 1 })}>
          {(t.raw('steps') as string[]).map((s, i) => (
            <li key={s} aria-current={i === step ? 'step' : undefined}>
              <span className="block h-0.5 overflow-hidden bg-white/12">
                <span className={`block h-full bg-copper transition-transform duration-500 ease-out ${i <= step ? 'scale-x-100' : 'scale-x-0'} origin-left`} />
              </span>
              <span className={`mono mt-3 block text-[0.62rem] sm:text-[0.68rem] ${i === step ? 'text-white' : 'text-steel-400/80'}`}>
                0{i + 1}<span className="hidden sm:inline"> · {s}</span>
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-10 min-h-[25rem]" aria-live="polite">
          {step === 0 && (
            <fieldset>
              <legend className="sr-only">{(t.raw('steps') as string[])[0]}</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                {NEEDS.map((n, i) => (
                  <label key={n} className={`group relative flex cursor-pointer flex-col border p-6 transition-colors lg:p-7 ${need === n ? 'border-copper bg-white/[0.04]' : 'border-white/12 hover:border-white/35'}`}>
                    <input
                      type="radio" name={`${uid}-need`} value={n} checked={need === n} className="sr-only"
                      onChange={() => { setNeed(n); setShowRequired(false); setStep(1); }}
                    />
                    <span className="display text-sm text-signal-bright">0{i + 1}</span>
                    <span className="display mt-3 text-2xl uppercase leading-tight">{t(`needs.${n}.title`)}</span>
                    <span className="mt-3 text-steel-300">{t(`needs.${n}.desc`)}</span>
                    <span aria-hidden className={`absolute right-5 top-5 size-3 rounded-full border transition-colors ${need === n ? 'border-copper bg-copper' : 'border-white/30'}`} />
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {step === 1 && (
            <div className="space-y-9">
              <fieldset>
                <legend className={label}>{t('industry')}</legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {industries.map((ind) => (
                    <button key={ind} type="button" aria-pressed={industry === ind} onClick={() => setIndustry(industry === ind ? '' : ind)} className={chip(industry === ind)}>{ind}</button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className={label}>{t('timeline')}</legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {TIMELINES.map((tl) => (
                    <button key={tl} type="button" aria-pressed={timeline === tl} onClick={() => setTimeline(timeline === tl ? '' : tl)} className={chip(timeline === tl)}>{t(`timelines.${tl}`)}</button>
                  ))}
                </div>
              </fieldset>
              <label className="block">
                <span className={label}>{t('notes')}</span>
                <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t('notesPh')} maxLength={600} className={`${field} resize-none`} />
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <label className="block">
                <span className={label}>{t('name')} *</span>
                <input
                  value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required maxLength={80}
                  aria-invalid={showRequired && !canNext} aria-describedby={`${uid}-req`} className={field}
                  onKeyDown={(e) => e.key === 'Enter' && next()}
                />
                <span id={`${uid}-req`} className={`mt-2 block text-sm text-signal-bright ${showRequired && !canNext ? '' : 'invisible'}`}>{t('required')}</span>
              </label>
              <label className="block">
                <span className={label}>{t('company')}</span>
                <input value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" maxLength={80} className={field} />
              </label>
              <label className="block">
                <span className={label}>{t('city')}</span>
                <input value={city} onChange={(e) => setCity(e.target.value)} autoComplete="address-level2" maxLength={60} className={field} />
              </label>
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="text-lg text-steel-300">{t('review')}</p>
              <pre className="mt-6 whitespace-pre-wrap border-l-2 border-copper bg-white/[0.04] p-5 font-sans text-white">{message}</pre>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a
                  href={waLink(whatsapp, message)} target="_blank" rel="noopener noreferrer"
                  onClick={() => track('generate_lead', { topic: need || 'other', channel: 'whatsapp' })}
                  className="inline-flex min-h-14 items-center gap-3 rounded-full bg-wa px-8 text-lg font-bold text-wa-ink shadow-[0_10px_40px_rgb(37_211_102/0.25)] transition-transform duration-300 ease-out hover:-translate-y-0.5"
                >
                  <WhatsAppGlyph className="size-6" /> {t('send')}
                </a>
                <a
                  href={`mailto:${email}?subject=${encodeURIComponent(t('subject'))}&body=${encodeURIComponent(message)}`}
                  onClick={() => track('generate_lead', { topic: need || 'other', channel: 'email' })}
                  className="link-draw text-steel-300 hover:text-white"
                >
                  {t('orEmail')}
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/10 pt-8">
          <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} className={`mono min-h-11 text-steel-300 hover:text-white ${step === 0 ? 'invisible' : ''}`}>
            ← {t('back')}
          </button>
          {step < 3 && (
            <button
              type="button" onClick={next} aria-disabled={!canNext}
              className={`mono inline-flex min-h-13 items-center gap-3 px-8 text-sm transition-colors ${canNext ? 'bg-signal text-white hover:bg-white hover:text-ink' : 'bg-signal/35 text-white/60'}`}
            >
              {t('next')} →
            </button>
          )}
        </div>
      </div>

      {/* Phone preview */}
      <div aria-hidden className="lg:col-span-5 lg:col-start-8">
        <div className="mx-auto w-full max-w-[22rem] lg:sticky lg:top-28">
          <div className="rounded-[2.75rem] bg-[#0c0a09] p-3 shadow-[0_40px_100px_-20px_rgb(0_0_0/0.7)] ring-1 ring-white/10">
            <div className="relative flex h-[34rem] flex-col overflow-hidden rounded-[2.2rem] bg-wa-ink">
              <div className="absolute left-1/2 top-2.5 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
              <div className="flex items-center gap-3 bg-wa-panel px-4 pb-3 pt-11">
                <span className="text-steel-300">‹</span>
                <span className="grid size-10 place-items-center rounded-full bg-signal text-[0.7rem] font-bold text-white">ISO</span>
                <span className="leading-tight">
                  <span className="block font-semibold text-white">ISOTEK LATAM</span>
                  <span className="block text-xs text-steel-400">{t('online')}</span>
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-3 py-4 text-[0.9rem] leading-snug">
                <span className="mx-auto rounded-md bg-wa-panel px-3 py-1 text-[0.68rem] uppercase tracking-wider text-steel-400">{t('today')}</span>
                <p className="max-w-[85%] rounded-lg rounded-tl-none bg-wa-panel px-3 py-2 text-white">
                  {t('greeting')}
                  <span className="mt-1 block text-right text-[0.65rem] text-steel-400">09:41</span>
                </p>
                {started && (
                  <p className="ml-auto max-w-[88%] whitespace-pre-line rounded-lg rounded-tr-none bg-wa-out px-3 py-2 text-white transition-all">
                    {message}
                    <span className="mt-1 block text-right text-[0.65rem] text-white/60">09:42 <span className="text-sky-300">✓✓</span></span>
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 p-3">
                <span className="flex-1 rounded-full bg-wa-panel px-4 py-3 text-sm text-steel-400">{t('typing')}</span>
                <span className="grid size-11 place-items-center rounded-full bg-wa text-wa-ink">
                  <svg viewBox="0 0 24 24" className="size-5" fill="currentColor"><path d="M3.4 20.4 21 12 3.4 3.6 3.4 10l12.6 2-12.6 2z" /></svg>
                </span>
              </div>
            </div>
          </div>
          <p className="mt-5 text-center text-sm text-steel-400">{t('hint')}</p>
        </div>
      </div>
    </div>
  );
}
