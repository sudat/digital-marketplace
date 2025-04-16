import { Card } from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/app/lib/db";
import { SettingsForm } from "@/app/components/SettingsForm";
async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
    },
  });
  return data;
}

export default async function SettingsRoute() {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("Not authenticated");
  }
  const data = await getData(user.id);

  return (
    <section className="container mx-auto px-4 md:px-8">
      <Card>
        <SettingsForm
          firstName={data?.firstName as string}
          lastName={data?.lastName as string}
          email={data?.email as string}
        />
      </Card>
    </section>
  );
}
