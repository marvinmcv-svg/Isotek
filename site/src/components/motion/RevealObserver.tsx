'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** One IntersectionObserver for every [data-reveal] / [data-reveal-img] / [data-node] element. */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    (window as unknown as { __reveal: boolean }).__reveal = true;
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in),[data-reveal-img]:not(.is-in),[data-node]:not(.is-in)');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
