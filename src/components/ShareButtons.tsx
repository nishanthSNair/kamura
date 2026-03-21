"use client";

import { useState, useEffect } from "react";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  variant?: "inline" | "block";
}

export default function ShareButtons({
  url,
  title,
  description = "",
  variant = "inline",
}: ShareButtonsProps) {
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCanNativeShare(!!navigator.share);
  }, []);

  const size = variant === "inline" ? 16 : 18;
  const btn =
    variant === "inline"
      ? "inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 dark:text-gray-400 hover:text-moss dark:hover:text-sage hover:bg-sage/10 dark:hover:bg-forest/10 transition-colors"
      : "inline-flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 dark:text-gray-400 hover:text-moss dark:hover:text-sage hover:bg-sage/10 dark:hover:bg-forest/10 transition-colors";

  const whatsappBtn =
    variant === "inline"
      ? "inline-flex items-center justify-center w-8 h-8 rounded-lg text-moss dark:text-sage hover:bg-sage/10 dark:hover:bg-forest/10 transition-colors"
      : "inline-flex items-center justify-center w-9 h-9 rounded-lg text-moss dark:text-sage hover:bg-sage/10 dark:hover:bg-forest/10 transition-colors";

  async function handleNativeShare() {
    try {
      await navigator.share({ title, text: description || title, url });
    } catch {
      // User cancelled or share failed — ignore
    }
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(title + "\n" + url)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className={`flex items-center ${variant === "inline" ? "gap-0.5" : "gap-1"}`}>
      {/* Native Share — mobile only */}
      {canNativeShare && (
        <button onClick={handleNativeShare} className={btn} title="Share" aria-label="Share">
          <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
        </button>
      )}

      {/* WhatsApp — always visible */}
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={whatsappBtn} title="Share on WhatsApp" aria-label="Share on WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </a>

      {/* Twitter/X — shown when no native share */}
      {!canNativeShare && (
        <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className={btn} title="Share on X" aria-label="Share on X">
          <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="4" x2="20" y2="20" />
            <line x1="20" y1="4" x2="4" y2="20" />
          </svg>
        </a>
      )}

      {/* LinkedIn — shown when no native share */}
      {!canNativeShare && (
        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className={btn} title="Share on LinkedIn" aria-label="Share on LinkedIn">
          <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
      )}

      {/* Copy Link */}
      <div className="relative">
        <button onClick={handleCopyLink} className={btn} title="Copy link" aria-label="Copy link">
          <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </button>
        {copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-moss text-white text-[11px] rounded font-sans whitespace-nowrap pointer-events-none animate-fade-in">
            Copied!
          </span>
        )}
      </div>
    </div>
  );
}
