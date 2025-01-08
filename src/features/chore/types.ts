import { Prisma } from "@prisma/client";

export type ChoreWithMetadata = Prisma.ChoreGetPayload<{
  include: {
    user: {
      select: { username: true };
    };
  };
}> & { isOwner: boolean };
