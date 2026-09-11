import { createFileRoute } from '@tanstack/react-router';

import SportsVenueGuidePilotContent from '@/components/sports/SportsVenueGuidePilotContent';
import { buildSportsVenueGuideHead, loadSportsVenueGuideRoute } from '@/data/sports-venue-guide-route';

const slug = 'lone-star-park';

export const Route = createFileRoute('/sports-venue/lone-star-park')({
  loader: () => loadSportsVenueGuideRoute(slug),
  head: ({ loaderData }) => buildSportsVenueGuideHead(slug, loaderData?.entity),
  component: LoneStarParkPage,
});

function LoneStarParkPage() {
  const { entity, nearbyAttractions, upcomingEvents, eventCalendarHref } = Route.useLoaderData();
  return <SportsVenueGuidePilotContent
    slug={slug}
    entity={entity}
    nearbyAttractions={nearbyAttractions}
    upcomingEvents={upcomingEvents}
    eventCalendarHref={eventCalendarHref}
  />;
}
