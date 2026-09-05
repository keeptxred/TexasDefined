import { createFileRoute, notFound } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { getGolfCourseStarterDirectoryData } from '@/data/golf-course-starter.functions';
import { entitiesByKind } from '@/data/knowledge-graph';
import { applyCurrentEntityCorrections } from '@/data/knowledge-graph/current-entity-corrections';
import { canonicalEntityPath, isIndexableEntityPage } from '@/data/knowledge-graph/relationships';
import type { TexasEntityRecord } from '@/data/knowledge-graph/types';
import {
  matchesSportsVenueLanding,
  SPORTS_VENUE_LANDINGS,
  sportsVenueLanding,
  type SportsVenueLanding,
} from '@/data/sports-venue-landings';
import { buildMeta, canonicalLink } from '@/lib/seo';

const siteUrl = 'https://texasdefined.com';

export const Route = createFileRoute('/sports-venues/$landing')({
  loader: async ({ params }) => {
    const landing = sportsVenueLanding(params.landing);
    if (!landing) throw notFound();

    const starterDirectory = landing.slug === 'golf'
      ? await getGolfCourseStarterDirectoryData()
      : { count: 0, entities: [] as TexasEntityRecord[], cityBySlug: {} as Record<string, string> };

    const venues = [...entitiesByKind('sports-venue'), ...starterDirectory.entities]
      .filter((venue) => isIndexableEntityPage(venue)
        || (landing.slug === 'golf' && venue.tags?.includes('starter-golf-directory')))
      .map(applyCurrentEntityCorrections)
      .filter((venue) => matchesSportsVenueLanding(venue, landing))
      .sort((a, b) => venueSortKey(a).localeCompare(venueSortKey(b)) || a.name.localeCompare(b.name));

    if (!venues.length) throw notFound();
    return {
      landing,
      venues,
      starterInventoryCount: starterDirectory.count,
      starterCityBySlug: starterDirectory.cityBySlug,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const canonicalPath = `/sports-venues/${loaderData.landing.slug}`;
    return {
      meta: buildMeta(texasDefinedBrand, {
        title: landingSeoTitle(loaderData.landing),
        description: landingDescription(loaderData.landing),
        canonicalPath,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    };
  },
  component: SportsVenueLandingPage,
});

function SportsVenueLandingPage() {
  const { landing, venues, starterInventoryCount, starterCityBySlug } = Route.useLoaderData();
  const canonicalPath = `/sports-venues/${landing.slug}`;
  const isGolfDirectory = landing.slug === 'golf';
  const marketLandings = SPORTS_VENUE_LANDINGS.filter((item) => item.kind === 'market' && item.slug !== landing.slug);
  const themeLandings = SPORTS_VENUE_LANDINGS.filter((item) => item.kind === 'theme' && item.slug !== landing.slug);
  const professional = venues.filter((venue) => venue.tags?.includes('professional')).length;
  const college = venues.filter((venue) => venue.tags?.includes('college')).length;
  const majorDraws = venues.filter((venue) => venue.tags?.includes('major-tourist-draw')).length;
  const starterRecords = venues.filter((venue) => venue.tags?.includes('starter-golf-directory')).length;
  const sourceBacked = venues.length - starterRecords;
  const countiesCovered = new Set(venues.map((venue) => venue.countySlug).filter(Boolean)).size;
  const lastReviewed = venues
    .map((venue) => venue.sourceCheckedAt)
    .filter((date): date is string => Boolean(date))
    .sort()
    .at(-1);
  const quickAnswers = buildQuickAnswers(landing, venues, starterInventoryCount, lastReviewed);
  const title = landingTitle(landing);
  const description = landingDescription(landing);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${siteUrl}${canonicalPath}#page`,
        url: `${siteUrl}${canonicalPath}`,
        name: title,
        description,
        isPartOf: { '@id': `${siteUrl}/#website` },
        mainEntity: { '@id': `${siteUrl}${canonicalPath}#venues` },
      },
      {
        '@type': 'ItemList',
        '@id': `${siteUrl}${canonicalPath}#venues`,
        name: title,
        description,
        numberOfItems: venues.length,
        itemListElement: venues.map((venue, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: venue.name,
          url: `${siteUrl}${canonicalEntityPath(venue)}`,
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}${canonicalPath}#quick-answers`,
        mainEntity: quickAnswers.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}${canonicalPath}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Texas Sports', item: `${siteUrl}/sports` },
          { '@type': 'ListItem', position: 3, name: 'Sports Venues', item: `${siteUrl}/sports-venues` },
          { '@type': 'ListItem', position: 4, name: title, item: `${siteUrl}${canonicalPath}` },
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
          <span aria-current="page" className="text-foreground">{isGolfDirectory ? 'Golf courses' : landing.kind === 'market' ? 'By market' : 'By sport'}</span>
        </nav>

        <header className="border-b border-border py-10">
          <p className="eyebrow text-primary">{isGolfDirectory ? 'Texas golf course directory' : landing.eyebrow}</p>
          <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">{title}</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground sm:text-xl">{description}</p>
          <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">{landingIntro(landing)}</p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label={isGolfDirectory ? 'Course & venue guides' : 'Venue guides'} value={venues.length} />
            <Stat label={isGolfDirectory ? 'Starter course list' : 'Major visitor draws'} value={isGolfDirectory ? starterInventoryCount : majorDraws} />
            <Stat label={isGolfDirectory ? 'Source-backed profiles' : 'Professional venues'} value={isGolfDirectory ? sourceBacked : professional} />
            <Stat label={isGolfDirectory ? 'Counties represented' : 'College venues'} value={isGolfDirectory ? countiesCovered : college} />
          </dl>
          {lastReviewed ? <p className="mt-5 text-xs leading-5 text-muted-foreground">{isGolfDirectory
            ? `Directory records on this page were reconciled through ${formatDate(lastReviewed)}. Starter course pages remain out of search indexing until a first-party course source confirms the course identity and current operating details.`
            : `Venue source records on this page were reviewed through ${formatDate(lastReviewed)}. Event schedules, parking rules and operating details can change; use the official links inside each venue guide before traveling.`}</p> : null}
        </header>

        <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[15rem_1fr]" aria-labelledby="quick-answers-heading">
          <div>
            <p className="eyebrow text-primary">Quick answers</p>
            <h2 id="quick-answers-heading" className="mt-2 font-display text-3xl leading-tight">{isGolfDirectory ? 'What golfers ask first' : 'What travelers ask first'}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{isGolfDirectory ? 'Short answers drawn from the statewide starter inventory and the source-backed course profiles already in TexasDefined.' : 'Short answers drawn from the same verified venue inventory used by this guide.'}</p>
          </div>
          <div className="grid gap-x-8 md:grid-cols-2">
            {quickAnswers.map((item) => <article key={item.question} className="border-t border-border py-5">
              <h3 className="font-display text-2xl leading-tight">{item.question}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</p>
            </article>)}
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[15rem_1fr]">
          <div>
            <p className="eyebrow text-primary">Plan smarter</p>
            <h2 className="mt-2 font-display text-3xl leading-tight">How to use this guide</h2>
          </div>
          <div className="grid gap-7 md:grid-cols-3">
            {landingPlanning(landing).map((item, index) => <article key={item} className="border-t border-border pt-4">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Step {index + 1}</span>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item}</p>
            </article>)}
          </div>
        </section>

        <section className="border-b border-border py-12" aria-labelledby="venue-list-heading">
          <div className="grid gap-7 lg:grid-cols-[15rem_1fr]">
            <div>
              <p className="eyebrow text-primary">{isGolfDirectory ? 'Statewide directory' : 'Verified directory'}</p>
              <h2 id="venue-list-heading" className="mt-2 font-display text-3xl leading-tight">{isGolfDirectory ? 'Texas golf courses by county' : 'Venue-by-venue trip guides'}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{isGolfDirectory
                ? 'Open a course reference for its Texas county, region and local discovery links. Starter records are intentionally conservative until the course’s official website or operator source is attached; tee times, public access, membership rules and operating status should be confirmed directly before a visit.'
                : 'Open a venue for event-day planning, parking or access guidance, arrival strategy, official planning links and same-county TexasDefined visitor ideas.'}</p>
            </div>
            <div className="grid gap-x-7 sm:grid-cols-2 xl:grid-cols-3">
              {venues.map((venue) => <a key={venue.id} href={canonicalEntityPath(venue)} className="group border-t border-border py-5">
                <span className="eyebrow text-primary">{venueLabel(venue)}</span>
                <strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">{venue.name}</strong>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">{venueLocation(venue, starterCityBySlug)}</span>
                {venue.description ? <span className="mt-3 block line-clamp-4 text-sm leading-6 text-muted-foreground">{venue.description}</span> : null}
                <span className="mt-4 block text-sm font-semibold text-primary">{isGolfDirectory ? 'Open course guide →' : 'Open venue guide →'}</span>
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

function buildQuickAnswers(landing: SportsVenueLanding, venues: TexasEntityRecord[], starterInventoryCount: number, lastReviewed?: string) {
  const examples = venues.slice(0, 5).map((venue) => venue.name);
  const exampleSentence = formatList(examples);
  if (landing.slug === 'golf') {
    const starterRecords = venues.filter((venue) => venue.tags?.includes('starter-golf-directory')).length;
    const sourceBacked = venues.length - starterRecords;
    const counties = new Set(venues.map((venue) => venue.countySlug).filter(Boolean)).size;
    return [
      {
        question: 'How many Texas golf courses are in this directory?',
        answer: `The starter inventory contains ${starterInventoryCount} named Texas courses. The live collection currently shows ${venues.length} golf course and destination-golf records because existing TexasDefined tournament or resort venue profiles can also appear alongside the starter list.`,
      },
      {
        question: 'Can I browse Texas golf courses by county?',
        answer: `Yes. The current directory represents ${counties} Texas counties, and each mapped county page has a dedicated golf section linking back to its course references. Because mailing cities and county boundaries can differ, starter county assignments remain subject to first-party address verification.`,
      },
      {
        question: 'Are all of these course pages already verified and indexed by Google?',
        answer: `No. ${sourceBacked} record${sourceBacked === 1 ? ' has' : 's have'} source-backed venue data in the current collection, while ${starterRecords} imported course record${starterRecords === 1 ? ' is' : 's are'} being upgraded with official first-party sources. Starter course pages are crawlable for site navigation but intentionally noindex until they pass the publication gate.`,
      },
      {
        question: 'Where should I confirm tee times, public access and current course policies?',
        answer: 'Confirm time-sensitive details with the course or its operator before traveling. TexasDefined does not infer public access, membership rules, tee-time inventory, pricing or current operating status from the starter list alone.',
      },
    ];
  }

  const answerLabel = landing.eyebrow.replace(/ sports travel$/i, '').trim();
  const sourceAnswer = lastReviewed
    ? `TexasDefined currently includes ${venues.length} matching venue guide${venues.length === 1 ? '' : 's'} here. Source records for this collection were reviewed through ${formatDate(lastReviewed)}; event schedules and operating details should still be confirmed on the official venue links before travel.`
    : `TexasDefined currently includes ${venues.length} matching venue guide${venues.length === 1 ? '' : 's'} here. Each venue page links to an official source for details that can change before an event.`;

  return [
    {
      question: `What major sports venues are covered in this ${answerLabel} guide?`,
      answer: `This TexasDefined collection currently covers ${venues.length} verified venue guide${venues.length === 1 ? '' : 's'}, including ${exampleSentence}. Open any venue below for its visitor-planning page and official source links.`,
    },
    {
      question: `How many venue guides are in the ${answerLabel} collection?`,
      answer: sourceAnswer,
    },
    {
      question: 'Where can I find parking, arrival and official event information?',
      answer: 'Open the individual venue guide. TexasDefined separates durable trip-planning context from details that can change and links to official venue planning sources for current parking, entry and event information.',
    },
    {
      question: 'Can I use this page to compare venues for a Texas sports trip?',
      answer: 'Yes. The directory keeps the matching venues in one crawlable collection, while each venue page adds its county, region, venue type and visitor guidance. Use the market and sport links farther down the page to move between related Texas sports-trip ideas.',
    },
  ];
}

function landingSeoTitle(landing: SportsVenueLanding) {
  return landing.slug === 'golf' ? 'Texas Golf Courses: 250+ Courses by County & Region' : landing.seoTitle;
}

function landingTitle(landing: SportsVenueLanding) {
  return landing.slug === 'golf' ? 'Texas golf courses: 250+ courses by county and region' : landing.title;
}

function landingDescription(landing: SportsVenueLanding) {
  return landing.slug === 'golf'
    ? 'Browse 250+ Texas golf course and destination-golf references across Houston, Dallas–Fort Worth, Austin, San Antonio and the Hill Country, organized by county for local discovery and trip planning.'
    : landing.description;
}

function landingIntro(landing: SportsVenueLanding) {
  return landing.slug === 'golf'
    ? 'TexasDefined is building a statewide golf reference layer one course at a time. This first release starts with 250 named courses supplied across four major Texas golf markets, connects them to county pages, and reuses richer existing venue profiles where TexasDefined already has first-party sourcing. Individual starter pages stay out of search indexing until official course evidence is attached.'
    : landing.intro;
}

function landingPlanning(landing: SportsVenueLanding): readonly [string, string, string] {
  return landing.slug === 'golf'
    ? ['Start with the county and city shown in the directory, then confirm the exact course address because mailing cities and county boundaries do not always align.', 'Use the course or operator’s current first-party source for tee times, public access, membership rules, pricing, closures and dress-code requirements before traveling.', 'Build a golf weekend from the course outward: county pages connect the round to nearby TexasDefined attractions, events and other sports or outdoor destinations.']
    : landing.planning;
}

function formatList(items: string[]) {
  if (!items.length) return 'the venues listed below';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items.at(-1)}`;
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
  if (tags.has('starter-golf-directory')) return 'Golf course reference';
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

function venueLocation(venue: TexasEntityRecord, starterCityBySlug: Record<string, string>) {
  const county = venue.countySlug ? `${titleCase(venue.countySlug)} County` : undefined;
  const region = venue.region ? titleCase(venue.region) : undefined;
  return [starterCityBySlug[venue.slug], county, region].filter(Boolean).join(' · ');
}

function titleCase(value: string) {
  return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatDate(value: string) {
  const date = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(date);
}