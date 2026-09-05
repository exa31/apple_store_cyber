import React from "react";

interface TextAreaProps {
  label: string;
  name: string;
  value?: string;
  placeholder?: string;
  error?: string;
}

export default function TextArea({
  label,
  name,
  value,
  placeholder,
  error,
}: TextAreaProps) {
  return (
    <div className="space-y-1.5 w-full">
      <label className="block text-xs font-semibold text-neutral-700">
        {label}
      </label>
      <textarea
        className={`w-full rounded-2xl border p-3.5 text-xs font-medium transition-all outline-none h-28 resize-none ${
          error
            ? "bg-red-50/40 border-red-300 text-neutral-900 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            : "bg-white border-neutral-200 hover:border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-black focus:ring-2 focus:ring-black/5 shadow-sm"
        }`}
        name={name}
        defaultValue={value}
        placeholder={
          placeholder ||
          `Contoh: Jl. Sudirman No. 12, RT 01/RW 02, Dekat Masjid/Gedung X`
        }
      />
      {error && <p className="text-[11px] text-red-500 font-medium">{error}</p>}
    </div>
  );
}