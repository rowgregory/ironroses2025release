"use server";

import prisma from "@/prisma/client";
import { Role } from "@prisma/client";
import { auth } from "../../auth";
import { createLog } from "../../utils/createLog";

export async function updateEvent(
  id: string,
  data: {
    date?: string;
    city?: string;
    venue?: string;
    ticketUrl?: string;
    soldOut?: boolean;
  },
) {
  try {
    const session = await auth();

    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    if (
      session.user.role !== Role.ADMIN &&
      session.user.role !== Role.SUPERUSER
    ) {
      return { success: false, error: "Forbidden" };
    }

    const event = await prisma.event.update({
      where: { id },
      data: {
        ...data,
        ...(data.date && { date: new Date(data.date) }),
      },
    });

    await createLog("info", `updateEvent — event ${id} updated`, {
      location: ["updateEvent"],
      name: "EventUpdated",
      timestamp: new Date().toISOString(),
      userId: session.user.id,
      eventId: id,
    });

    return { success: true, data: event, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    await createLog("error", `updateEvent — failed: ${message}`, {
      location: ["updateEvent"],
      name: "UpdateEventError",
      timestamp: new Date().toISOString(),
      eventId: id,
    });
    return { success: false, error: message, data: null };
  }
}
