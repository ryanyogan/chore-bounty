import type { User } from "@prisma/client";

type Entity = {
  userId: string | null;
};

export function isOwner(
  authUser: User | null | undefined,
  entity: Entity | null | undefined
) {
  if (!authUser || !entity) {
    return false;
  }

  if (!entity.userId) {
    return false;
  }

  if (entity.userId !== authUser.id) {
    return false;
  }

  return true;
}
