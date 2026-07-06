/**
 * Shared Kamura body model — single source of truth for the human-figure
 * geometry used by the blueprint silhouette, the wellness checker, and the
 * dashboard Impact view. All three render the same figure in a 200×400 viewBox.
 */

export const BODY_VIEWBOX = "0 0 200 400";

/** Zone ellipse geometry within the 200×400 viewBox. */
export const BODY_ZONE_GEOMETRY = {
  fullBody: [{ cx: 100, cy: 200, rx: 80, ry: 160 }],
  brain: [{ cx: 100, cy: 45, rx: 22, ry: 27 }],
  heart: [{ cx: 105, cy: 120, rx: 18, ry: 16 }],
  lungs: [
    { cx: 85, cy: 135, rx: 14, ry: 20 },
    { cx: 115, cy: 135, rx: 14, ry: 20 },
  ],
  gut: [{ cx: 100, cy: 190, rx: 25, ry: 30 }],
  muscles: [
    { cx: 42, cy: 150, rx: 10, ry: 25 },
    { cx: 158, cy: 150, rx: 10, ry: 25 },
    { cx: 80, cy: 320, rx: 10, ry: 40 },
    { cx: 120, cy: 320, rx: 10, ry: 40 },
  ],
} as const;

export type BodyModelZone = keyof typeof BODY_ZONE_GEOMETRY;

/** Line-art outline of the figure (head, neck, torso, arms, legs). */
export default function BodyOutline({
  className = "stroke-gray-400",
  strokeWidth = 1.5,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <g
      fill="none"
      className={className}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Head */}
      <ellipse cx="100" cy="45" rx="25" ry="30" />
      {/* Neck */}
      <line x1="92" y1="74" x2="92" y2="90" />
      <line x1="108" y1="74" x2="108" y2="90" />
      {/* Torso */}
      <path d="M70 90 Q65 130 65 170 Q65 210 75 240 L75 250 L125 250 L125 240 Q135 210 135 170 Q135 130 130 90 Z" />
      {/* Left arm */}
      <path d="M70 95 Q45 110 35 145 Q30 160 28 180" />
      {/* Right arm */}
      <path d="M130 95 Q155 110 165 145 Q170 160 172 180" />
      {/* Left leg */}
      <path d="M80 250 Q78 300 75 340 Q74 360 70 380" />
      {/* Right leg */}
      <path d="M120 250 Q122 300 125 340 Q126 360 130 380" />
    </g>
  );
}
