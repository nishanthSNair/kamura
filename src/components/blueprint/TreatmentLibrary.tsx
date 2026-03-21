"use client";

import { BLUEPRINT_TREATMENTS } from "@/data/blueprint";
import TreatmentCard from "./TreatmentCard";

interface TreatmentLibraryProps {
  selectedId: string | null;
  placedIds: Set<string>;
  onSelect: (id: string | null) => void;
}

const SECTIONS = [
  { key: "therapy" as const, label: "Therapies", emoji: "\u{1F3E5}" },
  { key: "supplement" as const, label: "Supplements", emoji: "\u{1F48A}" },
  { key: "habit" as const, label: "Habits", emoji: "\u2728" },
];

export default function TreatmentLibrary({
  selectedId,
  placedIds,
  onSelect,
}: TreatmentLibraryProps) {
  return (
    <div className="space-y-5">
      <h3 className="text-xs font-sans uppercase tracking-wider text-gray-500 dark:text-gray-400">
        Treatment Library
      </h3>

      {SECTIONS.map(({ key, label, emoji }) => {
        const treatments = BLUEPRINT_TREATMENTS.filter(
          (t) => t.category === key
        );
        return (
          <div key={key}>
            <p className="text-[11px] font-sans font-medium text-gray-600 dark:text-gray-300 mb-2">
              {emoji} {label}{" "}
              <span className="text-gray-400 dark:text-gray-500">
                ({treatments.length})
              </span>
            </p>
            <div className="grid grid-cols-1 gap-2">
              {treatments.map((t) => (
                <TreatmentCard
                  key={t.id}
                  treatment={t}
                  isSelected={selectedId === t.id}
                  isPlaced={placedIds.has(t.id)}
                  onSelect={() =>
                    onSelect(selectedId === t.id ? null : t.id)
                  }
                />
              ))}
            </div>
          </div>
        );
      })}

      <p className="text-[10px] text-gray-400 dark:text-gray-500 font-sans leading-relaxed">
        Tap a treatment, then tap a time slot to add it. On desktop, you can
        also drag cards into the timeline.
      </p>
    </div>
  );
}
