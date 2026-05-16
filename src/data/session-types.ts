export type SessionTypeKey =
  | "hbot"
  | "iv_drip"
  | "yoga"
  | "sauna"
  | "cold_plunge"
  | "breathwork"
  | "sound_bath"
  | "red_light"
  | "massage"
  | "bloodwork"
  | "cryotherapy"
  | "meditation"
  | "pilates"
  | "other";

export type DetailField =
  | { key: string; label: string; type: "number"; unit?: string; placeholder?: string }
  | { key: string; label: string; type: "text"; placeholder?: string }
  | { key: string; label: string; type: "select"; options: string[] };

export interface SessionTypeMeta {
  key: SessionTypeKey;
  label: string;
  /** lucide-react icon name, resolved at render-time */
  icon:
    | "Wind"
    | "Droplet"
    | "Flame"
    | "Snowflake"
    | "Sun"
    | "Music"
    | "HeartPulse"
    | "Hand"
    | "TestTube"
    | "Sparkles"
    | "Activity"
    | "Leaf"
    | "Circle";
  /** Default duration in minutes if member doesn't override */
  defaultDuration: number;
  /** Tailwind background + foreground for the tile */
  bg: string;
  fg: string;
  /** Type-specific detail fields beyond the universal ones */
  details: DetailField[];
}

export const SESSION_TYPES: SessionTypeMeta[] = [
  {
    key: "hbot",
    label: "Hyperbaric Oxygen",
    icon: "Wind",
    defaultDuration: 60,
    bg: "bg-[#B5736A]/12",
    fg: "text-[#9A5F57]",
    details: [
      { key: "pressure_ata", label: "Pressure", type: "number", unit: "ATA", placeholder: "1.5" },
      { key: "oxygen_percent", label: "Oxygen", type: "number", unit: "%", placeholder: "100" },
    ],
  },
  {
    key: "iv_drip",
    label: "IV Drip",
    icon: "Droplet",
    defaultDuration: 45,
    bg: "bg-[#C4A882]/22",
    fg: "text-[#9A7357]",
    details: [
      { key: "blend_name", label: "Blend", type: "text", placeholder: "Myers, NAD+, glutathione…" },
    ],
  },
  {
    key: "yoga",
    label: "Yoga",
    icon: "Leaf",
    defaultDuration: 60,
    bg: "bg-[#A8C48A]/22",
    fg: "text-[#6B8B4E]",
    details: [
      {
        key: "style",
        label: "Style",
        type: "select",
        options: ["Vinyasa", "Hatha", "Yin", "Ashtanga", "Restorative", "Power", "Hot", "Other"],
      },
    ],
  },
  {
    key: "sauna",
    label: "Sauna",
    icon: "Flame",
    defaultDuration: 20,
    bg: "bg-[#D4896A]/16",
    fg: "text-[#9A5F57]",
    details: [
      { key: "temp_c", label: "Temp", type: "number", unit: "°C", placeholder: "80" },
      { key: "type", label: "Type", type: "select", options: ["Infrared", "Traditional", "Steam"] },
    ],
  },
  {
    key: "cold_plunge",
    label: "Cold Plunge",
    icon: "Snowflake",
    defaultDuration: 3,
    bg: "bg-[#7AA5B5]/22",
    fg: "text-[#3A6878]",
    details: [{ key: "temp_c", label: "Temp", type: "number", unit: "°C", placeholder: "5" }],
  },
  {
    key: "breathwork",
    label: "Breathwork",
    icon: "Activity",
    defaultDuration: 30,
    bg: "bg-[#B0BCA4]/28",
    fg: "text-[#4A5E3E]",
    details: [
      {
        key: "style",
        label: "Style",
        type: "select",
        options: ["Wim Hof", "Box", "4-7-8", "Holotropic", "Pranayama", "Other"],
      },
    ],
  },
  {
    key: "sound_bath",
    label: "Sound Bath",
    icon: "Music",
    defaultDuration: 60,
    bg: "bg-[#9A8AC4]/22",
    fg: "text-[#5B4E8F]",
    details: [],
  },
  {
    key: "red_light",
    label: "Red Light",
    icon: "Sun",
    defaultDuration: 20,
    bg: "bg-[#D4896A]/22",
    fg: "text-[#9A5F57]",
    details: [
      { key: "wavelength_nm", label: "Wavelength", type: "text", placeholder: "660 / 850 nm" },
    ],
  },
  {
    key: "massage",
    label: "Massage",
    icon: "Hand",
    defaultDuration: 60,
    bg: "bg-[#C4A882]/18",
    fg: "text-[#9A7357]",
    details: [
      {
        key: "style",
        label: "Style",
        type: "select",
        options: ["Deep tissue", "Swedish", "Sports", "Lymphatic", "Thai", "Other"],
      },
    ],
  },
  {
    key: "bloodwork",
    label: "Bloodwork",
    icon: "TestTube",
    defaultDuration: 15,
    bg: "bg-[#B5736A]/10",
    fg: "text-[#9A5F57]",
    details: [{ key: "panel", label: "Panel", type: "text", placeholder: "Full panel, hormone, lipid…" }],
  },
  {
    key: "cryotherapy",
    label: "Cryotherapy",
    icon: "Snowflake",
    defaultDuration: 3,
    bg: "bg-[#7AA5B5]/18",
    fg: "text-[#3A6878]",
    details: [{ key: "temp_c", label: "Temp", type: "number", unit: "°C", placeholder: "-120" }],
  },
  {
    key: "meditation",
    label: "Meditation",
    icon: "Sparkles",
    defaultDuration: 20,
    bg: "bg-[#B0BCA4]/22",
    fg: "text-[#4A5E3E]",
    details: [
      {
        key: "style",
        label: "Style",
        type: "select",
        options: ["Mindfulness", "Vipassana", "Transcendental", "Guided", "Loving-kindness", "Other"],
      },
    ],
  },
  {
    key: "pilates",
    label: "Pilates",
    icon: "HeartPulse",
    defaultDuration: 50,
    bg: "bg-[#A8C48A]/18",
    fg: "text-[#6B8B4E]",
    details: [
      { key: "style", label: "Style", type: "select", options: ["Reformer", "Mat", "Tower", "Chair", "Other"] },
    ],
  },
  {
    key: "other",
    label: "Other",
    icon: "Circle",
    defaultDuration: 30,
    bg: "bg-[#2A2520]/8",
    fg: "text-[#2A2520]",
    details: [{ key: "custom_label", label: "What was it?", type: "text", placeholder: "Float tank, lymphatic facial…" }],
  },
];

export function getSessionType(key: SessionTypeKey | string): SessionTypeMeta {
  return SESSION_TYPES.find((s) => s.key === key) ?? SESSION_TYPES[SESSION_TYPES.length - 1];
}
