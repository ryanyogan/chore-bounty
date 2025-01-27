"use client";

import clsx from "clsx";
import { LucideLoaderCircle } from "lucide-react";
import { cloneElement } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

type SubmitButtonProps = {
  label?: string;
  icon?: React.ReactElement;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  ref?: React.Ref<HTMLButtonElement>;
};

export function SubmitButton(props: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      variant={props.variant ?? "default"}
      size={props.size ?? "default"}
      ref={props.ref}
    >
      {pending && (
        <LucideLoaderCircle
          className={clsx("h-4 w-4 animate-spin", {
            "mr-2": !!props.label,
          })}
        />
      )}
      {props.label}
      {pending ? null : props.icon ? (
        <span
          className={clsx({
            "ml-2": !!props.label,
          })}
        >
          {cloneElement(props.icon, {
            // eslint-disable-next-line
            // @ts-ignore
            className: "w-4 h-4",
          })}
        </span>
      ) : null}
    </Button>
  );
}
