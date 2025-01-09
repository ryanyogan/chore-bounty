import { accountProfilePath, choresPath, homePath } from "@/paths";
import { LucideBook, LucideCircleUser, LucideLibrary } from "lucide-react";
import type { NavItem } from "./types";

export const navItems: NavItem[] = [
  {
    title: "All Chores",
    icon: <LucideLibrary />,
    href: homePath,
  },
  {
    title: "My Chores",
    icon: <LucideBook />,
    href: choresPath,
  },
  {
    separator: true,
    title: "Account",
    icon: <LucideCircleUser />,
    href: accountProfilePath,
  },
];

export const closedClassName =
  "text-background opacity-0 transition-all duration-300 group-hover:z-40 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100";
