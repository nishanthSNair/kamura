import listingsData from "../../content/data/listings.json";

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
  | "Wellness Retreats & Spas"
  | "Nutrition & Supplements"
  | "Padel & Racquet Sports"
  | "Gyms & Fitness Studios"
  | "Combat & Martial Arts"
  | "Outdoor & Adventure";

export const ALL_LISTING_CATEGORIES: ListingCategory[] = [
  "Longevity Clinics",
  "Biohacking & Performance",
  "Holistic & Healing",
  "Yoga & Movement",
  "Wellness Retreats & Spas",
  "Nutrition & Supplements",
  "Padel & Racquet Sports",
  "Gyms & Fitness Studios",
  "Combat & Martial Arts",
  "Outdoor & Adventure",
];

export const listingCategoryColors: Record<ListingCategory, { bg: string; text: string }> = {
  "Longevity Clinics": { bg: "bg-red-100", text: "text-red-700" },
  "Biohacking & Performance": { bg: "bg-amber-100", text: "text-amber-800" },
  "Holistic & Healing": { bg: "bg-emerald-100", text: "text-emerald-800" },
  "Yoga & Movement": { bg: "bg-purple-100", text: "text-purple-800" },
  "Wellness Retreats & Spas": { bg: "bg-rose-100", text: "text-rose-800" },
  "Nutrition & Supplements": { bg: "bg-lime-100", text: "text-lime-800" },
  "Padel & Racquet Sports": { bg: "bg-sky-100", text: "text-sky-700" },
  "Gyms & Fitness Studios": { bg: "bg-orange-100", text: "text-orange-700" },
  "Combat & Martial Arts": { bg: "bg-slate-100", text: "text-slate-700" },
  "Outdoor & Adventure": { bg: "bg-teal-100", text: "text-teal-700" },
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
  "Nutrition & Supplements":
    "Health food stores, bone broth kitchens, kombucha brewers, and specialty shops fueling Dubai's clean-eating and longevity community.",
  "Padel & Racquet Sports":
    "Dubai's fastest-growing racquet sport scene — padel courts, pickleball venues, and clubs offering coaching, leagues, and social play across the UAE.",
  "Gyms & Fitness Studios":
    "From boutique Pilates and cycling studios to powerlifting and CrossFit boxes — the best gyms and fitness studios in Dubai for every training style.",
  "Combat & Martial Arts":
    "Boxing gyms, MMA academies, Brazilian Jiu-Jitsu schools, and Muay Thai studios — train with world-class coaches across Dubai and the UAE.",
  "Outdoor & Adventure":
    "Surfing, diving, kayaking, rock climbing, trail running, and cycling — outdoor fitness and adventure experiences across Dubai, Hatta, and the UAE coastline.",
};

export const listings: Listing[] = listingsData.listings as Listing[];
