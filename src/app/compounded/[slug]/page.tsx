import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import s from '@/components/kamura/Kamura.module.css';
import {COMPOUNDED_PRODUCTS, EVIDENCE_TONE, getCompounded} from '@/data/compounded';

export function generateStaticParams() {
  return COMPOUNDED_PRODUCTS.map((p) => ({slug: p.slug}));
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params;
  const p = getCompounded(slug);
  if (!p) return {title: 'Not found'};
  return {
    title: `${p.name} — What It Is, The Evidence & What To Ask`,
    description: `${p.verdict} Plain-language explanation, what the evidence actually shows, and the questions to ask your prescriber.`,
    keywords: [p.name, ...p.alsoCalled, 'compounded', 'evidence', 'what to ask'],
    alternates: {canonical: `https://kamuralife.com/compounded/${p.slug}`},
    openGraph: {
      title: `${p.name} | KAMURA`,
      description: p.verdict,
      url: `https://kamuralife.com/compounded/${p.slug}`,
      type: 'article',
    },
  };
}

export default async function CompoundedLeaflet({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const p = getCompounded(slug);
  if (!p) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: p.name,
    description: p.verdict,
    url: `https://kamuralife.com/compounded/${p.slug}`,
    publisher: {'@type': 'Organization', name: 'KAMURA'},
  };

  return (
    <div className={s.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />

      <section className={s.pageHero}>
        <div className={s.container}>
          <span className={s.eyebrow}>Compounded medicines / {p.category}</span>
          <h1>{p.name}</h1>
          <p className={s.lead}>{p.verdict}</p>
          <nav className={s.sectionNav} aria-label="Related">
            <Link href="/compounded">All compounded medicines</Link>
            <Link href="/treatments">Evidence library</Link>
          </nav>
        </div>
      </section>

      <div className={s.container}>
        <section className={s.section}>
          <div className={s.grid}>
            <article className={s.card}>
              <div className={s.cardBody}>
                <small>ON YOUR PRESCRIPTION IT MAY SAY</small>
                <p>{p.alsoCalled.join(' · ')}</p>
              </div>
            </article>
            <article className={s.card}>
              <div className={s.cardBody}>
                <small>EVIDENCE</small>
                <h3>{p.evidence.strength}</h3>
                <p>{EVIDENCE_TONE[p.evidence.strength]}</p>
              </div>
            </article>
          </div>
        </section>

        <section className={s.section}>
          <div className={s.sectionHead}>
            <span className={s.eyebrow}>What it is</span>
            <h2>The plain explanation.</h2>
          </div>
          <p className={s.lead}>{p.whatItIs}</p>
          <p className={s.lead} style={{opacity: 0.85}}>
            <strong>Why it is compounded rather than manufactured: </strong>
            {p.whyCompounded}
          </p>
        </section>

        <section className={s.section}>
          <div className={s.sectionHead}>
            <span className={s.eyebrow}>The evidence</span>
            <h2>What the research actually shows.</h2>
          </div>
          <p className={s.lead}>{p.evidence.summary}</p>
        </section>

        <section className={s.section}>
          <div className={s.sectionHead}>
            <span className={s.eyebrow}>Do you actually need it?</span>
            <h2>The question a seller will not ask you.</h2>
          </div>
          <p className={s.lead}>{p.doYouNeedIt}</p>
          <div className={s.grid}>
            <article className={s.card}>
              <div className={s.cardBody}>
                <small>REASONABLY CONSIDERED FOR</small>
                <ul>
                  {p.consideredFor.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </article>
            <article className={s.card}>
              <div className={s.cardBody}>
                <small>WATCH FOR</small>
                <ul>
                  {p.watchFor.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section className={s.section}>
          <div className={s.sectionHead}>
            <span className={s.eyebrow}>Take this to your appointment</span>
            <h2>Ask your prescriber.</h2>
          </div>
          <div className={s.grid}>
            {p.askYourPrescriber.map((q, i) => (
              <article className={s.card} key={q}>
                <div className={s.cardBody}>
                  <small>{String(i + 1).padStart(2, '0')}</small>
                  <p>{q}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {p.relatedTreatments && p.relatedTreatments.length > 0 && (
          <section className={s.section}>
            <div className={s.sectionHead}>
              <span className={s.eyebrow}>Go deeper</span>
              <h2>Scored evidence for the ingredients.</h2>
            </div>
            <div className={s.grid}>
              {p.relatedTreatments.map((t) => (
                <Link className={s.card} href={`/treatments/${t.slug}`} key={t.slug}>
                  <div className={s.cardBody}>
                    <h3>{t.label}</h3>
                    <span>Kamura Score ↗</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className={s.feature}>
          <div>
            <span className={s.eyebrow}>Already taking it?</span>
            <h2>
              Bring your results
              <br />
              into one document.
            </h2>
            <p>
              Import your blood tests and clinic reports, check what was extracted, and download a single
              combined document for your next appointment. Everything is processed on your own device.
            </p>
          </div>
          <div className={s.buttons}>
            <Link href="/reports" className={s.primary}>
              Combine your reports ↗
            </Link>
            <Link href="/compounded" className={s.secondary}>
              Other compounded medicines
            </Link>
          </div>
        </section>

        <section className={s.section}>
          <p className={s.lead} style={{fontSize: '14px', opacity: 0.75}}>
            Kamura sells no medicines and takes no payment from pharmacies, clinics or brands. This page is
            educational and is not medical advice, a diagnosis, or a recommendation to start or stop any
            treatment. Never change a prescription without speaking to the clinician who wrote it.
          </p>
        </section>
      </div>
    </div>
  );
}
