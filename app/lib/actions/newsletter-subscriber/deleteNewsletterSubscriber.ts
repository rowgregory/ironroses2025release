"use server";

import prisma from "@/prisma/client";
import { Role } from "@prisma/client";
import { auth } from "../../auth";
import { createLog } from "../../utils/createLog";

export async function deleteNewsletterSubscriber(id: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    if (
      session.user.role !== Role.ADMIN &&
      session.user.role !== Role.SUPERUSER
    ) {
      return { success: false, error: "Forbidden" };
    }

    await prisma.newsletterSubscriber.delete({ where: { id } });

    await createLog("info", `deleteNewsletterSubscriber — deleted: ${id}`, {
      location: ["deleteNewsletterSubscriber"],
      name: "SubscriberDeleted",
      timestamp: new Date().toISOString(),
      userId: session.user.id,
      subscriberId: id,
    });

    return { success: true, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    await createLog(
      "error",
      `deleteNewsletterSubscriber — failed: ${message}`,
      {
        location: ["deleteNewsletterSubscriber"],
        name: "DeleteSubscriberError",
        timestamp: new Date().toISOString(),
        subscriberId: id,
      },
    );
    return { success: false, error: message };
  }
}
