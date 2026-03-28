import protocolsData from "../../content/data/protocols.json";

export interface ProtocolSupplement {
 name: string;
 dose: string;
 timing: string;
 purpose: string;
}

export interface ProtocolExercise {
 name: string;
 frequency: string;
 duration: string;
 details: string;
}

export interface ProtocolSection {
 title: string;
 icon: string;
 items: string[];
}

export interface Protocol {
 slug: string;
 name: string;
 creator: string;
 creatorTitle: string;
 tagline: string;
 description: string;
 imageUrl: string;
 creatorImageUrl: string;
 difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
 monthlyCost: string;
 timeCommitment: string;
 keyPrinciples: string[];
 supplements: ProtocolSupplement[];
 exercises: ProtocolExercise[];
 nutrition: ProtocolSection;
 sleep: ProtocolSection;
 testing: ProtocolSection;
 pharmaceuticals?: ProtocolSection;
 mindset?: ProtocolSection;
 keyResults: string[];
 relatedTreatmentSlugs: string[];
 sourceUrl: string;
 sourceLabel: string;
 tags: string[];
}

export const protocols: Protocol[] = protocolsData.protocols as Protocol[];

export function getProtocolBySlug(slug: string): Protocol | undefined {
 return protocols.find((p) => p.slug === slug);
}
