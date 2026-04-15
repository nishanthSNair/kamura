import type { Metadata } from "next";
import PeptideTrackerClient from "@/components/peptides/PeptideTrackerClient";

export const metadata: Metadata = {
  title: "Peptide Dashboard — Track Cycles, Log Doses, Smart Reminders",
  description:
    "A private peptide tracker: log doses, monitor pen inventory, manage cycles, and get fasting reminders. Data lives on your device.",
  alternates: { canonical: "https://kamuralife.com/peptides/tracker" },
  openGraph: {
    title: "Peptide Dashboard | KAMURA",
    description:
      "Track active peptide cycles, log doses, and get smart reminders.",
    url: "https://kamuralife.com/peptides/tracker",
  },
};

export default function PeptideTrackerPage() {
  return (
    <div className="pt-20 bg-white min-h-screen">
      <PeptideTrackerClient />
    </div>
  );
}
