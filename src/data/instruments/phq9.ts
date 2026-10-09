import type {Instrument} from './types';

// PHQ-9 — Patient Health Questionnaire-9.
// Public domain: Pfizer released the PHQ family in 2010 with "no permission
// required to reproduce, translate, display or distribute", including in
// commercial software. Wording and scoring below match the published instrument.

const OPTIONS = [
  {label: 'Not at all', value: 0},
  {label: 'Several days', value: 1},
  {label: 'More than half the days', value: 2},
  {label: 'Nearly every day', value: 3},
];

export const phq9: Instrument = {
  slug: 'depression-phq9',
  name: 'Depression screen (PHQ-9)',
  short: 'The nine-question depression screen used in clinics worldwide.',
  category: 'Mental health',
  minutes: 3,
  licence: 'public-domain',
  licenceNote:
    'The PHQ-9 is in the public domain. Pfizer released the PHQ family in 2010 with no permission required to reproduce, translate, display or distribute it, and no licence fee.',
  source: {
    citation:
      'Kroenke K, Spitzer RL, Williams JBW. The PHQ-9: validity of a brief depression severity measure. J Gen Intern Med. 2001;16(9):606–613.',
    year: 2001,
    pmid: '11556941',
    doi: '10.1046/j.1525-1497.2001.016009606.x',
    url: 'https://pubmed.ncbi.nlm.nih.gov/11556941/',
  },
  reviewed: '2026-10-09',
  body: {
    kind: 'questionnaire',
    stem: 'Over the last 2 weeks, how often have you been bothered by any of the following problems?',
    options: OPTIONS,
    questions: [
      {id: 'q1', text: 'Little interest or pleasure in doing things'},
      {id: 'q2', text: 'Feeling down, depressed, or hopeless'},
      {id: 'q3', text: 'Trouble falling or staying asleep, or sleeping too much'},
      {id: 'q4', text: 'Feeling tired or having little energy'},
      {id: 'q5', text: 'Poor appetite or overeating'},
      {
        id: 'q6',
        text: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down',
      },
      {
        id: 'q7',
        text: 'Trouble concentrating on things, such as reading the newspaper or watching television',
      },
      {
        id: 'q8',
        text: 'Moving or speaking so slowly that other people could have noticed — or the opposite, being so fidgety or restless that you have been moving around a lot more than usual',
      },
      {id: 'q9', text: 'Thoughts that you would be better off dead, or of hurting yourself in some way'},
    ],
  },
  bands: [
    {
      min: 0,
      max: 4,
      label: 'Minimal',
      tone: 'good',
      meaning: 'Your answers suggest few or no depressive symptoms over the last two weeks.',
      next: 'Nothing here needs action. If how you feel changes, the screen is here to retake.',
    },
    {
      min: 5,
      max: 9,
      label: 'Mild',
      tone: 'watch',
      meaning:
        'Your answers suggest mild symptoms. This is common and often improves, but it is worth watching rather than ignoring.',
      next: 'Consider retaking in two weeks. If symptoms persist or affect daily life, mention them to a clinician.',
    },
    {
      min: 10,
      max: 14,
      label: 'Moderate',
      tone: 'concern',
      meaning:
        'Your answers fall in the range where clinicians usually begin a fuller conversation. A score of 10 or above is the commonly used threshold for further assessment.',
      next: 'Bring this score and your answers to a doctor or mental health professional.',
    },
    {
      min: 15,
      max: 19,
      label: 'Moderately severe',
      tone: 'high',
      meaning:
        'Your answers suggest substantial symptoms over the last two weeks.',
      next: 'Arrange to speak with a clinician soon. Take this summary with you.',
    },
    {
      min: 20,
      max: 27,
      label: 'Severe',
      tone: 'high',
      meaning: 'Your answers suggest severe symptoms over the last two weeks.',
      next: 'Please speak to a doctor or mental health professional promptly. You do not have to manage this alone.',
    },
  ],
  // Item 9 asks about thoughts of self-harm. Any endorsement shows help first,
  // before the score, regardless of the total.
  safety: {
    questionId: 'q9',
    triggerAtLeast: 1,
    title: 'Please read this first',
    body:
      'You indicated thoughts of being better off dead or of hurting yourself. That matters more than any score on this page. Please talk to someone today — a doctor, a mental health professional, or someone you trust. If you are in immediate danger, contact emergency services.',
    resources: [
      {label: 'UAE emergency services', value: '998 (ambulance) · 999 (police)'},
      {label: 'Estijaba (Department of Health, Abu Dhabi)', value: '8001717'},
      {label: 'Al Amal Psychiatric Hospital, Dubai', value: '800 111'},
      {label: 'Dubai Health Authority mental health line', value: '800 342'},
      {
        label: 'Find an international helpline',
        value: 'findahelpline.com',
        href: 'https://findahelpline.com',
      },
    ],
  },
  notes: [
    'This is a screening questionnaire, not a diagnosis. Only a qualified clinician can diagnose depression.',
    'It reflects the last two weeks only, and a single difficult fortnight is not the same as a persistent condition.',
    'Physical illness, grief, medication, pain and poor sleep can all raise the score without depression being the cause.',
  ],
  relatedTreatments: [
    {slug: 'sleep-optimisation', label: 'Sleep optimisation'},
    {slug: 'resistance-training', label: 'Resistance training'},
    {slug: 'meditation', label: 'Meditation'},
  ],
};
