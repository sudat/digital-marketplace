import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
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
    <div className="rounded-lg flex flex-col">
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
      <p className="mt-2 text-sm text-gray-500 line-clamp-2 mb-3">
        {smallDescription}
      </p>

      <Button asChild className="w-full mt-auto">
        <Link href={`/product/${id}`}>learn more!</Link>
      </Button>
    </div>
  );
}
