import type { TreatmentCategory } from "./treatments";

export interface CategoryMeta {
  slug: string;
  name: TreatmentCategory;
  shortLabel: string;
  icon: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  imageUrl: string;
}

export const CATEGORY_META: CategoryMeta[] = [
  {
    slug: "peptides",
    name: "Peptides",
    shortLabel: "Peptides",
    icon: "\u{1F9EC}",
    description: "Short-chain amino acids used for tissue repair, growth hormone release, gut healing, and anti-aging. Includes BPC-157, GHK-Cu, TB-500, and more.",
    seoTitle: "Peptide Therapies — Scored & Ranked",
    seoDescription: "Explore all peptide treatments scored on research evidence, safety, community experience, and accessibility. BPC-157, GHK-Cu, TB-500, CJC-1295, and more.",
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1920&q=80",
  },
  {
    slug: "supplements-nutraceuticals",
    name: "Supplements & Nutraceuticals",
    shortLabel: "Supplements",
    icon: "\u{1F33F}",
    description: "Vitamins, minerals, botanical extracts, and nutraceutical compounds with clinical evidence for longevity, energy, cognition, and metabolic health.",
    seoTitle: "Supplements & Nutraceuticals — Scored & Ranked",
    seoDescription: "Browse all supplement and nutraceutical treatments scored on evidence, safety, and real-world results. NAD+, NMN, Omega-3, Magnesium, CoQ10, and more.",
    imageUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1920&q=80",
  },
  {
    slug: "devices-technology",
    name: "Devices & Technology",
    shortLabel: "Devices",
    icon: "\u{1F52C}",
    description: "Medical devices and technology-driven therapies including red light therapy, HBOT, cryotherapy, PEMF, infrared saunas, and neurofeedback.",
    seoTitle: "Devices & Technology Treatments — Scored & Ranked",
    seoDescription: "Explore device-based wellness treatments scored on clinical evidence and safety. Red light therapy, HBOT, cryotherapy, infrared sauna, PEMF, and more.",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80",
  },
  {
    slug: "traditional-alternative-medicine",
    name: "Traditional & Alternative Medicine",
    shortLabel: "Traditional",
    icon: "\u{1FA79}",
    description: "Time-tested healing traditions from around the world including acupuncture, Ayurveda, hijama (wet cupping), dry cupping, reflexology, and traditional Chinese medicine.",
    seoTitle: "Traditional & Alternative Medicine — Scored & Ranked",
    seoDescription: "Explore traditional medicine treatments scored on research evidence and community experience. Acupuncture, hijama, Ayurveda, cupping, and more.",
    imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80",
  },
  {
    slug: "mind-body-movement",
    name: "Mind-Body & Movement",
    shortLabel: "Mind-Body",
    icon: "\u{1F9D8}",
    description: "Practices that integrate mental focus, breathwork, and physical movement for holistic wellness. Includes meditation, yoga, breathwork, sound healing, and fasting.",
    seoTitle: "Mind-Body & Movement Therapies — Scored & Ranked",
    seoDescription: "Explore mind-body wellness practices scored on evidence and community validation. Meditation, yoga, breathwork, sound healing, fasting, and more.",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1920&q=80",
  },
  {
    slug: "hormones",
    name: "Hormones",
    shortLabel: "Hormones",
    icon: "\u{26A1}",
    description: "Hormone replacement and optimization therapies including testosterone, thyroid, DHEA, growth hormone, and pregnenolone for anti-aging and metabolic health.",
    seoTitle: "Hormone Therapies — Scored & Ranked",
    seoDescription: "Explore hormone optimization treatments scored on clinical evidence and safety. TRT, thyroid, DHEA, growth hormone, and more.",
    imageUrl: "https://images.unsplash.com/photo-1579165466949-3180a3d056d5?w=1920&q=80",
  },
  {
    slug: "glp1-weight-management",
    name: "GLP-1 & Weight Management",
    shortLabel: "GLP-1",
    icon: "\u{1F48A}",
    description: "GLP-1 receptor agonists and metabolic therapies for weight management, metabolic health, and appetite regulation. Includes semaglutide, tirzepatide, and related compounds.",
    seoTitle: "GLP-1 & Weight Management — Scored & Ranked",
    seoDescription: "Explore GLP-1 and weight management treatments scored on evidence, safety, and real-world results. Semaglutide, tirzepatide, and more.",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80",
  },
  {
    slug: "iv-infusion-therapies",
    name: "IV & Infusion Therapies",
    shortLabel: "IV Therapy",
    icon: "\u{1F489}",
    description: "Intravenous vitamin drips, NAD+ infusions, glutathione IVs, chelation therapy, and other infusion-based wellness treatments for rapid nutrient delivery.",
    seoTitle: "IV & Infusion Therapies — Scored & Ranked",
    seoDescription: "Explore IV therapy treatments scored on research evidence and safety. NAD+ infusions, glutathione IV, vitamin drips, chelation, and more.",
    imageUrl: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=1920&q=80",
  },
  {
    slug: "regenerative-medicine",
    name: "Regenerative Medicine",
    shortLabel: "Regenerative",
    icon: "\u{1FA78}",
    description: "Cutting-edge regenerative therapies including stem cell therapy, PRP (platelet-rich plasma), exosome therapy, and prolotherapy for tissue repair and rejuvenation.",
    seoTitle: "Regenerative Medicine — Scored & Ranked",
    seoDescription: "Explore regenerative medicine treatments scored on clinical evidence. Stem cells, PRP therapy, exosomes, prolotherapy, and more.",
    imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1920&q=80",
  },
  {
    slug: "longevity-pharmaceuticals",
    name: "Longevity Pharmaceuticals",
    shortLabel: "Pharma",
    icon: "\u{2697}",
    description: "Pharmaceutical compounds studied for longevity and anti-aging effects. Includes rapamycin (mTOR inhibitor), metformin, and other geroprotective drugs with clinical research.",
    seoTitle: "Longevity Pharmaceuticals — Scored & Ranked",
    seoDescription: "Explore longevity pharmaceutical treatments scored on research evidence. Rapamycin, metformin (off-label), and other anti-aging compounds.",
    imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1920&q=80",
  },
  {
    slug: "detox-functional",
    name: "Detox & Functional",
    shortLabel: "Detox",
    icon: "\u{1F343}",
    description: "Detoxification protocols and functional medicine treatments including liver cleanses, coffee enemas, colon hydrotherapy, and heavy metal detox programs.",
    seoTitle: "Detox & Functional Treatments — Scored & Ranked",
    seoDescription: "Explore detox and functional medicine treatments scored on evidence and safety. Liver cleanse, coffee enema, colon hydrotherapy, and more.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
  },
  {
    slug: "exercise-fitness",
    name: "Exercise & Fitness",
    shortLabel: "Exercise",
    icon: "\u{1F3CB}",
    description: "Evidence-based exercise modalities for longevity, strength, cardiovascular health, and metabolic optimization. Includes Zone 2 training, HIIT, resistance training, and more.",
    seoTitle: "Exercise & Fitness Treatments — Scored & Ranked",
    seoDescription: "Explore exercise and fitness modalities scored on longevity research and health outcomes. Zone 2 cardio, HIIT, resistance training, walking, and more.",
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80",
  },
];

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return CATEGORY_META.find((c) => c.slug === slug);
}

export function getCategoryByName(name: TreatmentCategory): CategoryMeta | undefined {
  return CATEGORY_META.find((c) => c.name === name);
}

export function categoryNameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
