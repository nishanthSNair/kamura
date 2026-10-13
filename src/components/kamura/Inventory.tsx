import Link from 'next/link';
import {treatments} from '@/data/treatments';
import {INSTRUMENTS} from '@/data/instruments';
import {COMPOUNDED_PRODUCTS} from '@/data/compounded';
import catalogue from '@/data/therapy-explorer.json';
import r from './Reveal.module.css';
import s from './Inventory.module.css';

/**
 * States plainly what is in the site. Counts are derived, never hardcoded, so
 * the page cannot drift from reality as the libraries grow.
 *
 * Deliberately asymmetric: one dominant row, then a stepped list. An evenly
 * weighted grid of equal cards is what made the rest of the site read as
 * templated.
 */
export default function Inventory() {
  const items = [
    {
      n: treatments.length,
      label: 'treatments graded',
      note: 'Scored on research, safety, access and value — never on advertising.',
      href: '/treatments',
      lead: true,
    },
    {
      n: catalogue.length,
      label: 'therapies mapped to anatomy',
      note: 'See where each one acts, in a 3D body built from open science.',
      href: '/body',
    },
    {
      n: INSTRUMENTS.length,
      label: 'validated screening tools',
      note: 'PHQ-9, GAD-7 and more — each cited, each free to use.',
      href: '/tools',
    },
    {
      n: COMPOUNDED_PRODUCTS.length,
      label: 'compounded medicine guides',
      note: 'The patient leaflet your prescription never came with.',
      href: '/compounded',
    },
  ];

  return (
    <section className={s.wrap} aria-labelledby="inventory-heading">
      <div className={s.head}>
        <span className={s.eyebrow}>What is actually in here</span>
        <h2 id="inventory-heading" data-fx="rise">
          Not a blog.
          <br />
          A reference library.
        </h2>
        <p className={r.reveal}>
          Kamura sells nothing and takes no payment from clinics, pharmacies or brands. Everything below
          is free, cited, and yours to read.
        </p>
      </div>

      <ol className={s.list} data-fx="stagger">
        {items.map((i) => (
          <li key={i.href} className={i.lead ? s.lead : undefined}>
            <Link href={i.href}>
              <span className={s.figure} data-fx="count">{i.n}</span>
              <span className={s.body}>
                <strong>{i.label}</strong>
                <small>{i.note}</small>
              </span>
              <span className={s.go} aria-hidden="true">
                ↗
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <p className={`${s.foot} ${r.reveal}`}>
        Plus a UAE directory of clinics, studios and events, a tool that turns your scattered test reports
        into one document, and {treatments.length > 0 ? 'a journal of' : ''} long-form guides.{' '}
        <Link href="/reports">Start with your reports</Link> or{' '}
        <Link href="/tools">take a screening tool</Link>.
      </p>
    </section>
  );
}
