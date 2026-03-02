import type { Metadata } from "next";
import EventsContent from "./EventsContent";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Discover the wellness and longevity events shaping the UAE and beyond — from biohacking summits to sound healing retreats. Calendar, listings & news coverage.",
  openGraph: {
    title: "Events | KAMURA",
    description:
      "Summits, festivals & gatherings in the world of longevity & wellness. Discover events shaping wellness in the UAE and beyond.",
    url: "https://kamuralife.com/events",
  },
};

export default function EventsPage() {
  return <EventsContent />;
}
