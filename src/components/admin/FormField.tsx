"use client";

interface FormFieldProps {
 label: string;
 name: string;
 type?: "text" | "number" | "textarea" | "select" | "toggle" | "url" | "date";
 value: string | number | boolean;
 onChange: (name: string, value: string | number | boolean) => void;
 options?: { label: string; value: string }[];
 placeholder?: string;
 rows?: number;
}

export default function FormField({
 label,
 name,
 type = "text",
 value,
 onChange,
 options,
 placeholder,
 rows = 4,
}: FormFieldProps) {
 const baseInput =
 "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-moss bg-white";

 if (type === "toggle") {
 return (
 <label className="flex items-center gap-3 cursor-pointer">
 <div
 className={`w-10 h-5 rounded-full transition-colors relative ${
 value ? "bg-moss" : "bg-gray-300"
 }`}
 onClick={() => onChange(name, !value)}
 >
 <div
 className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow ${
 value ? "translate-x-5" : "translate-x-0.5"
 }`}
 />
 </div>
 <span className="text-sm text-gray-700">{label}</span>
 </label>
 );
 }

 if (type === "select") {
 return (
 <div>
 <label className="block text-xs font-medium text-gray-500 mb-1.5">
 {label}
 </label>
 <select
 value={value as string}
 onChange={(e) => onChange(name, e.target.value)}
 className={baseInput}
 >
 <option value="">Select...</option>
 {options?.map((opt) => (
 <option key={opt.value} value={opt.value}>
 {opt.label}
 </option>
 ))}
 </select>
 </div>
 );
 }

 if (type === "textarea") {
 return (
 <div>
 <label className="block text-xs font-medium text-gray-500 mb-1.5">
 {label}
 </label>
 <textarea
 value={value as string}
 onChange={(e) => onChange(name, e.target.value)}
 placeholder={placeholder}
 rows={rows}
 className={`${baseInput} resize-y`}
 />
 </div>
 );
 }

 return (
 <div>
 <label className="block text-xs font-medium text-gray-500 mb-1.5">
 {label}
 </label>
 <input
 type={type === "number" ? "number" : type === "date" ? "date" : "text"}
 value={value as string | number}
 onChange={(e) =>
 onChange(
 name,
 type === "number" ? Number(e.target.value) : e.target.value
 )
 }
 placeholder={placeholder}
 className={baseInput}
 />
 </div>
 );
}
