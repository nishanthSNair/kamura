interface Props {
  score: number;
  size?: "sm" | "md";
}

// Kamura Score tier mapping
function getTier(score: number): { name: string; className: string } {
  if (score >= 80) return { name: "Gold", className: "bg-amber-50 text-amber-700 border-amber-200" };
  if (score >= 65) return { name: "Strong", className: "bg-emerald-50 text-emerald-700 border-emerald-200" };
  if (score >= 50) return { name: "Promising", className: "bg-sky-50 text-sky-700 border-sky-200" };
  if (score >= 35) return { name: "Limited", className: "bg-orange-50 text-orange-700 border-orange-200" };
  return { name: "Anecdotal", className: "bg-gray-100 text-gray-600 border-gray-200" };
}

export default function ScoreTierPill({ score, size = "md" }: Props) {
  const tier = getTier(score);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-sans font-semibold ${tier.className} ${
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]"
      }`}
      title={`Kamura Score ${score} — ${tier.name} tier`}
    >
      <span>Kamura {score}</span>
      <span className="opacity-50">·</span>
      <span className="tracking-wide">{tier.name}</span>
    </span>
  );
}
