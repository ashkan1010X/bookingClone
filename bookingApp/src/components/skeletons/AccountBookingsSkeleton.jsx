import Skeleton from "../Skeleton";

export default function AccountBookingsSkeleton() {
  return (
    <div className="px-5 py-8">
      <Skeleton className="h-10 w-72 mx-auto mb-6" />
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-4 p-4 bg-white/60 rounded-2xl">
            <Skeleton className="h-40 w-40 rounded-xl" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <div className="flex gap-2 mt-2">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Skeleton key={j} className="h-6 w-20 rounded-full" />
                ))}
              </div>
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
