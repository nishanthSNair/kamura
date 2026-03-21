// Body Blueprint Builder — Data Layer
// Types, 18 treatments, baseline calculation, projection logic

export type WellnessIndicator =
  | "stressResilience"
  | "recoveryPattern"
  | "sleepQuality"
  | "metabolicBaseline"
  | "mentalClarity"
  | "bodyBalance";

export const INDICATORS: WellnessIndicator[] = [
  "stressResilience",
  "recoveryPattern",
  "sleepQuality",
  "metabolicBaseline",
  "mentalClarity",
  "bodyBalance",
];

export interface IntakeAnswers {
  age: number;
  biologicalSex: "male" | "female";
  heightCm: number;
  weightKg: number;
  sleepHours: number;
  wakeTime: string;
  restingHR: "under60" | "60to80" | "over80";
  energyMorning: number;
  energyAfternoon: number;
  energyEvening: number;
  stressLevel: number;
  exerciseFreq: "none" | "1-2x" | "3-5x" | "daily";
  dietType: "omnivore" | "plant-based" | "keto" | "IF" | "no-structure";
  alcoholFreq: "none" | "occasional" | "regular";
  caffeineDaily: number;
  goals: string[];
}

export interface BlueprintTreatment {
  id: string;
  name: string;
  emoji: string;
  category: "therapy" | "supplement" | "habit";
  timeCost: string;
  difficulty: 1 | 2 | 3;
  effects: Partial<Record<WellnessIndicator, number>>;
  treatmentSlug?: string;
}

export interface TimelineSlot {
  hour: number;
  treatments: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type BodyZone = "brain" | "heart" | "lungs" | "gut" | "muscles" | "fullBody";

export const INDICATOR_META: Record<
  WellnessIndicator,
  { label: string; bodyZone: BodyZone; description: string }
> = {
  stressResilience: {
    label: "Stress Resilience",
    bodyZone: "heart",
    description:
      "How well your body adapts to and recovers from daily stress.",
  },
  recoveryPattern: {
    label: "Recovery Pattern",
    bodyZone: "brain",
    description:
      "Your body\u2019s ability to rest, repair, and restore after exertion.",
  },
  sleepQuality: {
    label: "Sleep Quality",
    bodyZone: "fullBody",
    description:
      "The depth and restorative quality of your nightly sleep.",
  },
  metabolicBaseline: {
    label: "Metabolic Baseline",
    bodyZone: "gut",
    description:
      "Your foundational metabolic health and energy production.",
  },
  mentalClarity: {
    label: "Mental Clarity",
    bodyZone: "brain",
    description:
      "Cognitive sharpness, focus, and mental energy throughout the day.",
  },
  bodyBalance: {
    label: "Body Balance",
    bodyZone: "muscles",
    description:
      "Overall physical equilibrium, recovery capacity, and systemic harmony.",
  },
};

// Maps body zones to indicators that affect them
export const ZONE_INDICATORS: Record<BodyZone, WellnessIndicator[]> = {
  brain: ["mentalClarity", "recoveryPattern"],
  heart: ["stressResilience"],
  lungs: ["recoveryPattern"],
  gut: ["metabolicBaseline"],
  muscles: ["bodyBalance"],
  fullBody: ["sleepQuality"],
};

export const ZONE_LABELS: Record<BodyZone, string> = {
  brain: "Brain",
  heart: "Heart",
  lungs: "Lungs",
  gut: "Gut",
  muscles: "Muscles",
  fullBody: "Full Body",
};

// ---------- 18 Blueprint Treatments ----------

export const BLUEPRINT_TREATMENTS: BlueprintTreatment[] = [
  // Therapies
  {
    id: "cold-plunge",
    name: "Cold Plunge",
    emoji: "\u{1F9CA}",
    category: "therapy",
    timeCost: "5 min",
    difficulty: 2,
    effects: {
      stressResilience: 18,
      recoveryPattern: 14,
      bodyBalance: 10,
      sleepQuality: 5,
    },
    treatmentSlug: "cold-plunge",
  },
  {
    id: "red-light",
    name: "Red Light Therapy",
    emoji: "\u{1F534}",
    category: "therapy",
    timeCost: "20 min",
    difficulty: 1,
    effects: { metabolicBaseline: 14, bodyBalance: 8, mentalClarity: 6 },
    treatmentSlug: "red-light-therapy",
  },
  {
    id: "breathwork",
    name: "Breathwork",
    emoji: "\u{1F32C}\uFE0F",
    category: "therapy",
    timeCost: "15 min",
    difficulty: 1,
    effects: {
      recoveryPattern: 18,
      stressResilience: 14,
      mentalClarity: 10,
    },
    treatmentSlug: "breathwork",
  },
  {
    id: "sound-healing",
    name: "Sound Healing",
    emoji: "\u{1F514}",
    category: "therapy",
    timeCost: "45 min",
    difficulty: 1,
    effects: {
      recoveryPattern: 12,
      stressResilience: 10,
      sleepQuality: 8,
    },
    treatmentSlug: "sound-healing",
  },
  {
    id: "pemf",
    name: "PEMF Therapy",
    emoji: "\u{26A1}",
    category: "therapy",
    timeCost: "30 min",
    difficulty: 1,
    effects: { bodyBalance: 14, recoveryPattern: 10, mentalClarity: 6 },
    treatmentSlug: "pemf-therapy",
  },
  {
    id: "hbot",
    name: "Hyperbaric Oxygen",
    emoji: "\u{1F4A8}",
    category: "therapy",
    timeCost: "60 min",
    difficulty: 2,
    effects: {
      metabolicBaseline: 16,
      mentalClarity: 12,
      bodyBalance: 10,
    },
    treatmentSlug: "hyperbaric-oxygen",
  },
  {
    id: "nad-iv",
    name: "NAD+ IV",
    emoji: "\u{1F489}",
    category: "therapy",
    timeCost: "90 min",
    difficulty: 3,
    effects: {
      metabolicBaseline: 20,
      mentalClarity: 14,
      bodyBalance: 8,
    },
    treatmentSlug: "nad-injectable",
  },

  // Habits
  {
    id: "meditation",
    name: "Meditation",
    emoji: "\u{1F9D8}",
    category: "habit",
    timeCost: "15 min",
    difficulty: 1,
    effects: {
      recoveryPattern: 20,
      mentalClarity: 12,
      stressResilience: 8,
      sleepQuality: 8,
    },
    treatmentSlug: "meditation",
  },
  {
    id: "morning-sunlight",
    name: "Morning Sunlight",
    emoji: "\u{2600}\uFE0F",
    category: "habit",
    timeCost: "10 min",
    difficulty: 1,
    effects: {
      recoveryPattern: 16,
      sleepQuality: 12,
      mentalClarity: 8,
    },
  },
  {
    id: "sleep-10pm",
    name: "Sleep by 10pm",
    emoji: "\u{1F319}",
    category: "habit",
    timeCost: "Lifestyle",
    difficulty: 2,
    effects: {
      sleepQuality: 24,
      stressResilience: 14,
      recoveryPattern: 16,
      mentalClarity: 12,
    },
  },
  {
    id: "no-caffeine-2pm",
    name: "No Caffeine After 2pm",
    emoji: "\u2615",
    category: "habit",
    timeCost: "Lifestyle",
    difficulty: 2,
    effects: { sleepQuality: 14, recoveryPattern: 8 },
  },
  {
    id: "grounding-walk",
    name: "Grounding Walk",
    emoji: "\u{1F33F}",
    category: "habit",
    timeCost: "20 min",
    difficulty: 1,
    effects: {
      stressResilience: 10,
      bodyBalance: 8,
      recoveryPattern: 6,
    },
    treatmentSlug: "grounding-earthing",
  },
  {
    id: "intermittent-fasting",
    name: "Intermittent Fasting",
    emoji: "\u{23F0}",
    category: "habit",
    timeCost: "Lifestyle",
    difficulty: 2,
    effects: {
      metabolicBaseline: 20,
      bodyBalance: 14,
      mentalClarity: 8,
    },
    treatmentSlug: "fasting",
  },

  // Supplements
  {
    id: "lions-mane",
    name: "Lion\u2019s Mane",
    emoji: "\u{1F344}",
    category: "supplement",
    timeCost: "1 min",
    difficulty: 1,
    effects: { mentalClarity: 16, bodyBalance: 6 },
    treatmentSlug: "functional-mushrooms",
  },
  {
    id: "magnesium",
    name: "Magnesium Glycinate",
    emoji: "\u{1F48A}",
    category: "supplement",
    timeCost: "1 min",
    difficulty: 1,
    effects: {
      sleepQuality: 18,
      recoveryPattern: 10,
      stressResilience: 8,
    },
    treatmentSlug: "magnesium",
  },
  {
    id: "ashwagandha",
    name: "Ashwagandha",
    emoji: "\u{1F33F}",
    category: "supplement",
    timeCost: "1 min",
    difficulty: 1,
    effects: {
      recoveryPattern: 22,
      stressResilience: 10,
      metabolicBaseline: 6,
    },
  },
  {
    id: "coq10",
    name: "CoQ10",
    emoji: "\u{1F9E1}",
    category: "supplement",
    timeCost: "1 min",
    difficulty: 1,
    effects: {
      metabolicBaseline: 18,
      bodyBalance: 8,
      mentalClarity: 6,
    },
    treatmentSlug: "coq10",
  },
  {
    id: "omega-3",
    name: "Omega-3",
    emoji: "\u{1F41F}",
    category: "supplement",
    timeCost: "1 min",
    difficulty: 1,
    effects: {
      bodyBalance: 12,
      mentalClarity: 8,
      metabolicBaseline: 6,
    },
    treatmentSlug: "omega-3",
  },
];

// ---------- Goals ----------

export const GOAL_OPTIONS = [
  "Energy",
  "Sleep",
  "Focus",
  "Longevity",
  "Mood",
  "Fat Loss",
  "Muscle",
  "Hormonal Balance",
  "Stress Reduction",
] as const;

// ---------- Scoring Logic ----------

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

export function calculateBaselines(
  answers: IntakeAnswers
): Record<WellnessIndicator, number> {
  const {
    sleepHours,
    stressLevel,
    restingHR,
    exerciseFreq,
    dietType,
    caffeineDaily,
    alcoholFreq,
    energyMorning,
    energyAfternoon,
    energyEvening,
  } = answers;

  const exerciseBonus =
    exerciseFreq === "daily"
      ? 15
      : exerciseFreq === "3-5x"
        ? 10
        : exerciseFreq === "1-2x"
          ? 4
          : 0;

  const sleepBonus =
    sleepHours >= 7 && sleepHours <= 9
      ? 12
      : sleepHours >= 6
        ? 4
        : sleepHours >= 5
          ? -4
          : -10;

  const stressPenalty = stressLevel * 3.5;

  const hrBonus =
    restingHR === "under60" ? 10 : restingHR === "60to80" ? 0 : -8;

  const dietBonus =
    dietType === "plant-based" || dietType === "IF"
      ? 6
      : dietType === "keto"
        ? 4
        : dietType === "omnivore"
          ? 2
          : 0;

  const caffeineOverload = caffeineDaily > 3 ? (caffeineDaily - 3) * 4 : 0;
  const alcoholPenalty =
    alcoholFreq === "regular" ? 8 : alcoholFreq === "occasional" ? 3 : 0;

  const avgEnergy = (energyMorning + energyAfternoon + energyEvening) / 3;

  // Stress Resilience: starts at 50, helped by low stress + exercise + low HR
  const stressResilience = clamp(
    50 - stressPenalty + exerciseBonus + hrBonus + sleepBonus * 0.5,
    5,
    95
  );

  // Recovery Pattern: starts at 50, helped by exercise + low stress + good sleep
  const recoveryPattern = clamp(
    50 + sleepBonus + exerciseBonus * 0.7 - stressPenalty * 0.6 + hrBonus,
    5,
    95
  );

  // Sleep Quality: directly from sleep hours + caffeine + stress
  const sleepQuality = clamp(
    50 + sleepBonus * 1.5 - caffeineOverload - stressPenalty * 0.4 - alcoholPenalty,
    5,
    95
  );

  // Metabolic Baseline: diet + exercise + fasting
  const bmi = answers.weightKg / Math.pow(answers.heightCm / 100, 2);
  const bmiPenalty = bmi > 30 ? 10 : bmi > 25 ? 5 : bmi < 18.5 ? 5 : 0;
  const metabolicBaseline = clamp(
    50 + dietBonus + exerciseBonus - bmiPenalty - alcoholPenalty,
    5,
    95
  );

  // Mental Clarity: energy levels + sleep + stress
  const mentalClarity = clamp(
    50 + avgEnergy * 2 + sleepBonus * 0.6 - stressPenalty * 0.5 - caffeineOverload * 0.5,
    5,
    95
  );

  // Body Balance: exercise + sleep + low stress + low alcohol
  const bodyBalance = clamp(
    50 + exerciseBonus * 1.2 + sleepBonus * 0.4 - stressPenalty * 0.3 - alcoholPenalty - bmiPenalty * 0.5,
    5,
    95
  );

  return {
    stressResilience: Math.round(stressResilience),
    recoveryPattern: Math.round(recoveryPattern),
    sleepQuality: Math.round(sleepQuality),
    metabolicBaseline: Math.round(metabolicBaseline),
    mentalClarity: Math.round(mentalClarity),
    bodyBalance: Math.round(bodyBalance),
  };
}

// Diminishing returns: improvements are smaller when score is already high
export function applyEffect(currentScore: number, rawEffect: number): number {
  const diminished = rawEffect * (1 - currentScore / 120);
  return clamp(Math.round(currentScore + diminished), 0, 100);
}

// Calculate projected scores from all treatments placed in the timeline
export function calculateProjections(
  baselines: Record<WellnessIndicator, number>,
  timeline: TimelineSlot[],
  days: 30 | 90
): Record<WellnessIndicator, number> {
  // Collect all placed treatment IDs
  const placedIds = new Set<string>();
  for (const slot of timeline) {
    for (const id of slot.treatments) {
      placedIds.add(id);
    }
  }

  // Start from baselines
  const projected = { ...baselines };

  // Apply each unique treatment's effects (order doesn't matter for additive model)
  for (const id of placedIds) {
    const treatment = BLUEPRINT_TREATMENTS.find((t) => t.id === id);
    if (!treatment) continue;

    for (const [key, value] of Object.entries(treatment.effects)) {
      const indicator = key as WellnessIndicator;
      if (value !== undefined) {
        projected[indicator] = applyEffect(projected[indicator], value);
      }
    }
  }

  // For 90 days, apply compounding (treatments become ~40% more effective over time)
  if (days === 90) {
    for (const indicator of INDICATORS) {
      const improvement = projected[indicator] - baselines[indicator];
      if (improvement > 0) {
        projected[indicator] = clamp(
          Math.round(baselines[indicator] + improvement * 1.4),
          0,
          100
        );
      }
    }
  }

  return projected;
}

// Overall score is the weighted average of all 6 indicators
export function calculateOverallScore(
  indicators: Record<WellnessIndicator, number>
): number {
  const values = INDICATORS.map((k) => indicators[k]);
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

// Score color helpers (match existing Kamura score tokens)
export function getIndicatorColor(score: number): {
  text: string;
  bg: string;
  fill: string;
} {
  if (score >= 70) return { text: "text-score-green", bg: "bg-score-green", fill: "#4ADE80" };
  if (score >= 50) return { text: "text-score-yellow", bg: "bg-score-yellow", fill: "#FACC15" };
  if (score >= 30) return { text: "text-score-orange", bg: "bg-score-orange", fill: "#FB923C" };
  return { text: "text-score-red", bg: "bg-score-red", fill: "#F87171" };
}

// Create empty timeline (6am to 10pm = hours 6..22)
export function createEmptyTimeline(): TimelineSlot[] {
  return Array.from({ length: 17 }, (_, i) => ({
    hour: i + 6,
    treatments: [],
  }));
}

// Format hour for display
export function formatHour(hour: number): string {
  if (hour === 0 || hour === 24) return "12:00 AM";
  if (hour === 12) return "12:00 PM";
  if (hour < 12) return `${hour}:00 AM`;
  return `${hour - 12}:00 PM`;
}
