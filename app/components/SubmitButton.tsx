"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please wait...
        </Button>
      ) : (
        <Button type="submit">Create Product</Button>
      )}
    </>
  );
}
