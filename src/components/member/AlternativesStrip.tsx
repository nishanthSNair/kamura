import Link from "next/link";
import { getTreatmentBySlug } from "@/data/treatments";
import ScoreTierPill from "@/components/member/ScoreTierPill";

interface Props {
  treatmentSlug: string;
}

export default function AlternativesStrip({ treatmentSlug }: Props) {
  const treatment = getTreatmentBySlug(treatmentSlug);
  if (!treatment) return null;

  const alternatives = (treatment.relatedSlugs || [])
    .map((slug) => getTreatmentBySlug(slug))
    .filter((t): t is NonNullable<typeof t> => t !== undefined)
    .slice(0, 3);

  if (alternatives.length === 0) return null;

  return (
    <div className="mt-3 pt-3 border-t border-gray-100">
      <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans font-semibold mb-2">
        Similar treatments
      </p>
      <div className="flex flex-wrap gap-2">
        {alternatives.map((alt) => (
          <Link
            key={alt.slug}
            href={`/treatments/${alt.slug}`}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white hover:border-terracotta/40 transition-colors group"
          >
            <span className="text-xs font-sans text-gray-700 group-hover:text-terracotta">
              {alt.name}
            </span>
            <ScoreTierPill score={alt.kamuraScore} size="sm" />
          </Link>
        ))}
        <Link
          href={`/treatments/${treatmentSlug}`}
          className="inline-flex items-center text-[10px] tracking-[0.15em] uppercase text-terracotta font-sans font-semibold px-2 py-1.5"
        >
          Compare →
        </Link>
      </div>
    </div>
  );
}
