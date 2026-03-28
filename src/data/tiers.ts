import type { Treatment } from "./treatments";

export type TierLetter = "S" | "A" | "B" | "C" | "D";

export interface TierConfig {
 letter: TierLetter;
 label: string;
 description: string;
 scoreMin: number;
 scoreMax: number;
 color: string; // primary color hex
 textClass: string; // tailwind text color
 bgClass: string; // tailwind bg
 borderClass: string; // tailwind border
 badgeBg: string; // badge background
}

export const TIERS: TierConfig[] = [
 {
 letter: "S",
 label: "Gold Standard",
 description: "Robust evidence, strong safety profile, widely validated",
 scoreMin: 85,
 scoreMax: 100,
 color: "#C4A882",
 textClass: "text-[#C4A882]",
 bgClass: "bg-[#C4A882]/10",
 borderClass: "border-[#C4A882]/30",
 badgeBg: "bg-gradient-to-br from-[#C4A882] to-[#A88B6A]",
 },
 {
 letter: "A",
 label: "Strong",
 description: "Well-supported by evidence and community experience",
 scoreMin: 70,
 scoreMax: 84,
 color: "#16A34A",
 textClass: "text-[#16A34A]",
 bgClass: "bg-[#16A34A]/10",
 borderClass: "border-[#16A34A]/25",
 badgeBg: "bg-gradient-to-br from-[#16A34A] to-[#15803D]",
 },
 {
 letter: "B",
 label: "Promising",
 description: "Worth considering — growing evidence base",
 scoreMin: 50,
 scoreMax: 69,
 color: "#2563EB",
 textClass: "text-[#2563EB]",
 bgClass: "bg-[#2563EB]/10",
 borderClass: "border-[#2563EB]/25",
 badgeBg: "bg-gradient-to-br from-[#2563EB] to-[#1D4ED8]",
 },
 {
 letter: "C",
 label: "Limited",
 description: "Proceed with caution — limited evidence available",
 scoreMin: 30,
 scoreMax: 49,
 color: "#EA580C",
 textClass: "text-[#EA580C]",
 bgClass: "bg-[#EA580C]/10",
 borderClass: "border-[#EA580C]/25",
 badgeBg: "bg-gradient-to-br from-[#EA580C] to-[#C2410C]",
 },
 {
 letter: "D",
 label: "Insufficient",
 description: "Weak evidence — more research needed",
 scoreMin: 0,
 scoreMax: 29,
 color: "#DC2626",
 textClass: "text-[#DC2626]",
 bgClass: "bg-[#DC2626]/10",
 borderClass: "border-[#DC2626]/25",
 badgeBg: "bg-gradient-to-br from-[#DC2626] to-[#B91C1C]",
 },
];

export function getTierForScore(score: number): TierConfig {
 return TIERS.find((t) => score >= t.scoreMin && score <= t.scoreMax) ?? TIERS[TIERS.length - 1];
}

export interface TierGroup {
 tier: TierConfig;
 treatments: Treatment[];
}

export function groupByTier(treatments: Treatment[]): TierGroup[] {
 return TIERS.map((tier) => ({
 tier,
 treatments: treatments
 .filter((t) => t.kamuraScore >= tier.scoreMin && t.kamuraScore <= tier.scoreMax)
 .sort((a, b) => b.kamuraScore - a.kamuraScore),
 })).filter((g) => g.treatments.length > 0);
}
