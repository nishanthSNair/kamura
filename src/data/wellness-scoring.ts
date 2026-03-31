import type { WellnessProfile, BudgetTier } from "./wellness-questionnaire";
import type { WellnessDimension } from "./quiz";
import type { EnrichedMatchedTreatment } from "./wellness-checker";

// --- 8-Dimension scoring from questionnaire answers ---

interface DimensionScore {
  label: WellnessDimension;
  score: number;
}

const EXERCISE_SCORES: Record<string, number> = {
  "never": 10,
  "1-2x": 40,
  "3-4x": 70,
  "5+": 95,
};

const DIET_SCORES: Record<string, number> = {
  "balanced": 60,
  "keto": 65,
  "vegan": 70,
  "mediterranean": 80,
  "intermittent-fasting": 65,
  "other": 45,
};

const HYDRATION_SCORES: Record<string, number> = {
  "<1L": 20,
  "1-2L": 50,
  "2-3L": 75,
  "3L+": 90,
};

const SCREEN_SCORES: Record<string, number> = {
  "<1hr": 90,
  "1-2hr": 65,
  "2-3hr": 40,
  "3hr+": 15,
};

function clamp(v: number): number {
  return Math.max(0, Math.min(100, Math.round(v)));
}

export function computeDimensionScores(profile: WellnessProfile): DimensionScore[] {
  const sleep = profile.sleepQuality * 20; // 1-5 → 20-100
  const exercise = EXERCISE_SCORES[profile.exerciseFrequency] ?? 50;
  const screen = SCREEN_SCORES[profile.screenTime] ?? 50;
  const stress = (6 - profile.stressLevel) * 20; // Invert: 1=high wellness, 5=low wellness
  const diet = DIET_SCORES[profile.dietType] ?? 50;
  const hydration = HYDRATION_SCORES[profile.hydration] ?? 50;

  const hasSups = profile.supplements.trim().length > 0;
  const biohackPref = profile.treatmentPreference === "biohacking" ? 30 : profile.treatmentPreference === "clinical" ? 20 : 0;
  const goalBreadth = Math.min(profile.goals.length * 25, 75);

  return [
    { label: "Sleep & Recovery", score: clamp((sleep * 0.5 + screen * 0.3 + exercise * 0.2)) },
    { label: "Nutrition", score: clamp((diet * 0.6 + hydration * 0.4)) },
    { label: "Movement", score: clamp(exercise) },
    { label: "Stress & Mind", score: clamp(stress) },
    { label: "Mindfulness", score: clamp((stress * 0.5 + sleep * 0.5)) },
    { label: "Social Connection", score: 50 }, // No direct signal yet
    { label: "Biohacking", score: clamp(30 + biohackPref + (hasSups ? 20 : 0)) },
    { label: "Purpose", score: clamp(25 + goalBreadth) },
  ];
}

export function computeOverallScore(dimensions: DimensionScore[]): number {
  if (dimensions.length === 0) return 0;
  const sum = dimensions.reduce((acc, d) => acc + d.score, 0);
  return Math.round(sum / dimensions.length);
}

export function getScoreLabel(score: number): string {
  if (score >= 75) return "Thriving";
  if (score >= 50) return "Growing";
  return "Starting Out";
}

// --- Budget estimation ---

const BUDGET_LIMITS: Record<BudgetTier, number> = {
  "<500": 500,
  "500-1500": 1500,
  "1500-3000": 3000,
  "3000+": 10000,
};

function parseCostToAED(costEstimate: string | null): number {
  if (!costEstimate) return 0;
  // Extract first number from strings like "AED 200-500/session" or "$50-100"
  const match = costEstimate.match(/(\d[\d,]*)/);
  if (!match) return 0;
  const val = parseInt(match[1].replace(",", ""), 10);
  // If it looks like USD, rough 3.67x conversion
  if (costEstimate.includes("$")) return Math.round(val * 3.67);
  return val;
}

export interface BudgetBreakdown {
  budgetLimit: number;
  totalEstimated: number;
  items: { name: string; cost: number }[];
  overBudget: boolean;
}

export function computeBudgetBreakdown(
  budget: BudgetTier,
  treatments: EnrichedMatchedTreatment[],
  maxTreatments = 5
): BudgetBreakdown {
  const limit = BUDGET_LIMITS[budget];
  const top = treatments.slice(0, maxTreatments);
  const items = top.map((t) => ({
    name: t.treatment.name,
    cost: parseCostToAED(t.costEstimate),
  }));
  const total = items.reduce((s, i) => s + i.cost, 0);
  return {
    budgetLimit: limit,
    totalEstimated: total,
    items,
    overBudget: total > limit,
  };
}

// --- Risk flags ---

export interface RiskFlag {
  treatment: string;
  condition: string;
  severity: "caution" | "warning";
  message: string;
}

const CONDITION_INTERACTIONS: Record<string, { tags: string[]; severity: "caution" | "warning"; message: string }[]> = {
  diabetes: [
    { tags: ["glp-1", "semaglutide", "tirzepatide"], severity: "caution", message: "GLP-1 drugs affect blood sugar — requires medical supervision" },
    { tags: ["fasting", "intermittent fasting"], severity: "caution", message: "Fasting protocols need adjustment with diabetes medication" },
  ],
  hypertension: [
    { tags: ["caffeine", "stimulant"], severity: "caution", message: "Stimulants may elevate blood pressure" },
    { tags: ["sauna", "infrared"], severity: "caution", message: "Heat therapy may affect blood pressure — consult your doctor" },
  ],
  thyroid: [
    { tags: ["iodine"], severity: "caution", message: "Iodine supplementation requires thyroid monitoring" },
    { tags: ["peptide"], severity: "caution", message: "Some peptides may interact with thyroid function" },
  ],
  autoimmune: [
    { tags: ["immune", "immunity"], severity: "warning", message: "Immune-boosting treatments may worsen autoimmune conditions" },
    { tags: ["stem cell"], severity: "caution", message: "Stem cell therapies require specialist oversight for autoimmune conditions" },
  ],
  heart: [
    { tags: ["caffeine", "stimulant"], severity: "warning", message: "Stimulants are contraindicated with heart conditions" },
    { tags: ["hbot", "hyperbaric"], severity: "caution", message: "Hyperbaric therapy needs cardiac clearance" },
  ],
};

export function detectRiskFlags(
  conditions: string[],
  treatments: EnrichedMatchedTreatment[]
): RiskFlag[] {
  const flags: RiskFlag[] = [];

  for (const condition of conditions) {
    if (condition === "none") continue;
    const interactions = CONDITION_INTERACTIONS[condition];
    if (!interactions) continue;

    for (const treatment of treatments) {
      const tTags = treatment.treatment.tags.map((t) => t.toLowerCase());
      const tName = treatment.treatment.name.toLowerCase();

      for (const interaction of interactions) {
        const match = interaction.tags.some(
          (tag) => tTags.some((tt) => tt.includes(tag)) || tName.includes(tag)
        );
        if (match) {
          flags.push({
            treatment: treatment.treatment.name,
            condition,
            severity: interaction.severity,
            message: interaction.message,
          });
        }
      }
    }
  }

  // Deduplicate
  const seen = new Set<string>();
  return flags.filter((f) => {
    const key = `${f.treatment}-${f.condition}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// --- Community averages (static reference data) ---

export const COMMUNITY_AVERAGES: DimensionScore[] = [
  { label: "Sleep & Recovery", score: 58 },
  { label: "Nutrition", score: 62 },
  { label: "Movement", score: 55 },
  { label: "Stress & Mind", score: 48 },
  { label: "Mindfulness", score: 45 },
  { label: "Social Connection", score: 52 },
  { label: "Biohacking", score: 42 },
  { label: "Purpose", score: 60 },
];
