"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
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

function slugify(text: string): string {
 return text
 .toLowerCase()
 .replace(/[^a-z0-9]+/g, "-")
 .replace(/^-|-$/g, "");
}

export default function NewsNewPage() {
 const router = useRouter();
 const [data, setData] = useState<Record<string, unknown>>({});
 const [saving, setSaving] = useState(false);
 const [toast, setToast] = useState<{
 message: string;
 type: "success" | "error";
 } | null>(null);

 function updateField(name: string, value: string | number | boolean) {
 setData((prev) => ({ ...prev, [name]: value }));
 }

 async function handleSave() {
 const title = data.title as string;
 if (!title) {
 setToast({ message: "Title is required", type: "error" });
 return;
 }

 setSaving(true);
 try {
 const res = await fetch("/api/admin/content?type=news", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({ ...data, id: slugify(title) }),
 });
 if (res.ok) {
 setToast({ message: "Created!", type: "success" });
 setTimeout(() => router.push("/admin/news"), 1000);
 } else {
 setToast({ message: "Failed to create", type: "error" });
 }
 } catch {
 setToast({ message: "Failed to create", type: "error" });
 } finally {
 setSaving(false);
 }
 }

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
 <h1 className="text-2xl font-bold text-gray-900">New News Article</h1>
 {data.title ? (
 <p className="text-sm text-gray-500 mt-1">
 ID: {slugify(data.title as string)}
 </p>
 ) : null}
 </div>
 <button
 onClick={handleSave}
 disabled={saving}
 className="bg-moss text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-forest transition-colors disabled:opacity-50"
 >
 {saving ? "Creating..." : "Create Article"}
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
