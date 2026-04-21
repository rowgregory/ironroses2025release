import DashboardClient from "@/app/components/pages/DashboardClient";
import { getAccessCode } from "@/app/lib/actions/access-code/getAccessCode";
import { getEvents } from "@/app/lib/actions/event/getEvents";
import { getNewsletterSubscribers } from "@/app/lib/actions/newsletter-subscriber/getNewsletterSubscribers";
import { getSiteContent } from "@/app/lib/actions/site-content/getSiteContent";
import getCurrentUser from "@/app/lib/actions/user/getCurrentUser";
import { getUserName } from "@/app/lib/actions/user/getUserName";
import { getUsers } from "@/app/lib/actions/user/getUsers";

export default async function DashboardPage() {
  const [
    currentUser,
    users,
    events,
    userName,
    siteContent,
    subscribers,
    accessCode,
  ] = await Promise.all([
    getCurrentUser(),
    getUsers(),
    getEvents(),
    getUserName(),
    getSiteContent(),
    getNewsletterSubscribers(),
    getAccessCode(),
  ]);
  return (
    <DashboardClient
      currentUser={currentUser.data}
      users={users.data}
      events={events.data}
      userName={userName.data}
      siteContent={siteContent}
      subscribers={subscribers.data}
      accessCode={accessCode.data}
    />
  );
}
