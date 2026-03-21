interface IntakeProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function IntakeProgress({
  currentStep,
  totalSteps,
}: IntakeProgressProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400 dark:text-gray-500 font-sans uppercase tracking-wider">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-500 font-sans">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-sage rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
