import { createFileRoute } from '@tanstack/react-router';

import SportsVenueGuidePilotContent from '@/components/sports/SportsVenueGuidePilotContent';
import { buildSportsVenueGuideHead, loadSportsVenueGuideRoute } from '@/data/sports-venue-guide-route';

const slug = 'riders-field';

export const Route = createFileRoute('/sports-venue/riders-field')({
  loader: () => loadSportsVenueGuideRoute(slug),
  head: ({ loaderData }) => buildSportsVenueGuideHead(slug, loaderData?.entity),
  component: RidersFieldPage,
});

function RidersFieldPage() {
  const { entity, nearbyAttractions, upcomingEvents, eventCalendarHref } = Route.useLoaderData();
  return <SportsVenueGuidePilotContent
    slug={slug}
    entity={entity}
    nearbyAttractions={nearbyAttractions}
    upcomingEvents={upcomingEvents}
    eventCalendarHref={eventCalendarHref}
  />;
}
