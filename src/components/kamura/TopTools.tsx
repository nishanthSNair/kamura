import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {INSTRUMENTS, LICENCE_LABEL} from '@/data/instruments';
import s from './TopTools.module.css';

/**
 * The tools block.
 *
 * Health portals put a tools rail on the homepage because it is the one thing
 * a visitor can *do* rather than read, and it is the reason they come back.
 * Kamura's version differs from theirs in one way that matters: every tool
 * here is public domain, free with attribution, or a published formula, and
 * the licence is stated on the card. A symptom checker that exists to collect
 * an email is not the same product.
 *
 * Ordered by how often the underlying question gets asked rather than
 * alphabetically, so the two mental-health screens lead. Counts and times are
 * read from the instrument data, never retyped.
 */

const ORDER = [
  'depression-phq9',
  'anxiety-gad7',
  'fasting-glucose',
  'body-fat-navy',
  'bmi',
  'pack-years',
  'ideal-body-weight',
];

export default function TopTools() {
  const tools = ORDER.map((slug) => INSTRUMENTS.find((i) => i.slug === slug)).filter(
    (i): i is NonNullable<typeof i> => Boolean(i),
  );

  return (
    <section className={s.wrap} aria-labelledby="tools-heading">
      <div className={s.head}>
        <div>
          <span className={s.eyebrow}>Top tools</span>
          <h2 id="tools-heading">
            Answer a question about
            <br />
            yourself in three minutes.
          </h2>
        </div>
        <p className={s.note}>
          Every tool is scored on your device. Nothing is uploaded, nothing is stored, and no
          email is asked for.
        </p>
      </div>

      <ol className={s.list} data-fx="stagger">
        {tools.map((t, i) => (
          <li key={t.slug}>
            <Link href={`/tools/${t.slug}`}>
              <span className={s.index}>{String(i + 1).padStart(2, '0')}</span>
              <span className={s.body}>
                <strong>{t.name}</strong>
                <small>{t.short}</small>
              </span>
              <span className={s.meta}>
                <em>{t.category}</em>
                <span>{t.minutes} min · {LICENCE_LABEL[t.licence]}</span>
              </span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ol>

      <div className={s.foot}>
        <Link href="/tools" className={s.ghost}>
          All {INSTRUMENTS.length} tools <ArrowUpRight size={15} />
        </Link>
        <Link href="/reports" className={s.ghost}>
          Turn your test reports into one document <ArrowUpRight size={15} />
        </Link>
      </div>
    </section>
  );
}
