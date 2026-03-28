"use client";

import { useState } from "react";

interface FaqItem {
 question: string;
 answer: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
 const [openIndex, setOpenIndex] = useState<number | null>(null);

 return (
  <div className="divide-y divide-sage/20">
   {items.map((faq, i) => {
    const isOpen = openIndex === i;
    return (
     <div key={i}>
      <button
       onClick={() => setOpenIndex(isOpen ? null : i)}
       className="w-full flex items-start justify-between gap-4 py-5 text-left group"
       aria-expanded={isOpen}
      >
       <h3 className="font-sans text-base font-semibold text-gray-900 group-hover:text-terracotta transition-colors">
        {faq.question}
       </h3>
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
        className={`shrink-0 mt-0.5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
       >
        <polyline points="6 9 12 15 18 9" />
       </svg>
      </button>
      <div
       className={`overflow-hidden transition-all duration-200 ${isOpen ? "max-h-96 pb-5" : "max-h-0"}`}
      >
       <p className="text-sm text-gray-600 font-sans leading-relaxed pr-8">
        {faq.answer}
       </p>
      </div>
     </div>
    );
   })}
  </div>
 );
}
