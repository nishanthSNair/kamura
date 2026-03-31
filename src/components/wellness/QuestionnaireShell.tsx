"use client";

import { useState } from "react";
import {
  type WellnessProfile,
  EMPTY_PROFILE,
  isProfileStepValid,
  isLifestyleStepValid,
  isHealthStepValid,
  isGoalsStepValid,
} from "@/data/wellness-questionnaire";
import ProfileStep from "./ProfileStep";
import LifestyleStep from "./LifestyleStep";
import HealthStep from "./HealthStep";
import GoalsStep from "./GoalsStep";

const STEPS = [
  { label: "Profile", icon: "\uD83D\uDC64" },
  { label: "Lifestyle", icon: "\uD83C\uDF3F" },
  { label: "Health", icon: "\u2764\uFE0F" },
  { label: "Goals", icon: "\uD83C\uDFAF" },
];

interface QuestionnaireShellProps {
  onComplete: (profile: WellnessProfile) => void;
}

export default function QuestionnaireShell({ onComplete }: QuestionnaireShellProps) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<WellnessProfile>({ ...EMPTY_PROFILE });

  const update = (partial: Partial<WellnessProfile>) => {
    setProfile((prev) => ({ ...prev, ...partial }));
  };

  const canProceed = [
    isProfileStepValid,
    isLifestyleStepValid,
    isHealthStepValid,
    isGoalsStepValid,
  ][step](profile);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(profile);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Progress bar */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-cream/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((s, i) => (
              <button
                key={s.label}
                onClick={() => i < step && setStep(i)}
                disabled={i > step}
                className={`flex items-center gap-1.5 text-xs font-sans transition-colors ${
                  i === step
                    ? "text-terracotta font-medium"
                    : i < step
                    ? "text-moss cursor-pointer"
                    : "text-gray-300"
                }`}
              >
                <span className="text-sm">{s.icon}</span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            ))}
          </div>
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-terracotta rounded-full transition-all duration-500"
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="max-w-2xl mx-auto px-6 pt-36 pb-32 animate-blueprint-fade-in" key={step}>
        {step === 0 && <ProfileStep profile={profile} onChange={update} />}
        {step === 1 && <LifestyleStep profile={profile} onChange={update} />}
        {step === 2 && <HealthStep profile={profile} onChange={update} />}
        {step === 3 && <GoalsStep profile={profile} onChange={update} />}
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-cream/90 backdrop-blur-sm border-t border-gray-200/50">
        <div className="max-w-2xl mx-auto px-6 py-4 flex justify-between">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="px-5 py-2.5 text-sm font-sans text-gray-400 hover:text-gray-600 disabled:opacity-0 transition-all"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className="px-6 py-2.5 text-sm font-sans font-medium text-white bg-terracotta hover:bg-terracotta-dark disabled:opacity-40 disabled:cursor-not-allowed rounded-full transition-colors"
          >
            {step === 3 ? "See My Dashboard" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
