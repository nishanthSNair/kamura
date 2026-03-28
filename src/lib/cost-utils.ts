/**
 * Parse cost strings like "$200-500/month", "$50/session", "$2,000-5,000"
 * into a numeric range [min, max] for summation.
 */
export function parseCostRange(cost: string | undefined): [number, number] {
  if (!cost) return [0, 0];

  // Remove commas, extract all numbers
  const cleaned = cost.replace(/,/g, "");
  const numbers = cleaned.match(/\d+(?:\.\d+)?/g);
  if (!numbers || numbers.length === 0) return [0, 0];

  const vals = numbers.map(Number);
  if (vals.length === 1) return [vals[0], vals[0]];
  return [Math.min(...vals), Math.max(...vals)];
}

export function formatCostRange(min: number, max: number): string {
  if (min === 0 && max === 0) return "Free";
  if (min === max) return `$${min.toLocaleString()}`;
  return `$${min.toLocaleString()} – $${max.toLocaleString()}`;
}

export function sumCostRanges(ranges: [number, number][]): [number, number] {
  return ranges.reduce(
    ([totalMin, totalMax], [min, max]) => [totalMin + min, totalMax + max],
    [0, 0]
  );
}
