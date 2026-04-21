"use server";

import prisma from "@/prisma/client";
import { auth } from "../../auth";
import { createLog } from "../../utils/createLog";

export async function saveEvent(eventId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    await prisma.savedEvent.create({
      data: { userId: session.user.id, eventId },
    });

    await createLog(
      "info",
      `saveEvent — user ${session.user.id} saved event ${eventId}`,
      {
        location: ["saveEvent"],
        name: "EventSaved",
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
