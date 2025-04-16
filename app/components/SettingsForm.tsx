"use client";

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/app/components/SubmitButton";
import { type State, updateUserSettings } from "@/app/actions";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";

type SettingsFormProps = {
  firstName: string;
  lastName: string;
  email: string;
};

export function SettingsForm({
  firstName,
  lastName,
  email,
}: SettingsFormProps) {
  const initialState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(updateUserSettings, initialState);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
    }
    if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <form action={formAction}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Settings</CardTitle>
        <CardDescription>
          Here you will find settings regarding your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-2">
            <Label>First Name</Label>
            <Input name="firstName" type="text" defaultValue={firstName} />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Last Name</Label>
            <Input name="lastName" type="text" defaultValue={lastName} />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              disabled
              className="bg-muted text-muted-foreground"
              defaultValue={email}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <SubmitButton title="Update Settings" />
      </CardFooter>
    </form>
  );
}
