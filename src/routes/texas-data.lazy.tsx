import { createLazyFileRoute, Link, Outlet, useRouterState } from '@tanstack/react-router';

import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Container } from '@/components/layout/Container';

import { description, sportsComparisonCsvPath, sportsComparisonPath } from './texas-data';

const nextStops = [
  ['Plan a move to Texas', '/moving-to-texas', 'Use the relocation research center for metro guides, city matching, address-level source checks, moving tasks and cost tools.'],
  ['Texas industries', '/texas-industries', 'Connect statewide economic data with sourced sector guides, regional industry hubs and county pathways.'],
  ['Find your county', '/browse/counties', 'Explore all 254 counties and find trusted local information for each one.'],
  ['Home insurance premiums versus coverage', '/texas-data/research/texas-homeowners-premiums-vs-coverage', 'Original TexasDefined research comparing statewide premiums and insured coverage from 2016 through 2025.'],
  ['County population growth', '/texas-data/county-growth', 'Compare Census Vintage 2025 county population change from the 2020 estimates base to July 1, 2025.'],
  ['County housing costs', '/texas-data/county-housing-costs', 'Compare official ACS median home values, gross rent, owner costs and household income across Texas counties.'],
  ['Compare sports venues', sportsComparisonPath, 'Compare 84 verified Texas sports venue guides by location, type, capacity and opening information where available.'],
  ['Find a city', '/browse/cities', 'Get to know major cities, regional centers and communities across the state.'],
  ['City-to-county relationships', '/texas-data/city-county-relationships', 'See the current Texas Defined city directory mapped to counties and regions.'],
  ['Explore Texas', '/explore', 'Find parks, lakes, caverns, road trips and memorable corners of Texas.'],
  ['Property-tax help', '/decide/property-taxes', 'Estimate a property-tax bill and understand the numbers behind it.'],
  ['Money & Property', '/decide/financial-tools', 'Compare household costs, homeownership expenses and moving decisions.'],
  ['Texas resources', '/texas-resources', 'Find official contacts, local information and practical guides.'],
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
    <DepartmentHero current="Texas Data" eyebrow="Texas at a glance" title="The numbers behind everyday Texas" description={description} />
    <Container className="py-12 sm:py-16">
      <aside className="max-w-3xl border-y border-border py-5 text-sm leading-7 text-muted-foreground"><p className="eyebrow text-primary">About the data</p><p className="mt-3">Public and verified reference data is most useful when it has context. Each dataset or comparison includes source notes, review context and a path back to the underlying information.</p></aside>
      <section className="py-12" aria-labelledby="figures-heading"><div className="border-b border-border pb-4"><p className="eyebrow text-primary">Texas data</p><h2 id="figures-heading" className="mt-2 font-display text-4xl">A closer look at the numbers</h2></div><div className="grid sm:grid-cols-2 lg:grid-cols-3">{datasets.map((dataset, index) => <Link key={dataset.slug} to="/texas-data/$datasetSlug" params={{ datasetSlug: dataset.slug }} className={`group border-b border-border py-7 sm:px-5 ${index % 3 !== 0 ? 'lg:border-l lg:border-border' : ''}`}><p className="eyebrow text-primary">{editorialLabel(dataset.category)} · {dataset.year}</p><h3 className="mt-2 font-display text-2xl leading-tight group-hover:text-primary">{dataset.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{dataset.description}</p><span className="mt-5 block text-sm font-semibold">Open the data brief →</span></Link>)}</div></section>
      <section className="border-y border-border py-10" aria-labelledby="reference-data-heading"><div className="grid gap-8 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">Reference datasets</p><h2 id="reference-data-heading" className="mt-2 font-display text-4xl">Data from across Texas Defined</h2></div><article className="border-t border-border py-5"><p className="eyebrow text-primary">Sports travel · 84 venues</p><h3 className="mt-2 font-display text-3xl">Texas Sports Venue Comparison</h3><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">A source-aligned comparison of verified stadiums, arenas, ballparks, racetracks and other sports destinations. Capacity and opening fields remain blank when the verified profile does not contain a usable value.</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><Link to={sportsComparisonPath} className="border-b border-primary text-primary">Open comparison →</Link><a href={sportsComparisonCsvPath} className="border-b border-primary text-primary">Download CSV ↓</a></div></article></div></section>
      <section className="border-t border-border py-12" aria-labelledby="help-heading"><div className="grid gap-8 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">Use the numbers</p><h2 id="help-heading" className="mt-2 font-display text-4xl">Where to go next</h2></div><div className="grid sm:grid-cols-2">{nextStops.map(([title, to, copy]) => <Link key={to} to={to} className="group border-t border-border py-5 sm:px-5"><h3 className="font-display text-2xl group-hover:text-primary">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p><span className="mt-3 block text-sm font-semibold">Continue →</span></Link>)}</div></div></section>
      <aside className="border-y border-border py-5 text-sm leading-6 text-muted-foreground">Texas Defined uses public and verified information as a starting point for understanding the state. For official decisions, deadlines, eligibility or current event-day details, follow the source links to the responsible agency, venue or organizer.</aside>
    </Container>
  </>;
}
