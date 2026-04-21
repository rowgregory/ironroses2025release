import { auth } from "../../auth";
import prisma from "@/prisma/client";
import { createLog } from "../../utils/createLog";

export async function getAccessCode() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized", data: null };
    }

    const record = await prisma.accessCode.findFirst();
    return { success: true, data: record, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    await createLog("error", `getAccessCode — failed: ${message}`, {
      location: ["getAccessCode"],
      name: "GetAccessCodeError",
      timestamp: new Date().toISOString(),
    });
    return { success: false, error: message, data: null };
  }
}
