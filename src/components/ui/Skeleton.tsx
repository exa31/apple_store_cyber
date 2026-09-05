import React from "react";

export function Skeleton({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-neutral-200/70 ${className}`}
      {...props}
    />
  );
}

// 1. Skeleton for Address List (/account/address)
export function AddressListSkeleton() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48 rounded-xl" />
          <Skeleton className="h-4 w-72 rounded-lg" />
        </div>
        <Skeleton className="h-10 w-40 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-sm space-y-4 animate-pulse"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-neutral-200" />
                <div className="h-4 w-28 rounded-lg bg-neutral-200" />
              </div>
              <div className="h-5 w-16 rounded-full bg-neutral-100" />
            </div>
            <div className="space-y-2 pt-1">
              <div className="h-3.5 w-full rounded-md bg-neutral-200/70" />
              <div className="h-3.5 w-4/5 rounded-md bg-neutral-200/70" />
              <div className="h-3 w-1/2 rounded-md bg-neutral-100" />
            </div>
            <div className="flex gap-2 pt-3 border-t border-neutral-100">
              <div className="h-8 flex-1 rounded-full bg-neutral-100" />
              <div className="h-8 w-20 rounded-full bg-neutral-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 2. Skeleton for Address Form (/account/address/create-alamat & edit-alamat)
export function AddressFormSkeleton() {
  return (
    <div className="rounded-3xl bg-white p-6 sm:p-10 border border-neutral-200/80 shadow-sm space-y-8 animate-pulse">
      <div className="space-y-2 pb-6 border-b border-neutral-100">
        <div className="h-4 w-32 rounded-lg bg-neutral-200" />
        <div className="h-7 w-56 rounded-xl bg-neutral-200" />
        <div className="h-3.5 w-80 rounded-md bg-neutral-100" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="sm:col-span-2 space-y-2">
          <div className="h-3.5 w-28 rounded-md bg-neutral-200" />
          <div className="h-12 w-full rounded-2xl bg-neutral-100" />
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-3.5 w-24 rounded-md bg-neutral-200" />
            <div className="h-12 w-full rounded-2xl bg-neutral-100" />
          </div>
        ))}
        <div className="sm:col-span-2 space-y-2">
          <div className="h-3.5 w-32 rounded-md bg-neutral-200" />
          <div className="h-28 w-full rounded-2xl bg-neutral-100" />
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t border-neutral-100">
        <div className="h-11 w-28 rounded-full bg-neutral-200" />
        <div className="h-11 w-36 rounded-full bg-neutral-300" />
      </div>
    </div>
  );
}

// 3. Skeleton for Order List (/account/order)
export function OrderListSkeleton() {
  return (
    <div className="rounded-3xl bg-white p-6 sm:p-8 border border-neutral-200/80 shadow-sm space-y-6 animate-pulse">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
        <div className="space-y-1.5">
          <div className="h-6 w-36 rounded-xl bg-neutral-200" />
          <div className="h-3 w-48 rounded-md bg-neutral-100" />
        </div>
        <div className="h-8 w-24 rounded-full bg-neutral-100" />
      </div>

      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50/80 border border-neutral-100"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-neutral-200/80" />
              <div className="space-y-1.5">
                <div className="h-4 w-32 rounded-md bg-neutral-200" />
                <div className="h-3 w-20 rounded-md bg-neutral-100" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-6 w-20 rounded-full bg-neutral-200/70" />
              <div className="h-4 w-24 rounded-md bg-neutral-200 hidden sm:block" />
              <div className="h-8 w-24 rounded-full bg-neutral-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 4. Skeleton for Official Invoice (/account/order/[invoice])
export function InvoiceSkeleton() {
  return (
    <div className="rounded-3xl bg-white p-8 sm:p-12 border border-neutral-200/80 shadow-md space-y-8 animate-pulse max-w-4xl mx-auto">
      <div className="flex justify-between items-start pb-8 border-b border-neutral-100">
        <div className="space-y-2">
          <div className="h-8 w-40 rounded-xl bg-neutral-200" />
          <div className="h-3 w-48 rounded-md bg-neutral-100" />
        </div>
        <div className="space-y-2 text-right">
          <div className="h-6 w-28 rounded-full bg-neutral-200 ml-auto" />
          <div className="h-3.5 w-36 rounded-md bg-neutral-100 ml-auto" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 rounded-2xl bg-neutral-50 space-y-2">
            <div className="h-3 w-20 rounded-md bg-neutral-200" />
            <div className="h-4 w-28 rounded-md bg-neutral-200" />
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-4">
        <div className="h-4 w-32 rounded-md bg-neutral-200" />
        {[1, 2].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-neutral-200" />
              <div className="space-y-1">
                <div className="h-4 w-36 rounded-md bg-neutral-200" />
                <div className="h-3 w-20 rounded-md bg-neutral-100" />
              </div>
            </div>
            <div className="h-4 w-24 rounded-md bg-neutral-200" />
          </div>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-neutral-50 flex justify-between items-center">
        <div className="h-5 w-24 rounded-md bg-neutral-200" />
        <div className="h-7 w-36 rounded-xl bg-neutral-300" />
      </div>
    </div>
  );
}

// 5. Skeleton for Checkout Payment Page (/checkout/payment/[orderId])
export function PaymentPageSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-pulse">
      {/* Left Box: Payment Details */}
      <div className="lg:col-span-7 rounded-3xl bg-white p-6 sm:p-8 border border-neutral-200/80 shadow-sm space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
          <div className="h-5 w-36 rounded-full bg-neutral-200" />
          <div className="h-5 w-28 rounded-full bg-neutral-100" />
        </div>
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <div className="w-64 h-64 rounded-3xl bg-neutral-100 border-2 border-neutral-200 flex items-center justify-center">
            <div className="w-48 h-48 rounded-2xl bg-neutral-200/60" />
          </div>
          <div className="h-3.5 w-72 rounded-md bg-neutral-200" />
        </div>
        <div className="p-4 rounded-2xl bg-neutral-50 space-y-2">
          <div className="h-3 w-32 rounded-md bg-neutral-200" />
          <div className="h-3 w-full rounded-md bg-neutral-100" />
          <div className="h-3 w-4/5 rounded-md bg-neutral-100" />
        </div>
        <div className="space-y-3 pt-2">
          <div className="h-12 w-full rounded-full bg-neutral-200" />
          <div className="h-10 w-full rounded-full bg-neutral-100" />
        </div>
      </div>

      {/* Right Box: Order Summary */}
      <div className="lg:col-span-5 space-y-6">
        <div className="rounded-3xl bg-white p-6 border border-neutral-200/80 shadow-sm space-y-4">
          <div className="flex justify-between pb-3 border-b border-neutral-100">
            <div className="h-4 w-32 rounded-md bg-neutral-200" />
            <div className="h-3.5 w-16 rounded-md bg-neutral-100" />
          </div>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3 py-2">
                <div className="w-12 h-12 rounded-xl bg-neutral-200" />
                <div className="flex-1 space-y-1">
                  <div className="h-3.5 w-3/4 rounded-md bg-neutral-200" />
                  <div className="h-3 w-1/2 rounded-md bg-neutral-100" />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-neutral-100 space-y-2">
            <div className="flex justify-between">
              <div className="h-3 w-16 rounded-md bg-neutral-100" />
              <div className="h-3 w-20 rounded-md bg-neutral-100" />
            </div>
            <div className="flex justify-between">
              <div className="h-4 w-20 rounded-md bg-neutral-200" />
              <div className="h-5 w-28 rounded-md bg-neutral-300" />
            </div>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-6 border border-neutral-200/80 space-y-2">
          <div className="h-3.5 w-28 rounded-md bg-neutral-200" />
          <div className="h-3 w-full rounded-md bg-neutral-100" />
          <div className="h-3 w-3/4 rounded-md bg-neutral-100" />
        </div>
      </div>
    </div>
  );
}

// 6. Skeleton for Checkout Address Selection (/checkout/address)
export function CheckoutAddressSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-start gap-4 p-5 rounded-2xl bg-neutral-50/70 border border-neutral-200"
        >
          <div className="w-5 h-5 rounded-full bg-neutral-200 mt-0.5" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-36 rounded-md bg-neutral-200" />
            <div className="h-3.5 w-full rounded-md bg-neutral-200/70" />
            <div className="h-3 w-2/3 rounded-md bg-neutral-100" />
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center pt-8 border-t border-neutral-200 mt-8">
        <div className="h-10 w-28 rounded-full bg-neutral-200" />
        <div className="h-11 w-44 rounded-full bg-neutral-300" />
      </div>
    </div>
  );
}
