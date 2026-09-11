import { lazy, Suspense } from 'react';
import { createFileRoute, notFound } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { SponsoredSportsPlacement } from '@/components/sports/SponsoredSportsPlacement';
import { SportsVenueQuickAnswers } from '@/components/sports/SportsVenueQuickAnswers';
import {
  canonicalEntityPath,
  isIndexableEntityPage,
  rankRelatedEntities,
} from '@/data/knowledge-graph/relationships';
import type { TexasEntityKind, TexasEntityRecord } from '@/data/knowledge-graph/types';
import type { SportsVenueEnrichment as SportsVenueEnrichmentRecord } from '@/data/sports-venue-enrichment';
import { getActiveSportsSponsorPlacement } from '@/data/sports-sponsorship.functions';
import { buildMeta, canonicalLink } from '@/lib/seo';

const siteUrl = 'https://texasdefined.com';
const sportsVenueGuidePilotSlugs = new Set([
  'amon-g-carter-stadium',
  'gerald-j-ford-stadium',
  'globe-life-field',
  'american-airlines-center',
  'texas-motor-speedway',
  'cotton-bowl-stadium',
  'choctaw-stadium',
  'ford-center-at-the-star',
  'datcu-stadium',
  'riders-field',
  'lone-star-park',
  'att-stadium',
  'toyota-stadium-frisco',
  'dickies-arena',
  'college-park-center',
  'comerica-center',
  'cowtown-coliseum',
  'credit-union-of-texas-event-center',
  'moody-coliseum-smu',
  'unt-coliseum',
  'daikin-park',
  'toyota-center-houston',
  'shell-energy-stadium',
  'tdecu-stadium',
  'fertitta-center',
  'q2-stadium',
  'moody-center',
  'frost-bank-center',
  'alamodome',
  'olsen-field-blue-bell-park',
]);

type SportsVenueEnrichment = SportsVenueEnrichmentRecord | undefined;

function isSportsVenueGuidePilot(slug: string) {
  return sportsVenueGuidePilotSlugs.has(slug);
}

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
    const [
      { findCompleteTexasEntity, loadTexasKnowledgeGraph },
      { getSportsVenueEnrichmentAll, sportsVenueMapUrl },
      { sportsVenueLandingLinksForVenue },
    ] = await Promise.all([
      import('@/data/knowledge-graph'),
      import('@/data/sports-venue-enrichment-all'),
      import('@/data/sports-venue-landings'),
    ]);
    const graph = await loadTexasKnowledgeGraph();
    const entity = await findCompleteTexasEntity(params.slug);
    if (!entity || entity.kind !== 'sports-venue') throw notFound();
    const canonicalPath = canonicalEntityPath(entity);
    const enrichment = getSportsVenueEnrichmentAll(entity.slug);
    const mapUrl = entity.coordinates
      ? `https://www.google.com/maps/search/?api=1&query=${entity.coordinates.latitude},${entity.coordinates.longitude}`
      : sportsVenueMapUrl(entity.name, entity.countySlug);
    const guideEvents = isSportsVenueGuidePilot(params.slug)
      ? await import('@/data/sports-venue-events.functions').then(({ getSportsVenueUpcomingEvents }) =>
        getSportsVenueUpcomingEvents({ data: { slug: params.slug } }))
      : null;
    return {
      entity,
      related: rankRelatedEntities(entity, graph, 16),
      visitorPlaces: countyVisitorPlaces(entity, graph),
      sponsorPlacement: await getActiveSportsSponsorPlacement({ data: { surfacePath: canonicalPath } }),
      enrichment,
      landingLinks: sportsVenueLandingLinksForVenue(entity),
      mapUrl,
      upcomingEvents: guideEvents?.events ?? [],
      eventCalendarHref: guideEvents?.calendarHref ?? '/events',
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { entity, enrichment } = loaderData;
    const canonicalPath = canonicalEntityPath(entity);
    const indexable = isIndexableEntityPage(entity);
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

const SportsVenueGuidePilotContent = lazy(
  () => import('@/components/sports/SportsVenueGuidePilotContent'),
);

function SportsVenuePage() {
  const { slug } = Route.useParams();
  const { entity, visitorPlaces, upcomingEvents, eventCalendarHref } = Route.useLoaderData();

  if (isSportsVenueGuidePilot(slug)) {
    return <Suspense fallback={null}>
      <SportsVenueGuidePilotContent
        slug={slug}
        entity={entity}
        nearbyAttractions={visitorPlaces}
        upcomingEvents={upcomingEvents}
        eventCalendarHref={eventCalendarHref}
      />
    </Suspense>;
  }

  return <LegacySportsVenuePage />;
}

function LegacySportsVenuePage() {
  const { entity, related, visitorPlaces, sponsorPlacement, enrichment, landingLinks, mapUrl } = Route.useLoaderData();
  const tags = new Set(entity.tags ?? []);
  const profile = venueProfile(tags);
  const canonicalPath = canonicalEntityPath(entity);
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const venueHeroUrl = `${siteUrl}/api/sports-venue-hero?slug=${encodeURIComponent(entity.slug)}`;
  const relatedVenues = related.filter(({ entity: candidate }) => candidate.kind === 'sports-venue').slice(0, 6);
  const countyName = entity.countySlug ? `${title(entity.countySlug)} County` : undefined;
  const regionName = entity.region ? title(entity.region) : undefined;
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

        <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
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
                {enrichment.stayAndEat && <GuideCard title="Stay and eat" body={enrichment.stayAndEat} />}
                {enrichment.nearby && <GuideCard title="Build the weekend" body={enrichment.nearby} />}
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
  };
  if (tags.has('horse-racing')) return {
    label: 'Horse-racing destination', eyebrow: 'Texas Racing', schemaType: 'https://schema.org/SportsActivityLocation',
  };
  if (tags.has('golf')) return {
    label: 'Golf destination', eyebrow: 'Texas Golf', schemaType: 'https://schema.org/GolfCourse',
  };
  if (tags.has('high-school')) return {
    label: 'High-school football landmark', eyebrow: 'Friday Night Lights', schemaType: 'https://schema.org/StadiumOrArena',
  };
  if (tags.has('rodeo') || tags.has('equestrian') || tags.has('western-sports')) return {
    label: 'Rodeo and Western-sports venue', eyebrow: 'Western Sports', schemaType: 'https://schema.org/StadiumOrArena',
  };
  if (tags.has('college-baseball')) return {
    label: 'College baseball ballpark', eyebrow: 'Texas College Baseball', schemaType: 'https://schema.org/StadiumOrArena',
  };
  if (tags.has('college')) return {
    label: 'College sports venue', eyebrow: 'Texas College Sports', schemaType: 'https://schema.org/StadiumOrArena',
  };
  if (tags.has('professional')) return {
    label: 'Professional sports venue', eyebrow: 'Big League Texas', schemaType: 'https://schema.org/StadiumOrArena',
  };
  if (tags.has('shooting-sports')) return {
    label: 'Shooting-sports destination', eyebrow: 'Championship Sports', schemaType: 'https://schema.org/SportsActivityLocation',
  };
  if (tags.has('action-sports')) return {
    label: 'Action-sports destination', eyebrow: 'Texas Action Sports', schemaType: 'https://schema.org/SportsActivityLocation',
  };
  if (tags.has('tournament-complex')) return {
    label: 'Tournament sports complex', eyebrow: 'Texas Tournament Travel', schemaType: 'https://schema.org/SportsActivityLocation',
  };
  return {
    label: 'Texas sports venue', eyebrow: 'Texas Sports', schemaType: 'https://schema.org/SportsActivityLocation',
  };
}

function title(value: string) {
  return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatCheckedDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}