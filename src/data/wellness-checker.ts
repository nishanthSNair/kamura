import {
  type Treatment,
  type TreatmentOutcome,
  type TreatmentProtocol,
  type KeyStudy,
  type TreatmentCommunity,
  type SideEffects,
  treatments,
} from "./treatments";
import { type WellnessConcern, type ConcernDuration } from "./wellness-concerns";
import type { BlogCategory } from "@/lib/blog-shared";

// --- Blog post summary type (serializable from server to client) ---

export interface BlogPostSummary {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  readingTime: number;
  relatedTreatments?: string[];
}

// --- Base matching types ---

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

// --- Enriched types for the report ---

export interface EnrichedMatchedTreatment extends MatchedTreatment {
  mechanism: string | null;
  topOutcome: TreatmentOutcome | null;
  topStudy: KeyStudy | null;
  protocol: TreatmentProtocol | null;
  communityData: TreatmentCommunity;
  safety: SideEffects | null;
  costEstimate: string | null;
}

export interface ProtocolEntry {
  treatmentName: string;
  treatmentIcon: string;
  treatmentSlug: string;
  dosage: string;
  notes: string;
}

export interface ProtocolPlan {
  morning: ProtocolEntry[];
  midday: ProtocolEntry[];
  evening: ProtocolEntry[];
}

// --- Scoring constants ---

const EVIDENCE_SCORES: Record<string, number> = {
  Strong: 20,
  Moderate: 15,
  Emerging: 10,
  Limited: 5,
  Anecdotal: 2,
};

// Keywords to classify protocol timing
const MORNING_KEYWORDS = ["empty stomach", "morning", "fasting", "before breakfast", "upon waking"];
const EVENING_KEYWORDS = ["evening", "night", "before bed", "bedtime", "sleep", "pm"];

// --- Core ranking algorithm ---

export function rankTreatments(input: CheckerInput): MatchedTreatment[] {
  const { selectedConcerns, duration } = input;

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

    for (const tag of treatment.tags) {
      if (allMatchTags.has(tag.toLowerCase())) tagMatches++;
    }

    for (const outcome of treatment.outcomes) {
      const outName = outcome.name.toLowerCase();
      for (const mo of allMatchOutcomes) {
        if (outName === mo || outName.includes(mo) || mo.includes(outName)) {
          outcomeMatches++;
          break;
        }
      }
    }

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

    if (matchedConcernIds.size === 0) continue;

    const tagScore = Math.min(tagMatches * 12, 30);
    const outcomeScore = Math.min(outcomeMatches * 10, 30);
    const breadthScore =
      (matchedConcernIds.size / selectedConcerns.length) * 20;
    const evidenceScore = EVIDENCE_SCORES[treatment.evidenceLevel] || 5;

    let relevanceScore = Math.min(
      Math.round(tagScore + outcomeScore + breadthScore + evidenceScore),
      100
    );

    if (duration === "years" && treatment.evidenceLevel === "Strong") {
      relevanceScore = Math.min(relevanceScore + 5, 100);
    }

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

// --- Enrichment: surface deep treatment data ---

export function enrichResults(results: MatchedTreatment[]): EnrichedMatchedTreatment[] {
  return results.map((result) => {
    const t = result.treatment;

    // Find the highest-graded outcome
    const sortedOutcomes = [...t.outcomes].sort((a, b) => {
      const gradeOrder: Record<string, number> = { A: 0, B: 1, C: 2, D: 3, F: 4 };
      return (gradeOrder[a.grade] ?? 4) - (gradeOrder[b.grade] ?? 4);
    });

    return {
      ...result,
      mechanism: t.mechanism || null,
      topOutcome: sortedOutcomes[0] || null,
      topStudy: t.keyStudies?.[0] || null,
      protocol: t.protocols?.[0] || null,
      communityData: t.community,
      safety: t.sideEffects || null,
      costEstimate: t.costEstimate || null,
    };
  });
}

// --- Protocol builder: group treatments into daily timing ---

export function buildProtocol(enrichedTreatments: EnrichedMatchedTreatment[], maxTreatments = 5): ProtocolPlan {
  const plan: ProtocolPlan = { morning: [], midday: [], evening: [] };
  const top = enrichedTreatments.slice(0, maxTreatments);

  for (const item of top) {
    const protocol = item.protocol;
    if (!protocol) continue;

    const entry: ProtocolEntry = {
      treatmentName: item.treatment.name,
      treatmentIcon: item.treatment.icon,
      treatmentSlug: item.treatment.slug,
      dosage: protocol.dosage,
      notes: protocol.notes,
    };

    const notesLower = (protocol.notes + " " + protocol.label).toLowerCase();

    if (EVENING_KEYWORDS.some((kw) => notesLower.includes(kw))) {
      plan.evening.push(entry);
    } else if (MORNING_KEYWORDS.some((kw) => notesLower.includes(kw))) {
      plan.morning.push(entry);
    } else {
      plan.midday.push(entry);
    }
  }

  // Redistribute for balance if everything landed in one slot
  if (plan.morning.length === 0 && plan.midday.length > 2) {
    plan.morning.push(plan.midday.shift()!);
  }
  if (plan.evening.length === 0 && plan.midday.length > 2) {
    plan.evening.push(plan.midday.pop()!);
  }

  return plan;
}

// --- Blog matching: find related articles ---

export function matchBlogPosts(
  matchedTreatments: MatchedTreatment[],
  allPosts: BlogPostSummary[],
  maxPosts = 4
): BlogPostSummary[] {
  const matchedSlugs = new Set(matchedTreatments.map((r) => r.treatment.slug));

  const scored = allPosts
    .filter((post) => post.relatedTreatments && post.relatedTreatments.length > 0)
    .map((post) => {
      const overlap = post.relatedTreatments!.filter((slug) => matchedSlugs.has(slug)).length;
      return { post, overlap };
    })
    .filter((item) => item.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap);

  return scored.slice(0, maxPosts).map((item) => item.post);
}
