import data from '@/data/peptide-context.json';
import catalogue from '@/data/therapy-explorer.json';
export type PeptideContext=typeof data['mots-c'];
export const peptideContexts:Record<string,PeptideContext>=data;
export function findLearningTherapy(slug:string){return catalogue.find(t=>t.id===slug||t.treatmentSlug===slug);}
export function normalizedTherapySearch(value:string){return value.toLowerCase().replace(/[^a-z0-9]/g,'');}
export function therapyMatches(id:string,query:string){const t=catalogue.find(x=>x.id===id),c=peptideContexts[id];return !!t&&normalizedTherapySearch([t.name,t.id,t.title,t.category,c?.intro,...(c?.topics.map(x=>x.title)||[])].join(' ')).includes(normalizedTherapySearch(query));}
