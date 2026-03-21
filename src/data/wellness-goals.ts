import { type Treatment } from "./treatments";

export interface WellnessGoal {
  slug: string;
  label: string;
  title: string;
  description: string;
  icon: string;
  matchTags: string[];
  matchOutcomes: string[];
  searchTriggers: string[];
  seoTitle: string;
  seoDescription: string;
  imageUrl: string;
}

export const WELLNESS_GOALS: WellnessGoal[] = [
  {
    slug: "sleep",
    label: "Sleep",
    title: "Best Treatments for Sleep",
    description:
      "Evidence-based treatments scored for improving sleep quality, reducing insomnia, and optimizing rest. Ranked by Kamura Score.",
    icon: "\u{1F319}",
    matchTags: ["Sleep"],
    matchOutcomes: [
      "Sleep Quality",
      "Sleep Improvement",
      "Insomnia Resolution",
      "Melatonin Regulation",
    ],
    searchTriggers: ["sleep", "insomnia", "rest", "sleep quality"],
    seoTitle: "Best Treatments for Sleep \u2014 Scored & Ranked",
    seoDescription:
      "Discover the highest-scoring treatments for sleep quality. Each treatment scored on research evidence, safety, and community data. Compare side by side.",
    imageUrl:
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=1920&q=80",
  },
  {
    slug: "energy",
    label: "Energy",
    title: "Best Treatments for Energy",
    description:
      "Treatments that boost vitality, mitochondrial function, and sustained energy throughout the day. Scored on evidence, not marketing.",
    icon: "\u26A1",
    matchTags: ["Energy", "Mitochondria"],
    matchOutcomes: [
      "Energy & Vitality",
      "Energy & Mood",
      "Energy & Mitochondrial",
      "Energy & Aging",
      "Mitochondrial Function",
    ],
    searchTriggers: ["energy", "fatigue", "vitality", "tired"],
    seoTitle: "Best Treatments for Energy \u2014 Scored & Ranked",
    seoDescription:
      "Find the top-scoring treatments for boosting energy. Research-backed ratings for vitality, mitochondrial support, and sustained energy.",
    imageUrl:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1920&q=80",
  },
  {
    slug: "stress",
    label: "Stress",
    title: "Best Treatments for Stress",
    description:
      "Proven approaches to stress resilience, cortisol management, and anxiety reduction. Each scored on real evidence and community outcomes.",
    icon: "\u{1F9D8}",
    matchTags: ["Stress", "Relaxation", "Anxiety", "Mental Health"],
    matchOutcomes: [
      "Stress Reduction",
      "Stress & Anxiety",
      "Anxiety Reduction",
      "Anxiety & Stress Reduction",
      "Relaxation & Stress",
      "Emotional Regulation",
    ],
    searchTriggers: [
      "stress",
      "anxiety",
      "cortisol",
      "calm",
      "relaxation",
    ],
    seoTitle: "Best Treatments for Stress \u2014 Scored & Ranked",
    seoDescription:
      "Top-rated treatments for stress relief and anxiety reduction. Evidence-based scores for cortisol management, relaxation, and mental resilience.",
    imageUrl:
      "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1920&q=80",
  },
  {
    slug: "longevity",
    label: "Longevity",
    title: "Best Treatments for Longevity",
    description:
      "Geroprotective therapies, anti-aging compounds, and longevity-focused protocols. Scored on lifespan research and biological age data.",
    icon: "\u{1F331}",
    matchTags: [
      "Longevity",
      "Anti-Aging",
      "Aging",
      "Geroprotective",
      "Senolytic",
      "Telomeres",
    ],
    matchOutcomes: [
      "Lifespan Extension",
      "Biological Age",
      "Biological Age Reversal",
      "Telomere Length",
      "Telomere Maintenance",
      "Longevity",
      "SIRT1 Activation",
      "Autophagy Activation",
      "Senescent Cell Clearance",
    ],
    searchTriggers: [
      "longevity",
      "anti-aging",
      "aging",
      "lifespan",
      "biological age",
    ],
    seoTitle: "Best Treatments for Longevity \u2014 Scored & Ranked",
    seoDescription:
      "The highest-scoring longevity treatments. Geroprotective therapies, senolytics, and anti-aging compounds ranked by Kamura Score.",
    imageUrl:
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1920&q=80",
  },
  {
    slug: "pain",
    label: "Pain",
    title: "Best Treatments for Pain",
    description:
      "Evidence-based approaches to chronic pain, inflammation, and recovery. Treatments ranked by effectiveness, safety, and community data.",
    icon: "\u{1FA79}",
    matchTags: ["Pain", "Pain Management", "Inflammation"],
    matchOutcomes: [
      "Pain Reduction",
      "Chronic Pain",
      "Pain Relief",
      "Pain Management",
      "Chronic Pain Reduction",
      "Low Back Pain",
      "Musculoskeletal Pain Relief",
    ],
    searchTriggers: [
      "pain",
      "chronic pain",
      "pain relief",
      "inflammation",
      "back pain",
    ],
    seoTitle: "Best Treatments for Pain \u2014 Scored & Ranked",
    seoDescription:
      "Discover the top-rated treatments for pain relief. Each scored on research evidence, safety profile, and community outcomes.",
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1920&q=80",
  },
  {
    slug: "weight-loss",
    label: "Weight Loss",
    title: "Best Treatments for Weight Loss",
    description:
      "Treatments for fat loss, body composition, and metabolic health. From GLP-1 peptides to fasting protocols, scored on real evidence.",
    icon: "\u{1F4AA}",
    matchTags: ["Weight Loss", "Fat Loss", "Body Composition", "Metabolic"],
    matchOutcomes: [
      "Weight Loss",
      "Fat Loss",
      "Body Composition",
      "Weight Management",
      "Visceral Fat Reduction",
      "Weight Loss Enhancement",
    ],
    searchTriggers: [
      "weight loss",
      "fat loss",
      "weight",
      "lose weight",
      "body fat",
    ],
    seoTitle: "Best Treatments for Weight Loss \u2014 Scored & Ranked",
    seoDescription:
      "Top-scoring weight loss and fat loss treatments. GLP-1 peptides, fasting, and metabolic therapies compared by Kamura Score.",
    imageUrl:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1920&q=80",
  },
  {
    slug: "brain",
    label: "Brain & Cognitive",
    title: "Best Treatments for Brain Health",
    description:
      "Nootropics, neuroprotective therapies, and cognitive enhancers. Scored on research evidence for memory, focus, and mental clarity.",
    icon: "\u{1F9E0}",
    matchTags: [
      "Brain",
      "Cognitive",
      "Brain Health",
      "Cognitive Enhancement",
      "Neuroprotection",
      "Neuroplasticity",
      "Focus",
    ],
    matchOutcomes: [
      "Cognitive Function",
      "Cognitive Enhancement",
      "Cognitive Performance",
      "Neuroprotection",
      "Brain Health",
    ],
    searchTriggers: [
      "brain",
      "cognitive",
      "focus",
      "memory",
      "mental clarity",
      "nootropic",
    ],
    seoTitle: "Best Treatments for Brain Health \u2014 Scored & Ranked",
    seoDescription:
      "Find the highest-scoring treatments for cognitive function. Nootropics, neuroprotective therapies, and brain health compounds ranked.",
    imageUrl:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1920&q=80",
  },
  {
    slug: "skin",
    label: "Skin",
    title: "Best Treatments for Skin",
    description:
      "Treatments for skin health, rejuvenation, and anti-aging. From red light therapy to peptides, scored on dermatological evidence.",
    icon: "\u2728",
    matchTags: ["Skin"],
    matchOutcomes: [
      "Skin Health",
      "Skin Rejuvenation",
      "Skin Brightening",
      "Skin Protection",
      "Anti-Aging Skin",
    ],
    searchTriggers: [
      "skin",
      "skin health",
      "skin rejuvenation",
      "skin care",
      "complexion",
    ],
    seoTitle: "Best Treatments for Skin Health \u2014 Scored & Ranked",
    seoDescription:
      "Top-rated treatments for skin health and rejuvenation. Evidence-based scores for skin brightening, anti-aging, and protection.",
    imageUrl:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1920&q=80",
  },
  {
    slug: "hair",
    label: "Hair",
    title: "Best Treatments for Hair",
    description:
      "Treatments for hair growth, restoration, and scalp health. Peptides, PRP, and supplements scored on clinical evidence.",
    icon: "\u{1F487}",
    matchTags: ["Hair", "Hair Restoration"],
    matchOutcomes: [
      "Hair Growth",
      "Hair Regrowth",
      "Hair Restoration",
      "Skin & Hair",
    ],
    searchTriggers: [
      "hair",
      "hair loss",
      "hair growth",
      "hair restoration",
      "balding",
    ],
    seoTitle: "Best Treatments for Hair Growth \u2014 Scored & Ranked",
    seoDescription:
      "Discover the best-scoring treatments for hair growth and restoration. PRP, peptides, and supplements ranked by Kamura Score.",
    imageUrl:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1920&q=80",
  },
  {
    slug: "gut-health",
    label: "Gut Health",
    title: "Best Treatments for Gut Health",
    description:
      "Gut healing, microbiome optimization, and digestive health treatments. Scored on gastroenterological research and community outcomes.",
    icon: "\u{1F33F}",
    matchTags: ["Gut", "Gut Health", "Digestion", "Microbiome", "IBS"],
    matchOutcomes: [
      "Gut Healing",
      "Digestive Health",
      "IBS Symptom",
      "Intestinal Barrier Repair",
      "Gut Inflammation",
      "Digestive Symptom Relief",
      "Microbiome Composition",
    ],
    searchTriggers: [
      "gut",
      "gut health",
      "digestion",
      "ibs",
      "microbiome",
      "leaky gut",
    ],
    seoTitle: "Best Treatments for Gut Health \u2014 Scored & Ranked",
    seoDescription:
      "Top-scoring treatments for gut health and digestion. From BPC-157 to microbiome protocols, ranked by evidence and safety.",
    imageUrl:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1920&q=80",
  },
  {
    slug: "immune",
    label: "Immune",
    title: "Best Treatments for Immune Health",
    description:
      "Immune-boosting treatments and protocols. From IV therapies to functional mushrooms, scored on immunological evidence.",
    icon: "\u{1F6E1}\uFE0F",
    matchTags: ["Immune", "Immunity"],
    matchOutcomes: [
      "Immune Function",
      "Immune Support",
      "Immune Modulation",
      "Immune Function Enhancement",
    ],
    searchTriggers: [
      "immune",
      "immunity",
      "immune system",
      "immune health",
    ],
    seoTitle: "Best Treatments for Immune Health \u2014 Scored & Ranked",
    seoDescription:
      "Discover the highest-scoring immune health treatments. IV therapies, functional mushrooms, and supplements ranked by evidence.",
    imageUrl:
      "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=1920&q=80",
  },
  {
    slug: "recovery",
    label: "Recovery",
    title: "Best Treatments for Recovery",
    description:
      "Athletic recovery, post-exercise repair, and physical restoration. Therapies scored on recovery evidence and community data.",
    icon: "\u{1F3CB}\uFE0F",
    matchTags: ["Recovery", "Sports Recovery", "Rehabilitation"],
    matchOutcomes: [
      "Recovery",
      "Athletic Recovery",
      "Exercise Recovery",
      "Post-Exercise Recovery",
      "Muscle Recovery",
      "Recovery & Pain",
      "Recovery & Soreness",
    ],
    searchTriggers: [
      "recovery",
      "sports recovery",
      "muscle recovery",
      "doms",
      "soreness",
    ],
    seoTitle: "Best Treatments for Recovery \u2014 Scored & Ranked",
    seoDescription:
      "Top-rated recovery treatments for athletes and active individuals. Cold plunge, contrast therapy, and peptides ranked by Kamura Score.",
    imageUrl:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80",
  },
  {
    slug: "anti-aging",
    label: "Anti-Aging",
    title: "Best Anti-Aging Treatments",
    description:
      "Rejuvenation therapies, cellular repair, and age-reversal protocols. Scored on geroscience research and biological markers.",
    icon: "\u{1F52C}",
    matchTags: ["Anti-Aging", "Rejuvenation", "Cellular Health"],
    matchOutcomes: [
      "Anti-Aging",
      "Cellular Repair",
      "Tissue Rejuvenation",
      "Anti-Aging Skin",
      "Cellular Aging",
    ],
    searchTriggers: [
      "anti-aging",
      "anti aging",
      "rejuvenation",
      "age reversal",
      "youthful",
    ],
    seoTitle: "Best Anti-Aging Treatments \u2014 Scored & Ranked",
    seoDescription:
      "The highest-scoring anti-aging treatments. Rejuvenation therapies, peptides, and cellular repair protocols ranked by evidence.",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80",
  },
  {
    slug: "joint-health",
    label: "Joint Health",
    title: "Best Treatments for Joint Health",
    description:
      "Joint repair, cartilage regeneration, and arthritis management. Treatments scored on orthopedic and regenerative evidence.",
    icon: "\u{1F9B4}",
    matchTags: ["Joint", "Joint Health", "Joints", "Musculoskeletal"],
    matchOutcomes: [
      "Joint Repair",
      "Joint & Cartilage",
      "Knee Osteoarthritis",
      "Joint Pain & Osteoarthritis",
    ],
    searchTriggers: [
      "joint",
      "joint pain",
      "arthritis",
      "knee pain",
      "cartilage",
    ],
    seoTitle: "Best Treatments for Joint Health \u2014 Scored & Ranked",
    seoDescription:
      "Discover top-scoring treatments for joint health. PRP, peptides, and regenerative therapies ranked by orthopedic evidence.",
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80",
  },
  {
    slug: "muscle",
    label: "Muscle & Performance",
    title: "Best Treatments for Muscle & Performance",
    description:
      "Strength, endurance, and athletic performance treatments. From creatine to EMS training, scored on sports science evidence.",
    icon: "\u{1F3C6}",
    matchTags: [
      "Muscle",
      "Performance",
      "Sports",
      "Sports Performance",
      "Strength",
      "Endurance",
    ],
    matchOutcomes: [
      "Muscle Strength",
      "Muscle Recovery",
      "Muscle Performance",
      "Muscular Endurance",
      "Strength Gains",
      "Sports Recovery",
    ],
    searchTriggers: [
      "muscle",
      "performance",
      "strength",
      "athletic",
      "endurance",
    ],
    seoTitle:
      "Best Treatments for Muscle & Performance \u2014 Scored & Ranked",
    seoDescription:
      "Top-scoring treatments for muscle growth and athletic performance. Creatine, EMS, and peptides ranked by sports science evidence.",
    imageUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1920&q=80",
  },
];

export function getGoalBySlug(slug: string): WellnessGoal | undefined {
  return WELLNESS_GOALS.find((g) => g.slug === slug);
}

export function getTreatmentsForGoal(
  goal: WellnessGoal,
  allTreatments: Treatment[]
): Treatment[] {
  return allTreatments
    .filter(
      (t) =>
        t.tags.some((tag) =>
          goal.matchTags.some(
            (mt) => tag.toLowerCase() === mt.toLowerCase()
          )
        ) ||
        t.outcomes.some((o) =>
          goal.matchOutcomes.some((mo) =>
            o.name.toLowerCase().includes(mo.toLowerCase())
          )
        )
    )
    .sort((a, b) => b.kamuraScore - a.kamuraScore);
}
