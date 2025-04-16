"use server";
import { z } from "zod";
import { prisma } from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { type CategoryTypes } from "@/lib/generated/prisma";

export type State = {
  status: "error" | "success" | undefined;
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
};

const productSchema = z.object({
  name: z.string().min(3, { message: "The name has to be a cha lengh of 5" }),
  category: z.string().min(1, { message: "The category is required" }),
  price: z
    .number()
    .min(1, { message: "Price has to be a number bigger than 1" }),
  smallDescription: z.string().min(10, {
    message: "Small description has to be at least 10 characters long",
  }),
  description: z.string().min(10, {
    message: "Description has to be at least 10 characters long",
  }),
  images: z.array(z.string(), { message: "Images are required" }),
  productFile: z.string().min(1, { message: "Please upload a product file" }),
});

const userSettingsSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .or(z.literal(""))
    .optional(),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .or(z.literal(""))
    .optional(),
});

export async function sellProduct(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Something went wrong...");
  }

  const validateFields = productSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    price: Number(formData.get("price")),
    smallDescription: formData.get("smallDescription"),
    description: formData.get("description"),
    images: JSON.parse(formData.get("images") as string),
    productFile: formData.get("productFile"),
  });

  if (!validateFields.success) {
    const state: State = {
      status: "error",
      errors: validateFields.error.flatten().fieldErrors,
      message: "Oops, I think there is a mistake with your inputs.",
    };
    return state;
  }

  await prisma.product.create({
    data: {
      name: validateFields.data.name,
      category: validateFields.data.category as CategoryTypes,
      price: validateFields.data.price,
      smallDescription: validateFields.data.smallDescription,
      description: JSON.parse(validateFields.data.description),
      images: validateFields.data.images,
      productFile: validateFields.data.productFile,
      userId: user.id,
    },
  });

  const state: State = {
    status: "success",
    message: "Your product has been created!",
  };
  return state;
}

export async function updateUserSettings(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Something went wrong...");
  }

  const validateFields = userSettingsSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  });

  if (!validateFields.success) {
    const state: State = {
      status: "error",
      errors: validateFields.error.flatten().fieldErrors,
      message: "Oops, I think there is a mistake with your inputs.",
    };
    return state;
  }

  const data = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      firstName: validateFields.data.firstName,
      lastName: validateFields.data.lastName,
    },
  });

  const state: State = {
    status: "success",
    message: "Your settings have been updated!",
  };
  return state;
}
