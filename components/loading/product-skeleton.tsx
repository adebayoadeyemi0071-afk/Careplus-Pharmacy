export default function ProductSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-3xl border border-[#DDE9E5] bg-white"
      aria-hidden="true"
    >
      {/* Image */}
      <div className="aspect-square animate-pulse bg-[#EAF4F1]" />

      {/* Content */}
      <div className="space-y-4 p-5">
        {/* Category */}
        <div className="h-3 w-20 animate-pulse rounded-full bg-[#EAF4F1]" />

        {/* Product name */}
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded-full bg-[#EAF4F1]" />
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-[#EAF4F1]" />
        </div>

        {/* Price */}
        <div className="h-5 w-24 animate-pulse rounded-full bg-[#EAF4F1]" />

        {/* Button */}
        <div className="h-11 w-full animate-pulse rounded-xl bg-[#EAF4F1]" />
      </div>
    </div>
  );
}