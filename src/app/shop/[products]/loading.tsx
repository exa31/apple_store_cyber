export default function ProductDetailLoading(): JSX.Element {
  return (
    <div className="w-full pb-20 animate-pulse">
      {/* Breadcrumbs skeleton */}
      <div className="flex items-center gap-2 mb-8">
        <div className="h-3.5 bg-neutral-200 rounded-full w-12" />
        <div className="h-3 bg-neutral-200 rounded-full w-3" />
        <div className="h-3.5 bg-neutral-200 rounded-full w-16" />
        <div className="h-3 bg-neutral-200 rounded-full w-3" />
        <div className="h-3.5 bg-neutral-200 rounded-full w-32" />
      </div>

      {/* Main Flagship Stage Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/80 shadow-sm">
        {/* Left: Gallery (Thumbnails + Stage) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-6 items-center sm:items-start">
          <div className="flex sm:flex-col gap-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-neutral-100 border border-neutral-200/60"
              />
            ))}
          </div>

          <div className="relative flex-1 w-full h-[360px] sm:h-[480px] rounded-3xl bg-neutral-100/70 border border-neutral-200/60 flex items-center justify-center p-8">
            <div className="w-64 h-64 rounded-3xl bg-neutral-200/50" />
          </div>
        </div>

        {/* Right: Specs, Pricing, Buy Actions */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-5 w-20 rounded-full bg-neutral-200" />
              <div className="h-5 w-28 rounded-full bg-neutral-100" />
            </div>

            <div className="space-y-2">
              <div className="h-9 bg-neutral-200 rounded-2xl w-4/5" />
              <div className="h-6 bg-neutral-100 rounded-2xl w-1/2" />
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60 space-y-2">
              <div className="h-8 bg-neutral-200 rounded-full w-36" />
              <div className="h-3 bg-neutral-100 rounded-full w-48" />
            </div>

            <div className="space-y-2 pt-2">
              <div className="h-3 bg-neutral-100 rounded-full w-full" />
              <div className="h-3 bg-neutral-100 rounded-full w-full" />
              <div className="h-3 bg-neutral-100 rounded-full w-3/4" />
            </div>

            <div className="pt-2 flex items-center gap-3">
              <div className="h-4 bg-neutral-200 rounded-full w-16" />
              <div className="h-8 bg-neutral-100 rounded-full w-24" />
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="h-14 flex-1 rounded-full bg-neutral-200" />
              <div className="h-14 w-14 rounded-full bg-neutral-100" />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="h-12 rounded-2xl bg-neutral-50" />
              <div className="h-12 rounded-2xl bg-neutral-50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}