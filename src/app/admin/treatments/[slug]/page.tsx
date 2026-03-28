"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import FormField from "@/components/admin/FormField";
import TagInput from "@/components/admin/TagInput";
import Toast from "@/components/admin/Toast";

const CATEGORIES = [
 { label: "Peptides", value: "Peptides" },
 { label: "Supplements & Nutraceuticals", value: "Supplements & Nutraceuticals" },
 { label: "Devices & Technology", value: "Devices & Technology" },
 { label: "Traditional & Alternative Medicine", value: "Traditional & Alternative Medicine" },
 { label: "Mind-Body & Movement", value: "Mind-Body & Movement" },
 { label: "Hormones", value: "Hormones" },
 { label: "GLP-1 & Weight Management", value: "GLP-1 & Weight Management" },
 { label: "IV & Infusion Therapies", value: "IV & Infusion Therapies" },
 { label: "Regenerative Medicine", value: "Regenerative Medicine" },
 { label: "Longevity Pharmaceuticals", value: "Longevity Pharmaceuticals" },
 { label: "Detox & Functional", value: "Detox & Functional" },
];

const EVIDENCE_LEVELS = [
 { label: "Strong", value: "Strong" },
 { label: "Moderate", value: "Moderate" },
 { label: "Emerging", value: "Emerging" },
 { label: "Limited", value: "Limited" },
];

export default function TreatmentsEditPage() {
 const params = useParams();
 const router = useRouter();
 const slug = params.slug as string;

 const [data, setData] = useState<Record<string, unknown>>({});
 const [scores, setScores] = useState<Record<string, number>>({
 research: 0,
 community: 0,
 safety: 0,
 accessibility: 0,
 value: 0,
 });
 const [outcomesJson, setOutcomesJson] = useState("[]");
 const [communityJson, setCommunityJson] = useState("{}");
 const [keyStudiesJson, setKeyStudiesJson] = useState("[]");
 const [loading, setLoading] = useState(true);
 const [saving, setSaving] = useState(false);
 const [toast, setToast] = useState<{
 message: string;
 type: "success" | "error";
 } | null>(null);

 const loadItem = useCallback(async () => {
 try {
 const res = await fetch(`/api/admin/content?type=treatments&id=${slug}`);
 const json = await res.json();
 if (json.item) {
 const { scores: s, outcomes, community, keyStudies, ...rest } =
 json.item;
 setData(rest);
 if (s) setScores(s as Record<string, number>);
 if (outcomes) setOutcomesJson(JSON.stringify(outcomes, null, 2));
 if (community) setCommunityJson(JSON.stringify(community, null, 2));
 if (keyStudies) setKeyStudiesJson(JSON.stringify(keyStudies, null, 2));
 }
 } catch {
 setToast({ message: "Failed to load", type: "error" });
 } finally {
 setLoading(false);
 }
 }, [slug]);

 useEffect(() => {
 loadItem();
 }, [loadItem]);

 function updateField(name: string, value: string | number | boolean) {
 setData((prev) => ({ ...prev, [name]: value }));
 }

 function updateScore(name: string, value: string | number | boolean) {
 setScores((prev) => ({ ...prev, [name]: Number(value) }));
 }

 async function handleSave() {
 setSaving(true);
 try {
 let outcomes, community, keyStudies;
 try {
 outcomes = JSON.parse(outcomesJson);
 } catch {
 setToast({ message: "Invalid Outcomes JSON", type: "error" });
 setSaving(false);
 return;
 }
 try {
 community = JSON.parse(communityJson);
 } catch {
 setToast({ message: "Invalid Community JSON", type: "error" });
 setSaving(false);
 return;
 }
 try {
 keyStudies = JSON.parse(keyStudiesJson);
 } catch {
 setToast({ message: "Invalid Key Studies JSON", type: "error" });
 setSaving(false);
 return;
 }

 const res = await fetch(
 `/api/admin/content?type=treatments&id=${slug}`,
 {
 method: "PUT",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({
 ...data,
 scores,
 outcomes,
 community,
 keyStudies,
 }),
 }
 );
 if (res.ok) setToast({ message: "Saved!", type: "success" });
 else setToast({ message: "Failed to save", type: "error" });
 } catch {
 setToast({ message: "Failed to save", type: "error" });
 } finally {
 setSaving(false);
 }
 }

 if (loading)
 return <div className="p-8 text-sm text-gray-400">Loading...</div>;

 return (
 <div className="p-8 max-w-4xl">
 <div className="flex items-center justify-between mb-6">
 <div>
 <button
 onClick={() => router.push("/admin/treatments")}
 className="text-xs text-gray-400 hover:text-gray-600 mb-2"
 >
 &larr; Back to Treatments
 </button>
 <h1 className="text-2xl font-bold text-gray-900">Edit Treatment</h1>
 <p className="text-sm text-gray-500 mt-1">{slug}</p>
 </div>
 <button
 onClick={handleSave}
 disabled={saving}
 className="bg-moss text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-forest transition-colors disabled:opacity-50"
 >
 {saving ? "Saving..." : "Save Changes"}
 </button>
 </div>

 <div className="space-y-5">
 <div className="grid grid-cols-2 gap-4">
 <FormField
 label="Name"
 name="name"
 value={(data.name as string) || ""}
 onChange={updateField}
 />
 <FormField
 label="Full Name"
 name="fullName"
 value={(data.fullName as string) || ""}
 onChange={updateField}
 />
 </div>
 <div className="grid grid-cols-2 gap-4">
 <FormField
 label="Category"
 name="category"
 type="select"
 value={(data.category as string) || ""}
 onChange={updateField}
 options={CATEGORIES}
 />
 <FormField
 label="Icon"
 name="icon"
 value={(data.icon as string) || ""}
 onChange={updateField}
 placeholder="e.g. emoji"
 />
 </div>
 <FormField
 label="Description"
 name="description"
 type="textarea"
 value={(data.description as string) || ""}
 onChange={updateField}
 rows={4}
 />
 <div className="grid grid-cols-3 gap-4">
 <FormField
 label="Kamura Score"
 name="kamuraScore"
 type="number"
 value={(data.kamuraScore as number) || 0}
 onChange={updateField}
 />
 <FormField
 label="Evidence Level"
 name="evidenceLevel"
 type="select"
 value={(data.evidenceLevel as string) || ""}
 onChange={updateField}
 options={EVIDENCE_LEVELS}
 />
 <FormField
 label="Study Count"
 name="studyCount"
 type="number"
 value={(data.studyCount as number) || 0}
 onChange={updateField}
 />
 </div>

 <div className="bg-gray-50 rounded-lg p-4">
 <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">
 Sub-Scores
 </p>
 <div className="grid grid-cols-5 gap-3">
 <FormField
 label="Research"
 name="research"
 type="number"
 value={scores.research || 0}
 onChange={updateScore}
 />
 <FormField
 label="Community"
 name="community"
 type="number"
 value={scores.community || 0}
 onChange={updateScore}
 />
 <FormField
 label="Safety"
 name="safety"
 type="number"
 value={scores.safety || 0}
 onChange={updateScore}
 />
 <FormField
 label="Accessibility"
 name="accessibility"
 type="number"
 value={scores.accessibility || 0}
 onChange={updateScore}
 />
 <FormField
 label="Value"
 name="value"
 type="number"
 value={scores.value || 0}
 onChange={updateScore}
 />
 </div>
 </div>

 <TagInput
 label="Tags"
 value={(data.tags as string[]) || []}
 onChange={(v) => setData((prev) => ({ ...prev, tags: v }))}
 placeholder="e.g. Gut, Recovery"
 />
 <TagInput
 label="Administration Routes"
 value={(data.administrationRoutes as string[]) || []}
 onChange={(v) =>
 setData((prev) => ({ ...prev, administrationRoutes: v }))
 }
 placeholder="e.g. Oral, Injectable"
 />
 <div className="grid grid-cols-2 gap-4">
 <FormField
 label="Community Reports"
 name="communityReports"
 type="number"
 value={(data.communityReports as number) || 0}
 onChange={updateField}
 />
 <FormField
 label="UAE Available"
 name="uaeAvailable"
 type="toggle"
 value={(data.uaeAvailable as boolean) || false}
 onChange={updateField}
 />
 </div>

 <div>
 <label className="block text-xs font-medium text-gray-500 mb-1.5">
 Outcomes (JSON)
 </label>
 <textarea
 value={outcomesJson}
 onChange={(e) => setOutcomesJson(e.target.value)}
 rows={10}
 className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-moss bg-white font-mono resize-y"
 />
 </div>
 <div>
 <label className="block text-xs font-medium text-gray-500 mb-1.5">
 Community Data (JSON)
 </label>
 <textarea
 value={communityJson}
 onChange={(e) => setCommunityJson(e.target.value)}
 rows={8}
 className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-moss bg-white font-mono resize-y"
 />
 </div>
 <div>
 <label className="block text-xs font-medium text-gray-500 mb-1.5">
 Key Studies (JSON)
 </label>
 <textarea
 value={keyStudiesJson}
 onChange={(e) => setKeyStudiesJson(e.target.value)}
 rows={8}
 className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-moss bg-white font-mono resize-y"
 />
 </div>
 </div>

 {toast && (
 <Toast
 message={toast.message}
 type={toast.type}
 onClose={() => setToast(null)}
 />
 )}
 </div>
 );
}
