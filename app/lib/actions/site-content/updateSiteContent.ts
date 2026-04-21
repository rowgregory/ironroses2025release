"use server";

import prisma from "@/prisma/client";

export async function updateSiteContent(content: Record<string, string>) {
  await prisma.siteContent.update({
    where: { slug: "home" },
    data: { content },
  });
  return { success: true };
}
