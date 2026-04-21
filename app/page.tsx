import HomeClient from "./components/pages/HomeClient";
import { getEvents } from "./lib/actions/event/getEvents";
import getSavedEventIds from "./lib/actions/saved-event/getSavedEventIds";
import { getSiteContent } from "./lib/actions/site-content/getSiteContent";

export default async function HomePage() {
  const [events, siteContent, savedEventIds] = await Promise.all([
    getEvents(),
    getSiteContent(),
    getSavedEventIds(),
  ]);
  return (
    <HomeClient
      events={events.data}
      siteContent={siteContent}
      savedEventIds={savedEventIds.data}
    />
  );
}
