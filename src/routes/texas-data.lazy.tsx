import { createLazyFileRoute, Link, Outlet, useRouterState } from '@tanstack/react-router';

import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Container } from '@/components/layout/Container';

import { description, nextStops, sportsComparisonCsvPath, sportsComparisonPath } from './texas-data';

const editorialLabel = (value: string) => value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase());

export const Route = createLazyFileRoute('/texas-data')({ component: TexasDataRoute });

function TexasDataRoute() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  if (pathname !== '/texas-data' && pathname !== '/texas-data/') return <Outlet />;
  return <Page />;
}

function Page() {
  const { datasets, referenceDatasets } = Route.useLoaderData();
  return <>
    <DepartmentHero current="Texas Data" eyebrow="TexasDefined reference desk" title="Texas Data" description={description} />
    <Container className="py-12 sm:py-16">
      <aside className="max-w-4xl border-y border-border py-6 text-sm leading-7 text-muted-foreground">
        <p className="eyebrow text-primary">Citation-ready reference data</p>
        <p className="mt-3 font-semibold text-foreground">Data compiled and maintained by TexasDefined; source methodology below.</p>
        <p className="mt-2">These tables are built from the same maintained systems that power TexasDefined’s park, lake, county, property-tax and football pages. Blank fields stay blank until they are source-verified. Important datasets include downloadable CSV files so journalists, bloggers, researchers, students and other sites can cite the underlying records directly.</p>
      </aside>

      <section className="py-12" aria-labelledby="reference-heading">
        <div className="grid gap-6 border-b border-border pb-5 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Core reference datasets</p><h2 id="reference-heading" className="mt-2 font-display text-4xl">Built to be cited</h2></div>
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground">Each dataset has a maintained table, coverage statement, source methodology and full CSV download. The public page stays readable; the download carries the complete maintained records.</p>
        </div>
        <div className="divide-y divide-border">
          {referenceDatasets.map((dataset) => (
            <article key={dataset.slug} className="grid gap-5 py-7 md:grid-cols-[minmax(0,1fr)_15rem] md:items-end">
              <div>
                <p className="eyebrow text-primary">{editorialLabel(dataset.category)}</p>
                <h3 className="mt-2 font-display text-3xl leading-tight"><Link to="/texas-data/$datasetSlug" params={{ datasetSlug: dataset.slug }} className="hover:text-primary">{dataset.title}</Link></h3>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">{dataset.description}</p>
                <p className="mt-3 text-xs leading-5 text-muted-foreground"><span className="font-semibold text-foreground">Coverage:</span> {dataset.coverage}</p>
              </div>
              <div className="flex flex-col gap-3 text-sm font-semibold md:items-end">
                <Link to="/texas-data/$datasetSlug" params={{ datasetSlug: dataset.slug }} className="border-b border-primary text-primary">Open dataset →</Link>
                <a href={dataset.csvPath} className="border-b border-primary text-primary">Download CSV ↓</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border py-10" aria-labelledby="reference-data-heading">
        <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">More downloadable data</p><h2 id="reference-data-heading" className="mt-2 font-display text-4xl">Existing comparison datasets</h2></div>
          <article className="border-t border-border py-5">
            <p className="eyebrow text-primary">Sports travel · 84 venues</p>
            <h3 className="mt-2 font-display text-3xl">Texas Sports Venue Comparison</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">A source-aligned comparison of verified stadiums, arenas, ballparks, racetracks and other sports destinations. Capacity and opening fields remain blank when the verified profile does not contain a usable value.</p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><Link to={sportsComparisonPath} className="border-b border-primary text-primary">Open comparison →</Link><a href={sportsComparisonCsvPath} className="border-b border-primary text-primary">Download CSV ↓</a></div>
          </article>
        </div>
      </section>

      <section className="py-12" aria-labelledby="figures-heading">
        <div className="border-b border-border pb-4"><p className="eyebrow text-primary">Research briefs</p><h2 id="figures-heading" className="mt-2 font-display text-4xl">Other Texas numbers</h2></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3">{datasets.map((dataset, index) => <Link key={dataset.slug} to="/texas-data/$datasetSlug" params={{ datasetSlug: dataset.slug }} className={`group border-b border-border py-7 sm:px-5 ${index % 3 !== 0 ? 'lg:border-l lg:border-border' : ''}`}><p className="eyebrow text-primary">{editorialLabel(dataset.category)} · {dataset.year}</p><h3 className="mt-2 font-display text-2xl leading-tight group-hover:text-primary">{dataset.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{dataset.description}</p><span className="mt-5 block text-sm font-semibold">Open the data brief →</span></Link>)}</div>
      </section>

      <section className="border-t border-border py-12" aria-labelledby="help-heading"><div className="grid gap-8 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">Use the numbers</p><h2 id="help-heading" className="mt-2 font-display text-4xl">Where to go next</h2></div><div className="grid sm:grid-cols-2">{nextStops.map(([title, to, copy]) => <Link key={to} to={to} className="group border-t border-border py-5 sm:px-5"><h3 className="font-display text-2xl group-hover:text-primary">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p><span className="mt-3 block text-sm font-semibold">Continue →</span></Link>)}</div></div></section>
      <aside className="border-y border-border py-5 text-sm leading-6 text-muted-foreground">TexasDefined uses public and verified information as a starting point for understanding the state. For official decisions, deadlines, eligibility or current event-day details, follow the source links to the responsible agency, venue or organizer.</aside>
    </Container>
  </>;
}
