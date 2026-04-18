# Kamura — Site Audit

> Snapshot of the platform as of April 2026. Refreshed when major changes ship.

---

## Health check

| Area | Status | Note |
|---|---|---|
| Production URL | ✓ Live | [kamuralife.com](https://kamuralife.com) returns 200 |
| Member signup | ✓ Live | `/my/signup` 200 |
| Provider signup | ✓ Live | `/provider/signup` 200 |
| Discover page | ✓ Live | `/explore` 200 (redesigned per sketch) |
| TypeScript | ✓ Clean | `tsc --noEmit` passes |
| Vercel deploys | ✓ Auto-deploy on `main` push |
| Supabase | ✓ Connected | `vqcbtnzwnxbtanpvogjr.supabase.co` |
| Google OAuth | ⚠ Deferred | Configured later, email/password works |

## Codebase size

| Metric | Count |
|---|---|
| Route pages (`page.tsx`) | 72 |
| React components | 108 |
| Supabase migrations | 8 |
| Treatments seeded | 207 |
| Static clinic listings | 128 |
| Peptide protocols seeded | 16 |
| Blog articles | 27 |
| Events | 25 |
| Featured practitioners (dummy) | 6 |

---

## Route inventory

### Public — no auth needed
```
/                              homepage (hero + 3 doors + practitioners grid)
/treatments                    directory — 207 scored treatments
/treatments/[slug]             detail + GRADE badge + providers offering it
/treatments/methodology        Kamura Score explainer
/treatments/compare            side-by-side
/treatments/compare/[slugPair] specific comparison
/treatments/category/[slug]    browse by category
/treatments/best-for/[goal]    treatments filtered by wellness goal
/peptides                      editorial intelligence hub
/peptides/what-is-a-peptide    animated explainer with decision tree
/peptides/directory            all peptides with Kamura Scores
/peptides/tracker              localStorage demo tracker
/peptides/compare              side-by-side peptide compare
/peptides/protocol-builder     personalized peptide stack
/peptides/sourcing-guide       pharma vs research grade
/peptides/protocol-templates   pre-built stacks (clinic-facing)
/peptides/clinic-dashboard     market intelligence (clinic-facing)
/peptides/evidence-feed        latest studies
/peptides/advisor              AI-assisted recommendations
/protocols                     Bryan Johnson / Attia / Huberman etc
/protocols/[slug]              individual protocol detail
/explore                       Discover — horizontal-scroll services/clinics/experts
/explore/[id]                  clinic detail
/explore/area/[slug]           by area
/explore/compare               multi-clinic compare
/provider/[slug]               PUBLIC provider profile (booking widget)
/wellness-checker              4-step intake (12 fields cut recently)
/events                        25 wellness events
/events/[id]                   event detail
/blog                          27 articles
/blog/[slug]                   article with JSON-LD + FAQ schema
/about                         about page
/quiz                          wellness archetype quiz
/list-your-business            marketing landing for providers
/review/[token]                public review submission (token-gated)
```

### Member auth — `/my/*` (Supabase session required)
```
/my                           Today — score, protocol, practitioner, streaks, journal, insight
/my/protocol                  CRUD + titration stepper + injection site map + inventory + alternatives
/my/bookings                  Upcoming / Past + prep checklist + set-as-practitioner
/my/progress                  30-day wellness score chart + dimensions
/my/discover                  personalized recs
/my/profile                   edit info + primary goal + concerns
/my/login, /my/signup         auth pages
/my/auth/callback             OAuth return URL
```

### Provider auth — `/provider/dashboard/*`
```
/provider/signup              5-step onboarding wizard (solo vs clinic branching)
/provider/login               email/password
/provider/dashboard           today's bookings + stat tiles
/provider/dashboard/calendar  weekly availability grid
/provider/dashboard/earnings  monthly / all-time / Stripe stub
/provider/dashboard/reviews   star distribution + flag
/provider/dashboard/settings  business info + services CRUD
```

### Admin — `/admin/*`
```
/admin                        dashboard
/admin/blog, /admin/blog/new, /admin/blog/[slug]
/admin/treatments, /admin/treatments/new, /admin/treatments/[slug]
/admin/listings, /admin/listings/new, /admin/listings/[id]
/admin/events, /admin/events/new, /admin/events/[id]
/admin/areas, /admin/areas/new, /admin/areas/[slug]
/admin/news, /admin/news/new, /admin/news/[id]
/admin/testimonials, /admin/testimonials/new, /admin/testimonials/[id]
```

---

## Database state — Supabase migrations

| Migration | Purpose | Status |
|---|---|---|
| 001_provider_dashboard.sql | Core provider tables: providers, services, availability_slots, bookings, reviews, payouts + RLS | Run |
| 002_create_provider_function.sql | `create_provider_profile` SECURITY DEFINER | Run |
| 003_public_profiles_and_bookings.sql | Public SELECT policies + anonymous booking + review tokens + helper RPCs | Run |
| 004_member_dashboard.sql | members, member_concerns, member_goals, member_favorites, wellness_checkins + RLS | Run |
| 005_protocols_and_logs.sql | protocol_items, dose_logs, vial_inventory + `upsert_wellness_checkin` RPC | Run |
| 006_journal_goal_practitioner.sql | journal_entries + primary_goal, protocol_start_date, primary_provider_id on members | Run |
| 007_prep_notes.sql | services.prep_notes column | Run |
| 008_provider_onboarding.sql | provider_type, nationality, years_practicing, years_in_uae, practitioner_count, specialties[], languages[] + `create_provider_profile_v2` | **Needs run** |

> ⚠ Migration 008 must be run in Supabase SQL Editor before the new provider wizard works.

---

## Feature surface

### Consumer experience (what a signed-in member has)
- Daily wellness check-in (4 dimensions × 1-5, computes 0-100 score)
- Protocol items (peptide, pharma, supplement, lifestyle, habit) with:
  - Inline dose logging with toast confirmations
  - Kamura Score tier pills (Gold / Strong / Promising / Limited)
  - Titration schedule stepper (6 known peptides seeded)
  - Injection site rotation map (SVG body with 6 zones)
  - Safety banner on pharmaceuticals
  - Alternatives strip (related treatments)
  - Vial inventory tracker with auto-decrement on dose log
  - Low-inventory nudge banner on Today
- Journal with free-text + metric chips (energy/mood/pain/sleep)
- Habit streaks card (top 5 by count)
- Practitioner-of-record card with next session
- Progress charts (30-day score, dimensions, adherence)
- Bookings with upcoming/past tabs + prep checklist + review links
- Personalized insight card on Today

### Provider experience
- 5-step onboarding wizard (solo vs clinic branching) — captures specialties, nationality, years, client count, price range, languages, socials
- Today's bookings with mark-complete + WhatsApp link
- Weekly availability with recurring slot creation
- Services CRUD with prep_notes, treatment_slug (links to Kamura-scored treatment)
- Earnings (monthly + all-time + Stripe stub)
- Reviews with flag + rating distribution
- Settings with business info + services

### Public marketplace
- Single Join CTA opens 2-option modal (Client / Provider signup)
- Homepage: animated hero + smart search + 3 doors + 6 practitioners grid
- Discover page: horizontal-scroll sections per sketch (Services / Clinics / Experts) with category filters
- Treatment pages link to Supabase providers offering that treatment_slug
- Public provider profile with booking widget (5-step flow)
- Anonymous wellness checker (simplified: 12 fields cut)

---

## SEO — fully audited

Every public route has:
- ✓ Metadata (title, description, keywords where relevant)
- ✓ Canonical URL
- ✓ OpenGraph + Twitter cards
- ✓ JSON-LD structured data

Specific schemas in use:
- `Organization` + `WebSite` on site-wide root
- `Article` + `BreadcrumbList` + `FAQPage` on blog posts
- `Article` + `FAQPage` on `/peptides/what-is-a-peptide`
- `WebApplication` on peptide tracker and peptide advisor
- `LocalBusiness` + `AggregateRating` on provider public profiles
- `CollectionPage` + `ItemList` on directories

Sitemap: `/sitemap.xml` — 215+ URLs, submitted to Google Search Console, status: Success.

---

## Internationalization

- EN / AR toggle in nav
- IBM Plex Sans Arabic loaded
- RTL direction auto-flips on lang change
- Translation dictionary covers: nav labels, homepage hero, directory hero, wellness checker hero
- ⚠ `/my/*` dashboard routes not yet translated (deferred to i18n expansion phase)

---

## Analytics

- Google Analytics `G-DVKBZLV95P` active
- Vercel Analytics + Speed Insights
- No custom event tracking yet (Key events show 0 in GA)
- 30-day users: 74 · 7-day: 31 (as of last check)

---

## Known gaps / tech debt

### Architectural
1. **Static `listings.ts` (128 clinics) vs dynamic Supabase `providers`** — two parallel universes. New Supabase provider signups don't appear on `/explore` which still reads `listings.ts`. Bridge needed.
2. **Taxonomy sprawl** — 5 different category lists (treatment categories, solo categories, clinic categories, specialty tags, wellness concerns). Recognized in the taxonomy plan, not yet consolidated.
3. **Peptide tracker duplication** — `/peptides/tracker` (localStorage) vs `/my/protocol` (Supabase). Import banner exists but the two surfaces still co-exist and confuse UX.

### Feature gaps from earlier PRD
- Ask Kamura AI (global assistant reading member data) — not started
- Lab PDF upload + OCR parse into biomarkers — not started
- Biomarkers panel grouped by body system — not started
- Biological age metric — not started
- Provider-side session notes flow that lands on member bookings — not started
- Member messaging with primary provider — not started
- Export my data / Delete my account (PDPL/GDPR) — not started
- Insurance claim export — not started
- Wearable integrations beyond concept (Apple Health, Whoop, Oura) — not started
- Granular notification preferences — not started

### Content
- The 6 dummy practitioners on homepage and `/explore` have `/provider/[slug]` URLs that 404 — need either seed rows in Supabase or a fallback page.

### Launch readiness
- No welcome email after signup (Supabase Auth can be wired)
- No custom Google Analytics events (0 in key events dashboard)
- Deleted account / data export flow not built (compliance)

---

## Immediate next work queued

From the taxonomy & structured data plan:

**Slice 1** — unified canonical taxonomy (6 baskets: RESTORE / EXTEND / FUEL / MOVE / STILL / SENSE) → refactor all category lists to inherit → re-tag treatments → prune non-preventive items.

**Slice 2** — service templates (VO2max / red light / IV / peptide / body comp first) with hybrid fill (practitioner 80%, client 20%).

**Slice 3** — structured session data flows into `/my/progress` as trend lines and summaries per focus area.

Decisions already locked:
- Taxonomy: Kamura-owned schemas, identical across providers
- Provider basket selection: one primary + up to two secondary
- Fill model: hybrid 80/20
- Display: clean service name + small basket badge
- Cross-provider comparison is the moat

---

## Repository health

- 19 commits on `main` since first push, all descriptive
- No uncommitted production code at audit time
- `.gitignore` updated to exclude `/screenshots/`, dump folders, freepik assets, and unused Next.js template SVGs
- `.claude/settings.local.json` gitignored (personal); `.claude/settings.json` committed as team config
- 401-line `FIGMA_MAKE_PROMPT.md` in repo root for design regeneration
- 8 Supabase migrations committed; up to migration 007 confirmed run in production, migration 008 pending

---

*Audit generated April 2026. Re-run `npx tsc --noEmit` and `curl kamuralife.com` for a fresh health check at any time.*
