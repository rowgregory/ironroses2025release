import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Find existing record or create new one
    let bandLikes = await prisma.bandLikes.findFirst();

    if (bandLikes) {
      // Update existing record
      bandLikes = await prisma.bandLikes.update({
        where: { id: bandLikes.id },
        data: {
          count: { increment: 1 },
        },
      });
    } else {
      // Create first record
      bandLikes = await prisma.bandLikes.create({
        data: {
          count: 1,
        },
      });
    }

    return NextResponse.json({
      success: true,
      count: bandLikes.count,
    });
  } catch (error) {
    console.error("Error incrementing likes:", error);
    return NextResponse.json(
      { success: false, message: "Failed to increment likes" },
      { status: 500 }
    );
  }
}
