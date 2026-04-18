"use client";

import {
  type WellnessProfile,
  GENDER_OPTIONS,
  LOCATION_OPTIONS,
} from "@/data/wellness-questionnaire";

interface ProfileStepProps {
  profile: WellnessProfile;
  onChange: (partial: Partial<WellnessProfile>) => void;
}

export default function ProfileStep({ profile, onChange }: ProfileStepProps) {
  return (
    <div>
      <h1 className="font-serif text-2xl md:text-3xl text-gray-900 mb-2">
        Let&apos;s get to know you
      </h1>
      <p className="text-sm text-gray-500 font-sans mb-8">
        Four quick details to personalize your recommendations.
      </p>

      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-sans font-medium text-gray-700 mb-1.5">
            Name
          </label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="Your first name"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 font-sans text-sm focus:outline-none focus:border-terracotta/50 focus:ring-2 focus:ring-terracotta/10 transition-all"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-sans font-medium text-gray-700 mb-1.5">
            Age
          </label>
          <input
            type="number"
            value={profile.age ?? ""}
            onChange={(e) => onChange({ age: e.target.value ? parseInt(e.target.value, 10) : null })}
            placeholder="e.g. 32"
            min={16}
            max={100}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 font-sans text-sm focus:outline-none focus:border-terracotta/50 focus:ring-2 focus:ring-terracotta/10 transition-all"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-sans font-medium text-gray-700 mb-1.5">
            Gender
          </label>
          <div className="grid grid-cols-2 gap-2">
            {GENDER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onChange({ gender: opt.value })}
                className={`px-4 py-3 rounded-xl border text-sm font-sans transition-all ${
                  profile.gender === opt.value
                    ? "border-terracotta bg-terracotta/5 text-terracotta font-medium"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-sans font-medium text-gray-700 mb-1.5">
            Location
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {LOCATION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onChange({ location: opt.value })}
                className={`px-4 py-3 rounded-xl border text-sm font-sans transition-all ${
                  profile.location === opt.value
                    ? "border-terracotta bg-terracotta/5 text-terracotta font-medium"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
