import { prisma } from "@/app/lib/db";
import { notFound } from "next/navigation";
import { type CategoryTypes } from "@/lib/generated/prisma";
import { ProductCard } from "@/app/components/ProductCard";
import { unstable_noStore as noStore } from "next/cache";

async function getData(category: string) {
  let input;

  switch (category) {
    case "template": {
      input = "template";
      break;
    }
    case "uikit": {
      input = "uikit";
      break;
    }
    case "icon": {
      input = "icon";
      break;
    }
    case "all": {
      input = undefined;
      break;
    }
    default: {
      return notFound();
    }
  }
  const data = await prisma.product.findMany({
    where: {
      category: input as CategoryTypes,
    },
    select: {
      id: true,
      images: true,
      smallDescription: true,
      name: true,
      price: true,
    },
  });
  return data;
}

type CategoryPageProps = {
  params: {
    category: string;
  };
};
export default async function CategoryPage({ params }: CategoryPageProps) {
  noStore();
  const data = await getData(params.category);
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-4">
        {data.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            images={product.images}
            title={product.name}
            price={product.price}
            smallDescription={product.smallDescription}
          />
        ))}
      </div>
    </section>
  );
}
