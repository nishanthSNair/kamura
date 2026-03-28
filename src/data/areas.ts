import areasData from "../../content/data/areas.json";
import { listings, type Listing } from "./listings";

export interface Area {
 slug: string;
 name: string;
 city: string;
 description: string;
 seoTitle: string;
 seoDescription: string;
 matchCity?: string;
 matchKeywords: string[];
}

export const areas: Area[] = areasData.areas as Area[];

export function getListingsForArea(area: Area): Listing[] {
 return listings.filter((listing) => {
 if (area.matchCity) {
 return listing.city === area.matchCity;
 }
 const loc = listing.location.toLowerCase();
 return area.matchKeywords.some((kw) => loc.includes(kw.toLowerCase()));
 });
}
