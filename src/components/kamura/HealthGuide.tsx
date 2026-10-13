import Link from 'next/link';
import Image from 'next/image';
import {getAllPosts} from '@/lib/blog';
import s from './HealthGuide.module.css';

/**
 * The guide band — four article cards on a dark ground.
 *
 * Structure follows the reference Nishanth picked out: a small inset image at
 * the top of each card, a category pill, then deliberate empty space, then the
 * title sitting on the card's bottom edge with its date beneath. The gap is
 * the point. It gives the title a floor to stand on and makes four cards read
 * as a set of objects rather than four boxes of text.
 *
 * The images are CATEGORY art, not per-article art, and that is the whole
 * design. One image per category means four files instead of twenty-nine,
 * they stay consistent because they were made as a set, and — the part that
 * matters — the image tells you what KIND of thing you are about to read
 * before you reach the words. NN/g's finding is that decorative images are
 * skipped outright while informational ones get examined; a categorical
 * signal is the cheapest way to land on the right side of that line.
 *
 * Posts are sliced after the ones the news block already used, so the two
 * sections never show the same article twice.
 */

const CATEGORY_ART: Record<string, string> = {
  'Longevity & Science': '/images/category/longevity-science.jpg',
  'Guides & Reviews': '/images/category/guides-reviews.jpg',
  'Holistic & Healing': '/images/category/holistic-healing.jpg',
  'News & Trends': '/images/category/news-trends.jpg',
};

const ART_ALT: Record<string, string> = {
  'Longevity & Science': 'Carved alabaster study of a brain, lit from one side',
  'Guides & Reviews': 'Amber apothecary vial lit from one side',
  'Holistic & Healing': 'Carved alabaster study of a heart on a plinth',
  'News & Trends': 'Stack of translucent vellum sheets under a ceramic weight',
};

const FALLBACK = '/images/category/longevity-science.jpg';

const fmt = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('en-GB', {month: 'short', year: 'numeric'});
};

export default function HealthGuide({skip = 5, count = 4}: {skip?: number; count?: number}) {
  const pool = getAllPosts()
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(skip);

  /* Take the newest article from each distinct category before repeating one.
     Because the art is per-category, a plain "newest four" put the same image
     on two cards side by side — which reads as a bug and wastes the signal
     the image is carrying. This also gives the row better topical spread. */
  const seen = new Set<string>();
  const posts = [
    ...pool.filter((p) => !seen.has(p.category) && seen.add(p.category)),
    ...pool.filter((p) => seen.has(p.category)),
  ].slice(0, count);

  if (!posts.length) return null;

  return (
    <section className={s.band} aria-labelledby="guide-heading">
      <div className={s.inner}>
        <div className={s.head}>
          <h2 id="guide-heading">Health guide</h2>
          <Link href="/learn">The full library ↗</Link>
        </div>

        <div className={s.grid} data-fx="stagger">
          {posts.map((p) => (
            <Link href={`/blog/${p.slug}`} key={p.slug} className={s.card}>
              <span className={s.art}>
                <Image
                  src={CATEGORY_ART[p.category] ?? FALLBACK}
                  alt={ART_ALT[p.category] ?? ''}
                  width={1200}
                  height={672}
                  sizes="(max-width:760px) 90vw, (max-width:1100px) 44vw, 23vw"
                />
              </span>
              <span className={s.pill}>{p.depthIndicator ?? 'Article'}</span>
              <span className={s.foot}>
                <strong>{p.title}</strong>
                <small>
                  {fmt(p.date)} · {p.readingTime} min
                </small>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
