"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
 const [dark, setDark] = useState(false);
 const [mounted, setMounted] = useState(false);

 useEffect(() => {
 setMounted(true);
 const stored = localStorage.getItem("kamura-theme");
 if (stored === "dark") {
 setDark(true);
 } else if (stored === "light") {
 setDark(false);
 } else {
 const prefersDark = window.matchMedia(
 "(prefers-color-scheme: dark)"
 ).matches;
 setDark(prefersDark);
 }
 }, []);

 function toggle() {
 const newDark = !dark;
 setDark(newDark);
 if (newDark) {
 document.documentElement.classList.add("dark");
 localStorage.setItem("kamura-theme", "dark");
 } else {
 document.documentElement.classList.remove("dark");
 localStorage.setItem("kamura-theme", "light");
 }
 }

 // Render invisible placeholder before mount to prevent layout jump
 if (!mounted) {
 return (
 <span className="inline-block w-5 h-5" aria-hidden="true" />
 );
 }

 return (
 <button
 onClick={toggle}
 className="text-gray-800 hover:text-terracotta transition-colors"
 aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
 >
 {dark ? (
 <svg
 xmlns="http://www.w3.org/2000/svg"
 width="20"
 height="20"
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="1.5"
 strokeLinecap="round"
 strokeLinejoin="round"
 >
 <circle cx="12" cy="12" r="5" />
 <line x1="12" y1="1" x2="12" y2="3" />
 <line x1="12" y1="21" x2="12" y2="23" />
 <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
 <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
 <line x1="1" y1="12" x2="3" y2="12" />
 <line x1="21" y1="12" x2="23" y2="12" />
 <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
 <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
 </svg>
 ) : (
 <svg
 xmlns="http://www.w3.org/2000/svg"
 width="20"
 height="20"
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="1.5"
 strokeLinecap="round"
 strokeLinejoin="round"
 >
 <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
 </svg>
 )}
 </button>
 );
}
