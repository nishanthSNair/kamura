'use client';
import {useEffect, useRef, useState} from 'react';
import s from './MediaBand.module.css';

/**
 * Full-bleed section transition. Shows the poster image immediately and only
 * loads the video when the band scrolls into view — so it costs nothing above
 * the fold and nothing at all to someone who never reaches it.
 *
 * Honours prefers-reduced-motion by staying on the still.
 */
export default function MediaBand({
  video,
  poster,
  alt,
  caption,
  height = 'standard',
}: {
  video: string;
  poster: string;
  alt: string;
  caption?: string;
  height?: 'standard' | 'tall';
}) {
  const host = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Small screens keep the still: a background video is not worth the data.
    if (window.matchMedia('(max-width: 720px)').matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlay(true);
          io.disconnect();
        }
      },
      {rootMargin: '200px'}
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={host} className={`${s.band} ${height === 'tall' ? s.tall : ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt={alt} className={s.poster} loading="lazy" decoding="async" />
      {play && (
        <video
          className={s.video}
          src={video}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      )}
      {caption && <p className={s.caption}>{caption}</p>}
    </div>
  );
}
