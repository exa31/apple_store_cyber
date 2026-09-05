import { Skeleton } from "@/components/ui/Skeleton";

export default function CartLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
      <div className="space-y-2 pb-8 border-b border-neutral-200">
        <Skeleton className="h-9 w-60 rounded-2xl" />
        <Skeleton className="h-4 w-48 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
        {/* Left: Cart Items Skeleton */}
        <div className="lg:col-span-8 space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-sm flex flex-col sm:flex-row items-center gap-6"
            >
              <div className="w-24 h-24 rounded-2xl bg-neutral-100 shrink-0 flex items-center justify-center">
                <Skeleton className="w-16 h-16 rounded-xl" />
              </div>
              <div className="flex-1 space-y-2 w-full">
                <Skeleton className="h-4 w-3/4 rounded-md" />
                <Skeleton className="h-3 w-1/3 rounded-md" />
                <div className="pt-2 flex justify-between items-center">
                  <Skeleton className="h-8 w-28 rounded-full" />
                  <Skeleton className="h-5 w-24 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Order Summary Skeleton */}
        <div className="lg:col-span-4 rounded-3xl bg-white p-6 border border-neutral-200/80 shadow-sm space-y-6">
          <Skeleton className="h-6 w-36 rounded-xl" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-3 w-20 rounded-md" />
                <Skeleton className="h-3 w-24 rounded-md" />
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-neutral-100 flex justify-between">
            <Skeleton className="h-5 w-24 rounded-md" />
            <Skeleton className="h-6 w-32 rounded-xl" />
          </div>
          <Skeleton className="h-12 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}
