import prisma from "@/prisma/client";
import { auth } from "../../auth";
import { createLog } from "../../utils/createLog";

export default async function getCurrentUser() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      await createLog("error", "getCurrentUser — no session or user ID", {
        location: ["getCurrentUser"],
        name: "NoSession",
        timestamp: new Date().toISOString(),
      });
      return { data: null, error: "Unauthorized" };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      await createLog(
        "error",
        `getCurrentUser — user not found: ${session.user.id}`,
        {
          location: ["getCurrentUser"],
          name: "UserNotFound",
          timestamp: new Date().toISOString(),
          userId: session.user.id,
        },
      );
      return { data: null, error: "User not found" };
    }

    return { data: user, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    await createLog("error", `getCurrentUser — unexpected error: ${message}`, {
      location: ["getCurrentUser"],
      name: "UnexpectedError",
      timestamp: new Date().toISOString(),
    });
    return { data: null, error: message };
  }
}
