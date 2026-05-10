"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Site-wide smooth scroll via Lenis, integrated with GSAP ScrollTrigger.
 *
 * - `<ReactLenis root>` attaches Lenis to <html> so window.scrollY is the
 *   smoothed value. Framer Motion's `useScroll()` reads from window, so it
 *   keeps working without changes (existing ScrollProgress bar still ticks).
 * - We register ScrollTrigger and pipe Lenis's scroll events into
 *   ScrollTrigger.update so any GSAP timelines stay in lockstep with the
 *   smooth-scrolled scrollY.
 * - GSAP's ticker drives Lenis's RAF loop (single ticker = no drift).
 * - Lenis natively respects `prefers-reduced-motion` (falls back to native
 *   scroll) and preserves native touch momentum on touch devices.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }}
    >
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
}

/**
 * Bridges Lenis ↔ GSAP ScrollTrigger so any GSAP-driven scroll choreography
 * (parallax, pinned reveals, scrubbed timelines) stays in sync with Lenis.
 *
 * Mounted once near the root. Safe to keep mounted even when no GSAP
 * timelines are active — the ticker tick is cheap and ScrollTrigger.update()
 * is a no-op when no triggers are registered.
 */
function LenisGsapBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    gsap.registerPlugin(ScrollTrigger);

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tick);
    };
  }, [lenis]);

  return null;
}
