"use server";

import prisma from "@/prisma/client";
import { auth } from "../../auth";
import { createLog } from "../../utils/createLog";

export async function unsaveEvent(eventId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    await prisma.savedEvent.delete({
      where: {
        userId_eventId: { userId: session.user.id, eventId },
      },
    });

    await createLog(
      "info",
      `unsaveEvent — user ${session.user.id} unsaved event ${eventId}`,
      {
        location: ["unsaveEvent"],
        name: "EventUnsaved",
        timestamp: new Date().toISOString(),
        userId: session.user.id,
        eventId,
      },
    );

    return { success: true, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: message };
  }
}
