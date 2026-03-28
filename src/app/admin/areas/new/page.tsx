"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import FormField from "@/components/admin/FormField";
import TagInput from "@/components/admin/TagInput";
import Toast from "@/components/admin/Toast";

function slugify(text: string): string {
 return text
 .toLowerCase()
 .replace(/[^a-z0-9]+/g, "-")
 .replace(/^-|-$/g, "");
}

export default function AreasNewPage() {
 const router = useRouter();
 const [data, setData] = useState<Record<string, unknown>>({
 matchKeywords: [],
 });
 const [saving, setSaving] = useState(false);
 const [toast, setToast] = useState<{
 message: string;
 type: "success" | "error";
 } | null>(null);

 function updateField(name: string, value: string | number | boolean) {
 setData((prev) => ({ ...prev, [name]: value }));
 }

 async function handleSave() {
 const name = data.name as string;
 if (!name) {
 setToast({ message: "Name is required", type: "error" });
 return;
 }

 setSaving(true);
 try {
 const res = await fetch("/api/admin/content?type=areas", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({ ...data, slug: slugify(name) }),
 });
 if (res.ok) {
 setToast({ message: "Created!", type: "success" });
 setTimeout(() => router.push("/admin/areas"), 1000);
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
 onClick={() => router.push("/admin/areas")}
 className="text-xs text-gray-400 hover:text-gray-600 mb-2"
 >
 &larr; Back to Areas
 </button>
 <h1 className="text-2xl font-bold text-gray-900">New Area</h1>
 {data.name ? (
 <p className="text-sm text-gray-500 mt-1">
 Slug: {slugify(data.name as string)}
 </p>
 ) : null}
 </div>
 <button
 onClick={handleSave}
 disabled={saving}
 className="bg-moss text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-forest transition-colors disabled:opacity-50"
 >
 {saving ? "Creating..." : "Create Area"}
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
 label="City"
 name="city"
 value={(data.city as string) || ""}
 onChange={updateField}
 placeholder="e.g. Dubai"
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
 <FormField
 label="SEO Title"
 name="seoTitle"
 value={(data.seoTitle as string) || ""}
 onChange={updateField}
 />
 <FormField
 label="SEO Description"
 name="seoDescription"
 type="textarea"
 value={(data.seoDescription as string) || ""}
 onChange={updateField}
 rows={3}
 />
 <FormField
 label="Match City"
 name="matchCity"
 value={(data.matchCity as string) || ""}
 onChange={updateField}
 placeholder="City name to match listings against"
 />
 <TagInput
 label="Match Keywords"
 value={(data.matchKeywords as string[]) || []}
 onChange={(v) => setData((prev) => ({ ...prev, matchKeywords: v }))}
 placeholder="e.g. marina, palm jumeirah"
 />
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
