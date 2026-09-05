"use client";

import Radio from "@/components/checkout/Radio";
import { CheckoutAddressSkeleton } from "@/components/ui/Skeleton";
import { AddressProvider } from "@/context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FiPlus, FiArrowRight, FiCheck } from "react-icons/fi";

interface Address {
  name: string;
  kelurahan: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  detail: string;
  _id: string;
}

export default function CheckoutAddress() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const addressProvider = useContext(AddressProvider);
  const address = addressProvider?.address || "";
  const setAddress = addressProvider?.setAddress || (() => {});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await fetch("/api/delivery-address");
        if (!res.ok) return;
        const data = await res.json();
        const list = Array.isArray(data) ? data : (data?.data || data?.deliveryAddresses || []);
        setAddresses(list);
        if (list.length > 0 && !address) {
          setAddress(list[0]._id);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAddress();
  }, [address, setAddress]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="pb-4 border-b border-neutral-200 mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Select Delivery Address
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Choose where you would like your Apple order shipped
          </p>
        </div>
        <Link
          href="/account/address/create-alamat"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold transition-colors"
        >
          <FiPlus /> Add New Address
        </Link>
      </div>

      {loading ? (
        <CheckoutAddressSkeleton />
      ) : addresses.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl bg-neutral-50 border border-neutral-200/80 my-4 space-y-3">
          <h3 className="text-base font-semibold text-neutral-900">No Address Found</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            You have not saved any delivery address yet. Please add an address to proceed with your order.
          </p>
          <div className="pt-2">
            <Link
              href="/account/address/create-alamat"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-semibold"
            >
              <FiPlus /> Add Shipping Address
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((item) => {
            const isSelected = address === item._id;
            return (
              <label
                key={item._id}
                className={`flex items-start gap-4 p-5 rounded-2xl cursor-pointer border transition-all ${
                  isSelected
                    ? "bg-white border-neutral-900 shadow-md ring-1 ring-neutral-900/10"
                    : "bg-neutral-50/70 border-neutral-200 hover:bg-neutral-50"
                }`}
              >
                <div className="pt-0.5">
                  <Radio value={item._id} onChange={onChange} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-neutral-900">{item.name}</h4>
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <FiCheck /> Selected
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    Provinsi {item.provinsi}, {item.kabupaten}, {item.kecamatan}, {item.kelurahan}
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5 font-medium">{item.detail}</p>
                </div>
              </label>
            );
          })}

          <div className="flex justify-between items-center pt-8 border-t border-neutral-200 mt-8">
            <Link
              href="/cart"
              onClick={() => setAddress("")}
              className="px-6 py-3 rounded-full border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              Back to Bag
            </Link>
            <Link
              href="/checkout/payment"
              className={`inline-flex items-center gap-2 px-8 py-3 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-semibold transition-all shadow-md active:scale-95 ${
                !address ? "pointer-events-none opacity-40" : ""
              }`}
            >
              Continue to Payment <FiArrowRight />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}