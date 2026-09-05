import { CheckoutAddressSkeleton } from "@/components/ui/Skeleton";

export default function CheckoutAddressLoading() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <div className="pb-4 border-b border-neutral-200 mb-6 space-y-2 animate-pulse">
        <div className="h-8 w-60 rounded-xl bg-neutral-200" />
        <div className="h-3.5 w-80 rounded-md bg-neutral-100" />
      </div>
      <CheckoutAddressSkeleton />
    </div>
  );
}
