import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  images: string[];
  title: string;
  price: number;
  smallDescription: string;
  id: string;
};
export function ProductCard({
  images,
  title,
  price,
  smallDescription,
  id,
}: ProductCardProps) {
  return (
    <div className="rounded-lg">
      <Carousel>
        <CarouselContent>
          {images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[230px]">
                <Image
                  src={item}
                  alt="product image"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>

      <div className="flex justify-between items-center mt-2 ">
        <h1 className="font-semibold text-xl">{title}</h1>
        <h3 className="inline-flex items-center bg-primary/10 px-2 py-1 rounded-md text-xs font-medium text-primary ring-1 ring-inset ring-primary/10">
          ${price}
        </h3>
      </div>
      <p className="my-2 text-sm text-gray-500 line-clamp-2 h-12">
        {smallDescription}
      </p>

      <Button asChild className="w-full">
        <Link href={`/product/${id}`}>learn more!</Link>
      </Button>
    </div>
  );
}

export function LoadingProductCard() {
  return (
    <div className="flex flex-col">
      <Skeleton className="w-full h-[230px]" />
      <div className="flex flex-col mt-2 gap-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
      <Skeleton className="h-10 w-full mt-5" />
    </div>
  );
}
