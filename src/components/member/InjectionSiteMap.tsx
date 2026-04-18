interface DoseLogWithSite {
  injection_site: string;
  logged_at: string;
}

interface Props {
  recentLogs: DoseLogWithSite[];
  recommendedRestDays?: number; // days a site needs before being "fresh" again
}

// Zone definitions with SVG coordinates on a 240x360 front/back body silhouette
const ZONES: {
  id: string;
  label: string;
  // ellipse center + radius for hit area
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}[] = [
  { id: "abdomen-left", label: "Abdomen L", cx: 106, cy: 175, rx: 18, ry: 14 },
  { id: "abdomen-right", label: "Abdomen R", cx: 134, cy: 175, rx: 18, ry: 14 },
  { id: "thigh-left", label: "Thigh L", cx: 102, cy: 245, rx: 14, ry: 22 },
  { id: "thigh-right", label: "Thigh R", cx: 138, cy: 245, rx: 14, ry: 22 },
  { id: "arm-left", label: "Arm L", cx: 62, cy: 125, rx: 10, ry: 18 },
  { id: "arm-right", label: "Arm R", cx: 178, cy: 125, rx: 10, ry: 18 },
];

// Map log's injection_site TEXT to a zone id. Accepts formats like "Abdomen L", "abdomen-left", etc.
function siteTextToZone(text: string): string | null {
  const t = text.toLowerCase().trim();
  if (!t) return null;
  if (t.includes("abdomen") && (t.includes("l") || t.includes("left"))) return "abdomen-left";
  if (t.includes("abdomen") && (t.includes("r") || t.includes("right"))) return "abdomen-right";
  if (t.includes("thigh") && (t.includes("l") || t.includes("left"))) return "thigh-left";
  if (t.includes("thigh") && (t.includes("r") || t.includes("right"))) return "thigh-right";
  if (t.includes("arm") && (t.includes("l") || t.includes("left"))) return "arm-left";
  if (t.includes("arm") && (t.includes("r") || t.includes("right"))) return "arm-right";
  return null;
}

export default function InjectionSiteMap({
  recentLogs,
  recommendedRestDays = 3,
}: Props) {
  // For each zone, find most recent log date
  const zoneLastUsed: Record<string, Date | null> = {};
  ZONES.forEach((z) => (zoneLastUsed[z.id] = null));

  recentLogs.forEach((log) => {
    const z = siteTextToZone(log.injection_site);
    if (!z) return;
    const d = new Date(log.logged_at);
    const cur = zoneLastUsed[z];
    if (!cur || d > cur) zoneLastUsed[z] = d;
  });

  const now = new Date();
  const zoneStatus = (zoneId: string): { fill: string; border: string; daysAgo: number | null } => {
    const last = zoneLastUsed[zoneId];
    if (!last) return { fill: "#D6DDD0", border: "#B0BCA4", daysAgo: null };
    const daysAgo = Math.floor((now.getTime() - last.getTime()) / 86400000);
    if (daysAgo < recommendedRestDays) {
      // Too recent — resting
      return { fill: "#F1E2C2", border: "#D4A44C", daysAgo };
    }
    return { fill: "#D7E4D8", border: "#5A8D5E", daysAgo };
  };

  // Last-used zone id for highlight
  let mostRecentZone: string | null = null;
  let mostRecentDate: Date | null = null;
  Object.entries(zoneLastUsed).forEach(([id, d]) => {
    if (d && (!mostRecentDate || d > mostRecentDate)) {
      mostRecentZone = id;
      mostRecentDate = d;
    }
  });

  const nextSuggestion = [...ZONES].sort((a, b) => {
    const la = zoneLastUsed[a.id];
    const lb = zoneLastUsed[b.id];
    if (!la && !lb) return 0;
    if (!la) return -1;
    if (!lb) return 1;
    return la.getTime() - lb.getTime();
  })[0];

  return (
    <div className="mt-3 p-4 rounded-xl border border-gray-200 bg-[#FAF8F5]">
      <div className="flex items-baseline justify-between mb-2">
        <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans font-semibold">
          Injection sites
        </p>
        {nextSuggestion && (
          <p className="text-[10px] text-gray-500 font-sans">
            Next: <span className="text-terracotta font-semibold">{nextSuggestion.label}</span>
          </p>
        )}
      </div>

      <div className="flex items-start gap-4 flex-wrap">
        <svg
          viewBox="0 0 240 360"
          className="w-32 h-48 shrink-0"
          aria-label="Body map with injection sites"
        >
          {/* Simple body silhouette */}
          <g fill="#ECE7DB" stroke="#CFC7B3" strokeWidth="1">
            {/* Head */}
            <circle cx="120" cy="38" r="22" />
            {/* Neck */}
            <rect x="112" y="58" width="16" height="12" rx="3" />
            {/* Torso */}
            <path d="M 82 72 Q 82 70 90 70 L 150 70 Q 158 70 158 72 L 162 200 Q 162 204 158 204 L 82 204 Q 78 204 78 200 Z" />
            {/* Arms */}
            <path d="M 82 80 Q 60 82 55 105 L 56 160 Q 58 168 64 168 L 68 168 Q 72 166 72 160 L 72 105 Q 75 88 82 84 Z" />
            <path d="M 158 80 Q 180 82 185 105 L 184 160 Q 182 168 176 168 L 172 168 Q 168 166 168 160 L 168 105 Q 165 88 158 84 Z" />
            {/* Legs */}
            <path d="M 82 204 L 115 204 L 115 320 Q 115 326 110 326 L 94 326 Q 88 326 88 320 Z" />
            <path d="M 125 204 L 158 204 L 152 320 Q 152 326 146 326 L 130 326 Q 125 326 125 320 Z" />
          </g>

          {/* Injection zone hotspots */}
          {ZONES.map((z) => {
            const { fill, border, daysAgo } = zoneStatus(z.id);
            const isMostRecent = mostRecentZone === z.id;
            return (
              <g key={z.id}>
                <ellipse
                  cx={z.cx}
                  cy={z.cy}
                  rx={z.rx}
                  ry={z.ry}
                  fill={fill}
                  stroke={border}
                  strokeWidth={isMostRecent ? "2" : "1"}
                  opacity={daysAgo === null ? 0.5 : 0.85}
                />
                {isMostRecent && (
                  <circle
                    cx={z.cx}
                    cy={z.cy}
                    r="3"
                    fill="#B5736A"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Legend / zone list */}
        <div className="flex-1 min-w-[160px]">
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
            {ZONES.map((z) => {
              const { daysAgo } = zoneStatus(z.id);
              return (
                <div key={z.id} className="flex items-center gap-1.5 text-[10px] font-sans">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      daysAgo === null
                        ? "bg-sage"
                        : daysAgo < recommendedRestDays
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }`}
                  />
                  <span className="text-gray-600 truncate">{z.label}</span>
                  <span className="text-gray-400 ml-auto shrink-0">
                    {daysAgo === null
                      ? "—"
                      : daysAgo === 0
                      ? "today"
                      : `${daysAgo}d`}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-3 mt-3 text-[9px] font-sans text-gray-400">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              resting
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              ready
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-sage" />
              unused
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
