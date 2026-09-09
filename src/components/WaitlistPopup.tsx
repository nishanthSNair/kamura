"use client";

import { useEffect, useState } from "react";
import EmailWaitlist from "@/components/EmailWaitlist";

/**
 * WaitlistPopup — a single, well-mannered email-capture modal.
 *
 * Usage:
 *   <WaitlistPopup
 *     storageKey="kamura.popup.home"
 *     source="peptide_waitlist"
 *     delayMs={8000}
 *   />
 *
 * Behaviour:
 *   - Appears after `delayMs` on the page (default 8s) — long enough that
 *     visitors get a real first impression before being interrupted.
 *   - Shows at most once per browser session (sessionStorage flag).
 *   - If the visitor dismisses, hides for 30 days (localStorage flag).
 *   - If the visitor submits an email, never shows again on this device.
 *   - Press Esc, click the backdrop, or click the close (×) to dismiss.
 *   - Headline copy reflects the 2026 preventive medicine moment so the
 *     reader feels like joining is timely, not generic.
 */

const DISMISS_DAYS = 30;
const SHOWN_KEY_SESSION = "kamura.popup.shown.thisSession";

interface Props {
  /**
   * Unique key per popup placement (homepage, peptides, etc.) so multiple
   * placements can each persist their own state without colliding.
   */
  storageKey: string;
  /** Which waitlist source the form posts to. */
  source: "peptide_waitlist" | "booking_waitlist" | "newsletter";
  /** Milliseconds before the popup opens. Default 8000. */
  delayMs?: number;
}

export default function WaitlistPopup({
  storageKey,
  source,
  delayMs = 8000,
}: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Decide whether to even schedule the show
    if (typeof window === "undefined") return;

    // Already submitted on this device — never show again
    if (window.localStorage.getItem(`${storageKey}.submitted`) === "1") return;

    // Dismissed less than 30 days ago — respect the choice
    const dismissedAtRaw = window.localStorage.getItem(`${storageKey}.dismissedAt`);
    if (dismissedAtRaw) {
      const dismissedAt = Number(dismissedAtRaw);
      const msSinceDismiss = Date.now() - dismissedAt;
      if (msSinceDismiss < DISMISS_DAYS * 24 * 60 * 60 * 1000) return;
    }

    // Already shown once this session — don't double-fire
    if (window.sessionStorage.getItem(SHOWN_KEY_SESSION) === "1") return;

    const timer = window.setTimeout(() => {
      setOpen(true);
      try {
        window.sessionStorage.setItem(SHOWN_KEY_SESSION, "1");
      } catch {
        /* private mode etc — ignore */
      }
    }, delayMs);

    return () => window.clearTimeout(timer);
  }, [storageKey, delayMs]);

  // Esc-to-close + body scroll lock while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleDismiss();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function handleDismiss() {
    setOpen(false);
    try {
      window.localStorage.setItem(`${storageKey}.dismissedAt`, String(Date.now()));
    } catch {
      /* ignore */
    }
  }

  function handleSubmitted() {
    try {
      window.localStorage.setItem(`${storageKey}.submitted`, "1");
    } catch {
      /* ignore */
    }
    // Leave the popup open briefly so the success state in EmailWaitlist
    // is visible, then auto-close
    window.setTimeout(() => setOpen(false), 2400);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="waitlist-popup-headline"
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 animate-blur-fade-up"
      onClick={handleDismiss}
    >
      {/* Backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
      />

      {/* Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-[480px] bg-gradient-to-br from-[#1A1612] via-[#173C3B] to-[#1A1612] text-white rounded-t-3xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)]"
      >
        {/* Warm radial accent */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 20% 0%, rgba(196,168,130,0.22) 0%, transparent 55%), radial-gradient(ellipse at 100% 100%, rgba(181,115,106,0.18) 0%, transparent 60%)",
          }}
        />

        {/* Close button */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 grid place-items-center rounded-full text-white/55 hover:text-white hover:bg-white/8 transition-colors text-[22px] leading-none z-10"
        >
          ×
        </button>

        <div className="relative p-7 sm:p-9">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-7 h-px bg-[#DCEC8B]" />
            <p className="text-[10px] tracking-[0.34em] uppercase text-[#DCEC8B] font-semibold font-sans">
              Kamura · By Invitation
            </p>
          </div>

          {/* Headline */}
          <h2
            id="waitlist-popup-headline"
            className="font-serif text-[28px] sm:text-[34px] leading-[1.05] tracking-[-0.015em] mb-4"
          >
            Founding member access, by application.
          </h2>

          {/* Subhead */}
          <p className="text-[14px] sm:text-[15px] leading-[1.6] text-white/72 font-sans mb-7 max-w-[46ch]">
            When physician-prescribed compounded peptides open in the UAE,
            founding members go first — priority protocol review, member
            pricing, and a vetted practitioner network. A limited number of
            places opens each month.
          </p>

          {/* Form */}
          <p className="text-[10.5px] tracking-[0.28em] uppercase text-[#DCEC8B] font-semibold font-sans mb-3">
            Apply for a founding place
          </p>
          <EmailWaitlist
            source={source}
            theme="dark"
            placeholder="you@example.com"
            cta="Request access"
            successMessage="Application received. We'll be in touch when a place opens."
            className="!mx-0"
            onSubmittedExtra={handleSubmitted}
          />

          <p className="mt-5 text-[10.5px] tracking-[0.04em] text-white/40 font-sans leading-relaxed">
            No spam. Unsubscribe anytime. We never sell your data.
          </p>
        </div>
      </div>
    </div>
  );
}
