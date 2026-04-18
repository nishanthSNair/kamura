# Kamura — Figma Make Prompt Pack

> Paste this whole document into **Figma Make** (figma.com/make). It generates a design file with every screen of the Kamura platform using the correct brand. Based on the live site at kamuralife.com (April 2026).

---

## 1. Product in one paragraph

Kamura is a bilingual (EN/AR, RTL) **longevity and wellness discovery platform** for the GCC. It has three audiences: (1) **consumers** who discover treatments, find practitioners, and track their protocols; (2) **providers** (clinics, practitioners, studios) who list services and manage bookings; (3) **admins** who curate content. The consumer value stack is unified in a logged-in **Member Dashboard** that combines daily protocol adherence, peptide dose logging, booking history, wellness score trends, and personalized recommendations. The target aesthetic is editorial and premium — **Aesop × Whoop × Headspace**. Not clinical, not hippie.

---

## 2. Brand tokens (apply verbatim)

### Color

| Token | Hex | Use |
|---|---|---|
| `bg/canvas` | `#F7F3EB` | page background |
| `bg/cream` | `#FAF7F2` | alternate page bg |
| `bg/surface` | `#FFFFFF` | cards, top bar |
| `bg/warm` | `#EDE7DB` | warm sections, section bg |
| `bg/zen-mist` | `#F5F2ED` | alt warm bg |
| `bg/oxblood` | `#1a0f0c` | hero footers, dark CTA |
| `bg/oxblood-alt` | `#2a1612` | primary button bg |
| `border/hairline` | `#E8E1D3` | 1px borders |
| `border/light` | `#F0ECE7` | card dividers |
| `accent/terracotta` | `#B5886A` | primary CTA, score ring, links |
| `accent/terracotta-dark` | `#9A7357` | hover state |
| `accent/kamura-gold` | `#C4A882` | enso/premium accents, score badges |
| `accent/sage` | `#B0BCA4` | soft backgrounds |
| `accent/sage-dark` | `#96A78B` | darker sage |
| `accent/sage-light` | `#D6DDD0` | card highlights |
| `accent/moss` | `#7B8D68` | secondary green |
| `accent/forest` | `#4A5E3E` | deep green accent |
| `text/primary` | `#2A2520` | body + headlines |
| `text/secondary` | `#5C574F` | meta text |
| `text/tertiary` | `#8A857A` | eyebrows, hints |
| `text/inverse` | `#F7F3EB` | on dark surfaces |
| `status/green` / `soft` | `#5A8D5E` / `#D7E4D8` | success, in-range |
| `status/amber` / `soft` | `#D4A44C` / `#F1E2C2` | warning, borderline |
| `status/red` / `soft` | `#B4543A` / `#EBCFC5` | error, out-of-range |

### Typography

- **Display serif** (headlines, hero numbers): **Playfair Display** — Regular 400, Medium 500
- **Body sans** (everything else): **Inter** — Regular 400, Medium 500, Semi Bold 600
- **Arabic** (RTL): **IBM Plex Sans Arabic** — match Inter weights

| Style | Family | Weight | Size / line-height | Tracking |
|---|---|---|---|---|
| `display/hero` | Playfair | Medium | 72 / 80 | -1.5% |
| `display/xl` | Playfair | Medium | 56 / 64 | -1% |
| `display/lg` | Playfair | Medium | 40 / 48 | -0.5% |
| `display/md` | Playfair | Medium | 32 / 40 | -0.25% |
| `display/sm` | Playfair | Regular | 24 / 32 | 0 |
| `heading/lg` | Inter | Semi Bold | 20 / 28 | -0.25% |
| `heading/md` | Inter | Semi Bold | 16 / 24 | 0 |
| `heading/sm` | Inter | Semi Bold | 14 / 20 | 0 |
| `eyebrow` | Inter | Semi Bold | 10 / 16 | +25% (uppercase) |
| `body/lg` | Inter | Regular | 16 / 26 | 0 |
| `body/md` | Inter | Regular | 14 / 22 | 0 |
| `body/sm` | Inter | Regular | 12 / 20 | 0 |
| `label/sm` | Inter | Medium | 10 / 16 | +15% (uppercase) |

### Spacing + shape

- Radius: `8 / 12 / 16 / 20 / 24 / pill(999)`
- Card padding default: `20–24px`
- Page gutter desktop: `48px`
- Gap between cards: `16–20px`
- Shadow `card`: `0 1px 2px rgba(26,37,32,.04), 0 6px 16px -4px rgba(26,37,32,.06)`
- Shadow `hover`: `0 10px 24px -6px rgba(26,37,32,.08)`
- Border default: `1px solid #E8E1D3`

### Motion

- Hover lift: `translateY(-1px)` + shadow upgrade over 200ms
- Score ring fill: 600ms ease-out
- Toast: fade + 20px rise over 200ms
- No parallax, no bounce, no confetti

### Logo

The Kamura logo is an **enso circle** (open Zen circle) in warm gold, framing a **sprouting plant** with layered sage-green leaves climbing a central stem. Stroke 8px, copper gradient on the circle (`#C4A882 → #D4B896 → #B89B76`). Leaves in four sage gradient variants (`#7a9e7e → #5c7c5f`). Use the symbol alone in top nav, paired with "KAMURA" wordmark (Playfair Display, letter-spacing +15%) on marketing surfaces.

---

## 3. Shared components

Build once, reuse across screens.

1. **Top nav bar** (72h, sticky)
   - Left: Kamura logo + wordmark
   - Center: `Discover` dropdown (Treatments / Peptides / Protocols), `Find Providers`, `Wellness Check`
   - Right: language toggle `EN / AR` pills, `Sign In` text link, `List Your Business` terracotta pill
   - On dark hero pages: white text variant

2. **Member dashboard left sidebar** (240w, desktop)
   - Brand mark at top
   - Nav: Today / Protocol / Bookings / Progress / Discover / Profile
   - Active state: `bg/warm` bg, terracotta icon tint
   - Bottom: avatar + name + Sign Out

3. **Score tier pill** — `Kamura 82 · Gold`
   - Gold ≥80 (amber-soft bg), Strong ≥65 (green-soft), Promising ≥50 (blue-soft), Limited ≥35 (orange-soft), Anecdotal (gray-soft)
   - Small: 22h, Medium: 26h; rounded-pill border

4. **Wellness score tile**
   - Label eyebrow, big Playfair number (48pt), 7-day-avg line under, small terracotta delta arrow
   - Tap opens Daily Check-in modal

5. **Protocol item card**
   - Grid: category icon (44×44, warm bg) · name + meta · score pill · round log checkbox (32px, border → green on log)
   - Expanded below: inventory manager strip, titration stepper, injection site map (peptides only), safety banner (pharma only), alternatives strip

6. **Titration stepper**
   - Horizontal flex of 12–20 week cells
   - Each cell: `W5` eyebrow, dose text (Playfair), optional note below
   - Current week highlighted terracotta border + bg; past dimmed; future dimmer
   - "rest" weeks italic gray

7. **Injection site map**
   - SVG body silhouette (front view, 240×360)
   - 6 zones: Abdomen L/R, Thigh L/R, Arm L/R
   - Zone colors: sage (unused), amber (resting <3d), emerald (ready); terracotta dot on most recent
   - Companion legend grid with days-since per zone

8. **Inventory nudge banner**
   - Gradient bg terracotta/10 → terracotta/5
   - Left: 40×40 warning icon
   - Text: "BPC-157 supply is low. You'll run out in 6 days. [Reorder from a Kamura-verified pharmacy →]"

9. **Insight card**
   - Warm gradient bg (`#FBF8F1` → `#F7EFDF`)
   - Copper radial glow lower-right
   - Thin terracotta line accent top-left
   - Eyebrow · Playfair H3 · body · optional link

10. **Habit streaks card**
    - Eyebrow + H3 "You're consistent."
    - 5 rows: 32×32 category icon + item name + Playfair count + `days`/`weeks` label

11. **Practitioner card**
    - Avatar (circle, 48×48, terracotta gradient) + name (Playfair) + verified ✓ + specialty/city
    - Next session pill (warm bg)
    - Profile / Message ghost buttons

12. **Journal card**
    - Eyebrow + H3 "Recent journal"
    - Per entry: date chip (terracotta), italic quote, metric tag chips (Energy 7/10 · Mood 8/10 · Pain 2/10 · Sleep 7.8h)

13. **Booking widget** (right rail on provider public profile)
    - 5-step: Service → Date → Time slot → Details → Confirm
    - Each step stacks inside a rounded card, with "Change" button on completed sections

14. **GRADE badge** (treatment pages)
    - `GRADE · A` pill with letter in a circle, tier name
    - Mapped from evidence level: Strong→A, Moderate→B, Emerging/Limited→C, Anecdotal→D

15. **Kamura Score ring**
    - 140×140 SVG, 8px stroke, track warm gray, arc terracotta
    - Center: big number (Playfair), small "out of 100" below

16. **Toast** (bottom-center, floating)
    - Dark oxblood pill, white text, 2.2s auto-dismiss
    - Rise + fade animation

17. **Buttons**
    - **Primary**: oxblood `#2a1612` bg, white text, 44h, pill shape
    - **Primary-terracotta**: terracotta bg, white text
    - **Ghost**: white bg, 1px hairline border, gray-800 text
    - **Small**: 36h, text-xs

---

## 4. Screens to generate

All desktop frames: 1440×(variable). Mobile frames: 390×(variable). Use auto-layout. Match copy verbatim where provided.

### PUBLIC — Marketing + Discovery

#### 4.1 Homepage `/`
- Full-screen hero image (wellness interior, warm sun-drenched)
- Centered content: animated "Connecting you to *functional medicine*" (Playfair 56pt, italicized terracotta second line)
- Body: "The wellness platform for the GCC. Discover treatments, find vetted providers, build personalized protocols, and optimize your health journey — all in one place."
- Primary CTAs: `Explore Treatments` (white pill) + `Take Wellness Check` (ghost white border)
- Smart search bar (white pill, 640w) with placeholder "Search treatments, peptides, clinics…"
- 5 search suggestion chips: BPC-157 · NAD+ therapy · GLP-1 · Red light therapy · Peptide dashboard
- Animated stat ticker: `207+ Treatments · 416+ Citations · 70+ Providers`
- Section: Latest from the Journal (blog card grid, 1 featured + 3 small)

#### 4.2 Treatments directory `/treatments`
- Hero: "Every treatment. Scored." (Playfair 48pt on warm bg)
- Category chips (Peptides, GLP-1, Hormones, Devices, etc.)
- Grid of treatment cards: cover image, category eyebrow, Playfair name, GRADE badge, one-line description, Kamura Score ring (small)

#### 4.3 Treatment detail `/treatments/[slug]` (e.g. Tirzepatide)
- Hero banner (oxblood gradient overlay on treatment image)
- Breadcrumb: Home / Treatments / Tirzepatide
- Category pill · Playfair 44pt name
- Quick stats strip: GRADE · A pill · `207+ Studies` pill · `Available in UAE` pill · Add to Stack button
- Kamura Score ring (large, right-aligned on hero)
- Section tabs: At-a-glance / Mechanism / Evidence / Side effects / Cost / FAQ / Providers / Research
- **"Providers offering Tirzepatide"** section: 2-column grid of provider cards with "Book →" CTA
- Citations block with PubMed links

#### 4.4 Peptide Intelligence Hub `/peptides`
- Dark oxblood hero with rotating animated peptide chain SVG
- Display hero: "Peptide Intelligence" (Playfair 64pt white)
- Sub: "13 peptides scored. Protocol stacks. Sourcing intelligence. Clinician tools."
- CTAs: `Browse Directory` white pill, `Build a Protocol` ghost
- Stat row below: `13 Peptides · 7 Protocol Stacks · Evidence-Scored`
- **5 Why-Kamura differentiator rows** (two-column editorial, left sticky)
- **4 Protocol Pillars** (editorial image cards): RESTORE · EXTEND · SCULPT · FOCUS — dark overlay, Playfair caps name, tag pills
- **Top Peptides list** (numbered, score-ranked, editorial)
- **Tools grid** (For You: Directory, What is a Peptide?, Dashboard, Protocol Builder | For Clinicians: Clinic Dashboard, Evidence Feed, Protocol Templates, Advisor)
- **Trending Right Now** — 6 peptides with monthly searches + YoY growth
- **Not a blog. A media hub.** — 3 blog article cards
- **Oxblood CTA footer** — "Not sure where to begin?"

#### 4.5 What is a Peptide? `/peptides/what-is-a-peptide`
- Full-screen dark hero with animated peptide chain drawing itself (SVG)
- "You are written *in peptides.*" (Playfair 80pt white, italic)
- Section: side-by-side amino acid vs peptide vs protein visual comparison
- **Cellular signaling animation** — dark bg scene with peptide docking into cell receptor, pulse waves
- **4 Biological Jobs** grid: HEAL · BUILD · REGULATE · DEFEND with targeting-ring icons
- **Decision Tree** visualization: "Which peptide fits?" → branches by goal
- Natural vs Synthetic two-column block
- Animated Kamura Score pillar bars (Evidence 88 · Safety 92 · Access 74 · Value 81)

#### 4.6 Provider Public Profile `/provider/[slug]`
- Hero: cover image, provider avatar, business name (Playfair 48pt), category + verified ✓ + star rating
- Contact pills: Call / WhatsApp / Website
- Two-column layout:
  - **Left**: Services list (price + duration + "Kamura-Scored →" link per item), Reviews feed
  - **Right** (sticky): Booking widget, Location card, Hours card

#### 4.7 Find Providers `/explore`
- Hero: search bar + area chips (Dubai Marina, Downtown, JBR, etc.) + category chips
- Grid of clinic cards with photo, name, category, area, 1-line description, tags, `View details →`
- Toggle: "List view / Map view"

#### 4.8 Wellness Check `/wellness-checker`
- 4-step wizard with progress bar (Profile → Lifestyle → Health → Goals)
- Each step: single question area, soft warm card, terracotta pills for multi-select, slider for sleep/stress
- Bottom nav: Back (ghost) / Continue (terracotta pill)
- Final step: `See My Dashboard` primary

#### 4.9 Wellness Dashboard (post-checker, anonymous)
- "Your Wellness Intelligence" header
- Primary Score ring + category breakdowns
- **Recommended Treatments** grid (6 cards, ranked)
- **Your Daily Protocol** (morning/midday/evening schedule)
- **Recommended Centers** (clinic cards)
- **Go Deeper** (blog cards)
- Sticky bottom CTA: "Save your plan → Create Account"

### MEMBER — Auth-gated `/my`

#### 4.10 Today `/my` ⭐ HERO SCREEN
- Greeting eyebrow (terracotta, uppercase, +25% tracking): `GOOD MORNING, NISHANTH`
- Display H1: **"Week 6 of your *Recovery & Longevity* protocol"** (Playfair 40pt, goal italicized terracotta)
- Sub: "You're 3 of 5 through today's protocol. Your wellness score is up 4 pts this week." (body/lg, gray-600)
- Top-right buttons: `Journal today` (ghost) + `+ Check-in` (terracotta pill)
- **Inventory nudge banner** (BPC-157 supply low — 6 days left — Reorder →)
- Two-column grid:
  - **LEFT (2fr)**:
    - Active stack card (3 rows: BPC icon · name · dose · Kamura score pill)
    - Today's doses card, grouped by time of day (Morning 7:00 / Midday 13:00 / Evening 19:00), each row with hour label + name + dose + circular log checkbox
    - Insight card (warm gradient, "Your wellness score is up 3 pts this week.")
  - **RIGHT (1fr)**:
    - Wellness Score tile (tap-to-log)
    - Practitioner card (Dr. Maya Sharma · Longevity MD · Dubai + next session pill)
    - Habit Streaks card ("You're consistent." + 5 streaks: Tirzepatide · 14 weeks)
    - Journal card (last 2 entries with metric chips)

Mobile variant: stack everything in one column, bottom tab bar (Today / Protocol / Bookings / Progress / Profile).

#### 4.11 Protocol `/my/protocol`
- Hero: "Your living plan" (Playfair 40pt)
- Sub: "Peptides, supplements, habits — all tracked in one place."
- `+ Add Item` button top-right
- LocalStorage import banner (if tracker data exists)
- Items grouped by time-of-day (Morning / Midday / Evening / Bedtime / Any)
- Each item card expanded shows: log checkbox, category pill + score pill + Kamura-Scored link, dose/schedule/timing meta, 7-day streak dots, Titration Stepper (peptides), Injection Site Map (peptides), Safety banner (pharma), Inventory Manager strip, Alternatives Strip

#### 4.12 Bookings `/my/bookings`
- Hero: "Your sessions" (Playfair 40pt)
- Tabs: Upcoming / Past / Browse
- **Upcoming card**: date eyebrow + provider Playfair + service · status badge + price · amber prep checklist block ("Before your session — Fasting required 8h prior · Hydrate well · Bring recent bloodwork") · View provider · WhatsApp · Set as my practitioner links
- **Past card**: expanded shows provider notes, treatments given, labs attached, post-session log, Leave a review button

#### 4.13 Progress `/my/progress`
- Hero: "Are you getting better?" (Playfair 40pt)
- 4 stat tiles: Latest Score 82 · 30-day Avg 79 · Trend +3 · Streak 14d
- SVG line chart of last 30 days wellness score (terracotta line on warm grid)
- Dimensions bar chart (Energy · Mood · Sleep · Stress)
- Protocol adherence block: big Playfair count of doses logged (30d)

#### 4.14 Discover `/my/discover`
- Hero: "What to try next" (Playfair 40pt)
- "Highest-scored treatments" — 4-card grid
- "Latest reading" — 3 blog cards

#### 4.15 Profile `/my/profile`
- Hero: "Your details" (Playfair 40pt)
- Personal info card (name, email, DOB, gender, city, phone, language toggle)
- **Protocol card**: Primary Goal dropdown (Recovery & Longevity / Metabolic / Sleep / Performance / Cognition / Hormonal / Skin) + Protocol Start Date
- **Concerns card**: active concern chips (terracotta bg) + common concerns grid to add + custom input

#### 4.16 Member Login/Signup `/my/login` `/my/signup`
- Centered card on warm bg
- Kamura wordmark top
- "Welcome back" / "Create your account" (Playfair 24pt)
- Google sign-in button (white with Google logo, full-width pill)
- "or" divider
- Email + password fields
- Primary dark pill: Sign In / Create Account
- Bottom link to toggle

### PROVIDER — Auth-gated `/provider`

#### 4.17 Provider Login/Signup `/provider/login` `/provider/signup`
- Same pattern as member, but copy is "Provider Portal" / "Register your business"

#### 4.18 Provider Dashboard — Today `/provider/dashboard`
- Dark oxblood left sidebar (240w) with Kamura mark, nav (Today · Calendar · Earnings · Reviews · Settings), business name bottom + Sign Out
- Hero: "Today's Bookings" (Playfair 40pt) + date
- 3 stat tiles: Upcoming · Completed · No-show
- Booking list: each row has customer name, service, time, WhatsApp link, status badge, Complete/No-show buttons

#### 4.19 Provider Calendar `/provider/dashboard/calendar`
- Hero: "Availability" + `+ Add Slots` CTA
- Weekly grid (7 columns Sun-Sat, hours on left)
- Create recurring slots form (days + start/end time + duration)
- Per-slot: time chip with Block/Delete actions

#### 4.20 Provider Earnings `/provider/dashboard/earnings`
- 3 stat tiles: This Month AED · All Time AED · Pending Payouts AED
- Service breakdown (horizontal bar per service)
- Payout history table with status badges
- Stripe Connect placeholder CTA

#### 4.21 Provider Reviews `/provider/dashboard/reviews`
- Rating summary: big Playfair avg star count + rating distribution bar chart
- Review cards with star row, customer name, quoted comment, Flag button

#### 4.22 Provider Settings `/provider/dashboard/settings`
- Business Info card (name, category, phone, email, website, city, address, description textarea)
- Services card: each service row (name, duration, price, category icon, active toggle, delete) + `+ Add Service` form (name, duration, price, treatment_slug, prep_notes textarea)

---

## 5. Key flows (draw arrows between screens)

1. **New visitor → signup**:
   Homepage → Treatment detail → "Book this" → Provider profile → Booking widget → Confirmation → Sign up prompt → Member Today

2. **Existing member daily loop**:
   Member Today → tap log checkbox → toast "Logged" → tap Wellness Score → Check-in modal → save → Today updates → end

3. **Peptide education → purchase**:
   Peptides hub → What is a Peptide? → Decision tree → Treatment detail → Providers offering → Book

4. **Provider onboarding**:
   /list-your-business → Signup → Dashboard → Settings (add services with prep_notes and treatment_slug) → Calendar (set availability) → Public profile goes live → Client books → Today's bookings

5. **Post-session review loop**:
   Past booking → Leave a review link → Review submission page → Review appears on provider profile → Feeds Kamura trust layer

---

## 6. Hard constraints

- **No emoji in UI copy.** Use line-based SVG icons only (1.5px stroke).
- **No heavy shadows.** 1px hairline borders + subtle two-step shadow only.
- **Three weighted pillars on Today**: protocol + booking + discovery — none dominates.
- **RTL Arabic support**: every screen must work mirrored with IBM Plex Sans Arabic, not a translated-only version.
- **Editorial, not clinical, not hippie**: no stethoscopes, white coats, blue-on-blue healthtech; no chakras, crystals, mandalas.
- **Desaturated status colors**: use the exact hexes in section 2 — never bright/neon green, red, yellow.
- **Login is not the hero**. First-time visitors should see value before being asked to sign up.
- **Progressive disclosure**: a brand-new member (no concerns, no bookings, no protocol) sees a 3-step onboarding on Today, not the full empty dashboard.

---

## 7. Deliverables

Generate a Figma file with:
- A **Components** page containing all 17 shared components as reusable instances
- **Style library**: every color, type, radius, shadow from section 2 as tokens
- One frame per screen in section 4 (25+ screens total)
- Desktop frames + 6 key mobile variants (Homepage, Today, Protocol detail, Booking widget, Provider Today, Wellness Check step)
- Flow arrows connecting the 5 flows in section 5 on a dedicated "Flows" page
- A brand page with logo, palette, type specimens, Ramadan/Arabic samples

Use Auto Layout for everything. Do not use lorem ipsum — use the exact copy in this doc.

---

*Generated April 2026 for Nishanth / Kamura. Paste into figma.com/make.*
