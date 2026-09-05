import { MAJOR_TEXAS_SPORTS_VENUES } from './knowledge-graph/major-sports-venues';
import { applyCurrentEntityCorrections } from './knowledge-graph/current-entity-corrections';
import { TEXAS_GOLF_COURSE_STARTER_RECORDS } from './knowledge-graph/golf-course-starter';
import { TEXAS_SPORTS_VENUE_TIER2_ENTITIES } from './knowledge-graph/sports-venues-tier2';
import { SPORTS_VENUE_LANDINGS } from './sports-venue-landings';
import type { SearchDocument } from './types';

const reliantDocument: SearchDocument = {
  id: 'sports-venue:reliant-stadium',
  brandId: 'texasdefined',
  kind: 'sports-venue',
  title: 'Reliant Stadium',
  summary: 'Reliant Stadium in Houston is a major Texas sports and event destination for Houston Texans football, RODEOHOUSTON, soccer, concerts and other large events.',
  keywords: ['Reliant Stadium', 'NRG Stadium', 'Houston Stadium', 'Houston Texans', 'RODEOHOUSTON', 'Houston football', 'Harris County', 'NFL', 'rodeo', 'sports venue'],
  href: '/sports-venue/reliant-stadium',
};

export function buildSportsVenueSearchDocuments(): SearchDocument[] {
  const venueMap = new Map(
    [...MAJOR_TEXAS_SPORTS_VENUES, ...TEXAS_SPORTS_VENUE_TIER2_ENTITIES]
      .map(applyCurrentEntityCorrections)
      .map((venue) => [venue.slug, venue] as const),
  );

  const venueDocuments: SearchDocument[] = [...venueMap.values()].map((venue) => ({
    id: venue.id,
    brandId: 'texasdefined',
    kind: 'sports-venue',
    title: venue.name,
    summary: venue.description ?? `${venue.name} Texas sports venue guide.`,
    keywords: [...new Set([
      venue.name,
      ...venue.aliases,
      venue.countySlug,
      venue.region,
      ...(venue.tags ?? []),
      venue.tags?.includes('golf') ? 'Texas golf course' : 'Texas sports venue',
      venue.tags?.includes('golf') ? 'Texas golf' : 'sports travel',
      venue.tags?.includes('golf') ? 'golf course directory' : 'game day',
    ].filter((value): value is string => Boolean(value)))],
    href: `/sports-venue/${venue.slug}`,
  }));

  if (!venueMap.has('reliant-stadium')) venueDocuments.push(reliantDocument);

  // Keep starter search discovery lightweight. The full starter knowledge-graph
  // entities carry descriptions, relationships and source metadata needed by
  // entity/county routes; duplicating those objects in the client search bundle
  // adds no search value. Existing canonical golf entities are already covered
  // by venueDocuments above, so only new starter rows are generated here.
  const starterGolfDocuments: SearchDocument[] = TEXAS_GOLF_COURSE_STARTER_RECORDS
    .filter((course) => !course.existingEntity)
    .map((course) => ({
      id: `sports-venue:${course.slug}`,
      brandId: 'texasdefined',
      kind: 'sports-venue',
      title: course.name,
      summary: `${course.name} in ${course.city} is included in TexasDefined's statewide Texas golf course directory for ${course.market}.`,
      keywords: [
        course.name,
        course.city,
        course.countySlug,
        course.region,
        course.market,
        'Texas golf course',
        'Texas golf',
        'golf course directory',
      ],
      href: course.href,
    }));

  const landingDocuments: SearchDocument[] = SPORTS_VENUE_LANDINGS.map((landing) => ({
    id: `sports-collection:${landing.slug}`,
    brandId: 'texasdefined',
    kind: 'sports-collection',
    title: landing.slug === 'golf' ? 'Texas Golf Courses: 250+ Courses by County & Region' : landing.title,
    summary: landing.slug === 'golf'
      ? 'Browse 250+ Texas golf course and destination-golf references across Houston, Dallas–Fort Worth, Austin, San Antonio and the Hill Country, organized by county.'
      : landing.description,
    keywords: [...new Set([
      landing.title,
      landing.seoTitle,
      landing.eyebrow,
      landing.slug.replaceAll('-', ' '),
      landing.kind === 'market' ? 'Texas sports market' : 'Texas sports venues by sport',
      ...(landing.slug === 'golf' ? ['Texas golf courses', 'Texas golf course directory', 'golf courses by county', 'Houston golf courses', 'Dallas golf courses', 'Austin golf courses', 'San Antonio golf courses'] : []),
      ...(landing.counties ?? []),
      ...(landing.tagsAny ?? []),
      ...(landing.tagsAll ?? []),
    ])],
    href: `/sports-venues/${landing.slug}`,
  }));

  const hubDocuments: SearchDocument[] = [
    {
      id: 'sports-collection:texas-sports-venues',
      brandId: 'texasdefined',
      kind: 'sports-collection',
      title: 'Texas Sports Venues',
      summary: 'Statewide TexasDefined directory of verified stadiums, arenas, ballparks, racetracks, college venues, golf destinations, Western-sports grounds and tournament complexes.',
      keywords: ['Texas sports venues', 'Texas stadiums', 'Texas arenas', 'Texas ballparks', 'Texas racetracks', 'Texas golf courses', 'sports travel', 'game day guides'],
      href: '/sports-venues',
    },
    {
      id: 'sports-collection:texas-sports-venue-comparison',
      brandId: 'texasdefined',
      kind: 'sports-collection',
      title: 'Compare Texas Sports Venues',
      summary: 'Compare 84 verified Texas sports venue guides by location, venue type, capacity and opening information where those fields are available.',
      keywords: ['compare Texas sports venues', 'Texas stadium comparison', 'Texas arena comparison', 'stadium capacity', 'sports venue capacity', 'Texas stadiums by location', 'Texas sports venue data'],
      href: '/sports-venues/compare',
    },
    {
      id: 'sports-collection:texas-sports',
      brandId: 'texasdefined',
      kind: 'sports-collection',
      title: 'Texas Sports',
      summary: 'TexasDefined sports guide to teams, traditions, venues, football, baseball, basketball, motorsports and sports travel across the state.',
      keywords: ['Texas sports', 'Texas football', 'Texas baseball', 'Texas basketball', 'Texas motorsports', 'Texas golf', 'Texas sports travel'],
      href: '/sports',
    },
  ];

  return [...hubDocuments, ...landingDocuments, ...venueDocuments, ...starterGolfDocuments];
}
