import prisma from "@/prisma/client";
import { auth } from "../../auth";

export async function getSavedEvents() {
  try {
    const session = await auth();
    if (!session?.user?.id)
      return { success: false, error: "Unauthorized", data: null };

    const saved = await prisma.savedEvent.findMany({
      where: { userId: session.user.id },
      include: {
        event: true,
      },
      orderBy: { event: { date: "asc" } },
    });

    return { success: true, data: saved.map((s) => s.event), error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: message, data: null };
  }
}
