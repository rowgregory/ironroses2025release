"use server";

import prisma from "@/prisma/client";
import { Role } from "@prisma/client";
import { auth } from "../../auth";
import { createLog } from "../../utils/createLog";

export async function deleteLog(id: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    if (session.user.role !== Role.SUPERUSER) {
      return { success: false, error: "Forbidden" };
    }

    await prisma.log.delete({ where: { id } });

    return { success: true, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    await createLog("error", `deleteLog — unexpected error: ${message}`, {
      location: ["deleteLog"],
      name: "DeleteLogError",
      timestamp: new Date().toISOString(),
      logId: id,
    });
    return { success: false, error: message };
  }
}
