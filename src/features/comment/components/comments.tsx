"use client";

import { CardCompact } from "@/components/card-compact";
import { PaginatedData } from "@/types/pagination";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { CommentWithMetadata } from "../types";
import { CommentCreateForm } from "./comment-create-form";
import { getComments } from "../queries/get-comments";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { CommentItem } from "./comment-item";
import { Skeleton } from "@/components/ui/skeleton";
import { CommentDeleteButton } from "./comment-delete-button";

type CommentsProps = {
  choreId: string;
  paginatedComments: PaginatedData<CommentWithMetadata>;
};

export function Comments(props: CommentsProps) {
  const queryKey = ["comments", props.choreId];

  const commentsQuery = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => getComments(props.choreId, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
    initialData: {
      pages: [
        {
          list: props.paginatedComments.list,
          metadata: props.paginatedComments.metadata,
        },
      ],
      pageParams: [undefined],
    },
  });

  const comments = commentsQuery.data.pages.flatMap((page) => page.list);

  const queryClient = useQueryClient();
  const invalidateCommentsCache = () =>
    queryClient.invalidateQueries({ queryKey });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (
      inView &&
      commentsQuery.hasNextPage &&
      !commentsQuery.isFetchingNextPage
    ) {
      commentsQuery.fetchNextPage();
    }
  }, [commentsQuery, inView]);

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

      <div className="flex flex-col gap-y-2 ml-8">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              ...(comment.isOwner
                ? [
                    <CommentDeleteButton
                      key={0}
                      id={comment.id}
                      onDeleteComment={invalidateCommentsCache}
                    />,
                  ]
                : []),
            ]}
          />
        ))}

        {commentsQuery.isFetchingNextPage && (
          <>
            <div className="flex gap-x-2">
              <Skeleton className="h-[82px] w-full" />
              <Skeleton className="h-[40px] w-[40px]" />
            </div>
            <div className="flex gap-x-2">
              <Skeleton className="h-[82px] w-full" />
              <Skeleton className="h-[40px] w-[40px]" />
            </div>
          </>
        )}
      </div>

      <div ref={ref}>
        {!commentsQuery.hasNextPage && (
          <p className="text-right text-xs italic">No more comments.</p>
        )}
      </div>
    </>
  );
}
