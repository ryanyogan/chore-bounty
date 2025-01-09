import Link from "next/link";
import { cloneElement } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { NavItem } from "../types";
import { closedClassName } from "../constants";

type SidebarItemProps = {
  isOpen: boolean;
  isActive: boolean;
  navItem: NavItem;
};

export function SidebarItem(props: SidebarItemProps) {
  return (
    <>
      {props.navItem.separator && <Separator />}
      <Link
        href={props.navItem.href}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "group relative flex h-12 justify-start",
          props.isActive && "bg-muted font-bold hover:bg-muted",
        )}
      >
        {cloneElement(props.navItem.icon, {
          className: "h-5 w-5",
        })}
        <span
          className={cn(
            "absolute left-12 text-base duration-200",
            props.isOpen ? "md:block hidden" : "w-[78px]",
            !props.isOpen && closedClassName,
          )}
        >
          {props.navItem.title}
        </span>
      </Link>
    </>
  );
}
