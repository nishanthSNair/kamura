import Link from 'next/link';
import {ANCHOR_NAMES, INSTRUMENT_BINDINGS, COMPOUNDED_BINDINGS} from '@/data/body-bindings';
import s from './SeeOnBody.module.css';

/**
 * The return leg of the body binding: a tool or a compounded guide pointing at
 * the organs it concerns, so the anatomy is reachable from the page a reader
 * actually landed on rather than only from the body page itself.
 *
 * Renders nothing when a binding has no anchors. That is a real case, not an
 * oversight — ideal body weight is a height formula and describes no organ, so
 * there is nothing honest to link to.
 */
export default function SeeOnBody({slug, kind}: {slug: string; kind: 'instrument' | 'compounded'}) {
  const binding = kind === 'instrument' ? INSTRUMENT_BINDINGS[slug] : COMPOUNDED_BINDINGS[slug];
  if (!binding?.anchors.length) return null;

  return (
    <aside className={s.wrap}>
      <span className={s.eyebrow}>Where this sits in the body</span>
      <p className={s.basis}>{binding.basis}</p>
      <div className={s.links}>
        {binding.anchors.map((id) => (
          <Link key={id} href={`/body?part=${id}`} className={s.chip}>
            {ANCHOR_NAMES[id] ?? id}
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
