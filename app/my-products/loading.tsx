import { LoadingProductCard } from "@/app/components/ProductCard";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-4">
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
      </div>
    </div>
  );
}
