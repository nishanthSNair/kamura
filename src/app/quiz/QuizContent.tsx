"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  questions,
  archetypes,
  dimensionLabels,
  type WellnessArchetype,
  type WellnessDimension,
} from "@/data/quiz";
import { listings } from "@/data/listings";

type QuizState = "intro" | "playing" | "results";

export default function QuizContent() {
  const [state, setState] = useState<QuizState>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [archetypeVotes, setArchetypeVotes] = useState<Record<WellnessArchetype, number>>({
    "The Biohacker": 0,
    "The Yogi": 0,
    "The Healer": 0,
    "The Explorer": 0,
    "The Performer": 0,
  });

  const totalQuestions = questions.length;
  const progress = ((currentQ) / totalQuestions) * 100;

  function startQuiz() {
    setState("playing");
    setCurrentQ(0);
    setAnswers([]);
    setSelectedOption(null);
    setArchetypeVotes({
      "The Biohacker": 0,
      "The Yogi": 0,
      "The Healer": 0,
      "The Explorer": 0,
      "The Performer": 0,
    });
  }

  function selectAnswer(optionIndex: number) {
    setSelectedOption(optionIndex);
    const option = questions[currentQ].options[optionIndex];

    setTimeout(() => {
      const newAnswers = [...answers, option.score];
      const newVotes = { ...archetypeVotes };
      newVotes[option.archetype] = (newVotes[option.archetype] || 0) + 1;

      setAnswers(newAnswers);
      setArchetypeVotes(newVotes);
      setSelectedOption(null);

      if (currentQ + 1 >= totalQuestions) {
        setState("results");
      } else {
        setCurrentQ(currentQ + 1);
      }
    }, 400);
  }

  const results = useMemo(() => {
    if (state !== "results") return null;

    const totalScore = answers.reduce((sum, s) => sum + s, 0);
    const maxPossible = totalQuestions * 10;
    const scorePercent = Math.round((totalScore / maxPossible) * 100);

    // Find dominant archetype
    const sortedArchetypes = Object.entries(archetypeVotes).sort(
      ([, a], [, b]) => b - a
    );
    const primaryArchetype = sortedArchetypes[0][0] as WellnessArchetype;
    const secondaryArchetype = sortedArchetypes[1][0] as WellnessArchetype;

    // Build dimension scores
    const dimensionScores: Partial<Record<WellnessDimension, number[]>> = {};
    questions.forEach((q, i) => {
      if (answers[i] !== undefined) {
        if (!dimensionScores[q.dimension]) dimensionScores[q.dimension] = [];
        dimensionScores[q.dimension]!.push(answers[i]);
      }
    });

    const dimensionAverages: { dimension: WellnessDimension; score: number }[] = [];
    for (const [dim, scores] of Object.entries(dimensionScores)) {
      const avg = Math.round(
        (scores.reduce((s, v) => s + v, 0) / (scores.length * 10)) * 100
      );
      dimensionAverages.push({ dimension: dim as WellnessDimension, score: avg });
    }
    dimensionAverages.sort((a, b) => b.score - a.score);

    // Score label
    let scoreLabel: string;
    if (scorePercent >= 85) scoreLabel = "Exceptional";
    else if (scorePercent >= 70) scoreLabel = "Strong";
    else if (scorePercent >= 55) scoreLabel = "Growing";
    else if (scorePercent >= 40) scoreLabel = "Developing";
    else scoreLabel = "Starting Out";

    return {
      scorePercent,
      scoreLabel,
      primaryArchetype,
      secondaryArchetype,
      dimensionAverages,
    };
  }, [state, answers, archetypeVotes, totalQuestions]);

  // ─── Intro Screen ───
  if (state === "intro") {
    return (
      <>
        <section className="relative h-[60vh] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1920&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative z-10 text-center text-white px-6 max-w-3xl">
            <p className="text-xs tracking-[0.3em] uppercase mb-6 text-white/80">
              KAMURA Wellness Quiz
            </p>
            <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
              Discover Your Wellness Path
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed font-sans mb-10">
              10 questions. 2 minutes. Find out your wellness score, your
              archetype, and where to start your longevity journey.
            </p>
            <button
              onClick={startQuiz}
              className="inline-block border border-white/70 text-white px-8 py-3 text-sm tracking-[0.15em] uppercase hover:bg-white hover:text-gray-900 transition-all duration-300 font-sans"
            >
              Start the Quiz
            </button>
          </div>
        </section>

        {/* What you'll discover */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B5736A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3 className="font-serif text-lg text-gray-900 mb-2">Your Wellness Score</h3>
              <p className="text-sm text-gray-500 font-sans">
                See how you score across 8 dimensions of wellness — from sleep to purpose.
              </p>
            </div>
            <div>
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-amber-50 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B5736A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
              </div>
              <h3 className="font-serif text-lg text-gray-900 mb-2">Your Wellness Archetype</h3>
              <p className="text-sm text-gray-500 font-sans">
                Are you The Biohacker? The Yogi? The Healer? Discover your wellness personality.
              </p>
            </div>
            <div>
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-50 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B5736A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3 className="font-serif text-lg text-gray-900 mb-2">Where to Start</h3>
              <p className="text-sm text-gray-500 font-sans">
                Get personalized recommendations for clinics, studios, and retreats in the UAE.
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }

  // ─── Quiz Playing ───
  if (state === "playing") {
    const q = questions[currentQ];

    return (
      <section className="min-h-screen bg-white pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-6">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400 font-sans uppercase tracking-wider">
                Question {currentQ + 1} of {totalQuestions}
              </span>
              <span className="text-xs text-gray-400 font-sans">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-terracotta rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Dimension Badge */}
          <span className="inline-block text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-sans mb-4">
            {dimensionLabels[q.dimension]}
          </span>

          {/* Question */}
          <h2
            key={q.id}
            className="font-serif text-2xl md:text-3xl text-gray-900 leading-snug mb-10 animate-fade-in"
          >
            {q.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {q.options.map((option, i) => (
              <button
                key={i}
                onClick={() => selectAnswer(i)}
                disabled={selectedOption !== null}
                className={`w-full text-left p-5 rounded-xl border transition-all duration-300 font-sans text-sm leading-relaxed ${
                  selectedOption === i
                    ? "border-terracotta bg-terracotta/5 text-gray-900"
                    : selectedOption !== null
                    ? "border-gray-100 text-gray-400 cursor-not-allowed"
                    : "border-gray-200 text-gray-700 hover:border-terracotta/50 hover:bg-gray-50 cursor-pointer"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                      selectedOption === i
                        ? "border-terracotta bg-terracotta"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedOption === i && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </span>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ─── Results Screen ───
  if (state === "results" && results) {
    const primary = archetypes[results.primaryArchetype];
    const secondary = archetypes[results.secondaryArchetype];

    return (
      <>
        {/* Results Hero */}
        <section className="pt-28 pb-16 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs tracking-[0.3em] uppercase mb-6 text-gray-400">
              Your Results
            </p>

            {/* Score Circle */}
            <div className="relative w-40 h-40 mx-auto mb-8">
              <svg className="w-40 h-40 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#f3f4f6" strokeWidth="8" />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="#B5736A"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${results.scorePercent * 3.27} 327`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-serif text-gray-900">
                  {results.scorePercent}
                </span>
                <span className="text-xs text-gray-400 font-sans uppercase tracking-wider">
                  out of 100
                </span>
              </div>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl text-gray-900 mb-2">
              {results.scoreLabel}
            </h1>
            <p className="text-gray-500 font-sans mb-8">
              Your overall wellness score
            </p>

            <div className="w-12 h-px bg-terracotta/40 mx-auto" />
          </div>
        </section>

        {/* Archetype */}
        <section className="max-w-2xl mx-auto px-6 pb-16">
          <div className={`rounded-xl border ${primary.color.border} ${primary.color.bg} p-8 mb-6`}>
            <p className="text-xs tracking-[0.3em] uppercase mb-3 text-gray-400 font-sans">
              Your Wellness Archetype
            </p>
            <h2 className={`font-serif text-3xl ${primary.color.text} mb-2`}>
              {primary.name}
            </h2>
            <p className="font-serif text-lg text-gray-600 italic mb-4">
              &ldquo;{primary.tagline}&rdquo;
            </p>
            <p className="text-sm text-gray-600 font-sans leading-relaxed mb-5">
              {primary.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {primary.traits.map((trait) => (
                <span
                  key={trait}
                  className={`text-xs px-3 py-1 rounded-full font-sans ${primary.color.bg} ${primary.color.text} border ${primary.color.border}`}
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-500 font-sans text-center">
            With a touch of <span className={`font-medium ${secondary.color.text}`}>{secondary.name}</span>
          </p>
        </section>

        {/* Dimension Breakdown */}
        <section className="max-w-2xl mx-auto px-6 pb-16">
          <h3 className="font-serif text-xl text-gray-900 mb-6">
            Your Wellness Breakdown
          </h3>
          <div className="space-y-4">
            {results.dimensionAverages.map(({ dimension, score }) => (
              <div key={dimension}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-sans text-gray-700">
                    {dimensionLabels[dimension]}
                  </span>
                  <span className="text-sm font-sans text-gray-400">{score}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-terracotta/70 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 30-Day Wellness Plan */}
        <section className="max-w-2xl mx-auto px-6 pb-16">
          <h3 className="font-serif text-2xl text-gray-900 mb-2">
            Your Personalized 30-Day Plan
          </h3>
          <p className="text-sm text-gray-500 font-sans mb-8">
            Based on your archetype, here&apos;s how to kickstart your wellness journey.
          </p>
          <div className="space-y-6">
            {primary.plan.map((week, wi) => (
              <div
                key={week.week}
                className={`rounded-xl border p-6 ${wi === 0 ? `${primary.color.border} ${primary.color.bg}` : "border-gray-200 bg-white"}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs font-sans font-medium px-2.5 py-1 rounded-full ${wi === 0 ? `${primary.color.text} bg-white/60` : "text-gray-500 bg-gray-100"}`}>
                    {week.week}
                  </span>
                  <span className="text-sm font-sans font-medium text-gray-700">
                    {week.theme}
                  </span>
                </div>
                <ul className="space-y-2">
                  {week.steps.map((step, si) => (
                    <li key={si} className="flex gap-3 text-sm text-gray-600 font-sans">
                      <span className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${wi === 0 ? primary.color.border : "border-gray-200"}`}>
                        <span className="text-xs text-gray-400">{si + 1}</span>
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Practitioners */}
        <section className="max-w-2xl mx-auto px-6 pb-16">
          <h3 className="font-serif text-xl text-gray-900 mb-2">
            Recommended Places for You
          </h3>
          <p className="text-sm text-gray-500 font-sans mb-6">
            Real wellness spaces in the UAE matched to your archetype.
          </p>
          <div className="space-y-3">
            {primary.recommendedListingIds
              .map((id) => listings.find((l) => l.id === id))
              .filter(Boolean)
              .map((listing) => (
                <a
                  key={listing!.id}
                  href={listing!.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white hover:border-terracotta/30 hover:shadow-sm transition-all group"
                >
                  <div>
                    <p className="text-sm font-sans font-medium text-gray-800 group-hover:text-terracotta transition-colors">
                      {listing!.name}
                    </p>
                    <p className="text-xs text-gray-400 font-sans mt-0.5">
                      {listing!.tagline} &middot; {listing!.location}, {listing!.city}
                    </p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B5736A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 ml-4">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              ))}
          </div>
          <Link
            href="/explore"
            className="inline-block text-sm text-terracotta hover:text-terracotta-dark transition-colors font-sans mt-4"
          >
            See all places in the Explore directory &rarr;
          </Link>
        </section>

        {/* Share & Actions */}
        <section className="border-t border-gray-100 bg-gray-50/50">
          <div className="max-w-2xl mx-auto px-6 py-16 text-center">
            <h3 className="font-serif text-xl text-gray-900 mb-6">
              Share Your Results
            </h3>
            <div className="flex flex-wrap gap-3 justify-center mb-10">
              <button
                onClick={() => {
                  const text = `I'm ${primary.name} with a wellness score of ${results.scorePercent}/100! Discover your wellness path at kamuralife.com/quiz`;
                  if (navigator.share) {
                    navigator.share({ title: "My KAMURA Wellness Results", text, url: "https://kamuralife.com/quiz" });
                  } else {
                    navigator.clipboard.writeText(text);
                    alert("Results copied to clipboard!");
                  }
                }}
                className="px-6 py-3 border border-gray-200 text-sm font-sans text-gray-700 hover:border-gray-400 transition-colors rounded-lg flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                Share
              </button>
              <button
                onClick={() => {
                  const text = `I'm ${primary.name} with a wellness score of ${results.scorePercent}/100! Discover your wellness path at kamuralife.com/quiz`;
                  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
                  window.open(url, "_blank");
                }}
                className="px-6 py-3 border border-gray-200 text-sm font-sans text-gray-700 hover:border-gray-400 transition-colors rounded-lg"
              >
                Post on X
              </button>
              <button
                onClick={() => {
                  const url = `https://wa.me/?text=${encodeURIComponent(`I'm ${primary.name} with a wellness score of ${results.scorePercent}/100! Take the quiz: https://kamuralife.com/quiz`)}`;
                  window.open(url, "_blank");
                }}
                className="px-6 py-3 border border-gray-200 text-sm font-sans text-gray-700 hover:border-gray-400 transition-colors rounded-lg"
              >
                WhatsApp
              </button>
            </div>

            <div className="w-12 h-px bg-terracotta/40 mx-auto mb-10" />

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={startQuiz}
                className="px-6 py-3 border border-gray-200 text-sm tracking-[0.1em] uppercase text-gray-700 hover:border-gray-400 transition-colors font-sans rounded-lg"
              >
                Retake Quiz
              </button>
              <Link
                href="/explore"
                className="px-6 py-3 bg-gray-900 text-white text-sm tracking-[0.1em] uppercase hover:bg-terracotta transition-colors font-sans rounded-lg text-center"
              >
                Explore Directory
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return null;
}
