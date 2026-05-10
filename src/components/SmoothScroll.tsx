"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * Site-wide smooth scroll via Lenis.
 *
 * - `root` attaches Lenis to <html> so window.scrollY is the smoothed value.
 * - `prevent: () => prefersReducedMotion()` falls back to native scroll for
 *   users who request reduced motion.
 * - Touch devices keep native momentum scroll (Lenis default).
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
      {children}
    </ReactLenis>
  );
}
