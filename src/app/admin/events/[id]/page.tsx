"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import FormField from "@/components/admin/FormField";
import TagInput from "@/components/admin/TagInput";
import Toast from "@/components/admin/Toast";

const CATEGORIES = [
 { label: "Biohacking", value: "Biohacking" },
 { label: "Longevity", value: "Longevity" },
 { label: "Wellness Festival", value: "Wellness Festival" },
 { label: "Global Summit", value: "Global Summit" },
 { label: "Wellness Conference", value: "Wellness Conference" },
];

export default function EventsEditPage() {
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
 const res = await fetch(`/api/admin/content?type=events&id=${id}`);
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
 const res = await fetch(`/api/admin/content?type=events&id=${id}`, {
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
 onClick={() => router.push("/admin/events")}
 className="text-xs text-gray-400 hover:text-gray-600 mb-2"
 >
 &larr; Back to Events
 </button>
 <h1 className="text-2xl font-bold text-gray-900">Edit Event</h1>
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
 <FormField
 label="Subtitle"
 name="subtitle"
 type="textarea"
 value={(data.subtitle as string) || ""}
 onChange={updateField}
 rows={2}
 />
 <FormField
 label="Dates (Display)"
 name="dates"
 value={(data.dates as string) || ""}
 onChange={updateField}
 placeholder="e.g. December 12-13, 2025"
 />
 <div className="grid grid-cols-2 gap-4">
 <FormField
 label="Start Date"
 name="dateStart"
 type="date"
 value={(data.dateStart as string) || ""}
 onChange={updateField}
 />
 <FormField
 label="End Date"
 name="dateEnd"
 type="date"
 value={(data.dateEnd as string) || ""}
 onChange={updateField}
 />
 </div>
 <div className="grid grid-cols-2 gap-4">
 <FormField
 label="Location"
 name="location"
 value={(data.location as string) || ""}
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
 </div>
 <div className="grid grid-cols-3 gap-4">
 <FormField
 label="Attendees"
 name="attendees"
 value={(data.attendees as string) || ""}
 onChange={updateField}
 placeholder="e.g. 2,000+"
 />
 <FormField
 label="Speakers"
 name="speakers"
 value={(data.speakers as string) || ""}
 onChange={updateField}
 placeholder="e.g. 25+"
 />
 <FormField
 label="Price"
 name="price"
 value={(data.price as string) || ""}
 onChange={updateField}
 placeholder="e.g. From AED 385"
 />
 </div>
 <FormField
 label="Website"
 name="website"
 type="url"
 value={(data.website as string) || ""}
 onChange={updateField}
 />
 <TagInput
 label="Highlights"
 value={(data.highlights as string[]) || []}
 onChange={(v) => setData((prev) => ({ ...prev, highlights: v }))}
 placeholder="Add highlight..."
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
