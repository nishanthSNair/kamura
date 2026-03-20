"use client";

import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // For now, just show success. Integrate with a service (Mailchimp, ConvertKit, etc.) later.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-2 text-sm text-moss dark:text-sage font-sans">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        Thanks! We&apos;ll be in touch.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm">
      <input
        type="email"
        required
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/[0.08] rounded-l-lg px-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 outline-none focus:border-sage/60 font-sans"
      />
      <button
        type="submit"
        className="bg-moss dark:bg-sage-light text-white dark:text-forest px-5 py-3 text-sm font-sans font-medium rounded-r-lg hover:bg-forest dark:hover:bg-sage transition-colors shrink-0"
      >
        Subscribe
      </button>
    </form>
  );
}
