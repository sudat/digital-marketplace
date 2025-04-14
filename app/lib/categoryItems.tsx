import { ReactNode } from "react";
import { ChefHat, Globe, PartyPopper } from "lucide-react";

export type CategoryItem = {
  id: number;
  name: string;
  title: string;
  image: ReactNode;
};

export const categoryItems: CategoryItem[] = [
  {
    id: 0,
    name: "template",
    title: "Template",
    image: <Globe />,
  },
  {
    id: 1,
    name: "uikit",
    title: "UI Kit",
    image: <ChefHat />,
  },
  {
    id: 2,
    name: "icon",
    title: "Icon",
    image: <PartyPopper />,
  },
];
