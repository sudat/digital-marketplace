import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SelectCategory } from "@/app/components/SelectCategory";
import { Textarea } from "@/components/ui/textarea";
import { TiptapEditor } from "@/app/components/Editor";
import {
  ImageUploadZone,
  ProductFileUploadZone,
} from "@/app/components/FileUploadZone";
import { Button } from "@/components/ui/button";

export default function SellRoute() {
  return (
    <section className="container mx-auto px-4 md:mx-8 mb-14">
      <Card>
        <form>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Sell your product with ease
            </CardTitle>
            <CardDescription>
              Please describe your product here in detail so that it can be sold
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-10">
            <div className="flex flex-col gap-y-2">
              <Label>Name</Label>
              <Input type="text" placeholder="Name of your product" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Category</Label>
              <SelectCategory />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Price</Label>
              <Input type="number" placeholder="29$" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Small Summary</Label>
              <Textarea placeholder="Please describe your product shortly right here..." />
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Description</Label>
              <TiptapEditor />
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Images</Label>
              <ImageUploadZone />
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Product Files</Label>
              <ProductFileUploadZone />
            </div>
          </CardContent>
          <CardFooter className="mt-5">
            <Button>Submit</Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}
