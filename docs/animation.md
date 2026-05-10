# Animation & Interaction Conventions

This document is the source of truth for animation, scroll, and interaction work on Kamura. Read this before reaching for a new library — chances are something already covers your case.

---

## The stack

| Concern | Library | Where it lives |
|---|---|---|
| Site-wide smooth scroll | **Lenis** | `src/components/SmoothScroll.tsx` (mounted in `layout.tsx`) |
| Scroll-linked timelines | **GSAP + ScrollTrigger** | Per-page client components |
| Component-level motion | **Framer Motion** | Per-component (buttons, cards, modals, page transitions) |
| Animated numerals | **`@number-flow/react`** | Score readouts, dashboard metrics, stat counters |
| Vector micro-illustrations | **`lottie-react`** | When designer ships JSON (Bodymovin export) |
| Carousel / horizontal scroll | **`embla-carousel-react`** | Practitioner rail, treatment-card horizontal lists |
| Hover micro-interactions | **CSS** (`.btn-hims`, `.btn-hims-card`) | Defined in `globals.css` |

> Already-installed but distinct stack: **Three.js** for 3D content (existing `/peptides/what-is-a-peptide` peptide-chain animation).

---

## Decision tree — "what should I use?"

1. **Is this just a hover, focus, or press state on a button or card?**
   → Pure CSS via `.btn-hims` / `.btn-hims-card` classes. No JS.

2. **Is this an enter-on-mount animation (fade in, slide up)?**
   → Framer Motion `motion.div` with `initial`/`animate`, or the existing `<FadeInOnScroll>` wrapper.

3. **Is this triggered by entering the viewport (scroll-revealed)?**
   → Framer Motion `whileInView`, or `<FadeInOnScroll>` for the simple case.

4. **Does the animation need to be tied to a specific scroll position (scrubbed) — e.g. parallax depth, pinned section that morphs as you scroll?**
   → **GSAP + ScrollTrigger.** Always. Framer's `useScroll` works for trivial parallax, but pinning, scrubbing, and timeline-syncing across multiple elements is what ScrollTrigger exists for.

5. **Animating a number from one value to another?**
   → **`@number-flow/react`**. Don't roll your own counter.

6. **Animating a complex vector illustration?**
   → **Lottie** if the designer can export Bodymovin JSON. Otherwise SVG + Framer Motion.

7. **3D content?**
   → Use the existing Three.js setup. We intentionally have **not** installed `@react-three/fiber`/`drei` — only add if a feature truly requires R3F's component model.

---

## How Lenis and GSAP cooperate

`SmoothScroll` mounts a `<LenisGsapBridge />` that:

1. Pipes Lenis scroll events into `ScrollTrigger.update()` so any GSAP scrub is in lockstep with the smoothed scroll.
2. Drives Lenis's RAF loop from GSAP's ticker (single ticker, no drift).
3. Calls `gsap.ticker.lagSmoothing(0)` so GSAP doesn't try to compensate for skipped frames (Lenis already does this).

This means **you can use `useScroll()` from Framer Motion *and* `ScrollTrigger.create()` from GSAP simultaneously** without conflict. The existing `ScrollProgress` component (Framer Motion `useScroll`) keeps working.

### Reduced motion + touch

Lenis automatically honors `prefers-reduced-motion: reduce` (falls back to native scroll) and preserves native touch momentum on mobile. **Do not** layer your own reduced-motion guards on top of Lenis — it's already correct.

For Framer Motion components, gate transforms behind `prefers-reduced-motion` manually:

```tsx
const prefersReduced = useReducedMotion();
const y = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [0, -100]);
```

---

## Bundle hygiene

**Install everything, but only import what each page needs.** Recharts, Lottie, Embla, Number Flow, Sonner, CMDK, and GSAP are all heavy. Rules:

- ❌ Don't import these from `layout.tsx` or any always-mounted component.
- ✅ Per-page imports inside `'use client'` components.
- ✅ For occasionally-used heavy components (chart, lottie), wrap in `dynamic(() => import('...'), { ssr: false })`.

The bundle analyzer (`npm run analyze`) outputs an HTML report at `.next/analyze/`. Open it before merging anything that pulls a new chart or 3D scene into the bundle.

---

## When to add Radix / shadcn components

shadcn/ui is set up (`components.json` + `src/lib/utils.ts` + `src/components/ui/`). To add a new primitive:

```bash
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add toast
```

This installs the matching `@radix-ui/react-*` package on demand. **Do not bulk-install Radix packages manually** — let shadcn manage which ones we actually use.

For modals and overlays:
- **Desktop dialogs** → shadcn's `Dialog` (Radix)
- **Mobile bottom sheets** → `vaul` (already installed)
- **Toasts** → `sonner` (already installed; mount `<Toaster />` once near the root)
- **Command palette / search** → `cmdk`

---

## Forms

Every form uses **React Hook Form + Zod**:

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({
  resolver: zodResolver(schema),
});
```

No ad-hoc `useState` form state. No HTML5-only validation.

---

## Performance targets

- **First-load JS** (homepage): `< 250 KB` gzipped
- **LCP** (Largest Contentful Paint): `< 2.5s` on 4G
- **CLS**: `< 0.1`
- **Lighthouse Performance**: `≥ 85`
- **Lighthouse Accessibility**: `≥ 95`

Track against these via `@vercel/speed-insights` (already installed, mounted in `layout.tsx`).

---

## Where the conventions are codified

- `.btn-hims` / `.btn-hims-card` / `.frosted-pill-*` / `.frosted-card-light` in `src/app/globals.css`
- `cn()` helper in `src/lib/utils.ts`
- `<FadeInOnScroll>` in `src/components/FadeInOnScroll.tsx`
- `<SmoothScroll>` (with Lenis ↔ GSAP bridge) in `src/components/SmoothScroll.tsx`
- Hero-image slot pattern (`data-image-slot="hero-backdrop"`) in `src/components/home/HeroEditorial.tsx` — designer drops the future 8-layer parallax scene in here.
