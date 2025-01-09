"use server";

import {
  type ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-ord-redirect";
import { prisma } from "@/lib/prisma";
import { chorePath } from "@/paths";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createCommentSchema = z.object({
  content: z.string().min(1).max(1024),
});

export async function createComment(
  choreId: string,
  _actionState: ActionState,
  formData: FormData
) {
  const auth = await getAuthOrRedirect();

  try {
    const data = createCommentSchema.parse(Object.fromEntries(formData));

    const comment = await prisma.comment.create({
      data: {
        userId: auth.user.id,
        choreId,
        ...data,
      },
      include: {
        user: true,
      },
    });

    revalidatePath(chorePath(choreId));

    return toActionState("SUCCESS", "Comment created", undefined, {
      ...comment,
      isOwner: true,
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }
}
