interface JournalEntry {
  id: string;
  entry_date: string;
  body: string;
  energy: number | null;
  mood: number | null;
  pain: number | null;
  sleep_hours: number | null;
  created_at: string;
}

interface Props {
  entries: JournalEntry[];
  onAdd: () => void;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const entryDay = new Date(d);
  entryDay.setHours(0, 0, 0, 0);
  const diff = Math.floor((today.getTime() - entryDay.getTime()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export default function JournalCard({ entries, onAdd }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/70 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-serif text-base text-gray-900">Recent journal</h3>
        <button
          onClick={onAdd}
          className="text-[10px] tracking-[0.15em] uppercase text-terracotta font-sans font-semibold hover:underline"
        >
          + Log entry
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="p-6 text-center">
          <p className="text-sm text-gray-500 font-sans mb-3">
            No entries yet.
          </p>
          <button
            onClick={onAdd}
            className="text-xs tracking-[0.15em] uppercase text-terracotta font-sans font-semibold hover:underline"
          >
            Write your first entry →
          </button>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {entries.map((e) => (
            <div key={e.id} className="px-5 py-4">
              <p className="text-[10px] tracking-[0.15em] uppercase text-terracotta font-sans font-semibold mb-2">
                {formatDate(e.entry_date)}
              </p>
              {e.body && (
                <p className="text-sm text-gray-800 font-sans leading-relaxed mb-3 italic">
                  &ldquo;{e.body}&rdquo;
                </p>
              )}
              <div className="flex flex-wrap gap-1.5">
                {e.energy !== null && <MetricTag label="Energy" value={`${e.energy}/10`} />}
                {e.mood !== null && <MetricTag label="Mood" value={`${e.mood}/10`} />}
                {e.pain !== null && <MetricTag label="Pain" value={`${e.pain}/10`} />}
                {e.sleep_hours !== null && (
                  <MetricTag label="Sleep" value={`${e.sleep_hours}h`} />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MetricTag({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EDE7DB] border border-gray-200/60 text-[10px] font-sans text-gray-600">
      <span className="tracking-[0.1em] uppercase text-gray-400">{label}</span>
      <span className="font-semibold text-gray-700">{value}</span>
    </span>
  );
}
