import prisma from "@/prisma/client";
import { auth } from "../../auth";

export default async function getSavedEventIds() {
  const session = await auth();

  const savedEventIds = session?.user?.id
    ? (
        await prisma.savedEvent.findMany({
          where: { userId: session.user.id },
          select: { eventId: true },
        })
      ).map((s) => s.eventId)
    : [];

  return { data: savedEventIds };
}
