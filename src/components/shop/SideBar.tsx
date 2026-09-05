"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FiFilter, FiRotateCcw, FiCheck } from "react-icons/fi";

interface CategoryItem {
  name: string;
  _id?: string;
  id?: string;
}

export default function SideBar({ categories }: { categories: CategoryItem[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "";
  const currentQ = searchParams.get("q") || "";

  const handleSelectCategory = (catName: string) => {
    const params = new URLSearchParams();
    if (catName) params.set("category", catName);
    if (currentQ) params.set("q", currentQ);
    router.push(`/shop?${params.toString()}`);
  };

  const handleReset = () => {
    router.push("/shop");
  };

  return (
    <aside className="w-full sm:w-64 flex-shrink-0 sm:sticky sm:top-20 space-y-6 mb-8 sm:mb-0 sm:pr-8">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
        <div className="flex items-center gap-2 text-neutral-900 font-bold text-base">
          <FiFilter className="text-neutral-500" />
          <span>Filters</span>
        </div>
        {(currentCategory || currentQ) && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-neutral-500 hover:text-black font-medium transition-colors"
          >
            <FiRotateCcw className="text-xs" /> Reset
          </button>
        )}
      </div>

      {/* Category Pills / List */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-3">
          Categories
        </label>
        <button
          onClick={() => handleSelectCategory("")}
          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
            currentCategory === ""
              ? "bg-neutral-900 text-white shadow-sm"
              : "bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200/70"
          }`}
        >
          <span>All Products</span>
          {currentCategory === "" && <FiCheck className="text-sm" />}
        </button>

        {categories.map((cat, idx) => {
          const isSelected = currentCategory === cat.name;
          return (
            <button
              key={idx}
              onClick={() => handleSelectCategory(cat.name)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                isSelected
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200/70"
              }`}
            >
              <span>{cat.name}</span>
              {isSelected && <FiCheck className="text-sm" />}
            </button>
          );
        })}
      </div>

      {/* Trust Guarantee card */}
      <div className="p-4 rounded-2xl bg-neutral-100 border border-neutral-200 text-xs text-neutral-600 space-y-2">
        <p className="font-bold text-neutral-900">Apple Official Reseller</p>
        <p className="text-[11px] text-neutral-500 leading-relaxed">
          Every device sold is covered by Apple Authorized Service Provider warranty across Indonesia.
        </p>
      </div>
    </aside>
  );
}