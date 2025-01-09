"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { choreEditPath, chorePath } from "@/paths";
import { toCurrencyFromCent } from "@/utils/currency";
import clsx from "clsx";
import {
  LucideArrowUpRightFromSquare,
  LucideMoreVertical,
  LucidePencil,
} from "lucide-react";
import Link from "next/link";
import { CHORE_ICONS } from "../constants";
import type { ChoreWithMetadata } from "../types";
import { ChoreMoreMenu } from "./chore-more-menu";

type ChoreItemProps = {
  chore: ChoreWithMetadata;
  isDetail?: boolean;
  comments?: React.ReactNode;
};

export function ChoreItem(props: ChoreItemProps) {
  const detailButton = (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={chorePath(props.chore.id)}>
        <LucideArrowUpRightFromSquare className="h-4 w-4" />
      </Link>
    </Button>
  );

  const editButton = props.chore.isOwner ? (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={choreEditPath(props.chore.id)}>
        <LucidePencil className="h-4 w-4" />
      </Link>
    </Button>
  ) : null;

  const moreMenu = props.chore.isOwner ? (
    <ChoreMoreMenu
      chore={props.chore}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical className="h-4 w-4" />
        </Button>
      }
    />
  ) : null;

  return (
    <div
      className={clsx("w-full flex flex-col gap-y-4", {
        "max-w-[580px]": props.isDetail,
        "max-w-[420px]": !props.isDetail,
      })}
    >
      <div className="flex gap-x-2">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex gap-x-2">
              <span
                className={
                  props.chore.status === "DONE"
                    ? "text-green-500"
                    : props.chore.status === "IN_PROGRESS"
                      ? "text-blue-500"
                      : ""
                }
              >
                {CHORE_ICONS[props.chore.status]}
              </span>
              <span className="truncate">{props.chore.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span
              className={clsx("whitespace-break-spaces", {
                "line-clamp-3": !props.isDetail,
              })}
            >
              {props.chore.content}
            </span>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              {props.chore.deadline} by {props.chore.user.username}
            </p>
            <p className="text-sm text-muted-foreground">
              {toCurrencyFromCent(props.chore.bounty)}
            </p>
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-y-1">
          {props.isDetail ? (
            <>
              {editButton}
              {moreMenu}
            </>
          ) : (
            <>
              {detailButton}
              {editButton}
            </>
          )}
        </div>
      </div>

      {props.comments}
    </div>
  );
}
