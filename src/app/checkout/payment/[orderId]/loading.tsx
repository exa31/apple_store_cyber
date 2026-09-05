import { PaymentPageSkeleton } from "@/components/ui/Skeleton";

export default function OrderPaymentLoading() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-neutral-200 animate-pulse">
        <div className="h-4 w-36 rounded-md bg-neutral-200" />
        <div className="h-4 w-28 rounded-md bg-neutral-100" />
      </div>
      <PaymentPageSkeleton />
    </div>
  );
}
