export interface Listing {
  id: string;
  name: string;
  tagline: string;
  description: string;
  location: string;
  city: string;
  category: ListingCategory;
  website: string;
  featured?: boolean;
}

export type ListingCategory =
  | "Longevity Clinics"
  | "Biohacking & Performance"
  | "Holistic & Healing"
  | "Yoga & Movement"
  | "Wellness Retreats & Spas";

export const listingCategoryColors: Record<ListingCategory, { bg: string; text: string }> = {
  "Longevity Clinics": { bg: "bg-red-100", text: "text-red-700" },
  "Biohacking & Performance": { bg: "bg-amber-100", text: "text-amber-800" },
  "Holistic & Healing": { bg: "bg-emerald-100", text: "text-emerald-800" },
  "Yoga & Movement": { bg: "bg-purple-100", text: "text-purple-800" },
  "Wellness Retreats & Spas": { bg: "bg-rose-100", text: "text-rose-800" },
};

export const categoryDescriptions: Record<ListingCategory, string> = {
  "Longevity Clinics":
    "Cutting-edge clinics offering regenerative medicine, stem cell therapy, and precision diagnostics to help you live longer and healthier.",
  "Biohacking & Performance":
    "Recovery studios and performance centers using cryotherapy, hyperbaric oxygen, infrared therapy, and more to optimize your body.",
  "Holistic & Healing":
    "Sound healing, breathwork, Reiki, Ayurveda, and energy work — spaces dedicated to restoring balance and inner well-being.",
  "Yoga & Movement":
    "Studios offering yoga, Pilates, and mindful movement practices in inspiring spaces across the UAE.",
  "Wellness Retreats & Spas":
    "Luxury wellness resorts and retreats offering immersive programs for detox, rejuvenation, and deep restoration.",
};

export const listings: Listing[] = [
  // ─── Longevity Clinics ───
  {
    id: "aeon-clinic",
    name: "AEON Clinic",
    tagline: "Regenerative wellness meets luxury longevity",
    description:
      "Specializing in stem cell therapy, hyperbaric oxygen therapy, NAD+ infusions, and advanced anti-aging treatments inside Atlantis The Royal.",
    location: "Atlantis The Royal, Palm Jumeirah",
    city: "Dubai",
    category: "Longevity Clinics",
    website: "https://theaeonclinic.com/",
    featured: true,
  },
  {
    id: "clinique-la-prairie",
    name: "Clinique La Prairie — Longevity Hub",
    tagline: "90+ years of Swiss longevity expertise",
    description:
      "A 3,800 sqm longevity center with 29 treatment rooms, a Longevity Index diagnostic lounge, and programs combining preventive medicine with regenerative care.",
    location: "One&Only One Za'abeel",
    city: "Dubai",
    category: "Longevity Clinics",
    website: "https://longevity-hub.cliniquelaprairie.com/dubai/",
    featured: true,
  },
  {
    id: "bioscience-institute",
    name: "Bioscience Institute",
    tagline: "Precision medicine at the molecular level",
    description:
      "Offering stem cell therapy, AGESKILL IV treatments, and molecular-level biological age monitoring with personalized longevity strategies.",
    location: "Dubai Healthcare City",
    city: "Dubai",
    category: "Longevity Clinics",
    website: "https://bioinst.com/",
  },

  // ─── Biohacking & Performance ───
  {
    id: "formation",
    name: "Formation",
    tagline: "Dubai's first dedicated biohacking studio",
    description:
      "Cryotherapy, PEMF therapy, VO2 testing, infrared sauna, red light therapy, and adaptive AI-driven training — all focused on energy, recovery, and longevity.",
    location: "Dubai Marina & DIFC",
    city: "Dubai",
    category: "Biohacking & Performance",
    website: "https://www.byformation.com/",
    featured: true,
  },
  {
    id: "aviv-clinics",
    name: "Aviv Clinics",
    tagline: "World's largest hyperbaric oxygen therapy center",
    description:
      "A 7,000 sqm facility integrating HBOT with cognitive assessments, physical conditioning, and lifestyle guidance. First UHMS-accredited facility in the Middle East.",
    location: "Jumeirah Lake Towers (JLT)",
    city: "Dubai",
    category: "Biohacking & Performance",
    website: "https://aviv-clinics.ae/",
    featured: true,
  },
  {
    id: "ucryo",
    name: "UCRYO Wellness Center",
    tagline: "Cryotherapy, infrared & IV recovery",
    description:
      "Whole-body cryotherapy, localized cryotherapy, infrared sauna, compression therapy, and IV vitamin drips across multiple Dubai locations.",
    location: "Multiple locations",
    city: "Dubai",
    category: "Biohacking & Performance",
    website: "https://ucryowellness.com/",
  },

  // ─── Holistic & Healing ───
  {
    id: "illuminations",
    name: "Illuminations Well-Being Center",
    tagline: "Dubai's largest holistic wellness center",
    description:
      "Reiki, Theta healing, Chakra healing, sound healing, breathwork, guided meditation, life coaching, hypnotherapy, and corporate wellness programs.",
    location: "Jumeirah Lake Towers (JLT)",
    city: "Dubai",
    category: "Holistic & Healing",
    website: "https://illuminations.ae/",
    featured: true,
  },
  {
    id: "home-of-wellness",
    name: "Home of Wellness",
    tagline: "A sanctuary for sound healing & breathwork",
    description:
      "Sound healing, breathwork, reiki, hypnotherapy, guided meditation, and energy healing for individuals, groups, and corporates.",
    location: "Al Wasl Road, Umm Suqeim 2",
    city: "Dubai",
    category: "Holistic & Healing",
    website: "https://yourhomeofwellness.com/",
  },
  {
    id: "healers-clinic",
    name: "The Healers' Clinic",
    tagline: "Integrative Ayurveda & holistic medicine",
    description:
      "Blending Ayurveda, homeopathy, naturopathy, yoga, and modern medicine. Over 15,000 patients served since 2016.",
    location: "Al Wasl Road, Jumeirah 2",
    city: "Dubai",
    category: "Holistic & Healing",
    website: "https://www.thehealersclinic.com/",
  },
  {
    id: "house-of-nature",
    name: "House of Nature Medical Center",
    tagline: "Abu Dhabi's integrative wellness destination",
    description:
      "Ayurveda, yoga, chiropractic care, naturopathy, functional medicine, acupuncture, and traditional healing therapies.",
    location: "Musaffah",
    city: "Abu Dhabi",
    category: "Holistic & Healing",
    website: "https://honuae.com/",
  },

  // ─── Yoga & Movement ───
  {
    id: "karma-yoga",
    name: "Karma Yoga Dubai",
    tagline: "Bali-inspired yoga on the 33rd floor",
    description:
      "Hatha, Vinyasa, Ashtanga, Kundalini, and Yin yoga with meditation workshops and energy healing — offering stunning marina views and a vibrant community.",
    location: "Marina Plaza, Dubai Marina",
    city: "Dubai",
    category: "Yoga & Movement",
    website: "https://www.karmayogadubai.com/",
    featured: true,
  },
  {
    id: "chi-room",
    name: "The Chi Room",
    tagline: "Boutique studio in Dubai's creative arts district",
    description:
      "Yoga, breathwork, sound healing, and meditation in an intimate, community-driven setting that bridges movement with mindfulness.",
    location: "Alserkal Avenue, Al Quoz",
    city: "Dubai",
    category: "Yoga & Movement",
    website: "https://thechiroom.ae/",
  },

  // ─── Wellness Retreats & Spas ───
  {
    id: "retreat-palm",
    name: "The Retreat Palm Dubai",
    tagline: "UAE's first five-star wellness resort",
    description:
      "Home to the world's first Rayya Wellness Centre offering 360-degree holistic wellness. Alcohol-free with clean-food dining built on Feng Shui principles.",
    location: "East Crescent, Palm Jumeirah",
    city: "Dubai",
    category: "Wellness Retreats & Spas",
    website: "https://theretreatpalmdubai.com/",
    featured: true,
  },
  {
    id: "zoya",
    name: "ZOYA Health & Wellbeing Resort",
    tagline: "Adults-only luxury wellness retreat",
    description:
      "A 1,500 sqm holistic spa with nine structured retreat programs — detox, rejuvenation, anti-aging, immune support — plus hydrotherapy, infrared sauna, and therapeutic fasting.",
    location: "Al Zorah",
    city: "Ajman",
    category: "Wellness Retreats & Spas",
    website: "https://zoyawellbeing.com/",
    featured: true,
  },
];
