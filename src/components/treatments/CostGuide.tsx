interface CostGuideProps {
  costEstimate?: string;
  uaeAvailable: boolean;
}

export default function CostGuide({ costEstimate, uaeAvailable }: CostGuideProps) {
  if (!costEstimate) return null;

  return (
    <section id="cost" className="scroll-mt-24">
      <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/[0.06] rounded-2xl p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-terracotta/10 dark:bg-terracotta/15 flex items-center justify-center shrink-0">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-terracotta"
            >
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div>
            <h2 className="font-serif text-lg text-gray-900 dark:text-[#F5F0EB] mb-1">
              Cost Guide
            </h2>
            <p className="text-lg font-semibold text-terracotta dark:text-kamura-gold font-sans mb-1">
              {costEstimate}
            </p>
            <p className="text-xs text-gray-400 dark:text-[#6B6560] font-sans">
              {uaeAvailable
                ? "Estimated UAE pricing. Costs vary by provider, dosage, and treatment plan."
                : "Limited UAE availability. Costs may vary for international sourcing."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
