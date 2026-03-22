import { type Treatment, treatments } from "./treatments";
import { type WellnessConcern, type ConcernDuration } from "./wellness-concerns";

export interface MatchedTreatment {
  treatment: Treatment;
  relevanceScore: number;
  matchedConcerns: string[];
  matchReasons: string[];
  combinedScore: number;
}

export interface CheckerInput {
  selectedConcerns: WellnessConcern[];
  duration?: ConcernDuration;
}

const EVIDENCE_SCORES: Record<string, number> = {
  Strong: 20,
  Moderate: 15,
  Emerging: 10,
  Limited: 5,
  Anecdotal: 2,
};

export function rankTreatments(input: CheckerInput): MatchedTreatment[] {
  const { selectedConcerns, duration } = input;

  // Build aggregated match sets from all selected concerns
  const allMatchTags = new Set<string>();
  const allMatchOutcomes = new Set<string>();

  for (const concern of selectedConcerns) {
    for (const t of concern.matchTags) allMatchTags.add(t.toLowerCase());
    for (const o of concern.matchOutcomes) allMatchOutcomes.add(o.toLowerCase());
  }

  const results: MatchedTreatment[] = [];

  for (const treatment of treatments) {
    let tagMatches = 0;
    let outcomeMatches = 0;
    const matchedConcernIds = new Set<string>();
    const matchReasons: string[] = [];

    // Count tag matches
    for (const tag of treatment.tags) {
      if (allMatchTags.has(tag.toLowerCase())) tagMatches++;
    }

    // Count outcome matches (exact + partial)
    for (const outcome of treatment.outcomes) {
      const outName = outcome.name.toLowerCase();
      for (const mo of allMatchOutcomes) {
        if (outName === mo || outName.includes(mo) || mo.includes(outName)) {
          outcomeMatches++;
          break;
        }
      }
    }

    // Determine which user concerns this treatment addresses
    for (const concern of selectedConcerns) {
      const hasTag = treatment.tags.some((t) =>
        concern.matchTags.some((mt) => t.toLowerCase() === mt.toLowerCase())
      );
      const hasOutcome = treatment.outcomes.some((o) =>
        concern.matchOutcomes.some(
          (mo) =>
            o.name.toLowerCase().includes(mo.toLowerCase()) ||
            mo.toLowerCase().includes(o.name.toLowerCase())
        )
      );
      if (hasTag || hasOutcome) {
        matchedConcernIds.add(concern.id);
        matchReasons.push(concern.label);
      }
    }

    // Skip treatments that don't match any concern
    if (matchedConcernIds.size === 0) continue;

    // Calculate relevance score (0-100)
    const tagScore = Math.min(tagMatches * 12, 30);
    const outcomeScore = Math.min(outcomeMatches * 10, 30);
    const breadthScore =
      (matchedConcernIds.size / selectedConcerns.length) * 20;
    const evidenceScore = EVIDENCE_SCORES[treatment.evidenceLevel] || 5;

    let relevanceScore = Math.min(
      Math.round(tagScore + outcomeScore + breadthScore + evidenceScore),
      100
    );

    // Chronic concerns slightly boost well-researched treatments
    if (duration === "years" && treatment.evidenceLevel === "Strong") {
      relevanceScore = Math.min(relevanceScore + 5, 100);
    }

    // Combined score: 60% relevance, 40% Kamura Score
    const combinedScore = relevanceScore * 0.6 + treatment.kamuraScore * 0.4;

    results.push({
      treatment,
      relevanceScore,
      matchedConcerns: Array.from(matchedConcernIds),
      matchReasons: [...new Set(matchReasons)],
      combinedScore,
    });
  }

  return results.sort((a, b) => b.combinedScore - a.combinedScore);
}
