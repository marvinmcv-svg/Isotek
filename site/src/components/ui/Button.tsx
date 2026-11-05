import type { ComponentProps } from 'react';
import { Link } from '@/i18n/navigation';

type Variant = 'primary' | 'ghost-dark' | 'ghost-light';
const base =
  'group relative inline-flex min-h-12 items-center gap-3 overflow-hidden px-6 py-3 font-semibold tracking-tight transition-colors duration-300 ease-out';
const variants: Record<Variant, string> = {
  primary: 'bg-signal text-white',
  'ghost-dark': 'border border-white/35 text-white hover:border-white',
  'ghost-light': 'border border-ink/30 text-ink hover:border-ink',
};

function Inner({ children, variant }: { children: React.ReactNode; variant: Variant }) {
  return (
    <>
      <span
        aria-hidden
        className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 ${
          variant === 'primary' ? 'bg-ink' : variant === 'ghost-dark' ? 'bg-white/10' : 'bg-ink/5'
        }`}
      />
      <span className="relative">{children}</span>
      <svg aria-hidden viewBox="0 0 16 16" className="relative size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M1 8h13M9 3l5 5-5 5" />
      </svg>
    </>
  );
}

export function ButtonLink({ variant = 'primary', className = '', children, ...props }: ComponentProps<typeof Link> & { variant?: Variant }) {
  return (
    <Link {...props} className={`${base} ${variants[variant]} ${className}`}>
      <Inner variant={variant}>{children}</Inner>
    </Link>
  );
}

export function ButtonA({ variant = 'primary', className = '', children, ...props }: ComponentProps<'a'> & { variant?: Variant }) {
  return (
    <a {...props} className={`${base} ${variants[variant]} ${className}`}>
      <Inner variant={variant}>{children}</Inner>
    </a>
  );
}
