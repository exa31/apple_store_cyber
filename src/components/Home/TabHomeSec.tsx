"use client";

import React, { useState } from "react";
import Tab1 from "./tabContent/Tab1";

export default function TabHomeSec(): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>("");

  const tabs = [
    { label: "All Products", category: "" },
    { label: "iPhone", category: "iPhone" },
    { label: "MacBook", category: "MacBook" },
    { label: "Apple Watch", category: "Apple Watch" },
    { label: "AirPods", category: "AirPods" },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Curated Collection
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mt-1">
            Featured Products
          </h2>
        </div>

        {/* Apple Pill Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-neutral-100/90 border border-neutral-200/80 w-fit">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.category;
            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.category)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white text-black shadow-sm font-semibold"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Products Grid */}
      <Tab1 category={activeTab} limit={8} />
    </section>
  );
}