"use server";

import prisma from "@/prisma/client";
import { createLog } from "../../utils/createLog";
import { auth } from "../../auth";

export const updateUserName = async ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      await createLog("warn", "updateUserName — unauthenticated request", {
        location: ["updateUserName"],
        name: "Unauthorized",
        timestamp: new Date().toISOString(),
      });
      return { success: false, error: "Unauthorized", data: null };
    }

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: { firstName, lastName },
      select: { id: true, firstName: true, lastName: true },
    });

    await createLog(
      "info",
      `updateUserName — name updated successfully for user ${session.user.id}`,
      {
        location: ["updateUserName"],
        name: "NameUpdated",
        timestamp: new Date().toISOString(),
        userId: session.user.id,
        firstName,
        lastName,
      },
    );

    return { success: true, data: user, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    await createLog(
      "error",
      `updateUserName — failed to update name for user ${(await auth())?.user?.id ?? "unknown"}`,
      {
        location: ["updateUserName"],
        name: "UpdateNameError",
        timestamp: new Date().toISOString(),
        firstName,
        lastName,
        error: message,
      },
    );

    return {
      success: false,
      error: "Failed to update name. Please try again.",
      data: null,
    };
  }
};
