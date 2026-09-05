import { AddressFormSkeleton } from "@/components/ui/Skeleton";

export default function CreateAlamatLoading() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <AddressFormSkeleton />
    </div>
  );
}
