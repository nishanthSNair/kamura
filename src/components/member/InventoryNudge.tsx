"use client";

import Link from "next/link";

interface Props {
  itemName: string;
  dosesLeft: number;
  daysLeft: number;
  sourcingHref?: string;
}

export default function InventoryNudge({
  itemName,
  dosesLeft,
  daysLeft,
  sourcingHref = "/peptides/sourcing-guide",
}: Props) {
  return (
    <div className="flex items-start gap-4 p-4 md:p-5 rounded-2xl bg-gradient-to-r from-terracotta/10 to-terracotta/5 border border-terracotta/20 mb-6 md:mb-8">
      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B5736A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900 font-sans leading-relaxed">
          <span className="font-semibold text-terracotta-dark">{itemName} supply is low.</span>{" "}
          At your current dosing, you&apos;ll run out in{" "}
          <span className="font-semibold">
            {daysLeft} day{daysLeft === 1 ? "" : "s"}
          </span>{" "}
          ({dosesLeft} dose{dosesLeft === 1 ? "" : "s"} remaining).{" "}
          <Link
            href={sourcingHref}
            className="text-terracotta font-semibold hover:underline"
          >
            Reorder from a Kamura-verified pharmacy →
          </Link>
        </p>
      </div>
    </div>
  );
}
