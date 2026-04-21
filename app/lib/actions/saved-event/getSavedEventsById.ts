import prisma from "@/prisma/client";
import { auth } from "../../auth";

export default async function getSavedEventsById() {
  const session = await auth();

  const savedEvents = await prisma.event.findMany({
    where: {
      savedBy: { some: { userId: session?.user.id } },
    },
    orderBy: { date: "asc" },
  });

  return { data: savedEvents };
}
