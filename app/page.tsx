import { ProductRow } from "@/app/components/ProductRow";
import { Separator } from "@/components/ui/separator";
export default function Home() {
  return (
    <section className="container mx-auto px-4 py-8 mb-24">
      <div className="max-w-3xl mx-auto text-2xl sm:text-5xl lg:text-6xl font-semibold text-center">
        <h1>Find the best Tailwind</h1>
        <h1 className="text-primary">Templates & Icons</h1>
        <p className="lg:text-lg text-muted-foreground mx-auto mt-5 w-[90%] font-normal text-base">
          MarshalUi stands out as the premier marketplace for all things related
          to tailwindcss, offering an unparalleled platform for both sellers and
          buyers alike.
        </p>
      </div>

      <ProductRow category="newest" />
      <Separator className="my-10" />
      <ProductRow category="template" />
      <Separator className="my-10" />
      <ProductRow category="uikit" />
      <Separator className="my-10" />
      <ProductRow category="icon" />
    </section>
  );
}
