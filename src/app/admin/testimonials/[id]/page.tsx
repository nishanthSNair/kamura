"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import FormField from "@/components/admin/FormField";
import Toast from "@/components/admin/Toast";

export default function TestimonialsEditPage() {
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
      const res = await fetch(`/api/admin/content?type=testimonials&id=${id}`);
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
      const res = await fetch(
        `/api/admin/content?type=testimonials&id=${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
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
            onClick={() => router.push("/admin/testimonials")}
            className="text-xs text-gray-400 hover:text-gray-600 mb-2"
          >
            &larr; Back to Testimonials
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            Edit Testimonial
          </h1>
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
