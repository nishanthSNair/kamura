"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

/**
 * Email waitlist form — single-input, single-shot, RHF + Zod + Sonner toast.
 *
 *   <EmailWaitlist source="peptide_waitlist" />
 *   <EmailWaitlist source="booking_waitlist" placeholder="..." cta="Notify me" />
 *
 * Posts to /api/email-signup. Idempotent on (email, source) — re-submitting
 * the same email looks like success to the user.
 */

const Schema = z.object({
  email: z.string().email("Enter a valid email"),
});
type FormValues = z.infer<typeof Schema>;

type Source =
  | "peptide_waitlist"
  | "booking_waitlist"
  | "newsletter"
  | "unspecified";

interface Props {
  source: Source;
  placeholder?: string;
  cta?: string;
  /** Shown after successful submit. */
  successMessage?: string;
  className?: string;
  /**
   * Visual variant. "light" (default) for cream/white backgrounds.
   * "dark" inverts colors for the homepage Act 4 dark section, etc.
   */
  theme?: "light" | "dark";
  /**
   * Optional hook fired after a successful submit. Used by the wellness
   * checker gate to flip its unlock state when an email lands. Pure
   * side-effect — fires once.
   */
  onSubmittedExtra?: () => void;
}

export default function EmailWaitlist({
  source,
  placeholder = "you@example.com",
  cta = "Join waitlist",
  successMessage = "You're on the list. We'll be in touch.",
  className = "",
  theme = "light",
  onSubmittedExtra,
}: Props) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: FormValues) {
    try {
      const res = await fetch("/api/email-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email, source }),
      });
      if (!res.ok) throw new Error("submit_failed");
      toast.success(successMessage);
      setSubmitted(true);
      onSubmittedExtra?.();
    } catch {
      toast.error("Something went wrong. Try again in a moment.");
    }
  }

  const isDark = theme === "dark";

  if (submitted) {
    return (
      <div
        className={`mx-auto inline-flex items-center justify-center max-w-[440px] rounded-full px-6 py-3.5 text-[13.5px] ${
          isDark
            ? "bg-white/10 border border-white/25 text-white"
            : "bg-white border border-[#2A2520]/10 text-[#2A2520]"
        } ${className}`}
      >
        <span>✓ {successMessage}</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={`mx-auto flex flex-col sm:flex-row gap-2 max-w-[440px] ${className}`}
    >
      <div
        className={`flex-1 flex rounded-full p-1.5 transition-colors ${
          isDark
            ? "bg-white/8 border border-white/20 focus-within:border-white/55"
            : "bg-white border border-[#2A2520]/12 shadow-[0_2px_12px_-6px_rgba(42,37,32,0.08)] focus-within:border-[#2A2520]/40"
        }`}
      >
        <input
          type="email"
          placeholder={placeholder}
          aria-label="Email address"
          autoComplete="email"
          inputMode="email"
          {...register("email")}
          className={`flex-1 bg-transparent border-0 outline-none text-[14px] px-4 ${
            isDark
              ? "text-white placeholder:text-white/45"
              : "text-[#2A2520] placeholder:text-[#2A2520]/40"
          }`}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn-hims shrink-0 disabled:opacity-60 disabled:cursor-not-allowed border-0 rounded-full px-5 h-10 text-[13px] font-sans font-semibold ${
            isDark
              ? "bg-[#C4A882] hover:bg-[#B59872] text-[#2A2520]"
              : "bg-[#2A2520] hover:bg-[#1A1612] text-white"
          }`}
        >
          {isSubmitting ? "…" : cta}
        </button>
      </div>
      {errors.email && (
        <p
          className={`text-[12px] sm:absolute mt-2 sm:mt-0 sm:translate-y-12 text-left px-3 ${
            isDark ? "text-red-300/90" : "text-red-700/85"
          }`}
        >
          {errors.email.message}
        </p>
      )}
    </form>
  );
}
