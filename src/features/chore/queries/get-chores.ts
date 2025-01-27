import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "../search-params";

export async function getChores(
  userId: string | undefined,
  searchParams: ParsedSearchParams
) {
  const { user } = await getAuth();

  const where = {
    userId,
    title: {
      contains: searchParams.search,
      mode: "insensitive" as const,
    },
  };

  const skip = searchParams.size * searchParams.page;
  const take = searchParams.size;

  const [chores, count] = await prisma.$transaction([
    prisma.chore.findMany({
      where,
      skip,
      take,
      orderBy: {
        [searchParams.sortKey]: searchParams.sortValue,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    }),
    prisma.chore.count({
      where,
    }),
  ]);

  return {
    list: chores.map((chore) => ({
      ...chore,
      isOwner: isOwner(user, chore),
    })),
    metadata: {
      count,
      hasNextPage: count > skip + take,
    },
  };
}
