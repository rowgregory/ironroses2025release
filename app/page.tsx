import HomeClient from "./components/pages/HomeClient";
import SeizedPage from "./components/pages/SeizedPageClient";
import { getEvents } from "./lib/actions/event/getEvents";
import getSavedEventIds from "./lib/actions/saved-event/getSavedEventIds";
import { getSiteContent } from "./lib/actions/site-content/getSiteContent";

export default async function HomePage() {
  const [events, { content: siteContent, isLive }, savedEventIds] =
    await Promise.all([getEvents(), getSiteContent(), getSavedEventIds()]);

  if (!isLive) return <SeizedPage />;

  return (
    <HomeClient
      events={events.data}
      siteContent={siteContent}
      savedEventIds={savedEventIds.data}
    />
  );
}
