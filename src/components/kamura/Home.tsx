import Link from 'next/link';
import Image from 'next/image';
import {ArrowUpRight, MoveUpRight} from 'lucide-react';
import Hero from './Hero';
import TopNews from './TopNews';
import TopTools from './TopTools';
import HomeBody from './HomeBody';
import HomeMotion from './HomeMotion';
import MediaBand from './MediaBand';
import {treatments} from '@/data/treatments';
import {INSTRUMENTS} from '@/data/instruments';
import x from './Scroll.module.css';
import s from './Kamura.module.css';

/**
 * The homepage.
 *
 * Seven sections, in a deliberate order. Measuring WebMD, Healthline, Medical
 * News Today and Harvard Health gave a canonical structure — editorial is the
 * first content block on all four, and tools follow it — but also a failure
 * mode worth avoiding: WebMD runs fourteen equally weighted sections and so
 * answers nobody's question about what matters today. The count here is held
 * down on purpose.
 *
 * Two places this deliberately departs from the category:
 *
 *   The hero states what is in the library as figures. None of the four says
 *   what it holds; a visitor who cannot tell in a few seconds whether a site
 *   has anything for them leaves.
 *
 *   The body gets a band of its own rather than being a link in a nav. Not one
 *   of the four embeds an interactive tool on its homepage — every calculator
 *   and symptom checker is a destination. The anatomy is the thing Kamura has
 *   that they do not, so it is on the page, not behind it.
 */

const OUTCOMES = treatments.reduce((n, t) => n + (t.outcomes?.length ?? 0), 0);

const PANELS = [
  {
    index: 'ONE',
    title: 'Start with your own body, not a search box.',
    text: `Choose a structure and Kamura answers with the lab values that reflect it, the tools that measure it, and the graded research bound to it — ${OUTCOMES} outcomes in all, each tied to one treatment and one finding.`,
    href: '/body',
    cta: 'Open the body',
  },
  {
    index: 'TWO',
    title: 'Read the evidence without the marketing.',
    text: `${treatments.length} treatments graded on research, safety, access and value. Nobody pays to appear here, and where the evidence is thin the grade says so rather than going quiet.`,
    href: '/treatments',
    cta: 'Browse the evidence',
  },
  {
    index: 'THREE',
    title: 'Leave with something you can hand to a doctor.',
    text: `${INSTRUMENTS.length} validated screening tools and your own scattered test reports, combined into one appointment document. Everything is processed on your device — nothing is uploaded.`,
    href: '/reports',
    cta: 'Build your document',
  },
];

const DIRECTORY = [
  {
    title: 'Classes & studios',
    text: 'Yoga, Pilates, breathwork and more. Explore studios by discipline and emirate.',
    href: '/classes',
    label: 'Move & restore',
  },
  {
    title: 'Care & services',
    text: 'Explore the kinds of care Kamura is bringing together. Provider booking is in development.',
    href: '/explore',
    label: 'Find care',
  },
  {
    title: 'Events & ideas',
    text: 'Discover wellness events, workshops and conversations around longevity.',
    href: '/events',
    label: 'Meet & learn',
  },
];

export default function Home() {
  return (
    <div className={s.page}>
      <HomeMotion />

      {/* 1 · The hero states what is here. */}
      <Hero />

      {/* 2 · Editorial, the first content block — the one thing every health
             portal agrees on. `lift` overlaps the hero: occlusion is the
             strongest pictorial depth cue there is, and it costs nothing. */}
      <div className={`${s.container} ${s.lift}`}>
        <TopNews />

        {/* 3 · Tools, adjacent to the news rather than buried at block 11. */}
        <TopTools />
      </div>

      {/* 4 · The body. The thing none of the portals have. */}
      <HomeBody />

      <div className={s.container}>
        {/* 5 · How it works — one visual held while three claims pass it. */}
        <section className={x.pinned} aria-labelledby="how-heading">
          <h2 id="how-heading" className={s.srOnly}>
            How Kamura works
          </h2>
          <div className={x.pinnedMedia}>
            <Image
              src="/images/body-home-poster.png"
              alt="Anatomical model showing muscle and skeletal structure"
              width={640}
              height={1344}
              sizes="(max-width:900px) 90vw, 44vw"
              className={x.drift}
              data-fx="drift"
              style={{width: 'auto', height: '112%', objectFit: 'contain'}}
            />
          </div>
          <div className={x.pinnedPanels}>
            {PANELS.map((p) => (
              <article className={x.panel} key={p.index}>
                <span className={x.panelIndex}>{p.index}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <Link href={p.href}>
                  {p.cta} <ArrowUpRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>

      <MediaBand
        video="/video/transition-reports.mp4"
        poster="/images/texture/reports-poster.jpg"
        alt="Translucent paper edges in raking daylight"
        caption="Bring it together"
      />

      <div className={s.container}>
        {/* 6 · The reason to come back. */}
        <section className={s.feature} data-fx="rise">
          <div>
            <span className={s.eyebrow}>My Kamura</span>
            <h2>
              Keep the questions.
              <br />
              Continue the learning.
            </h2>
            <p>
              Save therapies and discussion questions in My Kamura. Revisit your collection and
              export a consultation note. Your saved collection stays in this browser, including
              when signed in.
            </p>
            <div className={s.buttons}>
              <Link href="/my" className={s.primary}>
                Open My Kamura <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
          <div className={s.miniPlan}>
            <span>Your space to keep going</span>
            <p>01 &nbsp; Save a topic that matters to you</p>
            <p>02 &nbsp; Collect your consultation questions</p>
            <p>03 &nbsp; Export a note to take with you</p>
            <Link href="/my/saved" className={s.buttons}>
              Open your saved collection <MoveUpRight size={18} />
            </Link>
          </div>
        </section>

        {/* 7 · Where the knowledge meets the city. */}
        <section className={s.section}>
          <div className={s.sectionHead}>
            <div>
              <span className={s.eyebrow}>Connect knowledge to real life</span>
              <h2 data-fx="rise">
                Find your people.
                <br />
                Find your practice.
              </h2>
            </div>
          </div>
          <div className={s.grid} data-fx="stagger">
            {DIRECTORY.map((c) => (
              <Link href={c.href} key={c.href} className={s.card}>
                <div className={s.cardBody}>
                  <small>{c.label}</small>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                  <span>Explore ↗</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
