"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Service {
  id: string;
  name: string;
  description: string;
  duration_minutes: number;
  price_aed: number;
  active: boolean;
  treatment_slug: string | null;
}

interface Provider {
  business_name: string;
  description: string;
  category: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  city: string;
  emirate: string;
  operating_hours: Record<string, string>;
  social_links: Record<string, string>;
}

const CATEGORIES = [
  "Wellness Clinic",
  "Longevity Center",
  "Biohacking Lab",
  "Yoga Studio",
  "Pilates Studio",
  "Functional Medicine",
  "Ayurveda Center",
  "Spa & Retreat",
  "Gym & Fitness",
  "Nutrition & Dietetics",
  "IV Therapy Lounge",
  "Cryotherapy Center",
  "Float Tank Center",
  "Mental Health & Therapy",
  "Other",
];

export default function SettingsPage() {
  const supabase = createClient();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // New service form
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    duration_minutes: 60,
    price_aed: 0,
    treatment_slug: "",
  });

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadData() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const [providerRes, servicesRes] = await Promise.all([
      supabase.from("providers").select("*").eq("id", user.id).single(),
      supabase
        .from("services")
        .select("*")
        .order("sort_order")
        .order("name"),
    ]);

    setProvider(providerRes.data as Provider);
    setServices((servicesRes.data as Service[]) || []);
    setLoading(false);
  }

  async function saveProfile() {
    if (!provider) return;
    setSaving(true);
    setSaved(false);
    await supabase
      .from("providers")
      .update({
        business_name: provider.business_name,
        description: provider.description,
        category: provider.category,
        phone: provider.phone,
        email: provider.email,
        website: provider.website,
        address: provider.address,
        city: provider.city,
        emirate: provider.emirate,
      })
      .eq(
        "id",
        (await supabase.auth.getUser()).data.user!.id
      );
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  async function addService() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("services")
      .insert({
        provider_id: user.id,
        ...newService,
        treatment_slug: newService.treatment_slug || null,
      })
      .select()
      .single();

    if (data) {
      setServices((prev) => [...prev, data as Service]);
      setNewService({
        name: "",
        description: "",
        duration_minutes: 60,
        price_aed: 0,
        treatment_slug: "",
      });
      setShowAddService(false);
    }
  }

  async function toggleService(id: string, active: boolean) {
    await supabase.from("services").update({ active: !active }).eq("id", id);
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !active } : s))
    );
  }

  async function deleteService(id: string) {
    await supabase.from("services").delete().eq("id", id);
    setServices((prev) => prev.filter((s) => s.id !== id));
  }

  function updateField(field: keyof Provider, value: string) {
    if (!provider) return;
    setProvider({ ...provider, [field]: value });
  }

  if (loading || !provider) {
    return <p className="text-sm text-gray-400 font-sans">Loading settings...</p>;
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-gray-900 mb-2">
          Profile Settings
        </h1>
        <p className="text-sm text-gray-500 font-sans">
          Edit your business information visible to Kamura users.
        </p>
      </div>

      {/* Profile form */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 mb-8">
        <h2 className="font-serif text-xl text-gray-900 mb-6">
          Business Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field
            label="Business Name"
            value={provider.business_name}
            onChange={(v) => updateField("business_name", v)}
          />
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
              Category
            </label>
            <select
              value={provider.category}
              onChange={(e) => updateField("category", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <Field
            label="Phone"
            value={provider.phone}
            onChange={(v) => updateField("phone", v)}
            placeholder="+971 XX XXX XXXX"
          />
          <Field
            label="Email"
            value={provider.email}
            onChange={(v) => updateField("email", v)}
            type="email"
          />
          <Field
            label="Website"
            value={provider.website}
            onChange={(v) => updateField("website", v)}
            placeholder="https://"
          />
          <Field
            label="City"
            value={provider.city}
            onChange={(v) => updateField("city", v)}
          />
          <div className="md:col-span-2">
            <Field
              label="Address"
              value={provider.address}
              onChange={(v) => updateField("address", v)}
              placeholder="Building, street, area"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
              Description
            </label>
            <textarea
              value={provider.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta resize-none"
              placeholder="Tell clients about your practice..."
            />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={saveProfile}
            disabled={saving}
            className="px-6 py-3 rounded-full bg-[#2a1612] text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans hover:bg-[#1a0f0c] disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          {saved && (
            <span className="text-xs text-emerald-700 font-sans">
              Saved successfully
            </span>
          )}
        </div>
      </div>

      {/* Services */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-xl text-gray-900">Services</h2>
          <button
            onClick={() => setShowAddService(!showAddService)}
            className="px-4 py-2 rounded-full bg-[#2a1612] text-white text-[10px] tracking-[0.15em] uppercase font-semibold font-sans hover:bg-[#1a0f0c]"
          >
            + Add Service
          </button>
        </div>

        {showAddService && (
          <div className="border border-gray-200 rounded-xl p-5 mb-5 bg-gray-50/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Field
                label="Service Name"
                value={newService.name}
                onChange={(v) => setNewService({ ...newService, name: v })}
                placeholder="e.g. NAD+ IV Drip"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
                    Duration (min)
                  </label>
                  <input
                    type="number"
                    value={newService.duration_minutes}
                    onChange={(e) =>
                      setNewService({
                        ...newService,
                        duration_minutes: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
                    Price (AED)
                  </label>
                  <input
                    type="number"
                    value={newService.price_aed}
                    onChange={(e) =>
                      setNewService({
                        ...newService,
                        price_aed: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
                Kamura Treatment Slug (optional)
              </label>
              <input
                type="text"
                value={newService.treatment_slug}
                onChange={(e) =>
                  setNewService({ ...newService, treatment_slug: e.target.value })
                }
                placeholder="e.g. nad-injectable, bpc-157, red-light-therapy"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
              />
              <p className="text-[10px] text-gray-400 font-sans mt-1.5">
                Link to a Kamura-scored treatment so clients searching for it find you.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={addService}
                disabled={!newService.name}
                className="px-4 py-2 rounded-full bg-[#2a1612] text-white text-[10px] tracking-[0.15em] uppercase font-semibold font-sans hover:bg-[#1a0f0c] disabled:opacity-50"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddService(false)}
                className="px-4 py-2 rounded-full border border-gray-200 text-gray-600 text-[10px] tracking-[0.15em] uppercase font-semibold font-sans"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {services.length === 0 ? (
          <p className="text-sm text-gray-400 font-sans italic">
            No services added yet. Add your first service above.
          </p>
        ) : (
          <div className="divide-y divide-gray-100">
            {services.map((s) => (
              <div
                key={s.id}
                className={`py-4 flex items-center gap-4 ${
                  !s.active ? "opacity-50" : ""
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-base text-gray-900">{s.name}</p>
                  <p className="text-xs text-gray-500 font-sans mt-0.5">
                    {s.duration_minutes} min · AED {Number(s.price_aed).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => toggleService(s.id, s.active)}
                  className={`text-[10px] tracking-[0.15em] uppercase font-sans font-semibold ${
                    s.active ? "text-emerald-700" : "text-gray-400"
                  }`}
                >
                  {s.active ? "Active" : "Inactive"}
                </button>
                <button
                  onClick={() => deleteService(s.id)}
                  className="text-[10px] tracking-[0.15em] uppercase text-gray-400 hover:text-red-600 font-sans"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
      />
    </div>
  );
}
