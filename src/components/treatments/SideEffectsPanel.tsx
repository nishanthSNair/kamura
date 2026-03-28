import type { SideEffects } from "@/data/treatments";

interface SideEffectsPanelProps {
 sideEffects?: SideEffects;
}

const severityConfig = [
 {
 key: "common" as const,
 label: "Common",
 dotColor: "bg-[#4ADE80]",
 pillBg: "bg-[#16A34A]/8",
 pillText: "text-[#16A34A]",
 pillBorder: "border-[#16A34A]/15",
 },
 {
 key: "rare" as const,
 label: "Rare",
 dotColor: "bg-[#FACC15]",
 pillBg: "bg-[#CA8A04]/8",
 pillText: "text-[#CA8A04]",
 pillBorder: "border-[#CA8A04]/15",
 },
 {
 key: "serious" as const,
 label: "Serious",
 dotColor: "bg-[#F87171]",
 pillBg: "bg-[#DC2626]/8",
 pillText: "text-[#DC2626]",
 pillBorder: "border-[#DC2626]/15",
 },
];

export default function SideEffectsPanel({ sideEffects }: SideEffectsPanelProps) {
 if (!sideEffects) return null;

 const hasAny =
 sideEffects.common.length > 0 ||
 sideEffects.rare.length > 0 ||
 sideEffects.serious.length > 0;

 if (!hasAny) return null;

 return (
 <section id="safety" className="scroll-mt-24">
 <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10">
 <h2 className="font-serif text-xl text-gray-900 mb-5 flex items-center gap-2.5">
 <svg
 width="20"
 height="20"
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="1.5"
 strokeLinecap="round"
 strokeLinejoin="round"
 className="text-gray-400"
 >
 <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
 <line x1="12" y1="9" x2="12" y2="13" />
 <line x1="12" y1="17" x2="12.01" y2="17" />
 </svg>
 Side Effects &amp; Safety
 </h2>

 <div className="grid md:grid-cols-3 gap-6">
 {severityConfig.map((severity) => {
 const items = sideEffects[severity.key];
 if (items.length === 0) return null;
 return (
 <div key={severity.key}>
 <div className="flex items-center gap-2 mb-3">
 <span className={`w-2 h-2 rounded-full ${severity.dotColor}`} />
 <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-sans">
 {severity.label}
 </span>
 <span className="text-[10px] text-gray-400 font-sans">
 ({items.length})
 </span>
 </div>
 <div className="flex flex-wrap gap-1.5">
 {items.map((item) => (
 <span
 key={item}
 className={`inline-block text-xs font-sans px-2.5 py-1 rounded-full border ${severity.pillBg} ${severity.pillText} ${severity.pillBorder}`}
 >
 {item}
 </span>
 ))}
 </div>
 </div>
 );
 })}
 </div>
 </div>
 </section>
 );
}
