import CardSkeleton from "@/components/shop/CardSkeleton";

export default function ShopLoading(): JSX.Element {
  return (
    <div className="w-full animate-fade-in">
      {/* Header bar skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200/80 mb-8 animate-pulse">
        <div className="space-y-2">
          <div className="h-8 bg-neutral-200 rounded-full w-48" />
          <div className="h-3.5 bg-neutral-100 rounded-full w-64" />
        </div>
        <div className="h-9 bg-neutral-100 rounded-xl w-36 border border-neutral-200/60" />
      </div>

      {/* Grid of Card Skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}