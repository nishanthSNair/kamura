"use client";

import Link from "next/link";
import AnimatedConnecting from "@/components/AnimatedConnecting";
import InlineSearch from "@/components/InlineSearch";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useI18n } from "@/lib/i18n";

interface Props {
  treatmentCount: number;
  citationCount: number;
  providerCount: number;
}

export default function HomeHero({
  treatmentCount,
  citationCount,
  providerCount,
}: Props) {
  const { t } = useI18n();

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
      <AnimatedConnecting />

      <p className="text-base md:text-lg text-white/80 max-w-[560px] mx-auto leading-relaxed font-sans font-light mb-8">
        {t("home.hero.description")}
      </p>

      <div className="mb-8">
        <InlineSearch
          variant="hero"
          placeholder={t("home.hero.search")}
          popularSearches={[
            "BPC-157",
            "NAD+ therapy",
            "GLP-1",
            "Red light therapy",
            "Peptide dashboard",
          ]}
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/treatments"
          className="px-6 py-3 bg-white text-gray-900 text-sm font-semibold rounded-xl hover:bg-white/90 transition-colors font-sans"
        >
          {t("home.hero.cta.treatments")}
        </Link>
        <Link
          href="/wellness-checker"
          className="px-6 py-3 border border-white/50 text-white text-sm font-semibold rounded-xl hover:bg-white/10 transition-colors font-sans"
        >
          {t("home.hero.cta.wellness")}
        </Link>
      </div>

      {/* Animated stat counters */}
      <div className="flex items-center justify-center gap-8 md:gap-12 mt-10 font-sans">
        <Stat
          value={treatmentCount}
          label={t("home.stats.treatments")}
          suffix="+"
        />
        <span className="w-px h-6 bg-white/20" />
        <Stat
          value={citationCount}
          label={t("home.stats.citations")}
          suffix="+"
        />
        <span className="hidden sm:inline w-px h-6 bg-white/20" />
        <Stat
          value={providerCount}
          label={t("home.stats.providers")}
          suffix="+"
          className="hidden sm:flex"
        />
      </div>
    </div>
  );
}

function Stat({
  value,
  label,
  suffix,
  className = "",
}: {
  value: number;
  label: string;
  suffix?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <AnimatedCounter
        end={value}
        suffix={suffix}
        className="font-serif text-3xl md:text-4xl text-white"
      />
      <span className="text-[10px] tracking-[0.2em] uppercase text-white/50 mt-1">
        {label}
      </span>
    </div>
  );
}
