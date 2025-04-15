"use client";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { toast } from "sonner";

export function ImageUploadZone({ setImages }: { setImages: any }) {
  return (
    <UploadDropzone
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        setImages(res.map((item) => item.ufsUrl));
        toast.success("Your images have been uploaded");
      }}
      onUploadError={(error: Error) => {
        toast.error("Something went wrong, please try again");
      }}
    />
  );
}

export function ProductFileUploadZone({
  setProductFile,
}: {
  setProductFile: any;
}) {
  return (
    <UploadDropzone
      endpoint="productFileUploader"
      onClientUploadComplete={(res) => {
        setProductFile(res[0].ufsUrl);
        toast.success("Your product file has been uploaded");
      }}
      onUploadError={(error: Error) => {
        toast.error("Something went wrong, please try again");
      }}
    />
  );
}
