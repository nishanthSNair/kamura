"use client";

import { WELLNESS_GOALS } from "@/data/wellness-questionnaire";

interface GoalTrackerProps {
  goals: string[];
  goalChecks: Record<string, boolean>;
  onToggle: (goalId: string, checked: boolean) => void;
  completedAt: number | null;
}

export default function GoalTracker({
  goals,
  goalChecks,
  onToggle,
  completedAt,
}: GoalTrackerProps) {
  const weeksOnPlan = completedAt
    ? Math.max(1, Math.floor((Date.now() - completedAt) / (7 * 24 * 60 * 60 * 1000)))
    : 0;

  const checkedCount = goals.filter((g) => goalChecks[g]).length;

  return (
    <div>
      {weeksOnPlan > 0 && (
        <p className="text-xs text-gray-400 font-sans mb-3">
          Week {weeksOnPlan} on your plan
        </p>
      )}

      <div className="space-y-2.5">
        {goals.map((goalId) => {
          const goal = WELLNESS_GOALS.find((g) => g.id === goalId);
          if (!goal) return null;
          const checked = !!goalChecks[goalId];
          return (
            <label
              key={goalId}
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                checked
                  ? "border-moss/30 bg-moss/5"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onToggle(goalId, e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-moss focus:ring-moss/30 accent-moss"
              />
              <span className="text-base">{goal.icon}</span>
              <span
                className={`text-sm font-sans ${
                  checked ? "text-moss font-medium line-through" : "text-gray-700"
                }`}
              >
                {goal.label}
              </span>
            </label>
          );
        })}
      </div>

      {/* Progress summary */}
      <div className="mt-4 flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-moss rounded-full transition-all duration-500"
            style={{ width: goals.length > 0 ? `${(checkedCount / goals.length) * 100}%` : "0%" }}
          />
        </div>
        <span className="text-xs text-gray-400 font-sans">
          {checkedCount}/{goals.length}
        </span>
      </div>
    </div>
  );
}
