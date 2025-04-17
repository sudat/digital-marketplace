import { prisma } from "@/app/lib/db";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
async function getData() {
  const data = await prisma.product.findMany({
    select: {
      price: true,
      smallDescription: true,
      category: true,
      name: true,
      id: true,
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });
  return data;
}

export async function NewestProducts() {
  const data = await getData();
  return (
    <section className="mt-12">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold traching-tighter">
          Newest Products
        </h2>
        <Link
          href="#"
          className="hidden md:block text-primary text-sm font-medium hover:text-primary/80 transition duration-300"
        >
          All Products<span>&rarr;</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10 gap-10">
        {data.map((product) => (
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
    </section>
  );
}
