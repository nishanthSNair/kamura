interface Props {
  eyebrow?: string;
  title: string;
  body: string;
  linkLabel?: string;
  linkHref?: string;
}

export default function InsightCard({
  eyebrow = "Insight of the day",
  title,
  body,
  linkLabel,
  linkHref,
}: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200/60 bg-gradient-to-br from-[#FBF8F1] via-[#FAF5EB] to-[#F7EFDF] p-6 md:p-7">
      {/* Copper radial ornament in bottom-right */}
      <div
        aria-hidden
        className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(181,115,106,0.35) 0%, rgba(181,115,106,0.08) 50%, transparent 75%)",
        }}
      />
      {/* Thin copper line accent top-left */}
      <div
        aria-hidden
        className="absolute top-6 left-0 h-px w-12 bg-terracotta/60"
      />

      <div className="relative">
        <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans font-semibold mb-3">
          {eyebrow}
        </p>
        <h3 className="font-serif text-xl md:text-2xl text-gray-900 leading-[1.25] mb-3 max-w-lg">
          {title}
        </h3>
        <p className="text-sm text-gray-600 font-sans leading-relaxed max-w-xl">
          {body}
        </p>
        {linkLabel && linkHref && (
          <a
            href={linkHref}
            className="inline-flex items-center gap-1 mt-4 text-[11px] tracking-[0.15em] uppercase text-terracotta font-sans font-semibold hover:gap-2 transition-all"
          >
            {linkLabel}
            <span>→</span>
          </a>
        )}
      </div>
    </div>
  );
}
