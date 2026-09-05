export default function CardSkeleton() {
  return (
    <div className="relative flex flex-col justify-between rounded-3xl bg-white p-5 border border-neutral-200/80 shadow-xs animate-pulse h-[430px] overflow-hidden">
      {/* Top Pills */}
      <div className="flex items-center justify-between z-10">
        <div className="h-5 w-16 rounded-full bg-neutral-200/70" />
        <div className="h-8 w-8 rounded-full bg-neutral-100 border border-neutral-200/60" />
      </div>

      {/* Image Preview Box */}
      <div className="my-4 flex h-52 w-full items-center justify-center rounded-2xl bg-neutral-50/80 border border-neutral-100 p-4">
        <div className="w-32 h-32 rounded-2xl bg-neutral-200/50" />
      </div>

      {/* Product Information */}
      <div className="space-y-2">
        <div className="h-5 bg-neutral-200/80 rounded-full w-3/4" />
        <div className="space-y-1.5 pt-1">
          <div className="h-3 bg-neutral-100 rounded-full w-full" />
          <div className="h-3 bg-neutral-100 rounded-full w-2/3" />
        </div>

        {/* Pricing */}
        <div className="pt-2 flex items-baseline gap-2">
          <div className="h-6 bg-neutral-200/80 rounded-full w-28" />
          <div className="h-3.5 bg-neutral-100 rounded-full w-16" />
        </div>

        {/* Action Buttons */}
        <div className="pt-3 flex items-center gap-2">
          <div className="h-9 flex-1 rounded-full bg-neutral-100" />
          <div className="h-9 w-20 rounded-full bg-neutral-900/10" />
        </div>
      </div>
    </div>
  );
}
