/**
 * Skeleton — single reusable shimmer block.
 *
 *   <Skeleton className="h-10 w-full" />
 *
 * Composes — drop multiple in a layout to build a page-shaped skeleton.
 * Uses tailwind's animate-pulse + neutral cream-toned background so it
 * matches the Kamura brand instead of a generic gray flash.
 */
export default function Skeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-xl bg-[#EDE7DB] ${className}`}
    />
  );
}
