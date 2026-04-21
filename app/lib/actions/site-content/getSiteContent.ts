import prisma from "@/prisma/client";

export async function getSiteContent() {
  const row = await prisma.siteContent.findUnique({ where: { slug: "home" } });
  return (row?.content as Record<string, string>) ?? {};
}
