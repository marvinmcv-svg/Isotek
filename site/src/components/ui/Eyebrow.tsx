export function Eyebrow({ children, code, dark = false, className = '' }: { children: React.ReactNode; code?: string; dark?: boolean; className?: string }) {
  return (
    <p className={`mono flex items-center gap-3 ${dark ? 'text-steel-300' : 'text-steel-600'} ${className}`}>
      <span aria-hidden className="h-px w-8 bg-signal" />
      {code && <span className={dark ? 'text-signal-bright' : 'text-signal-ink'}>{code}</span>}
      <span>{children}</span>
    </p>
  );
}
