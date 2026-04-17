export default function ProgressPage() {
  return (
    <>
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mb-2">
          Progress
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-gray-900 leading-tight mb-3">
          Are you getting better?
        </h1>
        <p className="text-sm text-gray-500 font-sans max-w-xl">
          Wellness score trends, dimensions radar, biomarkers, connected
          devices, and goal tracking.
        </p>
      </div>

      <div className="p-12 rounded-2xl bg-white border border-dashed border-gray-300 text-center">
        <div className="w-14 h-14 rounded-full bg-[#EDE7DB] flex items-center justify-center mx-auto mb-4">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B5736A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        </div>
        <p className="font-serif text-xl text-gray-900 mb-2">No data yet</p>
        <p className="text-sm text-gray-500 font-sans max-w-md mx-auto">
          Daily check-ins, connected wearables, and uploaded lab results will
          chart here once you start logging.
        </p>
        <p className="text-[10px] text-gray-400 font-sans mt-6">
          Phase 2: wellness score, dimensions radar, biomarker panels, Apple
          Health + Google Fit sync, goal tracker with streaks.
        </p>
      </div>
    </>
  );
}
