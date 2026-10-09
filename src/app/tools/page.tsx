import type {Metadata} from 'next';
import Link from 'next/link';
import k from '@/components/kamura/Kamura.module.css';
import {INSTRUMENTS, LICENCE_LABEL} from '@/data/instruments';

export const metadata: Metadata = {
  title: 'Free Health Screening Tools — Validated, Cited & Private',
  description:
    'Validated screening questionnaires and clinical calculators — PHQ-9, GAD-7, BMI, body fat, pack-years, fasting glucose. Every tool names its source and licence, scores in your browser, and sells you nothing.',
  keywords: [
    'PHQ-9 test online',
    'GAD-7 anxiety test',
    'free depression screening',
    'BMI calculator',
    'body fat calculator',
    'pack year calculator',
    'fasting glucose meaning',
    'validated health questionnaire',
    'health screening tools UAE',
  ],
  alternates: {canonical: 'https://kamuralife.com/tools'},
  openGraph: {
    title: 'Free Health Screening Tools | KAMURA',
    description: 'Validated instruments, every one cited and free to use. Scored in your browser.',
    url: 'https://kamuralife.com/tools',
    type: 'website',
  },
};

export default function ToolsHub() {
  const byCategory = INSTRUMENTS.reduce<Record<string, typeof INSTRUMENTS>>((acc, i) => {
    (acc[i.category] ||= []).push(i);
    return acc;
  }, {});

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Kamura health screening tools',
    numberOfItems: INSTRUMENTS.length,
    itemListElement: INSTRUMENTS.map((i, n) => ({
      '@type': 'ListItem',
      position: n + 1,
      name: i.name,
      url: `https://kamuralife.com/tools/${i.slug}`,
    })),
  };

  return (
    <div className={k.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />

      <section className={k.pageHero}>
        <div className={k.container}>
          <span className={k.eyebrow}>Health tools</span>
          <h1>
            Validated screens.
            <br />
            Cited, free, and private.
          </h1>
          <p className={k.lead}>
            The same questionnaires and formulas clinicians use — published instruments reproduced exactly,
            each naming its source and its licence. Scored in your browser, nothing uploaded, nothing sold.
          </p>
          <nav className={k.sectionNav} aria-label="Related">
            <Link href="/reports">Combine your reports</Link>
            <Link href="/treatments">Evidence library</Link>
            <Link href="/compounded">Compounded medicines</Link>
          </nav>
        </div>
      </section>

      <div className={k.container}>
        {Object.entries(byCategory).map(([category, items]) => (
          <section className={k.section} key={category}>
            <div className={k.sectionHead}>
              <span className={k.eyebrow}>{category}</span>
              <h2>{category === 'Mental health' ? 'Mind' : category}</h2>
            </div>
            <div className={k.grid}>
              {items.map((i) => (
                <Link className={k.card} href={`/tools/${i.slug}`} key={i.slug}>
                  <div className={k.cardBody}>
                    <small>
                      {LICENCE_LABEL[i.licence].toUpperCase()} · ~{i.minutes} MIN
                    </small>
                    <h3>{i.name}</h3>
                    <p>{i.short}</p>
                    <span>Open the tool ↗</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section className={k.feature}>
          <div>
            <span className={k.eyebrow}>Why these and not others</span>
            <h2>
              If we cannot cite it,
              <br />
              we do not publish it.
            </h2>
            <p>
              Every tool here is either public domain, free with attribution, or a formula published in the
              open literature — and each page shows which, with the original paper. Several popular screens
              are deliberately missing: STOP-BANG, FRAX, the Epworth Sleepiness Scale and the MDQ all require
              licences we do not hold. FRAX in particular has unpublished equations, so any copy of it
              elsewhere on the internet is an approximation rather than the real tool.
            </p>
          </div>
          <div className={k.buttons}>
            <Link href="/treatments/methodology" className={k.primary}>
              How Kamura grades evidence ↗
            </Link>
          </div>
        </section>

        <section className={k.section}>
          <p className={k.lead} style={{fontSize: '14px', opacity: 0.75}}>
            These tools screen; they do not diagnose. A score is a reason to have a conversation, never a
            conclusion. Kamura sells no treatments and takes no payment from clinics, pharmacies or brands.
            If you are in crisis, contact emergency services on 999, or 998 for an ambulance in the UAE.
          </p>
        </section>
      </div>
    </div>
  );
}
