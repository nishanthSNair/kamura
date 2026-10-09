import type {Instrument} from './types';

// Calculators built from formulas published in the open literature. No licence
// is required for a published equation, but the source is still cited so the
// number can be checked.

export const bmi: Instrument = {
  slug: 'bmi',
  name: 'BMI calculator',
  short: 'Body mass index from height and weight — with the caveats that matter.',
  category: 'Metabolic',
  minutes: 1,
  licence: 'published-formula',
  licenceNote: 'BMI is a published formula (weight in kg ÷ height in metres squared). No licence applies.',
  source: {
    citation:
      'World Health Organization. Obesity: preventing and managing the global epidemic. WHO Technical Report Series 894. 2000.',
    year: 2000,
    url: 'https://www.who.int/publications/i/item/WHO_TRS_894',
  },
  reviewed: '2026-10-09',
  body: {
    kind: 'calculator',
    fields: [
      {kind: 'number', id: 'height', label: 'Height', unit: 'cm', min: 100, max: 250, step: 1},
      {kind: 'number', id: 'weight', label: 'Weight', unit: 'kg', min: 25, max: 300, step: 0.5},
    ],
    compute: ({height, weight}) => {
      const m = height / 100;
      const value = weight / (m * m);
      return {score: value, display: value.toFixed(1), detail: 'kg/m²'};
    },
  },
  bands: [
    {
      min: 0,
      max: 18.49,
      label: 'Underweight',
      tone: 'watch',
      meaning: 'Your BMI falls below the WHO healthy range.',
      next: 'Worth discussing with a clinician, particularly if the weight was unintentional.',
    },
    {
      min: 18.5,
      max: 24.99,
      label: 'Healthy range',
      tone: 'good',
      meaning: 'Your BMI falls inside the WHO healthy range for a general adult population.',
      next: 'BMI alone says little about health. Waist measurement and fitness tell you more.',
    },
    {
      min: 25,
      max: 29.99,
      label: 'Overweight',
      tone: 'watch',
      meaning: 'Your BMI falls in the WHO overweight range.',
      next: 'Consider waist circumference and a fasting glucose check, which track metabolic risk more closely.',
    },
    {
      min: 30,
      max: 100,
      label: 'Obese range',
      tone: 'concern',
      meaning: 'Your BMI falls in the WHO obese range.',
      next: 'Worth a conversation with a clinician about metabolic health, not just weight.',
    },
  ],
  notes: [
    'BMI does not distinguish muscle from fat. A muscular person can register as overweight while being metabolically healthy.',
    'WHO and several national bodies recommend LOWER thresholds for people of South Asian, Chinese and other Asian ancestry — overweight from about 23 and obesity from about 27.5 — because cardiometabolic risk rises at a lower BMI. This matters for much of the UAE population.',
    'BMI says nothing about where fat is stored, and visceral fat carries the greater risk.',
  ],
  relatedTreatments: [
    {slug: 'resistance-training', label: 'Resistance training'},
    {slug: 'dexa-scan', label: 'DEXA scan'},
    {slug: 'zone-2-cardio', label: 'Zone 2 cardio'},
  ],
};

export const packYears: Instrument = {
  slug: 'pack-years',
  name: 'Smoking pack-years',
  short: 'The number clinicians use to quantify lifetime smoking exposure.',
  category: 'Lifestyle',
  minutes: 1,
  licence: 'published-formula',
  licenceNote: 'Pack-years is a standard arithmetic definition in widespread clinical use. No licence applies.',
  source: {
    citation:
      'National Cancer Institute. NCI Dictionary of Cancer Terms: pack year. US National Institutes of Health.',
    year: 2024,
    url: 'https://www.cancer.gov/publications/dictionaries/cancer-terms/def/pack-year',
  },
  reviewed: '2026-10-09',
  body: {
    kind: 'calculator',
    fields: [
      {kind: 'number', id: 'perDay', label: 'Cigarettes per day', min: 0, max: 100, step: 1},
      {kind: 'number', id: 'years', label: 'Years smoked', unit: 'years', min: 0, max: 80, step: 1},
    ],
    compute: ({perDay, years}) => {
      const value = (perDay / 20) * years;
      return {score: value, display: value.toFixed(1), detail: 'pack-years'};
    },
  },
  bands: [
    {
      min: 0,
      max: 0.001,
      label: 'No recorded exposure',
      tone: 'good',
      meaning: 'No smoking exposure entered.',
      next: 'Nothing to act on here.',
    },
    {
      min: 0.002,
      max: 19.99,
      label: 'Under 20 pack-years',
      tone: 'watch',
      meaning: 'Lifetime exposure below the threshold most lung screening programmes use.',
      next: 'Stopping reduces risk at any level of exposure. Mention your history at your next appointment.',
    },
    {
      min: 20,
      max: 1000,
      label: '20 or more pack-years',
      tone: 'concern',
      meaning:
        'At or above the exposure level at which major guidelines begin to consider low-dose CT lung cancer screening, alongside age and how recently you smoked.',
      next: 'Worth asking a clinician whether lung cancer screening is appropriate for you.',
    },
  ],
  notes: [
    'Pack-years measures exposure, not risk. Age, how long ago you stopped and other factors all matter.',
    'Screening eligibility differs between countries and guidelines; this number is one input, not a decision.',
    'It does not account for shisha, vaping or secondhand smoke.',
  ],
};

export const idealWeight: Instrument = {
  slug: 'ideal-body-weight',
  name: 'Ideal body weight (Devine)',
  short: 'The formula used for medication dosing — not a body goal.',
  category: 'General',
  minutes: 1,
  licence: 'published-formula',
  licenceNote: 'The Devine formula is published in the open literature. No licence applies.',
  source: {
    citation: 'Devine BJ. Gentamicin therapy. Drug Intell Clin Pharm. 1974;8(11):650–655.',
    year: 1974,
    doi: '10.1177/106002807400801104',
    url: 'https://doi.org/10.1177/106002807400801104',
  },
  reviewed: '2026-10-09',
  body: {
    kind: 'calculator',
    fields: [
      {kind: 'number', id: 'height', label: 'Height', unit: 'cm', min: 130, max: 220, step: 1},
      {
        kind: 'choice',
        id: 'sex',
        label: 'Sex assigned at birth',
        options: [
          {label: 'Male', value: 1},
          {label: 'Female', value: 0},
        ],
        help: 'The formula was derived separately for men and women.',
      },
    ],
    compute: ({height, sex}) => {
      const inchesOver5ft = Math.max(0, height / 2.54 - 60);
      const base = sex === 1 ? 50 : 45.5;
      const value = base + 2.3 * inchesOver5ft;
      return {score: value, display: value.toFixed(1), detail: 'kg'};
    },
  },
  bands: [
    {
      min: 0,
      max: 1000,
      label: 'Reference weight',
      tone: 'good',
      meaning:
        'This is the Devine reference weight for your height. It was created in 1974 to calculate medication doses, and it is still used for that.',
      next: 'Do not treat this as a target. It ignores build, muscle and body composition entirely.',
    },
  ],
  notes: [
    'This formula exists for drug dosing, not for setting a personal weight goal.',
    'It takes no account of frame size, muscle mass, age or ethnicity.',
    'Being above or below it is not in itself a health finding.',
  ],
};

export const bodyFat: Instrument = {
  slug: 'body-fat-navy',
  name: 'Body fat estimate (US Navy)',
  short: 'A tape-measure estimate of body fat percentage.',
  category: 'Metabolic',
  minutes: 2,
  licence: 'published-formula',
  licenceNote:
    'The US Navy circumference equations were developed by the Naval Health Research Center and are published. No licence applies.',
  source: {
    citation:
      'Hodgdon JA, Beckett MB. Prediction of percent body fat for U.S. Navy men and women from body circumferences and height. Naval Health Research Center, Report No. 84-11. 1984.',
    year: 1984,
    url: 'https://apps.dtic.mil/sti/citations/ADA143890',
  },
  reviewed: '2026-10-09',
  body: {
    kind: 'calculator',
    fields: [
      {
        kind: 'choice',
        id: 'sex',
        label: 'Sex assigned at birth',
        options: [
          {label: 'Male', value: 1},
          {label: 'Female', value: 0},
        ],
        help: 'The equations differ, and the female equation also needs a hip measurement.',
      },
      {kind: 'number', id: 'height', label: 'Height', unit: 'cm', min: 130, max: 220, step: 1},
      {kind: 'number', id: 'neck', label: 'Neck circumference', unit: 'cm', min: 20, max: 70, step: 0.5},
      {kind: 'number', id: 'waist', label: 'Waist circumference', unit: 'cm', min: 50, max: 200, step: 0.5},
      {
        kind: 'number',
        id: 'hip',
        label: 'Hip circumference (women only)',
        optional: true,
        unit: 'cm',
        min: 0,
        max: 200,
        step: 0.5,
        help: 'Only needed for the female equation — leave blank otherwise.',
      },
    ],
    compute: ({sex, height, neck, waist, hip = 0}) => {
      // Published equations use inches; convert, then apply.
      const toIn = (cm: number) => cm / 2.54;
      const h = toIn(height);
      const n = toIn(neck);
      const w = toIn(waist);
      const p = toIn(hip);
      const value =
        sex === 1
          ? 86.01 * Math.log10(Math.max(w - n, 0.1)) - 70.041 * Math.log10(h) + 36.76
          : 163.205 * Math.log10(Math.max(w + p - n, 0.1)) - 97.684 * Math.log10(h) - 78.387;
      const clamped = Math.min(Math.max(value, 2), 70);
      return {score: clamped, display: clamped.toFixed(1), detail: '% body fat (estimate)'};
    },
  },
  bands: [
    {
      min: 0,
      max: 13.99,
      label: 'Low',
      tone: 'watch',
      meaning: 'This estimate falls at the low end. Very low body fat carries its own risks.',
      next: 'If this is unintentional, or accompanied by fatigue or missed periods, speak to a clinician.',
    },
    {
      min: 14,
      max: 24.99,
      label: 'Typical range',
      tone: 'good',
      meaning: 'This estimate falls within a commonly cited typical range.',
      next: 'Healthy ranges differ substantially by sex and age — treat this as a rough marker.',
    },
    {
      min: 25,
      max: 31.99,
      label: 'Above typical',
      tone: 'watch',
      meaning: 'This estimate sits above the commonly cited typical range.',
      next: 'Waist circumference and fasting glucose track metabolic risk more directly.',
    },
    {
      min: 32,
      max: 100,
      label: 'High',
      tone: 'concern',
      meaning: 'This estimate sits well above commonly cited ranges.',
      next: 'Worth a conversation about metabolic health with a clinician.',
    },
  ],
  notes: [
    'This is an estimate from tape measurements, not a scan. Expect a margin of error of several percentage points against DEXA.',
    'The equations were derived in US military personnel and are less accurate at the extremes of body size.',
    'Healthy body fat ranges differ by sex and rise with age; the bands above are general, not personal targets.',
  ],
  relatedTreatments: [{slug: 'dexa-scan', label: 'DEXA scan — the measured alternative'}],
};

export const fastingGlucose: Instrument = {
  slug: 'fasting-glucose',
  name: 'Fasting blood glucose',
  short: 'Read your fasting glucose result against the diagnostic thresholds.',
  category: 'Metabolic',
  minutes: 1,
  licence: 'published-formula',
  licenceNote:
    'The thresholds below are published diagnostic criteria from the American Diabetes Association Standards of Care. Reproducing a numeric threshold requires no licence.',
  source: {
    citation:
      'American Diabetes Association. Standards of Care in Diabetes — Classification and Diagnosis of Diabetes. Diabetes Care.',
    year: 2025,
    url: 'https://diabetesjournals.org/care/issue/48/Supplement_1',
  },
  reviewed: '2026-10-09',
  body: {
    kind: 'calculator',
    fields: [
      {
        kind: 'number',
        id: 'glucose',
        label: 'Fasting glucose',
        unit: 'mmol/L',
        min: 1,
        max: 35,
        step: 0.1,
        help: 'Fasting means no food for at least 8 hours. To convert from mg/dL, divide by 18.',
      },
    ],
    compute: ({glucose}) => ({
      score: glucose,
      display: glucose.toFixed(1),
      detail: `mmol/L · about ${Math.round(glucose * 18)} mg/dL`,
    }),
  },
  bands: [
    {
      min: 0,
      max: 5.59,
      label: 'Normal range',
      tone: 'good',
      meaning: 'Below 5.6 mmol/L (100 mg/dL) is the normal fasting range.',
      next: 'No action indicated by this value alone.',
    },
    {
      min: 5.6,
      max: 6.99,
      label: 'Prediabetes range',
      tone: 'watch',
      meaning:
        '5.6–6.9 mmol/L (100–125 mg/dL) is the range the ADA labels impaired fasting glucose, or prediabetes.',
      next: 'Worth discussing with a clinician. This range is frequently reversible with changes to activity and diet.',
    },
    {
      min: 7,
      max: 100,
      label: 'Diabetes range',
      tone: 'concern',
      meaning:
        '7.0 mmol/L (126 mg/dL) or above on a fasting sample meets the diagnostic threshold for diabetes — but diagnosis requires confirmation on a second test.',
      next: 'Please take this result to a doctor. Do not treat a single reading as a diagnosis.',
    },
  ],
  notes: [
    'One reading is not a diagnosis. The ADA requires a repeat abnormal test, or a second abnormal test type, to diagnose diabetes.',
    'Illness, stress, steroid medication and a short fast can all raise a single reading.',
    'This interprets a value you already have. It does not estimate your glucose.',
  ],
  relatedTreatments: [
    {slug: 'zone-2-cardio', label: 'Zone 2 cardio'},
    {slug: 'walking', label: 'Walking'},
    {slug: 'time-restricted-eating', label: 'Time-restricted eating'},
    {slug: 'berberine', label: 'Berberine'},
  ],
};
