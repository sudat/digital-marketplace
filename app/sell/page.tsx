import { Card } from "@/components/ui/card";
import { SellForm } from "@/app/components/form/SellForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/app/lib/db";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) throw new Error("User not found");

  const data = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      stripeConnectedLinked: true,
    },
  });

  if (data?.stripeConnectedLinked === false) {
    return redirect("/billing");
  }
  return null;
}

export default async function SellRoute() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("User not found");
  }
  await getData();
  return (
    <section className="container mx-auto px-4 md:px-8 mb-14">
      <Card>
        <SellForm />
      </Card>
    </section>
  );
}
