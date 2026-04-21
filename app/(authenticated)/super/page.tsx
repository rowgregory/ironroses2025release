import SuperClient from "@/app/components/pages/SuperClient";
import { getEvents } from "@/app/lib/actions/event/getEvents";
import { getLogs } from "@/app/lib/actions/log/getLogs";
import getCurrentUser from "@/app/lib/actions/user/getCurrentUser";
import { getUsers } from "@/app/lib/actions/user/getUsers";

export default async function SuperPage() {
  const [currentUser, users, events, logs] = await Promise.all([
    getCurrentUser(),
    getUsers(),
    getEvents(),
    getLogs(),
  ]);
  return (
    <SuperClient
      currentUser={currentUser.data}
      users={users.data}
      events={events.data}
      logs={logs.data}
    />
  );
}
