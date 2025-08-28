import Skeleton from "../Skeleton";

export default function IndexPageSkeleton() {
  return (
    <div className="px-3 py-5">
      <div className="mb-8">
        <Skeleton className="h-6 w-64 mx-auto mb-4" />
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="h-32 w-full rounded-2xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-2/3" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
