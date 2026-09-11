import { notFound } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { canonicalEntityPath, isIndexableEntityPage } from '@/data/knowledge-graph/relationships';
import type { TexasEntityKind, TexasEntityRecord } from '@/data/knowledge-graph/types';
import { getSportsVenueGuidePilot } from '@/data/sports-venue-guide-pilots';
import { buildMeta, canonicalLink } from '@/lib/seo';

const visitorKindPriority: Partial<Record<TexasEntityKind, number>> = {
  attraction: 0,
  museum: 1,
  'historic-site': 2,
  'state-park': 3,
  'national-park': 4,
  mission: 5,
  battlefield: 6,
  cavern: 7,
  beach: 8,
  'scenic-drive': 9,
  lake: 10,
  river: 11,
  fairground: 12,
  university: 13,
  city: 14,
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

export async function loadSportsVenueGuideRoute(slug: string) {
  const [{ findCompleteTexasEntity, loadTexasKnowledgeGraph }, { getSportsVenueUpcomingEvents }] = await Promise.all([
    import('@/data/knowledge-graph'),
    import('@/data/sports-venue-events.functions'),
  ]);
  const [graph, entity] = await Promise.all([
    loadTexasKnowledgeGraph(),
    findCompleteTexasEntity(slug),
  ]);
  const guide = getSportsVenueGuidePilot(slug);
  if (!entity || entity.kind !== 'sports-venue' || !guide) throw notFound();
  const guideEvents = await getSportsVenueUpcomingEvents({ data: { slug } });

  return {
    entity,
    nearbyAttractions: countyVisitorPlaces(entity, graph),
    upcomingEvents: guideEvents.events,
    eventCalendarHref: guideEvents.calendarHref,
  };
}

export function buildSportsVenueGuideHead(slug: string, entity?: TexasEntityRecord) {
  const guide = getSportsVenueGuidePilot(slug);
  if (!entity || !guide) return {};
  const canonicalPath = canonicalEntityPath(entity);
  const indexable = isIndexableEntityPage(entity);

  return {
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: `${entity.name} | ${guide.city}, TX`,
      description: `${entity.name} in ${guide.city}: ${guide.venueType}, upcoming events, parking and arrival guidance, official sources and nearby Texas attractions.`,
      robots: indexable ? undefined : 'noindex, follow, max-image-preview:large',
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  };
}
