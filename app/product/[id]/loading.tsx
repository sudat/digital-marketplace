import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="max-w-7xl mx-auto mt-10 px-4 sm:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
        <div className="col-span-1">
          <Skeleton className="w-full h-[250px] lg:h-[400px] rounded-lg" />
          <Skeleton className="w-full h-[500px] rounded-lg mt-10" />
        </div>
        <div className="col-span-1">
          <Skeleton className="w-full h-[400px] rounded-lg" />
        </div>
      </div>
    </section>
  );
}
