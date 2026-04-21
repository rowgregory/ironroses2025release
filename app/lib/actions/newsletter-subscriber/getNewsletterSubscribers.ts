import prisma from "@/prisma/client";

export async function getNewsletterSubscribers() {
  const newsletterSubscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "asc" },
  });
  return { data: newsletterSubscribers };
}
