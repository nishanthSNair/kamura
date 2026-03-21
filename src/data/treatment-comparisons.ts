export interface PopularComparison {
  slug1: string;
  slug2: string;
  seoTitle: string;
  seoDescription: string;
}

export const POPULAR_COMPARISONS: PopularComparison[] = [
  {
    slug1: "nad-injectable",
    slug2: "nad-oral",
    seoTitle: "NAD+ Injectable vs NAD+ Oral \u2014 Which Is Better?",
    seoDescription:
      "Compare NAD+ injectable and oral supplementation side by side. Kamura Scores, bioavailability, evidence levels, outcomes, safety, and cost.",
  },
  {
    slug1: "cryotherapy",
    slug2: "cold-plunge",
    seoTitle: "Cryotherapy vs Cold Plunge \u2014 Full Comparison",
    seoDescription:
      "Compare whole-body cryotherapy and cold plunge therapy. Scores, recovery benefits, safety profiles, and cost compared.",
  },
  {
    slug1: "red-light-therapy",
    slug2: "infrared-sauna",
    seoTitle: "Red Light Therapy vs Infrared Sauna \u2014 Comparison",
    seoDescription:
      "Compare red light therapy and infrared sauna side by side. Evidence levels, outcomes, safety, and cost compared by Kamura Score.",
  },
  {
    slug1: "semaglutide",
    slug2: "tirzepatide",
    seoTitle: "Semaglutide vs Tirzepatide \u2014 GLP-1 Comparison",
    seoDescription:
      "Compare the two leading GLP-1 weight loss treatments. Efficacy, safety, side effects, and Kamura Scores side by side.",
  },
  {
    slug1: "bpc-157",
    slug2: "tb-500",
    seoTitle: "BPC-157 vs TB-500 \u2014 Peptide Comparison",
    seoDescription:
      "Compare BPC-157 and TB-500 healing peptides. Recovery outcomes, tissue repair evidence, safety, and cost compared.",
  },
  {
    slug1: "rapamycin",
    slug2: "metformin",
    seoTitle: "Rapamycin vs Metformin \u2014 Longevity Drug Comparison",
    seoDescription:
      "Compare the two most studied longevity pharmaceuticals. Lifespan evidence, mTOR vs AMPK pathways, safety profiles compared.",
  },
  {
    slug1: "trt",
    slug2: "dhea",
    seoTitle: "TRT vs DHEA \u2014 Hormone Comparison",
    seoDescription:
      "Compare testosterone replacement therapy and DHEA supplementation. Efficacy, side effects, and Kamura Scores compared.",
  },
  {
    slug1: "resveratrol",
    slug2: "spermidine",
    seoTitle: "Resveratrol vs Spermidine \u2014 Anti-Aging Comparison",
    seoDescription:
      "Compare two popular anti-aging supplements. SIRT1 vs autophagy pathways, evidence levels, and Kamura Scores side by side.",
  },
  {
    slug1: "coq10",
    slug2: "creatine",
    seoTitle: "CoQ10 vs Creatine \u2014 Supplement Comparison",
    seoDescription:
      "Compare CoQ10 and creatine supplements. Mitochondrial support, energy, performance, and evidence ratings compared.",
  },
  {
    slug1: "magnesium",
    slug2: "sleep-optimisation",
    seoTitle: "Magnesium vs Sleep Optimisation \u2014 Sleep Comparison",
    seoDescription:
      "Compare magnesium supplementation and comprehensive sleep optimisation. Sleep quality evidence, safety, and cost compared.",
  },
  {
    slug1: "hyperbaric-oxygen",
    slug2: "ozone-therapy",
    seoTitle: "HBOT vs Ozone Therapy \u2014 Oxygen Comparison",
    seoDescription:
      "Compare hyperbaric oxygen therapy and ozone therapy. Mechanisms, evidence for recovery and healing, Kamura Scores compared.",
  },
  {
    slug1: "acupuncture",
    slug2: "dry-cupping",
    seoTitle: "Acupuncture vs Cupping \u2014 Traditional Medicine Comparison",
    seoDescription:
      "Compare acupuncture and dry cupping. Pain relief evidence, safety profiles, and community outcomes side by side.",
  },
  {
    slug1: "yoga",
    slug2: "meditation",
    seoTitle: "Yoga vs Meditation \u2014 Mind-Body Comparison",
    seoDescription:
      "Compare yoga and meditation. Stress reduction, physical benefits, mental health evidence, and Kamura Scores compared.",
  },
  {
    slug1: "fasting",
    slug2: "berberine",
    seoTitle: "Intermittent Fasting vs Berberine \u2014 Metabolic Comparison",
    seoDescription:
      "Compare intermittent fasting and berberine. Blood sugar control, weight loss, longevity evidence compared by Kamura Score.",
  },
  {
    slug1: "glutathione-iv",
    slug2: "iv-drip-therapy",
    seoTitle: "Glutathione IV vs IV Drip Therapy \u2014 Infusion Comparison",
    seoDescription:
      "Compare targeted glutathione IV with general IV drip therapy. Antioxidant evidence, outcomes, and cost compared.",
  },
  {
    slug1: "stem-cell-therapy",
    slug2: "prp-therapy",
    seoTitle: "Stem Cell vs PRP Therapy \u2014 Regenerative Comparison",
    seoDescription:
      "Compare stem cell therapy and PRP. Regenerative outcomes, joint repair evidence, cost, and Kamura Scores side by side.",
  },
  {
    slug1: "stem-cell-therapy",
    slug2: "exosome-therapy",
    seoTitle: "Stem Cells vs Exosomes \u2014 Regenerative Comparison",
    seoDescription:
      "Compare stem cell therapy and exosome therapy. Regenerative mechanisms, evidence levels, and safety compared.",
  },
  {
    slug1: "functional-mushrooms",
    slug2: "astaxanthin",
    seoTitle:
      "Functional Mushrooms vs Astaxanthin \u2014 Supplement Comparison",
    seoDescription:
      "Compare functional mushrooms and astaxanthin. Immune support, antioxidant power, and evidence ratings compared.",
  },
  {
    slug1: "pemf-therapy",
    slug2: "red-light-therapy",
    seoTitle: "PEMF vs Red Light Therapy \u2014 Device Comparison",
    seoDescription:
      "Compare PEMF therapy and red light therapy devices. Pain relief, recovery, cellular benefits, and Kamura Scores compared.",
  },
  {
    slug1: "breathwork",
    slug2: "float-therapy",
    seoTitle: "Breathwork vs Float Therapy \u2014 Stress Relief Comparison",
    seoDescription:
      "Compare breathwork and sensory deprivation float therapy. Stress reduction, recovery, and community outcomes compared.",
  },
];

export function getPopularComparison(
  slug1: string,
  slug2: string
): PopularComparison | undefined {
  return POPULAR_COMPARISONS.find(
    (c) =>
      (c.slug1 === slug1 && c.slug2 === slug2) ||
      (c.slug1 === slug2 && c.slug2 === slug1)
  );
}
