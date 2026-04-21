// actions/createAdminUser.ts
"use server";

import prisma from "@/prisma/client";
import { Role } from "@prisma/client";
import { auth } from "../../auth";
import { createLog } from "../../utils/createLog";

export async function createAdminUser(email: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      await createLog("warn", "createAdminUser — unauthenticated request", {
        location: ["createAdminUser"],
        name: "Unauthorized",
        timestamp: new Date().toISOString(),
      });
      return { success: false, error: "Unauthorized", data: null };
    }

    if (
      session.user.role !== Role.SUPERUSER &&
      session.user.role !== Role.ADMIN
    ) {
      await createLog(
        "warn",
        `createAdminUser — insufficient role: ${session.user.role}`,
        {
          location: ["createAdminUser"],
          name: "Forbidden",
          timestamp: new Date().toISOString(),
          userId: session.user.id,
        },
      );
      return { success: false, error: "Forbidden", data: null };
    }

    if (!email || !email.includes("@")) {
      return { success: false, error: "Invalid email address", data: null };
    }

    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      // already exists — just promote to admin
      const updated = await prisma.user.update({
        where: { email },
        data: { role: Role.ADMIN },
        select: { id: true, email: true, role: true },
      });

      await createLog(
        "info",
        `createAdminUser — existing user promoted to ADMIN: ${email}`,
        {
          location: ["createAdminUser"],
          name: "UserPromoted",
          timestamp: new Date().toISOString(),
          userId: session.user.id,
          targetEmail: email,
          targetId: updated.id,
        },
      );

      return { success: true, data: updated, error: null };
    }

    // create new user with admin role
    const user = await prisma.user.create({
      data: {
        email,
        role: Role.ADMIN,
      },
      select: { id: true, email: true, role: true },
    });

    await createLog(
      "info",
      `createAdminUser — new ADMIN user created: ${email}`,
      {
        location: ["createAdminUser"],
        name: "AdminCreated",
        timestamp: new Date().toISOString(),
        userId: session.user.id,
        targetEmail: email,
        targetId: user.id,
      },
    );

    return { success: true, data: user, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    await createLog("error", `createAdminUser — unexpected error: ${message}`, {
      location: ["createAdminUser"],
      name: "CreateAdminError",
      timestamp: new Date().toISOString(),
      targetEmail: email,
    });
    return { success: false, error: message, data: null };
  }
}
