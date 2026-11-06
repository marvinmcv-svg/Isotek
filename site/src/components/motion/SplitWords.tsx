import { Fragment } from 'react';

/**
 * Splits a heading into words that rise into view when the parent [data-reveal].split
 * gets .is-in (RevealObserver). Screen readers get the plain text via aria-label on the parent.
 */
export function SplitWords({ text }: { text: string }) {
  return text.split(' ').map((w, i) => (
    <Fragment key={i}>
      {i > 0 && ' '}
      <span aria-hidden className="split-w"><span style={{ ['--i' as string]: i }}>{w}</span></span>
    </Fragment>
  ));
}
