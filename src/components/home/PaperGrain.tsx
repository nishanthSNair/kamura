/**
 * SVG fractal-noise paper-grain overlay. Drop inside any relatively-positioned
 * section to add subtle paper texture — multiplies into the underlying color
 * so cream sections take on a hand-pressed quality without a flat-poster feel.
 *
 *   <section className="relative ...">
 *     <PaperGrain />
 *     {children}
 *   </section>
 */
export default function PaperGrain({
  opacity = 0.07,
  className = "",
}: {
  opacity?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`absolute inset-0 pointer-events-none mix-blend-multiply ${className}`}
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.16 0 0 0 0 0.14 0 0 0 0 0.13 0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
        backgroundSize: "240px 240px",
      }}
    />
  );
}
