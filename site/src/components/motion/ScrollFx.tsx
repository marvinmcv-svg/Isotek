'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Scroll-scrubbed motion (GSAP ScrollTrigger), driven by data attributes:
 *  - data-parallax="12"  image drifts ±12% inside its (overflow-hidden) parent
 *  - data-speed="0.6"    element moves at a different rate than the page (±60px·speed)
 *  - data-scrub-x="-50"  element slides horizontally to -50% while its section crosses the viewport
 * Transforms only, so content is fully visible if this never runs. Off with reduced motion.
 */
export function ScrollFx() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let revert = () => {};
    let cancelled = false;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        const range = (trigger: Element) => ({ trigger, start: 'top bottom', end: 'bottom top', scrub: 0.6 });
        document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
          const a = parseFloat(el.dataset.parallax || '10');
          gsap.fromTo(el, { yPercent: -a }, { yPercent: a, ease: 'none', scrollTrigger: range(el.parentElement || el) });
        });
        document.querySelectorAll<HTMLElement>('[data-speed]').forEach((el) => {
          const s = parseFloat(el.dataset.speed || '0.5') * 60;
          gsap.fromTo(el, { y: s }, { y: -s, ease: 'none', scrollTrigger: range(el) });
        });
        document.querySelectorAll<HTMLElement>('[data-scrub-x]').forEach((el) => {
          const x = parseFloat(el.dataset.scrubX || '-50');
          gsap.fromTo(el, { xPercent: x < 0 ? 0 : -x }, { xPercent: x < 0 ? x : 0, ease: 'none', scrollTrigger: range(el.closest('section') || el) });
        });
      });
      revert = () => ctx.revert();
    })();
    return () => { cancelled = true; revert(); };
  }, [pathname]);
  return null;
}
