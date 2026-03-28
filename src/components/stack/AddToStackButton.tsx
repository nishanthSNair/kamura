"use client";

import { useStackContext } from "@/context/StackContext";

interface AddToStackButtonProps {
  slug: string;
  variant?: "icon" | "button";
}

export default function AddToStackButton({ slug, variant = "icon" }: AddToStackButtonProps) {
  const { hasItem, toggleItem } = useStackContext();
  const inStack = hasItem(slug);

  if (variant === "icon") {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleItem(slug);
        }}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-lg ${
          inStack
            ? "bg-[#B5736A] text-white"
            : "bg-white/90 dark:bg-[#1C1815]/90 text-gray-600 dark:text-[#A89F90] hover:bg-[#B5736A] hover:text-white backdrop-blur-sm"
        }`}
        title={inStack ? "Remove from stack" : "Add to stack"}
      >
        {inStack ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        )}
      </button>
    );
  }

  // Full button variant for detail pages
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        toggleItem(slug);
      }}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold font-sans transition-all ${
        inStack
          ? "bg-[#B5736A] text-white"
          : "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-[#B5736A] hover:border-[#B5736A]"
      }`}
    >
      {inStack ? (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          In My Stack
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add to Stack
        </>
      )}
    </button>
  );
}
