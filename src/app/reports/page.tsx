import type {Metadata} from 'next';
import Link from 'next/link';
import s from '@/components/kamura/Kamura.module.css';

export const metadata: Metadata = {
  title: 'Combine Your Health Reports Into One Document — Free & Private',
  description:
    'Import blood tests, body composition and imaging reports from PDF, Word, CSV or a photo of a printout. Check what was read, then download one combined document for your next appointment. Files never leave your device.',
  keywords: [
    'combine blood test reports',
    'blood test results explained',
    'merge medical reports',
    'lab report summary',
    'understand my blood test',
    'health report organiser',
    'blood test PDF reader',
    'medical records one document',
  ],
  alternates: {canonical: 'https://kamuralife.com/reports'},
  openGraph: {
    title: 'Combine Your Health Reports Into One Document | KAMURA',
    description:
      'Bring years of scattered lab reports into a single document you can actually use. Processed entirely on your own device.',
    url: 'https://kamuralife.com/reports',
    type: 'website',
  },
};

const STEPS = [
  {
    n: '01',
    t: 'Add your reports',
    d: 'Blood panels, body composition scans, written imaging reports. PDF, Word, CSV, or a photo of a paper printout — scanned pages are read with text recognition. Up to ten files.',
  },
  {
    n: '02',
    t: 'Check what was read',
    d: 'You see exactly what was extracted from each page and can correct it. Nothing is guessed: only rows with a clear name, value, unit and printed reference range are compared automatically.',
  },
  {
    n: '03',
    t: 'Download one document',
    d: 'A single Word file with results outside their printed ranges, measurements repeated across reports, your own notes and questions, and the full original text as an appendix.',
  },
];

const FAQ = [
  {
    q: 'Are my reports uploaded anywhere?',
    a: 'No. Everything happens inside your browser on your own device. Your files are never sent to Kamura, to a server, or to any AI service. Closing the tab clears it.',
  },
  {
    q: 'Does it diagnose or interpret my results?',
    a: 'No, and deliberately so. It consolidates your documents and compares values against the reference ranges printed in your own reports. It does not decide what a result means — that belongs with your clinician.',
  },
  {
    q: 'What if it cannot read something?',
    a: 'Anything not recognised in the supported row format still appears in full in the source appendix. No automatic comparison never means "normal" — it means look at the original.',
  },
  {
    q: 'Which files work?',
    a: 'PDF (including scans), Word, TXT, CSV, and PNG/JPG/WebP photos. You can also paste report text directly. Raw MRI or DICOM image files are not interpreted.',
  },
];

export default function ReportsLanding() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kamura Health Report Combiner',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Any modern browser',
        url: 'https://kamuralife.com/reports',
        description:
          'Combine blood tests, body composition and imaging reports into one document. Processed entirely in the browser.',
        offers: {'@type': 'Offer', price: '0', priceCurrency: 'AED'},
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ.map((x) => ({
          '@type': 'Question',
          name: x.q,
          acceptedAnswer: {'@type': 'Answer', text: x.a},
        })),
      },
    ],
  };

  return (
    <div className={s.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />

      <section className={s.pageHero}>
        <div className={s.container}>
          <span className={s.eyebrow}>Health reports</span>
          <h1>
            Years of test results.
            <br />
            One document.
          </h1>
          <p className={s.lead}>
            Most people keep their health history as a folder of PDFs they cannot read. Bring them
            together, see what changed between them, and walk into your next appointment with one
            document instead of twelve.
          </p>
          <nav className={s.sectionNav} aria-label="Start">
            <Link href="/my/reports">Open the tool</Link>
            <Link href="/compounded">Compounded medicines</Link>
            <Link href="/treatments">Evidence library</Link>
          </nav>
        </div>
      </section>

      <div className={s.container}>
        <section className={s.section}>
          <div className={s.sectionHead}>
            <span className={s.eyebrow}>Processed on your device</span>
            <h2>Your reports never leave your computer.</h2>
            <p>
              This is not a service you upload to. The reading happens inside your own browser — Kamura
              never receives your files, and neither does any AI service. That is a deliberate design
              choice for medical documents, not a limitation.
            </p>
          </div>
        </section>

        <section className={s.section}>
          <div className={s.sectionHead}>
            <span className={s.eyebrow}>How it works</span>
            <h2>Three steps.</h2>
          </div>
          <div className={s.grid}>
            {STEPS.map((x) => (
              <article className={s.card} key={x.n}>
                <div className={s.cardBody}>
                  <small>{x.n}</small>
                  <h3>{x.t}</h3>
                  <p>{x.d}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={s.section}>
          <div className={s.sectionHead}>
            <span className={s.eyebrow}>What you get</span>
            <h2>What ends up in the document.</h2>
          </div>
          <div className={s.grid}>
            <article className={s.card}>
              <div className={s.cardBody}>
                <h3>Results to discuss</h3>
                <p>
                  Every value that falls outside the reference range printed in your own report, with the
                  source file and page beside it.
                </p>
              </div>
            </article>
            <article className={s.card}>
              <div className={s.cardBody}>
                <h3>What changed over time</h3>
                <p>
                  The same measurement found in more than one report, listed together so a trend is
                  visible — with a reminder to confirm the labs are comparable.
                </p>
              </div>
            </article>
            <article className={s.card}>
              <div className={s.cardBody}>
                <h3>Your questions</h3>
                <p>
                  The context and questions you add yourself, so the conversation starts where you want it
                  to rather than at the top of page one.
                </p>
              </div>
            </article>
            <article className={s.card}>
              <div className={s.cardBody}>
                <h3>The original text</h3>
                <p>
                  A full appendix of what each report actually said, so nothing is lost behind a summary
                  and your clinician can check the source.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className={s.section}>
          <div className={s.sectionHead}>
            <span className={s.eyebrow}>Questions</span>
            <h2>Before you start.</h2>
          </div>
          <div className={s.grid}>
            {FAQ.map((x) => (
              <article className={s.card} key={x.q}>
                <div className={s.cardBody}>
                  <h3>{x.q}</h3>
                  <p>{x.a}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={s.feature}>
          <div>
            <span className={s.eyebrow}>Free to use</span>
            <h2>
              Bring your reports
              <br />
              together now.
            </h2>
            <p>
              No account needed to try it. Nothing is uploaded, nothing is sold, and no clinic pays to
              appear here.
            </p>
          </div>
          <div className={s.buttons}>
            <Link href="/my/reports" className={s.primary}>
              Open the tool ↗
            </Link>
            <Link href="/treatments" className={s.secondary}>
              Look up a result
            </Link>
          </div>
        </section>

        <section className={s.section}>
          <p className={s.lead} style={{fontSize: '14px', opacity: 0.75}}>
            This tool organises documents and compares values against the ranges printed inside them. It
            does not diagnose, interpret results, or replace a clinician. An out-of-range value is a
            question to ask, not a conclusion — and no flagged results does not mean everything is normal.
          </p>
        </section>
      </div>
    </div>
  );
}
