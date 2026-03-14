import treatmentsData from "../../content/data/treatments.json";

export type TreatmentCategory =
  | "Peptides"
  | "GLP-1 & Weight Management"
  | "Hormones"
  | "Devices & Biohacking"
  | "Supplements"
  | "Holistic & Mind-Body"
  | "Detox & Functional";

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
      return { text: "text-[#C4956A]", bg: "bg-[#C4956A]/15", border: "border-[#C4956A]/30" };
    case "Strong":
      return { text: "text-[#4ADE80]", bg: "bg-[#4ADE80]/12", border: "border-[#4ADE80]/20" };
    case "Promising":
      return { text: "text-[#FACC15]", bg: "bg-[#FACC15]/12", border: "border-[#FACC15]/20" };
    case "Limited":
      return { text: "text-[#FB923C]", bg: "bg-[#FB923C]/12", border: "border-[#FB923C]/20" };
    case "Insufficient":
      return { text: "text-[#F87171]", bg: "bg-[#F87171]/12", border: "border-[#F87171]/20" };
  }
}

export function getScoreColor(score: number): string {
  if (score >= 85) return "#C4956A";
  if (score >= 70) return "#4ADE80";
  if (score >= 50) return "#FACC15";
  if (score >= 30) return "#FB923C";
  return "#F87171";
}

export function getEvidenceLevelColor(level: EvidenceLevel): { text: string; bg: string } {
  switch (level) {
    case "Strong":
      return { text: "text-[#4ADE80]", bg: "bg-[#4ADE80]/12" };
    case "Moderate":
      return { text: "text-[#60A5FA]", bg: "bg-[#60A5FA]/12" };
    case "Emerging":
      return { text: "text-[#FACC15]", bg: "bg-[#FACC15]/12" };
    case "Limited":
      return { text: "text-[#FB923C]", bg: "bg-[#FB923C]/12" };
    case "Anecdotal":
      return { text: "text-[#F87171]", bg: "bg-[#F87171]/12" };
  }
}

export function getGradeColor(grade: OutcomeGrade): string {
  switch (grade) {
    case "A": return "#4ADE80";
    case "B": return "#60A5FA";
    case "C": return "#FACC15";
    case "D": return "#FB923C";
    case "F": return "#F87171";
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
  "GLP-1 & Weight Management",
  "Hormones",
  "Devices & Biohacking",
  "Supplements",
  "Holistic & Mind-Body",
  "Detox & Functional",
];

export const treatments: Treatment[] = treatmentsData.treatments as Treatment[];
