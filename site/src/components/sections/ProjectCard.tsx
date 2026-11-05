import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { countryName, tr } from '@/lib/site';
import type { Locale, Project } from '@/content/types';

export function ProjectCard({ p, locale, index = 0, size = 'md', priority = false }: { p: Project; locale: Locale; index?: number; size?: 'md' | 'lg'; priority?: boolean }) {
  const img = p.images[0];
  return (
    <Link href={`/proyectos/${p.slug}`} className="group block" data-reveal style={{ ['--d' as string]: `${(index % 3) * 80}ms` }}>
      <div className={`relative overflow-hidden bg-ink-2 ${size === 'lg' ? 'aspect-[4/3] lg:aspect-[16/10]' : 'aspect-[4/3]'}`}>
        {img && (
          <Image
            src={img.src}
            alt={tr(img.alt, locale)}
            fill
            priority={priority}
            sizes={size === 'lg' ? '(min-width: 1024px) 58vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        )}
        <span className="mono absolute left-3 top-3 bg-ink/85 px-2 py-1 text-white">{tr(countryName[p.country], locale)}</span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4 border-t border-current/15 pt-4">
        <div>
          <p className="mono text-steel-600 transition-colors group-hover:text-signal-ink">{p.client}</p>
          <h3 className="display mt-2 text-xl uppercase leading-tight">{tr(p.title, locale)}</h3>
        </div>
        <svg aria-hidden viewBox="0 0 16 16" className="mt-1 size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M1 8h13M9 3l5 5-5 5" /></svg>
      </div>
    </Link>
  );
}
