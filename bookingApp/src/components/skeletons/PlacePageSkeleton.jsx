import Skeleton from "../Skeleton";

export default function PlacePageSkeleton() {
  return (
    <div className="bg-gray-100 py-6 px-4 lg:px-16">
      <Skeleton className="h-10 w-3/4 mb-6" />
      <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
      <Skeleton className="h-72 w-full rounded-xl mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md space-y-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-11/12" />
          <Skeleton className="h-3 w-10/12" />
          <Skeleton className="h-3 w-9/12" />
          <div className="space-y-2 mt-4">
            <Skeleton className="h-5 w-32" />
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-3 w-2/3" />
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}
