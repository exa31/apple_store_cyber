import { Skeleton } from "@/components/ui/Skeleton";

export default function AccountLoading() {
  return (
    <div className="rounded-3xl bg-white p-6 sm:p-8 border border-neutral-200/80 shadow-sm space-y-6 animate-pulse">
      <div className="space-y-2">
        <Skeleton className="h-7 w-52 rounded-xl" />
        <Skeleton className="h-3.5 w-72 rounded-md" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-100">
        <div className="p-4 rounded-2xl bg-neutral-50 space-y-2">
          <Skeleton className="h-3 w-24 rounded-md" />
          <Skeleton className="h-5 w-36 rounded-md" />
        </div>
        <div className="p-4 rounded-2xl bg-neutral-50 space-y-2">
          <Skeleton className="h-3 w-28 rounded-md" />
          <Skeleton className="h-5 w-48 rounded-md" />
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-neutral-50 space-y-2">
        <Skeleton className="h-4 w-40 rounded-md" />
        <Skeleton className="h-3 w-full rounded-md" />
      </div>
    </div>
  );
}
