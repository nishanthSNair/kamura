"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import FormField from "@/components/admin/FormField";
import Toast from "@/components/admin/Toast";

export default function TestimonialsNewPage() {
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
 const name = data.name as string;
 const quote = data.quote as string;
 if (!name || !quote) {
 setToast({ message: "Name and quote are required", type: "error" });
 return;
 }

 setSaving(true);
 try {
 const id = `t${Date.now()}`;
 const res = await fetch("/api/admin/content?type=testimonials", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({ ...data, id }),
 });
 if (res.ok) {
 setToast({ message: "Created!", type: "success" });
 setTimeout(() => router.push("/admin/testimonials"), 1000);
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
 onClick={() => router.push("/admin/testimonials")}
 className="text-xs text-gray-400 hover:text-gray-600 mb-2"
 >
 &larr; Back to Testimonials
 </button>
 <h1 className="text-2xl font-bold text-gray-900">
 New Testimonial
 </h1>
 </div>
 <button
 onClick={handleSave}
 disabled={saving}
 className="bg-moss text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-forest transition-colors disabled:opacity-50"
 >
 {saving ? "Creating..." : "Create Testimonial"}
 </button>
 </div>

 <div className="space-y-5">
 <FormField
 label="Quote"
 name="quote"
 type="textarea"
 value={(data.quote as string) || ""}
 onChange={updateField}
 rows={4}
 />
 <div className="grid grid-cols-2 gap-4">
 <FormField
 label="Name"
 name="name"
 value={(data.name as string) || ""}
 onChange={updateField}
 />
 <FormField
 label="Role"
 name="role"
 value={(data.role as string) || ""}
 onChange={updateField}
 placeholder="e.g. Wellness Enthusiast"
 />
 </div>
 <FormField
 label="Location"
 name="location"
 value={(data.location as string) || ""}
 onChange={updateField}
 placeholder="e.g. Dubai"
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
