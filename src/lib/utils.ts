import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn — merge Tailwind class names safely.
 * Used by shadcn/ui components and our own variant-styled components.
 *
 *   cn("p-4", condition && "p-6")
 *   cn("text-base", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
