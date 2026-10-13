import Link from 'next/link';
import Image from 'next/image';
import {ArrowUpRight} from 'lucide-react';
import {treatments} from '@/data/treatments';
import {INSTRUMENTS} from '@/data/instruments';
import {COMPOUNDED_PRODUCTS} from '@/data/compounded';
import catalogue from '@/data/therapy-explorer.json';
import s from './Hero.module.css';

/**
 * The homepage hero.
 *
 * Two jobs, and the second is the one most health-site heroes skip: say what
 * is actually in here. A visitor who cannot tell within a few seconds whether
 * a site has anything for them leaves, and "Understand your health" alone
 * does not answer that. So the manifest sits in the hero as figures, not in a
 * section further down that most people never scroll to.
 *
 * Every figure is derived from the data it describes. If the library shrinks,
 * the hero stops claiming it — a hardcoded "200+" is a promise that rots.
 *
 * The image carries no text of its own. Baking words into generated artwork
 * means they cannot be translated, cannot be read by a screen reader, and go
 * wrong at the first breakpoint; the headline is real markup over the top.
 */

const OUTCOMES = treatments.reduce((n, t) => n + (t.outcomes?.length ?? 0), 0);

const MANIFEST = [
  {n: treatments.length, label: 'treatments graded', href: '/treatments'},
  {n: OUTCOMES, label: 'outcomes, each cited', href: '/treatments/methodology'},
  {n: catalogue.length, label: 'therapies mapped to anatomy', href: '/body'},
  {n: INSTRUMENTS.length, label: 'validated screening tools', href: '/tools'},
  {n: COMPOUNDED_PRODUCTS.length, label: 'compounded medicine guides', href: '/compounded'},
];

export default function Hero() {
  return (
    <section className={s.hero} aria-labelledby="hero-heading">
      <div className={s.art} aria-hidden="true">
        <Image
          src="/images/hero/home.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className={s.img}
        />
        <div className={s.scrim} />
      </div>

      <div className={s.inner}>
        <div className={s.copy}>
          <p className={s.eyebrow}>Kamura · preventive health &amp; longevity · UAE</p>
          <h1 id="hero-heading">
            Everything you were never told about <em>your own body.</em>
          </h1>
          <p className={s.lede}>
            Independent, cited evidence on the treatments people actually ask about — read
            against a 3D human body, not a search box. Kamura sells nothing and takes no
            payment from clinics, pharmacies or brands.
          </p>
          <div className={s.actions}>
            <Link href="/body" className={s.primary}>
              Explore the body <ArrowUpRight size={17} />
            </Link>
            <Link href="/reports" className={s.secondary}>
              Bring your reports together <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        <ul className={s.manifest} aria-label="What is in Kamura">
          {MANIFEST.map((m) => (
            <li key={m.href}>
              <Link href={m.href}>
                <strong data-fx="count">{m.n}</strong>
                <span>{m.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
