import eventsData from "../../content/data/events.json";

export interface Event {
  id: string;
  title: string;
  subtitle: string;
  dates: string;
  dateStart: string;
  dateEnd: string;
  location: string;
  category: EventCategory;
  attendees: string;
  speakers: string;
  price: string;
  website: string;
  highlights: string[];
}

export type EventCategory =
  | "Biohacking"
  | "Wellness Festival"
  | "Health & MedTech"
  | "Longevity"
  | "Fitness"
  | "Global Summit";

export const categoryColors: Record<EventCategory, { bg: string; text: string; dot: string }> = {
  Biohacking: { bg: "bg-amber-100", text: "text-amber-800", dot: "bg-amber-500" },
  "Wellness Festival": { bg: "bg-emerald-100", text: "text-emerald-800", dot: "bg-emerald-500" },
  "Health & MedTech": { bg: "bg-blue-100", text: "text-blue-800", dot: "bg-blue-500" },
  Longevity: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-400" },
  Fitness: { bg: "bg-purple-100", text: "text-purple-800", dot: "bg-purple-500" },
  "Global Summit": { bg: "bg-rose-100", text: "text-rose-800", dot: "bg-rose-400" },
};

export const events: Event[] = eventsData.events as Event[];
