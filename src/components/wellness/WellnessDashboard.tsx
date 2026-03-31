"use client";

import { useMemo, useState } from "react";
import type { WellnessProfile } from "@/data/wellness-questionnaire";
import type { EnrichedMatchedTreatment, BlogPostSummary } from "@/data/wellness-checker";
import {
  rankTreatments,
  enrichResults,
  buildProtocol,
  matchBlogPosts,
} from "@/data/wellness-checker";
import {
  computeDimensionScores,
  computeOverallScore,
  getScoreLabel,
  computeBudgetBreakdown,
  detectRiskFlags,
  COMMUNITY_AVERAGES,
} from "@/data/wellness-scoring";
import type { BudgetTier } from "@/data/wellness-questionnaire";
import DashboardCard from "./DashboardCard";
import ScoreRing from "./ScoreRing";
import GoalTracker from "./GoalTracker";
import BudgetChart from "./BudgetChart";
import RiskFlags from "./RiskFlags";
import RadarChart from "@/components/share-cards/RadarChart";
import ProtocolPlan from "@/components/checker/ProtocolPlan";
import ReportTreatmentCard from "@/components/checker/ReportTreatmentCard";
import RelatedContent from "@/components/checker/RelatedContent";
import ShareCardModal from "@/components/share-cards/ShareCardModal";
import BodyMapCard from "@/components/share-cards/BodyMapCard";
import { ZONES } from "@/data/wellness-concerns";

interface WellnessDashboardProps {
  profile: WellnessProfile;
  blogPosts: BlogPostSummary[];
  onRetake: () => void;
  onGoalToggle: (goalId: string, checked: boolean) => void;
}

export default function WellnessDashboard({
  profile,
  blogPosts,
  onRetake,
  onGoalToggle,
}: WellnessDashboardProps) {
  const [showAllTreatments, setShowAllTreatments] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);

  // Compute dimension scores
  const dimensionScores = useMemo(() => computeDimensionScores(profile), [profile]);
  const overallScore = useMemo(() => computeOverallScore(dimensionScores), [dimensionScores]);
  const scoreLabel = getScoreLabel(overallScore);

  // Rank and enrich treatments
  const enrichedResults: EnrichedMatchedTreatment[] = useMemo(() => {
    if (profile.selectedConcerns.length === 0) return [];
    const ranked = rankTreatments({
      selectedConcerns: profile.selectedConcerns,
      duration: profile.duration || undefined,
      age: profile.age || undefined,
      goals: profile.goals,
      treatmentPreference: profile.treatmentPreference || undefined,
    });
    return enrichResults(ranked);
  }, [profile]);

  // Build protocol from top treatments
  const protocol = useMemo(() => buildProtocol(enrichedResults), [enrichedResults]);
  const hasProtocol = protocol.morning.length > 0 || protocol.midday.length > 0 || protocol.evening.length > 0;

  // Match blog posts
  const relatedPosts = useMemo(
    () => matchBlogPosts(enrichedResults, blogPosts),
    [enrichedResults, blogPosts]
  );

  // Budget breakdown
  const budgetBreakdown = useMemo(() => {
    if (!profile.budget) return null;
    return computeBudgetBreakdown(profile.budget as BudgetTier, enrichedResults);
  }, [profile.budget, enrichedResults]);

  // Risk flags
  const riskFlags = useMemo(
    () => detectRiskFlags(profile.conditions, enrichedResults),
    [profile.conditions, enrichedResults]
  );

  // Share card data
  const shareCardZones = profile.selectedZones
    .map((z) => ZONES.find((zc) => zc.zone === z))
    .filter(Boolean)
    .map((z) => ({ icon: z!.icon, label: z!.label }));

  const shareCardTreatments = enrichedResults.slice(0, 5).map((r, i) => ({
    rank: i + 1,
    name: r.treatment.name,
    kamuraScore: r.treatment.kamuraScore,
  }));

  const displayedResults = showAllTreatments
    ? enrichedResults
    : enrichedResults.slice(0, 5);

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        {/* Dashboard header */}
        <div className="mb-8">
          <h1 className="font-serif text-2xl md:text-4xl text-gray-900">
            {profile.name ? `${profile.name}'s` : "Your"} Wellness Dashboard
          </h1>
          <p className="text-sm text-gray-500 font-sans mt-1">
            Personalized insights based on your profile, {profile.selectedConcerns.length} concern{profile.selectedConcerns.length !== 1 ? "s" : ""}, and {profile.goals.length} goal{profile.goals.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">

          {/* 1. Profile Summary */}
          <DashboardCard title="Profile" icon={"\uD83D\uDC64"} action={{ label: "Edit", onClick: onRetake }}>
            <div className="space-y-2 text-sm font-sans">
              <div className="flex justify-between">
                <span className="text-gray-500">Age</span>
                <span className="text-gray-800">{profile.age}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Location</span>
                <span className="text-gray-800 capitalize">{profile.location?.replace("-", " ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Concerns</span>
                <span className="text-gray-800">{profile.selectedConcerns.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Preference</span>
                <span className="text-gray-800 capitalize">{profile.treatmentPreference?.replace("-", " ") || "—"}</span>
              </div>
            </div>
          </DashboardCard>

          {/* 2. Wellness Score Ring */}
          <DashboardCard title="Wellness Score" icon={"\u2728"}>
            <div className="flex justify-center py-2">
              <ScoreRing score={overallScore} label={scoreLabel} />
            </div>
          </DashboardCard>

          {/* 3. Radar Chart */}
          <DashboardCard title="Dimensions" icon={"\uD83D\uDCCA"}>
            <div className="flex justify-center">
              <div className="bg-gray-800 rounded-xl p-3">
                <RadarChart
                  dimensions={dimensionScores}
                  color="#B5886A"
                  size={240}
                />
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-3 text-[10px] font-sans text-gray-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-terracotta inline-block" />
                You
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-gray-400 inline-block" />
                Community avg
              </span>
            </div>
          </DashboardCard>

          {/* 4. Top Treatments — span 2 */}
          {enrichedResults.length > 0 && (
            <DashboardCard
              title="Top Treatments"
              icon={"\uD83C\uDF1F"}
              span={2}
              action={
                enrichedResults.length > 5
                  ? {
                      label: showAllTreatments
                        ? "Show top 5"
                        : `View all ${enrichedResults.length}`,
                      onClick: () => setShowAllTreatments(!showAllTreatments),
                    }
                  : undefined
              }
            >
              <div className="space-y-2.5">
                {displayedResults.map((result, i) => (
                  <ReportTreatmentCard
                    key={result.treatment.slug}
                    result={result}
                    rank={i + 1}
                    delay={0}
                  />
                ))}
              </div>
            </DashboardCard>
          )}

          {/* 5. Daily Protocol */}
          {hasProtocol && (
            <DashboardCard title="Daily Protocol" icon={"\u{1F4CB}"}>
              <ProtocolPlan protocol={protocol} />
            </DashboardCard>
          )}

          {/* 6. Goal Tracker */}
          {profile.goals.length > 0 && (
            <DashboardCard title="Goal Tracker" icon={"\uD83C\uDFAF"}>
              <GoalTracker
                goals={profile.goals}
                goalChecks={profile.goalChecks}
                onToggle={onGoalToggle}
                completedAt={profile.completedAt}
              />
            </DashboardCard>
          )}

          {/* 7. Budget Breakdown */}
          {budgetBreakdown && (
            <DashboardCard title="Budget" icon={"\uD83D\uDCB0"}>
              <BudgetChart breakdown={budgetBreakdown} />
            </DashboardCard>
          )}

          {/* 8. Risk Flags — conditional */}
          {riskFlags.length > 0 && (
            <DashboardCard title="Health Flags" icon={"\u26A0\uFE0F"}>
              <RiskFlags flags={riskFlags} />
            </DashboardCard>
          )}

          {/* 9. Related Articles */}
          {relatedPosts.length > 0 && (
            <DashboardCard title="Related Articles" icon={"\uD83D\uDCDA"}>
              <RelatedContent posts={relatedPosts} />
            </DashboardCard>
          )}

          {/* 10. Share */}
          {enrichedResults.length > 0 && (
            <DashboardCard title="Share" icon={"\uD83D\uDCE4"}>
              <div className="text-center py-4">
                <p className="text-sm text-gray-500 font-sans mb-4">
                  Share your wellness profile as a beautiful image card.
                </p>
                <button
                  onClick={() => setShowShareCard(true)}
                  className="px-5 py-2.5 text-sm font-sans font-medium text-white bg-moss hover:bg-forest rounded-full transition-colors"
                >
                  Share as Image
                </button>
              </div>
            </DashboardCard>
          )}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-amber-50/50 border border-amber-200/50 rounded-xl p-5">
          <p className="text-sm text-amber-800 font-sans leading-relaxed">
            <strong>Important:</strong> This dashboard is for educational and informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider before starting any new treatment.
          </p>
        </div>
      </div>

      {/* Share Card Modal */}
      <ShareCardModal
        open={showShareCard}
        onClose={() => setShowShareCard(false)}
        title="Share Your Protocol"
        fileName="kamura-dashboard.png"
        shareText={`My wellness dashboard — ${shareCardZones.map((z) => z.label).join(" & ")} protocol with ${shareCardTreatments.length} evidence-based treatments from KAMURA. Try it at kamuralife.com/wellness-checker`}
        cardWidth={1080}
        cardHeight={1350}
      >
        <BodyMapCard
          zones={shareCardZones}
          concernCount={profile.selectedConcerns.length}
          topTreatments={shareCardTreatments}
        />
      </ShareCardModal>
    </div>
  );
}
