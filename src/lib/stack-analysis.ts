import { treatments, type Treatment } from "@/data/treatments";
import type { StackItem } from "@/hooks/useStack";

export interface Synergy {
 slugA: string;
 slugB: string;
 nameA: string;
 nameB: string;
}

export interface InteractionWarning {
 slugA: string;
 slugB: string;
 nameA: string;
 nameB: string;
 detail: string;
}

function getTreatmentMap(): Map<string, Treatment> {
 const map = new Map<string, Treatment>();
 for (const t of treatments) map.set(t.slug, t);
 return map;
}

/** Find synergies: treatments in stack that reference each other via relatedSlugs */
export function findSynergies(items: StackItem[]): Synergy[] {
 const map = getTreatmentMap();
 const slugSet = new Set(items.map((i) => i.slug));
 const synergies: Synergy[] = [];
 const seen = new Set<string>();

 for (const item of items) {
 const t = map.get(item.slug);
 if (!t) continue;
 for (const related of t.relatedSlugs) {
 if (slugSet.has(related)) {
 const key = [item.slug, related].sort().join("|");
 if (seen.has(key)) continue;
 seen.add(key);
 const other = map.get(related);
 if (other) {
 synergies.push({
 slugA: item.slug,
 slugB: related,
 nameA: t.name,
 nameB: other.name,
 });
 }
 }
 }
 }
 return synergies;
}

/** Find interaction warnings: cross-check interactions.supplements and interactions.drugs */
export function findInteractions(items: StackItem[]): InteractionWarning[] {
 const map = getTreatmentMap();
 const warnings: InteractionWarning[] = [];
 const seen = new Set<string>();

 const stackTreatments = items.map((i) => map.get(i.slug)).filter(Boolean) as Treatment[];

 for (const t of stackTreatments) {
 if (!t.interactions) continue;
 const interactionNames = [
 ...t.interactions.drugs,
 ...t.interactions.supplements,
 ].map((n) => n.toLowerCase());

 for (const other of stackTreatments) {
 if (other.slug === t.slug) continue;
 const key = [t.slug, other.slug].sort().join("|");
 if (seen.has(key)) continue;

 const otherNameLower = other.name.toLowerCase();
 const match = interactionNames.find(
 (n) => otherNameLower.includes(n) || n.includes(otherNameLower)
 );
 if (match) {
 seen.add(key);
 warnings.push({
 slugA: t.slug,
 slugB: other.slug,
 nameA: t.name,
 nameB: other.name,
 detail: `${t.name} has a noted interaction with ${match}`,
 });
 }
 }
 }
 return warnings;
}
