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

export const listings: Listing[] = listingsData.listings as Listing[];
