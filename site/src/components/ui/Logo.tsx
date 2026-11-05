import Image from 'next/image';

export function Logo({ tone = 'light', className = '' }: { tone?: 'light' | 'dark'; className?: string }) {
  // Only raster logos exist (see MISSING_CONTENT.md). Rendered at ≤ native size / 2 for crisp retina output.
  return tone === 'light' ? (
    <Image src="/media/brand/logo-white.png" alt="ISOTEK LATAM" width={266} height={100} priority className={className} sizes="140px" />
  ) : (
    <Image src="/media/brand/logo-black.png" alt="ISOTEK LATAM" width={266} height={100} className={className} sizes="140px" />
  );
}
