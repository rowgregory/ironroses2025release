import prisma from "@/prisma/client";

export async function getSiteContent() {
  const row = await prisma.siteContent.findUnique({
    where: { slug: "home" },
    select: { isLive: true, content: true },
  });
  return {
    content: (row?.content as Record<string, string>) ?? {},
    isLive: row?.isLive ?? false,
  };
}
