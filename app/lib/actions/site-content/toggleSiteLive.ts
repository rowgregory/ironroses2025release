"use server";

import prisma from "@/prisma/client";
import { Role } from "@prisma/client";
import { auth } from "../../auth";
import { createLog } from "../../utils/createLog";

export async function toggleSiteLive(isLive: boolean) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.role !== Role.SUPERUSER) {
      return { success: false, error: "Forbidden" };
    }

    await prisma.siteContent.update({
      where: { slug: "home" },
      data: { isLive },
    });

    await createLog(
      "info",
      `toggleSiteLive — site set to ${isLive ? "LIVE" : "SEIZED"}`,
      {
        location: ["toggleSiteLive"],
        name: "SiteLiveToggled",
        timestamp: new Date().toISOString(),
        userId: session.user.id,
        isLive,
      },
    );

    return { success: true, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: message };
  }
}
