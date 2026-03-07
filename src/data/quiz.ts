export interface QuizQuestion {
  id: number;
  dimension: WellnessDimension;
  question: string;
  options: QuizOption[];
}

export interface QuizOption {
  label: string;
  score: number;
  archetype: WellnessArchetype;
}

export type WellnessDimension =
  | "Sleep & Recovery"
  | "Nutrition"
  | "Movement"
  | "Stress & Mind"
  | "Mindfulness"
  | "Social Connection"
  | "Biohacking"
  | "Purpose";

export type WellnessArchetype =
  | "The Biohacker"
  | "The Yogi"
  | "The Healer"
  | "The Explorer"
  | "The Performer";

export interface WellnessPlanWeek {
  week: string;
  theme: string;
  steps: string[];
}

export interface ArchetypeInfo {
  name: WellnessArchetype;
  tagline: string;
  description: string;
  traits: string[];
  recommendedCategories: string[];
  recommendedListingIds: string[];
  color: { bg: string; text: string; border: string };
  plan: WellnessPlanWeek[];
}

export const archetypes: Record<WellnessArchetype, ArchetypeInfo> = {
  "The Biohacker": {
    name: "The Biohacker",
    tagline: "Optimize everything. Measure. Improve. Repeat.",
    description:
      "You're driven by data and science. You believe the human body can be upgraded through technology, testing, and smart interventions. You track your sleep, your HRV, and probably your glucose levels too.",
    traits: ["Data-driven", "Tech-curious", "Performance-focused", "Always optimizing"],
    recommendedCategories: ["Biohacking & Performance", "Longevity Clinics"],
    recommendedListingIds: ["formation", "aviv-clinics", "aeon-clinic", "ucryo"],
    color: { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200" },
    plan: [
      { week: "Week 1", theme: "Baseline & Data", steps: [
        "Get a comprehensive biomarker panel (blood work, hormones, metabolic markers)",
        "Set up a wearable tracker if you don't have one (Oura, Whoop, or Apple Watch)",
        "Read: What is Peptide Therapy? on the Kamura blog",
      ]},
      { week: "Week 2", theme: "Recovery Tech", steps: [
        "Book a cryotherapy session at UCRYO or Formation",
        "Try red light therapy or infrared sauna",
        "Start tracking your HRV and sleep scores daily",
      ]},
      { week: "Week 3", theme: "Clinical Exploration", steps: [
        "Book a consultation at a longevity clinic (AEON or Bioscience Institute)",
        "Discuss NAD+ therapy, HBOT, or peptide protocols with your doctor",
        "Optimize your supplement stack based on your bloodwork",
      ]},
      { week: "Week 4", theme: "Protocol & Commitment", steps: [
        "Review your 3-week data trends (sleep, HRV, energy)",
        "Commit to a recurring recovery routine (cryo, sauna, or HBOT)",
        "Join a biohacking community or attend a wellness summit",
      ]},
    ],
  },
  "The Yogi": {
    name: "The Yogi",
    tagline: "Breathe. Move. Be present.",
    description:
      "You find wellness through the body-mind connection. Whether it's on the mat, in a breathwork session, or during meditation, you believe that movement and presence are the foundation of a long, vibrant life.",
    traits: ["Mindful", "Body-aware", "Consistent practice", "Inner calm"],
    recommendedCategories: ["Yoga & Movement", "Holistic & Healing"],
    recommendedListingIds: ["karma-yoga", "chi-room", "illuminations", "home-of-wellness"],
    color: { bg: "bg-purple-50", text: "text-purple-800", border: "border-purple-200" },
    plan: [
      { week: "Week 1", theme: "Establish Your Practice", steps: [
        "Commit to a daily 10-minute morning meditation or breathwork session",
        "Try a yoga class at Karma Yoga or The Chi Room",
        "Read: What is Breathwork? on the Kamura blog",
      ]},
      { week: "Week 2", theme: "Deepen the Connection", steps: [
        "Attend a guided breathwork or sound healing session at Illuminations",
        "Try a new style of yoga you haven't explored (Kundalini, Yin, or Ashtanga)",
        "Start a simple journaling practice — 5 minutes before bed",
      ]},
      { week: "Week 3", theme: "Community & Growth", steps: [
        "Join a group yoga or meditation circle",
        "Explore a wellness festival or community event",
        "Try a longer meditation (20-30 minutes) or attend a half-day retreat",
      ]},
      { week: "Week 4", theme: "Integration", steps: [
        "Reflect on your 3-week journey — what practices resonated most?",
        "Build a sustainable weekly schedule (3-4 sessions)",
        "Explore teacher training or advanced workshops",
      ]},
    ],
  },
  "The Healer": {
    name: "The Healer",
    tagline: "True wellness comes from within.",
    description:
      "You're drawn to ancient wisdom — Ayurveda, energy healing, sound therapy, and the traditions that have stood the test of time. You trust intuition as much as evidence and seek balance across all dimensions of health.",
    traits: ["Intuitive", "Holistic thinker", "Tradition-respecting", "Emotionally attuned"],
    recommendedCategories: ["Holistic & Healing", "Wellness Retreats & Spas"],
    recommendedListingIds: ["healers-clinic", "home-of-wellness", "illuminations", "retreat-palm"],
    color: { bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-200" },
    plan: [
      { week: "Week 1", theme: "Listen to Your Body", steps: [
        "Book an Ayurvedic consultation to understand your body type (dosha)",
        "Try a sound healing session at Home of Wellness",
        "Read: What is Sound Healing? on the Kamura blog",
      ]},
      { week: "Week 2", theme: "Energy & Balance", steps: [
        "Experience a Reiki or energy healing session at Illuminations",
        "Start a daily grounding practice (barefoot walking, nature time)",
        "Try an herbal or Ayurvedic tea ritual before bed",
      ]},
      { week: "Week 3", theme: "Deeper Healing", steps: [
        "Explore a full Ayurvedic treatment at The Healers' Clinic",
        "Attend a cacao ceremony or breathwork circle",
        "Begin a simple detox or cleansing protocol with practitioner guidance",
      ]},
      { week: "Week 4", theme: "Sustain & Deepen", steps: [
        "Reflect on which healing modalities resonated most",
        "Build a monthly healing schedule (1-2 sessions per week)",
        "Consider a wellness retreat for deeper immersion",
      ]},
    ],
  },
  "The Explorer": {
    name: "The Explorer",
    tagline: "Try everything. Keep what works.",
    description:
      "You're endlessly curious about wellness. From cryotherapy to cacao ceremonies, from longevity clinics to sound baths — you want to experience it all. You're open-minded, adventurous, and always discovering something new.",
    traits: ["Curious", "Open-minded", "Adventurous", "Well-rounded"],
    recommendedCategories: ["Wellness Retreats & Spas", "Holistic & Healing", "Biohacking & Performance"],
    recommendedListingIds: ["zoya", "retreat-palm", "formation", "illuminations"],
    color: { bg: "bg-rose-50", text: "text-rose-800", border: "border-rose-200" },
    plan: [
      { week: "Week 1", theme: "Sample the Spectrum", steps: [
        "Try a cryotherapy session at Formation or UCRYO",
        "Attend a sound healing or breathwork session at Illuminations",
        "Read two different wellness articles on the Kamura blog",
      ]},
      { week: "Week 2", theme: "Go Deeper", steps: [
        "Book a yoga class in a style you've never tried",
        "Experience an Ayurvedic consultation or treatment",
        "Attend a wellness event or community gathering",
      ]},
      { week: "Week 3", theme: "Retreat & Recharge", steps: [
        "Plan a day trip to ZOYA or The Retreat Palm Dubai",
        "Try float therapy, infrared sauna, or a new recovery modality",
        "Journal about which experiences have had the biggest impact",
      ]},
      { week: "Week 4", theme: "Build Your Routine", steps: [
        "Pick your top 3 modalities and commit to a monthly schedule",
        "Share your discoveries with a friend — invite them along",
        "Set a goal: one new wellness experience per month",
      ]},
    ],
  },
  "The Performer": {
    name: "The Performer",
    tagline: "Push limits. Recover hard. Go again.",
    description:
      "You live for physical challenge. You believe fitness is the bedrock of longevity, and recovery is just as important as the workout. Your body is your instrument, and you keep it finely tuned.",
    traits: ["Disciplined", "Goal-oriented", "Recovery-focused", "Physically active"],
    recommendedCategories: ["Biohacking & Performance", "Yoga & Movement"],
    recommendedListingIds: ["formation", "ucryo", "karma-yoga", "aviv-clinics"],
    color: { bg: "bg-blue-50", text: "text-blue-800", border: "border-blue-200" },
    plan: [
      { week: "Week 1", theme: "Assess & Benchmark", steps: [
        "Get a VO2 max test or body composition analysis at Formation",
        "Start tracking your recovery metrics (HRV, sleep, resting HR)",
        "Add one yoga or mobility session to your weekly routine",
      ]},
      { week: "Week 2", theme: "Recovery Upgrade", steps: [
        "Book a cryotherapy session after your hardest training day",
        "Try compression therapy or infrared sauna at UCRYO",
        "Focus on sleep optimization — aim for 8+ hours consistently",
      ]},
      { week: "Week 3", theme: "Performance Edge", steps: [
        "Explore hyperbaric oxygen therapy at Aviv Clinics",
        "Try a breathwork session focused on performance and CO2 tolerance",
        "Dial in your pre and post-workout nutrition",
      ]},
      { week: "Week 4", theme: "Sustainable Peak", steps: [
        "Compare your Week 1 benchmarks to current performance",
        "Build a recovery day routine (1-2 per week, non-negotiable)",
        "Set a 3-month performance goal with a supporting recovery plan",
      ]},
    ],
  },
};

export const dimensionLabels: Record<WellnessDimension, string> = {
  "Sleep & Recovery": "Sleep & Recovery",
  Nutrition: "Nutrition",
  Movement: "Movement",
  "Stress & Mind": "Stress & Mind",
  Mindfulness: "Mindfulness",
  "Social Connection": "Social Connection",
  Biohacking: "Biohacking",
  Purpose: "Purpose & Fulfillment",
};

export const questions: QuizQuestion[] = [
  {
    id: 1,
    dimension: "Sleep & Recovery",
    question: "How would you describe your sleep most nights?",
    options: [
      { label: "I track it with a device and optimize for deep sleep cycles", score: 9, archetype: "The Biohacker" },
      { label: "I have a calming wind-down ritual — breathwork, journaling, or meditation", score: 8, archetype: "The Yogi" },
      { label: "I sleep when I'm tired, wake when I wake — I trust my body", score: 7, archetype: "The Healer" },
      { label: "I crash hard after intense training days", score: 6, archetype: "The Performer" },
      { label: "Honestly, it's inconsistent — I'm still figuring it out", score: 4, archetype: "The Explorer" },
    ],
  },
  {
    id: 2,
    dimension: "Nutrition",
    question: "What best describes your approach to food?",
    options: [
      { label: "I experiment — intermittent fasting, keto, tracking macros", score: 9, archetype: "The Biohacker" },
      { label: "Clean, whole foods — I eat mindfully and with intention", score: 8, archetype: "The Yogi" },
      { label: "Ayurvedic or traditional — I eat according to my body type and the seasons", score: 8, archetype: "The Healer" },
      { label: "High protein, performance-focused — food is fuel for training", score: 7, archetype: "The Performer" },
      { label: "I try everything — plant-based one month, carnivore the next", score: 5, archetype: "The Explorer" },
    ],
  },
  {
    id: 3,
    dimension: "Movement",
    question: "What does your typical movement practice look like?",
    options: [
      { label: "HIIT, strength training, or competitive sports — I push hard", score: 8, archetype: "The Performer" },
      { label: "Yoga, Pilates, or tai chi — mindful, intentional movement", score: 9, archetype: "The Yogi" },
      { label: "I walk a lot and do bodyweight exercises — simple and consistent", score: 7, archetype: "The Healer" },
      { label: "I use recovery tech — cold plunge, red light, compression boots", score: 8, archetype: "The Biohacker" },
      { label: "I'm always trying new classes — boxing, surfing, dance, you name it", score: 6, archetype: "The Explorer" },
    ],
  },
  {
    id: 4,
    dimension: "Stress & Mind",
    question: "When stress hits, what's your go-to response?",
    options: [
      { label: "Breathwork or meditation — I sit with it and process", score: 9, archetype: "The Yogi" },
      { label: "A hard workout — I sweat it out", score: 7, archetype: "The Performer" },
      { label: "I look at my HRV data and adjust my routine accordingly", score: 8, archetype: "The Biohacker" },
      { label: "I reach for healing — Reiki, sound bath, or energy work", score: 8, archetype: "The Healer" },
      { label: "I try different things depending on the day", score: 5, archetype: "The Explorer" },
    ],
  },
  {
    id: 5,
    dimension: "Mindfulness",
    question: "How often do you practice mindfulness or meditation?",
    options: [
      { label: "Daily — it's non-negotiable", score: 10, archetype: "The Yogi" },
      { label: "A few times a week — guided meditations or breathwork", score: 8, archetype: "The Healer" },
      { label: "I use apps and track my meditation streaks", score: 7, archetype: "The Biohacker" },
      { label: "When I remember — I know I should do more", score: 4, archetype: "The Explorer" },
      { label: "Not really — I prefer physical activity for mental clarity", score: 3, archetype: "The Performer" },
    ],
  },
  {
    id: 6,
    dimension: "Social Connection",
    question: "What role does community play in your wellness?",
    options: [
      { label: "I love group classes — yoga circles, breathwork groups, fitness crews", score: 9, archetype: "The Yogi" },
      { label: "I attend wellness events and festivals to connect with like-minded people", score: 8, archetype: "The Explorer" },
      { label: "I have a training partner or coach — accountability is key", score: 7, archetype: "The Performer" },
      { label: "I prefer solo practices — healing is a personal journey", score: 6, archetype: "The Healer" },
      { label: "I'm part of online biohacking communities and forums", score: 7, archetype: "The Biohacker" },
    ],
  },
  {
    id: 7,
    dimension: "Biohacking",
    question: "Which of these have you tried or would love to try?",
    options: [
      { label: "Cryotherapy, IV drips, or hyperbaric oxygen therapy", score: 9, archetype: "The Biohacker" },
      { label: "A silent meditation retreat or yoga teacher training", score: 8, archetype: "The Yogi" },
      { label: "Sound healing, Ayurvedic cleanse, or energy work", score: 8, archetype: "The Healer" },
      { label: "All of the above — I want to try everything at least once", score: 7, archetype: "The Explorer" },
      { label: "A tough endurance race — marathon, triathlon, Hyrox", score: 7, archetype: "The Performer" },
    ],
  },
  {
    id: 8,
    dimension: "Purpose",
    question: "What drives your wellness journey?",
    options: [
      { label: "I want to live to 120 and be fully functional", score: 9, archetype: "The Biohacker" },
      { label: "Inner peace — I want to feel calm, present, and connected", score: 9, archetype: "The Yogi" },
      { label: "Healing — I want to restore balance and feel whole again", score: 9, archetype: "The Healer" },
      { label: "Curiosity — I love learning about what works for my body", score: 7, archetype: "The Explorer" },
      { label: "Performance — I want to be the strongest, fastest version of me", score: 8, archetype: "The Performer" },
    ],
  },
  {
    id: 9,
    dimension: "Sleep & Recovery",
    question: "How do you feel about wellness technology?",
    options: [
      { label: "I own an Oura ring, Whoop, or CGM — data is everything", score: 10, archetype: "The Biohacker" },
      { label: "I use apps for guided meditation or yoga", score: 7, archetype: "The Yogi" },
      { label: "I prefer natural approaches — technology can wait", score: 6, archetype: "The Healer" },
      { label: "I love trying new wellness gadgets and tools", score: 7, archetype: "The Explorer" },
      { label: "I use a fitness tracker for my workouts and that's enough", score: 6, archetype: "The Performer" },
    ],
  },
  {
    id: 10,
    dimension: "Nutrition",
    question: "If you could spend a weekend at any of these, which would you pick?",
    options: [
      { label: "A cutting-edge longevity clinic for a full health diagnostic", score: 9, archetype: "The Biohacker" },
      { label: "A serene yoga and meditation retreat in the mountains", score: 9, archetype: "The Yogi" },
      { label: "An Ayurvedic spa with traditional Panchakarma treatments", score: 9, archetype: "The Healer" },
      { label: "A wellness festival with dozens of different experiences", score: 8, archetype: "The Explorer" },
      { label: "A fitness bootcamp or obstacle course weekend", score: 8, archetype: "The Performer" },
    ],
  },
];
