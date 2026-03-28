import Link from "next/link";

interface FeaturedClinic {
 id: string;
 name: string;
 tagline: string;
 location: string;
 city: string;
 category: string;
 services: string[];
}

interface FeaturedClinicsProps {
 clinics: FeaturedClinic[];
}

const CATEGORY_ACCENTS: Record<string, { bar: string; badge: string; text: string }> = {
 "Longevity Clinics": { bar: "bg-red-400/70", badge: "bg-red-50", text: "text-red-700" },
 "Biohacking & Performance": { bar: "bg-amber-400/70", badge: "bg-amber-50", text: "text-amber-700" },
 "Holistic & Healing": { bar: "bg-emerald-400/70", badge: "bg-emerald-50", text: "text-emerald-700" },
 "Yoga & Movement": { bar: "bg-purple-400/70", badge: "bg-purple-50", text: "text-purple-700" },
 "Wellness Retreats & Spas": { bar: "bg-rose-400/70", badge: "bg-rose-50", text: "text-rose-700" },
 "Nutrition & Supplements": { bar: "bg-lime-400/70", badge: "bg-lime-50", text: "text-lime-700" },
};

const DEFAULT_ACCENT = { bar: "bg-sage", badge: "bg-sage/10", text: "text-sage-dark" };

export default function FeaturedClinics({ clinics }: FeaturedClinicsProps) {
 return (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {clinics.map((clinic) => {
 const accent = CATEGORY_ACCENTS[clinic.category] || DEFAULT_ACCENT;
 return (
 <Link
 key={clinic.id}
 href={`/explore/${clinic.id}`}
 className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-sage/30 transition-all"
 >
 {/* Category accent bar */}
 <div className={`h-1 ${accent.bar}`} />
 <div className="p-6">
 <div className="flex items-start justify-between mb-2">
 <h3 className="font-sans font-semibold text-[15px] text-gray-900 leading-tight">
 {clinic.name}
 </h3>
 <svg
 xmlns="http://www.w3.org/2000/svg"
 width="16"
 height="16"
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="1.5"
 strokeLinecap="round"
 strokeLinejoin="round"
 className="text-gray-300 group-hover:text-sage transition-colors shrink-0 mt-0.5"
 >
 <polyline points="9 18 15 12 9 6" />
 </svg>
 </div>
 <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-sans mb-3 ${accent.badge} ${accent.text}`}>
 {clinic.category}
 </span>
 <p className="text-[13px] text-gray-500 font-sans leading-relaxed mb-3 line-clamp-2">
 {clinic.tagline}
 </p>
 <p className="text-[11px] text-gray-500 font-sans mb-3 flex items-center gap-1">
 <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
 <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
 <circle cx="12" cy="10" r="3" />
 </svg>
 {clinic.location}, {clinic.city}
 </p>
 <div className="flex flex-wrap gap-1.5">
 {clinic.services.slice(0, 3).map((service) => (
 <span
 key={service}
 className="text-[10px] px-2 py-0.5 rounded-full bg-zen-mist text-gray-500 font-sans"
 >
 {service}
 </span>
 ))}
 {clinic.services.length > 3 && (
 <span className="text-[10px] text-gray-500 font-sans self-center">
 +{clinic.services.length - 3} more
 </span>
 )}
 </div>
 </div>
 </Link>
 );
 })}
 </div>
 );
}
