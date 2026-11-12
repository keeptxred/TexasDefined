import { createFileRoute, notFound } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { applyCurrentEntityCorrections } from '@/data/knowledge-graph/current-entity-corrections';
import { canonicalEntityPath, isIndexableEntityPage } from '@/data/knowledge-graph/relationships';
import type { TexasEntityRecord } from '@/data/knowledge-graph/types';
import type { SportsVenueLanding } from '@/data/sports-venue-landings';
import { sportsVenueTripDecisions } from '@/data/sports-venue-trip-decisions';
import { getSportsVenueReviewDates } from '@/data/sports-venue-review-dates.functions';
import { buildMeta, canonicalLink } from '@/lib/seo';

const siteUrl = 'https://texasdefined.com';

export const Route = createFileRoute('/sports-venues/$landing')({
  loader: async ({ params }) => {
    const [
      { matchesSportsVenueLanding, SPORTS_VENUE_LANDINGS, sportsVenueLanding },
      { entitiesByKind },
      { getSportsVenueEditorialDescriptions },
    ] = await Promise.all([
      import('@/data/sports-venue-landings'),
      import('@/data/knowledge-graph'),
      import('@/data/sports-venue-editorial.functions'),
    ]);
    const landing = sportsVenueLanding(params.landing);
    if (!landing) throw notFound();

    const correctedVenues = entitiesByKind('sports-venue').map(applyCurrentEntityCorrections);
    const editorialDescriptions = await getSportsVenueEditorialDescriptions({
      data: { ids: correctedVenues.map((venue) => venue.id) },
    });
    const seenVenuePaths = new Set<string>();
    const venues = correctedVenues
      .map((venue) => editorialDescriptions[venue.id] ? { ...venue, description: editorialDescriptions[venue.id] } : venue)
      .filter(isIndexableEntityPage)
      .map(applyCurrentEntityCorrections)
      .filter((venue) => matchesSportsVenueLanding(venue, landing))
      .filter((venue) => {
        const path = canonicalEntityPath(venue);
        if (seenVenuePaths.has(path)) return false;
        seenVenuePaths.add(path);
        return true;
      })
      .sort((a, b) => venueSortKey(a).localeCompare(venueSortKey(b)) || a.name.localeCompare(b.name));

    if (!venues.length) throw notFound();
    const venueReviewDates = await getSportsVenueReviewDates({
      data: { slugs: venues.map((venue) => venue.slug) },
    });
    return {
      landing,
      venues,
      venueReviewDates,
      marketLandings: SPORTS_VENUE_LANDINGS.filter((item) => item.kind === 'market' && item.slug !== landing.slug),
      themeLandings: SPORTS_VENUE_LANDINGS.filter((item) => item.kind === 'theme' && item.slug !== landing.slug),
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const canonicalPath = `/sports-venues/${loaderData.landing.slug}`;
    return {
      meta: buildMeta(texasDefinedBrand, {
        title: loaderData.landing.seoTitle,
        description: loaderData.landing.description,
        canonicalPath,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    };
  },
  component: SportsVenueLandingPage,
});

function SportsVenueLandingPage() {
  const { landing, venues, venueReviewDates, marketLandings, themeLandings } = Route.useLoaderData();
  const canonicalPath = `/sports-venues/${landing.slug}`;
  const professional = venues.filter((venue) => venue.tags?.includes('professional')).length;
  const college = venues.filter((venue) => venue.tags?.includes('college')).length;
  const majorDraws = venues.filter((venue) => venue.tags?.includes('major-tourist-draw')).length;
  const lastReviewed = venues
    .map((venue) => venueReviewDates[venue.slug] ?? venue.sourceCheckedAt)
    .filter((date): date is string => Boolean(date))
    .sort()
    .at(-1);
  const tripChoices = sportsVenueTripDecisions(landing.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${siteUrl}${canonicalPath}#page`,
        url: `${siteUrl}${canonicalPath}`,
        name: landing.title,
        description: landing.description,
        isPartOf: { '@id': `${siteUrl}/#website` },
        mainEntity: { '@id': `${siteUrl}${canonicalPath}#venues` },
        dateModified: lastReviewed,
      },
      {
        '@type': 'ItemList',
        '@id': `${siteUrl}${canonicalPath}#venues`,
        name: landing.title,
        description: landing.description,
        numberOfItems: venues.length,
        itemListElement: venues.map((venue, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: venue.name,
          url: `${siteUrl}${canonicalEntityPath(venue)}`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}${canonicalPath}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Texas Sports', item: `${siteUrl}/sports` },
          { '@type': 'ListItem', position: 3, name: 'Sports Venues', item: `${siteUrl}/sports-venues` },
          { '@type': 'ListItem', position: 4, name: landing.title, item: `${siteUrl}${canonicalPath}` },
        ],
      },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <main className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <a href="/" className="hover:text-foreground">Front page</a>
          <span aria-hidden="true" className="mx-2">/</span>
          <a href="/sports" className="hover:text-foreground">Texas Sports</a>
          <span aria-hidden="true" className="mx-2">/</span>
          <a href="/sports-venues" className="hover:text-foreground">Sports Venues</a>
          <span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page" className="text-foreground">{landing.kind === 'market' ? 'By market' : 'By sport'}</span>
        </nav>

        <header className="border-b border-border py-10">
          <p className="eyebrow text-primary">{landing.eyebrow}</p>
          <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">{landing.title}</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground sm:text-xl">{landing.description}</p>
          <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">{landing.intro}</p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Venue guides" value={venues.length} />
            <Stat label="Major visitor draws" value={majorDraws} />
            <Stat label="Professional venues" value={professional} />
            <Stat label="College venues" value={college} />
          </dl>
          {lastReviewed ? <p className="mt-5 text-xs leading-5 text-muted-foreground">The most recently checked individual venue record in this collection was verified {formatDate(lastReviewed)}. Other listings may have older reviews; consult the dated sources on each guide for schedules, parking and operating status.</p> : null}
        </header>

        <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[15rem_1fr]" aria-labelledby="trip-choices-heading">
          <div>
            <p className="eyebrow text-primary">Plan the actual trip</p>
            <h2 id="trip-choices-heading" className="mt-2 font-display text-3xl leading-tight">Which outing fits your plans?</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">These options have different travel, access and scheduling considerations. Check the linked venue's current event instructions before booking.</p>
          </div>
          <div className="grid gap-x-8 md:grid-cols-2">
            {tripChoices.map((choice) => {
              const matchedVenue = choice.venueSlug ? venues.find((venue) => venue.slug === choice.venueSlug) : undefined;
              return <article key={choice.title} className="border-t border-border py-5">
                <h3 className="font-display text-2xl leading-tight">{choice.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{choice.detail}</p>
                {matchedVenue ? <a href={canonicalEntityPath(matchedVenue)} className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4">Read the {matchedVenue.name} guide →</a> : null}
              </article>;
            })}
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[15rem_1fr]">
          <div>
            <p className="eyebrow text-primary">Plan smarter</p>
            <h2 className="mt-2 font-display text-3xl leading-tight">How to use this guide</h2>
          </div>
          <div className="grid gap-7 md:grid-cols-3">
            {landing.planning.map((item, index) => <article key={item} className="border-t border-border pt-4">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Step {index + 1}</span>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item}</p>
            </article>)}
          </div>
        </section>

        <section className="border-b border-border py-12" aria-labelledby="venue-list-heading">
          <div className="grid gap-7 lg:grid-cols-[15rem_1fr]">
            <div>
              <p className="eyebrow text-primary">Choose a venue</p>
              <h2 id="venue-list-heading" className="mt-2 font-display text-3xl leading-tight">Venues in this collection</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Each guide covers the venue itself, practical visitor details and source links. Parking arrangements, prices and entry rules can change for a particular event.</p>
            </div>
            <div className="grid gap-x-7 sm:grid-cols-2 xl:grid-cols-3">
              {venues.map((venue) => <a key={venue.id} href={canonicalEntityPath(venue)} className="group border-t border-border py-5">
                <span className="eyebrow text-primary">{venueLabel(venue)}</span>
                <strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">{venue.name}</strong>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">{venueLocation(venue)}</span>
                {venue.description ? <span className="mt-3 block line-clamp-4 text-sm leading-6 text-muted-foreground">{venue.description}</span> : null}
                <span className="mt-4 block text-sm font-semibold text-primary">Open venue guide →</span>
              </a>)}
            </div>
          </div>
        </section>

        <section className="border-b border-border py-12">
          <div className="grid gap-8 lg:grid-cols-2">
            <LandingLinks eyebrow="Browse by market" title="More Texas sports markets" items={marketLandings} />
            <LandingLinks eyebrow="Browse by sport" title="More sports venue guides" items={themeLandings} />
          </div>
        </section>

        <aside className="py-10">
          <p className="eyebrow text-primary">Statewide view</p>
          <h2 className="mt-2 font-display text-3xl">See every TexasDefined sports venue guide</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">The statewide directory combines professional, college, high-school, motorsports, golf, Western-sports and regional destinations in one index.</p>
          <a href="/sports-venues" className="mt-5 inline-block text-sm font-semibold text-primary">Browse all Texas sports venues →</a>
        </aside>
      </main>
    </Container>
  </>;
}

function LandingLinks({ eyebrow, title, items }: { eyebrow: string; title: string; items: readonly { slug: string; title: string }[] }) {
  return <div>
    <p className="eyebrow text-primary">{eyebrow}</p>
    <h2 className="mt-2 font-display text-3xl">{title}</h2>
    <div className="mt-5 grid sm:grid-cols-2">
      {items.map((item) => <a key={item.slug} href={`/sports-venues/${item.slug}`} className="border-t border-border py-4 pr-4 text-sm font-semibold hover:text-primary">{item.title} →</a>)}
    </div>
  </div>;
}

function Stat({ label, value }: { label: string; value: number }) {
  return <div className="border-t border-border pt-3">
    <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
    <dd className="mt-1 font-display text-3xl">{value}</dd>
  </div>;
}

function venueSortKey(venue: TexasEntityRecord) {
  return `${venue.countySlug ?? 'zzzz'}:${venue.name}`;
}

function venueLabel(venue: TexasEntityRecord) {
  const tags = new Set(venue.tags ?? []);
  if (tags.has('professional')) return 'Professional venue';
  if (tags.has('college-baseball')) return 'College baseball';
  if (tags.has('college')) return 'College venue';
  if (tags.has('high-school')) return 'High-school football';
  if (tags.has('motorsports')) return 'Motorsports';
  if (tags.has('horse-racing')) return 'Horse racing';
  if (tags.has('golf')) return 'Golf destination';
  if (tags.has('rodeo') || tags.has('equestrian') || tags.has('western-sports')) return 'Western sports';
  if (tags.has('minor-league')) return 'Minor league';
  if (tags.has('tournament-complex')) return 'Tournament complex';
  return 'Sports venue';
}

function venueLocation(venue: TexasEntityRecord) {
  const county = venue.countySlug ? `${titleCase(venue.countySlug)} County` : undefined;
  const region = venue.region ? titleCase(venue.region) : undefined;
  return [county, region].filter(Boolean).join(' · ');
}

function titleCase(value: string) {
  if (value === 'mclennan') return 'McLennan';
  if (value === 'el-paso') return 'El Paso';
  return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatDate(value: string) {
  const date = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(date);
}
