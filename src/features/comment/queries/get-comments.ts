"use server";

import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";

export async function getComments(choreId: string, cursor?: string) {
  const auth = await getAuth();

  const where = {
    choreId,
    id: {
      lt: cursor,
    },
  };

  const take = 20;

  const [comments, count] = await prisma.$transaction([
    prisma.comment.findMany({
      where,
      take: take + 1,
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    }),
    prisma.comment.count({ where }),
  ]);

  const hasNextPage = comments.length > take;
  const commentsAtCursor = hasNextPage ? comments.slice(0, -1) : comments;

  return {
    list: commentsAtCursor.map((comment) => ({
      ...comment,
      isOwner: isOwner(auth.user, comment),
    })),
    metadata: {
      count,
      hasNextPage,
      cursor: commentsAtCursor.at(-1)?.id,
    },
  };
}
