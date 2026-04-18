"use client";

import {
  type WellnessProfile,
  WELLNESS_GOALS,
} from "@/data/wellness-questionnaire";

interface GoalsStepProps {
  profile: WellnessProfile;
  onChange: (partial: Partial<WellnessProfile>) => void;
}

export default function GoalsStep({ profile, onChange }: GoalsStepProps) {
  const toggleGoal = (goalId: string) => {
    const current = profile.goals;
    if (current.includes(goalId)) {
      onChange({ goals: current.filter((g) => g !== goalId) });
    } else if (current.length < 3) {
      onChange({ goals: [...current, goalId] });
    }
  };

  return (
    <div>
      <h1 className="font-serif text-2xl md:text-3xl text-gray-900 mb-2">
        Your wellness goals
      </h1>
      <p className="text-sm text-gray-500 font-sans mb-8">
        What matters most to you? Pick up to 3 goals.
      </p>

      <div>
        <label className="block text-sm font-sans font-medium text-gray-700 mb-3">
          Primary goals
          <span className="text-gray-400 font-normal ml-1">
            ({profile.goals.length}/3)
          </span>
        </label>
        <div className="flex flex-wrap gap-2">
          {WELLNESS_GOALS.map((goal) => {
            const selected = profile.goals.includes(goal.id);
            const disabled = !selected && profile.goals.length >= 3;
            return (
              <button
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                disabled={disabled}
                className={`px-4 py-2.5 rounded-full border text-sm font-sans transition-all flex items-center gap-1.5 ${
                  selected
                    ? "border-terracotta bg-terracotta/10 text-terracotta font-medium"
                    : disabled
                    ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                <span>{goal.icon}</span>
                {goal.label}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-gray-400 font-sans mt-4">
          You can refine budget, timeline, and treatment preferences on your
          profile once you see your report.
        </p>
      </div>
    </div>
  );
}
