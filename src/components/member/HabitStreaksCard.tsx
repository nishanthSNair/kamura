interface ProtocolItem {
  id: string;
  name: string;
  category: string;
  schedule: string;
}

interface DoseLog {
  protocol_item_id: string;
  logged_at: string;
}

interface Props {
  items: ProtocolItem[];
  logs: DoseLog[];
}

interface Streak {
  itemId: string;
  name: string;
  category: string;
  count: number;
  unit: string; // "days" / "weeks" / "sessions"
}

function computeStreak(item: ProtocolItem, logs: DoseLog[]): Streak | null {
  const itemLogs = logs
    .filter((l) => l.protocol_item_id === item.id)
    .sort((a, b) => new Date(b.logged_at).getTime() - new Date(a.logged_at).getTime());

  if (itemLogs.length === 0) return null;

  const schedule = item.schedule;

  // Weekly-ish items — count consecutive weeks with at least one log
  if (schedule === "weekly" || schedule === "twice_weekly") {
    const weeks = new Set<string>();
    for (const log of itemLogs) {
      const d = new Date(log.logged_at);
      // Compute ISO week-year key
      const year = d.getFullYear();
      const startOfYear = new Date(year, 0, 1);
      const weekNum = Math.ceil((((d.getTime() - startOfYear.getTime()) / 86400000) + startOfYear.getDay() + 1) / 7);
      weeks.add(`${year}-W${weekNum}`);
    }
    // Count consecutive weeks ending this week
    const now = new Date();
    let streak = 0;
    for (let i = 0; i < 52; i++) {
      const ref = new Date(now);
      ref.setDate(ref.getDate() - i * 7);
      const year = ref.getFullYear();
      const startOfYear = new Date(year, 0, 1);
      const weekNum = Math.ceil((((ref.getTime() - startOfYear.getTime()) / 86400000) + startOfYear.getDay() + 1) / 7);
      const key = `${year}-W${weekNum}`;
      if (weeks.has(key)) streak++;
      else if (i === 0) continue; // skip current week if not yet logged
      else break;
    }
    return streak > 0
      ? { itemId: item.id, name: item.name, category: item.category, count: streak, unit: streak === 1 ? "week" : "weeks" }
      : null;
  }

  // Daily items — count consecutive days ending today/yesterday
  const days = new Set<string>();
  for (const log of itemLogs) {
    days.add(new Date(log.logged_at).toISOString().split("T")[0]);
  }
  const now = new Date();
  let streak = 0;
  let started = false;
  for (let i = 0; i < 365; i++) {
    const ref = new Date(now);
    ref.setDate(ref.getDate() - i);
    const key = ref.toISOString().split("T")[0];
    if (days.has(key)) {
      streak++;
      started = true;
    } else if (started) {
      break;
    } else if (i > 1) {
      break; // allow 1-day grace
    }
  }
  return streak > 0
    ? { itemId: item.id, name: item.name, category: item.category, count: streak, unit: streak === 1 ? "day" : "days" }
    : null;
}

export default function HabitStreaksCard({ items, logs }: Props) {
  const streaks = items
    .map((item) => computeStreak(item, logs))
    .filter((s): s is Streak => s !== null)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  if (streaks.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200/70 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 font-sans font-semibold mb-1">
            Habit streaks
          </p>
          <h3 className="font-serif text-base text-gray-900">Build a streak.</h3>
        </div>
        <div className="p-6 text-center">
          <p className="text-sm text-gray-500 font-sans">
            Log your first few doses to start building streaks.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200/70 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 font-sans font-semibold mb-1">
          Habit streaks
        </p>
        <h3 className="font-serif text-base text-gray-900">You&apos;re consistent.</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {streaks.map((s) => (
          <div key={s.itemId} className="px-5 py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#EDE7DB] flex items-center justify-center font-serif text-[10px] font-semibold text-gray-700 shrink-0">
                {s.name.slice(0, 2).toUpperCase()}
              </div>
              <p className="text-sm font-sans text-gray-900 truncate">{s.name}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-serif text-xl text-gray-900 leading-none">{s.count}</p>
              <p className="text-[10px] tracking-[0.15em] uppercase text-gray-400 font-sans mt-0.5">
                {s.unit}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
