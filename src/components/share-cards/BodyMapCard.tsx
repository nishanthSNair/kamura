import CardBranding from "./CardBranding";

interface BodyMapTreatment {
  rank: number;
  name: string;
  kamuraScore: number;
}

interface BodyMapCardProps {
  zones: { icon: string; label: string }[];
  concernCount: number;
  topTreatments: BodyMapTreatment[];
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? "#4ADE80" : score >= 60 ? "#FACC15" : score >= 40 ? "#FB923C" : "#F87171";
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "rgba(255,255,255,0.15)",
      borderRadius: 999,
      padding: "6px 16px",
    }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
      <span style={{ fontSize: 18, fontWeight: 600, color: "#FAF7F2", fontFamily: "Inter, sans-serif" }}>
        {score}
      </span>
    </div>
  );
}

export default function BodyMapCard({ zones, concernCount, topTreatments }: BodyMapCardProps) {
  const zoneText = zones.map((z) => z.label).join(" & ");
  const zoneIcons = zones.map((z) => z.icon).join(" ");

  return (
    <div
      style={{
        width: 1080,
        height: 1350,
        background: "linear-gradient(170deg, #2A3524 0%, #1a2518 40%, #0f1a0d 100%)",
        display: "flex",
        flexDirection: "column",
        padding: "80px 72px 40px",
        fontFamily: "Inter, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle glow */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(123,141,104,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div style={{ position: "relative", zIndex: 1, marginBottom: 48 }}>
        <p style={{
          fontSize: 18,
          letterSpacing: "0.35em",
          textTransform: "uppercase" as const,
          color: "#B0BCA4",
          fontWeight: 500,
          marginBottom: 20,
        }}>
          Kamura Wellness Checker
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
          <span style={{ fontSize: 48 }}>{zoneIcons}</span>
        </div>

        <h1 style={{
          fontSize: 52,
          fontFamily: "Playfair Display, serif",
          fontWeight: 700,
          color: "#FAF7F2",
          lineHeight: 1.15,
          marginBottom: 12,
        }}>
          Your {zoneText} Protocol
        </h1>

        <p style={{
          fontSize: 18,
          color: "rgba(250,247,242,0.5)",
        }}>
          {topTreatments.length} evidence-based treatments selected from {concernCount} concern{concernCount !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Treatment list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1, position: "relative", zIndex: 1 }}>
        {topTreatments.map((t) => (
          <div
            key={t.rank}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              padding: "18px 24px",
              background: "rgba(255,255,255,0.06)",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#B0BCA4",
              width: 32,
              textAlign: "center",
              fontFamily: "Inter, sans-serif",
            }}>
              #{t.rank}
            </span>
            <span style={{
              flex: 1,
              fontSize: 22,
              fontWeight: 500,
              color: "#FAF7F2",
            }}>
              {t.name}
            </span>
            <ScoreBadge score={t.kamuraScore} />
          </div>
        ))}
      </div>

      {/* CTA */}
      <p style={{
        textAlign: "center",
        fontSize: 16,
        color: "rgba(250,247,242,0.35)",
        marginTop: 32,
        fontStyle: "italic",
        position: "relative",
        zIndex: 1,
      }}>
        Personalized by KAMURA Wellness Checker
      </p>

      {/* Footer */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <CardBranding variant="light" url="kamuralife.com/wellness-checker" />
      </div>
    </div>
  );
}
