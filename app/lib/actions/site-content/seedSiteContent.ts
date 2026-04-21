"use server";

const SITE_CONTENT_DEFAULTS = {
  slug: "home",
  content: {
    announcement_text:
      'New LP "Molotov Nights" — Out Now — Stream It Everywhere',
    hero_label: "New LP Out Now",
    listen_album_title: "Molotov Nights",
    listen_album_subtitle:
      "The new LP — stream or buy on your platform of choice",
    listen_physical_text: "Physical copies via Big Cartel",
    tour_heading: "On The Road",
    about_heading_line_1: "Forged in",
    about_heading_line_2: "Noise & Grace",
    about_body_1:
      "The Iron Roses are a five-piece rock band from Boston, MA...",
    about_body_2:
      "Their third record, Velvet Static, arrives as a tightly coiled EP...",
    about_stat_years: "7",
    about_stat_shows: "400+",
    about_stat_albums: "3",
    about_stat_cities: "120+",
    mailing_heading: "Stay in the Loop",
    mailing_subtext: "New shows, new music, no spam. Just the Roses.",
  },
};

import prisma from "@/prisma/client";
import { auth } from "../../auth";
import { Role } from "@prisma/client";
import { createLog } from "../../utils/createLog";

export async function seedSiteContent() {
  try {
    const session = await auth();

    if (
      !session?.user?.id ||
      (session.user.role !== Role.SUPERUSER && session.user.role !== Role.ADMIN)
    ) {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.siteContent.upsert({
      where: { slug: "home" },
      update: {},
      create: SITE_CONTENT_DEFAULTS,
    });

    await createLog(
      "info",
      "seedSiteContent — site content seeded successfully",
      {
        location: ["seedSiteContent"],
        name: "SeedSuccess",
        timestamp: new Date().toISOString(),
        userId: session.user.id,
      },
    );

    return { success: true, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    await createLog("error", `seedSiteContent — failed: ${message}`, {
      location: ["seedSiteContent"],
      name: "SeedError",
      timestamp: new Date().toISOString(),
    });
    return { success: false, error: message };
  }
}
