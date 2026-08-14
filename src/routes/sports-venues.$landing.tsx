import { createFileRoute, notFound } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { entitiesByKind } from '@/data/knowledge-graph';
import { applyCurrentEntityCorrections } from '@/data/knowledge-graph/current-entity-corrections';
import { canonicalEntityPath, isIndexableEntityPage } from '@/data/knowledge-graph/relationships';
import type { TexasEntityRecord } from '@/data/knowledge-graph/types';
import {
  matchesSportsVenueLanding,
  SPORTS_VENUE_LANDINGS,
  sportsVenueLanding,
} from '@/data/sports-venue-landings';
import { buildMeta, canonicalLink } from '@/lib/seo';

const siteUrl = 'https://texasdefined.com';

export const Route = createFileRoute('/sports-venues/$landing')({
  loader: async ({ params }) => {
    const landing = sportsVenueLanding(params.landing);
    if (!landing) throw notFound();

    const venues = entitiesByKind('sports-venue')
      .filter(isIndexableEntityPage)
      .map(applyCurrentEntityCorrections)
      .filter((venue) => matchesSportsVenueLanding(venue, landing))
      .sort((a, b) => venueSortKey(a).localeCompare(venueSortKey(b)) || a.name.localeCompare(b.name));

    if (!venues.length) throw notFound();
    return { landing, venues };
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
  const { landing, venues } = Route.useLoaderData();
  const canonicalPath = `/sports-venues/${landing.slug}`;
  const marketLandings = SPORTS_VENUE_LANDINGS.filter((item) => item.kind === 'market' && item.slug !== landing.slug);
  const themeLandings = SPORTS_VENUE_LANDINGS.filter((item) => item.kind === 'theme' && item.slug !== landing.slug);
  const professional = venues.filter((venue) => venue.tags?.includes('professional')).length;
  const college = venues.filter((venue) => venue.tags?.includes('college')).length;
  const majorDraws = venues.filter((venue) => venue.tags?.includes('major-tourist-draw')).length;
  const lastReviewed = venues
    .map((venue) => venue.sourceCheckedAt)
    .filter((date): date is string => Boolean(date))
    .sort()
    .at(-1);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
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
          {lastReviewed ? <p className="mt-5 text-xs leading-5 text-muted-foreground">Venue source records on this page were reviewed through {formatDate(lastReviewed)}. Event schedules, parking rules and operating details can change; use the official links inside each venue guide before traveling.</p> : null}
        </header>

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
              <p className="eyebrow text-primary">Verified directory</p>
              <h2 id="venue-list-heading" className="mt-2 font-display text-3xl leading-tight">Venue-by-venue trip guides</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Open a venue for event-day planning, parking or access guidance, arrival strategy, official planning links and same-county TexasDefined visitor ideas.</p>
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
  return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatDate(value: string) {
  const date = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(date);
}
