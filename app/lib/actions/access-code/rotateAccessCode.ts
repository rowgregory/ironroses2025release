"use server";

import { Role } from "@prisma/client";
import { auth } from "../../auth";
import prisma from "@/prisma/client";
import { createLog } from "../../utils/createLog";

const SINGLETON_ID = "access-code-singleton";

function generateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const random = Array.from(
    { length: 8 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
  return `ROSEBUD-${random}`;
}

export async function rotateAccessCode() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized", data: null };
    }

    if (
      session.user.role !== Role.ADMIN &&
      session.user.role !== Role.SUPERUSER
    ) {
      return { success: false, error: "Forbidden", data: null };
    }

    const newCode = generateCode();

    const record = await prisma.accessCode.upsert({
      where: { id: SINGLETON_ID },
      update: { code: newCode, lastRotatedAt: new Date() },
      create: { id: SINGLETON_ID, code: newCode, lastRotatedAt: new Date() },
    });

    await createLog(
      "info",
      `rotateAccessCode — code rotated by ${session.user.id}`,
      {
        location: ["rotateAccessCode"],
        name: "AccessCodeRotated",
        timestamp: new Date().toISOString(),
        userId: session.user.id,
      },
    );

    return { success: true, data: record, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    await createLog("error", `rotateAccessCode — failed: ${message}`, {
      location: ["rotateAccessCode"],
      name: "RotateAccessCodeError",
      timestamp: new Date().toISOString(),
    });
    return { success: false, error: message, data: null };
  }
}
