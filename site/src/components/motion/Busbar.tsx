'use client';
import { useEffect, useRef } from 'react';

/**
 * The page-long busbar: a hairline track in the left gutter (lg+) with a red
 * conductor that fills as you scroll. GSAP ScrollTrigger scrubs it to scroll position.
 * Decorative only; static (full track, no fill) without JS or with reduced motion.
 */
export function Busbar() {
  const fill = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Busbar is only visible at lg+; don't download GSAP on phones/tablets.
    if (!fill.current || !window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)').matches) return;
    let kill = () => {};
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      gsap.registerPlugin(ScrollTrigger);
      const tween = gsap.fromTo(
        fill.current,
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '#main', start: 'top top', end: 'bottom bottom', scrub: 0.4 } },
      );
      kill = () => { tween.scrollTrigger?.kill(); tween.kill(); };
    })();
    return () => kill();
  }, []);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
      <div className="container-x relative h-full">
        <div className="absolute bottom-0 left-[calc(1.25rem+5px)] top-0 w-0.5 bg-steel-400/25">
          <div ref={fill} className="h-full w-full origin-top scale-y-0 bg-signal" />
        </div>
      </div>
    </div>
  );
}
