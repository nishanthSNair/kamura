interface RadarChartProps {
  dimensions: { label: string; score: number }[];
  color?: string;
  size?: number;
}

export default function RadarChart({
  dimensions,
  color = "#B5886A",
  size = 400,
}: RadarChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.38;
  const labelRadius = size * 0.48;
  const n = dimensions.length;

  const getPoint = (index: number, value: number) => {
    const angle = (index * 2 * Math.PI) / n - Math.PI / 2;
    const r = (value / 100) * radius;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const getLabelPoint = (index: number) => {
    const angle = (index * 2 * Math.PI) / n - Math.PI / 2;
    return { x: cx + labelRadius * Math.cos(angle), y: cy + labelRadius * Math.sin(angle) };
  };

  // Grid levels
  const gridLevels = [25, 50, 75, 100];

  const gridPolygons = gridLevels.map((level) => {
    const points = Array.from({ length: n }, (_, i) => {
      const p = getPoint(i, level);
      return `${p.x},${p.y}`;
    }).join(" ");
    return points;
  });

  // Data polygon
  const dataPoints = dimensions
    .map((d, i) => {
      const p = getPoint(i, d.score);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  // Axis lines
  const axisLines = Array.from({ length: n }, (_, i) => {
    const p = getPoint(i, 100);
    return { x1: cx, y1: cy, x2: p.x, y2: p.y };
  });

  // Short labels for card readability
  const shortLabels: Record<string, string> = {
    "Sleep & Recovery": "Sleep",
    "Nutrition": "Nutrition",
    "Movement": "Movement",
    "Stress & Mind": "Stress",
    "Mindfulness": "Mindful",
    "Social Connection": "Social",
    "Biohacking": "Biohack",
    "Purpose": "Purpose",
  };

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Grid polygons */}
      {gridPolygons.map((points, i) => (
        <polygon
          key={i}
          points={points}
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={i === gridLevels.length - 1 ? 1.5 : 0.8}
        />
      ))}

      {/* Axis lines */}
      {axisLines.map((line, i) => (
        <line key={i} {...line} stroke="rgba(255,255,255,0.1)" strokeWidth={0.8} />
      ))}

      {/* Data polygon */}
      <polygon
        points={dataPoints}
        fill={color}
        fillOpacity={0.25}
        stroke={color}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />

      {/* Data points */}
      {dimensions.map((d, i) => {
        const p = getPoint(i, d.score);
        return <circle key={i} cx={p.x} cy={p.y} r={4} fill={color} />;
      })}

      {/* Labels */}
      {dimensions.map((d, i) => {
        const p = getLabelPoint(i);
        const anchor =
          Math.abs(p.x - cx) < 5 ? "middle" : p.x > cx ? "start" : "end";
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor={anchor}
            dominantBaseline="middle"
            fill="rgba(255,255,255,0.8)"
            fontSize={13}
            fontFamily="Inter, sans-serif"
            fontWeight={500}
          >
            {shortLabels[d.label] || d.label}
          </text>
        );
      })}
    </svg>
  );
}
