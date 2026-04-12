"use client";

import { useState, useEffect } from "react";

const ROTATING_WORDS = [
 "longevity clinics",
 "peptide therapy",
 "red light therapists",
 "wellness protocols",
 "NAD+ infusions",
 "cryotherapy studios",
 "functional medicine",
 "biohacking centres",
 "IV drip clinics",
 "hormone specialists",
];

export default function AnimatedConnecting() {
 const [currentIndex, setCurrentIndex] = useState(0);
 const [fade, setFade] = useState(true);

 useEffect(() => {
 const interval = setInterval(() => {
  setFade(false);
  setTimeout(() => {
  setCurrentIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
  setFade(true);
  }, 400);
 }, 2800);
 return () => clearInterval(interval);
 }, []);

 return (
 <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal leading-[1.1] text-white mb-6 tracking-[-0.01em]">
  Connecting you to
  <br />
  <span
  className={`inline-block text-terracotta transition-all duration-400 ${
   fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
  }`}
  >
  {ROTATING_WORDS[currentIndex]}
  </span>
 </h1>
 );
}
