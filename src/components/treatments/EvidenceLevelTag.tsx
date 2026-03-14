import type { EvidenceLevel } from "@/data/treatments";
import { getEvidenceLevelColor } from "@/data/treatments";

interface EvidenceLevelTagProps {
  level: EvidenceLevel;
}

export default function EvidenceLevelTag({ level }: EvidenceLevelTagProps) {
  const colors = getEvidenceLevelColor(level);

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide ${colors.bg} ${colors.text}`}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "currentColor" }} />
      {level}
    </span>
  );
}
