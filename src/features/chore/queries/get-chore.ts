import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";

export async function getChore(id: string) {
  const { user } = await getAuth();

  const chore = await prisma.chore.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  if (!chore) {
    return null;
  }

  return { ...chore, isOwner: isOwner(user, chore) };
}
