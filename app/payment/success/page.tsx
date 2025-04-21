import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function SuccessRoute() {
  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <Check className="w-12 h-12 rounded-full bg-green-500/30 p-2 text-green-500" />
          </div>

          <div className="mt-3 sm:mt-5 w-full text-center">
            <h3 className="text-lg font-medium leading-6">
              Payment Successfull
            </h3>
            <p className="mt-2 text-sm text-muted-foreground text-balance">
              Congratulations! Your payment was successful.
              <br /> Please check your email for your order details.
            </p>

            <Button asChild className="mt-5 sm:mt-6 w-full">
              <Link href="/">Back to Homepage</Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
