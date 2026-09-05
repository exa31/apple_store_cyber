import CardSkeleton from "@/components/shop/CardSkeleton";

export default function Loading(): JSX.Element {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[70vh]">
      {/* Header Skeleton */}
      <div className="pb-6 border-b border-neutral-200/80 mb-8 animate-pulse space-y-3">
        <div className="h-9 sm:h-10 w-64 sm:w-80 bg-neutral-200/80 rounded-2xl" />
        <div className="h-3.5 w-44 bg-neutral-100 rounded-full" />
      </div>

      {/* Grid of Card Skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}