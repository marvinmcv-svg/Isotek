import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionNode } from '@/components/ui/SectionNode';
import type { Img } from '@/content/types';

/** Dark page opener used by every inner page. */
export function PageHeader({ eyebrow, title, lead, image, children }: { eyebrow: string; title: string; lead?: string; image?: Img; children?: React.ReactNode }) {
  return (
    <section className="on-dark relative overflow-hidden bg-ink pb-16 pt-32 text-white lg:pb-24 lg:pt-44">
      {image && (
        <Image src={image.src} alt="" fill priority sizes="100vw" className="object-cover opacity-30 grayscale-[30%]" />
      )}
      <div aria-hidden className="grid-lines absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      <div className="container-x relative">
        <div className="relative lg:pl-0">
          <SectionNode dark />
          <Eyebrow dark>{eyebrow}</Eyebrow>
          <h1 className="mt-6 max-w-5xl text-4xl uppercase">{title}</h1>
          {lead && <p className="mt-8 max-w-2xl text-lg text-steel-300 lg:text-xl">{lead}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
