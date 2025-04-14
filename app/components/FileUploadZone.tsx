"use client";
import { UploadDropzone } from "@/app/lib/uploadthing";

export function ImageUploadZone() {
  return <UploadDropzone endpoint="imageUploader" />;
}

export function ProductFileUploadZone() {
  return <UploadDropzone endpoint="productFileUploader" />;
}
