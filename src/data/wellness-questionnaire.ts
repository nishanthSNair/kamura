import type { BodyZone, WellnessConcern, ConcernDuration } from "./wellness-concerns";

// --- Option types ---

export type Gender = "male" | "female" | "non-binary" | "prefer-not-to-say";
export type LocationOption = "dubai" | "abu-dhabi" | "sharjah" | "other-uae" | "outside-uae";
export type ExerciseFrequency = "never" | "1-2x" | "3-4x" | "5+";
export type DietType = "balanced" | "keto" | "vegan" | "mediterranean" | "intermittent-fasting" | "other";
export type Hydration = "<1L" | "1-2L" | "2-3L" | "3L+";
export type ScreenTime = "<1hr" | "1-2hr" | "2-3hr" | "3hr+";
export type BudgetTier = "<500" | "500-1500" | "1500-3000" | "3000+";
export type TreatmentPreference = "natural" | "clinical" | "biohacking" | "no-preference";
export type TimelineExpectation = "weeks" | "months" | "years";

export const WELLNESS_GOALS = [
  { id: "energy", label: "Energy", icon: "\u26A1" },
  { id: "sleep", label: "Sleep", icon: "\uD83D\uDE34" },
  { id: "weight", label: "Weight", icon: "\u2696\uFE0F" },
  { id: "pain", label: "Pain Relief", icon: "\uD83E\uDE79" },
  { id: "cognitive", label: "Cognitive", icon: "\uD83E\uDDE0" },
  { id: "stress", label: "Stress", icon: "\uD83E\uDDD8" },
  { id: "longevity", label: "Longevity", icon: "\uD83C\uDF31" },
  { id: "immunity", label: "Immunity", icon: "\uD83D\uDEE1\uFE0F" },
  { id: "skin", label: "Skin", icon: "\u2728" },
  { id: "performance", label: "Performance", icon: "\uD83C\uDFCB\uFE0F" },
] as const;

export const CONDITIONS = [
  { id: "diabetes", label: "Diabetes" },
  { id: "hypertension", label: "Hypertension" },
  { id: "thyroid", label: "Thyroid" },
  { id: "autoimmune", label: "Autoimmune" },
  { id: "heart", label: "Heart" },
  { id: "none", label: "None" },
] as const;

export const EXERCISE_OPTIONS: { value: ExerciseFrequency; label: string }[] = [
  { value: "never", label: "Never" },
  { value: "1-2x", label: "1-2x / week" },
  { value: "3-4x", label: "3-4x / week" },
  { value: "5+", label: "5+ / week" },
];

export const DIET_OPTIONS: { value: DietType; label: string }[] = [
  { value: "balanced", label: "Balanced" },
  { value: "keto", label: "Keto" },
  { value: "vegan", label: "Vegan" },
  { value: "mediterranean", label: "Mediterranean" },
  { value: "intermittent-fasting", label: "Intermittent Fasting" },
  { value: "other", label: "Other" },
];

export const HYDRATION_OPTIONS: { value: Hydration; label: string }[] = [
  { value: "<1L", label: "< 1L" },
  { value: "1-2L", label: "1-2L" },
  { value: "2-3L", label: "2-3L" },
  { value: "3L+", label: "3L+" },
];

export const SCREEN_TIME_OPTIONS: { value: ScreenTime; label: string }[] = [
  { value: "<1hr", label: "< 1 hour" },
  { value: "1-2hr", label: "1-2 hours" },
  { value: "2-3hr", label: "2-3 hours" },
  { value: "3hr+", label: "3+ hours" },
];

export const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-binary" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

export const LOCATION_OPTIONS: { value: LocationOption; label: string }[] = [
  { value: "dubai", label: "Dubai" },
  { value: "abu-dhabi", label: "Abu Dhabi" },
  { value: "sharjah", label: "Sharjah" },
  { value: "other-uae", label: "Other UAE" },
  { value: "outside-uae", label: "Outside UAE" },
];

export const BUDGET_OPTIONS: { value: BudgetTier; label: string }[] = [
  { value: "<500", label: "< 500 AED / month" },
  { value: "500-1500", label: "500 - 1,500 AED" },
  { value: "1500-3000", label: "1,500 - 3,000 AED" },
  { value: "3000+", label: "3,000+ AED" },
];

export const PREFERENCE_OPTIONS: { value: TreatmentPreference; label: string }[] = [
  { value: "natural", label: "Natural only" },
  { value: "clinical", label: "Open to clinical" },
  { value: "biohacking", label: "Data-driven biohacking" },
  { value: "no-preference", label: "No preference" },
];

export const TIMELINE_OPTIONS: { value: TimelineExpectation; label: string }[] = [
  { value: "weeks", label: "Quick wins (weeks)" },
  { value: "months", label: "Steady progress (months)" },
  { value: "years", label: "Long-term investment (years)" },
];

// --- Profile type ---

export interface WellnessProfile {
  // Profile
  name: string;
  age: number | null;
  gender: Gender | "";
  location: LocationOption | "";
  // Lifestyle
  sleepQuality: number; // 1-5
  exerciseFrequency: ExerciseFrequency | "";
  stressLevel: number; // 1-5
  dietType: DietType | "";
  hydration: Hydration | "";
  screenTime: ScreenTime | "";
  // Health
  selectedZones: BodyZone[];
  selectedConcerns: WellnessConcern[];
  duration: ConcernDuration | null;
  conditions: string[];
  supplements: string;
  // Goals
  goals: string[];
  budget: BudgetTier | "";
  treatmentPreference: TreatmentPreference | "";
  timeline: TimelineExpectation | "";
  // Meta
  completedAt: number | null;
  goalChecks: Record<string, boolean>;
}

export const EMPTY_PROFILE: WellnessProfile = {
  name: "",
  age: null,
  gender: "",
  location: "",
  sleepQuality: 3,
  exerciseFrequency: "",
  stressLevel: 3,
  dietType: "",
  hydration: "",
  screenTime: "",
  selectedZones: [],
  selectedConcerns: [],
  duration: null,
  conditions: [],
  supplements: "",
  goals: [],
  budget: "",
  treatmentPreference: "",
  timeline: "",
  completedAt: null,
  goalChecks: {},
};

// --- Step validation ---

export function isProfileStepValid(p: WellnessProfile): boolean {
  return p.name.trim().length > 0 && p.age !== null && p.age > 0 && p.gender !== "" && p.location !== "";
}

export function isLifestyleStepValid(p: WellnessProfile): boolean {
  return p.exerciseFrequency !== "" && p.dietType !== "" && p.hydration !== "" && p.screenTime !== "";
}

export function isHealthStepValid(p: WellnessProfile): boolean {
  return p.selectedConcerns.length > 0;
}

export function isGoalsStepValid(p: WellnessProfile): boolean {
  return p.goals.length > 0 && p.goals.length <= 3 && p.budget !== "" && p.treatmentPreference !== "" && p.timeline !== "";
}
