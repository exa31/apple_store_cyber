"use client";

import { AddressProvider } from "@/context";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { FiMapPin, FiCreditCard } from "react-icons/fi";

export default function LayoutCheckout({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string>("");
  const pathname = usePathname();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      {/* Sleek Apple Checkout Stepper */}
      <div className="max-w-xl mx-auto mb-12">
        <div className="flex items-center justify-between relative">
          {/* Connector line */}
          <div className="absolute left-1/4 right-1/4 top-1/2 -translate-y-1/2 h-[2px] bg-neutral-200 -z-0" />

          {/* Step 1: Address */}
          <div
            className={`flex items-center gap-3 z-10 bg-[#fbfbfd] px-4 py-2 rounded-full border transition-all ${
              pathname === "/checkout/address"
                ? "border-neutral-900 bg-white shadow-sm"
                : "border-neutral-200 opacity-60"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                pathname === "/checkout/address"
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-200 text-neutral-600"
              }`}
            >
              <FiMapPin />
            </div>
            <div>
              <p className="text-[10px] text-neutral-400 font-bold uppercase">Step 1</p>
              <h4 className="text-xs font-semibold text-neutral-900">Delivery Address</h4>
            </div>
          </div>

          {/* Step 2: Payment */}
          <div
            className={`flex items-center gap-3 z-10 bg-[#fbfbfd] px-4 py-2 rounded-full border transition-all ${
              pathname === "/checkout/payment"
                ? "border-neutral-900 bg-white shadow-sm"
                : "border-neutral-200 opacity-60"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                pathname === "/checkout/payment"
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-200 text-neutral-600"
              }`}
            >
              <FiCreditCard />
            </div>
            <div>
              <p className="text-[10px] text-neutral-400 font-bold uppercase">Step 2</p>
              <h4 className="text-xs font-semibold text-neutral-900">Order & Payment</h4>
            </div>
          </div>
        </div>
      </div>

      <AddressProvider.Provider value={{ address, setAddress }}>
        {children}
      </AddressProvider.Provider>
    </div>
  );
}