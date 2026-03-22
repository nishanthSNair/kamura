export type BodyZone = "brain" | "heart" | "lungs" | "gut" | "muscles" | "fullBody";

export interface WellnessConcern {
  id: string;
  label: string;
  zone: BodyZone;
  icon: string;
  matchTags: string[];
  matchOutcomes: string[];
}

export interface ZoneConfig {
  zone: BodyZone;
  label: string;
  icon: string;
  description: string;
  followUpQuestion: string;
  concerns: WellnessConcern[];
}

export type ConcernDuration = "weeks" | "months" | "years";

export const DURATION_OPTIONS: { value: ConcernDuration; label: string }[] = [
  { value: "weeks", label: "Recent (weeks)" },
  { value: "months", label: "A few months" },
  { value: "years", label: "Ongoing (years)" },
];

export const ZONES: ZoneConfig[] = [
  {
    zone: "brain",
    label: "Brain & Mind",
    icon: "\u{1F9E0}",
    description: "Focus, memory, mood & cognitive wellness",
    followUpQuestion: "How long have you noticed these cognitive concerns?",
    concerns: [
      {
        id: "brain-fog",
        label: "Brain fog",
        zone: "brain",
        icon: "\u{1F32B}\uFE0F",
        matchTags: ["Cognitive", "Brain", "Brain Health", "Focus", "Cognitive Enhancement", "Neuroprotection"],
        matchOutcomes: ["Cognitive Function", "Cognitive Enhancement", "Cognitive Performance & Memory", "Brain Health", "Neuroprotection"],
      },
      {
        id: "poor-focus",
        label: "Poor focus",
        zone: "brain",
        icon: "\u{1F3AF}",
        matchTags: ["Focus", "Cognitive", "Cognitive Enhancement", "Cognitive Health"],
        matchOutcomes: ["Cognitive Function", "Cognitive Enhancement", "ADHD Symptom Improvement", "Cognitive Performance & Memory"],
      },
      {
        id: "memory-decline",
        label: "Memory issues",
        zone: "brain",
        icon: "\u{1F4AD}",
        matchTags: ["Cognitive", "Brain Health", "Neuroprotection", "Neuroplasticity"],
        matchOutcomes: ["Cognitive Function", "Neuroprotection", "Brain Health", "Cognitive Performance & Memory", "Cognitive Function (Lion's Mane)"],
      },
      {
        id: "anxiety",
        label: "Anxiety & worry",
        zone: "brain",
        icon: "\u{1F61F}",
        matchTags: ["Anxiety", "Stress", "Mental Health", "Nervous System", "Relaxation"],
        matchOutcomes: ["Anxiety Reduction", "Anxiety & Stress Reduction", "Anxiety & OCD Symptom Reduction", "Stress Reduction", "Stress & Anxiety"],
      },
      {
        id: "low-mood",
        label: "Low mood",
        zone: "brain",
        icon: "\u2601\uFE0F",
        matchTags: ["Mental Health", "Mood", "Depression", "Stress"],
        matchOutcomes: ["Energy & Mood", "Emotional Regulation", "Mild-to-Moderate Depression (St John's Wort)", "Treatment-Resistant Depression", "Stress & Mood Regulation"],
      },
      {
        id: "low-motivation",
        label: "Low motivation",
        zone: "brain",
        icon: "\u{1F50B}",
        matchTags: ["Energy", "Cognitive", "Mental Resilience", "Adaptogen"],
        matchOutcomes: ["Energy & Vitality", "Energy & Mood", "Cognitive Enhancement", "Norepinephrine Boost"],
      },
    ],
  },
  {
    zone: "heart",
    label: "Heart & Stress",
    icon: "\u2764\uFE0F",
    description: "Stress resilience, cardiovascular health & emotional balance",
    followUpQuestion: "How would you describe your stress levels lately?",
    concerns: [
      {
        id: "chronic-stress",
        label: "Chronic stress",
        zone: "heart",
        icon: "\u{1F624}",
        matchTags: ["Stress", "Relaxation", "Mental Health", "Adaptogen", "Adrenal"],
        matchOutcomes: ["Stress Reduction", "Stress & Anxiety", "Stress & Mood Regulation", "Relaxation & Stress", "Inflammation / Cortisol"],
      },
      {
        id: "poor-hrv",
        label: "Low HRV / recovery",
        zone: "heart",
        icon: "\u{1F4C9}",
        matchTags: ["HRV", "Recovery", "Cardiovascular", "Heart Health"],
        matchOutcomes: ["HRV Improvement", "Heart Rate Variability Improvement", "Recovery", "Cardiovascular Health"],
      },
      {
        id: "blood-pressure",
        label: "Blood pressure concerns",
        zone: "heart",
        icon: "\u{1FA7A}",
        matchTags: ["Cardiovascular", "Blood Pressure", "Heart Health", "Blood"],
        matchOutcomes: ["Blood Pressure Reduction", "Cardiovascular Health", "Cardiovascular Protection", "Cardiovascular & Circulatory Benefits"],
      },
      {
        id: "emotional-regulation",
        label: "Emotional ups & downs",
        zone: "heart",
        icon: "\u{1F3AD}",
        matchTags: ["Stress", "Mental Health", "Anxiety", "Mindfulness", "Mind-Body"],
        matchOutcomes: ["Emotional Regulation", "Stress & Mood Regulation", "Autonomic Nervous System Regulation", "PTSD & Trauma Symptom Reduction"],
      },
      {
        id: "burnout",
        label: "Burnout & fatigue",
        zone: "heart",
        icon: "\u{1F525}",
        matchTags: ["Energy", "Stress", "Adaptogen", "Adrenal", "Recovery"],
        matchOutcomes: ["Energy & Vitality", "Stress Reduction", "Adrenal Support", "Energy & Mood"],
      },
    ],
  },
  {
    zone: "lungs",
    label: "Lungs & Breath",
    icon: "\u{1FAC1}",
    description: "Respiratory health, oxygen efficiency & recovery capacity",
    followUpQuestion: "Is this related to exercise performance or general wellness?",
    concerns: [
      {
        id: "low-endurance",
        label: "Low endurance",
        zone: "lungs",
        icon: "\u{1F3C3}",
        matchTags: ["Endurance", "Cardio", "VO2 Max", "Performance", "Oxygen"],
        matchOutcomes: ["Aerobic Capacity (VO2 Max)", "Muscular Endurance & Strength", "Respiratory Function"],
      },
      {
        id: "poor-recovery",
        label: "Slow exercise recovery",
        zone: "lungs",
        icon: "\u23F1\uFE0F",
        matchTags: ["Recovery", "Sports Recovery", "Oxygen", "Rehabilitation"],
        matchOutcomes: ["Post-Exercise Recovery", "Athletic Recovery", "Exercise Recovery & DOMS Reduction", "Recovery & Soreness", "Sports Recovery (DOMS)"],
      },
      {
        id: "breathing-issues",
        label: "Breathing quality",
        zone: "lungs",
        icon: "\u{1F4A8}",
        matchTags: ["Respiratory", "Oxygen", "Mind-Body"],
        matchOutcomes: ["Respiratory Function", "Mitochondrial Function & Oxygen Efficiency"],
      },
      {
        id: "oxygen-performance",
        label: "Oxygen & performance",
        zone: "lungs",
        icon: "\u26F0\uFE0F",
        matchTags: ["Oxygen", "Performance", "Mitochondria", "VO2 Max", "Sports Performance"],
        matchOutcomes: ["Mitochondrial Function & Oxygen Efficiency", "Aerobic Capacity (VO2 Max)", "Mitochondrial Function"],
      },
    ],
  },
  {
    zone: "gut",
    label: "Gut & Digestion",
    icon: "\u{1F34E}",
    description: "Digestive health, microbiome, metabolism & nutrient absorption",
    followUpQuestion: "Do you experience digestive discomfort regularly?",
    concerns: [
      {
        id: "gut-issues",
        label: "Digestive problems",
        zone: "gut",
        icon: "\u{1F623}",
        matchTags: ["Gut", "Gut Health", "Digestion", "IBS", "Microbiome"],
        matchOutcomes: ["Gut Healing & Repair", "Digestive Health & Gut Function", "Digestive Symptom Relief", "IBS Symptom Relief", "Gut Health & Digestive Improvement"],
      },
      {
        id: "bloating",
        label: "Bloating & discomfort",
        zone: "gut",
        icon: "\u{1F388}",
        matchTags: ["Gut", "Gut Health", "Digestion", "IBS"],
        matchOutcomes: ["Digestive Symptom Relief", "IBS Symptom Relief", "Gut Inflammation", "Intestinal Barrier Repair"],
      },
      {
        id: "weight-management",
        label: "Weight management",
        zone: "gut",
        icon: "\u2696\uFE0F",
        matchTags: ["Weight Loss", "Fat Loss", "Body Composition", "Metabolic", "Metabolic Health", "Visceral Fat"],
        matchOutcomes: ["Weight Loss", "Fat Loss", "Weight Management", "Visceral Fat Reduction", "Body Composition", "Weight Loss Enhancement"],
      },
      {
        id: "blood-sugar",
        label: "Blood sugar balance",
        zone: "gut",
        icon: "\u{1F4CA}",
        matchTags: ["Blood Sugar", "Glucose", "Metabolic", "Diabetes", "Metabolic Health"],
        matchOutcomes: ["Blood Sugar Control", "Glycemic Control", "Metabolic Health", "Diabetes Prevention", "Glycemic Variability Awareness"],
      },
      {
        id: "inflammation",
        label: "Chronic inflammation",
        zone: "gut",
        icon: "\u{1F525}",
        matchTags: ["Inflammation", "Immune", "Gut", "Antioxidant"],
        matchOutcomes: ["Inflammation Reduction", "Inflammation", "Immune Function", "Oxidative Stress Reduction", "Inflammation & Immune Modulation", "Oxidative Stress / Inflammation"],
      },
      {
        id: "nutrient-absorption",
        label: "Nutrient absorption",
        zone: "gut",
        icon: "\u{1F9EA}",
        matchTags: ["Nutrition", "Vitamins", "Supplements", "Gut Health", "Personalized Medicine"],
        matchOutcomes: ["Personalized Nutrient Optimization", "Digestive Health & Gut Function", "Personalized Nutrition", "Digestive & Metabolic Health"],
      },
    ],
  },
  {
    zone: "muscles",
    label: "Muscles & Joints",
    icon: "\u{1F4AA}",
    description: "Physical performance, pain relief, joint health & mobility",
    followUpQuestion: "Is this related to an injury, aging, or general fitness?",
    concerns: [
      {
        id: "joint-pain",
        label: "Joint pain & stiffness",
        zone: "muscles",
        icon: "\u{1F9B4}",
        matchTags: ["Joint", "Joint Health", "Joints", "Musculoskeletal", "Pain"],
        matchOutcomes: ["Joint Repair", "Joint & Cartilage Repair", "Joint Pain & Osteoarthritis", "Knee Osteoarthritis", "Joint-Friendly Conditioning"],
      },
      {
        id: "muscle-recovery",
        label: "Slow muscle recovery",
        zone: "muscles",
        icon: "\u{1F504}",
        matchTags: ["Recovery", "Sports Recovery", "Muscle", "Muscle Endurance"],
        matchOutcomes: ["Muscle Recovery", "Post-Exercise Recovery", "Exercise Recovery & DOMS Reduction", "Sports Recovery (DOMS)", "Recovery & Soreness"],
      },
      {
        id: "chronic-pain",
        label: "Chronic body pain",
        zone: "muscles",
        icon: "\u{1F616}",
        matchTags: ["Pain", "Pain Management", "Inflammation", "Musculoskeletal"],
        matchOutcomes: ["Pain Reduction", "Chronic Pain Reduction", "Pain Relief", "Low Back Pain", "Musculoskeletal Pain Relief", "Chronic Pain Management", "Chronic Pain & Tension Release"],
      },
      {
        id: "strength-building",
        label: "Building strength",
        zone: "muscles",
        icon: "\u{1F3CB}\uFE0F",
        matchTags: ["Muscle", "Strength", "Performance", "Sports Performance", "Growth Hormone", "Fitness"],
        matchOutcomes: ["Muscle Strength & Power", "Strength Gains", "Muscle Performance", "Growth Hormone Release", "Muscular Endurance & Strength"],
      },
      {
        id: "flexibility",
        label: "Mobility & flexibility",
        zone: "muscles",
        icon: "\u{1F9D8}",
        matchTags: ["Mobility", "Fascia", "Pilates", "Low-Impact", "Rehabilitation"],
        matchOutcomes: ["Flexibility & Mobility", "Range of Motion & Flexibility", "Postural & Functional Improvement", "Balance & Fall Prevention"],
      },
    ],
  },
  {
    zone: "fullBody",
    label: "Sleep, Energy & Aging",
    icon: "\u2728",
    description: "Sleep quality, vitality, longevity, skin, hair & immunity",
    followUpQuestion: "What matters most to you right now?",
    concerns: [
      {
        id: "poor-sleep",
        label: "Poor sleep quality",
        zone: "fullBody",
        icon: "\u{1F319}",
        matchTags: ["Sleep"],
        matchOutcomes: ["Sleep Quality", "Sleep Improvement", "Insomnia Resolution (CBT-I)", "Melatonin Regulation", "Sleep Quality Improvement"],
      },
      {
        id: "aging-concerns",
        label: "Aging & longevity",
        zone: "fullBody",
        icon: "\u{1F9EC}",
        matchTags: ["Longevity", "Anti-Aging", "Aging", "Geroprotective", "Senolytic", "Telomeres", "Cellular Health"],
        matchOutcomes: ["Lifespan Extension (Animal)", "Biological Age Reversal", "Telomere Maintenance", "Longevity", "Autophagy Activation", "Senescent Cell Clearance", "Anti-Aging", "Anti-Aging (Systemic)", "Cellular Aging & Mitochondrial Function"],
      },
      {
        id: "skin-health",
        label: "Skin health & glow",
        zone: "fullBody",
        icon: "\u2728",
        matchTags: ["Skin", "Rejuvenation"],
        matchOutcomes: ["Skin Health", "Skin Rejuvenation", "Skin Brightening", "Skin Protection", "Anti-Aging Skin", "Skin & Hair", "Skin Health & Detoxification"],
      },
      {
        id: "hair-loss",
        label: "Hair thinning & loss",
        zone: "fullBody",
        icon: "\u{1F487}",
        matchTags: ["Hair", "Hair Restoration"],
        matchOutcomes: ["Hair Growth", "Hair Regrowth & Darkening", "Hair Restoration"],
      },
      {
        id: "low-immunity",
        label: "Weak immunity",
        zone: "fullBody",
        icon: "\u{1F6E1}\uFE0F",
        matchTags: ["Immune", "Immunity"],
        matchOutcomes: ["Immune Function", "Immune Support", "Immune Modulation", "Immune Function Enhancement", "Immune Support (Reishi)", "Immune Function & Healthspan", "Immune Function & Systemic Inflammation"],
      },
      {
        id: "low-energy",
        label: "Persistent fatigue",
        zone: "fullBody",
        icon: "\u{1FAAB}",
        matchTags: ["Energy", "Mitochondria"],
        matchOutcomes: ["Energy & Vitality", "Energy & Mood", "Energy & Mitochondrial Function", "Mitochondrial Function", "Energy & Aging", "Energy (Cordyceps)"],
      },
      {
        id: "detox",
        label: "Detox & reset",
        zone: "fullBody",
        icon: "\u{1F9F9}",
        matchTags: ["Detox", "Heavy Metals", "Lymphatic", "Blood Filtering"],
        matchOutcomes: ["Detoxification", "General Detox / Wellness", "Heavy Metal Removal", "Toxin Removal", "Skin Health & Detoxification"],
      },
    ],
  },
];

export function getZoneConfig(zone: BodyZone): ZoneConfig {
  return ZONES.find((z) => z.zone === zone)!;
}
