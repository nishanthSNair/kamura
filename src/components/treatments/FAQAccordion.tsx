"use client";

import { useState } from "react";
import type { FAQItem } from "@/data/treatments";

interface FAQAccordionProps {
 faq?: FAQItem[];
 treatmentName: string;
}

export default function FAQAccordion({ faq, treatmentName }: FAQAccordionProps) {
 const [openIndex, setOpenIndex] = useState<number | null>(null);

 if (!faq || faq.length === 0) return null;

 const jsonLd = {
 "@context": "https://schema.org",
 "@type": "FAQPage",
 mainEntity: faq.map((item) => ({
 "@type": "Question",
 name: item.question,
 acceptedAnswer: {
 "@type": "Answer",
 text: item.answer,
 },
 })),
 };

 return (
 <section id="faq" className="scroll-mt-24">
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 />

 <div className="bg-zen-mist/60 border border-sage-light/40 rounded-2xl p-8 md:p-10">
 <h2 className="font-serif text-xl text-gray-900 mb-5 flex items-center gap-2.5">
 <svg
 width="20"
 height="20"
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="1.5"
 strokeLinecap="round"
 strokeLinejoin="round"
 className="text-moss"
 >
 <circle cx="12" cy="12" r="10" />
 <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
 <line x1="12" y1="17" x2="12.01" y2="17" />
 </svg>
 Frequently Asked Questions
 </h2>

 <div className="space-y-2">
 {faq.map((item, i) => (
 <div
 key={i}
 className="border border-sage-light/30 rounded-xl bg-white/60 overflow-hidden"
 >
 <button
 onClick={() => setOpenIndex(openIndex === i ? null : i)}
 className="w-full flex items-center justify-between px-5 py-4 text-left"
 aria-expanded={openIndex === i}
 >
 <span className="text-sm font-semibold text-gray-900 font-sans pr-4">
 {item.question}
 </span>
 <svg
 width="16"
 height="16"
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="2"
 strokeLinecap="round"
 strokeLinejoin="round"
 className={`text-gray-400 shrink-0 transition-transform duration-200 ${
 openIndex === i ? "rotate-180" : ""
 }`}
 >
 <polyline points="6 9 12 15 18 9" />
 </svg>
 </button>
 <div
 className={`transition-all duration-200 ease-in-out overflow-hidden ${
 openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
 }`}
 >
 <div className="px-5 pb-4">
 <p className="text-sm text-gray-600 font-sans leading-relaxed">
 {item.answer}
 </p>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 );
}
