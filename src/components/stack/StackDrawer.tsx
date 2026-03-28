"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useStackContext, type StackTiming } from "@/context/StackContext";
import { treatments, type Treatment } from "@/data/treatments";
import { parseCostRange, sumCostRanges, formatCostRange } from "@/lib/cost-utils";
import { findSynergies, findInteractions } from "@/lib/stack-analysis";
import ProtocolCompare from "./ProtocolCompare";
import ShareCardModal from "@/components/share-cards/ShareCardModal";
import StackCard from "@/components/share-cards/StackCard";

interface StackDrawerProps {
 open: boolean;
 onClose: () => void;
}

const TIMING_LABELS: Record<StackTiming, string> = {
 morning: "Morning",
 evening: "Evening",
 "as-needed": "As Needed",
};

export default function StackDrawer({ open, onClose }: StackDrawerProps) {
 const { items, removeItem, updateTiming, clearStack, exportToParams } = useStackContext();
 const [showCompare, setShowCompare] = useState(false);
 const [showShareCard, setShowShareCard] = useState(false);
 const [copied, setCopied] = useState(false);

 const treatmentMap = useMemo(() => {
 const map = new Map<string, Treatment>();
 for (const t of treatments) map.set(t.slug, t);
 return map;
 }, []);

 const stackTreatments = useMemo(
 () => items.map((i) => ({ item: i, treatment: treatmentMap.get(i.slug) })).filter((x) => x.treatment) as { item: typeof items[0]; treatment: Treatment }[],
 [items, treatmentMap]
 );

 // Group by timing
 const grouped = useMemo(() => {
 const groups: Record<StackTiming, typeof stackTreatments> = { morning: [], evening: [], "as-needed": [] };
 for (const st of stackTreatments) {
 groups[st.item.timing].push(st);
 }
 return groups;
 }, [stackTreatments]);

 // Cost estimate
 const totalCost = useMemo(() => {
 const ranges = stackTreatments.map((st) => parseCostRange(st.treatment.costEstimate));
 return sumCostRanges(ranges);
 }, [stackTreatments]);

 // Synergies & interactions
 const synergies = useMemo(() => findSynergies(items), [items]);
 const interactions = useMemo(() => findInteractions(items), [items]);

 const handleShare = async () => {
 const params = exportToParams();
 const url = `${window.location.origin}/treatments?stack=${params}`;
 await navigator.clipboard.writeText(url);
 setCopied(true);
 setTimeout(() => setCopied(false), 2000);
 };

 return (
 <>
 {/* Backdrop */}
 {open && (
 <div className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" onClick={onClose} />
 )}

 {/* Drawer */}
 <div
 className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl transition-transform duration-300 ${
 open ? "translate-x-0" : "translate-x-full"
 }`}
 >
 <div className="flex flex-col h-full">
 {/* Header */}
 <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
 <div>
 <h2 className="font-serif text-xl text-gray-900">My Stack</h2>
 <p className="text-xs text-gray-500 font-sans mt-0.5">
 {items.length} treatment{items.length !== 1 ? "s" : ""}
 {totalCost[1] > 0 && (
 <> &middot; Est. {formatCostRange(totalCost[0], totalCost[1])}/mo</>
 )}
 </p>
 </div>
 <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
 <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
 </svg>
 </button>
 </div>

 {/* Content — scrollable */}
 <div className="flex-1 overflow-y-auto">
 {items.length === 0 ? (
 <div className="flex flex-col items-center justify-center h-full px-6 text-center">
 <div className="text-4xl mb-3">🧪</div>
 <p className="text-sm text-gray-500 font-sans">
 Your stack is empty. Browse treatments and click + to build your protocol.
 </p>
 </div>
 ) : (
 <div className="px-6 py-4 space-y-6">
 {/* Grouped Items */}
 {(["morning", "evening", "as-needed"] as StackTiming[]).map((timing) => {
 const group = grouped[timing];
 if (group.length === 0) return null;
 return (
 <div key={timing}>
 <h3 className="text-[11px] uppercase tracking-wider text-gray-400 font-sans font-semibold mb-2.5">
 {TIMING_LABELS[timing]} ({group.length})
 </h3>
 <div className="space-y-2">
 {group.map(({ item, treatment: t }) => (
 <div
 key={t.slug}
 className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100"
 >
 <span className="text-lg shrink-0">{t.icon}</span>
 <div className="flex-1 min-w-0">
 <Link
 href={`/treatments/${t.slug}`}
 onClick={onClose}
 className="font-semibold text-sm text-gray-900 font-sans hover:text-[#B5736A] transition-colors truncate block"
 >
 {t.name}
 </Link>
 <div className="flex items-center gap-2 mt-0.5">
 <span className="text-[10px] text-gray-400 font-sans">
 Score: {t.kamuraScore}
 </span>
 {t.costEstimate && (
 <span className="text-[10px] text-gray-400 font-sans">
 {t.costEstimate}
 </span>
 )}
 </div>
 </div>
 {/* Timing selector */}
 <select
 value={item.timing}
 onChange={(e) => updateTiming(t.slug, e.target.value as StackTiming)}
 className="text-[10px] bg-transparent border border-gray-200 rounded-md px-1.5 py-1 text-gray-500 font-sans cursor-pointer outline-none"
 >
 <option value="morning">AM</option>
 <option value="evening">PM</option>
 <option value="as-needed">PRN</option>
 </select>
 {/* Remove */}
 <button
 onClick={() => removeItem(t.slug)}
 className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
 >
 <svg className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
 </svg>
 </button>
 </div>
 ))}
 </div>
 </div>
 );
 })}

 {/* Synergies */}
 {synergies.length > 0 && (
 <div>
 <h3 className="text-[11px] uppercase tracking-wider text-[#16A34A] font-sans font-semibold mb-2.5 flex items-center gap-1.5">
 <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
 </svg>
 Synergies ({synergies.length})
 </h3>
 <div className="space-y-1.5">
 {synergies.map((s) => (
 <div key={`${s.slugA}-${s.slugB}`} className="text-xs text-gray-500 font-sans px-3 py-2 bg-[#16A34A]/5 rounded-lg border border-[#16A34A]/15">
 {s.nameA} + {s.nameB}
 </div>
 ))}
 </div>
 </div>
 )}

 {/* Interaction Warnings */}
 {interactions.length > 0 && (
 <div>
 <h3 className="text-[11px] uppercase tracking-wider text-[#EA580C] font-sans font-semibold mb-2.5 flex items-center gap-1.5">
 <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
 </svg>
 Interactions ({interactions.length})
 </h3>
 <div className="space-y-1.5">
 {interactions.map((w) => (
 <div key={`${w.slugA}-${w.slugB}`} className="text-xs text-gray-500 font-sans px-3 py-2 bg-[#EA580C]/5 rounded-lg border border-[#EA580C]/15">
 {w.detail}
 </div>
 ))}
 </div>
 </div>
 )}
 </div>
 )}
 </div>

 {/* Footer actions */}
 {items.length > 0 && (
 <div className="border-t border-gray-200 px-6 py-4 space-y-2.5">
 <div className="flex gap-2.5">
 <button
 onClick={() => setShowShareCard(true)}
 className="flex-1 px-4 py-2.5 bg-[#B5736A] hover:bg-[#9A5F57] text-white text-sm font-semibold rounded-xl transition-colors font-sans"
 >
 Share as Image
 </button>
 <button
 onClick={handleShare}
 className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors font-sans"
 >
 {copied ? "Copied!" : "Copy Link"}
 </button>
 </div>
 <div className="flex gap-2.5">
 <button
 onClick={() => setShowCompare(true)}
 className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors font-sans"
 >
 Compare
 </button>
 </div>
 <button
 onClick={clearStack}
 className="w-full text-xs text-gray-400 hover:text-red-500 transition-colors font-sans py-1"
 >
 Clear all
 </button>
 </div>
 )}
 </div>
 </div>

 {/* Protocol Compare Modal */}
 {showCompare && <ProtocolCompare onClose={() => setShowCompare(false)} />}

 {/* Stack Share Card Modal */}
 {showShareCard && (() => {
 const cardTreatments = stackTreatments.map(({ item, treatment: t }) => ({
  name: t.name,
  kamuraScore: t.kamuraScore,
  timing: item.timing,
 }));
 const avgScore = cardTreatments.length > 0
  ? cardTreatments.reduce((sum, t) => sum + t.kamuraScore, 0) / cardTreatments.length
  : 0;
 return (
  <ShareCardModal
  open={showShareCard}
  onClose={() => setShowShareCard(false)}
  title="Share Your Stack"
  fileName="kamura-stack.png"
  shareText={`My wellness stack — ${cardTreatments.length} treatments, avg Kamura Score ${avgScore.toFixed(1)}/100. Build yours at kamuralife.com`}
  cardWidth={1080}
  cardHeight={1350}
  >
  <StackCard treatments={cardTreatments} averageScore={avgScore} />
  </ShareCardModal>
 );
 })()}
 </>
 );
}
