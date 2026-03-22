"use client";

interface CheckerProgressProps {
  currentStep: number;
  totalSteps: number;
}

const STEP_LABELS = ["Body Map", "Concerns", "Results"];

export default function CheckerProgress({
  currentStep,
  totalSteps,
}: CheckerProgressProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      {Array.from({ length: totalSteps }).map((_, i) => {
        const isCompleted = i < currentStep;
        const isActive = i === currentStep;
        return (
          <div key={i} className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-terracotta scale-125"
                    : isCompleted
                    ? "bg-sage"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              />
              <span
                className={`text-[10px] font-sans transition-colors ${
                  isActive
                    ? "text-terracotta font-medium"
                    : isCompleted
                    ? "text-sage-dark dark:text-sage"
                    : "text-gray-400 dark:text-gray-600"
                }`}
              >
                {STEP_LABELS[i]}
              </span>
            </div>
            {i < totalSteps - 1 && (
              <div
                className={`w-12 h-px -mt-4 transition-colors ${
                  isCompleted
                    ? "bg-sage"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
