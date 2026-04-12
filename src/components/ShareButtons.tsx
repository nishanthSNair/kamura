"use client";

import { useState, useEffect } from "react";

interface ShareButtonsProps {
 url: string;
 title: string;
 description?: string;
 variant?: "inline" | "sidebar";
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

 async function handleNativeShare() {
 try {
 await navigator.share({ title, text: description || title, url });
 } catch {
 // User cancelled or share failed
 }
 }

 async function handleCopyLink() {
 try {
 await navigator.clipboard.writeText(url);
 } catch {
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

 const shareText = encodeURIComponent(title + "\n" + url);
 const whatsappUrl = `https://wa.me/?text=${shareText}`;
 const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
 const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
 // Instagram doesn't have a direct web share URL — copy link + prompt user
 function handleInstagramShare() {
 handleCopyLink();
 setCopied(false);
 setIgCopied(true);
 setTimeout(() => setIgCopied(false), 2500);
 }
 const [igCopied, setIgCopied] = useState(false);

 /* ─── Sidebar variant: sticky vertical bar on the left side ─── */
 if (variant === "sidebar") {
 return (
 <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2">
 <div className="flex flex-col gap-1.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-2 shadow-lg shadow-black/5">
 <p className="text-[9px] text-gray-400 uppercase tracking-widest font-sans text-center px-1 pt-1 pb-0.5 font-semibold">
 Share
 </p>

 {/* WhatsApp — most prominent */}
 <a
 href={whatsappUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
 title="Share on WhatsApp"
 aria-label="Share on WhatsApp"
 >
 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
 <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
 </svg>
 </a>

 {/* Instagram */}
 <div className="relative">
 <button
 onClick={handleInstagramShare}
 className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#F58529]/10 via-[#DD2A7B]/10 to-[#8134AF]/10 text-[#DD2A7B] hover:from-[#F58529]/20 hover:via-[#DD2A7B]/20 hover:to-[#8134AF]/20 transition-colors"
 title="Copy link for Instagram"
 aria-label="Copy link for Instagram"
 >
 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
 <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
 <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
 <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
 </svg>
 </button>
 {igCopied && (
 <span className="absolute left-12 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-gray-900 text-white text-[11px] rounded-lg font-sans whitespace-nowrap pointer-events-none shadow-lg">
 Link copied — paste in Story!
 </span>
 )}
 </div>

 {/* Twitter/X */}
 <a
 href={twitterUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center justify-center w-10 h-10 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
 title="Share on X"
 aria-label="Share on X"
 >
 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
 <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
 </svg>
 </a>

 {/* LinkedIn */}
 <a
 href={linkedinUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center justify-center w-10 h-10 rounded-xl text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-colors"
 title="Share on LinkedIn"
 aria-label="Share on LinkedIn"
 >
 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
 <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
 <rect x="2" y="9" width="4" height="12" />
 <circle cx="4" cy="4" r="2" />
 </svg>
 </a>

 {/* Copy Link */}
 <div className="relative">
 <button
 onClick={handleCopyLink}
 className="flex items-center justify-center w-10 h-10 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
 title="Copy link"
 aria-label="Copy link"
 >
 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
 <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
 <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
 </svg>
 </button>
 {copied && (
 <span className="absolute left-12 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-gray-900 text-white text-[11px] rounded-lg font-sans whitespace-nowrap pointer-events-none shadow-lg">
 Link copied!
 </span>
 )}
 </div>

 {/* Native Share — mobile bonus (hidden on desktop but shown on large tablets) */}
 {canNativeShare && (
 <button
 onClick={handleNativeShare}
 className="flex items-center justify-center w-10 h-10 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
 title="More sharing options"
 aria-label="More sharing options"
 >
 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
 <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
 </svg>
 </button>
 )}
 </div>
 </div>
 );
 }

 /* ─── Inline variant: horizontal row for event cards + mobile fallback ─── */
 return (
 <div className="flex items-center gap-1">
 {/* WhatsApp */}
 <a
 href={whatsappUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
 title="Share on WhatsApp"
 aria-label="Share on WhatsApp"
 >
 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
 <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
 </svg>
 </a>

 {/* Instagram */}
 <div className="relative">
 <button
 onClick={handleInstagramShare}
 className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#F58529]/10 via-[#DD2A7B]/10 to-[#8134AF]/10 text-[#DD2A7B] hover:from-[#F58529]/20 hover:via-[#DD2A7B]/20 hover:to-[#8134AF]/20 transition-colors"
 title="Copy link for Instagram"
 aria-label="Copy link for Instagram"
 >
 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
 <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
 <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
 <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
 </svg>
 </button>
 {igCopied && (
 <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded-lg font-sans whitespace-nowrap pointer-events-none shadow-lg">
 Paste in Story!
 </span>
 )}
 </div>

 {/* Twitter/X */}
 <a
 href={twitterUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
 title="Share on X"
 aria-label="Share on X"
 >
 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
 <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
 </svg>
 </a>

 {/* LinkedIn */}
 <a
 href={linkedinUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-colors"
 title="Share on LinkedIn"
 aria-label="Share on LinkedIn"
 >
 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
 <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
 <rect x="2" y="9" width="4" height="12" />
 <circle cx="4" cy="4" r="2" />
 </svg>
 </a>

 {/* Copy Link */}
 <div className="relative">
 <button
 onClick={handleCopyLink}
 className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
 title="Copy link"
 aria-label="Copy link"
 >
 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
 <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
 <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
 </svg>
 </button>
 {copied && (
 <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-[11px] rounded-lg font-sans whitespace-nowrap pointer-events-none shadow-lg">
 Copied!
 </span>
 )}
 </div>

 {/* Native Share (mobile) */}
 {canNativeShare && (
 <button
 onClick={handleNativeShare}
 className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
 title="More"
 aria-label="More sharing options"
 >
 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
 <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
 <polyline points="16 6 12 2 8 6" />
 <line x1="12" y1="2" x2="12" y2="15" />
 </svg>
 </button>
 )}
 </div>
 );
}
