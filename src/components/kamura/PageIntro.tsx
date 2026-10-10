import Link from 'next/link';
import Image from 'next/image';
import s from './Kamura.module.css';

/**
 * Standard page hero. Pass `image` to use the media variant — see
 * docs/image-standard.md for the art direction every hero image follows.
 */
export default function PageIntro({
  eyebrow,
  title,
  description,
  links = [],
  image,
}: {
  eyebrow: string;
  title: string;
  description: string;
  links?: {href: string; label: string; active?: boolean}[];
  image?: {src: string; alt: string};
}) {
  const copy = (
    <div className={s.heroCopy}>
      <span className={s.eyebrow}>{eyebrow}</span>
      <h1>{title}</h1>
      <p className={s.lead}>{description}</p>
      {links.length > 0 && (
        <nav className={s.sectionNav} aria-label="Explore this section">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={l.active ? 'page' : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
  return (
    <div className={s.page}>
      <section className={s.pageHero}>
        <div className={s.container}>
          {image ? (
            <div className={s.heroGrid}>
              {copy}
              <div className={s.heroMedia}>
                <Image src={image.src} alt={image.alt} fill sizes="(max-width:860px) 100vw, 45vw" priority />
              </div>
            </div>
          ) : (
            copy
          )}
        </div>
      </section>
    </div>
  );
}
