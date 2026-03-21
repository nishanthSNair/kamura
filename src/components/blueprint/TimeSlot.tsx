"use client";

import { useState } from "react";
import { BLUEPRINT_TREATMENTS, formatHour } from "@/data/blueprint";

interface TimeSlotProps {
  hour: number;
  treatments: string[];
  selectedTreatmentId: string | null;
  onDrop: (treatmentId: string) => void;
  onRemove: (treatmentId: string) => void;
  onTap: () => void;
}

export default function TimeSlot({
  hour,
  treatments,
  selectedTreatmentId,
  onDrop,
  onRemove,
  onTap,
}: TimeSlotProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const isFull = treatments.length >= 2;
  const canPlace = selectedTreatmentId && !isFull;

  function handleDragOver(e: React.DragEvent) {
    if (isFull) return;
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
    const id = e.dataTransfer.getData("text/plain");
    if (id && !isFull) onDrop(id);
  }

  function handleClick() {
    if (canPlace) onTap();
  }

  return (
    <div className="flex items-stretch gap-3 min-h-[44px]">
      {/* Time label */}
      <span className="w-16 shrink-0 text-[11px] text-gray-400 dark:text-gray-500 font-sans pt-1 text-right">
        {formatHour(hour)}
      </span>

      {/* Drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`flex-1 rounded-lg border border-dashed px-3 py-1.5 min-h-[40px] transition-all flex items-center gap-2 flex-wrap ${
          isDragOver
            ? "drop-zone-highlight border-sage"
            : canPlace
              ? "border-terracotta/30 bg-terracotta/[0.03] cursor-pointer hover:bg-terracotta/[0.06]"
              : isFull
                ? "border-gray-200 dark:border-white/[0.04] bg-gray-50 dark:bg-gray-900/30"
                : "border-gray-200 dark:border-white/[0.06]"
        }`}
      >
        {treatments.length === 0 && !canPlace && (
          <span className="text-[10px] text-gray-300 dark:text-gray-600 font-sans">
            Empty
          </span>
        )}
        {treatments.length === 0 && canPlace && (
          <span className="text-[10px] text-terracotta/60 font-sans">
            Tap to place here
          </span>
        )}
        {treatments.map((id) => {
          const t = BLUEPRINT_TREATMENTS.find((bt) => bt.id === id);
          if (!t) return null;
          return (
            <span
              key={id}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sage/10 dark:bg-sage/5 border border-sage/20 text-xs font-sans text-gray-700 dark:text-gray-300"
            >
              <span>{t.emoji}</span>
              <span className="truncate max-w-[100px]">{t.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(id);
                }}
                className="ml-0.5 text-gray-400 hover:text-score-red transition-colors"
                aria-label={`Remove ${t.name}`}
              >
                &times;
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
}
