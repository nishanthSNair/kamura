import { listings, type Listing } from "./listings";

export interface Area {
  slug: string;
  name: string;
  city: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  matchCity?: string;
  matchKeywords: string[];
}

export const areas: Area[] = [
  {
    slug: "dubai",
    name: "Dubai",
    city: "Dubai",
    description:
      "Dubai is the UAE's wellness capital — home to world-class longevity clinics, biohacking studios, holistic centers, and luxury retreats. Explore our curated directory of the best wellness destinations across the city.",
    seoTitle: "Best Wellness Centers in Dubai — KAMURA Directory",
    seoDescription:
      "Discover the best longevity clinics, biohacking studios, yoga studios, and wellness retreats in Dubai. Curated and reviewed by KAMURA.",
    matchCity: "Dubai",
    matchKeywords: [],
  },
  {
    slug: "abu-dhabi",
    name: "Abu Dhabi",
    city: "Abu Dhabi",
    description:
      "Abu Dhabi's wellness scene is growing rapidly, with a focus on traditional healing, integrative medicine, and mindful movement. Discover the capital's finest wellness spaces.",
    seoTitle: "Best Wellness Centers in Abu Dhabi — KAMURA Directory",
    seoDescription:
      "Explore top wellness centers, yoga studios, and holistic healing centers in Abu Dhabi. Curated by KAMURA.",
    matchCity: "Abu Dhabi",
    matchKeywords: [],
  },
  {
    slug: "dubai-marina",
    name: "Dubai Marina",
    city: "Dubai",
    description:
      "Dubai Marina is a hotspot for biohacking and fitness, with top studios offering cryotherapy, red light therapy, yoga, and performance optimization against stunning waterfront views.",
    seoTitle: "Wellness in Dubai Marina — KAMURA Directory",
    seoDescription:
      "Find biohacking studios, yoga classes, and wellness centers in Dubai Marina. Curated by KAMURA.",
    matchKeywords: ["marina"],
  },
  {
    slug: "palm-jumeirah",
    name: "Palm Jumeirah",
    city: "Dubai",
    description:
      "Palm Jumeirah is home to some of the UAE's most luxurious wellness destinations — from five-star wellness resorts to cutting-edge longevity clinics inside world-class hotels.",
    seoTitle: "Wellness on Palm Jumeirah — KAMURA Directory",
    seoDescription:
      "Discover luxury wellness resorts, longevity clinics, and spa experiences on Palm Jumeirah, Dubai.",
    matchKeywords: ["palm jumeirah"],
  },
  {
    slug: "jlt",
    name: "Jumeirah Lake Towers (JLT)",
    city: "Dubai",
    description:
      "JLT has become a wellness hub with diverse offerings from holistic healing centers to advanced hyperbaric oxygen therapy clinics, all within easy reach of Dubai Marina.",
    seoTitle: "Wellness Centers in JLT Dubai — KAMURA Directory",
    seoDescription:
      "Explore holistic centers, biohacking clinics, and wellness spaces in JLT, Dubai. Curated by KAMURA.",
    matchKeywords: ["jlt", "jumeirah lake towers"],
  },
  {
    slug: "al-quoz",
    name: "Al Quoz",
    city: "Dubai",
    description:
      "Al Quoz — home to Alserkal Avenue and Dubai's creative district — is also a growing wellness destination with boutique yoga studios and holistic spaces.",
    seoTitle: "Wellness in Al Quoz Dubai — KAMURA Directory",
    seoDescription:
      "Find yoga studios, holistic healing spaces, and wellness centers in Al Quoz, Dubai's creative district.",
    matchKeywords: ["al quoz", "alserkal"],
  },
  {
    slug: "jumeirah",
    name: "Jumeirah",
    city: "Dubai",
    description:
      "The Jumeirah district is synonymous with luxury and well-being, home to integrative clinics, Ayurvedic centers, and beachfront wellness experiences along Dubai's iconic coastline.",
    seoTitle: "Wellness in Jumeirah Dubai — KAMURA Directory",
    seoDescription:
      "Discover wellness clinics, healing centers, and spa experiences in Jumeirah, Dubai. Curated by KAMURA.",
    matchKeywords: ["jumeirah"],
  },
];

export function getListingsForArea(area: Area): Listing[] {
  return listings.filter((listing) => {
    // Match by city if specified
    if (area.matchCity) {
      return listing.city === area.matchCity;
    }
    // Match by keywords in location field
    const loc = listing.location.toLowerCase();
    return area.matchKeywords.some((kw) => loc.includes(kw.toLowerCase()));
  });
}
