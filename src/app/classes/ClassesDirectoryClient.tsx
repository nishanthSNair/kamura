"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CLASS_STUDIOS,
  DISCIPLINES,
  EMIRATE_LABELS,
  getDiscipline,
  type ClassDiscipline,
  type Emirate,
} from "@/data/classes";
import EmailWaitlist from "@/components/EmailWaitlist";

export default function ClassesDirectoryClient() {
  const params = useSearchParams();
  const initial = params.get("d");
  const [discipline, setDiscipline] = useState<ClassDiscipline | "all">(
    getDiscipline(initial ?? "") ? (initial as ClassDiscipline) : "all"
  );
  const [emirate, setEmirate] = useState<Emirate | "all">("all");

  const filtered = useMemo(
    () =>
      CLASS_STUDIOS.filter(
        (s) =>
          (discipline === "all" || s.disciplines.includes(discipline)) &&
          (emirate === "all" || s.emirate === emirate)
      ),
    [discipline, emirate]
  );

  const emiratesWithData = useMemo(() => {
    const set = new Set(CLASS_STUDIOS.map((s) => s.emirate));
    return (Object.keys(EMIRATE_LABELS) as Emirate[]).filter((e) => set.has(e));
  }, []);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <FilterChip active={discipline === "all"} onClick={() => setDiscipline("all")}>
          All classes
        </FilterChip>
        {DISCIPLINES.map((d) => (
          <FilterChip
            key={d.key}
            active={discipline === d.key}
            onClick={() => setDiscipline(d.key)}
          >
            {d.label}
          </FilterChip>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <FilterChip active={emirate === "all"} onClick={() => setEmirate("all")} subtle>
          All emirates
        </FilterChip>
        {emiratesWithData.map((e) => (
          <FilterChip key={e} active={emirate === e} onClick={() => setEmirate(e)} subtle>
            {EMIRATE_LABELS[e]}
          </FilterChip>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="p-10 rounded-3xl bg-white border border-dashed border-gray-300 text-center mb-10">
          <p className="font-serif text-lg text-gray-900 mb-1">Nothing here yet</p>
          <p className="text-sm text-gray-500 font-sans">
            No {discipline !== "all" ? getDiscipline(discipline)?.label.toLowerCase() : ""} studios
            listed{emirate !== "all" ? ` in ${EMIRATE_LABELS[emirate]}` : ""} — yet. We add
            verified studios continuously.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {filtered.map((s) => (
            <div
              key={s.slug}
              className="flex flex-col p-6 bg-white rounded-3xl border border-gray-200 hover:border-terracotta/40 hover:shadow-lg transition-all"
            >
              <div className="flex flex-wrap gap-1.5 mb-3">
                {s.disciplines.map((d) => (
                  <span
                    key={d}
                    className="px-2.5 py-0.5 rounded-full bg-terracotta/10 text-terracotta text-[10px] tracking-[0.1em] uppercase font-semibold font-sans"
                  >
                    {getDiscipline(d)?.label ?? d}
                  </span>
                ))}
              </div>
              <h3 className="font-serif text-xl text-gray-900 mb-1">{s.name}</h3>
              <p className="text-[11px] tracking-[0.12em] uppercase text-gray-400 font-sans mb-3">
                {s.area} · {EMIRATE_LABELS[s.emirate]}
              </p>
              <p className="text-sm text-gray-500 font-sans leading-relaxed mb-4 flex-1">
                {s.description}
              </p>
              {s.tags.length > 0 && (
                <p className="text-[11px] text-gray-400 font-sans mb-4">
                  {s.tags.join(" · ")}
                </p>
              )}
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
                <p className="text-xs font-sans font-semibold text-gray-700">{s.priceAed}</p>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.1em] uppercase font-semibold font-sans text-terracotta hover:underline"
                >
                  Visit studio →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Track practice handoff */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <Link
          href="/my/classes"
          className="p-6 bg-[#173C3B] rounded-3xl hover:shadow-lg transition-all"
        >
          <h3 className="font-serif text-lg text-white mb-1">Track your practice →</h3>
          <p className="text-xs text-white/60 font-sans">
            Set a weekly rhythm, log every class, and watch it move your Impact view — free.
          </p>
        </Link>
        <div className="p-6 bg-white rounded-3xl border border-gray-200">
          <h3 className="font-serif text-lg text-gray-900 mb-1">Book through Kamura, soon</h3>
          <p className="text-xs text-gray-500 font-sans mb-3">
            In-app class booking is coming. Join the list and we&apos;ll tell you when your
            studios are live.
          </p>
          <EmailWaitlist source="booking_waitlist" cta="Keep me posted" />
        </div>
      </div>

      <p className="text-[11px] text-gray-400 font-sans">
        Prices are indicative drop-in rates and change often — confirm with the studio. Listed
        studios are independently verified; Kamura takes no placement fees.
      </p>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
  subtle = false,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  subtle?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-xs font-sans font-semibold border transition-colors ${
        active
          ? subtle
            ? "bg-[#173C3B] text-white border-[#173C3B]"
            : "bg-terracotta text-white border-terracotta"
          : "bg-white text-gray-600 border-gray-200 hover:border-terracotta/50"
      }`}
    >
      {children}
    </button>
  );
}
