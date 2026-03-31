interface DashboardCardProps {
  title: string;
  icon?: string;
  span?: 1 | 2;
  action?: { label: string; onClick: () => void };
  children: React.ReactNode;
}

export default function DashboardCard({
  title,
  icon,
  span = 1,
  action,
  children,
}: DashboardCardProps) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-2xl p-5 md:p-6 ${
        span === 2 ? "md:col-span-2" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-base md:text-lg text-gray-900 flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          {title}
        </h3>
        {action && (
          <button
            onClick={action.onClick}
            className="text-xs font-sans text-terracotta hover:text-terracotta-dark transition-colors"
          >
            {action.label}
          </button>
        )}
      </div>
      {children}
    </div>
  );
}
