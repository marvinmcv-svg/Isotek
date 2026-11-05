import Image from 'next/image';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import type { Img } from '@/content/types';

type Props = {
  eyebrow: string; title1: string; title2: string; lead: string; feeders: string[];
  ctaPrimary: string; ctaProjects: string; image: Img; imageAlt: string;
};

/**
 * Signature moment: a single-line diagram draws itself, current pulses along the
 * busbar and each feeder (the four EPC stages) switches on. CSS-only, see globals.css.
 */
export function HeroEnergize(p: Props) {
  return (
    <section className="on-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white">
      <Image src={p.image.src} alt={p.imageAlt} fill priority sizes="100vw" className="hero-photo -z-20 object-cover object-[70%_center] grayscale-[25%]" />
      <div aria-hidden className="grid-lines absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--color-ink)_0%,rgb(14_15_17/0.88)_45%,rgb(14_15_17/0.35)_100%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-ink to-transparent" />

      <div className="container-x flex flex-1 flex-col justify-end pb-8 pt-28 lg:pb-10 lg:pt-32">
        <div className="max-w-6xl">
          <div className="hero-fade" style={{ ['--d' as string]: '100ms' }}>
            <Eyebrow dark>{p.eyebrow}</Eyebrow>
          </div>
          <h1 className="mt-6 overflow-hidden text-hero uppercase [font-stretch:62%]">
            <span className="hero-line" style={{ ['--i' as string]: 0 }}>{p.title1}</span>
            <span className="hero-line text-signal" style={{ ['--i' as string]: 1 }}>{p.title2}</span>
          </h1>
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <p className="hero-fade max-w-2xl text-lg text-steel-300 lg:col-span-7 lg:text-xl" style={{ ['--d' as string]: '500ms' }}>{p.lead}</p>
            <div className="hero-fade flex flex-wrap gap-3 lg:col-span-5 lg:justify-end" style={{ ['--d' as string]: '650ms' }}>
              <ButtonLink href="/contacto">{p.ctaPrimary}</ButtonLink>
              <ButtonLink href="/proyectos" variant="ghost-dark">{p.ctaProjects}</ButtonLink>
            </div>
          </div>
        </div>

        {/* Single-line diagram: busbar + four feeders */}
        <div aria-hidden className="relative mt-12 lg:-ml-[calc(2.25rem-5px)] lg:mt-14">
          <div className="relative h-[3px]">
            <div className="hero-bus absolute inset-0 bg-signal" />
            <span className="hero-pulse absolute top-1/2 -ml-1.5 size-3 -translate-y-1/2 rounded-full bg-white shadow-[0_0_16px_4px_rgb(255_74_61/0.8)]" />
          </div>
          <ol className="grid grid-cols-4 gap-2 lg:ml-[calc(2.25rem-5px)]">
            {p.feeders.map((f, i) => (
              <li key={f} className="relative" style={{ ['--i' as string]: i }}>
                <span className="hero-feeder absolute left-[5px] top-0 h-7 w-0.5 bg-steel-300/70" />
                <span className="hero-node relative z-10 mt-7 block size-3 rounded-full border-2 border-steel-400 bg-ink" />
                <div className="hero-label mt-3">
                  <span className="mono block text-[0.625rem] text-steel-400">FDR-0{i + 1}</span>
                  <span className="display mt-1 block text-[0.8rem] uppercase leading-[1.05] [overflow-wrap:anywhere] sm:text-lg lg:text-xl xl:text-2xl">{f}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
