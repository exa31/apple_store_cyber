import React from "react";
import { FiChevronDown, FiAlertCircle } from "react-icons/fi";

interface Option {
  id: string;
  name: string;
}

interface SelectProps {
  name: string;
  label: string;
  options: Option[];
  value?: string;
  error?: string;
  handleSelect: (name: string, value: string) => void;
  handleName: (name: string, value: string) => void;
}

export default function Select({
  name,
  handleName,
  handleSelect,
  label,
  options,
  value,
  error,
}: SelectProps) {
  function handleChange(name: string, id: string) {
    const foundOption = options.find((option) => option.id === id);
    const val = foundOption?.name;
    handleSelect(name, id);
    if (val) {
      handleName(name, val);
    }
  }

  const isDisabled = options.length === 0;

  return (
    <div className="space-y-1.5 w-full">
      <label className="block text-xs font-semibold text-neutral-700">
        {label}
      </label>
      <div className="relative">
        <select
          onChange={(e) => handleChange(name, e.target.value)}
          defaultValue=""
          value={value}
          name={name}
          disabled={isDisabled}
          className={`w-full appearance-none rounded-2xl border px-4 py-3 text-xs font-medium transition-all outline-none pr-10 ${
            isDisabled
              ? "bg-neutral-100/70 border-neutral-200 text-neutral-400 cursor-not-allowed"
              : error
              ? "bg-red-50/40 border-red-300 text-neutral-900 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : "bg-white border-neutral-200 hover:border-neutral-300 text-neutral-900 focus:border-black focus:ring-2 focus:ring-black/5 shadow-sm"
          }`}
        >
          <option value="" disabled>
            {isDisabled ? `Memuat ${label}...` : `Pilih ${label}`}
          </option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-400">
          <FiChevronDown className="text-sm" />
        </div>
      </div>
      {error && (
        <div className="flex items-center gap-1 text-[11px] text-red-500 font-medium pt-0.5">
          <FiAlertCircle className="shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}