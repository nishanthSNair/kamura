"use client";

import { useState, useEffect } from "react";

interface MobileShareBarProps {
 url: string;
 title: string;
}

export default function MobileShareBar({ url, title }: MobileShareBarProps) {
 const [copied, setCopied] = useState(false);
 const [visible, setVisible] = useState(false);

 useEffect(() => {
  function handleScroll() {
   // Show after scrolling 300px
   setVisible(window.scrollY > 300);
  }
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
 }, []);

 async function handleCopy() {
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
 const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
 const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

 if (!visible) return null;

 return (
  <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200 safe-area-inset-bottom">
   <div className="flex items-center justify-around px-4 py-2.5 max-w-md mx-auto">
    {/* WhatsApp */}
    <a
     href={whatsappUrl}
     target="_blank"
     rel="noopener noreferrer"
     className="flex flex-col items-center gap-1 text-[#25D366]"
     aria-label="Share on WhatsApp"
    >
     <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
     </svg>
     <span className="text-[10px] font-sans">WhatsApp</span>
    </a>

    {/* LinkedIn */}
    <a
     href={linkedinUrl}
     target="_blank"
     rel="noopener noreferrer"
     className="flex flex-col items-center gap-1 text-[#0A66C2]"
     aria-label="Share on LinkedIn"
    >
     <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
     </svg>
     <span className="text-[10px] font-sans">LinkedIn</span>
    </a>

    {/* X / Twitter */}
    <a
     href={twitterUrl}
     target="_blank"
     rel="noopener noreferrer"
     className="flex flex-col items-center gap-1 text-gray-700"
     aria-label="Share on X"
    >
     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
     </svg>
     <span className="text-[10px] font-sans">Post</span>
    </a>

    {/* Copy Link */}
    <button
     onClick={handleCopy}
     className="flex flex-col items-center gap-1 text-gray-500"
     aria-label="Copy link"
    >
     {copied ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-moss">
       <polyline points="20 6 9 17 4 12" />
      </svg>
     ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
       <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
       <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
     )}
     <span className="text-[10px] font-sans">{copied ? "Copied!" : "Copy"}</span>
    </button>
   </div>
  </div>
 );
}
