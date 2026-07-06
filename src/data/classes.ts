/**
 * UAE wellness classes — disciplines and the studio directory.
 * Studio data is research-verified (real, operating studios only); if a
 * studio can't be verified it doesn't ship. Prices are indicative drop-in
 * rates and drift — treat as signal, not quote.
 */

import type { SessionTypeKey } from "@/data/session-types";

export type ClassDiscipline =
  | "yoga"
  | "pilates"
  | "breathwork"
  | "sound_bath"
  | "meditation"
  | "ice_bath"
  | "mobility"
  | "barre";

export type Emirate = "dubai" | "abu-dhabi" | "sharjah" | "ras-al-khaimah";

export interface DisciplineMeta {
  key: ClassDiscipline;
  label: string;
  /** Session type used when a member logs attendance. */
  sessionType: SessionTypeKey;
  description: string;
}

export const DISCIPLINES: DisciplineMeta[] = [
  {
    key: "yoga",
    label: "Yoga",
    sessionType: "yoga",
    description: "Vinyasa, hatha, hot, aerial — the UAE's deepest class scene.",
  },
  {
    key: "pilates",
    label: "Pilates",
    sessionType: "pilates",
    description: "Reformer and mat studios, from athletic to clinical.",
  },
  {
    key: "breathwork",
    label: "Breathwork",
    sessionType: "breathwork",
    description: "Guided breath sessions — functional, holotropic, WHM-style.",
  },
  {
    key: "sound_bath",
    label: "Sound Healing",
    sessionType: "sound_bath",
    description: "Sound baths and gong immersions for deep downshift.",
  },
  {
    key: "meditation",
    label: "Meditation",
    sessionType: "meditation",
    description: "Guided sits, candlelight sessions, and mindfulness courses.",
  },
  {
    key: "ice_bath",
    label: "Ice Bath",
    sessionType: "cold_plunge",
    description: "Cold exposure classes, usually paired with breathwork.",
  },
  {
    key: "mobility",
    label: "Mobility",
    sessionType: "other",
    description: "Stretch, fascia and joint-health classes for recovery days.",
  },
  {
    key: "barre",
    label: "Barre",
    sessionType: "pilates",
    description: "Ballet-inspired low-impact strength and posture work.",
  },
];

export function getDiscipline(key: ClassDiscipline | string): DisciplineMeta | null {
  return DISCIPLINES.find((d) => d.key === key) ?? null;
}

export const EMIRATE_LABELS: Record<Emirate, string> = {
  dubai: "Dubai",
  "abu-dhabi": "Abu Dhabi",
  sharjah: "Sharjah",
  "ras-al-khaimah": "Ras Al Khaimah",
};

export interface ClassStudio {
  slug: string;
  name: string;
  disciplines: ClassDiscipline[];
  area: string;
  emirate: Emirate;
  /** Indicative drop-in price, e.g. "AED 90–140" or "Membership-based". */
  priceAed: string;
  description: string;
  url: string;
  tags: string[];
}

/** Research-verified 2026-07 via Time Out, What's On, Bayut + studio sites. */
export const CLASS_STUDIOS: ClassStudio[] = [
  {
    slug: "trident-wellness-center",
    name: "Trident Wellness Center",
    disciplines: ["yoga", "meditation"],
    area: "Dubai Marina",
    emirate: "dubai",
    priceAed: "AED 100–120/class",
    description:
      "Dubai's largest integrated classical yoga studio, teaching Iyengar, Hatha, Vinyasa, Sivananda and Ashtanga with floor-to-ceiling Marina views.",
    url: "https://tridentwellnessdubai.com/",
    tags: ["beginner-friendly", "traditional"],
  },
  {
    slug: "karma-yoga",
    name: "Karma Yoga",
    disciplines: ["yoga", "meditation", "sound_bath"],
    area: "Dubai Marina",
    emirate: "dubai",
    priceAed: "AED 105–250/class",
    description:
      "Bali-inspired studio on the 33rd floor of Marina Plaza offering Vinyasa, Hatha, Yin and prenatal classes plus gong-bath and full-moon meditation workshops.",
    url: "https://www.karmayogadubai.com/",
    tags: ["beginner-friendly", "prenatal"],
  },
  {
    slug: "zen-yoga",
    name: "Zen Yoga",
    disciplines: ["yoga", "pilates"],
    area: "Jumeirah Park",
    emirate: "dubai",
    priceAed: "AED 100+/class",
    description:
      "One of Dubai's longest-running yoga studios, with Hatha, Ashtanga, Vinyasa and power yoga alongside mat and reformer pilates.",
    url: "https://yoga.ae/",
    tags: ["beginner-friendly"],
  },
  {
    slug: "dryp",
    name: "DRYP",
    disciplines: ["yoga", "pilates", "barre"],
    area: "Dubai Marina",
    emirate: "dubai",
    priceAed: "AED 85/class",
    description:
      "Infrared-heated hot yoga, hot pilates and barre hub in Orra Marina Tower with reformer classes, cryotherapy, infrared sauna and an on-site cafe.",
    url: "https://www.dryp.ae/",
    tags: ["hot yoga"],
  },
  {
    slug: "eclipse-wellbeing",
    name: "Eclipse Wellbeing Hub & School",
    disciplines: ["yoga"],
    area: "Dubai Marina",
    emirate: "dubai",
    priceAed: "AED 105–180/class",
    description:
      "Internationally accredited yoga school on the Marina Promenade waterfront, running hot yoga, Hatha, Vinyasa, Iyengar and restorative classes plus teacher trainings.",
    url: "https://goeclipse.com/",
    tags: ["hot yoga", "teacher-training"],
  },
  {
    slug: "lifestyle-yoga",
    name: "Lifestyle Yoga",
    disciplines: ["yoga", "sound_bath"],
    area: "Sheikh Zayed Road",
    emirate: "dubai",
    priceAed: "Membership-based",
    description:
      "Traditional yoga centre inside the Shangri-La serving the Downtown/DIFC crowd, with weekly Tibetan and crystal bowl sound bath sessions.",
    url: "https://www.lifestyleyogaworld.com/",
    tags: ["traditional", "beginner-friendly"],
  },
  {
    slug: "seva-experience",
    name: "SEVA Experience",
    disciplines: ["yoga", "breathwork", "sound_bath", "meditation"],
    area: "Jumeirah 1",
    emirate: "dubai",
    priceAed: "Membership-based",
    description:
      "Garden-villa holistic sanctuary with Kundalini, Hatha and Tantra yoga, gong baths, breathwork and a 100% organic plant-based cafe.",
    url: "https://www.sevaexperience.com/",
    tags: ["spiritual", "community", "vegan-cafe"],
  },
  {
    slug: "illuminations-wellbeing",
    name: "Illuminations Wellbeing Centre",
    disciplines: ["meditation", "sound_bath", "yoga"],
    area: "JLT",
    emirate: "dubai",
    priceAed: "Membership-based",
    description:
      "Dubai's largest wellness centre for meditation — group healing classes, gong meditation, private coaching and free Sunday yoga and meditation sessions.",
    url: "https://illuminations.ae/",
    tags: ["beginner-friendly"],
  },
  {
    slug: "maya-blu",
    name: "Maya Blu",
    disciplines: ["yoga", "meditation", "sound_bath"],
    area: "Business Bay",
    emirate: "dubai",
    priceAed: "Membership-based",
    description: "Boutique Business Bay yoga and meditation studio also running sound healing sessions.",
    url: "https://themayablu.com/",
    tags: ["beginner-friendly"],
  },
  {
    slug: "reform-athletica",
    name: "Reform Athletica",
    disciplines: ["pilates", "sound_bath"],
    area: "Jumeirah & DIFC",
    emirate: "dubai",
    priceAed: "From AED 150/class",
    description:
      "Boutique dynamic-reformer studio known for athletic Pilates, HIIT, deep stretch and sound meditation sessions.",
    url: "https://www.reformathletica.com/",
    tags: ["luxury", "athletes"],
  },
  {
    slug: "real-pilates",
    name: "Real Pilates",
    disciplines: ["pilates", "barre", "yoga"],
    area: "JLT, Jumeirah & Meydan",
    emirate: "dubai",
    priceAed: "From AED 125/class",
    description:
      "One of Dubai's largest and longest-established pilates brands, with STOTT-qualified instructors across reformer, mat, barre and yoga.",
    url: "https://www.real-pilates.com/",
    tags: ["beginner-friendly", "established"],
  },
  {
    slug: "the-hundred-wellness",
    name: "The Hundred Wellness Centre",
    disciplines: ["pilates", "yoga"],
    area: "Jumeirah 1",
    emirate: "dubai",
    priceAed: "Membership-based",
    description:
      "Holistic villa founded by the first Emirati woman to open a pilates studio — classical pilates, reformer, GYROTONIC and Ashtanga yoga, max 8 per class.",
    url: "https://thehundred.ae/",
    tags: ["luxury", "holistic", "small-group"],
  },
  {
    slug: "karve",
    name: "KARVE",
    disciplines: ["pilates"],
    area: "Al Quoz (Alserkal Avenue)",
    emirate: "dubai",
    priceAed: "Membership-based",
    description:
      "London's Transformer Pilates club at Alserkal Avenue — 50-minute high-intensity classes on 12 custom machines in a SoHo-styled space.",
    url: "https://karve.ae/",
    tags: ["luxury", "athletes"],
  },
  {
    slug: "posture",
    name: "POSTURE. Pilates, Yoga & Wellness Club",
    disciplines: ["pilates", "yoga"],
    area: "Palm Jumeirah & Downtown",
    emirate: "dubai",
    priceAed: "From AED 168/class",
    description:
      "Form-focused reformer, Cadillac and mat pilates club; its two-level Downtown flagship sits opposite Burj Park and the Fountains.",
    url: "https://thisisposture.com/en",
    tags: ["luxury"],
  },
  {
    slug: "kure-pilates",
    name: "Kure Pilates & Wellness",
    disciplines: ["pilates"],
    area: "Downtown & Palm Jumeirah",
    emirate: "dubai",
    priceAed: "From AED 145/class",
    description:
      "Minimalist luxury reformer studio where sessions start with wellness shots at the coffee bar and your reformer carries your name.",
    url: "https://www.instagram.com/kurepilates/",
    tags: ["luxury"],
  },
  {
    slug: "tula-studios",
    name: "Tula Studios",
    disciplines: ["pilates", "barre"],
    area: "Town Square & The Springs",
    emirate: "dubai",
    priceAed: "Membership-based",
    description:
      "Women-focused suburban studios with Dubai's widest class variety: reformer, aerial pilates, barre, MOTR and pre/post-natal programs.",
    url: "https://tulastudios.com/",
    tags: ["women-only", "prenatal", "aerial", "beginner-friendly"],
  },
  {
    slug: "kor-pilates",
    name: "KōR Pilates",
    disciplines: ["pilates"],
    area: "Dubai Marina",
    emirate: "dubai",
    priceAed: "AED 150/class",
    description:
      "Light-filled boutique reformer studio inside the InterContinental Dubai Marina, offering strength, stretch and beginner-friendly sessions.",
    url: "https://www.korpilatesdubai.com/",
    tags: ["beginner-friendly", "luxury"],
  },
  {
    slug: "physique-57",
    name: "Physique 57 Dubai",
    disciplines: ["barre"],
    area: "Al Safa (Al Wasl Road)",
    emirate: "dubai",
    priceAed: "AED 125/class · first free",
    description:
      "The famed New York barre brand's Dubai outpost, blending strength training, cardio and stretching in its signature 57-minute method.",
    url: "https://physique57.com/dubai/",
    tags: ["beginner-friendly"],
  },
  {
    slug: "brrn-barre",
    name: "BRRN Barre",
    disciplines: ["barre", "pilates"],
    area: "Al Quoz",
    emirate: "dubai",
    priceAed: "From AED 155/class",
    description:
      "Women-only, infra-heated barre, pilates and reformer studio — LA-style high-intensity, low-impact training.",
    url: "https://www.brrnbarre.com/",
    tags: ["women-only", "hot", "athletes"],
  },
  {
    slug: "breasy",
    name: "Breasy",
    disciplines: ["breathwork", "ice_bath"],
    area: "Palm Jumeirah",
    emirate: "dubai",
    priceAed: "Session-based",
    description:
      "Beachfront breathwork and ice-bath studio on the Palm running 90-minute guided breathwork journeys and cold-plunge experiences.",
    url: "https://www.breasydxb.com/",
    tags: ["beginner-friendly", "outdoors"],
  },
  {
    slug: "the-icehouse",
    name: "The Icehouse",
    disciplines: ["ice_bath"],
    area: "DIFC & The Meadows",
    emirate: "dubai",
    priceAed: "AED 145 / 15-min plunge",
    description:
      "Dedicated ice-bath and infrared/traditional sauna studio with guided contrast-therapy sessions on Odin Pro ice baths.",
    url: "https://theicehouse.ae/",
    tags: ["athletes", "recovery"],
  },
  {
    slug: "contrast-wellness",
    name: "CONTRAST",
    disciplines: ["ice_bath"],
    area: "Palm Jumeirah (Golden Mile)",
    emirate: "dubai",
    priceAed: "AED 120–220/session",
    description:
      "Private sauna-and-ice-bath suites — Finnish sauna + cold plunge contrast therapy, infrared sauna, red light and IV drips.",
    url: "https://www.contrast-wellness.com/",
    tags: ["luxury", "private", "recovery"],
  },
  {
    slug: "the-chi-room",
    name: "The Chi Room",
    disciplines: ["sound_bath", "breathwork", "meditation", "yoga"],
    area: "Al Quoz (Alserkal Avenue)",
    emirate: "dubai",
    priceAed: "AED 100 intro · AED 130/class",
    description:
      "Acoustically designed sound-healing studio with an 8-metre ceiling — gong baths, crystal and Tibetan bowl sessions, breathwork and moon rituals.",
    url: "https://thechiroom.ae/",
    tags: ["beginner-friendly"],
  },
  {
    slug: "in-to",
    name: "IN TO",
    disciplines: ["sound_bath", "breathwork", "meditation"],
    area: "Business Bay",
    emirate: "dubai",
    priceAed: "Session-based",
    description:
      "Gong meditation and sound-healing studio holding Dubai's biggest instrument collection — 5 gongs, 25 singing bowls — plus desert sessions in Al Qudra.",
    url: "https://www.in-to.ae/",
    tags: ["beginner-friendly", "small-group"],
  },
  {
    slug: "dr-stretch",
    name: "Dr.stretch",
    disciplines: ["mobility"],
    area: "Dubai Hills & Palm Jumeirah",
    emirate: "dubai",
    priceAed: "Session-based",
    description:
      "International assisted-stretching chain with certified stretch professionals using deep core-balance techniques to restore mobility.",
    url: "https://www.drstretch.ae/",
    tags: ["athletes", "recovery", "beginner-friendly"],
  },
  {
    slug: "stretch-com",
    name: "Stretch.com Studio Dubai",
    disciplines: ["mobility"],
    area: "Dubai Marina",
    emirate: "dubai",
    priceAed: "Session-based",
    description:
      "Bills itself as the first studio worldwide covering all styles of stretching — 1-on-1 assisted stretch, group flexibility classes and stretch massage.",
    url: "https://stretch.com/locations/dubai/",
    tags: ["beginner-friendly", "athletes"],
  },
  {
    slug: "bodytree-studio",
    name: "Bodytree Studio",
    disciplines: ["yoga", "pilates", "barre"],
    area: "Abu Dhabi Island",
    emirate: "abu-dhabi",
    priceAed: "AED 90–130/class",
    description:
      "Abu Dhabi's original boutique wellness studio (since 2007) — reformer and mat pilates, yoga, barre and prenatal classes taught by ex-Olympians and dancers.",
    url: "https://www.bodytreestudio.com/",
    tags: ["beginner-friendly", "prenatal", "established"],
  },
  {
    slug: "aura-wellness",
    name: "Aura Wellness",
    disciplines: ["pilates", "yoga"],
    area: "Reem Island & Saadiyat",
    emirate: "abu-dhabi",
    priceAed: "Membership-based",
    description:
      "Balinese-inspired holistic centre pairing reformer and mat pilates and yoga with an organic health cafe and lifestyle store.",
    url: "https://aurawellness.ae/",
    tags: ["luxury", "beginner-friendly"],
  },
  {
    slug: "antara-yoga-pilates",
    name: "Antara Yoga & Pilates",
    disciplines: ["yoga", "pilates"],
    area: "Al Raha Beach",
    emirate: "abu-dhabi",
    priceAed: "Membership-based",
    description:
      "Abu Dhabi's home of hot yoga — Bikram, hot vinyasa, hot yoga sculpt and hot pilates in a 40°C infrared-heated studio, plus non-heated classes.",
    url: "https://antarayogapilates.com/",
    tags: ["hot yoga"],
  },
  {
    slug: "seven-wellness",
    name: "Seven Wellness Center",
    disciplines: ["yoga", "sound_bath", "meditation"],
    area: "Reem Island",
    emirate: "abu-dhabi",
    priceAed: "AED 80/class",
    description:
      "Eco-friendly vegan yoga studio with Ashtanga, Yin and power yoga, sound healing and reiki, plus the on-site plant-based Soul Cafe.",
    url: "https://www.sevenwellness.ae/",
    tags: ["beginner-friendly", "vegan-cafe", "spiritual"],
  },
  {
    slug: "white-lotus-yoga",
    name: "White Lotus Yoga Center",
    disciplines: ["yoga", "sound_bath", "meditation"],
    area: "Abu Shagara",
    emirate: "sharjah",
    priceAed: "AED 30–70/class",
    description:
      "One of Sharjah's top-rated yoga centres — Hatha, Vinyasa, Ashtanga and sound healing with separate classes for men, women and kids, plus prenatal.",
    url: "https://www.whitelotusyogacenter.org/",
    tags: ["beginner-friendly", "prenatal", "family"],
  },
  {
    slug: "glimmer-pilates",
    name: "Glimmer Pilates Studio",
    disciplines: ["pilates"],
    area: "Al Dhait",
    emirate: "ras-al-khaimah",
    priceAed: "Membership-based",
    description:
      "RAK's dedicated pilates studio with certified instructors running classes from beginner through advanced.",
    url: "https://glimmerpilatesae.com/",
    tags: ["beginner-friendly"],
  },
];
