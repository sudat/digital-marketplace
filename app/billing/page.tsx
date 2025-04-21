import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "../lib/db";
import { createStripeAccountLink, getStripeDashboardLink } from "../actions";
import { SubmitButton } from "@/app/components/SubmitButton";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripeConnectedLinked: true,
    },
  });
  return data;
}

export default async function BillingRoute() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) throw new Error("User not found");

  const data = await getData(user.id);

  return (
    <section className="container mx-auto px-4 md:px-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Billing</CardTitle>
          <CardDescription>
            Find all your details regarding your payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data?.stripeConnectedLinked === false && (
            <form action={createStripeAccountLink}>
              <SubmitButton title="Link your Account to stripe" />
            </form>
          )}
          {data?.stripeConnectedLinked === true && (
            <form action={getStripeDashboardLink}>
              <SubmitButton title="View Dashboard" />
            </form>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
