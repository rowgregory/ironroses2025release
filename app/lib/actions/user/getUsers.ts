import prisma from "@/prisma/client";

export async function getUsers() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
  });
  return { data: users };
}
