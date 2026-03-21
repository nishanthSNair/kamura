import type { Metadata } from "next";
import BlueprintApp from "./BlueprintApp";

export const metadata: Metadata = {
  title: "Body Blueprint Builder",
  description:
    "Build your personalized wellness day. Map treatments to your body, see real-time projections for 6 wellness indicators, and design your longevity protocol.",
  openGraph: {
    title: "Body Blueprint Builder | KAMURA",
    description:
      "Design your personalized wellness protocol. Drag treatments onto a daily timeline and watch your body blueprint come to life.",
    url: "https://kamuralife.com/blueprint",
    images: [
      {
        url: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Body Blueprint Builder — KAMURA",
      },
    ],
  },
  alternates: {
    canonical: "/blueprint",
  },
};

export default function BlueprintPage() {
  return <BlueprintApp />;
}
