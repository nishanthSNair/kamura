import type { Interactions } from "@/data/treatments";

interface InteractionsPanelProps {
 interactions?: Interactions;
 contraindications?: string[];
}

export default function InteractionsPanel({ interactions, contraindications }: InteractionsPanelProps) {
 const hasInteractions =
 interactions &&
 (interactions.drugs.length > 0 ||
 interactions.supplements.length > 0 ||
 interactions.food.length > 0);
 const hasContraindications = contraindications && contraindications.length > 0;

 if (!hasInteractions && !hasContraindications) return null;

 return (
 <section id="interactions" className="scroll-mt-24">
 <div className="bg-[#EA580C]/[0.03] border border-[#EA580C]/15 rounded-2xl p-8 md:p-10">
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
 className="text-[#EA580C]"
 >
 <circle cx="12" cy="12" r="10" />
 <line x1="12" y1="8" x2="12" y2="12" />
 <line x1="12" y1="16" x2="12.01" y2="16" />
 </svg>
 Interactions &amp; Contraindications
 </h2>

 {hasInteractions && (
 <div className="grid md:grid-cols-3 gap-6 mb-6">
 {interactions.drugs.length > 0 && (
 <div>
 <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-sans mb-2">
 Drug Interactions
 </h3>
 <ul className="space-y-1.5">
 {interactions.drugs.map((item) => (
 <li key={item} className="text-sm text-gray-600 font-sans flex gap-2">
 <span className="text-[#EA580C] mt-1 shrink-0">•</span>
 {item}
 </li>
 ))}
 </ul>
 </div>
 )}
 {interactions.supplements.length > 0 && (
 <div>
 <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-sans mb-2">
 Supplement Interactions
 </h3>
 <ul className="space-y-1.5">
 {interactions.supplements.map((item) => (
 <li key={item} className="text-sm text-gray-600 font-sans flex gap-2">
 <span className="text-[#CA8A04] mt-1 shrink-0">•</span>
 {item}
 </li>
 ))}
 </ul>
 </div>
 )}
 {interactions.food.length > 0 && (
 <div>
 <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-sans mb-2">
 Food &amp; Timing
 </h3>
 <ul className="space-y-1.5">
 {interactions.food.map((item) => (
 <li key={item} className="text-sm text-gray-600 font-sans flex gap-2">
 <span className="text-gray-400 mt-1 shrink-0">•</span>
 {item}
 </li>
 ))}
 </ul>
 </div>
 )}
 </div>
 )}

 {hasContraindications && (
 <div className={hasInteractions ? "pt-5 border-t border-[#EA580C]/10" : ""}>
 <h3 className="text-xs font-semibold text-[#EA580C] uppercase tracking-wider font-sans mb-3 flex items-center gap-1.5">
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
 </svg>
 Who Should Avoid
 </h3>
 <ul className="space-y-1.5">
 {contraindications.map((item) => (
 <li key={item} className="text-sm text-gray-600 font-sans flex gap-2">
 <span className="text-[#DC2626] mt-1 shrink-0">•</span>
 {item}
 </li>
 ))}
 </ul>
 </div>
 )}
 </div>
 </section>
 );
}
