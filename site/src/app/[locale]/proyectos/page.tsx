import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/sections/PageHeader';
import { ProjectsExplorer } from '@/components/sections/ProjectsExplorer';
import { CtaBand } from '@/components/sections/CtaBand';
import { getIndustries, getProjects } from '@/content';
import { alternates } from '@/lib/site';
import type { Locale } from '@/content/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });
  return { title: t('metaTitle'), description: t('metaDescription'), alternates: alternates(locale, '/proyectos'), openGraph: { title: t('metaTitle'), description: t('metaDescription'), images: ['/media/projects/alcoenergy-1.jpg'] } };
}

export default async function Projects({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, projects, industries] = await Promise.all([getTranslations('projects'), getProjects(), getIndustries()]);
  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} image={projects.find((p) => p.slug.startsWith('alcoenergy'))?.images[0]} />
      <section className="bg-paper py-16 lg:py-24">
        <div className="container-x">
          <ProjectsExplorer projects={projects} industries={industries} locale={locale} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
