import treatmentsData from "../../content/data/treatments.json";

export type TreatmentCategory =
 | "Peptides"
 | "GLP-1 & Weight Management"
 | "Hormones"
 | "Devices & Technology"
 | "Supplements & Nutraceuticals"
 | "Mind-Body & Movement"
 | "Detox & Functional"
 | "Traditional & Alternative Medicine"
 | "IV & Infusion Therapies"
 | "Regenerative Medicine"
 | "Longevity Pharmaceuticals"
 | "Exercise & Fitness"
 | "Skin & Aesthetic Wellness"
 | "Diagnostics & Testing"
 | "Nutrition & Dietary Protocols"
 | "Sexual & Reproductive Health";

export type EvidenceLevel = "Strong" | "Moderate" | "Emerging" | "Limited" | "Anecdotal";
export type ScoreTier = "Gold Standard" | "Strong" | "Promising" | "Limited" | "Insufficient";
export type OutcomeDirection = "positive" | "neutral" | "negative";
export type OutcomeGrade = "A" | "B" | "C" | "D" | "F";

export interface TreatmentOutcome {
 name: string;
 direction: OutcomeDirection;
 grade: OutcomeGrade;
 description: string;
 studyCount: number;
 consistency: string;
 effectSize: string;
}

export interface CommunityQuote {
 text: string;
 source: string;
 location: string;
 verified: boolean;
}

export interface TreatmentCommunity {
 totalReports: number;
 positivePercent: number;
 satisfaction: string;
 timeToEffect: string;
 quotes: CommunityQuote[];
}

export interface TreatmentProtocol {
 label: string;
 dosage: string;
 notes: string;
}

export interface KeyStudy {
 title: string;
 authors: string;
 journal: string;
 year: number;
 pmid?: string;
 finding: string;
}

export interface SideEffects {
 common: string[];
 rare: string[];
 serious: string[];
}

export interface Interactions {
 drugs: string[];
 supplements: string[];
 food: string[];
}

export interface FAQItem {
 question: string;
 answer: string;
}

export interface Treatment {
 slug: string;
 name: string;
 fullName: string;
 category: TreatmentCategory;
 description: string;
 icon: string;
 imageUrl: string;
 kamuraScore: number;
 scores: {
 research: number;
 community: number;
 safety: number;
 accessibility: number;
 value: number;
 };
 evidenceLevel: EvidenceLevel;
 tags: string[];
 uaeAvailable: boolean;
 studyCount: number;
 communityReports: number;
 administrationRoutes: string[];
 outcomes: TreatmentOutcome[];
 community: TreatmentCommunity;
 protocols: TreatmentProtocol[];
 keyStudies: KeyStudy[];
 relatedSlugs: string[];

 // Optional enriched data fields
 sideEffects?: SideEffects;
 interactions?: Interactions;
 contraindications?: string[];
 mechanism?: string;
 faq?: FAQItem[];
 costEstimate?: string;
 lastUpdated?: string;
}

// --- Helper functions ---

export function getScoreTier(score: number): ScoreTier {
 if (score >= 85) return "Gold Standard";
 if (score >= 70) return "Strong";
 if (score >= 50) return "Promising";
 if (score >= 30) return "Limited";
 return "Insufficient";
}

export function getScoreTierColor(tier: ScoreTier): { text: string; bg: string; border: string } {
 switch (tier) {
 case "Gold Standard":
 return { text: "text-[#C4A882]", bg: "bg-[#C4A882]/20", border: "border-[#C4A882]/40" };
 case "Strong":
 return { text: "text-[#16A34A]", bg: "bg-[#16A34A]/15", border: "border-[#16A34A]/30" };
 case "Promising":
 return { text: "text-[#CA8A04]", bg: "bg-[#CA8A04]/15", border: "border-[#CA8A04]/30" };
 case "Limited":
 return { text: "text-[#EA580C]", bg: "bg-[#EA580C]/15", border: "border-[#EA580C]/30" };
 case "Insufficient":
 return { text: "text-[#DC2626]", bg: "bg-[#DC2626]/15", border: "border-[#DC2626]/30" };
 }
}

export function getScoreColor(score: number): { text: string; bg: string; border: string } {
 if (score >= 85) return { text: "text-[#B5886A]", bg: "bg-[#B5886A]/15", border: "border-[#B5886A]" };
 if (score >= 70) return { text: "text-[#16A34A]", bg: "bg-[#16A34A]/15", border: "border-[#16A34A]" };
 if (score >= 50) return { text: "text-[#CA8A04]", bg: "bg-[#CA8A04]/15", border: "border-[#CA8A04]" };
 if (score >= 30) return { text: "text-[#EA580C]", bg: "bg-[#EA580C]/15", border: "border-[#EA580C]" };
 return { text: "text-[#DC2626]", bg: "bg-[#DC2626]/15", border: "border-[#DC2626]" };
}

export function getEvidenceLevelColor(level: EvidenceLevel): { text: string; bg: string } {
 switch (level) {
 case "Strong":
 return { text: "text-[#16A34A]", bg: "bg-[#16A34A]/15" };
 case "Moderate":
 return { text: "text-[#2563EB]", bg: "bg-[#2563EB]/15" };
 case "Emerging":
 return { text: "text-[#CA8A04]", bg: "bg-[#CA8A04]/15" };
 case "Limited":
 return { text: "text-[#EA580C]", bg: "bg-[#EA580C]/15" };
 case "Anecdotal":
 return { text: "text-[#DC2626]", bg: "bg-[#DC2626]/15" };
 }
}

export function getGradeColor(grade: OutcomeGrade): { text: string; bg: string } {
 switch (grade) {
 case "A": return { text: "text-[#16A34A]", bg: "bg-[#16A34A]/15" };
 case "B": return { text: "text-[#2563EB]", bg: "bg-[#2563EB]/15" };
 case "C": return { text: "text-[#CA8A04]", bg: "bg-[#CA8A04]/15" };
 case "D": return { text: "text-[#EA580C]", bg: "bg-[#EA580C]/15" };
 case "F": return { text: "text-[#DC2626]", bg: "bg-[#DC2626]/15" };
 }
}

export function getTreatmentBySlug(slug: string): Treatment | undefined {
 return treatments.find((t) => t.slug === slug);
}

export function getTreatmentsByCategory(category: TreatmentCategory): Treatment[] {
 return treatments.filter((t) => t.category === category);
}

export const ALL_TREATMENT_CATEGORIES: TreatmentCategory[] = [
 "Peptides",
 "Supplements & Nutraceuticals",
 "Devices & Technology",
 "Traditional & Alternative Medicine",
 "Mind-Body & Movement",
 "Hormones",
 "GLP-1 & Weight Management",
 "IV & Infusion Therapies",
 "Regenerative Medicine",
 "Longevity Pharmaceuticals",
 "Detox & Functional",
 "Exercise & Fitness",
 "Skin & Aesthetic Wellness",
 "Diagnostics & Testing",
 "Nutrition & Dietary Protocols",
 "Sexual & Reproductive Health",
];

export function formatLastUpdated(iso: string): string {
 return new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

// Normalize: 52 treatments imported with kamuraScore on 0-10 scale
export const treatments: Treatment[] = (treatmentsData.treatments as Treatment[]).map((t) =>
 t.kamuraScore <= 10 ? { ...t, kamuraScore: Math.round(t.kamuraScore * 10) } : t
);
