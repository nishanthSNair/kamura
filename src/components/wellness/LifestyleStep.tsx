"use client";

import {
  type WellnessProfile,
  EXERCISE_OPTIONS,
  DIET_OPTIONS,
} from "@/data/wellness-questionnaire";

interface LifestyleStepProps {
  profile: WellnessProfile;
  onChange: (partial: Partial<WellnessProfile>) => void;
}

const SLEEP_LABELS = ["Poor", "Fair", "Average", "Good", "Excellent"];
const STRESS_LABELS = ["Very Low", "Low", "Moderate", "High", "Very High"];

export default function LifestyleStep({ profile, onChange }: LifestyleStepProps) {
  return (
    <div>
      <h1 className="font-serif text-2xl md:text-3xl text-gray-900 mb-2">
        Your daily habits
      </h1>
      <p className="text-sm text-gray-500 font-sans mb-8">
        Help us understand your current lifestyle patterns.
      </p>

      <div className="space-y-8">
        {/* Sleep Quality */}
        <div>
          <label className="block text-sm font-sans font-medium text-gray-700 mb-3">
            Sleep quality
            <span className="ml-2 text-terracotta font-normal">
              {SLEEP_LABELS[profile.sleepQuality - 1]}
            </span>
          </label>
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={profile.sleepQuality}
            onChange={(e) => onChange({ sleepQuality: parseInt(e.target.value, 10) })}
            className="w-full blueprint-slider"
            style={{
              background: `linear-gradient(to right, var(--color-terracotta) ${((profile.sleepQuality - 1) / 4) * 100}%, #e5e7eb ${((profile.sleepQuality - 1) / 4) * 100}%)`,
            }}
          />
          <div className="flex justify-between text-xs text-gray-400 font-sans mt-1">
            <span>Poor</span>
            <span>Excellent</span>
          </div>
        </div>

        {/* Exercise Frequency */}
        <div>
          <label className="block text-sm font-sans font-medium text-gray-700 mb-2">
            Exercise frequency
          </label>
          <div className="grid grid-cols-2 gap-2">
            {EXERCISE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onChange({ exerciseFrequency: opt.value })}
                className={`px-4 py-3 rounded-xl border text-sm font-sans transition-all ${
                  profile.exerciseFrequency === opt.value
                    ? "border-terracotta bg-terracotta/5 text-terracotta font-medium"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stress Level */}
        <div>
          <label className="block text-sm font-sans font-medium text-gray-700 mb-3">
            Stress level
            <span className="ml-2 text-terracotta font-normal">
              {STRESS_LABELS[profile.stressLevel - 1]}
            </span>
          </label>
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={profile.stressLevel}
            onChange={(e) => onChange({ stressLevel: parseInt(e.target.value, 10) })}
            className="w-full blueprint-slider"
            style={{
              background: `linear-gradient(to right, var(--color-terracotta) ${((profile.stressLevel - 1) / 4) * 100}%, #e5e7eb ${((profile.stressLevel - 1) / 4) * 100}%)`,
            }}
          />
          <div className="flex justify-between text-xs text-gray-400 font-sans mt-1">
            <span>Very Low</span>
            <span>Very High</span>
          </div>
        </div>

        {/* Diet Type */}
        <div>
          <label className="block text-sm font-sans font-medium text-gray-700 mb-2">
            Diet type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {DIET_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onChange({ dietType: opt.value })}
                className={`px-4 py-3 rounded-xl border text-sm font-sans transition-all ${
                  profile.dietType === opt.value
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
