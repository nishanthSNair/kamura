"use client";

import Link from "next/link";
import { type ProtocolPlan as ProtocolPlanType } from "@/data/wellness-checker";

interface ProtocolPlanProps {
 protocol: ProtocolPlanType;
}

const TIME_SLOTS = [
 { key: "morning" as const, label: "Morning", icon: "\u2600\uFE0F", description: "Upon waking or before breakfast" },
 { key: "midday" as const, label: "Midday", icon: "\u{1F324}\uFE0F", description: "With meals or during the day" },
 { key: "evening" as const, label: "Evening", icon: "\u{1F319}", description: "Before bed or with dinner" },
];

export default function ProtocolPlan({ protocol }: ProtocolPlanProps) {
 const hasEntries = protocol.morning.length > 0 || protocol.midday.length > 0 || protocol.evening.length > 0;

 if (!hasEntries) return null;

 return (
 <div className="space-y-4">
 {TIME_SLOTS.map((slot) => {
 const entries = protocol[slot.key];
 if (entries.length === 0) return null;

 return (
 <div
 key={slot.key}
 className="bg-white border border-gray-200 rounded-xl p-4 md:p-5"
 >
 <div className="flex items-center gap-2.5 mb-3">
 <span className="text-xl leading-none">{slot.icon}</span>
 <div>
 <h4 className="font-serif text-base text-gray-900">
 {slot.label}
 </h4>
 <p className="text-xs text-gray-500 font-sans">
 {slot.description}
 </p>
 </div>
 </div>

 <div className="space-y-2.5 ml-0 md:ml-9">
 {entries.map((entry) => (
 <div
 key={entry.treatmentSlug}
 className="flex items-start gap-3 bg-gray-50 rounded-lg p-3"
 >
 <span className="text-base leading-none mt-0.5">{entry.treatmentIcon}</span>
 <div className="flex-1 min-w-0">
 <Link
 href={`/treatments/${entry.treatmentSlug}`}
 className="text-sm font-sans font-medium text-gray-800 hover:text-terracotta transition-colors"
 >
 {entry.treatmentName}
 </Link>
 <p className="text-sm text-terracotta font-sans font-medium">
 {entry.dosage}
 </p>
 <p className="text-xs text-gray-500 font-sans mt-0.5">
 {entry.notes}
 </p>
 </div>
 </div>
 ))}
 </div>
 </div>
 );
 })}

 <p className="text-xs text-gray-400 font-sans text-center italic px-4">
 This is a suggested starting point based on your concerns. Always consult a healthcare provider before beginning any supplement or treatment protocol.
 </p>
 </div>
 );
}
