// Standard titration schedules for peptides / pharmaceuticals that escalate in dose.
// Doses are weekly anchors — stepper renders one cell per week.
// Fallback: if slug not found, no stepper shown.

export interface TitrationStep {
  week: number;
  dose: string;        // e.g. "2.5 mg"
  note?: string;       // e.g. "starter"
}

export interface TitrationSchedule {
  totalWeeks: number;
  steps: TitrationStep[];
  note?: string;
}

export const TITRATION_SCHEDULES: Record<string, TitrationSchedule> = {
  tirzepatide: {
    totalWeeks: 20,
    steps: [
      { week: 1, dose: "2.5 mg", note: "starter" },
      { week: 2, dose: "2.5 mg" },
      { week: 3, dose: "2.5 mg" },
      { week: 4, dose: "2.5 mg" },
      { week: 5, dose: "5 mg" },
      { week: 6, dose: "5 mg" },
      { week: 7, dose: "5 mg" },
      { week: 8, dose: "5 mg" },
      { week: 9, dose: "7.5 mg" },
      { week: 10, dose: "7.5 mg" },
      { week: 11, dose: "7.5 mg" },
      { week: 12, dose: "7.5 mg" },
      { week: 13, dose: "10 mg" },
      { week: 14, dose: "10 mg" },
      { week: 15, dose: "10 mg" },
      { week: 16, dose: "10 mg" },
      { week: 17, dose: "12.5 mg" },
      { week: 18, dose: "12.5 mg" },
      { week: 19, dose: "15 mg", note: "maintenance" },
      { week: 20, dose: "15 mg", note: "maintenance" },
    ],
    note: "Standard GLP-1 dual agonist titration. Escalate only with prescriber approval.",
  },
  semaglutide: {
    totalWeeks: 20,
    steps: [
      { week: 1, dose: "0.25 mg", note: "starter" },
      { week: 2, dose: "0.25 mg" },
      { week: 3, dose: "0.25 mg" },
      { week: 4, dose: "0.25 mg" },
      { week: 5, dose: "0.5 mg" },
      { week: 6, dose: "0.5 mg" },
      { week: 7, dose: "0.5 mg" },
      { week: 8, dose: "0.5 mg" },
      { week: 9, dose: "1.0 mg" },
      { week: 10, dose: "1.0 mg" },
      { week: 11, dose: "1.0 mg" },
      { week: 12, dose: "1.0 mg" },
      { week: 13, dose: "1.7 mg" },
      { week: 14, dose: "1.7 mg" },
      { week: 15, dose: "1.7 mg" },
      { week: 16, dose: "1.7 mg" },
      { week: 17, dose: "2.4 mg", note: "maintenance" },
      { week: 18, dose: "2.4 mg", note: "maintenance" },
      { week: 19, dose: "2.4 mg", note: "maintenance" },
      { week: 20, dose: "2.4 mg", note: "maintenance" },
    ],
    note: "Standard GLP-1 titration. Follow prescriber guidance on escalation.",
  },
  "cjc-1295-ipamorelin": {
    totalWeeks: 12,
    steps: [
      { week: 1, dose: "100/100 mcg", note: "bedtime" },
      { week: 2, dose: "100/100 mcg" },
      { week: 3, dose: "100/100 mcg" },
      { week: 4, dose: "100/100 mcg" },
      { week: 5, dose: "200/200 mcg" },
      { week: 6, dose: "200/200 mcg" },
      { week: 7, dose: "200/200 mcg" },
      { week: 8, dose: "200/200 mcg" },
      { week: 9, dose: "200/200 mcg", note: "cycle off" },
      { week: 10, dose: "rest" },
      { week: 11, dose: "rest" },
      { week: 12, dose: "rest" },
    ],
    note: "8 weeks on, 4 weeks off cycling. Dose at bedtime on empty stomach.",
  },
  "bpc-157": {
    totalWeeks: 8,
    steps: [
      { week: 1, dose: "250 mcg 2x/day" },
      { week: 2, dose: "250 mcg 2x/day" },
      { week: 3, dose: "250 mcg 2x/day" },
      { week: 4, dose: "250 mcg 2x/day" },
      { week: 5, dose: "250 mcg 1x/day" },
      { week: 6, dose: "250 mcg 1x/day" },
      { week: 7, dose: "250 mcg 1x/day" },
      { week: 8, dose: "250 mcg 1x/day", note: "cycle complete" },
    ],
    note: "Typical recovery cycle. Extend if injury warrants.",
  },
  tesamorelin: {
    totalWeeks: 12,
    steps: [
      { week: 1, dose: "2 mg", note: "bedtime" },
      { week: 2, dose: "2 mg" },
      { week: 3, dose: "2 mg" },
      { week: 4, dose: "2 mg" },
      { week: 5, dose: "2 mg" },
      { week: 6, dose: "2 mg" },
      { week: 7, dose: "2 mg" },
      { week: 8, dose: "2 mg" },
      { week: 9, dose: "2 mg" },
      { week: 10, dose: "2 mg" },
      { week: 11, dose: "2 mg" },
      { week: 12, dose: "2 mg", note: "review" },
    ],
    note: "12-week course. Peak visceral-fat reduction typically weeks 8-12.",
  },
  retatrutide: {
    totalWeeks: 16,
    steps: [
      { week: 1, dose: "2 mg", note: "starter" },
      { week: 2, dose: "2 mg" },
      { week: 3, dose: "2 mg" },
      { week: 4, dose: "2 mg" },
      { week: 5, dose: "4 mg" },
      { week: 6, dose: "4 mg" },
      { week: 7, dose: "4 mg" },
      { week: 8, dose: "4 mg" },
      { week: 9, dose: "8 mg" },
      { week: 10, dose: "8 mg" },
      { week: 11, dose: "8 mg" },
      { week: 12, dose: "8 mg" },
      { week: 13, dose: "12 mg" },
      { week: 14, dose: "12 mg" },
      { week: 15, dose: "12 mg", note: "maintenance" },
      { week: 16, dose: "12 mg", note: "maintenance" },
    ],
    note: "Triple agonist (GLP-1 / GIP / glucagon). Strict prescriber oversight required.",
  },
};

export function getTitrationSchedule(slug: string): TitrationSchedule | undefined {
  return TITRATION_SCHEDULES[slug];
}
