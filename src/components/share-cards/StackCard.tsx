import CardBranding from "./CardBranding";

interface StackTreatment {
  name: string;
  kamuraScore: number;
  timing: "morning" | "evening" | "as-needed";
}

interface StackCardProps {
  treatments: StackTreatment[];
  averageScore: number;
}

const timingConfig = {
  morning: { label: "Morning", icon: "☀️" },
  evening: { label: "Evening", icon: "🌙" },
  "as-needed": { label: "As Needed", icon: "⚡" },
} as const;

function ScoreDot({ score }: { score: number }) {
  const color = score >= 80 ? "#4ADE80" : score >= 60 ? "#FACC15" : score >= 40 ? "#FB923C" : "#F87171";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 10, height: 10, borderRadius: "50%", background: color }} />
      <span style={{ fontSize: 20, fontWeight: 600, color: "#2A2520", fontFamily: "Inter, sans-serif" }}>
        {score}
      </span>
    </div>
  );
}

export default function StackCard({ treatments, averageScore }: StackCardProps) {
  const grouped = {
    morning: treatments.filter((t) => t.timing === "morning"),
    evening: treatments.filter((t) => t.timing === "evening"),
    "as-needed": treatments.filter((t) => t.timing === "as-needed"),
  };

  const timingOrder: (keyof typeof grouped)[] = ["morning", "evening", "as-needed"];
  const nonEmptyGroups = timingOrder.filter((t) => grouped[t].length > 0);

  return (
    <div
      style={{
        width: 1080,
        height: 1350,
        background: "linear-gradient(180deg, #FAF7F2 0%, #F5F2ED 100%)",
        display: "flex",
        flexDirection: "column",
        padding: "80px 72px 40px",
        fontFamily: "Inter, sans-serif",
        position: "relative",
      }}
    >
      {/* Header */}
      <p style={{
        fontSize: 18,
        letterSpacing: "0.35em",
        textTransform: "uppercase" as const,
        color: "#B5886A",
        fontWeight: 600,
        marginBottom: 12,
      }}>
        My Wellness Stack
      </p>
      <h1 style={{
        fontSize: 48,
        fontFamily: "Playfair Display, serif",
        fontWeight: 700,
        color: "#2A2520",
        lineHeight: 1.15,
        marginBottom: 48,
      }}>
        {treatments.length} Treatment{treatments.length !== 1 ? "s" : ""} I Use
      </h1>

      {/* Treatment groups */}
      <div style={{ display: "flex", flexDirection: "column", gap: 32, flex: 1 }}>
        {nonEmptyGroups.map((timing) => (
          <div key={timing}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
              paddingBottom: 8,
              borderBottom: "1px solid rgba(42,37,32,0.08)",
            }}>
              <span style={{ fontSize: 22 }}>{timingConfig[timing].icon}</span>
              <span style={{
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                color: "#7B8D68",
              }}>
                {timingConfig[timing].label}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {grouped[timing].map((t) => (
                <div
                  key={t.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 20px",
                    background: "rgba(255,255,255,0.7)",
                    borderRadius: 12,
                  }}
                >
                  <span style={{ fontSize: 22, fontWeight: 500, color: "#2A2520" }}>
                    {t.name}
                  </span>
                  <ScoreDot score={t.kamuraScore} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Average score bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#2A2520",
        borderRadius: 16,
        padding: "20px 28px",
        marginTop: 32,
      }}>
        <div>
          <p style={{ fontSize: 14, color: "rgba(250,247,242,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>
            Average Kamura Score
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontSize: 36, fontWeight: 700, color: "#FAF7F2", fontFamily: "Playfair Display, serif" }}>
            {averageScore.toFixed(1)}
          </span>
          <span style={{ fontSize: 16, color: "rgba(250,247,242,0.5)" }}>/100</span>
        </div>
      </div>

      {/* CTA */}
      <p style={{
        textAlign: "center",
        fontSize: 16,
        color: "rgba(42,37,32,0.4)",
        marginTop: 24,
        fontStyle: "italic",
      }}>
        Build yours at kamuralife.com
      </p>

      {/* Footer */}
      <CardBranding variant="dark" />
    </div>
  );
}
