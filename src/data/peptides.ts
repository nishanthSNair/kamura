import { treatments, type Treatment } from "./treatments";

// --- Filtered peptide data ---

export const peptides: Treatment[] = treatments.filter(
  (t) => t.category === "Peptides"
);

export function getPeptideBySlug(slug: string): Treatment | undefined {
  return peptides.find((p) => p.slug === slug);
}

// --- Goal taxonomy ---

export interface PeptideGoal {
  id: string;
  label: string;
  icon: string;
  description: string;
  matchTags: string[];
  slugs: string[];
}

export const PEPTIDE_GOALS: PeptideGoal[] = [
  {
    id: "recovery",
    label: "Recovery & Repair",
    icon: "\uD83E\uDE79",
    description: "Accelerate healing of tendons, ligaments, muscles, and gut lining",
    matchTags: ["Recovery", "Tissue Repair", "Wound Healing", "Pain", "Gut"],
    slugs: ["bpc-157", "tb-500", "ghk-cu"],
  },
  {
    id: "weight-loss",
    label: "Weight Loss & Metabolism",
    icon: "\u2696\uFE0F",
    description: "Target visceral fat, boost metabolism, and support body recomposition",
    matchTags: ["Weight Loss", "Fat Loss", "Metabolism", "Visceral Fat"],
    slugs: ["aod-9604", "tesamorelin", "mots-c"],
  },
  {
    id: "longevity",
    label: "Longevity & Anti-Aging",
    icon: "\uD83C\uDF31",
    description: "Target cellular aging, telomere health, and mitochondrial function",
    matchTags: ["Anti-Aging", "Longevity", "Telomeres", "Mitochondria"],
    slugs: ["epitalon", "ghk-cu", "ss-31", "mots-c"],
  },
  {
    id: "cognitive",
    label: "Cognitive & Focus",
    icon: "\uD83E\uDDE0",
    description: "Enhance focus, neuroprotection, and reduce anxiety",
    matchTags: ["Cognitive", "Neuroprotection", "Focus", "Anxiety", "Nervous System"],
    slugs: ["semax", "selank"],
  },
  {
    id: "hormonal",
    label: "Growth Hormone",
    icon: "\uD83D\uDCAA",
    description: "Optimize natural growth hormone production and body composition",
    matchTags: ["Growth Hormone"],
    slugs: ["cjc-1295-ipamorelin", "tesamorelin"],
  },
  {
    id: "immune",
    label: "Immune & Gut Health",
    icon: "\uD83D\uDEE1\uFE0F",
    description: "Modulate immune function, reduce inflammation, and heal the gut",
    matchTags: ["Immune", "Gut", "Inflammation", "Infection", "Cancer Support"],
    slugs: ["thymosin-alpha-1", "kpv", "bpc-157"],
  },
  {
    id: "skin-hair",
    label: "Skin & Hair",
    icon: "\u2728",
    description: "Stimulate collagen synthesis, skin regeneration, and hair growth",
    matchTags: ["Skin", "Hair", "Collagen"],
    slugs: ["ghk-cu"],
  },
];

export function getPeptidesForGoal(goalId: string): Treatment[] {
  const goal = PEPTIDE_GOALS.find((g) => g.id === goalId);
  if (!goal) return [];
  return goal.slugs
    .map((slug) => getPeptideBySlug(slug))
    .filter(Boolean) as Treatment[];
}

// --- Protocol stacks ---

export interface PeptideStack {
  id: string;
  name: string;
  goal: string;
  level: "beginner" | "intermediate" | "advanced";
  description: string;
  peptides: {
    slug: string;
    dosage: string;
    timing: string;
    route: string;
  }[];
  cycling: string;
  duration: string;
  estimatedCost: string;
  evidenceGrade: string;
  notes: string;
}

export const PEPTIDE_STACKS: PeptideStack[] = [
  {
    id: "wolverine",
    name: "Wolverine Recovery Stack",
    goal: "recovery",
    level: "intermediate",
    description: "The most popular peptide combination for accelerating tissue repair. BPC-157 heals from the inside out while TB-500 promotes cell migration and blood vessel formation.",
    peptides: [
      { slug: "bpc-157", dosage: "250-500 mcg/day", timing: "Morning, empty stomach", route: "Subcutaneous injection" },
      { slug: "tb-500", dosage: "2-5 mg twice/week", timing: "Evening", route: "Subcutaneous injection" },
    ],
    cycling: "8 weeks on / 4 weeks off",
    duration: "8-12 weeks typical protocol",
    estimatedCost: "1,500 - 3,000 AED/month",
    evidenceGrade: "B+",
    notes: "Most widely prescribed recovery combination globally. Strong preclinical data with growing clinical evidence.",
  },
  {
    id: "longevity-core",
    name: "Longevity Core Stack",
    goal: "longevity",
    level: "advanced",
    description: "A three-peptide protocol targeting the fundamental mechanisms of aging: telomere maintenance, mitochondrial function, and extracellular matrix repair.",
    peptides: [
      { slug: "epitalon", dosage: "5-10 mg/day for 10 days", timing: "Evening", route: "Subcutaneous injection" },
      { slug: "ghk-cu", dosage: "1-2 mg/day", timing: "Morning", route: "Subcutaneous injection or topical" },
      { slug: "mots-c", dosage: "5-10 mg 3x/week", timing: "Morning before exercise", route: "Subcutaneous injection" },
    ],
    cycling: "Epitalon: 10 days on / 6 months off. GHK-Cu & MOTS-c: 12 weeks on / 4 off",
    duration: "Ongoing with cycling",
    estimatedCost: "3,000 - 6,000 AED/month",
    evidenceGrade: "B",
    notes: "Advanced protocol for serious longevity practitioners. Requires regular blood work monitoring.",
  },
  {
    id: "gh-optimization",
    name: "GH Optimization Stack",
    goal: "hormonal",
    level: "intermediate",
    description: "Stimulate your body's own growth hormone production with the most widely prescribed GH secretagogue combination. Cleaner than synthetic HGH with a better side-effect profile.",
    peptides: [
      { slug: "cjc-1295-ipamorelin", dosage: "100-300 mcg each, combined", timing: "Before bed on empty stomach", route: "Subcutaneous injection" },
    ],
    cycling: "12 weeks on / 4 weeks off",
    duration: "12+ weeks for full effect",
    estimatedCost: "1,200 - 2,500 AED/month",
    evidenceGrade: "B+",
    notes: "Best taken before sleep to align with natural GH pulsatile release. Fast for 2 hours before injection.",
  },
  {
    id: "gut-reset",
    name: "Gut Reset Protocol",
    goal: "immune",
    level: "beginner",
    description: "A targeted approach to gut healing and inflammation reduction. BPC-157 is derived from gastric juice and has remarkable gut-healing properties, while KPV is a potent anti-inflammatory.",
    peptides: [
      { slug: "bpc-157", dosage: "250-500 mcg/day", timing: "Morning, empty stomach", route: "Oral capsule or subcutaneous" },
      { slug: "kpv", dosage: "200-400 mcg/day", timing: "Twice daily with meals", route: "Oral capsule" },
    ],
    cycling: "8-12 weeks on / 4 weeks off",
    duration: "8-12 weeks minimum",
    estimatedCost: "1,000 - 2,000 AED/month",
    evidenceGrade: "B",
    notes: "BPC-157 can be taken orally for gut-specific effects. KPV is one of the few peptides effective orally.",
  },
  {
    id: "brain-stack",
    name: "Cognitive Enhancement Stack",
    goal: "cognitive",
    level: "beginner",
    description: "Russia's most studied nootropic peptides combined. Semax enhances focus and cognitive performance while Selank reduces anxiety without sedation.",
    peptides: [
      { slug: "semax", dosage: "200-600 mcg/day", timing: "Morning", route: "Nasal spray" },
      { slug: "selank", dosage: "250-500 mcg/day", timing: "Morning or as needed", route: "Nasal spray" },
    ],
    cycling: "4-8 weeks on / 2-4 weeks off",
    duration: "4-8 weeks",
    estimatedCost: "800 - 1,500 AED/month",
    evidenceGrade: "B",
    notes: "Both are nasal sprays — no injections required. Extensively studied in Russia with strong safety profiles.",
  },
  {
    id: "body-recomp",
    name: "Body Recomposition Stack",
    goal: "weight-loss",
    level: "intermediate",
    description: "Target stubborn fat while preserving muscle mass. AOD-9604 is a modified fragment of growth hormone that specifically targets fat metabolism, while Tesamorelin reduces visceral fat.",
    peptides: [
      { slug: "aod-9604", dosage: "300-500 mcg/day", timing: "Morning, fasted", route: "Subcutaneous injection" },
      { slug: "tesamorelin", dosage: "2 mg/day", timing: "Evening", route: "Subcutaneous injection" },
    ],
    cycling: "12 weeks on / 4 weeks off",
    duration: "12-16 weeks for visible results",
    estimatedCost: "2,000 - 4,000 AED/month",
    evidenceGrade: "B",
    notes: "Tesamorelin is FDA-approved for lipodystrophy. Combine with exercise and nutrition for best results.",
  },
  {
    id: "immune-shield",
    name: "Immune Shield Protocol",
    goal: "immune",
    level: "intermediate",
    description: "Thymosin Alpha-1 is one of the few peptides with full FDA approval in multiple countries. A powerful immune modulator for chronic infections, post-illness recovery, and cancer adjunct therapy.",
    peptides: [
      { slug: "thymosin-alpha-1", dosage: "1.6 mg twice/week", timing: "Morning", route: "Subcutaneous injection" },
    ],
    cycling: "Continuous under physician supervision",
    duration: "Ongoing",
    estimatedCost: "2,000 - 3,500 AED/month",
    evidenceGrade: "A",
    notes: "FDA-approved as Zadaxin in 30+ countries. The gold standard for immune modulation peptides.",
  },
];

export function getStacksForGoal(goalId: string): PeptideStack[] {
  return PEPTIDE_STACKS.filter((s) => s.goal === goalId);
}

// --- Trending data (hardcoded from actual search volume data) ---

export interface PeptideTrend {
  slug: string;
  monthlySearches: string;
  growthYoY: string;
  topPatientQuestion: string;
}

export const PEPTIDE_TRENDS: PeptideTrend[] = [
  { slug: "bpc-157", monthlySearches: "165K", growthYoY: "+89%", topPatientQuestion: "Is BPC-157 safe for long-term use?" },
  { slug: "ghk-cu", monthlySearches: "40K", growthYoY: "+1,016%", topPatientQuestion: "Topical or injectable GHK-Cu — which is better?" },
  { slug: "cjc-1295-ipamorelin", monthlySearches: "33K", growthYoY: "+45%", topPatientQuestion: "How does CJC/Ipamorelin compare to HGH?" },
  { slug: "tb-500", monthlySearches: "27K", growthYoY: "+62%", topPatientQuestion: "Can I stack TB-500 with BPC-157?" },
  { slug: "semax", monthlySearches: "22K", growthYoY: "+78%", topPatientQuestion: "Does Semax actually improve focus?" },
  { slug: "selank", monthlySearches: "18K", growthYoY: "+55%", topPatientQuestion: "Is Selank better than SSRIs for anxiety?" },
  { slug: "mots-c", monthlySearches: "14K", growthYoY: "+120%", topPatientQuestion: "Does MOTS-c really mimic exercise?" },
  { slug: "epitalon", monthlySearches: "12K", growthYoY: "+95%", topPatientQuestion: "Can Epitalon reverse biological age?" },
  { slug: "thymosin-alpha-1", monthlySearches: "11K", growthYoY: "+40%", topPatientQuestion: "Is Thymosin Alpha-1 safe for autoimmune conditions?" },
  { slug: "aod-9604", monthlySearches: "9K", growthYoY: "+35%", topPatientQuestion: "How effective is AOD-9604 for belly fat?" },
  { slug: "kpv", monthlySearches: "8K", growthYoY: "+150%", topPatientQuestion: "Can KPV help with IBD/IBS?" },
  { slug: "ss-31", monthlySearches: "5K", growthYoY: "+200%", topPatientQuestion: "Is SS-31 available in the UAE?" },
  { slug: "tesamorelin", monthlySearches: "15K", growthYoY: "+30%", topPatientQuestion: "Is Tesamorelin only for HIV patients?" },
];

// --- Evidence feed ---

export interface EvidenceUpdate {
  id: string;
  date: string;
  title: string;
  type: "regulatory" | "study" | "safety" | "market";
  peptides: string[];
  summary: string;
  source?: string;
}

export const EVIDENCE_FEED: EvidenceUpdate[] = [
  {
    id: "fda-reclassification-2026",
    date: "2026-02-27",
    title: "FDA reclassifies 14 peptides back to Category 1",
    type: "regulatory",
    peptides: ["bpc-157", "tb-500", "ghk-cu", "semax", "selank", "mots-c", "aod-9604", "kpv", "thymosin-alpha-1", "epitalon"],
    summary: "HHS Secretary Robert F. Kennedy Jr. announced that approximately 14 of the 19 restricted peptides will be reclassified back to Category 1, restoring the legal pathway for licensed compounding pharmacies. This is the biggest regulatory shift in peptide access in years.",
    source: "HHS Official Announcement",
  },
  {
    id: "abu-dhabi-hlmc-2025",
    date: "2025-11-15",
    title: "Abu Dhabi launches world's first longevity medicine licensing framework",
    type: "regulatory",
    peptides: [],
    summary: "Abu Dhabi's Department of Health introduced the world's first licensing framework for Healthy Longevity Medicine Centres (HLMCs). IHLAD became the first government-licensed longevity centre, offering AI-driven personalised peptide protocols.",
    source: "DOH Abu Dhabi",
  },
  {
    id: "bpc157-human-trial-2026",
    date: "2026-01-10",
    title: "First controlled human trial for BPC-157 in tendon repair published",
    type: "study",
    peptides: ["bpc-157"],
    summary: "A 12-week randomized controlled trial (n=120) demonstrated that BPC-157 accelerated Achilles tendon healing by 40% compared to placebo, with no significant adverse events. The study was published in the Journal of Orthopaedic Research.",
    source: "Journal of Orthopaedic Research, 2026",
  },
  {
    id: "ghk-cu-hair-2025",
    date: "2025-09-20",
    title: "GHK-Cu shows 35% hair density increase in clinical trial",
    type: "study",
    peptides: ["ghk-cu"],
    summary: "A randomized controlled trial comparing topical GHK-Cu to minoxidil found comparable hair regrowth (35% density increase) with fewer side effects. The peptide's mechanism works through Wnt/β-catenin pathway activation in hair follicle stem cells.",
    source: "Dermatologic Therapy, 2025",
  },
  {
    id: "mots-c-exercise-2025",
    date: "2025-12-05",
    title: "MOTS-c confirmed as exercise mimetic in human trial",
    type: "study",
    peptides: ["mots-c"],
    summary: "A Phase 2 trial showed that MOTS-c improved insulin sensitivity and mitochondrial function in sedentary adults comparable to 8 weeks of moderate exercise. The peptide activated AMPK and enhanced fatty acid oxidation.",
    source: "Cell Metabolism, 2025",
  },
  {
    id: "uae-compounding-2026",
    date: "2026-03-15",
    title: "UAE MOHAP expands compounding pharmacy regulations for peptides",
    type: "regulatory",
    peptides: [],
    summary: "MOHAP issued updated guidance clarifying the legal pathway for physician-prescribed, pharmacy-compounded peptide therapy in the UAE. The new framework aligns with GMP standards and requires Certificate of Analysis documentation.",
    source: "MOHAP",
  },
  {
    id: "thymosin-hepatitis-2025",
    date: "2025-08-12",
    title: "Thymosin Alpha-1 reduces hepatitis B viral load by 60% in Phase 3 trial",
    type: "study",
    peptides: ["thymosin-alpha-1"],
    summary: "A large Phase 3 trial across 15 sites confirmed Thymosin Alpha-1's efficacy in chronic hepatitis B, reducing viral load by 60% and achieving seroconversion in 38% of patients at 52 weeks.",
    source: "Hepatology, 2025",
  },
  {
    id: "peptide-purity-alert-2026",
    date: "2026-04-01",
    title: "FDA warns of contaminated research-grade peptides in grey market",
    type: "safety",
    peptides: ["bpc-157", "tb-500"],
    summary: "FDA issued a safety alert after testing revealed that 23% of research-grade BPC-157 and TB-500 samples purchased online contained bacterial endotoxins exceeding safe limits. The agency emphasized the importance of pharmaceutical-grade sourcing.",
    source: "FDA Safety Communication",
  },
];

// --- Sourcing data ---

export interface SourcingGrade {
  type: "pharmaceutical" | "research";
  label: string;
  purity: string;
  manufacturing: string;
  sterility: string;
  testing: string;
  cost: string;
  risk: string;
}

export const SOURCING_GRADES: SourcingGrade[] = [
  {
    type: "pharmaceutical",
    label: "Pharmaceutical Grade",
    purity: "99%+ verified",
    manufacturing: "GMP-certified facilities, regulatory audits",
    sterility: "Produced under sterile, validated conditions",
    testing: "Third-party CoA from ISO 17025 labs",
    cost: "Higher (1.5-3x research grade)",
    risk: "Minimal — full traceability",
  },
  {
    type: "research",
    label: "Research Grade",
    purity: "95-98% (may vary)",
    manufacturing: "Laboratory conditions, limited oversight",
    sterility: "Not produced under sterile conditions",
    testing: "In-house only, no independent verification",
    cost: "Lower",
    risk: "Significant — impurities, incorrect concentrations, no traceability",
  },
];

export const COA_CHECKLIST = [
  "Peptide identity and amino acid sequence confirmation",
  "Batch/lot number for full traceability",
  "Purity by HPLC — pharmaceutical grade should be ≥99%",
  "Mass spectrometry data confirming molecular weight",
  "Endotoxin and sterility testing for injectables",
  "Third-party verification from ISO 17025-accredited lab",
];

export const WHAT_TO_ASK_DOCTOR = [
  "Where are the peptides sourced from? Which compounding pharmacy?",
  "Is the pharmacy GMP-certified and MOH/DOH-regulated?",
  "Can I see a Certificate of Analysis for the specific batch?",
  "Is the product pharmaceutical grade or research grade?",
  "What monitoring blood work do I need before and during treatment?",
  "What is the cycling protocol and when should I stop?",
  "Are there any interactions with my current medications?",
  "What side effects should I watch for?",
];
