'use client';
import { useEffect } from 'react';

/**
 * Lenis inertial smooth scrolling for wheel/trackpad (touch keeps native scrolling).
 * Lenis drives the real window scroll, so ScrollTrigger and scroll listeners keep working.
 * Off with reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let destroy = () => {};
    let cancelled = false;
    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({ autoRaf: true, lerp: 0.09, anchors: { offset: -80 }, allowNestedScroll: true });
      destroy = () => lenis.destroy();
    });
    return () => { cancelled = true; destroy(); };
  }, []);
  return null;
}
