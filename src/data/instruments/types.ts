// Validated screening instruments and clinical formulas.
//
// RULES FOR THIS DIRECTORY — read before adding anything:
//
// 1. LICENCE. Only add an instrument Kamura is legally entitled to reproduce:
//    public domain (PHQ-9, GAD-7), free with attribution (WHO AUDIT), or a
//    formula published in the open literature (BMI, Devine, US Navy, pack-years).
//    DO NOT add STOP-BANG (University Health Network licence), FRAX (University
//    of Sheffield; its equations are unpublished, so any reimplementation is a
//    guess, not FRAX), the Epworth Sleepiness Scale, or the MDQ, unless a licence
//    has actually been obtained and recorded here.
//
// 2. FIDELITY. Question wording, response options, scoring and cut-points must
//    match the published instrument exactly. A paraphrased PHQ-9 is not a PHQ-9.
//
// 3. CITATION. Every instrument records its primary source and a review date,
//    and the page shows them. A screening score without a source is an opinion.
//
// 4. SAFETY. If an instrument can surface risk of harm, it carries a `safety`
//    rule that shows crisis resources immediately — before any score.
//
// 5. SCOPE. These screen; they never diagnose. Copy must say so plainly.

export type LicenceStatus = 'public-domain' | 'free-with-attribution' | 'published-formula';

export interface Source {
  /** Primary citation, as it should be displayed. */
  citation: string;
  year: number;
  pmid?: string;
  doi?: string;
  url: string;
}

export type BandTone = 'good' | 'watch' | 'concern' | 'high';

export interface Band {
  /** Inclusive lower bound of the score/result that selects this band. */
  min: number;
  /** Inclusive upper bound. */
  max: number;
  label: string;
  tone: BandTone;
  /** What the band means, in plain language. Never a diagnosis. */
  meaning: string;
  /** What a reasonable next step looks like. Never a prescription. */
  next: string;
}

export interface ScaleOption {
  label: string;
  value: number;
}

export interface Question {
  id: string;
  text: string;
}

export interface QuestionnaireBody {
  kind: 'questionnaire';
  /** The published stem, e.g. "Over the last 2 weeks, how often…". */
  stem: string;
  options: ScaleOption[];
  questions: Question[];
}

export interface NumberField {
  kind: 'number';
  id: string;
  label: string;
  /** When true the field may be left blank (e.g. hip, used only by the female equation). */
  optional?: boolean;
  unit?: string;
  min: number;
  max: number;
  step?: number;
  help?: string;
}

export interface ChoiceField {
  kind: 'choice';
  id: string;
  label: string;
  optional?: boolean;
  options: ScaleOption[];
  help?: string;
}

export type Field = NumberField | ChoiceField;

export interface CalculatorBody {
  kind: 'calculator';
  fields: Field[];
  /** Pure function. Returns the score used for banding plus a display string. */
  compute: (values: Record<string, number>) => { score: number; display: string; detail?: string };
}

export interface SafetyRule {
  /** Question whose answer triggers the rule. */
  questionId: string;
  /** Trigger when the answer value is at least this. */
  triggerAtLeast: number;
  title: string;
  body: string;
  resources: { label: string; value: string; href?: string }[];
}

export interface Instrument {
  slug: string;
  name: string;
  /** One line shown on the hub card. */
  short: string;
  category: 'Mental health' | 'Metabolic' | 'Heart' | 'General' | 'Lifestyle';
  minutes: number;
  licence: LicenceStatus;
  /** Shown verbatim on the page — the user can verify our right to publish it. */
  licenceNote: string;
  source: Source;
  /** ISO date of last editorial review. */
  reviewed: string;
  body: QuestionnaireBody | CalculatorBody;
  bands: Band[];
  safety?: SafetyRule;
  /** Honest caveats: what this does not measure, who it is not validated in. */
  notes: string[];
  /** Links into Kamura's evidence-graded library. */
  relatedTreatments?: { slug: string; label: string }[];
}
