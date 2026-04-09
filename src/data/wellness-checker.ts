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
 age?: number;
 goals?: string[];
 budget?: string;
 conditions?: string[];
 treatmentPreference?: string;
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

// --- Goal-to-tag mapping for relevance boosting ---

const GOAL_TAGS: Record<string, string[]> = {
 energy: ["energy", "mitochondria", "atp", "fatigue", "metabolism"],
 sleep: ["sleep", "recovery", "melatonin", "circadian", "insomnia"],
 weight: ["weight", "metabolism", "fat loss", "appetite", "glp-1", "body composition"],
 pain: ["pain", "inflammation", "anti-inflammatory", "joint", "recovery"],
 cognitive: ["cognitive", "brain", "focus", "memory", "neuroprotection", "nootropic"],
 stress: ["stress", "anxiety", "cortisol", "adaptogen", "calm", "relaxation"],
 longevity: ["longevity", "aging", "anti-aging", "telomere", "nad+", "senescence", "autophagy"],
 immunity: ["immune", "immunity", "antioxidant", "antimicrobial"],
 skin: ["skin", "collagen", "dermal", "complexion", "anti-aging"],
 performance: ["performance", "endurance", "strength", "recovery", "athletic", "muscle"],
};

// Natural/mind-body categories for preference filtering
const NATURAL_CATEGORIES = new Set([
 "Supplements & Nutraceuticals",
 "Mind-Body & Movement",
 "Traditional & Alternative Medicine",
 "Nutrition & Dietary Protocols",
 "Exercise & Fitness",
]);

const BIOHACKING_CATEGORIES = new Set([
 "Devices & Technology",
 "Peptides",
 "Diagnostics & Testing",
 "Longevity Pharmaceuticals",
 "Regenerative Medicine",
]);

// --- Core ranking algorithm ---

export function rankTreatments(input: CheckerInput): MatchedTreatment[] {
 const { selectedConcerns, duration, age, goals, treatmentPreference } = input;

 const allMatchTags = new Set<string>();
 const allMatchOutcomes = new Set<string>();

 for (const concern of selectedConcerns) {
 for (const t of concern.matchTags) allMatchTags.add(t.toLowerCase());
 for (const o of concern.matchOutcomes) allMatchOutcomes.add(o.toLowerCase());
 }

 // Build goal tag set for boosting
 const goalTags = new Set<string>();
 if (goals) {
 for (const goal of goals) {
  const tags = GOAL_TAGS[goal];
  if (tags) tags.forEach((t) => goalTags.add(t));
 }
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

 // Goal alignment boost
 if (goalTags.size > 0) {
  const goalHits = treatment.tags.filter((t) => goalTags.has(t.toLowerCase())).length;
  if (goalHits > 0) {
  relevanceScore = Math.min(relevanceScore + goalHits * 3, 100);
  }
 }

 // Age-based adjustments
 if (age) {
  const tName = treatment.name.toLowerCase();
  const tTags = treatment.tags.map((t) => t.toLowerCase());
  // Boost longevity for 35+
  if (age >= 35 && tTags.some((t) => ["longevity", "nad+", "anti-aging", "autophagy"].includes(t))) {
  relevanceScore = Math.min(relevanceScore + 3, 100);
  }
  // Slight caution for intense protocols at 60+
  if (age >= 60 && tTags.some((t) => ["high-intensity", "extreme"].includes(t))) {
  relevanceScore = Math.max(relevanceScore - 5, 0);
  }
  // Boost hormone-related for 40+
  if (age >= 40 && (tName.includes("hormone") || tName.includes("testosterone"))) {
  relevanceScore = Math.min(relevanceScore + 2, 100);
  }
 }

 // Preference alignment
 if (treatmentPreference === "natural" && !NATURAL_CATEGORIES.has(treatment.category)) {
  relevanceScore = Math.max(relevanceScore - 8, 0);
 } else if (treatmentPreference === "biohacking" && BIOHACKING_CATEGORIES.has(treatment.category)) {
  relevanceScore = Math.min(relevanceScore + 4, 100);
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

// --- Clinic matching: find relevant centers based on recommended treatments ---

import { type Listing, listings } from "./listings";

const TREATMENT_CATEGORY_TO_LISTING: Record<string, string[]> = {
 "Peptides": ["Longevity Clinics", "Biohacking & Performance"],
 "Supplements & Nutraceuticals": ["Nutrition & Supplements", "Longevity Clinics"],
 "Devices & Technology": ["Biohacking & Performance", "Longevity Clinics"],
 "IV & Infusion Therapies": ["Longevity Clinics", "Biohacking & Performance"],
 "Mind-Body & Movement": ["Yoga & Movement", "Holistic & Healing"],
 "Hormones": ["Longevity Clinics"],
 "Energy Medicine & Frequencies": ["Holistic & Healing", "Biohacking & Performance"],
 "Diagnostics & Testing": ["Longevity Clinics"],
 "Stem Cells & Regenerative": ["Longevity Clinics"],
 "Recovery & Physical": ["Biohacking & Performance", "Wellness Retreats & Spas"],
 "Nutrition & Diet": ["Nutrition & Supplements"],
 "Lifestyle & Environment": ["Wellness Retreats & Spas"],
 "Exercise & Performance": ["Gyms & Fitness Studios", "Biohacking & Performance"],
 "Gut Health": ["Longevity Clinics", "Holistic & Healing"],
 "Traditional & Holistic": ["Holistic & Healing"],
 "Sleep": ["Biohacking & Performance", "Longevity Clinics"],
};

export function matchListings(
 matchedTreatments: EnrichedMatchedTreatment[],
 location: string,
 maxListings = 6
): Listing[] {
 const relevantCategories = new Set<string>();
 const treatmentNames = new Set<string>();

 for (const r of matchedTreatments.slice(0, 10)) {
 treatmentNames.add(r.treatment.name.toLowerCase());
 const cats = TREATMENT_CATEGORY_TO_LISTING[r.treatment.category];
 if (cats) cats.forEach((c) => relevantCategories.add(c));
 }

 const scored = listings
 .map((listing) => {
  let score = 0;

  // Category match
  if (relevantCategories.has(listing.category)) score += 5;

  // Service keyword match against treatment names and tags
  for (const service of listing.services) {
   const sLower = service.toLowerCase();
   for (const r of matchedTreatments.slice(0, 10)) {
    if (r.treatment.name.toLowerCase().includes(sLower) || sLower.includes(r.treatment.name.toLowerCase())) {
     score += 3;
    }
    for (const tag of r.treatment.tags) {
     if (sLower.includes(tag.toLowerCase())) score += 2;
    }
   }
  }

  // Location preference
  if (location && listing.city.toLowerCase().includes(location.replace("-", " "))) {
   score += 2;
  }

  // Featured boost
  if (listing.featured) score += 1;

  return { listing, score };
 })
 .filter((item) => item.score > 0)
 .sort((a, b) => b.score - a.score);

 return scored.slice(0, maxListings).map((item) => item.listing);
}
