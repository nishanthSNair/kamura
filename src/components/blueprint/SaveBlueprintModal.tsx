"use client";

import { useState, useEffect } from "react";
import {
 type WellnessIndicator,
 INDICATORS,
 INDICATOR_META,
 getIndicatorColor,
} from "@/data/blueprint";

interface SaveBlueprintModalProps {
 isOpen: boolean;
 onClose: () => void;
 score: number;
 projections: Record<WellnessIndicator, number>;
 treatmentCount: number;
}

export default function SaveBlueprintModal({
 isOpen,
 onClose,
 score,
 projections,
 treatmentCount,
}: SaveBlueprintModalProps) {
 const [email, setEmail] = useState("");
 const [saved, setSaved] = useState(false);

 // Body scroll lock
 useEffect(() => {
 if (isOpen) {
 document.body.style.overflow = "hidden";
 } else {
 document.body.style.overflow = "";
 }
 return () => {
 document.body.style.overflow = "";
 };
 }, [isOpen]);

 // Escape key
 useEffect(() => {
 if (!isOpen) return;
 function handleKey(e: KeyboardEvent) {
 if (e.key === "Escape") onClose();
 }
 document.addEventListener("keydown", handleKey);
 return () => document.removeEventListener("keydown", handleKey);
 }, [isOpen, onClose]);

 if (!isOpen) return null;

 function handleSave() {
 // Store to localStorage
 const blueprint = {
 email,
 score,
 projections,
 treatmentCount,
 savedAt: new Date().toISOString(),
 };
 try {
 const existing = JSON.parse(
 localStorage.getItem("kamura-blueprints") || "[]"
 );
 existing.push(blueprint);
 localStorage.setItem("kamura-blueprints", JSON.stringify(existing));
 } catch {
 // localStorage might be unavailable
 }
 setSaved(true);
 }

 return (
 <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
 {/* Backdrop */}
 <div
 className="absolute inset-0 bg-black/40 backdrop-blur-sm"
 onClick={onClose}
 />

 {/* Modal */}
 <div className="relative z-10 w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-2xl p-8 animate-blueprint-fade-in">
 {saved ? (
 <div className="text-center">
 <div className="w-16 h-16 rounded-full bg-score-green/10 flex items-center justify-center mx-auto mb-4">
 <svg
 xmlns="http://www.w3.org/2000/svg"
 width="28"
 height="28"
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="2"
 strokeLinecap="round"
 strokeLinejoin="round"
 className="text-score-green"
 >
 <polyline points="20 6 9 17 4 12" />
 </svg>
 </div>
 <h3 className="font-serif text-xl text-gray-900 mb-2">
 Blueprint Saved
 </h3>
 <p className="text-sm text-gray-500 font-sans mb-6">
 Your wellness blueprint has been saved. Keep exploring and
 refining your daily protocol.
 </p>
 <button
 onClick={onClose}
 className="px-6 py-2.5 bg-terracotta text-white rounded-xl text-sm font-sans hover:bg-terracotta-dark transition-colors"
 >
 Continue Building
 </button>
 </div>
 ) : (
 <>
 <h3 className="font-serif text-xl text-gray-900 mb-1">
 Save Your Blueprint
 </h3>
 <p className="text-sm text-gray-500 font-sans mb-6">
 Capture your personalized wellness protocol.
 </p>

 {/* Score summary */}
 <div className="bg-zen-mist/50 rounded-xl p-4 mb-6">
 <div className="flex items-center justify-between mb-3">
 <span className="text-xs font-sans uppercase tracking-wider text-gray-500">
 Blueprint Score
 </span>
 <span
 className="text-lg font-serif font-bold"
 style={{
 color: getIndicatorColor(score).fill,
 }}
 >
 {score}
 </span>
 </div>
 <div className="grid grid-cols-2 gap-2">
 {INDICATORS.map((key) => (
 <div
 key={key}
 className="flex items-center justify-between"
 >
 <span className="text-[10px] text-gray-500 font-sans">
 {INDICATOR_META[key].label}
 </span>
 <span
 className="text-[11px] font-sans font-semibold"
 style={{
 color: getIndicatorColor(projections[key]).fill,
 }}
 >
 {projections[key]}
 </span>
 </div>
 ))}
 </div>
 <p className="text-[10px] text-gray-400 font-sans mt-2">
 {treatmentCount} treatments in your protocol
 </p>
 </div>

 {/* Email input */}
 <div className="mb-4">
 <label className="block text-sm text-gray-600 font-sans mb-2">
 Email (optional)
 </label>
 <input
 type="email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 placeholder="your@email.com"
 className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 font-sans focus:outline-none focus:border-terracotta transition-colors"
 />
 </div>

 <button
 onClick={handleSave}
 className="w-full py-3 bg-terracotta text-white rounded-xl text-sm font-sans font-medium hover:bg-terracotta-dark transition-colors"
 >
 Save My Blueprint
 </button>

 <p className="text-[10px] text-gray-400 font-sans text-center mt-3">
 We never share your data. Saved locally on this device.
 </p>
 </>
 )}
 </div>
 </div>
 );
}
