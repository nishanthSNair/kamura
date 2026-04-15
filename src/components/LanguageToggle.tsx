"use client";

import { useI18n, type Lang } from "@/lib/i18n";

interface Props {
  solid?: boolean;
}

export default function LanguageToggle({ solid }: Props) {
  const { lang, setLang } = useI18n();

  const base = solid
    ? "border-gray-300 text-gray-700"
    : "border-white/30 text-white/80";
  const activeBase = solid
    ? "bg-gray-900 text-white border-gray-900"
    : "bg-white text-gray-900 border-white";

  const pill = (code: Lang, label: string) => (
    <button
      key={code}
      onClick={() => setLang(code)}
      className={`px-2 py-0.5 rounded-full text-[10px] tracking-[0.15em] font-sans font-semibold transition-all border ${
        lang === code ? activeBase : base
      }`}
      aria-label={`Switch to ${label}`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex items-center gap-1">
      {pill("en", "EN")}
      {pill("ar", "AR")}
    </div>
  );
}
