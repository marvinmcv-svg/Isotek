'use client';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { ProjectCard } from './ProjectCard';
import { countryName, tr } from '@/lib/site';
import type { Industry, Locale, Project } from '@/content/types';

export function ProjectsExplorer({ projects, industries, locale }: { projects: Project[]; industries: Industry[]; locale: Locale }) {
  const t = useTranslations('projects');
  const c = useTranslations('common');
  const reduce = useReducedMotion();
  const [country, setCountry] = useState('');
  const [industry, setIndustry] = useState('');
  const usedIndustries = industries.filter((i) => projects.some((p) => p.industry === i.slug));
  const list = useMemo(() => projects.filter((p) => (!country || p.country === country) && (!industry || p.industry === industry)), [projects, country, industry]);

  const chip = (active: boolean) =>
    `mono min-h-10 border px-3 py-2 transition-colors ${active ? 'border-ink bg-ink text-white' : 'border-steel-150 text-steel-600 hover:border-ink hover:text-ink'}`;

  return (
    <>
      <div className="flex flex-col gap-6 border-b border-steel-150 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <fieldset>
            <legend className="mono mb-2 text-steel-600">{t('filterCountry')}</legend>
            <div className="flex flex-wrap gap-2">
              {['', 'BO', 'PY'].map((k) => (
                <button key={k || 'all'} type="button" aria-pressed={country === k} onClick={() => setCountry(k)} className={chip(country === k)}>
                  {k ? tr(countryName[k], locale) : c('all')}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="mono mb-2 text-steel-600">{t('filterIndustry')}</legend>
            <div className="flex flex-wrap gap-2">
              <button type="button" aria-pressed={industry === ''} onClick={() => setIndustry('')} className={chip(industry === '')}>{c('all')}</button>
              {usedIndustries.map((i) => (
                <button key={i.slug} type="button" aria-pressed={industry === i.slug} onClick={() => setIndustry(i.slug)} className={chip(industry === i.slug)}>{tr(i.name, locale)}</button>
              ))}
            </div>
          </fieldset>
        </div>
        <p className="mono text-steel-600" aria-live="polite">{t('count', { count: list.length })}</p>
      </div>

      {list.length === 0 ? (
        <p className="py-24 text-center text-steel-600">{t('empty')}</p>
      ) : (
        <motion.ul layout={!reduce} className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.li
                key={p.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard p={p} locale={locale} index={i} headingLevel={2} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </>
  );
}
