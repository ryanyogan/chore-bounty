import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";

export async function getChores(userId: string | undefined) {
  const { user } = await getAuth();

  const where = {
    userId,
  };

  const [chores, count] = await prisma.$transaction([
    prisma.chore.findMany({
      where,
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
    },
  };
}
