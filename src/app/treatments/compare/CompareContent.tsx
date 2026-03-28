"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
 treatments,
 getTreatmentBySlug,
 type Treatment,
} from "@/data/treatments";
import KamuraScoreBadge from "@/components/treatments/KamuraScoreBadge";
import EvidenceLevelTag from "@/components/treatments/EvidenceLevelTag";

interface CompareContentProps {
 initialSlugs?: [string, string];
}

interface ComparisonRow {
 label: string;
 getValue: (t: Treatment) => React.ReactNode;
 highlight?: boolean;
}

export default function CompareContent({ initialSlugs }: CompareContentProps) {
 const router = useRouter();
 const [slug1, setSlug1] = useState<string | null>(initialSlugs?.[0] ?? null);
 const [slug2, setSlug2] = useState<string | null>(initialSlugs?.[1] ?? null);

 const t1 = slug1 ? getTreatmentBySlug(slug1) ?? null : null;
 const t2 = slug2 ? getTreatmentBySlug(slug2) ?? null : null;

 const hasSelections = t1 !== null || t2 !== null;
 const hasBoth = t1 !== null && t2 !== null;

 // Group treatments by category for the dropdown
 const grouped = useMemo(() => {
 const map = new Map<string, Treatment[]>();
 for (const t of treatments) {
 const arr = map.get(t.category) || [];
 arr.push(t);
 map.set(t.category, arr);
 }
 return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
 }, []);

 function handleSlugChange(index: 1 | 2, value: string | null) {
 if (index === 1) setSlug1(value);
 else setSlug2(value);

 // Update URL for shareable comparisons
 const s1 = index === 1 ? value : slug1;
 const s2 = index === 2 ? value : slug2;
 if (s1 && s2) {
 router.replace(`/treatments/compare/${s1}-vs-${s2}`, { scroll: false });
 }
 }

 function winnerClass(
 val1: number | undefined,
 val2: number | undefined,
 higher: boolean = true
 ): [string, string] {
 if (val1 == null || val2 == null || val1 === val2) return ["", ""];
 const v1Wins = higher ? val1 > val2 : val1 < val2;
 return v1Wins
 ? ["bg-score-green/8", ""]
 : ["", "bg-score-green/8"];
 }

 const rows: ComparisonRow[] = [
 {
 label: "Kamura Score",
 getValue: (t) => (
 <KamuraScoreBadge score={t.kamuraScore} size="sm" />
 ),
 highlight: true,
 },
 {
 label: "Evidence Level",
 getValue: (t) => <EvidenceLevelTag level={t.evidenceLevel} />,
 },
 {
 label: "Category",
 getValue: (t) => t.category,
 },
 {
 label: "Research Score",
 getValue: (t) => (
 <ScoreBar value={t.scores.research} />
 ),
 highlight: true,
 },
 {
 label: "Community Score",
 getValue: (t) => (
 <ScoreBar value={t.scores.community} />
 ),
 highlight: true,
 },
 {
 label: "Safety Score",
 getValue: (t) => (
 <ScoreBar value={t.scores.safety} />
 ),
 highlight: true,
 },
 {
 label: "Accessibility",
 getValue: (t) => (
 <ScoreBar value={t.scores.accessibility} />
 ),
 highlight: true,
 },
 {
 label: "Value",
 getValue: (t) => (
 <ScoreBar value={t.scores.value} />
 ),
 highlight: true,
 },
 {
 label: "Study Count",
 getValue: (t) => `${t.studyCount}+`,
 },
 {
 label: "Community Reports",
 getValue: (t) => `${t.communityReports}+`,
 },
 {
 label: "Positive %",
 getValue: (t) => `${t.community.positivePercent}%`,
 highlight: true,
 },
 {
 label: "Time to Effect",
 getValue: (t) => t.community.timeToEffect,
 },
 {
 label: "Common Side Effects",
 getValue: (t) =>
 t.sideEffects?.common?.length
 ? t.sideEffects.common.slice(0, 4).join(", ")
 : "Not listed",
 },
 {
 label: "Cost Estimate",
 getValue: (t) => t.costEstimate || "Not listed",
 },
 {
 label: "Administration",
 getValue: (t) => t.administrationRoutes.join(", "),
 },
 {
 label: "UAE Available",
 getValue: (t) => (t.uaeAvailable ? "Yes" : "Limited"),
 },
 ];

 // Shared outcomes
 const sharedOutcomes = useMemo(() => {
 if (!t1 || !t2) return [];
 const names1 = new Set(t1.outcomes.map((o) => o.name));
 return t2.outcomes.filter((o) => names1.has(o.name)).map((o) => o.name);
 }, [t1, t2]);

 return (
 <>
 {/* Hero */}
 <section className="relative h-[35vh] flex items-center justify-center">
 <div
 className="absolute inset-0 bg-cover bg-center"
 style={{
 backgroundImage:
 "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')",
 }}
 />
 <div className="absolute inset-0 bg-gradient-to-b from-forest/60 via-black/30 to-forest/50" />
 <div className="relative z-10 text-center text-white px-6 max-w-3xl">
 <p className="text-xs tracking-[0.3em] uppercase mb-4 text-white/80 font-sans">
 KAMURA Compare
 </p>
 <h1 className="text-3xl md:text-5xl font-serif mb-4 leading-tight">
 Compare Treatments
 </h1>
 <p className="text-base md:text-lg text-white/90 leading-relaxed font-sans">
 Select two treatments to compare scores, evidence, outcomes, and
 more
 </p>
 </div>
 </section>

 {/* Breadcrumb */}
 <div className="max-w-[1200px] mx-auto px-6 py-4">
 <nav className="flex items-center gap-2 text-xs text-gray-400 font-sans">
 <Link
 href="/"
 className="hover:text-moss transition-colors"
 >
 Home
 </Link>
 <span>&rsaquo;</span>
 <Link
 href="/treatments"
 className="hover:text-moss transition-colors"
 >
 Treatments
 </Link>
 <span>&rsaquo;</span>
 <span className="text-gray-600">Compare</span>
 </nav>
 </div>

 <div className="max-w-[1200px] mx-auto px-6 pb-20">
 {/* Selector Row */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
 {[
 { sel: slug1, setSel: (v: string | null) => handleSlugChange(1, v), t: t1, label: "Treatment 1" },
 { sel: slug2, setSel: (v: string | null) => handleSlugChange(2, v), t: t2, label: "Treatment 2" },
 ].map(({ sel, setSel, t, label }, i) => (
 <div
 key={i}
 className="border border-gray-200 rounded-xl p-5 bg-white"
 >
 <p className="text-xs text-gray-400 uppercase tracking-wider font-sans mb-3">
 {label}
 </p>
 <select
 value={sel || ""}
 onChange={(e) => setSel(e.target.value || null)}
 className="w-full text-sm font-sans border border-gray-200 rounded-lg px-3 py-2.5 bg-white text-gray-800 focus:outline-none focus:border-terracotta"
 >
 <option value="">Select a treatment...</option>
 {grouped.map(([category, items]) => (
 <optgroup key={category} label={category}>
 {items
 .sort((a, b) => b.kamuraScore - a.kamuraScore)
 .map((item) => (
 <option key={item.slug} value={item.slug}>
 {item.name} ({item.kamuraScore})
 </option>
 ))}
 </optgroup>
 ))}
 </select>
 {t && (
 <div className="mt-3 flex items-center gap-3">
 <span className="text-xl">{t.icon}</span>
 <div className="min-w-0 flex-1">
 <p className="text-sm font-semibold text-gray-900 font-sans">
 {t.name}
 </p>
 <p className="text-xs text-gray-500 font-sans">
 {t.category}
 </p>
 </div>
 <KamuraScoreBadge score={t.kamuraScore} size="sm" />
 </div>
 )}
 </div>
 ))}
 </div>

 {/* Comparison Table — Desktop */}
 {hasSelections && (
 <>
 <div className="hidden md:block border border-gray-200 rounded-xl overflow-hidden">
 {/* Header Row */}
 <div className="grid grid-cols-[200px_1fr_1fr] border-b border-gray-200">
 <div className="p-4 bg-gray-50" />
 {[t1, t2].map((t, i) => (
 <div
 key={i}
 className="p-4 bg-gray-50 border-l border-gray-200"
 >
 {t ? (
 <Link
 href={`/treatments/${t.slug}`}
 className="font-serif text-base text-gray-900 hover:text-terracotta transition-colors"
 >
 {t.icon} {t.name}
 </Link>
 ) : (
 <span className="text-sm text-gray-300 font-sans">
 Not selected
 </span>
 )}
 </div>
 ))}
 </div>

 {/* Data Rows */}
 {rows.map((row) => {
 const [c1, c2] =
 row.highlight && t1 && t2
 ? winnerClass(
 getNumericValue(t1, row.label),
 getNumericValue(t2, row.label)
 )
 : ["", ""];
 return (
 <div
 key={row.label}
 className="grid grid-cols-[200px_1fr_1fr] border-b border-gray-100 last:border-b-0"
 >
 <div className="p-4 bg-gray-50/50 font-sans text-sm text-gray-500 font-medium">
 {row.label}
 </div>
 {[t1, t2].map((t, i) => (
 <div
 key={i}
 className={`p-4 text-sm font-sans text-gray-800 border-l border-gray-100 ${i === 0 ? c1 : c2}`}
 >
 {t ? row.getValue(t) : "\u2014"}
 </div>
 ))}
 </div>
 );
 })}

 {/* Outcomes */}
 {hasBoth && (
 <div className="grid grid-cols-[200px_1fr_1fr] border-t border-gray-200">
 <div className="p-4 bg-gray-50/50 font-sans text-sm text-gray-500 font-medium">
 Key Outcomes
 </div>
 {[t1, t2].map((t, i) => (
 <div
 key={i}
 className="p-4 border-l border-gray-100"
 >
 {t && (
 <div className="flex flex-col gap-1.5">
 {t.outcomes
 .filter((o) => o.direction === "positive")
 .slice(0, 5)
 .map((o) => (
 <div
 key={o.name}
 className="flex items-center gap-2"
 >
 <span
 className={`text-[10px] px-1.5 py-0.5 rounded font-sans font-bold ${
 o.grade === "A"
 ? "bg-score-green/15 text-score-green"
 : o.grade === "B"
 ? "bg-score-yellow/15 text-score-yellow"
 : "bg-gray-100 text-gray-500"
 }`}
 >
 {o.grade}
 </span>
 <span
 className={`text-xs font-sans ${
 sharedOutcomes.includes(o.name)
 ? "text-moss font-medium"
 : "text-gray-600"
 }`}
 >
 {o.name}
 </span>
 </div>
 ))}
 </div>
 )}
 </div>
 ))}
 </div>
 )}

 {/* Tags */}
 {hasBoth && (
 <div className="grid grid-cols-[200px_1fr_1fr] border-t border-gray-200">
 <div className="p-4 bg-gray-50/50 font-sans text-sm text-gray-500 font-medium">
 Tags
 </div>
 {[t1, t2].map((t, i) => (
 <div
 key={i}
 className="p-4 border-l border-gray-100"
 >
 {t && (
 <div className="flex flex-wrap gap-1.5">
 {t.tags.map((tag) => (
 <span
 key={tag}
 className="px-2 py-0.5 bg-zen-mist text-[10px] text-gray-500 rounded-full font-sans"
 >
 {tag}
 </span>
 ))}
 </div>
 )}
 </div>
 ))}
 </div>
 )}

 {/* Action Row */}
 {hasBoth && (
 <div className="grid grid-cols-[200px_1fr_1fr] border-t border-gray-200">
 <div className="p-4 bg-gray-50/50 font-sans text-sm text-gray-500 font-medium">
 Full Profile
 </div>
 {[t1, t2].map((t, i) => (
 <div
 key={i}
 className="p-4 border-l border-gray-100"
 >
 {t && (
 <Link
 href={`/treatments/${t.slug}`}
 className="inline-block text-sm text-white bg-gray-900 px-4 py-2 rounded-lg hover:bg-terracotta transition-colors font-sans"
 >
 View {t.name}
 </Link>
 )}
 </div>
 ))}
 </div>
 )}
 </div>

 {/* Comparison Cards — Mobile */}
 <div className="md:hidden space-y-6">
 {[t1, t2].map((t, i) =>
 t ? (
 <div
 key={i}
 className="border border-gray-200 rounded-xl overflow-hidden bg-white"
 >
 <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
 <Link
 href={`/treatments/${t.slug}`}
 className="font-serif text-lg text-gray-900 hover:text-terracotta transition-colors"
 >
 {t.icon} {t.name}
 </Link>
 <KamuraScoreBadge score={t.kamuraScore} size="sm" />
 </div>
 <div className="divide-y divide-gray-100">
 {rows.map((row) => (
 <div
 key={row.label}
 className="flex justify-between items-center px-4 py-3"
 >
 <span className="text-sm text-gray-500 font-sans font-medium">
 {row.label}
 </span>
 <span className="text-sm text-gray-800 font-sans text-right max-w-[55%]">
 {row.getValue(t)}
 </span>
 </div>
 ))}
 </div>
 <div className="p-4 border-t border-gray-200">
 <Link
 href={`/treatments/${t.slug}`}
 className="inline-block text-sm text-white bg-gray-900 px-4 py-2 rounded-lg hover:bg-terracotta transition-colors font-sans"
 >
 View Full Profile
 </Link>
 </div>
 </div>
 ) : null
 )}
 </div>
 </>
 )}

 {!hasSelections && (
 <div className="border border-dashed border-gray-300 rounded-xl p-16 text-center">
 <p className="text-gray-400 font-sans mb-2">
 Select two treatments above to start comparing
 </p>
 <p className="text-xs text-gray-300 font-sans">
 Compare Kamura Scores, evidence, outcomes, safety, and cost side
 by side
 </p>
 </div>
 )}
 </div>

 {/* Back link */}
 <div className="max-w-[1200px] mx-auto px-6 pb-16 text-center">
 <Link
 href="/treatments"
 className="text-sm text-gray-500 hover:text-moss transition-colors font-sans"
 >
 &larr; Back to Treatments
 </Link>
 </div>
 </>
 );
}

/* ——— Helper Components ——— */

function ScoreBar({ value }: { value: number }) {
 const color =
 value >= 80
 ? "bg-score-green"
 : value >= 60
 ? "bg-score-yellow"
 : value >= 40
 ? "bg-score-orange"
 : "bg-score-red";

 return (
 <div className="flex items-center gap-2">
 <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[120px]">
 <div
 className={`h-full rounded-full ${color}`}
 style={{ width: `${value}%` }}
 />
 </div>
 <span className="text-xs font-sans font-medium text-gray-600 tabular-nums">
 {value}
 </span>
 </div>
 );
}

function getNumericValue(t: Treatment, label: string): number | undefined {
 switch (label) {
 case "Kamura Score":
 return t.kamuraScore;
 case "Research Score":
 return t.scores.research;
 case "Community Score":
 return t.scores.community;
 case "Safety Score":
 return t.scores.safety;
 case "Accessibility":
 return t.scores.accessibility;
 case "Value":
 return t.scores.value;
 case "Positive %":
 return t.community.positivePercent;
 default:
 return undefined;
 }
}
