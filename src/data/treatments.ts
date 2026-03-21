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
  | "Longevity Pharmaceuticals";

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
      return { text: "text-[#C4956A] dark:text-[#C4956A]", bg: "bg-[#C4956A]/20 dark:bg-[#C4956A]/15", border: "border-[#C4956A]/40 dark:border-[#C4956A]/30" };
    case "Strong":
      return { text: "text-[#16A34A] dark:text-[#4ADE80]", bg: "bg-[#16A34A]/15 dark:bg-[#4ADE80]/12", border: "border-[#16A34A]/30 dark:border-[#4ADE80]/20" };
    case "Promising":
      return { text: "text-[#CA8A04] dark:text-[#FACC15]", bg: "bg-[#CA8A04]/15 dark:bg-[#FACC15]/12", border: "border-[#CA8A04]/30 dark:border-[#FACC15]/20" };
    case "Limited":
      return { text: "text-[#EA580C] dark:text-[#FB923C]", bg: "bg-[#EA580C]/15 dark:bg-[#FB923C]/12", border: "border-[#EA580C]/30 dark:border-[#FB923C]/20" };
    case "Insufficient":
      return { text: "text-[#DC2626] dark:text-[#F87171]", bg: "bg-[#DC2626]/15 dark:bg-[#F87171]/12", border: "border-[#DC2626]/30 dark:border-[#F87171]/20" };
  }
}

export function getScoreColor(score: number): { text: string; bg: string; border: string } {
  if (score >= 85) return { text: "text-[#B5736A] dark:text-[#C4956A]", bg: "bg-[#B5736A]/15 dark:bg-[#C4956A]/15", border: "border-[#B5736A] dark:border-[#C4956A]" };
  if (score >= 70) return { text: "text-[#16A34A] dark:text-[#4ADE80]", bg: "bg-[#16A34A]/15 dark:bg-[#4ADE80]/15", border: "border-[#16A34A] dark:border-[#4ADE80]" };
  if (score >= 50) return { text: "text-[#CA8A04] dark:text-[#FACC15]", bg: "bg-[#CA8A04]/15 dark:bg-[#FACC15]/15", border: "border-[#CA8A04] dark:border-[#FACC15]" };
  if (score >= 30) return { text: "text-[#EA580C] dark:text-[#FB923C]", bg: "bg-[#EA580C]/15 dark:bg-[#FB923C]/15", border: "border-[#EA580C] dark:border-[#FB923C]" };
  return { text: "text-[#DC2626] dark:text-[#F87171]", bg: "bg-[#DC2626]/15 dark:bg-[#F87171]/15", border: "border-[#DC2626] dark:border-[#F87171]" };
}

export function getEvidenceLevelColor(level: EvidenceLevel): { text: string; bg: string } {
  switch (level) {
    case "Strong":
      return { text: "text-[#16A34A] dark:text-[#4ADE80]", bg: "bg-[#16A34A]/15 dark:bg-[#4ADE80]/12" };
    case "Moderate":
      return { text: "text-[#2563EB] dark:text-[#60A5FA]", bg: "bg-[#2563EB]/15 dark:bg-[#60A5FA]/12" };
    case "Emerging":
      return { text: "text-[#CA8A04] dark:text-[#FACC15]", bg: "bg-[#CA8A04]/15 dark:bg-[#FACC15]/12" };
    case "Limited":
      return { text: "text-[#EA580C] dark:text-[#FB923C]", bg: "bg-[#EA580C]/15 dark:bg-[#FB923C]/12" };
    case "Anecdotal":
      return { text: "text-[#DC2626] dark:text-[#F87171]", bg: "bg-[#DC2626]/15 dark:bg-[#F87171]/12" };
  }
}

export function getGradeColor(grade: OutcomeGrade): { text: string; bg: string } {
  switch (grade) {
    case "A": return { text: "text-[#16A34A] dark:text-[#4ADE80]", bg: "bg-[#16A34A]/15 dark:bg-[#4ADE80]/12" };
    case "B": return { text: "text-[#2563EB] dark:text-[#60A5FA]", bg: "bg-[#2563EB]/15 dark:bg-[#60A5FA]/12" };
    case "C": return { text: "text-[#CA8A04] dark:text-[#FACC15]", bg: "bg-[#CA8A04]/15 dark:bg-[#FACC15]/12" };
    case "D": return { text: "text-[#EA580C] dark:text-[#FB923C]", bg: "bg-[#EA580C]/15 dark:bg-[#FB923C]/12" };
    case "F": return { text: "text-[#DC2626] dark:text-[#F87171]", bg: "bg-[#DC2626]/15 dark:bg-[#F87171]/12" };
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
];

export function formatLastUpdated(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export const treatments: Treatment[] = treatmentsData.treatments as Treatment[];
