"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import FormField from "@/components/admin/FormField";
import TagInput from "@/components/admin/TagInput";
import Toast from "@/components/admin/Toast";

const CITIES = [
  { label: "Dubai", value: "Dubai" },
  { label: "Abu Dhabi", value: "Abu Dhabi" },
  { label: "Sharjah", value: "Sharjah" },
];

const CATEGORIES = [
  { label: "Longevity Clinics", value: "Longevity Clinics" },
  { label: "Biohacking Studios", value: "Biohacking Studios" },
  { label: "Wellness Centers", value: "Wellness Centers" },
  { label: "Yoga Studios", value: "Yoga Studios" },
  { label: "Recovery & Cryotherapy", value: "Recovery & Cryotherapy" },
  { label: "Float & Sensory", value: "Float & Sensory" },
  { label: "Sound Healing", value: "Sound Healing" },
  { label: "Holistic & Integrative", value: "Holistic & Integrative" },
];

export default function ListingsEditPage() {
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
      const res = await fetch(`/api/admin/content?type=listings&id=${id}`);
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
      const res = await fetch(`/api/admin/content?type=listings&id=${id}`, {
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
            onClick={() => router.push("/admin/listings")}
            className="text-xs text-gray-400 hover:text-gray-600 mb-2"
          >
            &larr; Back to Listings
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Edit Listing</h1>
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
          label="Name"
          name="name"
          value={(data.name as string) || ""}
          onChange={updateField}
        />
        <FormField
          label="Tagline"
          name="tagline"
          value={(data.tagline as string) || ""}
          onChange={updateField}
        />
        <FormField
          label="Description"
          name="description"
          type="textarea"
          value={(data.description as string) || ""}
          onChange={updateField}
          rows={4}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Location"
            name="location"
            value={(data.location as string) || ""}
            onChange={updateField}
          />
          <FormField
            label="City"
            name="city"
            type="select"
            value={(data.city as string) || ""}
            onChange={updateField}
            options={CITIES}
          />
        </div>
        <FormField
          label="Category"
          name="category"
          type="select"
          value={(data.category as string) || ""}
          onChange={updateField}
          options={CATEGORIES}
        />
        <FormField
          label="Website"
          name="website"
          type="url"
          value={(data.website as string) || ""}
          onChange={updateField}
        />
        <TagInput
          label="Services"
          value={(data.services as string[]) || []}
          onChange={(v) => setData((prev) => ({ ...prev, services: v }))}
          placeholder="e.g. Stem Cell Therapy"
        />
        <FormField
          label="Featured"
          name="featured"
          type="toggle"
          value={(data.featured as boolean) || false}
          onChange={updateField}
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
