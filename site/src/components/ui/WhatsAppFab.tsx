import { waLink } from '@/lib/site';

export function WhatsAppGlyph({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}

export function WhatsAppFab({ number, label }: { number: string; label: string }) {
  return (
    <a
      href={waLink(number)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed bottom-4 right-4 z-40 grid size-14 place-items-center rounded-full bg-ink text-white shadow-[0_8px_30px_rgb(0_0_0/0.3)] ring-1 ring-white/15 transition-transform duration-300 ease-out hover:scale-105 sm:bottom-6 sm:right-6"
    >
      <WhatsAppGlyph className="size-6" />
      <span aria-hidden className="absolute right-1 top-1 size-2.5 rounded-full bg-signal ring-2 ring-ink" />
    </a>
  );
}
