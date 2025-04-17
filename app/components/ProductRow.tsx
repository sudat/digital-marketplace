import { prisma } from "@/app/lib/db";
import { LoadingProductCard, ProductCard } from "@/app/components/ProductCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type categoryProps = {
  category: "newest" | "template" | "uikit" | "icon";
};
async function getData({ category }: categoryProps) {
  switch (category) {
    case "template":
    case "uikit":
    case "icon": {
      const products = await prisma.product.findMany({
        where: {
          category: category,
        },
        select: {
          price: true,
          name: true,
          id: true,
          smallDescription: true,
          images: true,
        },
        take: 3,
        orderBy: {
          createdAt: "desc",
        },
      });

      let title;
      title = category === "template" ? "Templates" : title;
      title = category === "uikit" ? "UI kits" : title;
      title = category === "icon" ? "Icons" : title;
      return {
        products: products,
        title: title,
        link: "/products/" + category,
      };
    }
    case "newest": {
      const products = await prisma.product.findMany({
        select: {
          price: true,
          name: true,
          id: true,
          smallDescription: true,
          images: true,
        },
        take: 3,
        orderBy: {
          createdAt: "desc",
        },
      });
      return {
        products: products,
        title: "Newest Products",
        link: "/products/all",
      };
    }
    default: {
      return notFound();
    }
  }
}

export function ProductRow({ category }: categoryProps) {
  return (
    <section className="mt-12">
      <Suspense fallback={<LoadingState />}>
        <LoadingRow category={category} />
      </Suspense>
    </section>
  );
}

async function LoadingRow({ category }: categoryProps) {
  const data = await getData({ category: category });

  return (
    <>
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold traching-tighter">
          {data.title}
        </h2>
        <Link
          href={data.link}
          className="hidden md:block text-primary text-sm font-medium hover:text-primary/80 transition duration-300"
        >
          All Products<span>&rarr;</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10 gap-10">
        {data.products.map((product) => (
          <ProductCard
            key={product.id}
            images={product.images}
            title={product.name}
            price={product.price}
            smallDescription={product.smallDescription}
            id={product.id}
          />
        ))}
      </div>
    </>
  );
}

function LoadingState() {
  return (
    <div>
      <Skeleton className="h-8 w-56" />
      <div className="grid grid-cols-1 gap-10 mt-4 sm:grid-cols-2 lg:grid-cols-3">
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
      </div>
    </div>
  );
}
