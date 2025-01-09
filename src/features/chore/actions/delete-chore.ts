"use server";

import { setCookieByKey } from "@/actions/cookies";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-ord-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { choresPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteChore(id: string) {
  const auth = await getAuthOrRedirect();

  try {
    const chore = await prisma.chore.findUnique({
      where: { id },
    });

    if (!chore || !isOwner(auth.user, chore)) {
      return toActionState("ERROR", "Not authorized");
    }

    await prisma.chore.delete({
      where: { id },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(choresPath);
  await setCookieByKey("toast", "Chore deleted");
  redirect(choresPath);
}
