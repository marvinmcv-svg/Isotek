'use client';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { EnergyField } from './EnergyField';

export type HeroSlide = {
  slug: string; code: string; tab: string; kicker: string;
  title: string; summary: string; image: { src: string; alt: string };
};

type Props = {
  eyebrow: string; title1: string; title2: string; slides: HeroSlide[];
  ctaService: string; ctaPrimary: string;
  labels: { carousel: string; slide: string; prev: string; next: string; pause: string; play: string };
};

const DURATION = 7000;

/**
 * Home hero: the key services as an autoplaying carousel over a three.js energy field.
 * Each slide change wipes in a new photo, re-runs the headline and surges the current.
 * Pauses on hover/focus, never autoplays with reduced motion, swipe + arrow keys work.
 */
export function HeroCarousel(p: Props) {
  const n = p.slides.length;
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  // Starts paused so nothing advances before we know the motion preference.
  const [paused, setPaused] = useState(true);
  const [reduced, setReduced] = useState(true);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const root = useRef<HTMLElement>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setReduced(false);
    setPaused(false);
  }, []);

  const go = useCallback((to: number) => {
    setIndex((cur) => {
      const next = ((to % n) + n) % n;
      if (next !== cur) setPrev(cur);
      return next;
    });
  }, [n]);

  const running = !paused && !hover && !focus;

  // Pointer tilt for the image card
  const onMove = (e: React.PointerEvent) => {
    const r = root.current!.getBoundingClientRect();
    root.current!.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    root.current!.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1); }
  };

  const s = p.slides[index];

  return (
    <section
      ref={root}
      aria-roledescription="carousel"
      aria-label={p.labels.carousel}
      onPointerMove={onMove}
      onKeyDown={onKey}
      onFocus={(e) => { if (e.target.matches(':focus-visible')) setFocus(true); }}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocus(false); }}
      className="hero-carousel on-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white"
    >
      <EnergyField surge={index} />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_45%,rgb(216_38_31/0.18),transparent_55%),radial-gradient(ellipse_at_0%_100%,rgb(199_154_99/0.12),transparent_50%)]" />
      <div aria-hidden className="hero-grain pointer-events-none absolute inset-0 -z-10 opacity-[0.07]" />

      <div className="container-x flex flex-1 flex-col pb-6 pt-24 lg:pb-8 lg:pt-28">
        <div className="grid flex-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <div className="order-2 lg:order-1 lg:col-span-6">
            <div className="hero-fade" style={{ ['--d' as string]: '100ms' }}>
              <Eyebrow dark>{p.eyebrow}</Eyebrow>
            </div>
            <h1 className="hero-fade mt-4 font-display text-xl text-steel-300" style={{ ['--d' as string]: '200ms' }}>
              {p.title1} <span className="text-copper">{p.title2}</span>
            </h1>

            <div aria-live={running ? 'off' : 'polite'} className="mt-8 min-h-[18rem] sm:min-h-[16rem] lg:mt-12 lg:min-h-[22rem]">
              <div key={index} id="hero-slide" role="group" aria-roledescription={p.labels.slide} aria-label={`${index + 1} / ${n}`}>
                <p className="mono flex items-center gap-3 text-steel-400">
                  <span className="slide-in inline-block text-signal-bright" style={{ ['--d' as string]: '0ms' }}>{s.code}</span>
                  <span className="slide-in inline-block" style={{ ['--d' as string]: '60ms' }}>{s.kicker}</span>
                </p>
                <h2 className="text-slide mt-5 uppercase">
                  {s.title.split(' ').map((w, i) => (
                    <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-top">
                      <span className="word-rise inline-block" style={{ ['--i' as string]: i }}>{w}&nbsp;</span>
                    </span>
                  ))}
                </h2>
                <p className="slide-in mt-6 max-w-xl text-lg text-steel-300" style={{ ['--d' as string]: '320ms' }}>{s.summary}</p>
                <div className="slide-in mt-8 flex flex-wrap gap-3" style={{ ['--d' as string]: '420ms' }}>
                  <ButtonLink href={`/soluciones#${s.slug}`}>{p.ctaService}</ButtonLink>
                  <ButtonLink href={{ pathname: '/', hash: 'cotizar' }} variant="ghost-dark">{p.ctaPrimary}</ButtonLink>
                </div>
              </div>
            </div>
          </div>

          {/* Image card */}
          <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
            <div className="hero-card-wrap hero-fade" style={{ ['--d' as string]: '250ms' }}>
              <div
                className="hero-card relative aspect-[4/3] w-full touch-pan-y select-none overflow-hidden rounded-sm bg-ink-2 shadow-[0_40px_120px_-30px_rgb(0_0_0/0.8)] lg:aspect-[4/5] lg:max-h-[68vh]"
                onPointerEnter={() => setHover(true)}
                onPointerLeave={() => { setHover(false); drag.current = null; }}
                onPointerDown={(e) => { drag.current = { x: e.clientX, y: e.clientY }; }}
                onPointerUp={(e) => {
                  if (!drag.current) return;
                  const dx = e.clientX - drag.current.x, dy = e.clientY - drag.current.y;
                  drag.current = null;
                  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1));
                }}
              >
                {p.slides.map((sl, i) => (
                  <div
                    key={sl.slug}
                    aria-hidden={i !== index}
                    className={`hero-slide-img absolute inset-0 ${i === index ? 'is-active' : i === prev ? 'is-prev' : ''}`}
                  >
                    <Image
                      src={sl.image.src} alt={sl.image.alt} fill priority={i === 0} draggable={false}
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="kenburns object-cover"
                    />
                  </div>
                ))}
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/20" />
                {/* technical corner marks */}
                <span aria-hidden className="pointer-events-none absolute left-3 top-3 size-5 border-l-2 border-t-2 border-white/70" />
                <span aria-hidden className="pointer-events-none absolute right-3 top-3 size-5 border-r-2 border-t-2 border-white/70" />
                <span aria-hidden className="pointer-events-none absolute bottom-3 left-3 size-5 border-b-2 border-l-2 border-white/70" />
                <span aria-hidden className="pointer-events-none absolute bottom-3 right-3 size-5 border-b-2 border-r-2 border-white/70" />
                <div className="pointer-events-none absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
                  <p key={index} className="slide-in mono max-w-[75%] text-[0.7rem] text-white/80">{s.image.alt}</p>
                  <p aria-hidden className="display tabular text-4xl leading-none text-white">
                    {String(index + 1).padStart(2, '0')}<span className="text-lg text-white/50">/{String(n).padStart(2, '0')}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs: the busbar, each feeder fills while its slide is live */}
        {/* right padding keeps the controls clear of the fixed WhatsApp button */}
        <div className="hero-fade mt-8 pr-16 sm:pr-20 lg:mt-10" style={{ ['--d' as string]: '500ms' }}>
          <div className="flex items-center gap-3">
            <div role="tablist" aria-label={p.labels.carousel} className="grid flex-1 grid-cols-5 gap-2 border-t border-white/15">
              {p.slides.map((sl, i) => (
                <button
                  key={sl.slug}
                  role="tab"
                  aria-selected={i === index}
                  aria-controls="hero-slide"
                  onClick={() => go(i)}
                  className="group relative -mt-px flex flex-col justify-start pt-4 text-left"
                >
                  <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 overflow-hidden">
                    {i === index && reduced ? (
                      <span className="block h-full bg-signal" />
                    ) : i === index ? (
                      <span
                        key={index}
                        className="hero-progress block h-full origin-left bg-signal"
                        style={{ animationDuration: `${DURATION}ms`, animationPlayState: running ? 'running' : 'paused' }}
                        onAnimationEnd={() => go(index + 1)}
                      />
                    ) : (
                      <span className={`block h-full bg-white/40 transition-transform duration-500 ${i < index ? 'scale-x-100' : 'scale-x-0'} origin-left group-hover:scale-x-100`} />
                    )}
                  </span>
                  <span className={`mono block text-[0.625rem] transition-colors ${i === index ? 'text-signal-bright' : 'text-steel-400'}`}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={`mt-1 hidden text-sm font-semibold leading-tight transition-colors sm:block lg:text-base ${i === index ? 'text-white' : 'text-steel-400 group-hover:text-white'}`}>{sl.tab}</span>
                </button>
              ))}
            </div>
            <div className="flex shrink-0 gap-1.5 self-end">
              <CtrlButton label={p.labels.prev} onClick={() => go(index - 1)}><path d="M15 8H2M7 3 2 8l5 5" /></CtrlButton>
              {!reduced && (
                <CtrlButton label={paused ? p.labels.play : p.labels.pause} onClick={() => setPaused((v) => !v)}>
                  {paused ? <path d="M4 2.5v11l9-5.5z" fill="currentColor" /> : <path d="M5 3v10M11 3v10" />}
                </CtrlButton>
              )}
              <CtrlButton label={p.labels.next} onClick={() => go(index + 1)}><path d="M1 8h13M9 3l5 5-5 5" /></CtrlButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtrlButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="grid size-10 place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-white hover:bg-white/10">
      <svg aria-hidden viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">{children}</svg>
    </button>
  );
}
