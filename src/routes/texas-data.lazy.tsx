import { createLazyFileRoute, Link, Outlet, useRouterState } from '@tanstack/react-router';

import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Container } from '@/components/layout/Container';

import { countyHousingNextStop, dataHubNavigationPaths, description, sportsComparisonCsvPath, sportsComparisonPath } from './texas-data';

const referenceCollections = [
  {
    eyebrow: 'Maritime history · lighthouse records',
    title: 'Texas Lighthouse Database — Complete List, Map, Status & Visitor Access',
    description: 'A source-backed lighthouse reference covering location, county, historic era, present status, visitor-access reality, planning context and the supporting record for each mapped light.',
    href: '/explore/lighthouses',
    csvHref: '/texas-lighthouses.csv',
    secondaryHref: '/article/texas-lighthouses-complete-guide',
    secondaryLabel: 'Read the historical guide',
    sourceLabel: 'Texas Historical Commission, U.S. Coast Guard, NOAA and linked source records',
  },
  {
    eyebrow: 'Historic places · statewide verified directory',
    title: 'Texas Painted Churches Directory — Census, Map, Sources & Visitor Access',
    description: 'The canonical Texas Defined Painted Churches collection with verified profiles, a transparent census, methodology, map, designation evidence, reusable CSV/JSON data and a dedicated citation guide.',
    href: '/explore/painted-churches',
    csvHref: '/painted-churches.csv',
    jsonHref: '/painted-churches.json',
    secondaryHref: '/explore/painted-churches/cite',
    secondaryLabel: 'How to cite the collection',
    sourceLabel: 'National Park Service, Texas Historical Commission, parish and archival source trails',
  },
  {
    eyebrow: 'Freshwater fishing · lake × species matrix',
    title: 'Texas Fishing Species & Lake Reference Matrix',
    description: 'A statewide relationship dataset connecting published Texas fishing lakes with documented species, prominence, fishery quality, seasonal patterns, lake characteristics and the source records behind each relationship.',
    href: '/fishing/species',
    csvHref: '/fishing-lake-species.csv',
    secondaryHref: '/fishing/lakes',
    secondaryLabel: 'Browse the lake directory',
    sourceLabel: 'Texas Parks & Wildlife and source records attached to lake, species and fishery relationships',
  },
  {
    eyebrow: 'High-school football · 2026–28 UIL alignment',
    title: 'Texas UIL Football District Reference — Classifications, Teams & Enrollments',
    description: 'All 192 current UIL football districts with classification, division, district number, member programs and the exact enrollment values used for the 2026–28 alignment cycle.',
    href: '/texas-high-school-football-districts',
    csvHref: '/texas-high-school-football-districts.csv',
    secondaryHref: '/texas-high-school-football-teams',
    secondaryLabel: 'Search every football program',
    sourceLabel: 'University Interscholastic League alignment and enrollment source records',
  },
] as const;

const nextStops = [
  ['Plan a move to Texas', '/moving-to-texas', 'Use the relocation research center for metro guides, city matching, address-level source checks, moving tasks and cost tools.'],
  ['Texas industries', '/texas-industries', 'Connect statewide economic data with sourced sector guides, regional industry hubs and county pathways.'],
  ['Find your county', dataHubNavigationPaths.counties, 'Explore all 254 counties and find trusted local information for each one.'],
  ['County population growth', '/texas-data/county-growth', 'Compare Census Vintage 2025 county population change from the 2020 estimates base to July 1, 2025.'],
  countyHousingNextStop,
  ['Compare sports venues', sportsComparisonPath, 'Compare 84 verified Texas sports venue guides by location, type, capacity and opening information where available.'],
  ['Find a city', dataHubNavigationPaths.cities, 'Get to know major cities, regional centers and communities across the state.'],
  ['City-to-county relationships', '/texas-data/city-county-relationships', 'See the current Texas Defined city directory mapped to counties and regions.'],
  ['Explore Texas', dataHubNavigationPaths.explore, 'Find parks, lakes, caverns, road trips and memorable corners of Texas.'],
  ['Property-tax help', '/decide/property-taxes', 'Estimate a property-tax bill and understand the numbers behind it.'],
  ['Money & Property', '/decide/financial-tools', 'Compare household costs, homeownership expenses and moving decisions.'],
  ['Texas resources', dataHubNavigationPaths.resources, 'Find official contacts, local information and practical guides.'],
] as const;

const editorialLabel = (value: string) => value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase());

export const Route = createLazyFileRoute('/texas-data')({ component: TexasDataRoute });

function TexasDataRoute() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  if (pathname !== '/texas-data' && pathname !== '/texas-data/') return <Outlet />;
  return <Page />;
}

function Page() {
  const { datasets } = Route.useLoaderData();
  return <>
    <DepartmentHero current="Texas Data" eyebrow="Texas reference library" title="Texas facts, databases & reference collections" description={description} />
    <Container className="py-12 sm:py-16">
      <aside className="max-w-4xl border-y border-border py-5 text-sm leading-7 text-muted-foreground"><p className="eyebrow text-primary">Built to be checked and cited</p><p className="mt-3">Texas Defined separates maintained reference collections from ordinary editorial articles. The resources below expose structured facts, source trails, methodology or review context, and downloadable records where the underlying data can be reused responsibly.</p></aside>

      <section className="py-12" aria-labelledby="reference-data-heading">
        <div className="grid gap-8 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">Reference collections</p><h2 id="reference-data-heading" className="mt-2 font-display text-4xl">Use Texas Defined as a factual source</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">These are maintained directories and relationship datasets rather than one-off stories. Open the canonical collection for context, or download the structured records for research and reporting.</p></div>
          <div className="grid gap-px border border-border bg-border md:grid-cols-2">
            {referenceCollections.map((collection) => <article key={collection.href} className="bg-background p-6 sm:p-7"><p className="eyebrow text-primary">{collection.eyebrow}</p><h3 className="mt-2 font-display text-3xl leading-tight">{collection.title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{collection.description}</p><p className="mt-4 text-xs leading-6 text-muted-foreground"><strong className="text-foreground">Primary source trail:</strong> {collection.sourceLabel}</p><div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold"><Link to={collection.href} className="border-b border-primary text-primary">Open reference →</Link><a href={collection.csvHref} className="border-b border-primary text-primary">Download CSV ↓</a>{'jsonHref' in collection ? <a href={collection.jsonHref} className="border-b border-primary text-primary">Download JSON ↓</a> : null}<Link to={collection.secondaryHref} className="border-b border-primary text-primary">{collection.secondaryLabel} →</Link></div></article>)}
            <article className="bg-background p-6 sm:p-7 md:col-span-2"><p className="eyebrow text-primary">Sports travel · 84 venues</p><h3 className="mt-2 font-display text-3xl">Texas Sports Venue Comparison</h3><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">A source-aligned comparison of verified stadiums, arenas, ballparks, racetracks and other sports destinations. Capacity and opening fields remain blank when the verified profile does not contain a usable value.</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><Link to={sportsComparisonPath} className="border-b border-primary text-primary">Open comparison →</Link><a href={sportsComparisonCsvPath} className="border-b border-primary text-primary">Download CSV ↓</a></div></article>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-12" aria-labelledby="figures-heading"><div className="border-b border-border pb-4"><p className="eyebrow text-primary">Texas data briefs</p><h2 id="figures-heading" className="mt-2 font-display text-4xl">A closer look at the numbers</h2></div><div className="grid sm:grid-cols-2 lg:grid-cols-3">{datasets.map((dataset, index) => <Link key={dataset.slug} to="/texas-data/$datasetSlug" params={{ datasetSlug: dataset.slug }} className={`group border-b border-border py-7 sm:px-5 ${index % 3 !== 0 ? 'lg:border-l lg:border-border' : ''}`}><p className="eyebrow text-primary">{editorialLabel(dataset.category)} · {dataset.year}</p><h3 className="mt-2 font-display text-2xl leading-tight group-hover:text-primary">{dataset.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{dataset.description}</p><span className="mt-5 block text-sm font-semibold">Open the data brief →</span></Link>)}</div></section>

      <section className="border-t border-border py-12" aria-labelledby="help-heading"><div className="grid gap-8 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">Use the numbers</p><h2 id="help-heading" className="mt-2 font-display text-4xl">Where to go next</h2></div><div className="grid sm:grid-cols-2">{nextStops.map(([title, to, copy]) => <Link key={to} to={to} className="group border-t border-border py-5 sm:px-5"><h3 className="font-display text-2xl group-hover:text-primary">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p><span className="mt-3 block text-sm font-semibold">Continue →</span></Link>)}</div></div></section>
      <aside className="border-y border-border py-5 text-sm leading-6 text-muted-foreground">Texas Defined uses public and verified information as a starting point for understanding the state. For official decisions, deadlines, eligibility or current event-day details, follow the source links to the responsible agency, venue or organizer.</aside>
    </Container>
  </>;
}
