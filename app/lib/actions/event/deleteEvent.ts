"use server";

import prisma from "@/prisma/client";

export async function deleteEvent(id: string) {
  return await prisma.event.delete({ where: { id } });
}
