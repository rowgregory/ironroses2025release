import prisma from "@/prisma/client";

export async function getEvents() {
  const events = await prisma.event.findMany({
    orderBy: { date: "asc" },
  });
  return { data: events };
}
