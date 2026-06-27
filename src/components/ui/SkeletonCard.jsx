function SkeletonCard({ large = false }) {
  return (
    <div className={`rounded-xl overflow-hidden bg-[#1a1a1a] ${large ? "aspect-[16/9]" : ""}`}>
      <div className={`w-full shimmer ${large ? "h-full" : "aspect-[2/3]"}`} />
      {!large && (
        <div className="p-3 space-y-2">
          <div className="h-4 shimmer rounded w-3/4" />
          <div className="h-3 shimmer rounded w-1/2" />
        </div>
      )}
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="relative h-[70vh] bg-[#1a1a1a] shimmer">
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 space-y-4">
        <div className="h-3 shimmer rounded w-32 mb-2" />
        <div className="h-12 shimmer rounded w-2/3 max-w-lg" />
        <div className="h-4 shimmer rounded w-full max-w-xl" />
        <div className="h-4 shimmer rounded w-4/5 max-w-md" />
        <div className="flex gap-3 mt-4">
          <div className="h-11 shimmer rounded-xl w-36" />
          <div className="h-11 shimmer rounded-xl w-36" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonDetails() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="h-8 shimmer rounded w-32" />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 aspect-[2/3] shimmer rounded-2xl flex-shrink-0" />
        <div className="flex-1 space-y-4">
          <div className="flex gap-2">
            {[1,2,3].map(i => <div key={i} className="h-6 shimmer rounded-full w-20" />)}
          </div>
          <div className="h-12 shimmer rounded w-2/3" />
          <div className="h-4 shimmer rounded w-1/3" />
          <div className="space-y-2">
            <div className="h-4 shimmer rounded w-full" />
            <div className="h-4 shimmer rounded w-full" />
            <div className="h-4 shimmer rounded w-4/5" />
          </div>
          <div className="flex gap-3">
            <div className="h-10 shimmer rounded-xl w-40" />
            <div className="h-10 shimmer rounded-xl w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;
