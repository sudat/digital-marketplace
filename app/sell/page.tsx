import { Card } from "@/components/ui/card";
import { SellForm } from "@/app/components/form/SellForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function SellRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("User not found");
  }
  return (
    <section className="container mx-auto px-4 md:mx-8 mb-14">
      <Card>
        <SellForm />
      </Card>
    </section>
  );
}
