export interface OutcomeEvidence {
  outcome: string;
  formulation?: string;
  duration?: string;
  effect?: string;
  design?: string;
  population: string;
  finding: string;
  boundary: string;
  label: string;
  source: string;
}
// Evidence describes a particular outcome and population, never a universal score.
const reviewed: Record<string, OutcomeEvidence> = {
  'mots-c': {
    outcome:'Glucose handling and physical performance',population:'Mice receiving MOTS-c; human exercise cohorts measuring endogenous peptide',
    finding:'Administered MOTS-c improved metabolic or performance endpoints in mouse studies. The human exercise observations did not test an injectable treatment.',
    boundary:'No client fatigue, weight-loss or HbA1c response can be predicted from these studies.',label:'Animal intervention · human physiology',source:'https://pubmed.ncbi.nlm.nih.gov/33473109/',
    formulation:'Experimental animal peptide administration; endogenous human measurements',duration:'Varies by experiment',effect:'No established human treatment effect size',design:'Animal experiments with complementary human physiological observations',
  },
  'pt-141': {
    outcome:'Sexual desire and associated distress in HSDD',population:'Premenopausal women with acquired, generalized HSDD',
    finding:'Two phase 3 trials found improvements in desire and related distress scores versus placebo. These endpoints are distinct from a guaranteed sexual response.',
    boundary:'Results do not establish equivalent benefit in men, postmenopausal women or nasal formulations.',label:'Randomized human trials · defined population',source:'https://pubmed.ncbi.nlm.nih.gov/31599840/',
    formulation:'Subcutaneous bremelanotide in the RECONNECT trials',duration:'24 weeks',effect:'Improved desire and distress scores; no single universal response percentage',design:'Two randomized double-blind placebo-controlled phase 3 trials',
  },
  'bpc-157': {
    formulation: 'Routes and preparations vary across the reviewed studies; no equivalent pen or capsule effect established', duration: 'Varies across included studies', effect: 'No reliable controlled human healing effect size', design: 'Systematic review of predominantly preclinical research',
    outcome: 'Musculoskeletal healing', population: 'Predominantly animal studies; limited uncontrolled human observations',
    finding: 'Repair-related findings in animals do not establish improved human shoulder recovery.',
    boundary: 'No validated human healing percentage or recovery timeline can be drawn from this evidence.',
    label: 'Preclinical · limited human observations', source: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12313605/',
  },
  tesamorelin: {
    formulation: 'Subcutaneous tesamorelin, as tested in the trial', duration: '26 weeks', effect: '−15.2% versus +5.0% placebo; difference in reported changes: −20.2 percentage points', design: 'Randomized placebo-controlled trial; 412 participants, 86% men',
    outcome: 'Visceral adipose tissue area', population: 'Adults with HIV-associated abdominal fat accumulation',
    finding: 'At 26 weeks, mean visceral fat area changed −15.2% with tesamorelin versus +5.0% with placebo in one randomized trial.',
    boundary: 'These group averages do not describe healthy adults or predict an individual response.',
    label: 'Randomized human trial · specific population', source: 'https://pubmed.ncbi.nlm.nih.gov/18057338/',
  },
  trt: {
    formulation: 'Testosterone replacement; formulation chosen within clinical care', duration: 'Ongoing assessment; not one fixed trial duration', effect: 'No single pooled effect size provided on this card', design: 'Endocrine Society clinical practice guideline',
    outcome: 'Testosterone deficiency', population: 'Men with symptoms and consistently low testosterone',
    finding: 'Guidelines support replacement for established hypogonadism, with assessment of symptoms, hormone levels and treatment response.',
    boundary: 'A general fat-loss goal is not equivalent to a diagnosis of testosterone deficiency.',
    label: 'Clinical guideline · defined indication', source: 'https://www.endocrine.org/clinical-practice-guidelines/testosterone-therapy',
  },
};
export function evidenceFor(therapy: {id: string; researchContext: string}): OutcomeEvidence {
  return reviewed[therapy.id] ?? {
    outcome: 'Outcome review pending', population: 'Check the population in each linked study',
    finding: therapy.researchContext,
    boundary: 'The linked literature has not yet been curated into an outcome-specific assessment. A mechanism or a component study does not establish a treatment benefit.',
    label: 'Research context · not outcome graded', source: '',
  };
}
