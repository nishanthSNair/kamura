"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import FormField from "@/components/admin/FormField";
import TagInput from "@/components/admin/TagInput";
import Toast from "@/components/admin/Toast";

const CATEGORIES = [
  { label: "Longevity & Science", value: "Longevity & Science" },
  { label: "Biohacking", value: "Biohacking" },
  { label: "Wellness", value: "Wellness" },
  { label: "Recovery", value: "Recovery" },
  { label: "Movement & Mindfulness", value: "Movement & Mindfulness" },
  { label: "Nutrition", value: "Nutrition" },
  { label: "Beauty & Skin", value: "Beauty & Skin" },
];

const EVIDENCE_LEVELS = [
  { label: "Strong", value: "Strong" },
  { label: "Moderate", value: "Moderate" },
  { label: "Emerging", value: "Emerging" },
  { label: "Limited", value: "Limited" },
];

const DEPTH_OPTIONS = [
  { label: "Deep Dive", value: "Deep Dive" },
  { label: "Overview", value: "Overview" },
  { label: "Quick Read", value: "Quick Read" },
];

export default function BlogEditPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [data, setData] = useState<Record<string, unknown>>({});
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const loadItem = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/content?type=blog&id=${slug}`);
      const json = await res.json();
      if (json.item) {
        const { body: b, ...rest } = json.item;
        setData(rest);
        setBody(b || "");
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

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/content?type=blog&id=${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, body }),
      });
      if (res.ok) {
        setToast({ message: "Saved successfully!", type: "success" });
      } else {
        const err = await res.json();
        setToast({ message: err.error || "Failed to save", type: "error" });
      }
    } catch {
      setToast({ message: "Failed to save", type: "error" });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="p-8 text-sm text-gray-400">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={() => router.push("/admin/blog")}
            className="text-xs text-gray-400 hover:text-gray-600 mb-2"
          >
            &larr; Back to Blog Posts
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Edit Blog Post</h1>
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
        <FormField
          label="Title"
          name="title"
          value={(data.title as string) || ""}
          onChange={updateField}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Date"
            name="date"
            type="date"
            value={(data.date as string) || ""}
            onChange={updateField}
          />
          <FormField
            label="Last Updated"
            name="lastUpdated"
            type="date"
            value={(data.lastUpdated as string) || ""}
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
            label="Evidence Level"
            name="evidenceLevel"
            type="select"
            value={(data.evidenceLevel as string) || ""}
            onChange={updateField}
            options={EVIDENCE_LEVELS}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Depth Indicator"
            name="depthIndicator"
            type="select"
            value={(data.depthIndicator as string) || ""}
            onChange={updateField}
            options={DEPTH_OPTIONS}
          />
          <FormField
            label="Kamura Score"
            name="kamuraScore"
            type="number"
            value={(data.kamuraScore as number) || 0}
            onChange={updateField}
          />
        </div>
        <FormField
          label="Cover Image URL"
          name="coverImage"
          type="url"
          value={(data.coverImage as string) || ""}
          onChange={updateField}
        />
        <FormField
          label="Excerpt"
          name="excerpt"
          type="textarea"
          value={(data.excerpt as string) || ""}
          onChange={updateField}
          rows={3}
        />
        <TagInput
          label="Related Treatments"
          value={(data.relatedTreatments as string[]) || []}
          onChange={(v) =>
            setData((prev) => ({ ...prev, relatedTreatments: v }))
          }
          placeholder="e.g. bpc-157"
        />
        <FormField
          label="Medically Reviewed"
          name="medicallyReviewed"
          type="toggle"
          value={(data.medicallyReviewed as boolean) || false}
          onChange={updateField}
        />
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">
            Body (Markdown)
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={20}
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
