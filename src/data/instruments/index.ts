import type {Instrument} from './types';
import {phq9} from './phq9';
import {gad7} from './gad7';
import {bmi, packYears, idealWeight, bodyFat, fastingGlucose} from './calculators';

export * from './types';

/**
 * Every instrument Kamura publishes. Each one is public domain, free with
 * attribution, or a formula published in the open literature — see the rules in
 * ./types.ts before adding to this list.
 *
 * Deliberately NOT included, because they require a licence we do not hold:
 * STOP-BANG (University Health Network), FRAX (University of Sheffield — its
 * equations are unpublished, so a reimplementation would be a guess rather than
 * FRAX), the Epworth Sleepiness Scale, and the Mood Disorder Questionnaire.
 */
export const INSTRUMENTS: Instrument[] = [
  phq9,
  gad7,
  fastingGlucose,
  bmi,
  bodyFat,
  packYears,
  idealWeight,
];

export const getInstrument = (slug: string) => INSTRUMENTS.find((i) => i.slug === slug);

export const INSTRUMENT_CATEGORIES = Array.from(new Set(INSTRUMENTS.map((i) => i.category)));

export const LICENCE_LABEL: Record<Instrument['licence'], string> = {
  'public-domain': 'Public domain',
  'free-with-attribution': 'Free with attribution',
  'published-formula': 'Published formula',
};
