import type { TitrationSchedule } from "@/data/titration-schedules";

interface Props {
  schedule: TitrationSchedule;
  startDate: string | null;       // protocol_item.start_date
  title?: string;
}

export default function TitrationStepper({
  schedule,
  startDate,
  title = "Titration schedule",
}: Props) {
  // Compute the current week
  let currentWeek = 0;
  if (startDate) {
    const start = new Date(startDate);
    const now = new Date();
    currentWeek = Math.floor((now.getTime() - start.getTime()) / (7 * 86400000)) + 1;
  }

  const steps = schedule.steps;
  const currentStep = currentWeek > 0 && currentWeek <= steps.length ? currentWeek : null;

  return (
    <div className="mt-3 p-4 rounded-xl border border-gray-200 bg-[#FAF8F5]">
      <div className="flex items-baseline justify-between mb-3">
        <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans font-semibold">
          {title}
        </p>
        {currentStep && (
          <p className="text-[11px] text-gray-500 font-sans">
            Week {currentStep} of {schedule.totalWeeks}
          </p>
        )}
      </div>

      {/* Horizontal stepper */}
      <div className="relative flex items-stretch gap-1 overflow-x-auto pb-2 -mx-1 px-1">
        {steps.map((step) => {
          const isCurrent = currentStep === step.week;
          const isPast = currentStep !== null && step.week < currentStep;
          const isFuture = currentStep !== null && step.week > currentStep;
          const isRest = step.dose === "rest";

          return (
            <div
              key={step.week}
              className={`flex-1 min-w-[54px] rounded-lg border transition-all ${
                isCurrent
                  ? "border-terracotta bg-terracotta/10 ring-1 ring-terracotta/30"
                  : isPast
                  ? "border-gray-200 bg-white"
                  : isFuture
                  ? "border-gray-100 bg-white/60"
                  : "border-gray-200 bg-white"
              }`}
              title={step.note}
            >
              <div
                className={`px-2 py-2 text-center ${
                  isPast || isCurrent ? "opacity-100" : "opacity-50"
                }`}
              >
                <p className="text-[9px] tracking-[0.15em] uppercase text-gray-400 font-sans font-semibold mb-1">
                  W{step.week}
                </p>
                <p
                  className={`font-serif text-xs leading-tight ${
                    isCurrent ? "text-terracotta-dark font-semibold" : "text-gray-900"
                  } ${isRest ? "italic text-gray-400" : ""}`}
                >
                  {step.dose}
                </p>
                {step.note && !isRest && (
                  <p className="text-[8px] tracking-[0.1em] uppercase text-gray-400 font-sans mt-0.5">
                    {step.note}
                  </p>
                )}
              </div>
              {/* Current-week indicator dot */}
              {isCurrent && (
                <div className="w-1.5 h-1.5 rounded-full bg-terracotta mx-auto mb-1.5" />
              )}
            </div>
          );
        })}
      </div>

      {schedule.note && (
        <p className="text-[10px] text-gray-400 font-sans italic mt-3 leading-relaxed">
          {schedule.note}
        </p>
      )}
    </div>
  );
}
