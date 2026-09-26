// Compounded medicines are mixed for an individual by a pharmacy. Unlike a
// manufactured medicine, they arrive with no patient information leaflet — no
// standard explanation of what the ingredient is, what the evidence supports,
// or what to ask before starting. These pages are that missing leaflet.
//
// Editorial rules for this file:
// - Describe what a preparation IS and what the evidence base looks like.
// - Never recommend a dose, a product, a pharmacy or a prescriber.
// - Say plainly when evidence is weak, indirect, or absent.
// - Every page must help someone ask better questions, not self-prescribe.

export type EvidenceStrength = 'Well established' | 'Reasonable' | 'Mixed' | 'Early' | 'Not established';

export interface CompoundedProduct {
  slug: string;
  name: string;
  category: string;
  /** How a person usually meets it — the words on their prescription or invoice. */
  alsoCalled: string[];
  /** One honest sentence — the verdict, in Kamura's voice. */
  verdict: string;
  whatItIs: string;
  whyCompounded: string;
  evidence: { strength: EvidenceStrength; summary: string };
  /** Who a clinician would genuinely consider it for. Not a recommendation. */
  consideredFor: string[];
  /** The honest counter-question. */
  doYouNeedIt: string;
  askYourPrescriber: string[];
  watchFor: string[];
  /** Links into the existing evidence-graded library where a match exists. */
  relatedTreatments?: { slug: string; label: string }[];
}

export const COMPOUNDED_PRODUCTS: CompoundedProduct[] = [
  {
    slug: 'bioidentical-hormone-creams',
    name: 'Bioidentical hormone creams (BHRT)',
    category: 'Hormones',
    alsoCalled: ['Bi-Est', 'Tri-Est', 'estradiol cream', 'estriol cream', 'E2 / E3', 'Topi-click', 'compounded HRT'],
    verdict:
      'The hormones themselves are real medicine with real evidence. What is not established is that a pharmacy-mixed, individually dosed version is better than the regulated product — and it is harder to dose accurately.',
    whatItIs:
      'A pharmacy mixes hormones — usually estradiol (E2), estriol (E3), progesterone or testosterone — into a cream, gel or pessary at a strength written for one person. "Bioidentical" means the molecule is structurally identical to the hormone your body makes. That is also true of several regulated, manufactured products, so the word describes the molecule, not the compounding.',
    whyCompounded:
      'Legitimate reasons exist: a strength that is not manufactured, an allergy to an excipient in the commercial product, a combination (such as estriol with estradiol) that is not sold ready-made, or a delivery form a person tolerates better. Less legitimate is compounding purely so a clinic can market a bespoke formula.',
    evidence: {
      strength: 'Mixed',
      summary:
        'Menopausal hormone therapy has a large, genuine evidence base for hot flushes, night sweats, vaginal symptoms and bone protection. That evidence comes almost entirely from standardised, manufactured products. Compounded versions have been studied far less; major menopause and endocrine societies have repeatedly noted that compounded hormones are not proven superior, are not routinely quality-tested batch to batch, and can vary in the dose actually delivered through skin. The hormone is evidenced; the compounding is not.',
    },
    consideredFor: [
      'Menopausal symptoms when a manufactured product is unsuitable — for example an allergy to an ingredient in it',
      'A strength or combination that is genuinely not available commercially',
      'Vaginal or genitourinary symptoms where a specific local preparation is wanted',
    ],
    doYouNeedIt:
      'Ask whether a regulated, manufactured hormone product would do the same job. For most people it would, with better dose consistency and clearer safety data. Compounding should be the answer to a specific problem with the commercial option — not the default starting point.',
    askYourPrescriber: [
      'Would a manufactured, regulated product work for me instead — and if not, exactly why?',
      'Which hormones and strengths are in this, and how was that dose chosen?',
      'How will we know it is working — symptoms, blood levels, or both?',
      'Is the pharmacy licensed for compounding, and does each batch get tested?',
      'If I have a uterus and am taking estrogen, what protects the lining of my womb?',
      'What is the plan to review this — when, and against what?',
    ],
    watchFor: [
      'Absorption through skin varies a lot between people, so the dose applied is not the dose delivered',
      'Saliva hormone testing is widely marketed alongside these creams and is not considered reliable for guiding dosing',
      'Estrogen without adequate progesterone protection, in someone with a uterus, raises endometrial risk',
      'Cream transferring to a partner or child through skin contact',
      'Claims that compounded hormones are "safer" or "natural" compared with regulated ones — that is marketing, not evidence',
    ],
    relatedTreatments: [
      { slug: 'bioidentical-estrogen', label: 'Bioidentical estrogen — evidence and score' },
      { slug: 'hormone-pellet-therapy', label: 'Hormone pellet therapy' },
      { slug: 'trt', label: 'Testosterone replacement' },
    ],
  },
  {
    slug: 'topical-nad',
    name: 'Topical NAD+',
    category: 'Longevity',
    alsoCalled: ['NAD+ cream', 'NAD topical', 'NAD+ skin serum'],
    verdict:
      'NAD+ biology is real and important inside cells. That a cream raises NAD+ in your tissues in a way that changes how you age is not established — the molecule is large and skin is built to keep things out.',
    whatItIs:
      'A pharmacy or cosmetic compounder puts nicotinamide adenine dinucleotide (NAD+), or a precursor such as nicotinamide riboside, into a cream or serum applied to skin.',
    whyCompounded:
      'There is no approved medicine here to compare against. These are made because there is consumer demand for NAD+ in every possible form, following genuine interest in NAD+ decline with age.',
    evidence: {
      strength: 'Early',
      summary:
        'NAD+ falling with age, and its role in energy metabolism and DNA repair, is well supported. Oral and intravenous routes have been studied in humans with mixed results. Topical delivery is the least studied of all: NAD+ is a comparatively large, charged molecule and the skin barrier restricts absorption. Note that plain nicotinamide (vitamin B3) in skincare does have reasonable evidence for skin barrier and pigmentation — it is a different, smaller molecule, and results from it should not be credited to NAD+.',
    },
    consideredFor: [
      'Cosmetic skin use, where expectations are set at skin appearance rather than systemic or anti-ageing effects',
    ],
    doYouNeedIt:
      'If the goal is skin quality, better-evidenced topicals exist — retinoids and niacinamide among them. If the goal is systemic NAD+, a skin cream is the least supported route available, and usually the most expensive per milligram.',
    askYourPrescriber: [
      'What is this expected to do — skin appearance, or something systemic?',
      'Is there evidence that it is absorbed at all through skin?',
      'How does this compare in cost and evidence with niacinamide or a retinoid?',
      'How long before we decide it is not working?',
    ],
    watchFor: [
      'Systemic anti-ageing claims made for a topical product',
      'Results from niacinamide research being presented as NAD+ evidence',
      'High price relative to better-studied skincare actives',
    ],
    relatedTreatments: [
      { slug: 'nad-injectable', label: 'NAD+ injectable — evidence and score' },
      { slug: 'nad-oral', label: 'Oral NAD+ precursors' },
      { slug: 'nad-iv-infusion', label: 'NAD+ IV infusion' },
    ],
  },
  {
    slug: 'compounded-peptides',
    name: 'Compounded peptide vials',
    category: 'Peptides',
    alsoCalled: ['BPC-157 vial', 'TB-500', 'CJC-1295 / ipamorelin', 'lyophilised peptide', 'research peptide'],
    verdict:
      'Most peptides sold this way have promising laboratory or animal data and little or no human trial evidence. The vial in your hand is usually an unapproved product, and its contents are only as good as the pharmacy that made it.',
    whatItIs:
      'A freeze-dried (lyophilised) powder in a small glass vial, reconstituted with bacteriostatic water and injected. Some peptides are genuinely approved medicines for specific conditions; many sold in wellness settings are not approved for human use anywhere.',
    whyCompounded:
      'Because for most of these there is no approved manufactured product to prescribe. That absence is itself information: it usually means the evidence needed for approval does not exist yet.',
    evidence: {
      strength: 'Early',
      summary:
        'This category is extremely uneven and should never be judged as a whole. A few members have real human trial evidence and regulatory approval for defined conditions — tesamorelin for HIV-associated lipodystrophy, for instance. Most of the popular ones, including BPC-157 and TB-500, rest on rodent and cell studies with almost no controlled human data. Kamura grades each one separately for exactly this reason.',
    },
    consideredFor: [
      'A specific approved indication, under a clinician who is treating that condition',
      'Understanding what a clinic has already prescribed you, before you continue it',
    ],
    doYouNeedIt:
      'Start by finding out which peptide it is and what evidence exists for that specific one — not for peptides in general. A category claim ("peptides help healing") tells you nothing about the vial you were given.',
    askYourPrescriber: [
      'Which exact peptide is this, at what concentration, and why this one for my problem?',
      'Is it approved for human use anywhere, and if not, what are we relying on instead?',
      'Which pharmacy compounded it, and can I see the certificate of analysis for this batch?',
      'How is it stored, and how long is it stable once reconstituted?',
      'What would tell us it is working, and when do we stop if it is not?',
      'What are the unknowns — including long-term ones nobody can answer yet?',
    ],
    watchFor: [
      'Vials labelled "for research use only" — that label means it was never assessed for use in people',
      'No certificate of analysis, or one produced by the seller rather than an independent lab',
      'Prices far below the real cost of peptide synthesis',
      'Evidence from animal studies being described as if it came from people',
      'Stacks of several peptides at once, which makes it impossible to tell what did what',
    ],
    relatedTreatments: [
      { slug: 'bpc-157', label: 'BPC-157 — evidence and score' },
      { slug: 'tesamorelin', label: 'Tesamorelin — an approved peptide' },
      { slug: 'cjc-1295-ipamorelin', label: 'CJC-1295 + ipamorelin' },
    ],
  },
  {
    slug: 'compounded-glp1',
    name: 'Compounded GLP-1 (semaglutide, tirzepatide)',
    category: 'Metabolic',
    alsoCalled: ['compounded semaglutide', 'compounded tirzepatide', 'weight-loss injection', 'generic Ozempic'],
    verdict:
      'The branded medicines have strong trial evidence. A compounded copy is a different product: same intended molecule, but without the manufacturer testing, the device, or the dose-accuracy guarantees behind that evidence.',
    whatItIs:
      'A pharmacy-prepared version of a GLP-1 receptor agonist, usually supplied in a vial with a separate syringe rather than a pre-filled pen. Some versions use salt forms of the molecule that were never in the clinical trials.',
    whyCompounded:
      'Almost always cost and availability. During shortages, compounded versions filled a gap. That is a supply argument, not a clinical one — and regulators in several countries have restricted it as supply recovered.',
    evidence: {
      strength: 'Well established',
      summary:
        'For the branded, manufactured medicines the evidence is genuinely strong: large randomised trials showing substantial weight loss and, for semaglutide, cardiovascular benefit. That evidence belongs to those specific products at those specific doses. It does not automatically transfer to a compounded copy, where concentration, salt form, sterility and stability are not verified by the original manufacturer. Dosing errors have been reported where people measure from a vial rather than dial a pen.',
    },
    consideredFor: [
      'Obesity or type 2 diabetes management, under medical supervision — normally with the approved product where it is available',
    ],
    doYouNeedIt:
      'If a GLP-1 is clinically appropriate for you, the first question is whether you can access the approved product. Compounded should be a considered fallback with eyes open, not an equivalent choice — and never a cosmetic one for someone without a metabolic indication.',
    askYourPrescriber: [
      'Is the approved branded product available to me, and what is the real difference in cost?',
      'Which exact molecule and salt form is in this, at what concentration?',
      'How do I measure my dose accurately from a vial, and can you watch me do it once?',
      'What side effects should stop me and prompt a call?',
      'What is the plan for monitoring, and for what happens when I stop?',
    ],
    watchFor: [
      'Measuring from a vial with an unfamiliar syringe — a leading source of accidental overdose',
      'Salt forms such as semaglutide acetate, which were not the trial molecule',
      'Sold without any medical assessment, or shipped from an unlicensed source',
      'Marketing to people with no metabolic indication at all',
    ],
    relatedTreatments: [
      { slug: 'semaglutide', label: 'Semaglutide — evidence and score' },
      { slug: 'tirzepatide', label: 'Tirzepatide — evidence and score' },
    ],
  },
  {
    slug: 'compounded-dermatology',
    name: 'Compounded skin preparations',
    category: 'Skin',
    alsoCalled: ['derma Rx', 'custom skin cream', 'compounded tretinoin', 'pigmentation blend', 'hair growth solution'],
    verdict:
      'This is the most reasonable use of compounding on this page. The individual actives are often well evidenced — but a custom blend of five of them has not been tested as a blend, and makes it hard to know what helped or what irritated.',
    whatItIs:
      'A pharmacy combines dermatology actives — tretinoin or other retinoids, hydroquinone, azelaic acid, niacinamide, minoxidil, sometimes a corticosteroid or antibiotic — into a single cream, gel or scalp solution at strengths chosen for one person.',
    whyCompounded:
      'Genuinely useful here: it reduces several steps to one, allows a strength between commercial products, and lets a prescriber remove an ingredient someone reacts to. Compounding for skin has a long and legitimate clinical history.',
    evidence: {
      strength: 'Reasonable',
      summary:
        'Individual actives are often strongly evidenced — tretinoin for photoageing and acne, minoxidil for pattern hair loss, azelaic acid for rosacea and pigmentation. The evidence is for those ingredients, generally studied alone at defined strengths. A bespoke combination inherits that plausibility but has not itself been trialled, and the more ingredients it contains, the harder it becomes to attribute either a benefit or a reaction.',
    },
    consideredFor: [
      'Simplifying a routine a dermatologist has already established for you',
      'A strength between the available commercial options',
      'Avoiding a specific ingredient you react to',
    ],
    doYouNeedIt:
      'Often yes, if a dermatologist is directing it. Be more cautious as the ingredient list grows — a blend of many actives is harder to troubleshoot, and some combinations are chemically unstable together.',
    askYourPrescriber: [
      'What is each ingredient for, and at what strength?',
      'Which single ingredient would we remove first if my skin reacts?',
      'How long is it stable, and does it need refrigeration or light protection?',
      'Is anything in here unsafe in pregnancy?',
      'When should we review whether it is still needed?',
    ],
    watchFor: [
      'Long ingredient lists that make a reaction impossible to trace',
      'Ongoing corticosteroid in a facial cream without a defined stop point',
      'Hydroquinone used continuously long-term without review',
      'Retinoids in pregnancy',
      'No expiry or storage instructions on the label',
    ],
    relatedTreatments: [
      { slug: 'retinoid-therapy', label: 'Retinoid therapy — evidence and score' },
      { slug: 'ghk-cu', label: 'GHK-Cu copper peptide' },
    ],
  },
];

export const getCompounded = (slug: string) => COMPOUNDED_PRODUCTS.find((p) => p.slug === slug);

export const EVIDENCE_TONE: Record<EvidenceStrength, string> = {
  'Well established': 'Strong human trial evidence for the medicine itself',
  Reasonable: 'Individual ingredients are well studied',
  Mixed: 'Real evidence for the hormone, not for the compounding',
  Early: 'Mostly laboratory or animal data so far',
  'Not established': 'No meaningful human evidence yet',
};
