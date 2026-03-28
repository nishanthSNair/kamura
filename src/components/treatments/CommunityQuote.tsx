import type { CommunityQuote as CommunityQuoteType } from "@/data/treatments";

interface CommunityQuoteProps {
 quote: CommunityQuoteType;
}

export default function CommunityQuote({ quote }: CommunityQuoteProps) {
 return (
 <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 relative">
 <span className="absolute top-2 left-3 font-serif text-4xl text-kamura-gold/30 leading-none select-none">
 &ldquo;
 </span>
 <p className="text-[13px] text-gray-600 leading-relaxed font-sans pl-6">
 {quote.text}
 </p>
 <p className="text-[11px] text-gray-400 font-sans mt-2 pl-6">
 {quote.source} &bull; {quote.location}
 {quote.verified && (
 <span className="ml-1.5 text-[#4ADE80]">&bull; Verified</span>
 )}
 </p>
 </div>
 );
}
