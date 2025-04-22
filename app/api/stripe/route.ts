import { stripe } from "@/app/lib/stripe";
import { headers } from "next/headers";
import { Resend } from "resend";
import ProductEmail from "@/app/components/ProductEmail";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error: unknown) {
    return new Response(`Webhook Error: ${error}`, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const link = session.metadata?.link as string;
      const { data, error } = await resend.emails.send({
        from: "Marshal <onboarding@resend.dev>",
        to: ["tetuya1201@gmail.com"],
        subject: "Your Product is here ...",
        react: ProductEmail({ link }),
      });
      break;
    }
    default: {
      console.log("unhandled event");
    }
  }
  return new Response(null, { status: 200 });
}
