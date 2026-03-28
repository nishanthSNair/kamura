"use client";

import { type IntakeAnswers, GOAL_OPTIONS } from "@/data/blueprint";
import IntakeProgress from "./IntakeProgress";

interface IntakeFormProps {
 step: number;
 answers: Partial<IntakeAnswers>;
 onUpdate: (field: string, value: unknown) => void;
 onNext: () => void;
 onBack: () => void;
 onComplete: (answers: IntakeAnswers) => void;
}

const TOTAL_STEPS = 10;

function RadioCard({
 label,
 selected,
 onClick,
 description,
}: {
 label: string;
 selected: boolean;
 onClick: () => void;
 description?: string;
}) {
 return (
 <button
 onClick={onClick}
 className={`w-full text-left px-5 py-4 rounded-xl border transition-all font-sans ${
 selected
 ? "border-terracotta bg-terracotta/5"
 : "border-gray-200 bg-white hover:border-sage/40"
 }`}
 >
 <span
 className={`text-[15px] font-medium ${
 selected
 ? "text-terracotta"
 : "text-gray-800"
 }`}
 >
 {label}
 </span>
 {description && (
 <span className="block text-xs text-gray-500 mt-1">
 {description}
 </span>
 )}
 </button>
 );
}

function Slider({
 label,
 value,
 onChange,
 min = 1,
 max = 10,
}: {
 label: string;
 value: number;
 onChange: (v: number) => void;
 min?: number;
 max?: number;
}) {
 return (
 <div className="mb-6">
 <div className="flex items-center justify-between mb-3">
 <span className="text-sm text-gray-600 font-sans">
 {label}
 </span>
 <span className="text-lg font-serif text-terracotta font-semibold">
 {value}
 </span>
 </div>
 <input
 type="range"
 min={min}
 max={max}
 value={value}
 onChange={(e) => onChange(Number(e.target.value))}
 className="w-full blueprint-slider bg-gray-200"
 />
 <div className="flex justify-between mt-1">
 <span className="text-[10px] text-gray-400 font-sans">Low</span>
 <span className="text-[10px] text-gray-400 font-sans">High</span>
 </div>
 </div>
 );
}

export default function IntakeForm({
 step,
 answers,
 onUpdate,
 onNext,
 onBack,
 onComplete,
}: IntakeFormProps) {
 const isLastStep = step === TOTAL_STEPS - 1;

 function canProceed(): boolean {
 switch (step) {
 case 0:
 return !!answers.age && !!answers.biologicalSex;
 case 1:
 return !!answers.heightCm && !!answers.weightKg;
 case 2:
 return !!answers.sleepHours && !!answers.wakeTime;
 case 3:
 return !!answers.restingHR;
 case 4:
 return (
 answers.energyMorning !== undefined &&
 answers.energyAfternoon !== undefined &&
 answers.energyEvening !== undefined
 );
 case 5:
 return answers.stressLevel !== undefined;
 case 6:
 return !!answers.exerciseFreq;
 case 7:
 return !!answers.dietType;
 case 8:
 return (
 !!answers.alcoholFreq && answers.caffeineDaily !== undefined
 );
 case 9:
 return !!answers.goals && answers.goals.length >= 1 && answers.goals.length <= 3;
 default:
 return false;
 }
 }

 function handleNext() {
 if (isLastStep) {
 onComplete(answers as IntakeAnswers);
 } else {
 onNext();
 }
 }

 function toggleGoal(goal: string) {
 const current = answers.goals || [];
 if (current.includes(goal)) {
 onUpdate(
 "goals",
 current.filter((g) => g !== goal)
 );
 } else if (current.length < 3) {
 onUpdate("goals", [...current, goal]);
 }
 }

 function renderStep() {
 switch (step) {
 case 0:
 return (
 <div key="step-0" className="animate-blueprint-fade-in">
 <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-2">
 Let&apos;s start with the basics
 </h2>
 <p className="text-sm text-gray-500 font-sans mb-8">
 Your age and biological sex help us calculate accurate baselines.
 </p>
 <div className="space-y-4">
 <div>
 <label className="block text-sm text-gray-600 font-sans mb-2">
 Age
 </label>
 <input
 type="number"
 min={16}
 max={100}
 value={answers.age || ""}
 onChange={(e) =>
 onUpdate("age", parseInt(e.target.value) || undefined)
 }
 placeholder="Enter your age"
 className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 font-sans focus:outline-none focus:border-terracotta transition-colors"
 />
 </div>
 <div>
 <label className="block text-sm text-gray-600 font-sans mb-2">
 Biological Sex
 </label>
 <div className="grid grid-cols-2 gap-3">
 <RadioCard
 label="Male"
 selected={answers.biologicalSex === "male"}
 onClick={() => onUpdate("biologicalSex", "male")}
 />
 <RadioCard
 label="Female"
 selected={answers.biologicalSex === "female"}
 onClick={() => onUpdate("biologicalSex", "female")}
 />
 </div>
 </div>
 </div>
 </div>
 );

 case 1:
 return (
 <div key="step-1" className="animate-blueprint-fade-in">
 <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-2">
 Height &amp; Weight
 </h2>
 <p className="text-sm text-gray-500 font-sans mb-8">
 Used to assess metabolic baseline. We never share this data.
 </p>
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm text-gray-600 font-sans mb-2">
 Height (cm)
 </label>
 <input
 type="number"
 min={100}
 max={250}
 value={answers.heightCm || ""}
 onChange={(e) =>
 onUpdate("heightCm", parseInt(e.target.value) || undefined)
 }
 placeholder="170"
 className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 font-sans focus:outline-none focus:border-terracotta transition-colors"
 />
 </div>
 <div>
 <label className="block text-sm text-gray-600 font-sans mb-2">
 Weight (kg)
 </label>
 <input
 type="number"
 min={30}
 max={250}
 value={answers.weightKg || ""}
 onChange={(e) =>
 onUpdate("weightKg", parseInt(e.target.value) || undefined)
 }
 placeholder="70"
 className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 font-sans focus:outline-none focus:border-terracotta transition-colors"
 />
 </div>
 </div>
 </div>
 );

 case 2:
 return (
 <div key="step-2" className="animate-blueprint-fade-in">
 <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-2">
 Sleep Habits
 </h2>
 <p className="text-sm text-gray-500 font-sans mb-8">
 Sleep duration and timing shape nearly every wellness indicator.
 </p>
 <div className="space-y-4">
 <div>
 <label className="block text-sm text-gray-600 font-sans mb-2">
 Average sleep per night (hours)
 </label>
 <div className="grid grid-cols-4 gap-2">
 {[5, 6, 7, 8, 9].map((h) => (
 <RadioCard
 key={h}
 label={`${h}h`}
 selected={answers.sleepHours === h}
 onClick={() => onUpdate("sleepHours", h)}
 />
 ))}
 </div>
 </div>
 <div>
 <label className="block text-sm text-gray-600 font-sans mb-2">
 Typical wake-up time
 </label>
 <div className="grid grid-cols-3 gap-2">
 {["5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM", "9:00+ AM"].map(
 (t) => (
 <RadioCard
 key={t}
 label={t}
 selected={answers.wakeTime === t}
 onClick={() => onUpdate("wakeTime", t)}
 />
 )
 )}
 </div>
 </div>
 </div>
 </div>
 );

 case 3:
 return (
 <div key="step-3" className="animate-blueprint-fade-in">
 <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-2">
 Resting Heart Rate
 </h2>
 <p className="text-sm text-gray-500 font-sans mb-8">
 A rough indicator of cardiovascular fitness. Check your
 smartwatch or place two fingers on your wrist for 15 seconds
 and multiply by 4.
 </p>
 <div className="space-y-3">
 <RadioCard
 label="Under 60 bpm"
 description="Athletic range — strong cardiovascular fitness"
 selected={answers.restingHR === "under60"}
 onClick={() => onUpdate("restingHR", "under60")}
 />
 <RadioCard
 label="60–80 bpm"
 description="Normal resting range for most adults"
 selected={answers.restingHR === "60to80"}
 onClick={() => onUpdate("restingHR", "60to80")}
 />
 <RadioCard
 label="80+ bpm"
 description="Elevated — may indicate stress or deconditioning"
 selected={answers.restingHR === "over80"}
 onClick={() => onUpdate("restingHR", "over80")}
 />
 </div>
 </div>
 );

 case 4:
 return (
 <div key="step-4" className="animate-blueprint-fade-in">
 <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-2">
 Energy Throughout the Day
 </h2>
 <p className="text-sm text-gray-500 font-sans mb-8">
 Rate your typical energy levels at different times. 1 = exhausted,
 10 = peak energy.
 </p>
 <Slider
 label="Morning energy"
 value={answers.energyMorning ?? 5}
 onChange={(v) => onUpdate("energyMorning", v)}
 />
 <Slider
 label="Afternoon energy"
 value={answers.energyAfternoon ?? 5}
 onChange={(v) => onUpdate("energyAfternoon", v)}
 />
 <Slider
 label="Evening energy"
 value={answers.energyEvening ?? 5}
 onChange={(v) => onUpdate("energyEvening", v)}
 />
 </div>
 );

 case 5:
 return (
 <div key="step-5" className="animate-blueprint-fade-in">
 <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-2">
 Stress Level
 </h2>
 <p className="text-sm text-gray-500 font-sans mb-8">
 How stressed do you feel on a typical day? 1 = very calm, 10 =
 overwhelmed.
 </p>
 <Slider
 label="Daily stress"
 value={answers.stressLevel ?? 5}
 onChange={(v) => onUpdate("stressLevel", v)}
 />
 </div>
 );

 case 6:
 return (
 <div key="step-6" className="animate-blueprint-fade-in">
 <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-2">
 Exercise Frequency
 </h2>
 <p className="text-sm text-gray-500 font-sans mb-8">
 How often do you exercise per week?
 </p>
 <div className="space-y-3">
 <RadioCard
 label="No regular exercise"
 selected={answers.exerciseFreq === "none"}
 onClick={() => onUpdate("exerciseFreq", "none")}
 />
 <RadioCard
 label="1–2 times per week"
 selected={answers.exerciseFreq === "1-2x"}
 onClick={() => onUpdate("exerciseFreq", "1-2x")}
 />
 <RadioCard
 label="3–5 times per week"
 selected={answers.exerciseFreq === "3-5x"}
 onClick={() => onUpdate("exerciseFreq", "3-5x")}
 />
 <RadioCard
 label="Daily"
 selected={answers.exerciseFreq === "daily"}
 onClick={() => onUpdate("exerciseFreq", "daily")}
 />
 </div>
 </div>
 );

 case 7:
 return (
 <div key="step-7" className="animate-blueprint-fade-in">
 <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-2">
 Diet Type
 </h2>
 <p className="text-sm text-gray-500 font-sans mb-8">
 What best describes your current eating pattern?
 </p>
 <div className="space-y-3">
 {(
 [
 ["omnivore", "Omnivore", "Balanced mix of everything"],
 ["plant-based", "Plant-Based", "Mostly or entirely plant foods"],
 ["keto", "Keto / Low-Carb", "High fat, very low carbohydrate"],
 ["IF", "Intermittent Fasting", "Time-restricted eating windows"],
 [
 "no-structure",
 "No Particular Structure",
 "Eating without a specific plan",
 ],
 ] as const
 ).map(([value, label, desc]) => (
 <RadioCard
 key={value}
 label={label}
 description={desc}
 selected={answers.dietType === value}
 onClick={() => onUpdate("dietType", value)}
 />
 ))}
 </div>
 </div>
 );

 case 8:
 return (
 <div key="step-8" className="animate-blueprint-fade-in">
 <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-2">
 Alcohol &amp; Caffeine
 </h2>
 <p className="text-sm text-gray-500 font-sans mb-8">
 Both affect sleep quality, recovery, and metabolic health.
 </p>
 <div className="space-y-6">
 <div>
 <label className="block text-sm text-gray-600 font-sans mb-3">
 Alcohol consumption
 </label>
 <div className="space-y-2">
 <RadioCard
 label="None"
 selected={answers.alcoholFreq === "none"}
 onClick={() => onUpdate("alcoholFreq", "none")}
 />
 <RadioCard
 label="Occasional"
 description="A few drinks per week or less"
 selected={answers.alcoholFreq === "occasional"}
 onClick={() => onUpdate("alcoholFreq", "occasional")}
 />
 <RadioCard
 label="Regular"
 description="Most days of the week"
 selected={answers.alcoholFreq === "regular"}
 onClick={() => onUpdate("alcoholFreq", "regular")}
 />
 </div>
 </div>
 <div>
 <label className="block text-sm text-gray-600 font-sans mb-3">
 Cups of coffee / tea per day
 </label>
 <div className="grid grid-cols-4 gap-2">
 {[0, 1, 2, 3, 4, 5].map((n) => (
 <RadioCard
 key={n}
 label={n === 5 ? "5+" : String(n)}
 selected={answers.caffeineDaily === n}
 onClick={() => onUpdate("caffeineDaily", n)}
 />
 ))}
 </div>
 </div>
 </div>
 </div>
 );

 case 9:
 return (
 <div key="step-9" className="animate-blueprint-fade-in">
 <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-2">
 Your Top Goals
 </h2>
 <p className="text-sm text-gray-500 font-sans mb-8">
 Select up to 3 goals that matter most to you right now.
 </p>
 <div className="flex flex-wrap gap-2">
 {GOAL_OPTIONS.map((goal) => {
 const selected = (answers.goals || []).includes(goal);
 const atMax =
 (answers.goals || []).length >= 3 && !selected;
 return (
 <button
 key={goal}
 onClick={() => toggleGoal(goal)}
 disabled={atMax}
 className={`px-4 py-2.5 rounded-full border text-sm font-sans transition-all ${
 selected
 ? "border-terracotta bg-terracotta/10 text-terracotta"
 : atMax
 ? "border-gray-100 text-gray-300 cursor-not-allowed"
 : "border-gray-200 text-gray-700 hover:border-sage/40 bg-white"
 }`}
 >
 {goal}
 </button>
 );
 })}
 </div>
 <p className="text-xs text-gray-400 font-sans mt-3">
 {(answers.goals || []).length}/3 selected
 </p>
 </div>
 );

 default:
 return null;
 }
 }

 return (
 <section className="min-h-screen flex items-center justify-center px-6 py-20">
 <div className="w-full max-w-lg">
 <IntakeProgress currentStep={step} totalSteps={TOTAL_STEPS} />

 {renderStep()}

 <div className="flex items-center justify-between mt-10">
 {step > 0 ? (
 <button
 onClick={onBack}
 className="text-sm text-gray-500 hover:text-moss transition-colors font-sans"
 >
 &larr; Back
 </button>
 ) : (
 <div />
 )}
 <button
 onClick={handleNext}
 disabled={!canProceed()}
 className={`px-8 py-3 rounded-xl text-sm font-sans font-medium tracking-wide transition-all ${
 canProceed()
 ? "bg-terracotta text-white hover:bg-terracotta-dark"
 : "bg-gray-200 text-gray-400 cursor-not-allowed"
 }`}
 >
 {isLastStep ? "Build My Blueprint" : "Continue"}
 </button>
 </div>
 </div>
 </section>
 );
}
