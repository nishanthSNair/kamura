import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {getAllPosts} from '@/lib/blog';
import {news} from '@/data/news';
import s from './TopNews.module.css';

/**
 * The news block: Kamura's own writing on the left, the wider UAE longevity
 * conversation on the right.
 *
 * Every card carries a date, and the lead carries its last-reviewed date
 * where the article has one. That sounds unremarkable and is not: of WebMD,
 * Healthline, Medical News Today and Harvard Health, not one shows a
 * publication date on any homepage card. For longevity content, where 2019
 * guidance is often actively wrong, an undated claim is an unverifiable
 * claim — so the thing the category hides is made visible here.
 *
 * The split is deliberate and is the honest version of what a health portal
 * does. Portals mix syndicated wire copy with their own pages under one
 * "news" heading, which leaves a reader unsure who is talking. Here the two
 * are separated and the external column names its source on every item.
 *
 * Posts are sorted by date and sliced, so the block cannot go stale against
 * the content directory or claim an article that no longer exists.
 */

const fmt = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'});
};

export default function TopNews() {
  const posts = getAllPosts()
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  const [lead, ...rest] = posts;
  const secondary = rest.slice(0, 4);
  const external = news.slice(0, 5);

  if (!lead) return null;

  return (
    <section className={s.wrap} aria-labelledby="news-heading">
      <div className={s.head}>
        <div>
          <span className={s.eyebrow}>Latest</span>
          <h2 id="news-heading">What changed this month.</h2>
        </div>
        <Link href="/blog" className={s.all}>
          All {posts.length} articles <ArrowUpRight size={15} />
        </Link>
      </div>

      <div className={s.columns}>
        <div className={s.main}>
          <Link href={`/blog/${lead.slug}`} className={s.lead} data-fx="rise">
            <span className={s.tagRow}>
              <em>{lead.category}</em>
              {lead.depthIndicator && <span className={s.depth}>{lead.depthIndicator}</span>}
            </span>
            <h3>{lead.title}</h3>
            <p>{lead.excerpt}</p>
            <span className={s.byline}>
              {fmt(lead.date)} · {lead.readingTime} min read
              {lead.lastUpdated && lead.lastUpdated !== lead.date && (
                <> · reviewed {fmt(lead.lastUpdated)}</>
              )}
            </span>
          </Link>

          <ol className={s.secondary} data-fx="stagger">
            {secondary.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`}>
                  <span className={s.sBody}>
                    <em>{p.category}</em>
                    <strong>{p.title}</strong>
                  </span>
                  <span className={s.sMeta}>
                    {fmt(p.date)} · {p.readingTime} min
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <aside className={s.rail} aria-labelledby="industry-heading">
          <h3 id="industry-heading" className={s.railHead}>
            Around the UAE
          </h3>
          <ol className={s.railList}>
            {external.map((n) => (
              <li key={n.id}>
                <a href={n.url} target="_blank" rel="noreferrer">
                  <strong>{n.title}</strong>
                  <span>
                    {n.source} · {n.date}
                  </span>
                </a>
              </li>
            ))}
          </ol>
          <p className={s.railNote}>
            Linked to the original. Kamura did not write these and takes no payment for
            listing them.
          </p>
        </aside>
      </div>
    </section>
  );
}
