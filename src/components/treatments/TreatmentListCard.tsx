import Link from "next/link";
import Image from "next/image";
import { type Treatment } from "@/data/treatments";
import KamuraScoreBadge from "./KamuraScoreBadge";
import EvidenceLevelTag from "./EvidenceLevelTag";

interface TreatmentListCardProps {
  treatment: Treatment;
  showCategory?: boolean;
}

export default function TreatmentListCard({
  treatment: t,
  showCategory = true,
}: TreatmentListCardProps) {
  return (
    <Link
      href={`/treatments/${t.slug}`}
      className="group bg-white dark:bg-[#1C1815] border border-gray-200 dark:border-white/[0.06] rounded-xl overflow-hidden hover:border-sage/40 hover:shadow-lg transition-all"
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={t.imageUrl}
          alt={t.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Score Badge overlay */}
        <div className="absolute top-3 right-3">
          <KamuraScoreBadge score={t.kamuraScore} size="sm" />
        </div>

        {/* Category badge overlay */}
        {showCategory && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2.5 py-1 bg-black/40 backdrop-blur-sm rounded-full text-[11px] font-semibold text-white/90 font-sans">
              {t.category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start gap-2 mb-2">
          <span className="text-lg">{t.icon}</span>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-[15px] text-gray-900 dark:text-[#F0EBE2] font-sans truncate">
              {t.name}
            </h3>
            {t.fullName !== t.name && (
              <p className="text-[11px] text-gray-500 dark:text-[#6B6358] font-sans truncate">
                {t.fullName}
              </p>
            )}
          </div>
        </div>

        <p className="text-xs text-gray-500 dark:text-[#A89F90] font-sans leading-relaxed mb-3 line-clamp-2">
          {t.description}
        </p>

        <div className="flex items-center gap-2 flex-wrap mb-3">
          <EvidenceLevelTag level={t.evidenceLevel} />
          <span className="text-[11px] text-gray-500 dark:text-[#6B6358] font-sans">
            {t.studyCount}+ studies
          </span>
          <span className="text-gray-300 dark:text-gray-600">&bull;</span>
          <span className="text-[11px] text-gray-500 dark:text-[#6B6358] font-sans">
            {t.community.positivePercent}% positive
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {t.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-zen-mist dark:bg-forest/20 text-[10px] text-gray-500 dark:text-gray-400 rounded-full font-sans"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
