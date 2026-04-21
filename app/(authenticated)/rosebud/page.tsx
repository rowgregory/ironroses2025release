import prisma from "@/prisma/client";
import getCurrentUser from "@/app/lib/actions/user/getCurrentUser";
import RosebudClient from "@/app/components/pages/RosebudClient";
import getSavedEventsById from "@/app/lib/actions/saved-event/getSavedEventsById";

export default async function RosebudPage() {
  const [user, accessCode, savedEvents] = await Promise.all([
    getCurrentUser(),
    prisma.accessCode.findFirst(),
    getSavedEventsById(),
  ]);

  const needsName = !user.data?.firstName || !user.data?.lastName;

  return (
    <RosebudClient
      currentUser={user.data}
      accessCode={accessCode?.code ?? null}
      needsName={needsName}
      savedEvents={savedEvents.data}
    />
  );
}
