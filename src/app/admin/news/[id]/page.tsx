"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import FormField from "@/components/admin/FormField";
import Toast from "@/components/admin/Toast";

const CATEGORIES = [
 { label: "Biohacking", value: "Biohacking" },
 { label: "Longevity", value: "Longevity" },
 { label: "Wellness Festival", value: "Wellness Festival" },
 { label: "Global Summit", value: "Global Summit" },
 { label: "Wellness", value: "Wellness" },
 { label: "UAE Wellness", value: "UAE Wellness" },
 { label: "Health Tech", value: "Health Tech" },
];

export default function NewsEditPage() {
 const params = useParams();
 const router = useRouter();
 const id = params.id as string;

 const [data, setData] = useState<Record<string, unknown>>({});
 const [loading, setLoading] = useState(true);
 const [saving, setSaving] = useState(false);
 const [toast, setToast] = useState<{
 message: string;
 type: "success" | "error";
 } | null>(null);

 const loadItem = useCallback(async () => {
 try {
 const res = await fetch(`/api/admin/content?type=news&id=${id}`);
 const json = await res.json();
 if (json.item) setData(json.item);
 } catch {
 setToast({ message: "Failed to load", type: "error" });
 } finally {
 setLoading(false);
 }
 }, [id]);

 useEffect(() => {
 loadItem();
 }, [loadItem]);

 function updateField(name: string, value: string | number | boolean) {
 setData((prev) => ({ ...prev, [name]: value }));
 }

 async function handleSave() {
 setSaving(true);
 try {
 const res = await fetch(`/api/admin/content?type=news&id=${id}`, {
 method: "PUT",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify(data),
 });
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
 onClick={() => router.push("/admin/news")}
 className="text-xs text-gray-400 hover:text-gray-600 mb-2"
 >
 &larr; Back to News
 </button>
 <h1 className="text-2xl font-bold text-gray-900">Edit News</h1>
 <p className="text-sm text-gray-500 mt-1">{id}</p>
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
 <FormField
 label="Title"
 name="title"
 value={(data.title as string) || ""}
 onChange={updateField}
 />
 <div className="grid grid-cols-2 gap-4">
 <FormField
 label="Source"
 name="source"
 value={(data.source as string) || ""}
 onChange={updateField}
 placeholder="e.g. Khaleej Times"
 />
 <FormField
 label="Date"
 name="date"
 value={(data.date as string) || ""}
 onChange={updateField}
 placeholder="e.g. Nov 23, 2025"
 />
 </div>
 <FormField
 label="Summary"
 name="summary"
 type="textarea"
 value={(data.summary as string) || ""}
 onChange={updateField}
 rows={4}
 />
 <FormField
 label="URL"
 name="url"
 type="url"
 value={(data.url as string) || ""}
 onChange={updateField}
 />
 <FormField
 label="Category"
 name="category"
 type="select"
 value={(data.category as string) || ""}
 onChange={updateField}
 options={CATEGORIES}
 />
 <div className="grid grid-cols-2 gap-4">
 <FormField
 label="Related Event ID"
 name="relatedEventId"
 value={(data.relatedEventId as string) || ""}
 onChange={updateField}
 placeholder="e.g. world-biohack-summit-2025"
 />
 <FormField
 label="Related Event Title"
 name="relatedEventTitle"
 value={(data.relatedEventTitle as string) || ""}
 onChange={updateField}
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
