/**
 * Peptide reconstitution calculator — presets and pure math.
 * All math is deliberately dependency-free so it can be unit-tested directly.
 *
 * Units convention:
 * - Vial content: mg
 * - Bacteriostatic water: mL
 * - Dose: mcg
 * - Syringe: U-100 insulin (100 units = 1 mL)
 */

export interface CalculatorPreset {
  slug: string;
  name: string;
  /** Common vial sizes sold, in mg. First entry is the default. */
  vialSizesMg: number[];
  /** Typical starting dose in mcg. */
  typicalDoseMcg: number;
  /** Human-readable published dose range. */
  doseRangeLabel: string;
  frequencyLabel: string;
  /** Doses taken per week (for vial-duration estimate). */
  dosesPerWeek: number;
  /** Link target if we have a treatment page. */
  treatmentSlug: string | null;
}

export const CALCULATOR_PRESETS: CalculatorPreset[] = [
  {
    slug: "bpc-157",
    name: "BPC-157",
    vialSizesMg: [5, 10],
    typicalDoseMcg: 250,
    doseRangeLabel: "250–500 mcg/day",
    frequencyLabel: "Daily",
    dosesPerWeek: 7,
    treatmentSlug: "bpc-157",
  },
  {
    slug: "tb-500",
    name: "TB-500",
    vialSizesMg: [5, 10],
    typicalDoseMcg: 2500,
    doseRangeLabel: "2–5 mg twice/week",
    frequencyLabel: "Twice weekly",
    dosesPerWeek: 2,
    treatmentSlug: "tb-500",
  },
  {
    slug: "semaglutide",
    name: "Semaglutide",
    vialSizesMg: [3, 5, 10],
    typicalDoseMcg: 250,
    doseRangeLabel: "250 mcg–2.4 mg/week (titrated)",
    frequencyLabel: "Weekly",
    dosesPerWeek: 1,
    treatmentSlug: null,
  },
  {
    slug: "tirzepatide",
    name: "Tirzepatide",
    vialSizesMg: [5, 10, 15],
    typicalDoseMcg: 2500,
    doseRangeLabel: "2.5–15 mg/week (titrated)",
    frequencyLabel: "Weekly",
    dosesPerWeek: 1,
    treatmentSlug: null,
  },
  {
    slug: "cjc-1295-ipamorelin",
    name: "CJC-1295 / Ipamorelin",
    vialSizesMg: [5, 10],
    typicalDoseMcg: 200,
    doseRangeLabel: "100–300 mcg each, before bed",
    frequencyLabel: "5 nights/week",
    dosesPerWeek: 5,
    treatmentSlug: "cjc-1295-ipamorelin",
  },
  {
    slug: "sermorelin",
    name: "Sermorelin",
    vialSizesMg: [2, 5],
    typicalDoseMcg: 300,
    doseRangeLabel: "200–500 mcg before bed",
    frequencyLabel: "5–7 nights/week",
    dosesPerWeek: 6,
    treatmentSlug: "sermorelin",
  },
  {
    slug: "tesamorelin",
    name: "Tesamorelin",
    vialSizesMg: [2, 5],
    typicalDoseMcg: 2000,
    doseRangeLabel: "1–2 mg/day",
    frequencyLabel: "Daily",
    dosesPerWeek: 7,
    treatmentSlug: "tesamorelin",
  },
  {
    slug: "ghk-cu",
    name: "GHK-Cu",
    vialSizesMg: [50, 100],
    typicalDoseMcg: 1500,
    doseRangeLabel: "1–2 mg/day",
    frequencyLabel: "Daily",
    dosesPerWeek: 7,
    treatmentSlug: "ghk-cu",
  },
  {
    slug: "mots-c",
    name: "MOTS-c",
    vialSizesMg: [10],
    typicalDoseMcg: 5000,
    doseRangeLabel: "5–10 mg 3x/week",
    frequencyLabel: "3x weekly",
    dosesPerWeek: 3,
    treatmentSlug: "mots-c",
  },
  {
    slug: "epitalon",
    name: "Epitalon",
    vialSizesMg: [10, 50],
    typicalDoseMcg: 5000,
    doseRangeLabel: "5–10 mg/day for 10–20 days",
    frequencyLabel: "Daily (cycles)",
    dosesPerWeek: 7,
    treatmentSlug: "epitalon",
  },
  {
    slug: "thymosin-alpha-1",
    name: "Thymosin Alpha-1",
    vialSizesMg: [5, 10],
    typicalDoseMcg: 1600,
    doseRangeLabel: "1.6 mg twice/week",
    frequencyLabel: "Twice weekly",
    dosesPerWeek: 2,
    treatmentSlug: "thymosin-alpha-1",
  },
  {
    slug: "aod-9604",
    name: "AOD-9604",
    vialSizesMg: [5],
    typicalDoseMcg: 400,
    doseRangeLabel: "300–500 mcg/day, fasted",
    frequencyLabel: "Daily",
    dosesPerWeek: 7,
    treatmentSlug: "aod-9604",
  },
  {
    slug: "pt-141",
    name: "PT-141 (Bremelanotide)",
    vialSizesMg: [10],
    typicalDoseMcg: 1000,
    doseRangeLabel: "0.5–2 mg as needed",
    frequencyLabel: "As needed",
    dosesPerWeek: 1,
    treatmentSlug: "pt-141",
  },
  {
    slug: "dsip",
    name: "DSIP",
    vialSizesMg: [5],
    typicalDoseMcg: 250,
    doseRangeLabel: "100–500 mcg before bed",
    frequencyLabel: "Nightly",
    dosesPerWeek: 7,
    treatmentSlug: "dsip",
  },
  {
    slug: "kisspeptin-10",
    name: "Kisspeptin-10",
    vialSizesMg: [5],
    typicalDoseMcg: 100,
    doseRangeLabel: "50–200 mcg/day",
    frequencyLabel: "Daily",
    dosesPerWeek: 7,
    treatmentSlug: "kisspeptin-10",
  },
];

export type SyringeSize = 30 | 50 | 100;

export const SYRINGE_OPTIONS: { units: SyringeSize; label: string; ml: number }[] = [
  { units: 30, label: "0.3 mL (30-unit)", ml: 0.3 },
  { units: 50, label: "0.5 mL (50-unit)", ml: 0.5 },
  { units: 100, label: "1.0 mL (100-unit)", ml: 1.0 },
];

export interface ReconstitutionResult {
  /** mg per mL after reconstitution. */
  concentrationMgMl: number;
  /** Volume of one dose in mL. */
  doseMl: number;
  /** Units on a U-100 insulin syringe (1 unit = 0.01 mL). */
  units: number;
  /** Whole doses in the vial. */
  dosesPerVial: number;
  /** Days the vial lasts at the given doses/week (null if unknown). */
  vialDurationDays: number | null;
  /** Dose does not fit the chosen syringe in one draw. */
  exceedsSyringe: boolean;
  /** Dose is under 2 units — too small to measure accurately. */
  tooSmallToMeasure: boolean;
  /** Suggested water volume (mL) that puts the typical dose at a clean 10+ units, if the current draw is awkward. */
  suggestedBacMl: number | null;
}

export function computeReconstitution(input: {
  vialMg: number;
  bacMl: number;
  doseMcg: number;
  syringeUnits: SyringeSize;
  dosesPerWeek?: number | null;
}): ReconstitutionResult | null {
  const { vialMg, bacMl, doseMcg, syringeUnits, dosesPerWeek } = input;
  if (!(vialMg > 0) || !(bacMl > 0) || !(doseMcg > 0)) return null;

  const concentrationMgMl = vialMg / bacMl;
  const doseMl = doseMcg / 1000 / concentrationMgMl;
  const units = doseMl * 100;
  const dosesPerVial = Math.floor((vialMg * 1000) / doseMcg);
  const vialDurationDays =
    dosesPerWeek && dosesPerWeek > 0
      ? Math.floor(dosesPerVial * (7 / dosesPerWeek))
      : null;

  const exceedsSyringe = units > syringeUnits;
  const tooSmallToMeasure = units < 2;

  // Suggest a water volume that lands the dose between 10 and 25 units:
  // target 20 units → bac = vialMg*1000*0.2 / doseMcg, clamped to 0.5–5 mL steps of 0.1.
  let suggestedBacMl: number | null = null;
  if (exceedsSyringe || tooSmallToMeasure || units < 5) {
    const target = (vialMg * 1000 * 0.2) / doseMcg; // 20 units per dose
    const clamped = Math.min(5, Math.max(0.5, Math.round(target * 10) / 10));
    const resultingUnits = ((doseMcg / 1000) * 100) / (vialMg / clamped);
    if (
      Math.abs(clamped - bacMl) >= 0.1 &&
      resultingUnits >= 2 &&
      resultingUnits <= syringeUnits
    ) {
      suggestedBacMl = clamped;
    }
  }

  return {
    concentrationMgMl,
    doseMl,
    units,
    dosesPerVial,
    vialDurationDays,
    exceedsSyringe,
    tooSmallToMeasure,
    suggestedBacMl,
  };
}

/** Format units for display: whole if clean, else 1 decimal. */
export function formatUnits(units: number): string {
  const rounded = Math.round(units * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}
