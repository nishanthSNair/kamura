import EmailWaitlist from "@/components/EmailWaitlist";
import type { BlogCtaSource } from "@/lib/blog";

/**
 * BlogPostCTA — end-of-article lead capture block.
 *
 * Goes at the bottom of every blog post (or post-FAQ if FAQ exists).
 * The CTA copy is keyed off the `source` so a peptide article asks the
 * reader to join the peptide waitlist, a service-booking-flavoured
 * article asks for the booking waitlist, etc. Default = newsletter.
 *
 * Posts opt in by setting `cta: peptide_waitlist` (etc.) in frontmatter.
 * Falls back to a generic newsletter CTA if no frontmatter set.
 */

interface Props {
  source?: BlogCtaSource;
}

const CTA_COPY: Record<
  BlogCtaSource,
  {
    eyebrow: string;
    headline: string;
    body: string;
    button: string;
    success: string;
  }
> = {
  peptide_waitlist: {
    eyebrow: "Compounded peptides · UAE · Coming Q3 2026",
    headline: "Want this prescribed in the UAE?",
    body: "Kamura is launching physician-prescribed compounded peptides with a UAE-licensed homecare partner and equity-tied compounding pharmacy. Be first when we open access.",
    button: "Join the peptide waitlist",
    success:
      "You're on the peptide waitlist. We'll be in touch before launch.",
  },
  booking_waitlist: {
    eyebrow: "Wellness booking · UAE · Soon",
    headline: "Be first to book trusted UAE practitioners.",
    body: "Kamura is curating the UAE's most vetted wellness clinics — sound healing, IV therapy, breathwork, recovery and more. Get notified when bookings open.",
    button: "Join the booking waitlist",
    success: "You're on the booking waitlist. We'll let you know first.",
  },
  newsletter: {
    eyebrow: "Kamura · Heart of Longevity",
    headline: "One letter. The long game.",
    body: "Evidence-based wellness reading, sourcing intel for UAE compounded peptides, and what's actually working at the leading edge of preventive medicine. No spam — only when it matters.",
    button: "Subscribe",
    success: "You're on the list. We'll be in touch.",
  },
};

export default function BlogPostCTA({ source = "newsletter" }: Props) {
  const copy = CTA_COPY[source];

  return (
    <aside
      aria-label="Newsletter signup"
      className="my-12 not-prose rounded-3xl border border-[#173C3B]/10 bg-gradient-to-br from-[#FAFCF7] via-[#F3EEE2] to-[#E7F3EB] p-7 md:p-10"
    >
      <p className="text-[10px] tracking-[0.32em] uppercase text-terracotta font-semibold font-sans mb-3">
        {copy.eyebrow}
      </p>
      <h3 className="font-serif text-[24px] md:text-[30px] leading-[1.1] tracking-[-0.005em] text-[#173C3B] mb-3 max-w-[22ch]">
        {copy.headline}
      </h3>
      <p className="text-[14.5px] md:text-[15.5px] leading-[1.6] text-[#173C3B]/70 font-sans mb-6 max-w-[58ch]">
        {copy.body}
      </p>

      <EmailWaitlist
        source={source}
        cta={copy.button}
        successMessage={copy.success}
        className="!mx-0"
      />

      <p className="mt-4 text-[11px] tracking-[0.04em] text-[#173C3B]/45 font-sans">
        No spam. Unsubscribe anytime. We never sell your data.
      </p>
    </aside>
  );
}
