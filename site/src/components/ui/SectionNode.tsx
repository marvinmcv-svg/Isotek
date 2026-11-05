/**
 * A node on the page busbar. Sits in the left gutter (lg+) and "energises" when it
 * scrolls into view (RevealObserver adds .is-in). Purely decorative.
 */
export function SectionNode({ code, dark = false }: { code?: string; dark?: boolean }) {
  return (
    <span aria-hidden data-node className="group/node pointer-events-none absolute -left-[2.25rem] top-1.5 hidden items-center lg:flex">
      <span
        className={`relative size-3 rounded-full border-2 transition-[background-color,border-color,box-shadow,transform] duration-300 ease-snap group-[.is-in]/node:scale-110 group-[.is-in]/node:border-signal group-[.is-in]/node:bg-signal group-[.is-in]/node:shadow-[0_0_0_5px_rgb(228_30_24/0.18)] ${
          dark ? 'border-steel-400 bg-ink' : 'border-steel-600 bg-paper'
        }`}
      />
      {code && <span className={`mono absolute left-6 whitespace-nowrap text-[0.625rem] ${dark ? 'text-steel-400' : 'text-steel-600'}`}>{code}</span>}
    </span>
  );
}
