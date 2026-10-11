import Link from 'next/link';
import Image from 'next/image';
import {ArrowUpRight, Activity, Brain, Heart, MoveUpRight} from 'lucide-react';
import HomeBody from './HomeBody';
import MediaBand from './MediaBand';
import Inventory from './Inventory';
import {treatments} from '@/data/treatments';
import {INSTRUMENTS} from '@/data/instruments';
import r from './Reveal.module.css';
import x from './Scroll.module.css';
import s from './Kamura.module.css';

/**
 * Counts are derived so the page cannot claim a library it no longer has.
 * Graded outcomes are counted here rather than hardcoded for the same reason.
 */
const OUTCOMES = treatments.reduce((n, t) => n + (t.outcomes?.length ?? 0), 0);

/**
 * The pinned sequence. One visual holds still while three claims pass it —
 * the device a product page uses when a single image has to carry more than
 * one idea. Each panel earns its place by naming something the site actually
 * contains, with the figure derived above.
 */
const PANELS = [
  {
    index: 'ONE',
    title: 'Start with your own body, not a search box.',
    text: `Open the anatomy and choose a structure. Kamura answers with the lab values that reflect it, the screening tools that measure it, and the graded research bound to it — ${OUTCOMES} outcomes in all, each tied to one treatment and one finding.`,
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

export default function Home() {
  return (
    <div className={s.page}>
      <HomeBody />

      <div className={s.container}>
        <section className={`${s.homeIntroduction} ${x.rise}`}>
          <span className={s.eyebrow}>What is Kamura?</span>
          <h2>Your place to understand health and explore what comes next.</h2>
          <p>
            Bring your health reports together, explore how treatments work and prepare questions
            for your next appointment. When you&rsquo;re ready, explore care providers, studios and
            wellness events.
          </p>
          <span className={x.cue} aria-hidden="true">
            <i />
            Scroll
          </span>
        </section>

        {/* Pinned sequence — the body holds while the three claims pass it. */}
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

        <nav className={`${s.strip} ${x.stagger}`} aria-label="Discover Kamura">
          <Link href="/reports">
            <div>
              <strong>Bring your reports together</strong>
              <small>One clear appointment summary</small>
            </div>
            <ArrowUpRight />
          </Link>
          <Link href="/explore">
            <div>
              <strong>Find your care</strong>
              <small>Explore care &amp; wellness services</small>
            </div>
            <ArrowUpRight />
          </Link>
          <Link href="/classes">
            <div>
              <strong>Make room for movement</strong>
              <small>Classes &amp; studios across the UAE</small>
            </div>
            <ArrowUpRight />
          </Link>
        </nav>

        <Inventory />
      </div>

      <MediaBand
        video="/video/transition-porcelain.mp4"
        poster="/images/texture/porcelain-poster.jpg"
        alt="Sculptural porcelain and clay forms in soft light"
        caption="Understand the body"
      />

      <div className={s.container}>
        <section className={s.section}>
          <div className={s.sectionHead}>
            <div>
              <span className={s.eyebrow}>Start with a question</span>
              <h2 className={x.settle}>
                What would you like
                <br />
                to understand?
              </h2>
            </div>
            <Link href="/learn">Explore the learning library ↗</Link>
          </div>
          <div className={`${s.grid} ${x.stagger}`}>
            {[
              {
                title: 'How does tissue repair work?',
                text: 'Explore muscle and connective tissue, repair pathways and the research behind BPC-157.',
                href: '/peptides/bpc-157',
                Icon: Activity,
                label: 'BODY & RECOVERY',
              },
              {
                title: 'How do hormones send signals?',
                text: 'Follow testosterone signalling and feedback. Connect the mechanism to the evidence.',
                href: '/body?t=trt',
                Icon: Brain,
                label: 'HORMONES & HEALTH',
              },
              {
                title: 'What is visceral fat?',
                text: 'Explore visceral fat and see what tesamorelin studies actually measured.',
                href: '/peptides/tesamorelin',
                Icon: Heart,
                label: 'METABOLIC HEALTH',
              },
            ].map((c) => (
              <Link href={c.href} key={c.title} className={s.card}>
                <div className={s.cardArt}>
                  <c.Icon />
                </div>
                <div className={s.cardBody}>
                  <small>{c.label}</small>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                  <span>Open the explanation ↗</span>
                </div>
              </Link>
            ))}
          </div>
          <p className={`${s.sectionFoot} ${r.reveal}`}>
            Taking a compounded medicine and unsure what it actually is?{' '}
            <Link href="/compounded">Read the leaflet it never came with ↗</Link>
          </p>
        </section>
      </div>

      <MediaBand
        video="/video/transition-reports.mp4"
        poster="/images/texture/reports-poster.jpg"
        alt="Translucent paper edges in raking daylight"
        caption="Bring it together"
      />

      <div className={s.container}>
        <section className={`${s.feature} ${x.rise}`}>
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

        <section className={s.section}>
          <div className={s.sectionHead}>
            <div>
              <span className={s.eyebrow}>Connect knowledge to real life</span>
              <h2 className={x.settle}>
                Find your people.
                <br />
                Find your practice.
              </h2>
            </div>
          </div>
          <div className={`${s.grid} ${x.stagger}`}>
            {[
              {
                title: 'Classes & studios',
                text: 'Yoga, Pilates, breathwork and more. Explore studios by discipline and emirate.',
                href: '/classes',
                label: 'MOVE & RESTORE',
              },
              {
                title: 'Care & services',
                text: 'Explore the kinds of care Kamura is bringing together. Provider booking is in development.',
                href: '/explore',
                label: 'FIND CARE',
              },
              {
                title: 'Events & ideas',
                text: 'Discover wellness events, workshops and conversations around longevity.',
                href: '/events',
                label: 'MEET & LEARN',
              },
            ].map((c) => (
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
