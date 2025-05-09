import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import { ProductCard } from "../components/ProductCard";
import { prisma } from "../lib/db";

async function getData(userId: string) {
  const data = await prisma.product.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
      createdAt: true,
    },
  });
  return data;
}

export default async function MyProductsRoute() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("User not found");
  }
  const data = await getData(user.id);
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <h1 className="text-2xl font-bold">My Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-4">
        {data.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            images={item.images}
            price={item.price}
            title={item.name}
            smallDescription={item.name}
          />
        ))}
      </div>
    </div>
  );
}
