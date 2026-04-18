"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type ProviderType = "solo" | "clinic";

interface FormState {
  providerType: ProviderType | null;
  // Account
  email: string;
  password: string;
  // Identity
  businessName: string;
  tagline: string;
  phone: string;
  category: string;
  // Practice
  nationality: string;
  yearsPracticing: string;
  yearsInUae: string;
  practitionerCount: string;     // clinic only
  approximateClients: string;
  operatingBase: string;
  // Location
  emirate: string;
  city: string;
  address: string;
  // Services & pricing
  specialties: string[];
  priceRangeMin: string;
  priceRangeMax: string;
  languages: string[];
  // Presence
  website: string;
  instagram: string;
  whatsapp: string;
  description: string;
}

const SOLO_CATEGORIES = [
  "Longevity MD",
  "Sports Medicine",
  "Functional Medicine",
  "Endocrinology",
  "Ayurveda / Integrative",
  "Nutritionist / Dietitian",
  "Physiotherapist",
  "Yoga / Pilates Instructor",
  "Personal Trainer",
  "Mental Health Practitioner",
  "Other Practitioner",
];

const CLINIC_CATEGORIES = [
  "Longevity Clinic",
  "Biohacking Studio",
  "Peptide & Hormone Clinic",
  "IV Therapy Lounge",
  "Yoga / Pilates Studio",
  "Gym / Fitness Center",
  "Spa & Retreat",
  "Ayurveda Center",
  "Mental Health Practice",
  "Aesthetic Clinic",
  "Other Center",
];

const OPERATING_BASES = [
  { value: "clinic", label: "I have a clinic / studio" },
  { value: "home", label: "I practice from home" },
  { value: "mobile", label: "I visit clients (mobile)" },
  { value: "virtual", label: "Virtual / online only" },
];

const CLIENT_RANGES = ["1–10", "10–50", "50–200", "200+", "Just starting"];

const EMIRATES = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "RAK", "Fujairah", "UAQ", "Other"];

const COMMON_SPECIALTIES = [
  "Peptide therapy",
  "GLP-1 / Weight management",
  "TRT / Hormone therapy",
  "IV therapy / NAD+",
  "Red light therapy",
  "Cryotherapy",
  "Functional medicine",
  "Lab testing",
  "Nutrition coaching",
  "Sleep optimization",
  "Recovery & injury",
  "Longevity protocols",
  "Mental health",
  "Yoga",
  "Pilates",
  "Ayurveda",
  "Acupuncture",
  "Physiotherapy",
];

const COMMON_LANGUAGES = ["English", "Arabic", "Hindi", "Urdu", "Russian", "French", "Tagalog", "Mandarin"];

export default function OnboardingWizard() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState<number>(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<FormState>({
    providerType: null,
    email: "",
    password: "",
    businessName: "",
    tagline: "",
    phone: "",
    category: "",
    nationality: "",
    yearsPracticing: "",
    yearsInUae: "",
    practitionerCount: "",
    approximateClients: "",
    operatingBase: "",
    emirate: "Dubai",
    city: "",
    address: "",
    specialties: [],
    priceRangeMin: "",
    priceRangeMax: "",
    languages: ["English"],
    website: "",
    instagram: "",
    whatsapp: "",
    description: "",
  });

  const update = (partial: Partial<FormState>) =>
    setForm((prev) => ({ ...prev, ...partial }));

  const toggleInArray = (key: "specialties" | "languages", value: string) => {
    setForm((prev) => {
      const current = prev[key];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  const STEPS = [
    "Path",
    "Account",
    form.providerType === "clinic" ? "About your business" : "About you",
    "Services & pricing",
    "Your presence",
  ];

  const canProceed = (): boolean => {
    switch (step) {
      case 0:
        return form.providerType !== null;
      case 1:
        return (
          form.email.length > 3 &&
          form.password.length >= 8 &&
          form.businessName.trim().length > 0 &&
          form.phone.trim().length > 0
        );
      case 2:
        if (form.providerType === "clinic") {
          return (
            form.category.length > 0 &&
            form.emirate.length > 0 &&
            form.city.trim().length > 0
          );
        }
        return (
          form.category.length > 0 &&
          form.emirate.length > 0 &&
          form.operatingBase.length > 0
        );
      case 3:
        return form.specialties.length > 0;
      case 4:
        return true;
      default:
        return true;
    }
  };

  async function submit() {
    setSaving(true);
    setError("");

    const { data: auth, error: authErr } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (authErr) {
      setError(authErr.message);
      setSaving(false);
      return;
    }

    if (!auth.user) {
      setError("Account creation failed. Try again.");
      setSaving(false);
      return;
    }

    const slug = form.businessName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || `provider-${Date.now()}`;

    const socialLinks: Record<string, string> = {};
    if (form.instagram) socialLinks.instagram = form.instagram;
    if (form.whatsapp) socialLinks.whatsapp = form.whatsapp;

    const { error: profileErr } = await supabase.rpc("create_provider_profile_v2", {
      user_id: auth.user.id,
      p_provider_type: form.providerType,
      p_business_name: form.businessName,
      p_slug: slug,
      p_email: form.email,
      p_phone: form.phone,
      p_category: form.category,
      p_tagline: form.tagline,
      p_description: form.description,
      p_city: form.city,
      p_emirate: form.emirate,
      p_address: form.address,
      p_nationality: form.nationality,
      p_years_practicing: form.yearsPracticing ? Number(form.yearsPracticing) : null,
      p_years_in_uae: form.yearsInUae ? Number(form.yearsInUae) : null,
      p_practitioner_count: form.practitionerCount ? Number(form.practitionerCount) : null,
      p_approximate_clients: form.approximateClients,
      p_operating_base: form.operatingBase,
      p_price_range_min: form.priceRangeMin ? Number(form.priceRangeMin) : null,
      p_price_range_max: form.priceRangeMax ? Number(form.priceRangeMax) : null,
      p_specialties: form.specialties,
      p_languages: form.languages,
      p_website: form.website,
      p_social_links: socialLinks,
    });

    if (profileErr) {
      setError(profileErr.message);
      setSaving(false);
      return;
    }

    router.push("/provider/dashboard");
  }

  const next = () => {
    if (step === STEPS.length - 1) submit();
    else setStep(step + 1);
  };
  const back = () => setStep(Math.max(0, step - 1));

  return (
    <div className="min-h-screen bg-[#EDE7DB] pt-16 pb-28 md:pt-24">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block font-serif text-2xl tracking-[0.15em] text-gray-900 mb-3">
            KAMURA
          </Link>
          <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans font-semibold">
            Provider Onboarding
          </p>
        </div>

        {/* Progress */}
        <div className="mb-10">
          <div className="flex justify-between mb-3">
            {STEPS.map((label, i) => (
              <div
                key={label}
                className={`flex-1 text-[10px] tracking-[0.15em] uppercase font-sans font-semibold text-center ${
                  i === step
                    ? "text-terracotta"
                    : i < step
                    ? "text-emerald-700"
                    : "text-gray-300"
                }`}
              >
                {i < step ? "✓" : `${i + 1}.`} {label}
              </div>
            ))}
          </div>
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-terracotta rounded-full transition-all duration-500"
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl p-7 md:p-10 shadow-sm border border-gray-200/60">
          {error && (
            <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 font-sans">
              {error}
            </div>
          )}

          {step === 0 && (
            <StepPath
              selected={form.providerType}
              onSelect={(t) => {
                update({
                  providerType: t,
                  businessName: "",
                  category: "",
                });
                setStep(1);
              }}
            />
          )}

          {step === 1 && (
            <StepAccount
              form={form}
              update={update}
              isClinic={form.providerType === "clinic"}
            />
          )}

          {step === 2 && (
            <StepAbout
              form={form}
              update={update}
              isClinic={form.providerType === "clinic"}
              toggleLanguage={(v) => toggleInArray("languages", v)}
            />
          )}

          {step === 3 && (
            <StepServices
              form={form}
              update={update}
              toggleSpecialty={(v) => toggleInArray("specialties", v)}
            />
          )}

          {step === 4 && <StepPresence form={form} update={update} />}
        </div>

        {/* Nav */}
        {step > 0 && (
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={back}
              disabled={saving}
              className="text-[11px] tracking-[0.15em] uppercase text-gray-500 hover:text-gray-900 font-sans font-semibold disabled:opacity-50"
            >
              ← Back
            </button>
            <button
              onClick={next}
              disabled={!canProceed() || saving}
              className="px-6 py-3 rounded-full bg-[#2a1612] text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans hover:bg-[#1a0f0c] disabled:opacity-50"
            >
              {saving
                ? "Creating..."
                : step === STEPS.length - 1
                ? "Create account"
                : "Continue →"}
            </button>
          </div>
        )}

        <p className="text-center text-[11px] text-gray-400 font-sans mt-6">
          Already registered?{" "}
          <Link href="/provider/login" className="text-terracotta hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

/* ───── Step 0 — Path ───── */
function StepPath({
  selected,
  onSelect,
}: {
  selected: ProviderType | null;
  onSelect: (t: ProviderType) => void;
}) {
  return (
    <div>
      <h1 className="font-serif text-2xl md:text-3xl text-gray-900 mb-3">
        Tell us who you are
      </h1>
      <p className="text-sm text-gray-500 font-sans mb-8">
        This shapes what we ask next. You can change it later.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PathCard
          active={selected === "solo"}
          onClick={() => onSelect("solo")}
          title="Solo practitioner"
          description="I'm an individual doctor, therapist, trainer, or healer."
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            </svg>
          }
        />
        <PathCard
          active={selected === "clinic"}
          onClick={() => onSelect("clinic")}
          title="Clinic, studio or center"
          description="I run a business with one or more practitioners."
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          }
        />
      </div>
    </div>
  );
}

function PathCard({
  active,
  onClick,
  title,
  description,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left p-6 rounded-2xl border transition-all ${
        active
          ? "border-terracotta bg-terracotta/5"
          : "border-gray-200 bg-white hover:border-terracotta/40 hover:shadow-sm"
      }`}
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${active ? "bg-terracotta text-white" : "bg-[#EDE7DB] text-gray-700"}`}>
        {icon}
      </div>
      <h3 className="font-serif text-xl text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 font-sans leading-relaxed">{description}</p>
    </button>
  );
}

/* ───── Step 1 — Account ───── */
function StepAccount({
  form,
  update,
  isClinic,
}: {
  form: FormState;
  update: (p: Partial<FormState>) => void;
  isClinic: boolean;
}) {
  return (
    <div>
      <h1 className="font-serif text-2xl md:text-3xl text-gray-900 mb-3">
        {isClinic ? "Your business basics" : "Your account basics"}
      </h1>
      <p className="text-sm text-gray-500 font-sans mb-8">
        Login credentials and the name clients will see.
      </p>

      <div className="space-y-5">
        <Field
          label={isClinic ? "Business / Trade Name" : "Your full name"}
          value={form.businessName}
          onChange={(v) => update({ businessName: v })}
          placeholder={isClinic ? "e.g. Nova Longevity Clinic" : "e.g. Dr. Maya Sharma"}
          required
        />
        <Field
          label="Short tagline (optional)"
          value={form.tagline}
          onChange={(v) => update({ tagline: v })}
          placeholder={isClinic ? "e.g. Evidence-based longevity in Dubai" : "e.g. Peptide-literate Longevity MD"}
        />
        <Field
          label="Email"
          type="email"
          value={form.email}
          onChange={(v) => update({ email: v })}
          placeholder="you@clinic.com"
          required
        />
        <Field
          label="Password"
          type="password"
          value={form.password}
          onChange={(v) => update({ password: v })}
          placeholder="Min 8 characters"
          required
        />
        <Field
          label="Phone / WhatsApp"
          value={form.phone}
          onChange={(v) => update({ phone: v })}
          placeholder="+971 XX XXX XXXX"
          required
        />
      </div>
    </div>
  );
}

/* ───── Step 2 — About (branched) ───── */
function StepAbout({
  form,
  update,
  isClinic,
  toggleLanguage,
}: {
  form: FormState;
  update: (p: Partial<FormState>) => void;
  isClinic: boolean;
  toggleLanguage: (v: string) => void;
}) {
  const categories = isClinic ? CLINIC_CATEGORIES : SOLO_CATEGORIES;

  return (
    <div>
      <h1 className="font-serif text-2xl md:text-3xl text-gray-900 mb-3">
        {isClinic ? "Tell us about your business" : "Tell us about your practice"}
      </h1>
      <p className="text-sm text-gray-500 font-sans mb-8">
        This helps clients find you and helps us verify you.
      </p>

      <div className="space-y-5">
        <PillSelect
          label="Category"
          options={categories}
          value={form.category}
          onChange={(v) => update({ category: v })}
        />

        {!isClinic && (
          <PillSelect
            label="Where do you practice from?"
            options={OPERATING_BASES.map((o) => o.label)}
            value={
              OPERATING_BASES.find((o) => o.value === form.operatingBase)?.label || ""
            }
            onChange={(label) => {
              const opt = OPERATING_BASES.find((o) => o.label === label);
              update({ operatingBase: opt?.value || "" });
            }}
          />
        )}

        <div className="grid grid-cols-2 gap-4">
          <PillSelect
            label="Emirate"
            options={EMIRATES}
            value={form.emirate}
            onChange={(v) => update({ emirate: v })}
          />
          <Field
            label="City / Area"
            value={form.city}
            onChange={(v) => update({ city: v })}
            placeholder="e.g. Dubai Marina"
            required={isClinic}
          />
        </div>

        {isClinic && (
          <Field
            label="Address"
            value={form.address}
            onChange={(v) => update({ address: v })}
            placeholder="Building, street"
          />
        )}

        {isClinic ? (
          <div className="grid grid-cols-2 gap-4">
            <NumberField
              label="Practitioners"
              value={form.practitionerCount}
              onChange={(v) => update({ practitionerCount: v })}
              placeholder="e.g. 4"
            />
            <NumberField
              label="Years in operation"
              value={form.yearsPracticing}
              onChange={(v) => update({ yearsPracticing: v })}
              placeholder="e.g. 6"
            />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Years practicing"
                value={form.yearsPracticing}
                onChange={(v) => update({ yearsPracticing: v })}
                placeholder="e.g. 12"
              />
              <NumberField
                label="Years in UAE"
                value={form.yearsInUae}
                onChange={(v) => update({ yearsInUae: v })}
                placeholder="e.g. 4"
              />
            </div>
            <Field
              label="Nationality"
              value={form.nationality}
              onChange={(v) => update({ nationality: v })}
              placeholder="e.g. Indian / British"
            />
          </>
        )}

        <PillSelect
          label="Approximate clients today"
          options={CLIENT_RANGES}
          value={form.approximateClients}
          onChange={(v) => update({ approximateClients: v })}
        />

        <div>
          <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
            Languages
          </label>
          <div className="flex flex-wrap gap-2">
            {COMMON_LANGUAGES.map((lang) => {
              const selected = form.languages.includes(lang);
              return (
                <button
                  key={lang}
                  onClick={() => toggleLanguage(lang)}
                  className={`px-3 py-1.5 rounded-full border text-xs font-sans transition-colors ${
                    selected
                      ? "border-terracotta bg-terracotta/10 text-terracotta font-semibold"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {lang}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── Step 3 — Services & pricing ───── */
function StepServices({
  form,
  update,
  toggleSpecialty,
}: {
  form: FormState;
  update: (p: Partial<FormState>) => void;
  toggleSpecialty: (v: string) => void;
}) {
  return (
    <div>
      <h1 className="font-serif text-2xl md:text-3xl text-gray-900 mb-3">
        What do you offer?
      </h1>
      <p className="text-sm text-gray-500 font-sans mb-8">
        Pick all specialties you actively treat. You can add individual services
        (with prices and durations) inside your dashboard after signup.
      </p>

      <div className="space-y-6">
        <div>
          <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-3">
            Specialties
            <span className="ml-2 text-terracotta font-normal normal-case tracking-normal">
              {form.specialties.length} selected
            </span>
          </label>
          <div className="flex flex-wrap gap-2">
            {COMMON_SPECIALTIES.map((s) => {
              const selected = form.specialties.includes(s);
              return (
                <button
                  key={s}
                  onClick={() => toggleSpecialty(s)}
                  className={`px-3 py-1.5 rounded-full border text-xs font-sans transition-colors ${
                    selected
                      ? "border-terracotta bg-terracotta/10 text-terracotta font-semibold"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {selected ? "✓ " : "+ "}
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
            Typical price range (AED per session)
          </label>
          <div className="grid grid-cols-2 gap-4">
            <NumberField
              label="From"
              value={form.priceRangeMin}
              onChange={(v) => update({ priceRangeMin: v })}
              placeholder="e.g. 400"
            />
            <NumberField
              label="Up to"
              value={form.priceRangeMax}
              onChange={(v) => update({ priceRangeMax: v })}
              placeholder="e.g. 1500"
            />
          </div>
          <p className="text-[10px] text-gray-400 font-sans mt-2">
            Clients see a range on your profile. Exact per-service prices go in
            your dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ───── Step 4 — Presence ───── */
function StepPresence({
  form,
  update,
}: {
  form: FormState;
  update: (p: Partial<FormState>) => void;
}) {
  return (
    <div>
      <h1 className="font-serif text-2xl md:text-3xl text-gray-900 mb-3">
        Where can clients find you?
      </h1>
      <p className="text-sm text-gray-500 font-sans mb-8">
        Optional, but verified socials and a bio help clients trust you.
      </p>

      <div className="space-y-5">
        <Field
          label="Website (optional)"
          value={form.website}
          onChange={(v) => update({ website: v })}
          placeholder="https://"
        />
        <Field
          label="Instagram handle (optional)"
          value={form.instagram}
          onChange={(v) => update({ instagram: v })}
          placeholder="@yourhandle"
        />
        <Field
          label="WhatsApp business number (optional)"
          value={form.whatsapp}
          onChange={(v) => update({ whatsapp: v })}
          placeholder="+971 XX XXX XXXX"
        />

        <div>
          <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
            Short bio (optional)
          </label>
          <textarea
            value={form.description}
            onChange={(e) => update({ description: e.target.value })}
            rows={4}
            placeholder="One paragraph clients will read on your public profile. Who you are, who you help, and what makes your approach different."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta resize-none"
          />
        </div>
      </div>
    </div>
  );
}

/* ───── Atoms ───── */
function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
        {label}
        {required && <span className="text-terracotta ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
      />
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
        {label}
      </label>
      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
      />
    </div>
  );
}

function PillSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value === opt;
          return (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              className={`px-3 py-1.5 rounded-full border text-xs font-sans transition-colors ${
                selected
                  ? "border-terracotta bg-terracotta/10 text-terracotta font-semibold"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
