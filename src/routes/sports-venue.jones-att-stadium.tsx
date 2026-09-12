import { createFileRoute, notFound } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import SportsVenueGuidePilotContent from '@/components/sports/SportsVenueGuidePilotContent';
import { isIndexableEntityPage } from '@/data/knowledge-graph/relationships';
import type { TexasEntityKind, TexasEntityRecord } from '@/data/knowledge-graph/types';
import { getActiveSportsSponsorPlacement } from '@/data/sports-sponsorship.functions';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/sports-venue/jones-att-stadium';
const venueName = 'Galaxy Stadium';
const stableSlug = 'jones-att-stadium';

const visitorKindPriority: Partial<Record<TexasEntityKind, number>> = {
  attraction: 0,
  museum: 1,
  'historic-site': 2,
  'state-park': 3,
  cavern: 4,
  fairground: 5,
  university: 6,
  city: 7,
};

function countyVisitorPlaces(venue: TexasEntityRecord, graph: TexasEntityRecord[]) {
  if (!venue.countySlug) return [];
  return graph
    .filter((candidate) => candidate.id !== venue.id
      && candidate.countySlug === venue.countySlug
      && visitorKindPriority[candidate.kind] !== undefined
      && isIndexableEntityPage(candidate))
    .sort((left, right) => (visitorKindPriority[left.kind] ?? 99) - (visitorKindPriority[right.kind] ?? 99)
      || left.name.localeCompare(right.name))
    .slice(0, 6);
}

export const Route = createFileRoute('/sports-venue/jones-att-stadium')({
  loader: async () => {
    const [
      { findCompleteTexasEntity, loadTexasKnowledgeGraph },
      { getSportsVenueUpcomingEvents },
      sponsorPlacement,
    ] = await Promise.all([
      import('@/data/knowledge-graph'),
      import('@/data/sports-venue-events.functions'),
      getActiveSportsSponsorPlacement({ data: { surfacePath: canonicalPath } }),
    ]);
    const [graph, entity, guideEvents] = await Promise.all([
      loadTexasKnowledgeGraph(),
      findCompleteTexasEntity(stableSlug),
      getSportsVenueUpcomingEvents({ data: { slug: stableSlug } }),
    ]);
    if (!entity || entity.kind !== 'sports-venue') throw notFound();

    return {
      entity,
      nearbyAttractions: countyVisitorPlaces(entity, graph),
      upcomingEvents: guideEvents.events,
      eventCalendarHref: guideEvents.calendarHref,
      sponsorPlacement,
    };
  },
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Galaxy Stadium | Lubbock, TX',
      description: 'Galaxy Stadium in Lubbock: Texas Tech football, parking, arrival guidance, upcoming events, official planning links and the former Jones AT&T Stadium name.',
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: GalaxyStadiumPage,
});

function GalaxyStadiumPage() {
  const { entity, nearbyAttractions, upcomingEvents, eventCalendarHref, sponsorPlacement } = Route.useLoaderData();

  return (
    <SportsVenueGuidePilotContent
      slug={stableSlug}
      entity={entity}
      nearbyAttractions={nearbyAttractions}
      upcomingEvents={upcomingEvents}
      eventCalendarHref={eventCalendarHref}
      sponsorPlacement={sponsorPlacement}
    />
  );
}

export { venueName };
