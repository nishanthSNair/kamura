"use client";

import { useMemo, useState } from "react";
import {
 type WellnessConcern,
 type BodyZone,
 ZONES,
} from "@/data/wellness-concerns";
import {
 type EnrichedMatchedTreatment,
 type BlogPostSummary,
 buildProtocol,
 matchBlogPosts,
} from "@/data/wellness-checker";
import ConcernExplainer from "./ConcernExplainer";
import ReportTreatmentCard from "./ReportTreatmentCard";
import ProtocolPlan from "./ProtocolPlan";
import RelatedContent from "./RelatedContent";
import ShareCardModal from "@/components/share-cards/ShareCardModal";
import BodyMapCard from "@/components/share-cards/BodyMapCard";

interface WellnessReportProps {
 results: EnrichedMatchedTreatment[];
 selectedConcerns: WellnessConcern[];
 completedZones: BodyZone[];
 blogPosts: BlogPostSummary[];
 onAddAnother: () => void;
 onRestart: () => void;
}

const INITIAL_SHOW = 6;

export default function WellnessReport({
 results,
 selectedConcerns,
 completedZones,
 blogPosts,
 onAddAnother,
 onRestart,
}: WellnessReportProps) {
 const protocol = useMemo(() => buildProtocol(results), [results]);
 const relatedPosts = useMemo(
 () => matchBlogPosts(results, blogPosts),
 [results, blogPosts]
 );

 // Unique zone labels for the header
 const zoneLabels = completedZones
 .map((z) => ZONES.find((zc) => zc.zone === z))
 .filter(Boolean)
 .map((z) => `${z!.icon} ${z!.label}`);

 const hasProtocol = protocol.morning.length > 0 || protocol.midday.length > 0 || protocol.evening.length > 0;

 const [showShareCard, setShowShareCard] = useState(false);

 // Data for share card
 const shareCardZones = completedZones
 .map((z) => ZONES.find((zc) => zc.zone === z))
 .filter(Boolean)
 .map((z) => ({ icon: z!.icon, label: z!.label }));

 const shareCardTreatments = results.slice(0, 5).map((r, i) => ({
 rank: i + 1,
 name: r.treatment.name,
 kamuraScore: r.treatment.kamuraScore,
 }));

 return (
 <div className="min-h-screen px-6 pt-24 pb-20">
 <div className="max-w-4xl mx-auto">
 {/* Report header */}
 <div className="mb-10">
 <h1 className="font-serif text-2xl md:text-4xl text-gray-900">
 Your Wellness Report
 </h1>
 <p className="text-sm text-gray-500 font-sans mt-2">
 Personalized recommendations based on {selectedConcerns.length} concern{selectedConcerns.length !== 1 ? "s" : ""} across {zoneLabels.join(" & ")}
 </p>

 {/* Action bar */}
 <div className="flex flex-wrap gap-2 mt-4">
 {results.length > 0 && (
  <button
  onClick={() => setShowShareCard(true)}
  className="px-4 py-2 text-sm font-sans text-white bg-moss hover:bg-forest rounded-full transition-colors flex items-center gap-1.5"
  >
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
   <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
   <circle cx="8.5" cy="8.5" r="1.5" />
   <polyline points="21 15 16 10 5 21" />
  </svg>
  Share as Image
  </button>
 )}
 <button
  onClick={onAddAnother}
  className="px-4 py-2 text-sm font-sans text-terracotta border border-terracotta/30 rounded-full hover:bg-terracotta/5 transition-colors"
 >
  + Add another area
 </button>
 <button
  onClick={onRestart}
  className="px-4 py-2 text-sm font-sans text-gray-400 hover:text-gray-600 transition-colors"
 >
  Start over
 </button>
 </div>
 </div>

 {/* Section A: Understanding Your Concerns */}
 <section className="mb-12">
 <h2 className="font-serif text-xl md:text-2xl text-gray-900 mb-1">
 Understanding Your Concerns
 </h2>
 <p className="text-sm text-gray-500 font-sans mb-5">
 What the science says about the areas you selected
 </p>
 <ConcernExplainer concerns={selectedConcerns} />
 </section>

 {/* Section B: Recommended Treatments */}
 <section className="mb-12">
 <h2 className="font-serif text-xl md:text-2xl text-gray-900 mb-1">
 Your Top Treatments
 </h2>
 <p className="text-sm text-gray-500 font-sans mb-5">
 {results.length} treatments ranked by relevance and evidence strength. Tap to expand.
 </p>

 {results.length === 0 ? (
 <div className="text-center py-16">
 <p className="text-gray-400 font-sans">
 No treatments matched your concerns. Try selecting different concerns or adding another body area.
 </p>
 </div>
 ) : (
 <div className="space-y-3">
 {results.slice(0, INITIAL_SHOW).map((result, i) => (
 <ReportTreatmentCard
 key={result.treatment.slug}
 result={result}
 rank={i + 1}
 delay={i * 60}
 />
 ))}

 {results.length > INITIAL_SHOW && (
 <details className="group">
 <summary className="w-full py-3.5 mt-2 border border-gray-200 rounded-xl text-sm font-sans text-gray-600 hover:border-terracotta/40 hover:text-terracotta transition-all bg-white cursor-pointer text-center list-none">
 <span className="group-open:hidden">
 Show {results.length - INITIAL_SHOW} more treatments
 </span>
 <span className="hidden group-open:inline">
 Show fewer treatments
 </span>
 </summary>
 <div className="space-y-3 mt-3">
 {results.slice(INITIAL_SHOW).map((result, i) => (
 <ReportTreatmentCard
 key={result.treatment.slug}
 result={result}
 rank={i + INITIAL_SHOW + 1}
 delay={0}
 />
 ))}
 </div>
 </details>
 )}
 </div>
 )}
 </section>

 {/* Section C: Your Daily Protocol */}
 {hasProtocol && (
 <section className="mb-12">
 <h2 className="font-serif text-xl md:text-2xl text-gray-900 mb-1">
 Your Daily Protocol
 </h2>
 <p className="text-sm text-gray-500 font-sans mb-5">
 A suggested daily plan based on your top treatment recommendations
 </p>
 <ProtocolPlan protocol={protocol} />
 </section>
 )}

 {/* Section D: Go Deeper */}
 {relatedPosts.length > 0 && (
 <section className="mb-12">
 <h2 className="font-serif text-xl md:text-2xl text-gray-900 mb-1">
 Go Deeper
 </h2>
 <p className="text-sm text-gray-500 font-sans mb-5">
 Related articles to learn more about these treatments
 </p>
 <RelatedContent posts={relatedPosts} />
 </section>
 )}

 {/* Disclaimer + Actions */}
 <section className="border-t border-gray-200 pt-8">
 <div className="bg-amber-50/50 border border-amber-200/50 rounded-xl p-5">
 <p className="text-sm text-amber-800 font-sans leading-relaxed">
 <strong>Important:</strong> This report is for educational and informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider before starting any new supplement, treatment, or wellness protocol.
 </p>
 </div>

 <div className="flex flex-wrap gap-3 mt-6 justify-center">
 <button
 onClick={onAddAnother}
 className="px-6 py-3 text-sm font-sans font-medium text-white bg-terracotta hover:bg-terracotta-dark rounded-full transition-colors"
 >
 + Add another body area
 </button>
 <button
 onClick={onRestart}
 className="px-6 py-3 text-sm font-sans text-gray-500 hover:text-gray-700 border border-gray-200 rounded-full transition-colors"
 >
 Start over
 </button>
 </div>
 </section>
 </div>

 {/* Body Map Share Card Modal */}
 <ShareCardModal
 open={showShareCard}
 onClose={() => setShowShareCard(false)}
 title="Share Your Protocol"
 fileName="kamura-protocol.png"
 shareText={`My ${shareCardZones.map(z => z.label).join(" & ")} protocol — ${shareCardTreatments.length} evidence-based treatments from KAMURA Wellness Checker. Try it at kamuralife.com/wellness-checker`}
 cardWidth={1080}
 cardHeight={1350}
 >
 <BodyMapCard
  zones={shareCardZones}
  concernCount={selectedConcerns.length}
  topTreatments={shareCardTreatments}
 />
 </ShareCardModal>
 </div>
 );
}
