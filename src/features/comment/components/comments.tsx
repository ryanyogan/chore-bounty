"use client";

import { CardCompact } from "@/components/card-compact";
import { PaginatedData } from "@/types/pagination";
import { useQueryClient } from "@tanstack/react-query";
import { CommentWithMetadata } from "../types";
import { CommentCreateForm } from "./comment-create-form";

type CommentsProps = {
  choreId: string;
  paginatedComments: PaginatedData<CommentWithMetadata>;
};

export function Comments(props: CommentsProps) {
  const queryKey = ["comments", props.choreId];
  const queryClient = useQueryClient();
  const invalidateCommentsCache = () =>
    queryClient.invalidateQueries({ queryKey });

  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        content={
          <CommentCreateForm
            choreId={props.choreId}
            onCreateComment={invalidateCommentsCache}
          />
        }
      />
    </>
  );
}
