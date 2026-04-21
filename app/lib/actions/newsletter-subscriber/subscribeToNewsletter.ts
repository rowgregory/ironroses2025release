"use server";

import prisma from "@/prisma/client";
import { createLog } from "../../utils/createLog";

export async function subscribeToNewsletter(email: string) {
  try {
    if (!email || !email.includes("@")) {
      return { success: false, error: "Invalid email address" };
    }

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      return { success: true, error: null, alreadySubscribed: true };
    }

    await prisma.newsletterSubscriber.create({
      data: { email },
    });

    await createLog(
      "info",
      `subscribeToNewsletter — new subscriber: ${email}`,
      {
        location: ["subscribeToNewsletter"],
        name: "NewsletterSubscribed",
        timestamp: new Date().toISOString(),
        email,
      },
    );

    return { success: true, error: null, alreadySubscribed: false };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    await createLog("error", `subscribeToNewsletter — failed: ${message}`, {
      location: ["subscribeToNewsletter"],
      name: "NewsletterError",
      timestamp: new Date().toISOString(),
      email,
    });
    return { success: false, error: "Failed to subscribe. Please try again." };
  }
}
