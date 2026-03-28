"use client";

import { useState } from "react";

export default function HelpfulFeedback() {
 const [feedback, setFeedback] = useState<"yes" | "no" | null>(null);

 if (feedback) {
  return (
   <div className="text-center py-8">
    <p className="text-sm text-gray-500 font-sans">
     {feedback === "yes" ? "Glad this was helpful!" : "Thanks for letting us know. We'll improve this."}
    </p>
   </div>
  );
 }

 return (
  <div className="text-center py-8">
   <p className="text-sm text-gray-500 font-sans mb-3">Was this article helpful?</p>
   <div className="flex items-center justify-center gap-3">
    <button
     onClick={() => setFeedback("yes")}
     className="flex items-center gap-1.5 px-4 py-2 text-sm font-sans border border-gray-200 rounded-full hover:border-moss hover:text-moss transition-colors"
    >
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
     </svg>
     Yes
    </button>
    <button
     onClick={() => setFeedback("no")}
     className="flex items-center gap-1.5 px-4 py-2 text-sm font-sans border border-gray-200 rounded-full hover:border-red-300 hover:text-red-500 transition-colors"
    >
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
     </svg>
     No
    </button>
   </div>
  </div>
 );
}
