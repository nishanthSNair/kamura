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

export default function FeaturedClinics({ clinics }: FeaturedClinicsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {clinics.map((clinic) => (
        <Link
          key={clinic.id}
          href={`/explore/${clinic.id}`}
          className="group bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/[0.06] rounded-xl p-6 shadow-sm hover:shadow-md hover:border-terracotta/30 transition-all"
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-sans font-semibold text-[15px] text-gray-900 dark:text-[#F5F0EB] leading-tight">
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
              className="text-gray-300 dark:text-gray-600 group-hover:text-terracotta transition-colors shrink-0 mt-0.5"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
          <p className="text-[13px] text-gray-500 dark:text-[#A89F95] font-sans leading-relaxed mb-3 line-clamp-2">
            {clinic.tagline}
          </p>
          <p className="text-[11px] text-gray-400 dark:text-[#6B6560] font-sans mb-3">
            {clinic.location}, {clinic.city}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {clinic.services.slice(0, 3).map((service) => (
              <span
                key={service}
                className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-[#242424] text-gray-500 dark:text-[#A89F95] font-sans"
              >
                {service}
              </span>
            ))}
            {clinic.services.length > 3 && (
              <span className="text-[10px] text-gray-400 dark:text-[#6B6560] font-sans self-center">
                +{clinic.services.length - 3} more
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
