import { createLazyFileRoute, Link, Outlet, useRouterState } from '@tanstack/react-router';

import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Container } from '@/components/layout/Container';
import { TEXASDEFINED_RESEARCH_BRIEFS } from '@/data/original-research';

import { description, nextStops, sportsComparisonCsvPath, sportsComparisonPath } from './texas-data';

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
      <aside className="max-w-3xl border-y border-border py-5 text-sm leading-7 text-muted-foreground"><p className="eyebrow text-primary">About the data</p><p className="mt-3">Public and verified reference data is most useful when it has context. TexasDefined also publishes original calculations from maintained or authoritative datasets. Each research brief includes the full comparable result, methodology, source links, a CSV download and a stable citation URL.</p></aside>

      <section className="py-12" aria-labelledby="research-heading">
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-border pb-4"><div><p className="eyebrow text-primary">TexasDefined Research</p><h2 id="research-heading" className="mt-2 font-display text-4xl">Original calculations from Texas data</h2></div><Link to="/texas-data/research" className="text-sm font-semibold text-primary underline underline-offset-4">Research standards & all briefs →</Link></div>
        <div className="grid lg:grid-cols-3">{TEXASDEFINED_RESEARCH_BRIEFS.map((brief, index) => <article key={brief.slug} className={`border-b border-border py-7 lg:px-6 ${index > 0 ? 'lg:border-l' : ''}`}><p className="eyebrow text-primary">{editorialLabel(brief.domain)}</p><h3 className="mt-2 font-display text-3xl leading-tight">{brief.title}</h3><p className="mt-3 text-sm font-semibold leading-6">{brief.question}</p><p className="mt-3 text-sm leading-7 text-muted-foreground">{brief.description}</p><div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold"><a href={brief.path} className="text-primary underline underline-offset-4">Open research →</a><a href={brief.csvPath} className="underline underline-offset-4">CSV ↓</a></div></article>)}</div>
      </section>

      <section className="py-12" aria-labelledby="figures-heading"><div className="border-b border-border pb-4"><p className="eyebrow text-primary">Reference data</p><h2 id="figures-heading" className="mt-2 font-display text-4xl">A closer look at the numbers</h2></div><div className="grid sm:grid-cols-2 lg:grid-cols-3">{datasets.map((dataset, index) => <Link key={dataset.slug} to="/texas-data/$datasetSlug" params={{ datasetSlug: dataset.slug }} className={`group border-b border-border py-7 sm:px-5 ${index % 3 !== 0 ? 'lg:border-l lg:border-border' : ''}`}><p className="eyebrow text-primary">{editorialLabel(dataset.category)} · {dataset.year}</p><h3 className="mt-2 font-display text-2xl leading-tight group-hover:text-primary">{dataset.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{dataset.description}</p><span className="mt-5 block text-sm font-semibold">Open the data brief →</span></Link>)}</div></section>
      <section className="border-y border-border py-10" aria-labelledby="reference-data-heading"><div className="grid gap-8 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">Reference datasets</p><h2 id="reference-data-heading" className="mt-2 font-display text-4xl">Data from across Texas Defined</h2></div><article className="border-t border-border py-5"><p className="eyebrow text-primary">Sports travel · 84 venues</p><h3 className="mt-2 font-display text-3xl">Texas Sports Venue Comparison</h3><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">A source-aligned comparison of verified stadiums, arenas, ballparks, racetracks and other sports destinations. Capacity and opening fields remain blank when the verified profile does not contain a usable value.</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><Link to={sportsComparisonPath} className="border-b border-primary text-primary">Open comparison →</Link><a href={sportsComparisonCsvPath} className="border-b border-primary text-primary">Download CSV ↓</a></div></article></div></section>
      <section className="border-t border-border py-12" aria-labelledby="help-heading"><div className="grid gap-8 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">Use the numbers</p><h2 id="help-heading" className="mt-2 font-display text-4xl">Where to go next</h2></div><div className="grid sm:grid-cols-2">{nextStops.map(([title, to, copy]) => <Link key={to} to={to} className="group border-t border-border py-5 sm:px-5"><h3 className="font-display text-2xl group-hover:text-primary">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p><span className="mt-3 block text-sm font-semibold">Continue →</span></Link>)}</div></div></section>
      <aside className="border-y border-border py-5 text-sm leading-6 text-muted-foreground">Texas Defined uses public and verified information as a starting point for understanding the state. For official decisions, deadlines, eligibility or current event-day details, follow the source links to the responsible agency, venue or organizer.</aside>
    </Container>
  </>;
}
