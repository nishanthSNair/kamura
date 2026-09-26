import CompoundedDirectory from '@/components/kamura/CompoundedDirectory';
import type {Metadata} from 'next';
import Link from 'next/link';
import s from '@/components/kamura/Kamura.module.css';

export const metadata: Metadata = {
  title: 'Compounded Medicines Explained — What They Are & Whether You Need One',
  description:
    'Plain explanations of bioidentical hormone creams, compounded peptides, GLP-1, topical NAD+ and custom skin preparations — what the evidence shows and what to ask your prescriber.',
  keywords: [
    'compounded medicine',
    'what is compounding pharmacy',
    'bioidentical hormones explained',
    'BHRT cream',
    'compounded semaglutide',
    'compounded peptides',
    'is compounded medication safe',
    'compounding pharmacy UAE',
    'Bi-Est cream',
    'do I need bioidentical hormones',
  ],
  alternates: {canonical: 'https://kamuralife.com/compounded'},
  openGraph: {
    title: 'Compounded Medicines Explained | KAMURA',
    description:
      'Understand your compounded prescription. What they are, what the evidence shows, and what to ask before you start.',
    url: 'https://kamuralife.com/compounded',
    type: 'website',
  },
};

const QUESTIONS = [
  {
    q: 'What is a compounded medicine?',
    a: 'A medicine mixed by a pharmacy for one person, rather than manufactured in batches and packaged by a pharmaceutical company. The pharmacist combines the active ingredients into a cream, capsule, vial or solution at a strength written on that prescription.',
  },
  {
    q: 'Why does compounding exist?',
    a: 'For real clinical reasons: a dose that is not manufactured, an allergy to a filler in the commercial product, difficulty swallowing a tablet, a discontinued medicine, or a combination not sold ready-made. Hospital and dermatology pharmacies have compounded for decades.',
  },
  {
    q: 'So what is different about it?',
    a: 'A manufactured medicine is tested batch by batch, comes with an approved leaflet, and carries evidence from trials of that exact product. A compounded preparation is made to order. It is not individually trial-tested, and the strength you absorb can vary more. That is an accepted trade-off when there is a reason for it — and an unnecessary risk when there is not.',
  },
  {
    q: 'Does "bioidentical" or "natural" mean safer?',
    a: 'No. "Bioidentical" describes the molecule being structurally identical to one your body makes — which is also true of several regulated, manufactured products. It says nothing about whether the preparation was made accurately, and it does not remove the risks of the hormone itself.',
  },
  {
    q: 'How do I know the pharmacy is legitimate?',
    a: 'Ask which authority licenses the pharmacy and verify that directly. Ask for ingredient, concentration, storage, expiry and quality information for your preparation.',
  },
];

export default function CompoundedHub() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: QUESTIONS.map((x) => ({
      '@type': 'Question',
      name: x.q,
      acceptedAnswer: {'@type': 'Answer', text: x.a},
    })),
  };

  return (
    <div className={s.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />

      <section className={s.pageHero}>
        <div className={s.container}>
          <span className={s.eyebrow}>Compounded medicines</span>
          <h1>
            Understand what’s<br/>in your prescription.
          </h1>
          <p className={s.lead}>
            Explore the ingredients, understand what the evidence applies to and prepare useful questions for your prescriber.
          </p>
          <nav className={s.sectionNav} aria-label="Related sections">
            <Link href="/treatments">Evidence library</Link>
            <Link href="/body">Explore the body</Link>
            <Link href="/reports">Combine your reports</Link>
          </nav>
        </div>
      </section>

      <div className={s.container}>
        <section className={s.section}>
          <div className={s.sectionHead}>
            <span className={s.eyebrow}>Start here</span>
            <h2>Find what you were prescribed.</h2>
            <p>
              Search the name on your prescription or choose a category. Every guide separates ingredient evidence from formulation evidence.
            </p>
          </div>
          <CompoundedDirectory/>
        </section>

        <section className={s.section}>
          <div className={s.sectionHead}>
            <span className={s.eyebrow}>The basics</span>
            <h2>Questions worth answering first.</h2>
          </div>
          <div className={s.grid}>
            {QUESTIONS.map((x) => (
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
            <span className={s.eyebrow}>Before you start anything</span>
            <h2>
              Five questions that
              <br />
              work for any compounded medicine.
            </h2>
            <ol style={{lineHeight:2,paddingLeft:20}}><li>What is each ingredient intended to do?</li><li>Why this formulation rather than a manufactured option?</li><li>Which research matches my situation?</li><li>How and when will we review the result?</li><li>What quality and storage information should I have?</li></ol>
          </div>
          <div className={s.buttons}>
            <Link href="/treatments" className={s.primary}>
              Explore treatment evidence ↗
            </Link>
            <Link href="/reports" className={s.secondary}>
              Bring your results together
            </Link>
          </div>
        </section>

        <section className={s.section}>
          <p className={s.lead} style={{fontSize: '14px', opacity: 0.75}}>
            Use these guides to prepare questions and check the sources. Discuss changes to a prescription with the clinician who knows your history.
          </p>
        </section>
      </div>
    </div>
  );
}
