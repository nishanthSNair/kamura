'use client';

import {useEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

/**
 * Scroll choreography for the homepage, driven by GSAP ScrollTrigger.
 *
 * Lenis is already mounted site-wide in SiteFrame and bridged to
 * ScrollTrigger, so timelines here stay in lockstep with the smoothed scroll
 * position rather than fighting it.
 *
 * The markup stays server-rendered and the effects are attached by data
 * attribute, which keeps two things true:
 *
 *   - Without JavaScript, or before this mounts, every element is in its
 *     final visible state. Nothing is parked at opacity:0 in the HTML waiting
 *     for a script, which would cost us the content in search results and
 *     strand the page entirely if the bundle fails.
 *   - The hiding is applied by this component, immediately before it animates,
 *     so there is no flash of hidden content either way.
 *
 * Under prefers-reduced-motion nothing is registered at all and the page is
 * simply static.
 */

type Ctx = {revert: () => void};

export default function HomeMotion() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    /* gsap.from() applies its start state the moment the tween is created.
       This effect runs after first paint, so for anything already on screen
       that means a visible flash: painted, hidden, then faded back in. An
       element the reader can already see has nothing to reveal, so it is
       simply left alone. */
    const onScreen = (el: Element) => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };

    const ctx: Ctx = gsap.context(() => {
      /* ── Headline and block reveals ────────────────────────────────────
         Short travel and a slight blur-free settle. Long slides read as a
         template; 22px reads as the page assembling itself. */
      gsap.utils.toArray<HTMLElement>('[data-fx="rise"]').forEach((el) => {
        if (onScreen(el)) return;
        gsap.from(el, {
          y: 22,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {trigger: el, start: 'top 88%', once: true},
        });
      });

      /* Children resolve in sequence rather than snapping as one block. */
      gsap.utils.toArray<HTMLElement>('[data-fx="stagger"]').forEach((group) => {
        if (onScreen(group)) return;
        gsap.from(Array.from(group.children), {
          y: 26,
          autoAlpha: 0,
          duration: 0.75,
          ease: 'power2.out',
          stagger: 0.09,
          scrollTrigger: {trigger: group, start: 'top 85%', once: true},
        });
      });

      /* ── Figures that count up ─────────────────────────────────────────
         The inventory numbers are the proof the page is making, so they
         arrive as a measurement being taken rather than as static text.
         The DOM value is the source of truth; this only animates toward it. */
      gsap.utils.toArray<HTMLElement>('[data-fx="count"]').forEach((el) => {
        const target = Number(el.textContent?.replace(/[^\d]/g, '') ?? 0);
        if (!Number.isFinite(target) || target === 0) return;
        const obj = {n: 0};
        gsap.to(obj, {
          n: target,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {trigger: el, start: 'top 85%', once: true},
          onUpdate: () => {
            el.textContent = String(Math.round(obj.n));
          },
          onComplete: () => {
            el.textContent = String(target);
          },
        });
      });

      /* ── Hero parallax ─────────────────────────────────────────────────
         The figure drifts and dims as the page leaves it behind, so the hero
         hands off to the content instead of simply scrolling away. Scrubbed,
         so it is tied to scroll position rather than playing on its own. */
      const heroFigure = document.querySelector<HTMLElement>('[data-fx="hero-figure"]');
      if (heroFigure) {
        gsap.to(heroFigure, {
          yPercent: 12,
          scale: 1.04,
          ease: 'none',
          scrollTrigger: {
            trigger: heroFigure.closest('section') ?? heroFigure,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }

      /* ── Slow drift on the pinned image ────────────────────────────────
         Small on purpose: 8% reads as depth, 30% reads as a parallax demo. */
      gsap.utils.toArray<HTMLElement>('[data-fx="drift"]').forEach((el) => {
        gsap.fromTo(
          el,
          {yPercent: -4},
          {
            yPercent: 4,
            ease: 'none',
            scrollTrigger: {trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: 0.8},
          },
        );
      });

      /* ── Section rules that draw themselves ────────────────────────────
         Structure appearing as you reach it, instead of a static border. */
      gsap.utils.toArray<HTMLElement>('[data-fx="rule"]').forEach((el) => {
        if (onScreen(el)) return;
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {trigger: el, start: 'top 92%', once: true},
        });
      });
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return null;
}
