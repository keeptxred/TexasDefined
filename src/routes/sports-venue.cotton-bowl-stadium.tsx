import { createFileRoute } from '@tanstack/react-router';

import SportsVenueGuidePilotContent from '@/components/sports/SportsVenueGuidePilotContent';
import { buildSportsVenueGuideHead, loadSportsVenueGuideRoute } from '@/data/sports-venue-guide-route';

const slug = 'cotton-bowl-stadium';

export const Route = createFileRoute('/sports-venue/cotton-bowl-stadium')({
  loader: () => loadSportsVenueGuideRoute(slug),
  head: ({ loaderData }) => buildSportsVenueGuideHead(slug, loaderData?.entity),
  component: CottonBowlStadiumPage,
});

function CottonBowlStadiumPage() {
  const { entity, nearbyAttractions, upcomingEvents, eventCalendarHref } = Route.useLoaderData();
  return <SportsVenueGuidePilotContent
    slug={slug}
    entity={entity}
    nearbyAttractions={nearbyAttractions}
    upcomingEvents={upcomingEvents}
    eventCalendarHref={eventCalendarHref}
  />;
}
