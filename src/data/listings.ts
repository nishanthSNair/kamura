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
  services: string[];
  mapQuery?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  priceRange?: string;
  hours?: string;
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
    services: ["Stem Cell Therapy", "HBOT", "NAD+ Infusions", "Anti-Aging", "Regenerative Medicine"],
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
    services: ["Longevity Diagnostics", "Preventive Medicine", "Regenerative Care", "Longevity Programs"],
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
    services: ["Stem Cell Therapy", "IV Treatments", "Biological Age Testing", "Precision Medicine", "Longevity Strategy"],
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
    services: ["Cryotherapy", "PEMF Therapy", "Infrared Sauna", "Red Light Therapy", "VO2 Testing"],
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
    services: ["HBOT", "Cognitive Assessment", "Physical Conditioning", "Lifestyle Guidance"],
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
    services: ["Whole-Body Cryo", "Localized Cryo", "Infrared Sauna", "Compression Therapy", "IV Drips"],
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
    services: ["Reiki", "Sound Healing", "Breathwork", "Meditation", "Hypnotherapy", "Life Coaching"],
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
    services: ["Sound Healing", "Breathwork", "Reiki", "Hypnotherapy", "Meditation", "Energy Healing"],
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
    services: ["Ayurveda", "Homeopathy", "Naturopathy", "Yoga Therapy", "Integrative Medicine"],
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
    services: ["Ayurveda", "Chiropractic Care", "Naturopathy", "Functional Medicine", "Acupuncture"],
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
    services: ["Hatha Yoga", "Vinyasa", "Ashtanga", "Kundalini", "Yin Yoga", "Meditation"],
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
    services: ["Yoga", "Breathwork", "Sound Healing", "Meditation", "Mindfulness"],
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
    services: ["Holistic Wellness", "Clean-Food Dining", "Feng Shui", "Wellness Retreats", "Rejuvenation"],
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
    services: ["Detox Programs", "Hydrotherapy", "Infrared Sauna", "Therapeutic Fasting", "Anti-Aging"],
  },

  // ─── New Listings ───────────────────────────────────

  // ─── Longevity Clinics (4 more) ───
  {
    id: "dna-health",
    name: "DNA Health & Wellness",
    tagline: "Genetics-driven longevity programs",
    description:
      "Personalized health programs based on genetic testing, epigenetic analysis, and biomarker optimization. Offers IV therapy, hormone balancing, and anti-aging protocols.",
    location: "DIFC Gate Village",
    city: "Dubai",
    category: "Longevity Clinics",
    website: "https://dnahealthcorp.com/",
    services: ["Genetic Testing", "Epigenetic Analysis", "IV Therapy", "Hormone Balancing", "Anti-Aging"],
  },
  {
    id: "skin111",
    name: "Skin111 Clinic",
    tagline: "Award-winning regenerative aesthetics",
    description:
      "Regenerative medicine, PRP therapy, exosome treatments, and advanced anti-aging protocols. Winner of multiple Middle East beauty and wellness awards.",
    location: "Jumeirah Beach Road",
    city: "Dubai",
    category: "Longevity Clinics",
    website: "https://skin111.com/",
    services: ["Regenerative Medicine", "PRP Therapy", "Exosome Treatments", "Anti-Aging"],
  },
  {
    id: "advanced-health-dubai",
    name: "Advanced Health Dubai",
    tagline: "Functional medicine meets longevity science",
    description:
      "Comprehensive functional medicine assessments, gut health diagnostics, heavy metal detox, telomere testing, and personalized longevity roadmaps.",
    location: "City Walk",
    city: "Dubai",
    category: "Longevity Clinics",
    website: "https://advancedhealth.ae/",
    services: ["Functional Medicine", "Gut Health", "Heavy Metal Detox", "Telomere Testing", "Longevity Planning"],
  },
  {
    id: "eden-aesthetics",
    name: "EDEN AESTHETICS Clinic",
    tagline: "German-standard regenerative wellness",
    description:
      "German-certified medical team offering stem cell therapy, exosome treatments, NAD+ infusions, and bio-identical hormone optimization.",
    location: "Business Bay",
    city: "Dubai",
    category: "Longevity Clinics",
    website: "https://edenaesthetics.ae/",
    services: ["Stem Cell Therapy", "Exosome Treatments", "NAD+ Infusions", "Hormone Optimization"],
  },

  // ─── Biohacking & Performance (4 more) ───
  {
    id: "wellth-medcare",
    name: "Wellth by Medcare",
    tagline: "Medical-grade biohacking & recovery",
    description:
      "IV therapy, cryotherapy, hyperbaric oxygen, compression therapy, and infrared sauna — all under medical supervision at a premium healthcare facility.",
    location: "Al Safa",
    city: "Dubai",
    category: "Biohacking & Performance",
    website: "https://www.medcare.ae/en/wellth",
    services: ["IV Therapy", "Cryotherapy", "Hyperbaric Oxygen", "Compression Therapy", "Infrared Sauna"],
  },
  {
    id: "resync",
    name: "RESYNC",
    tagline: "Performance recovery & optimization studio",
    description:
      "Combining sports science with recovery tech — NormaTec compression, Game Ready cold therapy, EMS training, and metabolic testing for peak performance.",
    location: "Al Quoz",
    city: "Dubai",
    category: "Biohacking & Performance",
    website: "https://resync.ae/",
    services: ["NormaTec Compression", "Cold Therapy", "EMS Training", "Metabolic Testing"],
  },
  {
    id: "brain-performance-centre",
    name: "The Brain & Performance Centre",
    tagline: "Neurofeedback & cognitive optimization",
    description:
      "Neurofeedback, brain mapping (qEEG), transcranial stimulation, and cognitive performance programs for focus, stress, sleep, and mental clarity.",
    location: "Dubai Healthcare City",
    city: "Dubai",
    category: "Biohacking & Performance",
    website: "https://thebrainandperformancecentre.com/",
    services: ["Neurofeedback", "Brain Mapping", "Transcranial Stimulation", "Cognitive Training", "Sleep Optimization"],
  },
  {
    id: "cryo-dubai",
    name: "CRYO",
    tagline: "The original whole-body cryotherapy brand",
    description:
      "Full-body and localized cryotherapy, CryoFacials, infrared sauna, and compression therapy. One of the first dedicated cryo studios in the UAE.",
    location: "Jumeirah 1",
    city: "Dubai",
    category: "Biohacking & Performance",
    website: "https://cryo.ae/",
    services: ["Full-Body Cryo", "Localized Cryo", "CryoFacials", "Infrared Sauna", "Compression Therapy"],
  },

  // ─── Holistic & Healing (4 more) ───
  {
    id: "santhigiri",
    name: "Santhigiri Holistic Health Center",
    tagline: "Traditional Ayurveda & Siddha medicine",
    description:
      "Authentic Panchakarma, Siddha treatments, yoga therapy, and Ayurvedic consultations led by practitioners from the renowned Santhigiri Ashram in Kerala.",
    location: "Al Karama",
    city: "Dubai",
    category: "Holistic & Healing",
    website: "https://santhigiriholistic.com/",
    services: ["Panchakarma", "Siddha Medicine", "Yoga Therapy", "Ayurvedic Consults"],
  },
  {
    id: "dubai-herbal-treatment",
    name: "Dubai Herbal & Treatment Centre",
    tagline: "Government-licensed alternative medicine since 2002",
    description:
      "One of Dubai's first licensed herbal medicine centers. Offering naturopathy, homeopathy, herbal medicine, hijama (cupping), and acupuncture.",
    location: "Jumeirah, Beach Road",
    city: "Dubai",
    category: "Holistic & Healing",
    website: "https://dubaihtc.com/",
    featured: true,
    services: ["Naturopathy", "Homeopathy", "Herbal Medicine", "Hijama (Cupping)", "Acupuncture"],
  },
  {
    id: "keyani-wellness",
    name: "Keyani Wellness",
    tagline: "Energy healing & holistic coaching",
    description:
      "Reiki master sessions, crystal healing, chakra balancing, emotional freedom technique (EFT), and one-on-one holistic life coaching.",
    location: "Jumeirah Lake Towers (JLT)",
    city: "Dubai",
    category: "Holistic & Healing",
    website: "https://keyaniwellness.com/",
    services: ["Reiki", "Crystal Healing", "Chakra Balancing", "EFT", "Life Coaching"],
  },
  {
    id: "sohum-wellness",
    name: "Sohum Wellness Sanctuary",
    tagline: "Mind-body healing in a serene sanctuary",
    description:
      "Sound baths, guided meditation, breathwork circles, Reiki, and therapeutic yoga in a purpose-built healing space designed for deep restoration.",
    location: "Al Wasl Road",
    city: "Dubai",
    category: "Holistic & Healing",
    website: "https://sohumwellness.com/",
    services: ["Sound Baths", "Meditation", "Breathwork", "Reiki", "Therapeutic Yoga"],
  },

  // ─── Yoga & Movement (4 more) ───
  {
    id: "bodytree-studio",
    name: "Bodytree Studio",
    tagline: "Abu Dhabi's premier yoga & Pilates studio",
    description:
      "Yoga, Pilates, barre, and movement classes in a beautiful, community-focused studio. Also offers teacher training, workshops, and wellness events.",
    location: "Al Manhal",
    city: "Abu Dhabi",
    category: "Yoga & Movement",
    website: "https://bodytreestudio.com/",
    featured: true,
    services: ["Yoga", "Pilates", "Barre", "Teacher Training", "Wellness Workshops"],
  },
  {
    id: "aura-wellness",
    name: "Aura Wellness",
    tagline: "Yoga, meditation & holistic movement",
    description:
      "Vinyasa, Hatha, Yin yoga, and meditation with a focus on mindfulness and self-care. Offers private sessions, corporate programs, and outdoor events.",
    location: "Business Bay",
    city: "Dubai",
    category: "Yoga & Movement",
    website: "https://aurawellness.ae/",
    services: ["Vinyasa", "Hatha Yoga", "Yin Yoga", "Meditation", "Private Sessions"],
  },
  {
    id: "dhyana-dubai",
    name: "Dhyana Dubai",
    tagline: "Premium hot yoga & infrared studio",
    description:
      "Hot yoga, infrared-heated classes, cold plunge recovery, and sound healing in a state-of-the-art studio with heated and non-heated rooms.",
    location: "Al Quoz",
    city: "Dubai",
    category: "Yoga & Movement",
    website: "https://dhyanadubai.com/",
    services: ["Hot Yoga", "Infrared Classes", "Cold Plunge", "Sound Healing"],
  },
  {
    id: "seven-wellness",
    name: "Seven Wellness",
    tagline: "Yoga, fitness & mindful movement hub",
    description:
      "A multi-discipline studio offering yoga, functional fitness, Pilates, and breathwork in an intimate, community-driven setting.",
    location: "Palm Jumeirah",
    city: "Dubai",
    category: "Yoga & Movement",
    website: "https://sevenwellness.ae/",
    services: ["Yoga", "Functional Fitness", "Pilates", "Breathwork"],
  },

  // ─── Wellness Retreats & Spas (4 more) ───
  {
    id: "talise-ottoman-spa",
    name: "Talise Ottoman Spa",
    tagline: "World-class spa inside Jumeirah Zabeel Saray",
    description:
      "One of the largest spas in the Middle East with Turkish hammam, snow room, salt room, thalassotherapy pool, and over 40 signature treatments.",
    location: "West Crescent, Palm Jumeirah",
    city: "Dubai",
    category: "Wellness Retreats & Spas",
    website: "https://www.jumeirah.com/en/stay/dubai/jumeirah-zabeel-saray",
    featured: true,
    services: ["Turkish Hammam", "Snow Room", "Salt Room", "Thalassotherapy", "Signature Treatments"],
  },
  {
    id: "anantara-qasr-al-sarab",
    name: "Anantara Spa at Qasr Al Sarab",
    tagline: "Desert wellness in the Empty Quarter",
    description:
      "A luxury desert resort spa offering Arabian-inspired treatments, desert meditation, sunrise yoga, and wellness retreats surrounded by the dunes of Liwa.",
    location: "Liwa Desert, Empty Quarter",
    city: "Abu Dhabi",
    category: "Wellness Retreats & Spas",
    website: "https://www.anantara.com/en/qasr-al-sarab-abu-dhabi",
    services: ["Arabian Treatments", "Desert Meditation", "Sunrise Yoga", "Wellness Retreats"],
  },
  {
    id: "heart-soul-spa",
    name: "Heart & Soul Spa",
    tagline: "Boutique wellness spa with healing focus",
    description:
      "A boutique spa combining massage therapy, aromatherapy, reflexology, and energy healing with personalized wellness consultations.",
    location: "Dubai Marina",
    city: "Dubai",
    category: "Wellness Retreats & Spas",
    website: "https://heartandsoul.ae/",
    services: ["Massage Therapy", "Aromatherapy", "Reflexology", "Energy Healing", "Wellness Consults"],
  },
  {
    id: "plume-studio",
    name: "Plume Studio",
    tagline: "Wellness lounge for mind-body restoration",
    description:
      "Float therapy, infrared sauna, cold plunge, compression therapy, and guided relaxation in a modern wellness lounge designed for urban recovery.",
    location: "City Walk",
    city: "Dubai",
    category: "Wellness Retreats & Spas",
    website: "https://plumestudio.ae/",
    services: ["Float Therapy", "Infrared Sauna", "Cold Plunge", "Compression Therapy", "Guided Relaxation"],
  },
];
