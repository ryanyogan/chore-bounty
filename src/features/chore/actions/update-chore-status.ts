"use server";

import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-ord-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { choresPath } from "@/paths";
import type { ChoreStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateChoreStatus(id: string, status: ChoreStatus) {
  const auth = await getAuthOrRedirect();

  try {
    const chore = await prisma.chore.findUnique({
      where: { id },
    });

    if (!chore || !isOwner(auth.user, chore)) {
      return toActionState("ERROR", "Not authorized");
    }

    await prisma.chore.update({
      where: { id },
      data: { status },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(choresPath);

  return toActionState("SUCCESS", "Chore status updated");
}
