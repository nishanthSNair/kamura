"use client";

import { useState } from "react";
import {
  type WellnessProfile,
  CONDITIONS,
} from "@/data/wellness-questionnaire";
import {
  type BodyZone,
  type WellnessConcern,
  type ConcernDuration,
} from "@/data/wellness-concerns";
import InteractiveBody from "@/components/checker/InteractiveBody";
import ConcernPicker from "@/components/checker/ConcernPicker";

interface HealthStepProps {
  profile: WellnessProfile;
  onChange: (partial: Partial<WellnessProfile>) => void;
}

export default function HealthStep({ profile, onChange }: HealthStepProps) {
  const [activeZone, setActiveZone] = useState<BodyZone | null>(null);

  const handleSelectZone = (zone: BodyZone) => {
    setActiveZone(zone);
  };

  const handleConcernSubmit = (concerns: WellnessConcern[], duration?: ConcernDuration) => {
    const newConcerns = [...profile.selectedConcerns, ...concerns];
    const zone = activeZone;
    const newZones =
      zone && !profile.selectedZones.includes(zone)
        ? [...profile.selectedZones, zone]
        : profile.selectedZones;
    onChange({
      selectedConcerns: newConcerns,
      selectedZones: newZones,
      duration: duration || profile.duration,
    });
    setActiveZone(null);
  };

  const handleAddAnotherFromPicker = (concerns: WellnessConcern[], duration?: ConcernDuration) => {
    const newConcerns = [...profile.selectedConcerns, ...concerns];
    const zone = activeZone;
    const newZones =
      zone && !profile.selectedZones.includes(zone)
        ? [...profile.selectedZones, zone]
        : profile.selectedZones;
    onChange({
      selectedConcerns: newConcerns,
      selectedZones: newZones,
      duration: duration || profile.duration,
    });
    setActiveZone(null);
  };

  const toggleCondition = (conditionId: string) => {
    if (conditionId === "none") {
      onChange({ conditions: profile.conditions.includes("none") ? [] : ["none"] });
      return;
    }
    const filtered = profile.conditions.filter((c) => c !== "none");
    if (filtered.includes(conditionId)) {
      onChange({ conditions: filtered.filter((c) => c !== conditionId) });
    } else {
      onChange({ conditions: [...filtered, conditionId] });
    }
  };

  // Show concern picker if a zone is active
  if (activeZone) {
    return (
      <ConcernPicker
        zone={activeZone}
        existingConcerns={profile.selectedConcerns}
        onSubmit={handleConcernSubmit}
        onAddAnother={handleAddAnotherFromPicker}
        onBack={() => setActiveZone(null)}
      />
    );
  }

  return (
    <div>
      <h1 className="font-serif text-2xl md:text-3xl text-gray-900 mb-2">
        Your health concerns
      </h1>
      <p className="text-sm text-gray-500 font-sans mb-6">
        Tap body areas to select specific concerns. Then tell us about existing conditions.
      </p>

      {/* Selected concerns summary */}
      {profile.selectedConcerns.length > 0 && (
        <div className="mb-6 p-4 bg-sage-light/30 rounded-xl border border-sage/20">
          <p className="text-xs text-gray-500 font-sans mb-2 uppercase tracking-wider">
            Selected concerns ({profile.selectedConcerns.length})
          </p>
          <div className="flex flex-wrap gap-1.5">
            {profile.selectedConcerns.map((c) => (
              <span
                key={c.id}
                className="px-2.5 py-1 bg-white rounded-full text-xs font-sans text-gray-700 border border-gray-200"
              >
                {c.icon} {c.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Body map */}
      <div className="mb-8">
        <InteractiveBody
          completedZones={profile.selectedZones}
          onSelectZone={handleSelectZone}
          hasSelectedConcerns={profile.selectedConcerns.length > 0}
          onViewResults={() => {}} // Not used in this context
        />
      </div>

      {/* Existing conditions */}
      <div className="mb-6">
        <label className="block text-sm font-sans font-medium text-gray-700 mb-2">
          Existing conditions
        </label>
        <div className="flex flex-wrap gap-2">
          {CONDITIONS.map((c) => {
            const selected = profile.conditions.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggleCondition(c.id)}
                className={`px-4 py-2.5 rounded-full border text-sm font-sans transition-all ${
                  selected
                    ? "border-terracotta bg-terracotta/10 text-terracotta font-medium"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Current supplements */}
      <div>
        <label className="block text-sm font-sans font-medium text-gray-700 mb-1.5">
          Current supplements
          <span className="text-gray-400 font-normal ml-1">(optional)</span>
        </label>
        <input
          type="text"
          value={profile.supplements}
          onChange={(e) => onChange({ supplements: e.target.value })}
          placeholder="e.g. Vitamin D, Magnesium, Omega-3"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 font-sans text-sm focus:outline-none focus:border-terracotta/50 focus:ring-2 focus:ring-terracotta/10 transition-all"
        />
      </div>
    </div>
  );
}
