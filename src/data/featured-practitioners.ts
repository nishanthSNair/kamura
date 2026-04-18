// Dummy / seed practitioners to populate the discover page and homepage.
// Replace as real Supabase providers come online — public profiles live at
// /provider/[slug] and will match by slug once they sign up.

export interface FeaturedPractitioner {
  slug: string;                       // maps to /provider/[slug] eventually
  name: string;
  specialty: string;
  city: string;
  tags: string[];
  imageUrl: string;
  rating: number;                     // 4.0 – 5.0
  reviewCount: number;
  startingPriceAed: number;
  verified: boolean;
  bio: string;
}

export const FEATURED_PRACTITIONERS: FeaturedPractitioner[] = [
  {
    slug: "dr-maya-sharma",
    name: "Dr. Maya Sharma",
    specialty: "Longevity MD",
    city: "Dubai",
    tags: ["Peptide protocols", "GLP-1", "Hormones"],
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
    rating: 4.9,
    reviewCount: 220,
    startingPriceAed: 950,
    verified: true,
    bio: "12 years clinical. Specializes in peptide protocols for recovery and healthspan.",
  },
  {
    slug: "dr-ahmed-al-maktoum",
    name: "Dr. Ahmed Al Maktoum",
    specialty: "Sports Medicine",
    city: "Abu Dhabi",
    tags: ["TB-500", "BPC-157", "Recovery"],
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80",
    rating: 4.8,
    reviewCount: 156,
    startingPriceAed: 1200,
    verified: true,
    bio: "Team physician, UAE national track. Focus on injury recovery and return to sport.",
  },
  {
    slug: "dr-elena-vasquez",
    name: "Dr. Elena Vasquez",
    specialty: "Metabolic Health",
    city: "Virtual",
    tags: ["Tirzepatide", "Semaglutide", "GLP-1"],
    imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=80",
    rating: 4.9,
    reviewCount: 412,
    startingPriceAed: 920,
    verified: true,
    bio: "Board-certified endocrinologist. GLP-1 protocols for sustainable metabolic change.",
  },
  {
    slug: "layla-farhan",
    name: "Layla Farhan",
    specialty: "Functional Nutrition",
    city: "Dubai Marina",
    tags: ["Gut health", "Fasting", "Elimination diets"],
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
    rating: 4.8,
    reviewCount: 98,
    startingPriceAed: 650,
    verified: true,
    bio: "Registered nutritionist. Root-cause approach to metabolic and digestive health.",
  },
  {
    slug: "dr-omar-rashid",
    name: "Dr. Omar Rashid",
    specialty: "Regenerative Medicine",
    city: "Dubai Healthcare City",
    tags: ["Stem cell", "PRP", "Exosomes"],
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
    rating: 4.7,
    reviewCount: 143,
    startingPriceAed: 1800,
    verified: true,
    bio: "Orthopedic specialist focused on joint regeneration, PRP, and exosome therapy.",
  },
  {
    slug: "dr-priya-nair",
    name: "Dr. Priya Nair",
    specialty: "Ayurveda & Integrative",
    city: "JBR",
    tags: ["Panchakarma", "Stress", "Hormonal"],
    imageUrl: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
    rating: 4.9,
    reviewCount: 267,
    startingPriceAed: 550,
    verified: true,
    bio: "Integrative medicine with 18 years in panchakarma and women's hormonal health.",
  },
];
