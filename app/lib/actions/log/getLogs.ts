import prisma from "@/prisma/client";

export async function getLogs() {
  const logs = await prisma.log.findMany({
    orderBy: { createdAt: "asc" },
  });
  return { data: logs };
}
