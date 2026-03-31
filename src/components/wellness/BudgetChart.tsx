import type { BudgetBreakdown } from "@/data/wellness-scoring";

interface BudgetChartProps {
  breakdown: BudgetBreakdown;
}

export default function BudgetChart({ breakdown }: BudgetChartProps) {
  const { budgetLimit, totalEstimated, items, overBudget } = breakdown;
  const ratio = budgetLimit > 0 ? Math.min(totalEstimated / budgetLimit, 1.5) : 0;

  return (
    <div>
      {/* Budget bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs font-sans mb-1.5">
          <span className="text-gray-500">Estimated monthly</span>
          <span className={overBudget ? "text-score-orange font-medium" : "text-moss font-medium"}>
            {totalEstimated.toLocaleString()} AED
          </span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden relative">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              overBudget ? "bg-score-orange" : "bg-moss"
            }`}
            style={{ width: `${Math.min(ratio * 100, 100)}%` }}
          />
          {/* Budget limit line */}
          {ratio > 0 && (
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-gray-400"
              style={{ left: `${Math.min((1 / Math.max(ratio, 1)) * 100, 100)}%` }}
            />
          )}
        </div>
        <div className="flex justify-between text-[10px] font-sans mt-1">
          <span className="text-gray-400">0 AED</span>
          <span className="text-gray-400">{budgetLimit.toLocaleString()} AED budget</span>
        </div>
      </div>

      {overBudget && (
        <div className="p-2.5 bg-score-orange/10 border border-score-orange/20 rounded-lg mb-3">
          <p className="text-xs font-sans text-score-orange">
            Estimated costs exceed your budget. Consider prioritizing your top 2-3 treatments.
          </p>
        </div>
      )}

      {/* Item breakdown */}
      <div className="space-y-1.5">
        {items.map((item) => (
          <div key={item.name} className="flex justify-between text-xs font-sans">
            <span className="text-gray-600 truncate mr-2">{item.name}</span>
            <span className="text-gray-400 shrink-0">
              {item.cost > 0 ? `~${item.cost} AED` : "—"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
