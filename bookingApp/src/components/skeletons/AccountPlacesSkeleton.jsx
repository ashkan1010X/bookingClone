import Skeleton from "../Skeleton";

export default function AccountPlacesSkeleton() {
  return (
    <div className="px-5 py-8">
      <Skeleton className="h-10 w-72 mx-auto mb-6" />
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row gap-4 p-4 bg-white/60 rounded-2xl"
          >
            <Skeleton className="h-40 w-full md:w-48 rounded-xl" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <div className="flex flex-wrap gap-2 mt-2">
                {Array.from({ length: 4 }).map((_, j) => (
                  <Skeleton key={j} className="h-6 w-14 rounded-full" />
                ))}
              </div>
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="hidden md:flex flex-col gap-2">
              <Skeleton className="h-9 w-16" />
              <Skeleton className="h-9 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
