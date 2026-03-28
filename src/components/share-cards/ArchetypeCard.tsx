import type { WellnessArchetype, WellnessDimension } from "@/data/quiz";
import RadarChart from "./RadarChart";
import CardBranding from "./CardBranding";

// Map archetype Tailwind classes to actual hex colors for inline styles
const archetypeColors: Record<WellnessArchetype, { bg: string; accent: string; text: string }> = {
  "The Biohacker": { bg: "#1a1a2e", accent: "#f59e0b", text: "#fef3c7" },
  "The Yogi": { bg: "#1a1028", accent: "#a855f7", text: "#f3e8ff" },
  "The Healer": { bg: "#0a1f1a", accent: "#10b981", text: "#d1fae5" },
  "The Explorer": { bg: "#1f0a1a", accent: "#f43f5e", text: "#ffe4e6" },
  "The Performer": { bg: "#0a1628", accent: "#3b82f6", text: "#dbeafe" },
};

interface ArchetypeCardProps {
  archetypeName: WellnessArchetype;
  tagline: string;
  scorePercent: number;
  scoreLabel: string;
  dimensionAverages: { dimension: WellnessDimension; score: number }[];
  traits: string[];
  secondaryArchetypeName: WellnessArchetype;
}

export default function ArchetypeCard({
  archetypeName,
  tagline,
  scorePercent,
  scoreLabel,
  dimensionAverages,
  traits,
  secondaryArchetypeName,
}: ArchetypeCardProps) {
  const colors = archetypeColors[archetypeName];

  // Ensure all 8 dimensions are represented for the radar chart
  const allDimensions: WellnessDimension[] = [
    "Sleep & Recovery", "Nutrition", "Movement", "Stress & Mind",
    "Mindfulness", "Social Connection", "Biohacking", "Purpose",
  ];
  const radarData = allDimensions.map((dim) => {
    const found = dimensionAverages.find((d) => d.dimension === dim);
    return { label: dim, score: found?.score ?? 50 };
  });

  // Score ring SVG parameters
  const ringSize = 100;
  const ringRadius = 40;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (scorePercent / 100) * ringCircumference;

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        background: `linear-gradient(170deg, ${colors.bg} 0%, ${colors.bg}ee 50%, ${colors.bg}dd 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "80px 60px 40px",
        fontFamily: "Inter, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.accent}15 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <p style={{
          fontSize: 18,
          letterSpacing: "0.35em",
          textTransform: "uppercase" as const,
          color: `${colors.accent}aa`,
          marginBottom: 24,
          fontWeight: 500,
        }}>
          Kamura Wellness Archetype
        </p>

        <h1 style={{
          fontSize: 72,
          fontFamily: "Playfair Display, serif",
          fontWeight: 700,
          color: colors.text,
          lineHeight: 1.1,
          marginBottom: 16,
        }}>
          {archetypeName}
        </h1>

        <p style={{
          fontSize: 24,
          fontStyle: "italic",
          color: `${colors.text}99`,
          marginBottom: 8,
        }}>
          &ldquo;{tagline}&rdquo;
        </p>
      </div>

      {/* Radar Chart */}
      <div style={{ margin: "40px 0 24px", position: "relative", zIndex: 1 }}>
        <RadarChart
          dimensions={radarData}
          color={colors.accent}
          size={480}
        />
      </div>

      {/* Score */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        marginBottom: 40,
        position: "relative",
        zIndex: 1,
      }}>
        <svg width={ringSize} height={ringSize} viewBox={`0 0 ${ringSize} ${ringSize}`}>
          <circle cx={ringSize / 2} cy={ringSize / 2} r={ringRadius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={6} />
          <circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={ringRadius}
            fill="none"
            stroke={colors.accent}
            strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray={ringCircumference}
            strokeDashoffset={ringOffset}
            transform={`rotate(-90 ${ringSize / 2} ${ringSize / 2})`}
          />
          <text x={ringSize / 2} y={ringSize / 2 - 4} textAnchor="middle" dominantBaseline="middle" fill={colors.text} fontSize={28} fontWeight={700} fontFamily="Inter, sans-serif">
            {scorePercent}
          </text>
          <text x={ringSize / 2} y={ringSize / 2 + 18} textAnchor="middle" fill={`${colors.text}88`} fontSize={11} fontFamily="Inter, sans-serif">
            /100
          </text>
        </svg>
        <div>
          <p style={{ fontSize: 28, fontWeight: 700, color: colors.text, fontFamily: "Playfair Display, serif" }}>
            {scoreLabel}
          </p>
          <p style={{ fontSize: 15, color: `${colors.text}77` }}>
            Wellness Score
          </p>
        </div>
      </div>

      {/* Traits */}
      <div style={{
        display: "flex",
        flexWrap: "wrap" as const,
        gap: 12,
        justifyContent: "center",
        marginBottom: 32,
        position: "relative",
        zIndex: 1,
      }}>
        {traits.map((trait) => (
          <span
            key={trait}
            style={{
              padding: "8px 20px",
              borderRadius: 999,
              fontSize: 16,
              fontWeight: 500,
              background: `${colors.accent}22`,
              color: colors.accent,
              border: `1px solid ${colors.accent}44`,
            }}
          >
            {trait}
          </span>
        ))}
      </div>

      {/* Secondary */}
      <p style={{
        fontSize: 16,
        color: `${colors.text}66`,
        fontStyle: "italic",
        position: "relative",
        zIndex: 1,
      }}>
        With a touch of {secondaryArchetypeName}
      </p>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Footer */}
      <div style={{ width: "100%", position: "relative", zIndex: 1 }}>
        <CardBranding variant="light" url="kamuralife.com/quiz" />
      </div>
    </div>
  );
}
