"use server";

import prisma from "@/prisma/client";

export async function createEvent(data: {
  date: string;
  city: string;
  venue: string;
  ticketUrl?: string;
}) {
  return await prisma.event.create({
    data: {
      date: new Date(data.date),
      city: data.city,
      venue: data.venue,
      ticketUrl: data.ticketUrl || null,
    },
  });
}
