"use client";

import { useState, useMemo } from "react";
import {
  type WellnessProfile,
  CONDITIONS,
} from "@/data/wellness-questionnaire";
import {
  type BodyZone,
  type WellnessConcern,
  type ConcernDuration,
} from "@/data/wellness-concerns";
import { treatments } from "@/data/treatments";
import InteractiveBody from "@/components/checker/InteractiveBody";
import ConcernPicker from "@/components/checker/ConcernPicker";

const SUPPLEMENT_CATEGORIES = new Set([
  "Supplements & Nutraceuticals",
  "Peptides",
  "IV & Infusion Therapies",
  "Hormones",
  "Longevity Pharmaceuticals",
]);

interface HealthStepProps {
  profile: WellnessProfile;
  onChange: (partial: Partial<WellnessProfile>) => void;
}

export default function HealthStep({ profile, onChange }: HealthStepProps) {
  const [activeZone, setActiveZone] = useState<BodyZone | null>(null);
  const [supSearch, setSupSearch] = useState("");
  const [supDropdownOpen, setSupDropdownOpen] = useState(false);

  const supplementOptions = useMemo(
    () =>
      treatments
        .filter((t) => SUPPLEMENT_CATEGORIES.has(t.category))
        .map((t) => t.name)
        .sort(),
    []
  );

  const selectedSups: string[] = profile.supplements
    ? profile.supplements.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const filteredOptions = supplementOptions.filter(
    (name) =>
      name.toLowerCase().includes(supSearch.toLowerCase()) &&
      !selectedSups.includes(name)
  );

  const toggleSupplement = (name: string) => {
    const updated = selectedSups.includes(name)
      ? selectedSups.filter((s) => s !== name)
      : [...selectedSups, name];
    onChange({ supplements: updated.join(", ") });
  };

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

      {/* Current supplements — searchable multi-select */}
      <div>
        <label className="block text-sm font-sans font-medium text-gray-700 mb-1.5">
          Current supplements
          <span className="text-gray-400 font-normal ml-1">(optional)</span>
        </label>

        {/* Selected chips */}
        {selectedSups.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {selectedSups.map((name) => (
              <button
                key={name}
                onClick={() => toggleSupplement(name)}
                className="px-2.5 py-1 bg-terracotta/10 border border-terracotta/20 rounded-full text-xs font-sans text-terracotta flex items-center gap-1 hover:bg-terracotta/20 transition-colors"
              >
                {name}
                <span className="text-terracotta/60">&times;</span>
              </button>
            ))}
          </div>
        )}

        {/* Search input */}
        <div className="relative">
          <input
            type="text"
            value={supSearch}
            onChange={(e) => {
              setSupSearch(e.target.value);
              setSupDropdownOpen(true);
            }}
            onFocus={() => setSupDropdownOpen(true)}
            placeholder="Search supplements, peptides, hormones..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 font-sans text-sm focus:outline-none focus:border-terracotta/50 focus:ring-2 focus:ring-terracotta/10 transition-all"
          />

          {/* Dropdown */}
          {supDropdownOpen && filteredOptions.length > 0 && (
            <div className="absolute z-50 left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg">
              {filteredOptions.slice(0, 20).map((name) => (
                <button
                  key={name}
                  onClick={() => {
                    toggleSupplement(name);
                    setSupSearch("");
                    setSupDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm font-sans text-gray-700 hover:bg-terracotta/5 hover:text-terracotta transition-colors"
                >
                  {name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Close dropdown on outside click */}
        {supDropdownOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setSupDropdownOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
