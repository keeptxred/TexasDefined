import { canonicalEntityPath } from '@/data/knowledge-graph/relationships';
import type { TexasEntityRecord } from '@/data/knowledge-graph/types';
import { sportsVenueLandingLinksForVenue, type SportsVenueLanding } from '@/data/sports-venue-landings';

const siteUrl = 'https://texasdefined.com';

export function CountySportsDestinations({ county, venues }: { county: TexasEntityRecord; venues: TexasEntityRecord[] }) {
  if (!venues.length) return null;

  const displayedVenues = venues.slice(0, 12);
  const collectionLinks = uniqueCollectionLinks(venues).slice(0, 6);
  const examples = displayedVenues.slice(0, 5).map((venue) => venue.name);
  const canonicalPath = canonicalEntityPath(county);
  const jsonLd = {
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
  };

  return <section className="border-b border-border py-12" aria-labelledby="county-sports-heading">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
  </section>;
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
