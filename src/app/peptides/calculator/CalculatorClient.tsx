"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CALCULATOR_PRESETS,
  SYRINGE_OPTIONS,
  computeReconstitution,
  formatUnits,
  type SyringeSize,
} from "@/data/reconstitution";
import EmailWaitlist from "@/components/EmailWaitlist";

function SyringeVisual({ units, capacity }: { units: number; capacity: SyringeSize }) {
  const filled = Math.max(0, Math.min(units / capacity, 1));
  const w = 340;
  const barrelX = 30;
  const barrelW = 240;
  const barrelY = 26;
  const barrelH = 34;
  const fillW = barrelW * filled;
  const ticks = capacity === 100 ? 10 : capacity === 50 ? 10 : 6;

  return (
    <svg viewBox={`0 0 ${w} 92`} className="w-full max-w-[380px]" aria-hidden>
      {/* Needle */}
      <line x1={barrelX + barrelW} y1={barrelY + barrelH / 2} x2={w - 8} y2={barrelY + barrelH / 2} stroke="#9CA3AF" strokeWidth="2" />
      {/* Barrel */}
      <rect x={barrelX} y={barrelY} width={barrelW} height={barrelH} rx="6" fill="white" stroke="#C9BBA8" strokeWidth="1.5" />
      {/* Fill */}
      {filled > 0 && (
        <rect
          x={barrelX}
          y={barrelY}
          width={fillW}
          height={barrelH}
          rx="6"
          fill="#B5736A"
          fillOpacity="0.35"
          className="transition-all duration-500"
        />
      )}
      {/* Plunger line */}
      {filled > 0 && filled <= 1 && (
        <line
          x1={barrelX + fillW}
          y1={barrelY - 6}
          x2={barrelX + fillW}
          y2={barrelY + barrelH + 6}
          stroke="#9A5F57"
          strokeWidth="2.5"
          className="transition-all duration-500"
        />
      )}
      {/* Plunger stem */}
      <rect x={4} y={barrelY + barrelH / 2 - 4} width={barrelX - 4} height={8} rx="3" fill="#E5E7EB" />
      {/* Tick marks + labels */}
      {Array.from({ length: ticks + 1 }, (_, i) => {
        const x = barrelX + (i / ticks) * barrelW;
        const val = Math.round((i / ticks) * capacity);
        return (
          <g key={i}>
            <line x1={x} y1={barrelY + barrelH} x2={x} y2={barrelY + barrelH + 5} stroke="#9CA3AF" strokeWidth="1" />
            <text x={x} y={barrelY + barrelH + 17} textAnchor="middle" fontSize="9" fill="#9CA3AF" fontFamily="sans-serif">
              {val}
            </text>
          </g>
        );
      })}
      <text x={barrelX + barrelW / 2} y={16} textAnchor="middle" fontSize="10" fill="#9CA3AF" fontFamily="sans-serif" letterSpacing="2">
        UNITS (U-100)
      </text>
    </svg>
  );
}

export default function CalculatorClient() {
  const [presetSlug, setPresetSlug] = useState<string>("bpc-157");
  const preset = CALCULATOR_PRESETS.find((p) => p.slug === presetSlug) ?? null;

  const [vialMg, setVialMg] = useState<number>(5);
  const [bacMl, setBacMl] = useState<number>(2);
  const [doseMcg, setDoseMcg] = useState<number>(250);
  const [doseUnit, setDoseUnit] = useState<"mcg" | "mg">("mcg");
  const [syringeUnits, setSyringeUnits] = useState<SyringeSize>(100);

  function applyPreset(slug: string) {
    setPresetSlug(slug);
    const p = CALCULATOR_PRESETS.find((x) => x.slug === slug);
    if (!p) return;
    setVialMg(p.vialSizesMg[0]);
    setDoseMcg(p.typicalDoseMcg);
    setDoseUnit(p.typicalDoseMcg >= 1000 ? "mg" : "mcg");
  }

  const result = useMemo(
    () =>
      computeReconstitution({
        vialMg,
        bacMl,
        doseMcg,
        syringeUnits,
        dosesPerWeek: preset?.dosesPerWeek ?? null,
      }),
    [vialMg, bacMl, doseMcg, syringeUnits, preset]
  );

  const doseDisplay = doseUnit === "mg" ? doseMcg / 1000 : doseMcg;

  return (
    <div className="grid lg:grid-cols-2 gap-6 items-start">
      {/* Inputs */}
      <div className="p-6 md:p-8 bg-white rounded-3xl border border-gray-200">
        <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans font-semibold mb-4">
          01 · Your vial
        </p>

        {/* Peptide preset */}
        <label className="block text-xs font-sans font-medium text-gray-700 mb-1.5">
          Peptide
        </label>
        <select
          value={presetSlug}
          onChange={(e) => applyPreset(e.target.value)}
          className="w-full mb-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm font-sans text-gray-900 focus:outline-none focus:border-terracotta"
        >
          {CALCULATOR_PRESETS.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
        {preset && (
          <p className="text-[11px] text-gray-400 font-sans mb-5">
            Published range: {preset.doseRangeLabel} · {preset.frequencyLabel}
            {preset.treatmentSlug && (
              <>
                {" · "}
                <Link
                  href={`/treatments/${preset.treatmentSlug}`}
                  className="text-terracotta hover:underline"
                >
                  full guide →
                </Link>
              </>
            )}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-xs font-sans font-medium text-gray-700 mb-1.5">
              Vial content (mg)
            </label>
            <div className="flex gap-1.5 mb-2">
              {(preset?.vialSizesMg ?? [5, 10]).map((size) => (
                <button
                  key={size}
                  onClick={() => setVialMg(size)}
                  className={`px-3 py-1.5 rounded-full text-xs font-sans font-semibold border transition-colors ${
                    vialMg === size
                      ? "bg-terracotta text-white border-terracotta"
                      : "bg-white text-gray-600 border-gray-200 hover:border-terracotta/50"
                  }`}
                >
                  {size} mg
                </button>
              ))}
            </div>
            <input
              type="number"
              min={0.1}
              step={0.5}
              value={vialMg || ""}
              onChange={(e) => setVialMg(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
            />
          </div>
          <div>
            <label className="block text-xs font-sans font-medium text-gray-700 mb-1.5">
              Bacteriostatic water (mL)
            </label>
            <div className="flex gap-1.5 mb-2">
              {[1, 2, 3].map((ml) => (
                <button
                  key={ml}
                  onClick={() => setBacMl(ml)}
                  className={`px-3 py-1.5 rounded-full text-xs font-sans font-semibold border transition-colors ${
                    bacMl === ml
                      ? "bg-terracotta text-white border-terracotta"
                      : "bg-white text-gray-600 border-gray-200 hover:border-terracotta/50"
                  }`}
                >
                  {ml} mL
                </button>
              ))}
            </div>
            <input
              type="number"
              min={0.1}
              step={0.1}
              value={bacMl || ""}
              onChange={(e) => setBacMl(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
            />
          </div>
        </div>

        <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans font-semibold mb-4 mt-7">
          02 · Your dose
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-sans font-medium text-gray-700 mb-1.5">
              Target dose
            </label>
            <div className="flex">
              <input
                type="number"
                min={1}
                value={doseDisplay || ""}
                onChange={(e) => {
                  const v = parseFloat(e.target.value) || 0;
                  setDoseMcg(doseUnit === "mg" ? v * 1000 : v);
                }}
                className="w-full px-4 py-3 rounded-l-xl border border-r-0 border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
              />
              <div className="flex rounded-r-xl border border-gray-200 overflow-hidden">
                {(["mcg", "mg"] as const).map((u) => (
                  <button
                    key={u}
                    onClick={() => setDoseUnit(u)}
                    className={`px-3 text-xs font-sans font-semibold transition-colors ${
                      doseUnit === u ? "bg-terracotta text-white" : "bg-white text-gray-500"
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs font-sans font-medium text-gray-700 mb-1.5">
              Syringe
            </label>
            <select
              value={syringeUnits}
              onChange={(e) => setSyringeUnits(parseInt(e.target.value, 10) as SyringeSize)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm font-sans text-gray-900 focus:outline-none focus:border-terracotta"
            >
              {SYRINGE_OPTIONS.map((s) => (
                <option key={s.units} value={s.units}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="p-6 md:p-8 bg-[#2A2520] rounded-3xl text-white">
        <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans font-semibold mb-6">
          Draw to
        </p>
        {result ? (
          <>
            <p className="font-serif text-6xl md:text-7xl leading-none mb-1">
              {formatUnits(result.units)}
              <span className="text-2xl text-white/50 ml-2">units</span>
            </p>
            <p className="text-sm text-white/60 font-sans mb-6">
              = {result.doseMl < 0.01 ? result.doseMl.toFixed(4) : result.doseMl.toFixed(2)} mL at{" "}
              {result.concentrationMgMl.toFixed(result.concentrationMgMl < 1 ? 2 : 1)} mg/mL
            </p>

            <div className="mb-6">
              <SyringeVisual units={result.units} capacity={syringeUnits} />
            </div>

            {/* Warnings */}
            {result.exceedsSyringe && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-red-400/15 border border-red-300/30">
                <p className="text-xs font-sans text-red-200">
                  This dose is {formatUnits(result.units)} units — more than your{" "}
                  {syringeUnits}-unit syringe holds.
                  {result.suggestedBacMl
                    ? ` Reconstitute with ${result.suggestedBacMl} mL instead.`
                    : " Use less water or a larger syringe."}
                </p>
              </div>
            )}
            {result.tooSmallToMeasure && !result.exceedsSyringe && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-amber-400/15 border border-amber-300/30">
                <p className="text-xs font-sans text-amber-200">
                  Under 2 units is hard to measure accurately.
                  {result.suggestedBacMl
                    ? ` Use ${result.suggestedBacMl} mL of water for a larger, more precise draw.`
                    : " Add more water for a larger, more precise draw."}
                </p>
              </div>
            )}
            {!result.exceedsSyringe &&
              !result.tooSmallToMeasure &&
              result.suggestedBacMl !== null && (
                <div className="mb-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs font-sans text-white/70">
                    Tip: {result.suggestedBacMl} mL of water would put this dose at a rounder,
                    easier-to-read draw.
                  </p>
                </div>
              )}

            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10">
              <div>
                <p className="font-serif text-2xl">{result.dosesPerVial}</p>
                <p className="text-[10px] tracking-[0.15em] uppercase text-white/40 font-sans">
                  doses / vial
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl">
                  {result.vialDurationDays !== null ? `${result.vialDurationDays}d` : "—"}
                </p>
                <p className="text-[10px] tracking-[0.15em] uppercase text-white/40 font-sans">
                  vial lasts
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl">
                  {result.concentrationMgMl.toFixed(result.concentrationMgMl < 1 ? 2 : 1)}
                </p>
                <p className="text-[10px] tracking-[0.15em] uppercase text-white/40 font-sans">
                  mg / mL
                </p>
              </div>
            </div>

            {/* Portal handoff */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <p className="text-sm font-sans text-white/80 mb-3">
                Track every dose, vial and how you feel — free in your Kamura portal.
              </p>
              <Link
                href="/my"
                className="inline-flex px-5 py-2.5 bg-terracotta hover:bg-terracotta-dark rounded-full text-xs tracking-[0.15em] uppercase font-semibold font-sans transition-colors"
              >
                Start tracking free
              </Link>
            </div>
          </>
        ) : (
          <p className="text-sm text-white/60 font-sans">
            Enter your vial size, water volume and dose to see your draw.
          </p>
        )}
      </div>

      {/* Email capture below both columns */}
      <div className="lg:col-span-2 p-6 md:p-8 rounded-3xl bg-white border border-gray-200 flex flex-wrap items-center justify-between gap-5">
        <div className="max-w-md">
          <p className="font-serif text-xl text-gray-900 mb-1">
            Get the UAE Compounded Peptide Sourcing Guide
          </p>
          <p className="text-xs text-gray-500 font-sans">
            Pharmacy-grade vs. research-grade, what&apos;s legal in the GCC, and the questions to
            ask any provider — free, straight to your inbox.
          </p>
        </div>
        <EmailWaitlist
          source="peptide_waitlist"
          cta="Send me the guide"
          className="min-w-[280px] flex-1 max-w-md"
        />
      </div>
    </div>
  );
}
