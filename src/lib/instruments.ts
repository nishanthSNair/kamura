import type {Band, Instrument, SafetyRule} from '@/data/instruments/types';

export interface InstrumentResult {
  /** Raw score (questionnaire total, or calculator output). */
  score: number;
  /** How the score should be shown, e.g. "12" or "24.6". */
  display: string;
  /** Unit or qualifier, e.g. "of 27" or "kg/m²". */
  detail?: string;
  band: Band;
  /** Set when a safety rule fired. Shown BEFORE the score, always. */
  safety?: SafetyRule;
  /** True when every required answer is present. */
  complete: boolean;
}

export const maxScore = (instrument: Instrument): number =>
  instrument.body.kind === 'questionnaire'
    ? instrument.body.questions.length * Math.max(...instrument.body.options.map((o) => o.value))
    : 0;

/** Pick the band whose inclusive range contains the score. */
export function bandFor(instrument: Instrument, score: number): Band {
  const hit = instrument.bands.find((b) => score >= b.min && score <= b.max);
  if (hit) return hit;
  // Out of range can only happen with bad data; fall back to the nearest edge
  // rather than throwing, so a result page never white-screens.
  return score < instrument.bands[0].min ? instrument.bands[0] : instrument.bands[instrument.bands.length - 1];
}

/**
 * Score an instrument from the answers given.
 * `answers` maps question/field id to the selected or entered numeric value.
 */
export function scoreInstrument(instrument: Instrument, answers: Record<string, number>): InstrumentResult {
  if (instrument.body.kind === 'questionnaire') {
    const {questions} = instrument.body;
    const answered = questions.filter((q) => Number.isFinite(answers[q.id]));
    const score = answered.reduce((sum, q) => sum + answers[q.id], 0);
    const complete = answered.length === questions.length;

    // Safety is evaluated on the answer itself, independently of the total, and
    // independently of whether the rest of the questionnaire is finished.
    const rule = instrument.safety;
    const safety =
      rule && Number.isFinite(answers[rule.questionId]) && answers[rule.questionId] >= rule.triggerAtLeast
        ? rule
        : undefined;

    return {
      score,
      display: String(score),
      detail: `of ${maxScore(instrument)}`,
      band: bandFor(instrument, score),
      safety,
      complete,
    };
  }

  const {fields, compute} = instrument.body;
  // Completeness means "answered", not "non-zero" — a valid choice can be 0
  // (e.g. female = 0), so requiredness is declared on the field, never inferred.
  const complete = fields
    .filter((f) => !f.optional)
    .every((f) => Number.isFinite(answers[f.id]));
  if (!complete) {
    return {score: 0, display: '—', band: instrument.bands[0], complete: false};
  }
  const out = compute(answers);
  return {
    score: out.score,
    display: out.display,
    detail: out.detail,
    band: bandFor(instrument, out.score),
    complete: true,
  };
}

export const TONE_COLOR: Record<Band['tone'], string> = {
  good: '#1E9E52',
  watch: '#C88A16',
  concern: '#D2691E',
  high: '#C4443A',
};
