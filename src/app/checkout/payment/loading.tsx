import { PaymentPageSkeleton } from "@/components/ui/Skeleton";

export default function CheckoutPaymentLoading() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <PaymentPageSkeleton />
    </div>
  );
}
