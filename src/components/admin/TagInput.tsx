"use client";

import { useState } from "react";

interface TagInputProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export default function TagInput({
  label,
  value,
  onChange,
  placeholder = "Add item...",
}: TagInputProps) {
  const [input, setInput] = useState("");

  function handleKeyDown(e: React.KeyboardEvent) {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      if (!value.includes(input.trim())) {
        onChange([...value, input.trim()]);
      }
      setInput("");
    }
    if (e.key === "Backspace" && !input && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  }

  function removeTag(tag: string) {
    onChange(value.filter((v) => v !== tag));
  }

  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1.5">
        {label}
      </label>
      <div className="border border-gray-200 rounded-lg p-2 flex flex-wrap gap-1.5 min-h-[38px] bg-white focus-within:border-moss">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="text-gray-400 hover:text-red-500"
            >
              &times;
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[100px] text-sm outline-none bg-transparent"
        />
      </div>
      <p className="text-[11px] text-gray-400 mt-1">Press Enter or comma to add</p>
    </div>
  );
}
