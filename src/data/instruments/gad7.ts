import type {Instrument} from './types';

// GAD-7 — Generalised Anxiety Disorder 7-item scale.
// Public domain alongside the PHQ family (Pfizer, 2010). Wording and cut-points
// match Spitzer et al. 2006.

const OPTIONS = [
  {label: 'Not at all', value: 0},
  {label: 'Several days', value: 1},
  {label: 'More than half the days', value: 2},
  {label: 'Nearly every day', value: 3},
];

export const gad7: Instrument = {
  slug: 'anxiety-gad7',
  name: 'Anxiety screen (GAD-7)',
  short: 'The seven-question generalised anxiety screen used in primary care.',
  category: 'Mental health',
  minutes: 2,
  licence: 'public-domain',
  licenceNote:
    'The GAD-7 is in the public domain. Pfizer released it in 2010 with no permission required to reproduce, translate, display or distribute it, and no licence fee.',
  source: {
    citation:
      'Spitzer RL, Kroenke K, Williams JBW, Löwe B. A brief measure for assessing generalized anxiety disorder: the GAD-7. Arch Intern Med. 2006;166(10):1092–1097.',
    year: 2006,
    pmid: '16717171',
    doi: '10.1001/archinte.166.10.1092',
    url: 'https://pubmed.ncbi.nlm.nih.gov/16717171/',
  },
  reviewed: '2026-10-09',
  body: {
    kind: 'questionnaire',
    stem: 'Over the last 2 weeks, how often have you been bothered by the following problems?',
    options: OPTIONS,
    questions: [
      {id: 'q1', text: 'Feeling nervous, anxious, or on edge'},
      {id: 'q2', text: 'Not being able to stop or control worrying'},
      {id: 'q3', text: 'Worrying too much about different things'},
      {id: 'q4', text: 'Trouble relaxing'},
      {id: 'q5', text: 'Being so restless that it is hard to sit still'},
      {id: 'q6', text: 'Becoming easily annoyed or irritable'},
      {id: 'q7', text: 'Feeling afraid as if something awful might happen'},
    ],
  },
  bands: [
    {
      min: 0,
      max: 4,
      label: 'Minimal',
      tone: 'good',
      meaning: 'Your answers suggest minimal anxiety symptoms over the last two weeks.',
      next: 'Nothing here needs action. Retake it if how you feel changes.',
    },
    {
      min: 5,
      max: 9,
      label: 'Mild',
      tone: 'watch',
      meaning: 'Your answers suggest mild anxiety symptoms — common, and often situational.',
      next: 'Worth watching. If it persists beyond a few weeks or interferes with daily life, mention it to a clinician.',
    },
    {
      min: 10,
      max: 14,
      label: 'Moderate',
      tone: 'concern',
      meaning:
        'A score of 10 or above is the commonly used threshold for further assessment of generalised anxiety.',
      next: 'Bring this score and your answers to a doctor or mental health professional.',
    },
    {
      min: 15,
      max: 21,
      label: 'Severe',
      tone: 'high',
      meaning: 'Your answers suggest severe anxiety symptoms over the last two weeks.',
      next: 'Please arrange to speak with a clinician soon. Take this summary with you.',
    },
  ],
  notes: [
    'This is a screening questionnaire, not a diagnosis.',
    'It was designed for generalised anxiety and does not screen for panic disorder, social anxiety, OCD or PTSD specifically.',
    'Thyroid problems, caffeine, stimulants, some medications and withdrawal can all produce anxiety symptoms.',
  ],
  relatedTreatments: [
    {slug: 'meditation', label: 'Meditation'},
    {slug: 'breathwork', label: 'Breathwork'},
    {slug: 'ashwagandha', label: 'Ashwagandha'},
  ],
};
