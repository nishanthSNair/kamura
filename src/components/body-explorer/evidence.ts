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
