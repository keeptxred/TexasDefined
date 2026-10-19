import { aquariumMarineLinksForCounty } from '@/data/aquarium-marine-county-links';
import { canonicalEntityPath } from '@/data/knowledge-graph/relationships';
import type { TexasEntityRecord } from '@/data/knowledge-graph/types';
import { sportsVenueLandingLinksForVenue, type SportsVenueLanding } from '@/data/sports-venue-landings';
import type { Destination } from '@/data/types';


const siteUrl = 'https://texasdefined.com';
// Small link-only county registry. Rich racing research loads only on racing routes.
const horseRacingCountyDestinations = [
  { countySlug: 'dallas', name: 'Lone Star Park', city: 'Grand Prairie', category: 'live', href: '/sports-venue/lone-star-park' },
  { countySlug: 'harris', name: 'Sam Houston Race Park', city: 'Houston', category: 'live', href: '/sports-venue/sam-houston-race-park' },
  { countySlug: 'bexar', name: 'Retama Park', city: 'Selma', category: 'live', href: '/sports-venue/retama-park' },
  { countySlug: 'gillespie', name: 'Gillespie County Fairgrounds Horse Racing', city: 'Fredericksburg', category: 'live', href: '/horse-racing/gillespie-county-fairgrounds' },
  { countySlug: 'travis', name: 'Manor Downs', city: 'Manor', category: 'inactive', href: '/horse-racing/manor-downs' },
  { countySlug: 'webb', name: 'Laredo Downs', city: 'Laredo', category: 'inactive', href: '/horse-racing/laredo-downs' },
  { countySlug: 'hidalgo', name: 'Valle de los Tesoros', city: 'McAllen', category: 'inactive', href: '/horse-racing/valle-de-los-tesoros' },
  { countySlug: 'travis', name: 'Texas Racing Commission', city: 'Austin', category: 'organization', href: '/horse-racing/texas-racing-commission' },
  { countySlug: 'hays', name: 'Texas Thoroughbred Association', city: 'Buda', category: 'organization', href: '/horse-racing/texas-thoroughbred-association' },
  { countySlug: 'bastrop', name: 'Texas Quarter Horse Association', city: 'Elgin', category: 'organization', href: '/horse-racing/texas-quarter-horse-association' },
  { countySlug: 'bastrop', name: "Texas Horsemen's Partnership", city: 'Elgin', category: 'organization', href: '/horse-racing/texas-horsemens-partnership' },
] as const;

type CountyMajorEvent = { slug: string; name: string; detail: string; startDate: string; endDate?: string };
type CountyRvParkLink = Pick<Destination, 'slug' | 'name' | 'nearestTown'>;
type CountyWithPreloadedDiscovery = TexasEntityRecord & { rvParks?: Destination[]; majorEvents?: CountyMajorEvent[] };

function renderCountyRvParks(county: TexasEntityRecord, rvParks: readonly CountyRvParkLink[]) {
  if (!rvParks.length) return null;

  const displayedRvParks = rvParks.slice(0, 12);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${siteUrl}/county/${county.slug}#rv-parks`,
    name: `RV parks and campgrounds in ${county.name}`,
    numberOfItems: rvParks.length,
    itemListElement: rvParks.map((park, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: { '@type': 'Campground', name: park.name, url: `${siteUrl}/destination/${park.slug}` },
    })),
  };

  return <section className="border-b border-border py-12" aria-labelledby="county-rv-parks-heading">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
      <div>
        <p className="eyebrow text-primary">RV parks & campgrounds</p>
        <h2 id="county-rv-parks-heading" className="mt-2 font-display text-4xl">RV camping around {county.name}</h2>
      </div>
      <div>
        <p className="max-w-3xl text-sm leading-7 text-muted-foreground">TexasDefined currently connects {rvParks.length} RV park or campground director{rvParks.length === 1 ? 'y entry' : 'y entries'} to this county. Verify hookups, rig limits, rates and reservations with the operator before travel.</p>
        <ul className="mt-6 grid gap-x-7 sm:grid-cols-2 xl:grid-cols-3">
          {displayedRvParks.map((park) => <li key={park.slug} className="border-t border-border py-4">
            <a href={`/destination/${park.slug}`} className="group">
              <strong className="block font-display text-xl group-hover:text-primary">{park.name}</strong>
              <span className="mt-1 block text-sm text-muted-foreground">{park.nearestTown}, Texas</span>
            </a>
          </li>)}
        </ul>
        {rvParks.length > displayedRvParks.length ? <p className="mt-4 text-sm text-muted-foreground">More entries are available in the statewide directory.</p> : null}
        <a href="/explore/rv-parks" className="mt-6 inline-block text-sm font-semibold underline decoration-primary/40 underline-offset-4 hover:text-primary">Browse all Texas RV parks & campgrounds →</a>
      </div>
    </div>
  </section>;
}

export function CountySportsDestinations({ county, venues }: { county: CountyWithPreloadedDiscovery; venues: TexasEntityRecord[] }) {
  const aquariumDestinations = aquariumMarineLinksForCounty(county.slug);
  const rvParks = county.rvParks ?? [];
  const majorEvents = county.majorEvents ?? [];
  const horseRacingInstitutions = horseRacingCountyDestinations.filter((item) => item.countySlug === county.slug);

  const displayedVenues = venues.slice(0, 12);
  const collectionLinks = uniqueCollectionLinks(venues).slice(0, 6);
  const examples = displayedVenues.slice(0, 5).map((venue) => venue.name);
  const canonicalPath = canonicalEntityPath(county);
  const jsonLd = venues.length ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${siteUrl}${canonicalPath}#sports-destinations`,
    name: `Sports destinations in ${county.name}`,
    numberOfItems: venues.length,
    itemListElement: venues.map((venue, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: venue.name,
      url: `${siteUrl}${canonicalEntityPath(venue)}`,
    })),
  } : null;
  const aquariumJsonLd = aquariumDestinations.length ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${siteUrl}${canonicalPath}#aquariums-marine-life`,
    name: `Aquariums and marine-life destinations in ${county.name}`,
    numberOfItems: aquariumDestinations.length,
    itemListElement: aquariumDestinations.map((destination, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: destination.name,
      url: `${siteUrl}/destination/${destination.slug}`,
    })),
  } : null;

  return <>
    {renderCountyRvParks(county, rvParks)}

    {aquariumDestinations.length ? <section className="border-b border-border py-12" aria-labelledby="county-aquariums-heading">
      {aquariumJsonLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aquariumJsonLd) }} /> : null}
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Aquariums & marine life</p>
          <h2 id="county-aquariums-heading" className="mt-2 font-display text-4xl">Marine-life destinations in {county.name}</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">TexasDefined aquarium guides assigned to this county, with current official visitor sources and trip-planning context.</p>
        </div>
        <div>
          <div className="border-y border-border py-5">
            <h3 className="font-display text-2xl">What aquariums and marine-life attractions are in {county.name}?</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">TexasDefined currently has {aquariumDestinations.length} aquarium or marine-life guide{aquariumDestinations.length === 1 ? '' : 's'} connected to {county.name}. Open a guide for what to expect, planning notes and the attraction’s current first-party visitor source.</p>
          </div>
          <div className="mt-7 grid gap-x-7 sm:grid-cols-2 xl:grid-cols-3">
            {aquariumDestinations.map((destination) => <a key={destination.slug} href={`/destination/${destination.slug}`} className="group border-t border-border py-5">
              <span className="eyebrow text-primary">Aquarium guide</span>
              <strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">{destination.name}</strong>
              <span className="mt-3 block text-sm font-semibold text-primary">Plan a visit →</span>
            </a>)}
          </div>
          <div className="mt-8 border-t border-border pt-6">
            <a href="/explore/aquariums" className="text-sm font-semibold underline decoration-primary/40 underline-offset-4 hover:text-primary">Explore all Texas aquariums & marine life →</a>
          </div>
        </div>
      </div>
    </section> : null}

    {majorEvents.length ? <section className="border-b border-border py-12" aria-labelledby="county-major-events-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Major annual events</p>
          <h2 id="county-major-events-heading" className="mt-2 font-display text-4xl">Events worth planning around in {county.name}</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Texas Defined links only to event guides backed by organizer or equivalent first-party evidence. Future recurrence-derived dates are labeled on the event guide.</p>
        </div>
        <div className="grid gap-x-7 sm:grid-cols-2 xl:grid-cols-3">
          {majorEvents.map((event) => <a key={event.slug} href={`/event/${event.slug}`} className="group border-t border-border py-5">
            <span className="eyebrow text-primary">Texas event guide</span>
            <strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">{event.name}</strong>
            <span className="mt-3 block text-sm leading-6 text-muted-foreground">{event.detail}</span>
            <span className="mt-3 block text-sm font-semibold text-primary">Plan the event →</span>
          </a>)}
        </div>
      </div>
    </section> : null}

    <section className="border-b border-border py-12" aria-labelledby="county-tournaments-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Texas tournaments</p>
          <h2 id="county-tournaments-heading" className="mt-2 font-display text-4xl">Tournaments & competitions near {county.name}</h2>
        </div>
        <div>
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground">Browse TexasDefined’s statewide tournament directory across golf, rodeo, team sports, fishing, BBQ, chess, esports, academic competitions and more. County relationships are published only when a location can be assigned confidently; current dates, venues and entry details require organizer verification.</p>
          <div className="mt-6 border-t border-border pt-6">
            <a href="/events/tournaments" className="text-sm font-semibold underline decoration-primary/40 underline-offset-4 hover:text-primary">Browse Texas tournaments & competitions →</a>
          </div>
        </div>
      </div>
    </section>

    {horseRacingInstitutions.length ? <section className="border-b border-border py-12" aria-labelledby="county-horse-racing-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Texas horse racing</p>
          <h2 id="county-horse-racing-heading" className="mt-2 font-display text-4xl">Horse racing in {county.name}</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Live horse-racing venues, inactive track histories and statewide regulatory or horsemen organizations based in this county. Offices are not visitor racetracks.</p>
        </div>
        <div>
          <div className="grid gap-x-7 sm:grid-cols-2">
            {horseRacingInstitutions.map((track) => <a href={track.href} key={track.href} className="group border-t border-border py-5">
              <span className="eyebrow text-primary">{track.category === 'live' ? 'Seasonal live horse racing' : track.category === 'organization' ? 'Regulatory or horse-racing organization' : 'Inactive historic racing license'}</span>
              <strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">{track.name}</strong>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">{track.city}, Texas · {track.category === 'live' ? 'Check race-day calendar' : track.category === 'organization' ? 'Industry or regulatory office, not a racetrack' : 'Not a current visitor racetrack'}</span>
              <span className="mt-3 block text-sm font-semibold text-primary">Open {track.category === 'live' ? 'racing guide' : track.category === 'organization' ? 'institution profile' : 'historical profile'} →</span>
            </a>)}
          </div>
          <a href="/horse-racing" className="mt-6 inline-block text-sm font-semibold underline decoration-primary/40 underline-offset-4 hover:text-primary">Compare every licensed Texas horse-racing institution →</a>
        </div>
      </div>
    </section> : null}

    {venues.length ? <section className="border-b border-border py-12" aria-labelledby="county-sports-heading">
      {jsonLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /> : null}
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Sports destinations</p>
          <h2 id="county-sports-heading" className="mt-2 font-display text-4xl">Major sports venues in {county.name}</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Verified TexasDefined sports venues assigned to this county. County-wide does not mean every venue is close to the county seat.</p>
        </div>

        <div>
          <div className="border-y border-border py-5">
            <h3 className="font-display text-2xl">What major sports venues are in {county.name}?</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">TexasDefined currently has {venues.length} verified sports venue guide{venues.length === 1 ? '' : 's'} in {county.name}, including {formatList(examples)}. Open a venue guide for visitor planning and official event-day sources.</p>
          </div>

          <div className="mt-7 grid gap-x-7 sm:grid-cols-2 xl:grid-cols-3">
            {displayedVenues.map((venue) => <a key={venue.id} href={canonicalEntityPath(venue)} className="group border-t border-border py-5">
              <span className="eyebrow text-primary">{venueLabel(venue)}</span>
              <strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">{venue.name}</strong>
              {venue.description ? <span className="mt-3 block line-clamp-3 text-sm leading-6 text-muted-foreground">{venue.description}</span> : null}
              <span className="mt-3 block text-sm font-semibold text-primary">Open venue guide →</span>
            </a>)}
          </div>

          {venues.length > displayedVenues.length ? <p className="mt-5 text-sm leading-6 text-muted-foreground">This county has additional verified sports venues in the statewide directory.</p> : null}

          <div className="mt-8 border-t border-border pt-6">
            <p className="eyebrow text-primary">Keep exploring sports</p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
              {collectionLinks.map((landing) => <a key={landing.slug} href={`/sports-venues/${landing.slug}`} className="underline decoration-primary/40 underline-offset-4 hover:text-primary">{landing.title}</a>)}
              <a href="/sports-venues" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">All Texas sports venues</a>
            </div>
          </div>
        </div>
      </div>
    </section> : null}
  </>;
}

function uniqueCollectionLinks(venues: TexasEntityRecord[]) {
  const found = new Map<string, SportsVenueLanding>();
  for (const venue of venues) {
    for (const landing of sportsVenueLandingLinksForVenue(venue)) {
      if (!found.has(landing.slug)) found.set(landing.slug, landing);
    }
  }
  return [...found.values()].sort((left, right) => Number(left.kind === 'theme') - Number(right.kind === 'theme') || left.title.localeCompare(right.title));
}

function venueLabel(venue: TexasEntityRecord) {
  const tags = new Set(venue.tags ?? []);
  if (tags.has('professional')) return 'Professional venue';
  if (tags.has('college')) return 'College venue';
  if (tags.has('motorsports')) return 'Motorsports';
  if (tags.has('high-school')) return 'High-school football';
  if (tags.has('golf')) return 'Golf destination';
  if (tags.has('rodeo') || tags.has('equestrian') || tags.has('western-sports')) return 'Western sports';
  if (tags.has('horse-racing')) return 'Horse racing';
  if (tags.has('minor-league')) return 'Minor league';
  return 'Sports venue';
}

function formatList(items: string[]) {
  if (!items.length) return 'the venues listed below';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items.at(-1)}`;
}
