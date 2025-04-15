"use client";
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
import { SubmitButton } from "@/app/components/SubmitButton";
import { useState, useEffect } from "react";
import { JSONContent } from "@tiptap/react";
import { sellProduct, State } from "@/app/actions";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SellRoute() {
  const initialState: State = {
    status: undefined,
    message: "",
  };
  const [state, formAction] = useFormState(sellProduct, initialState);
  const [json, setJson] = useState<null | JSONContent>(null);
  const [images, setImages] = useState<null | string[]>(null);
  const [productFile, setProductFile] = useState<null | string>(null);
  const router = useRouter();

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      router.push("/");
    }
    if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <section className="container mx-auto px-4 md:mx-8 mb-14">
      <Card>
        <form action={formAction}>
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
              <Input
                type="text"
                placeholder="Name of your product"
                name="name"
                required
                minLength={3}
              />
              {state?.errors?.["name"]?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.["name"]?.[0]}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Category</Label>
              <SelectCategory />
              {state?.errors?.["category"]?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.["category"]?.[0]}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Price</Label>
              <Input
                type="number"
                placeholder="29$"
                name="price"
                required
                min={1}
              />
              {state?.errors?.["price"]?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.["price"]?.[0]}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Small Summary</Label>
              <Textarea
                placeholder="Please describe your product shortly right here..."
                name="smallDescription"
                required
                minLength={10}
              />
              {state?.errors?.["smallDescription"]?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.["smallDescription"]?.[0]}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              <input
                type="hidden"
                name="description"
                value={JSON.stringify(json)}
              />
              <Label>Description</Label>
              <TiptapEditor setJson={setJson} json={json} />
              {state?.errors?.["description"]?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.["description"]?.[0]}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              <input
                type="hidden"
                name="images"
                value={JSON.stringify(images)}
              />
              <Label>Images</Label>
              <ImageUploadZone setImages={setImages} />
              {state?.errors?.["images"]?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.["images"]?.[0]}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              <input
                type="hidden"
                name="productFile"
                value={productFile ?? ""}
              />
              <Label>Product Files</Label>
              <ProductFileUploadZone setProductFile={setProductFile} />
              {state?.errors?.["productFile"]?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.["productFile"]?.[0]}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="mt-5">
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}
