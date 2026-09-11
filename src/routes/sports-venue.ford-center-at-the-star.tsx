import { createFileRoute } from '@tanstack/react-router';

import SportsVenueGuidePilotContent from '@/components/sports/SportsVenueGuidePilotContent';
import { buildSportsVenueGuideHead, loadSportsVenueGuideRoute } from '@/data/sports-venue-guide-route';

const slug = 'ford-center-at-the-star';

export const Route = createFileRoute('/sports-venue/ford-center-at-the-star')({
  loader: () => loadSportsVenueGuideRoute(slug),
  head: ({ loaderData }) => buildSportsVenueGuideHead(slug, loaderData?.entity),
  component: FordCenterAtTheStarPage,
});

function FordCenterAtTheStarPage() {
  const { entity, nearbyAttractions, upcomingEvents, eventCalendarHref } = Route.useLoaderData();
  return <SportsVenueGuidePilotContent
    slug={slug}
    entity={entity}
    nearbyAttractions={nearbyAttractions}
    upcomingEvents={upcomingEvents}
    eventCalendarHref={eventCalendarHref}
  />;
}
