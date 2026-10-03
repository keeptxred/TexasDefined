import { createLazyFileRoute, Link, Outlet, useRouterState } from '@tanstack/react-router';

import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Container } from '@/components/layout/Container';

import { description, nextStops, referenceCollections, sportsComparisonCsvPath, sportsComparisonPath } from './texas-data';

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
