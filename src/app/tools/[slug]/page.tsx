import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import k from '@/components/kamura/Kamura.module.css';
import InstrumentRunner from '@/components/kamura/InstrumentRunner';
import {INSTRUMENTS, LICENCE_LABEL, getInstrument} from '@/data/instruments';
import SeeOnBody from '@/components/kamura/SeeOnBody';

export function generateStaticParams() {
  return INSTRUMENTS.map((i) => ({slug: i.slug}));
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params;
  const i = getInstrument(slug);
  if (!i) return {title: 'Not found'};
  return {
    title: `${i.name} — Free, Validated & Scored Privately`,
    description: `${i.short} ${LICENCE_LABEL[i.licence]}, cited to ${i.source.citation.split('.')[0]}. Scored in your browser — nothing uploaded.`,
    alternates: {canonical: `https://kamuralife.com/tools/${i.slug}`},
    openGraph: {
      title: `${i.name} | KAMURA`,
      description: i.short,
      url: `https://kamuralife.com/tools/${i.slug}`,
      type: 'article',
    },
  };
}

export default async function ToolPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const instrument = getInstrument(slug);
  if (!instrument) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        name: instrument.name,
        url: `https://kamuralife.com/tools/${instrument.slug}`,
        dateModified: instrument.reviewed,
        citation: instrument.source.url,
        publisher: {'@type': 'Organization', name: 'KAMURA'},
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {'@type': 'ListItem', position: 1, name: 'Health tools', item: 'https://kamuralife.com/tools'},
          {'@type': 'ListItem', position: 2, name: instrument.name},
        ],
      },
    ],
  };

  return (
    <div className={k.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />

      <section className={k.pageHero}>
        <div className={k.container}>
          <span className={k.eyebrow}>
            <Link href="/tools">Health tools</Link> / {instrument.category}
          </span>
          <h1>{instrument.name}</h1>
          <p className={k.lead}>{instrument.short}</p>
          <p style={{fontSize: 13, color: '#6E8A80', marginTop: 14}}>
            {LICENCE_LABEL[instrument.licence]} · ~{instrument.minutes} min · Reviewed{' '}
            {new Date(instrument.reviewed).toLocaleDateString('en-GB', {month: 'long', year: 'numeric'})} ·
            Scored on your device
          </p>
        </div>
      </section>

      <div className={k.container}>
        <section className={k.section}>
          <InstrumentRunner slug={instrument.slug} />
        </section>

        <section className={k.section}>
          <div className={k.grid}>
            <article className={k.card}>
              <div className={k.cardBody}>
                <small>WHAT THIS DOES NOT DO</small>
                <ul>
                  {instrument.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
            </article>
            <article className={k.card}>
              <div className={k.cardBody}>
                <small>SOURCE &amp; LICENCE</small>
                <p>{instrument.source.citation}</p>
                <p style={{fontSize: 13, opacity: 0.8}}>{instrument.licenceNote}</p>
                <a href={instrument.source.url} target="_blank" rel="noreferrer">
                  Read the original{instrument.source.pmid ? ` · PMID ${instrument.source.pmid}` : ''} ↗
                </a>
              </div>
            </article>
          </div>
        </section>

        <SeeOnBody slug={instrument.slug} kind="instrument" />

        <section className={k.feature}>
          <div>
            <span className={k.eyebrow}>Make it useful</span>
            <h2>
              Take the result
              <br />
              to your appointment.
            </h2>
            <p>
              A score on its own changes nothing. Combine it with your existing test reports into one
              document you can hand over — processed entirely on your own device.
            </p>
          </div>
          <div className={k.buttons}>
            <Link href="/reports" className={k.primary}>
              Build my appointment document ↗
            </Link>
            <Link href="/tools" className={k.secondary}>
              All health tools
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
