"use client";

import {
  Activity,
  Circle,
  Droplet,
  Flame,
  Hand,
  HeartPulse,
  Leaf,
  Music,
  Plus,
  Snowflake,
  Sparkles,
  Sun,
  TestTube,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { getSessionType, type SessionTypeKey, type SessionTypeMeta } from "@/data/session-types";

const ICONS: Record<SessionTypeMeta["icon"], LucideIcon> = {
  Wind,
  Droplet,
  Flame,
  Snowflake,
  Sun,
  Music,
  HeartPulse,
  Hand,
  TestTube,
  Sparkles,
  Activity,
  Leaf,
  Circle,
};

export interface SessionLog {
  id: string;
  session_type: SessionTypeKey | string;
  performed_at: string;
  duration_minutes: number | null;
  energy_after: number | null;
  clarity_after: number | null;
  calm_after: number | null;
  details: Record<string, string | number> | null;
  notes: string | null;
}

interface Props {
  sessions: SessionLog[];
  onLogNew: () => void;
}

export default function SessionLogCard({ sessions, onLogNew }: Props) {
  return (
    <div className="rounded-3xl bg-white border border-gray-100 p-6 md:p-7">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans font-semibold mb-1">
            Sessions
          </p>
          <h3 className="font-serif text-lg text-gray-900">
            What you&rsquo;ve been doing
          </h3>
        </div>
        <button
          onClick={onLogNew}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#173C3B] text-white text-[10.5px] tracking-[0.18em] uppercase font-semibold font-sans hover:bg-[#173C3B]"
        >
          <Plus size={13} strokeWidth={2.2} />
          Log
        </button>
      </div>

      {sessions.length === 0 ? (
        <EmptyState onLogNew={onLogNew} />
      ) : (
        <ul className="space-y-3">
          {sessions.slice(0, 4).map((s) => (
            <SessionRow key={s.id} session={s} />
          ))}
        </ul>
      )}
    </div>
  );
}

function SessionRow({ session }: { session: SessionLog }) {
  const meta = getSessionType(session.session_type);
  const Icon = ICONS[meta.icon];
  const detailSummary = summariseDetails(session);
  const feelSummary = summariseFeel(session);

  return (
    <li className="flex items-start gap-3 p-3 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors">
      <span
        className={`w-10 h-10 rounded-xl grid place-items-center shrink-0 ${meta.bg} ${meta.fg}`}
      >
        <Icon size={16} strokeWidth={1.9} />
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <p className="font-serif text-[15px] text-gray-900 truncate">
            {meta.label}
          </p>
          <span className="text-[10px] text-gray-400 font-sans whitespace-nowrap">
            {formatRelative(session.performed_at)}
          </span>
        </div>
        <p className="text-[11.5px] text-gray-500 font-sans">
          {[
            session.duration_minutes ? `${session.duration_minutes} min` : null,
            detailSummary,
            feelSummary,
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>
        {session.notes ? (
          <p className="text-[12px] text-gray-600 font-sans italic mt-1 line-clamp-2">
            &ldquo;{session.notes}&rdquo;
          </p>
        ) : null}
      </div>
    </li>
  );
}

function EmptyState({ onLogNew }: { onLogNew: () => void }) {
  return (
    <div className="text-center py-8 px-4 rounded-2xl border border-dashed border-gray-200 bg-[#FAFCF7]">
      <p className="font-serif text-[15px] text-gray-900 mb-1.5">
        No sessions yet
      </p>
      <p className="text-[12.5px] text-gray-500 font-sans mb-5 max-w-[28ch] mx-auto leading-relaxed">
        Log your HBOT, yoga, IV, sauna or anything you do — so we can show you
        what&rsquo;s actually working.
      </p>
      <button
        onClick={onLogNew}
        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#173C3B] text-white text-[10.5px] tracking-[0.18em] uppercase font-semibold font-sans hover:bg-[#173C3B]"
      >
        <Plus size={13} strokeWidth={2.2} />
        Log your first session
      </button>
    </div>
  );
}

function summariseDetails(s: SessionLog): string | null {
  if (!s.details || Object.keys(s.details).length === 0) return null;
  // Surface the first 1-2 meaningful detail values
  const parts: string[] = [];
  for (const [k, v] of Object.entries(s.details)) {
    if (v === "" || v === null || v === undefined) continue;
    if (k === "pressure_ata") parts.push(`${v} ATA`);
    else if (k === "oxygen_percent") parts.push(`${v}% O₂`);
    else if (k === "temp_c") parts.push(`${v}°C`);
    else if (k === "style" || k === "type" || k === "panel" || k === "blend_name" || k === "custom_label") {
      parts.push(String(v));
    } else if (k === "wavelength_nm") parts.push(String(v));
    if (parts.length >= 2) break;
  }
  return parts.length ? parts.join(", ") : null;
}

function summariseFeel(s: SessionLog): string | null {
  const dims = [
    s.energy_after !== null ? `energy ${s.energy_after}` : null,
    s.clarity_after !== null ? `clarity ${s.clarity_after}` : null,
    s.calm_after !== null ? `calm ${s.calm_after}` : null,
  ].filter(Boolean) as string[];
  if (dims.length === 0) return null;
  const avg =
    (Number(s.energy_after || 0) + Number(s.clarity_after || 0) + Number(s.calm_after || 0)) /
    dims.length;
  // Pick a single warm label for the row instead of a verbose "energy 8, clarity 7, calm 9"
  if (avg >= 8) return "felt great";
  if (avg >= 6) return "felt good";
  if (avg >= 4) return "felt mixed";
  return "felt off";
}

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffMs = now - then;
  const diffHr = diffMs / 3_600_000;
  if (diffHr < 1) {
    const min = Math.max(1, Math.round(diffMs / 60_000));
    return `${min}m ago`;
  }
  if (diffHr < 24) return `${Math.round(diffHr)}h ago`;
  const diffDay = Math.round(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
