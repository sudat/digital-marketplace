import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { ProductDescription } from "@/app/components/ProductDescription";
import { prisma } from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { type JSONContent } from "@tiptap/react";
async function getData(id: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: id,
    },
    select: {
      category: true,
      description: true,
      smallDescription: true,
      name: true,
      images: true,
      price: true,
      createdAt: true,
      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  });
  return data;
}

type ProductPageProps = {
  params: { id: string };
};
export default async function ProductPage({ params }: ProductPageProps) {
  const id = await params.id;
  const data = await getData(id);
  return (
    <section
      className="
    mx-auto px-4  lg:mt-10 max-w-7xl lg:px-8 lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16"
    >
      <Carousel className="lg:row-end-1 lg:col-span-4">
        <CarouselContent>
          {data?.images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
                <Image
                  src={item as string}
                  alt="product image"
                  fill
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>

      {/* Product Details */}
      <div className="max-w-2xl mx-auto mt-5 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3 w-full">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          {data?.name}
        </h1>
        <p className="mt-2 text-muted-foreground">{data?.smallDescription}</p>
        <Button size="lg" className="mt-10 w-full text-lg">
          Buy for ${data?.price}
        </Button>
        <Separator className="my-10 border-t border-gray-300" />
        <div className="grid grid-cols-2 w-full gap-y-3">
          <h3 className="text-muted-foreground text-sm font-medium col-span-1">
            Released:
          </h3>
          <h3 className="text-sm font-medium col-span-1">
            {data?.createdAt.toLocaleDateString()}
          </h3>
          <h3 className="text-muted-foreground text-sm font-medium col-span-1">
            Category:
          </h3>
          <h3 className="text-sm font-medium col-span-1">{data?.category}</h3>
        </div>
        <Separator className="my-10 border-t border-gray-300" />
      </div>

      {/* Product Description */}
      <div className="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4">
        <ProductDescription content={data?.description as JSONContent} />
      </div>
    </section>
  );
}
