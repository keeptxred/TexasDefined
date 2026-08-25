import { createFileRoute, notFound } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { SponsoredSportsPlacement } from '@/components/sports/SponsoredSportsPlacement';
import { SportsVenueQuickAnswers } from '@/components/sports/SportsVenueQuickAnswers';
import { findCompleteTexasEntity, loadTexasKnowledgeGraph } from '@/data/knowledge-graph';
import {
  canonicalEntityPath,
  isIndexableEntityPage,
  rankRelatedEntities,
} from '@/data/knowledge-graph/relationships';
import type { TexasEntityKind, TexasEntityRecord } from '@/data/knowledge-graph/types';
import { sportsVenueLandingLinksForVenue } from '@/data/sports-venue-landings';
import { getActiveSportsSponsorPlacement } from '@/data/sports-sponsorship.functions';
import { getSportsVenueEnrichmentAll, sportsVenueMapUrl } from '@/data/sports-venue-enrichment-all';
import { buildMeta, canonicalLink } from '@/lib/seo';

const siteUrl = 'https://texasdefined.com';

type SportsVenueEnrichment = ReturnType<typeof getSportsVenueEnrichmentAll>;

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

export const Route = createFileRoute('/sports-venue/$slug')({
  loader: async ({ params }) => {
    const graph = await loadTexasKnowledgeGraph();
    const entity = await findCompleteTexasEntity(params.slug);
    if (!entity || entity.kind !== 'sports-venue') throw notFound();
    const canonicalPath = canonicalEntityPath(entity);
    return {
      entity,
      related: rankRelatedEntities(entity, graph, 16),
      visitorPlaces: countyVisitorPlaces(entity, graph),
      sponsorPlacement: await getActiveSportsSponsorPlacement({ data: { surfacePath: canonicalPath } }),
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { entity } = loaderData;
    const canonicalPath = canonicalEntityPath(entity);
    const indexable = isIndexableEntityPage(entity);
    const enrichment = getSportsVenueEnrichmentAll(entity.slug);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: sportsVenueSearchTitle(entity.name, enrichment?.city),
        description: sportsVenueSearchDescription(entity.name, enrichment),
        robots: indexable ? undefined : 'noindex, follow, max-image-preview:large',
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    };
  },
  component: SportsVenuePage,
});

function SportsVenuePage() {
  const { entity, related, visitorPlaces, sponsorPlacement } = Route.useLoaderData();
  const tags = new Set(entity.tags ?? []);
  const profile = venueProfile(tags);
  const enrichment = getSportsVenueEnrichmentAll(entity.slug);
  const canonicalPath = canonicalEntityPath(entity);
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const venueHeroUrl = `${siteUrl}/api/sports-venue-hero?slug=${encodeURIComponent(entity.slug)}`;
  const relatedVenues = related.filter(({ entity: candidate }) => candidate.kind === 'sports-venue').slice(0, 6);
  const landingLinks = sportsVenueLandingLinksForVenue(entity);
  const countyName = entity.countySlug ? `${title(entity.countySlug)} County` : undefined;
  const regionName = entity.region ? title(entity.region) : undefined;
  const mapUrl = entity.coordinates
    ? `https://www.google.com/maps/search/?api=1&query=${entity.coordinates.latitude},${entity.coordinates.longitude}`
    : sportsVenueMapUrl(entity.name, entity.countySlug);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SportsActivityLocation',
        '@id': `${canonicalUrl}#venue`,
        name: entity.name,
        alternateName: entity.aliases.length ? entity.aliases : undefined,
        description: entity.description,
        url: canonicalUrl,
        mainEntityOfPage: canonicalUrl,
        image: venueHeroUrl,
        sameAs: entity.officialUrl ? [entity.officialUrl] : undefined,
        geo: entity.coordinates ? {
          '@type': 'GeoCoordinates',
          latitude: entity.coordinates.latitude,
          longitude: entity.coordinates.longitude,
        } : undefined,
        address: enrichment?.city ? {
          '@type': 'PostalAddress',
          addressLocality: enrichment.city,
          addressRegion: 'TX',
          addressCountry: 'US',
        } : undefined,
        containedInPlace: countyName ? { '@type': 'AdministrativeArea', name: countyName } : regionName ? { '@type': 'Place', name: regionName } : undefined,
        additionalType: profile.schemaType,
        keywords: entity.tags?.join(', '),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Texas Sports', item: `${siteUrl}/sports` },
          { '@type': 'ListItem', position: 3, name: 'Sports Venues', item: `${siteUrl}/sports-venues` },
          { '@type': 'ListItem', position: 4, name: entity.name, item: canonicalUrl },
        ],
      },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <article className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <a href="/" className="hover:text-foreground">Front page</a>
          <span aria-hidden="true" className="mx-2">/</span>
          <a href="/sports" className="hover:text-foreground">Texas Sports</a>
          <span aria-hidden="true" className="mx-2">/</span>
          <a href="/sports-venues" className="hover:text-foreground">Sports Venues</a>
          <span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page" className="text-foreground">{entity.name}</span>
        </nav>

        <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <p className="eyebrow text-primary">{profile.eyebrow}</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{entity.name}</h1>
            {entity.description && <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{entity.description}</p>}
          </div>
          <dl className="border-y border-border py-4 text-sm lg:border-y-0 lg:border-l lg:py-0 lg:pl-6">
            <Fact label="Venue type" value={profile.label} />
            <Fact label="City" value={enrichment?.city} />
            <Fact label="County" value={countyName} />
            <Fact label="Capacity" value={enrichment?.capacity} />
            <Fact label="Opened" value={enrichment?.opened} />
            <Fact label="Texas region" value={regionName} />
            <Fact label="Source" value={entity.sourceConfidence === 'official' ? 'Official venue source checked' : 'Verified reference source'} />
            {entity.sourceCheckedAt && <Fact label="Reviewed" value={formatCheckedDate(enrichment?.verifiedAt ?? entity.sourceCheckedAt)} />}
          </dl>
        </header>

        <div className="flex flex-wrap gap-x-7 gap-y-3 border-b border-border py-5 text-sm font-semibold">
          {entity.officialUrl && <a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href={entity.officialUrl} target="_blank" rel="noreferrer">Official venue information ↗</a>}
          <a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href={mapUrl} target="_blank" rel="noreferrer">Open in maps ↗</a>
          {entity.countySlug && <a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href={`/county/${entity.countySlug}`}>Explore {countyName} →</a>}
          <a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href="/sports-venues">All Texas sports venues →</a>
        </div>

        {sponsorPlacement ? <div className="border-b border-border py-8"><SponsoredSportsPlacement placement={sponsorPlacement} /></div> : null}

        <SportsVenueQuickAnswers
          venueName={entity.name}
          canonicalUrl={canonicalUrl}
          city={enrichment?.city}
          countyName={countyName}
          capacity={enrichment?.capacity}
          primaryEvents={enrichment?.primaryEvents}
          parking={enrichment?.parking}
          arrival={enrichment?.arrival}
          verifiedAt={enrichment?.verifiedAt ?? entity.sourceCheckedAt}
        />

        {enrichment ? <section className="border-b border-border py-12" aria-labelledby="venue-event-day-heading">
          <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
            <div>
              <p className="eyebrow text-primary">Event-day essentials</p>
              <h2 id="venue-event-day-heading" className="mt-2 font-display text-3xl leading-tight">{entity.name} parking, arrival and event planning</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Venue-specific details reviewed against official sources on {formatCheckedDate(enrichment.verifiedAt)}.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <GuideCard title={`Parking at ${entity.name}`} body={enrichment.parking} />
              <GuideCard title="When to arrive" body={enrichment.arrival} />
              <GuideCard title="Main sports and events" body={`The verified venue profile currently highlights ${formatList(enrichment.primaryEvents.slice(0, 3))}. Check the official calendar for the exact event date, start time and ticket requirements.`} />
              {enrichment.capacity ? <GuideCard title="Capacity and configuration" body={`${entity.name}'s verified profile lists ${enrichment.capacity}. Seating or event configurations can change for concerts, tournaments and special events, so use the official event page for the final layout.`} /> : null}
            </div>
          </div>
        </section> : null}

        <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[15rem_1fr]">
          <div>
            <p className="eyebrow text-primary">Plan the trip</p>
            <h2 className="mt-2 font-display text-3xl leading-tight">Make the venue part of the weekend</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <GuideCard title="Why people travel" body={profile.whyTravel} />
            <GuideCard title="Best trip pattern" body={profile.tripPattern} />
            <GuideCard title="Before you go" body={profile.beforeYouGo} />
          </div>
        </section>

        {enrichment ? <section className="border-b border-border py-12">
          <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
            <div>
              <p className="eyebrow text-primary">Venue context</p>
              <h2 className="mt-2 font-display text-3xl leading-tight">Build the rest of the {entity.name} trip</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Use the venue as the fixed point, then fit lodging, food and nearby visitor stops around the actual event schedule.</p>
            </div>
            <div>
              <div className="grid gap-8 md:grid-cols-2">
                {enrichment.history && <GuideCard title="Venue story" body={enrichment.history} />}
                <GuideCard title="Stay and eat" body={enrichment.stayAndEat} />
                <GuideCard title="Build the weekend" body={enrichment.nearby} />
              </div>

              <div className="mt-10 border-t border-border pt-4">
                <h3 className="font-display text-2xl">Official planning links</h3>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">Use these official sources for schedules, tickets, parking maps, gate times and policies that can change after this guide was reviewed.</p>
                <ul className="mt-4 grid gap-x-8 sm:grid-cols-2 text-sm font-semibold">
                  {enrichment.planningLinks.map((link) => <li key={link.url} className="border-t border-border py-4"><a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href={link.url} target="_blank" rel="noreferrer">{link.label} ↗</a></li>)}
                </ul>
              </div>
            </div>
          </div>
        </section> : null}

        {entity.tags?.length ? <section className="grid gap-6 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div>
            <p className="eyebrow text-primary">At a glance</p>
            <h2 className="mt-2 font-display text-3xl">What defines this venue</h2>
          </div>
          <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {entity.tags.filter((tag) => !['sports-venue', 'major-tourist-draw', 'regional-tourist-draw'].includes(tag)).map((tag) => <li key={tag} className="border-t border-border py-3 text-sm font-medium">{title(tag)}</li>)}
          </ul>
        </section> : null}

        {landingLinks.length ? <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]" aria-labelledby="venue-collections-heading">
          <div>
            <p className="eyebrow text-primary">Explore the collection</p>
            <h2 id="venue-collections-heading" className="mt-2 font-display text-3xl leading-tight">More venues like {entity.name}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Move from this venue into its matching Texas sports market and sport-specific directories.</p>
          </div>
          <div className="grid gap-x-7 sm:grid-cols-2 lg:grid-cols-3">
            {landingLinks.map((landing) => <a key={landing.slug} href={`/sports-venues/${landing.slug}`} className="group border-t border-border py-5">
              <span className="eyebrow text-primary">{landing.kind === 'market' ? 'Sports market' : 'Sports collection'}</span>
              <strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">{landing.title}</strong>
              <span className="mt-3 block text-sm font-semibold text-primary">Browse collection →</span>
            </a>)}
          </div>
        </section> : null}

        {visitorPlaces.length ? <RelatedGrid
          eyebrow={countyName ? `More to do in ${countyName}` : 'Build the weekend'}
          title="Visitor places to pair with the event"
          description="These are editorial TexasDefined visitor resources in the same county as the venue. Same-county does not necessarily mean walkable or immediately adjacent, and this list is not a sponsored placement."
          items={visitorPlaces}
        /> : null}

        <aside className="grid gap-7 border-b border-border py-10 lg:grid-cols-[1fr_auto] lg:items-center" aria-labelledby="venue-partnership-heading">
          <div>
            <p className="eyebrow text-primary">Local business partnerships</p>
            <h2 id="venue-partnership-heading" className="mt-2 font-display text-3xl">Serve visitors coming to {entity.name}?</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Hotels, restaurants, attractions, transportation providers and other local visitor businesses can ask Texas Defined about clearly disclosed sponsorship opportunities around useful sports-travel resources. Paid relationships do not change editorial rankings, factual conclusions or which venues we cover.</p>
          </div>
          <a href={`/partner-with-us?type=sports-travel&source=${encodeURIComponent(canonicalPath)}#partnership-form-heading`} className="inline-flex min-h-11 items-center justify-center border border-primary px-5 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground">Ask about local partnership options →</a>
        </aside>

        {relatedVenues.length ? <RelatedGrid eyebrow="Keep exploring" title="Related Texas sports venues" items={relatedVenues.map(({ entity: item }) => item)} /> : null}
      </article>
    </Container>
  </>;
}

function RelatedGrid({ eyebrow, title: heading, description, items }: { eyebrow: string; title: string; description?: string; items: TexasEntityRecord[] }) {
  return <section className="border-b border-border py-12 last:border-b-0">
    <div className="border-b border-border pb-4">
      <p className="eyebrow text-primary">{eyebrow}</p>
      <h2 className="mt-2 font-display text-4xl">{heading}</h2>
      {description ? <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{description}</p> : null}
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => <a key={item.id} href={canonicalEntityPath(item)} className={`group border-b border-border py-6 sm:px-5 ${index % 3 !== 0 ? 'lg:border-l lg:border-border' : ''}`}>
        <span className="eyebrow text-primary">{item.kind === 'sports-venue' ? 'Sports venue' : title(item.kind)}</span>
        <strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">{item.name}</strong>
        <small className="mt-3 block text-sm leading-6 text-muted-foreground">Open guide →</small>
      </a>)}
    </div>
  </section>;
}

function GuideCard({ title: heading, body }: { title: string; body: string }) {
  return <div className="border-t border-border pt-4">
    <h3 className="font-display text-2xl">{heading}</h3>
    <p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p>
  </div>;
}

function Fact({ label, value }: { label: string; value?: string }) {
  return value ? <div className="border-b border-border py-3 last:border-b-0 lg:first:pt-0 lg:last:pb-0"><dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</dt><dd className="mt-1 font-medium">{value}</dd></div> : null;
}

function sportsVenueSearchTitle(name: string, city?: string) {
  if (!city) return name;
  const localized = `${name} | ${city}, TX`;
  return localized.length <= 42 ? localized : name;
}

function sportsVenueSearchDescription(name: string, enrichment: SportsVenueEnrichment) {
  const city = enrichment?.city ? `${enrichment.city}, Texas` : 'Texas';
  const capacity = enrichment?.capacity && enrichment.capacity.length <= 24 ? `, capacity ${enrichment.capacity}` : '';
  const event = enrichment?.primaryEvents?.[0] ? `, ${enrichment.primaryEvents[0]}` : '';
  const detailed = `${name} in ${city}${capacity}: parking, arrival${event}, official planning links and nearby visitor ideas.`;
  if (detailed.length <= 160) return detailed;
  const fallback = `${name} in ${city}: parking, arrival, events, official planning links and nearby visitor ideas.`;
  if (fallback.length <= 160) return fallback;
  return `${name}: parking, arrival, events and official planning links for a Texas sports visit.`;
}

function formatList(items: readonly string[]) {
  if (!items.length) return 'the events listed in the guide';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items.at(-1)}`;
}

function venueProfile(tags: Set<string>) {
  if (tags.has('motorsports')) return {
    label: 'Motorsports destination', eyebrow: 'Texas Motorsports', schemaType: 'https://schema.org/SportsActivityLocation',
    whyTravel: 'Race weekends, track events and driving experiences can pull fans and participants from across Texas. Treat the circuit itself as the anchor and build the rest of the trip around the event schedule.',
    tripPattern: 'Plan for an event-day or full race-weekend stay. Extra arrival time matters at large circuits, and enthusiast events can start early and run across multiple sessions.',
    beforeYouGo: 'Use the official venue site for the current race calendar, admission rules, parking instructions, gate times and any track-specific restrictions before leaving home.',
  };
  if (tags.has('horse-racing')) return {
    label: 'Horse-racing destination', eyebrow: 'Texas Racing', schemaType: 'https://schema.org/SportsActivityLocation',
    whyTravel: 'Live race days combine sport, entertainment and a distinctive Texas outing, with larger cards and special events drawing visitors beyond the immediate metro area.',
    tripPattern: 'A race-day visit pairs naturally with nearby dining and attractions. Check first-post time and whether the calendar is live racing or simulcast-focused.',
    beforeYouGo: 'Confirm the live-racing calendar, admission policy, seating options and event-day schedule with the official track before making the drive.',
  };
  if (tags.has('golf')) return {
    label: 'Golf destination', eyebrow: 'Texas Golf', schemaType: 'https://schema.org/GolfCourse',
    whyTravel: 'Championship events, resort golf and nationally recognized courses can justify a dedicated golf trip, while tournament weeks create a separate spectator-travel experience.',
    tripPattern: 'For tournament travel, plan around parking, shuttle and gate information. For a golf getaway, treat tee times, resort access and course availability as the fixed points of the itinerary.',
    beforeYouGo: 'Check the official course or event site for public access, tee-time rules, tournament schedules, spectator policies and parking before finalizing the trip.',
  };
  if (tags.has('high-school')) return {
    label: 'High-school football landmark', eyebrow: 'Friday Night Lights', schemaType: 'https://schema.org/StadiumOrArena',
    whyTravel: 'Big Texas district stadiums can feel like destination venues on rivalry nights and during the UIL playoffs, drawing visiting families, bands and fans from well outside the home district.',
    tripPattern: 'Friday-night games work well as a one-night local trip; playoff games can turn into longer weekends depending on kickoff time and travel distance.',
    beforeYouGo: 'Use the school district or athletics site for the current schedule, ticketing, clear-bag rules, parking and stadium policies because procedures can vary by event.',
  };
  if (tags.has('rodeo') || tags.has('equestrian') || tags.has('western-sports')) return {
    label: 'Rodeo and Western-sports venue', eyebrow: 'Western Sports', schemaType: 'https://schema.org/StadiumOrArena',
    whyTravel: 'Rodeos, livestock shows and major equestrian competitions bring competitors and spectators together for events that are as much Texas culture as sport.',
    tripPattern: 'Many Western-sports events run over several days, so check whether the competition, expo, livestock show and evening performances use different schedules or tickets.',
    beforeYouGo: 'Confirm the current event calendar, grounds map, parking, entry rules and ticket requirements with the venue or event organizer before traveling.',
  };
  if (tags.has('college-baseball')) return {
    label: 'College baseball ballpark', eyebrow: 'Texas College Baseball', schemaType: 'https://schema.org/StadiumOrArena',
    whyTravel: 'Conference series, rivalry weekends and NCAA postseason games draw alumni and visiting fans who build a campus weekend around the ballpark.',
    tripPattern: 'A three-game series is ideal for a weekend trip. Leave room for campus traditions, nearby dining and schedule changes caused by weather or postseason television windows.',
    beforeYouGo: 'Check the university athletics site for the current series schedule, tickets, parking, gate policies and any weather-related updates.',
  };
  if (tags.has('college')) return {
    label: 'College sports venue', eyebrow: 'Texas College Sports', schemaType: 'https://schema.org/StadiumOrArena',
    whyTravel: 'Game days bring alumni, students and visiting fans into town, turning the campus atmosphere and surrounding districts into part of the sports-trip experience.',
    tripPattern: 'Build around kickoff, tipoff or first pitch, then add campus landmarks, local food and pregame traditions. Major rivalry weekends can require lodging well in advance.',
    beforeYouGo: 'Use the university athletics site for the latest schedule, parking, tailgating, ticketing and venue-entry rules.',
  };
  if (tags.has('professional')) return {
    label: 'Professional sports venue', eyebrow: 'Big League Texas', schemaType: 'https://schema.org/StadiumOrArena',
    whyTravel: 'Major-league games and marquee events draw traveling fans and make the venue a natural anchor for a city weekend built around sports, dining and nearby attractions.',
    tripPattern: 'Plan a full event-day window rather than just game time. Downtown and entertainment-district venues are especially easy to combine with restaurants and attractions before or after the event.',
    beforeYouGo: 'Check the official venue or team site for the current schedule, tickets, parking or transit, bag rules, gate times and event-specific policies.',
  };
  if (tags.has('shooting-sports')) return {
    label: 'Shooting-sports destination', eyebrow: 'Championship Sports', schemaType: 'https://schema.org/SportsActivityLocation',
    whyTravel: 'Large championship facilities attract competitors and spectators for multi-day events, making the venue itself the reason for specialized sports travel.',
    tripPattern: 'Competition trips may span practice and event days, so lodging and equipment logistics matter more than they do for a typical spectator event.',
    beforeYouGo: 'Review the official match calendar, registration or spectator requirements, range rules and equipment policies before traveling.',
  };
  if (tags.has('action-sports')) return {
    label: 'Action-sports destination', eyebrow: 'Texas Action Sports', schemaType: 'https://schema.org/SportsActivityLocation',
    whyTravel: 'Purpose-built action-sports experiences can justify a trip even without a spectator event, especially when instruction, resort amenities and repeat sessions are available.',
    tripPattern: 'Treat reservation times and activity windows as the fixed point of the day, then build meals and nearby attractions around them.',
    beforeYouGo: 'Confirm reservations, skill requirements, waivers, equipment rules, weather policies and operating hours with the venue.',
  };
  if (tags.has('tournament-complex')) return {
    label: 'Tournament sports complex', eyebrow: 'Texas Tournament Travel', schemaType: 'https://schema.org/SportsActivityLocation',
    whyTravel: 'Multi-field and multi-court complexes bring teams and families into a city for entire tournament weekends, creating meaningful sports tourism beyond the local market.',
    tripPattern: 'Expect early starts, multiple games and schedule changes. Lodging near the complex and flexible meal plans usually matter more than sightseeing on competition days.',
    beforeYouGo: 'Check the tournament organizer and venue for schedules, parking, admission, prohibited items and field or court assignments.',
  };
  return {
    label: 'Texas sports venue', eyebrow: 'Texas Sports', schemaType: 'https://schema.org/SportsActivityLocation',
    whyTravel: 'The venue hosts sports and event experiences that can anchor a day trip or weekend and connect naturally with the surrounding Texas community.',
    tripPattern: 'Use the event schedule as the fixed point, then pair the visit with nearby food, attractions and an overnight stay when travel distance makes it worthwhile.',
    beforeYouGo: 'Confirm the current event schedule, ticketing, parking and venue policies with the official source before traveling.',
  };
}

function title(value: string) {
  return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatCheckedDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
