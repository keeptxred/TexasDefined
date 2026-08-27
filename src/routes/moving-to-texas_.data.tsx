import { createFileRoute, Link } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import {
  RELOCATION_METROS,
  RELOCATION_SOURCES,
  RELOCATION_SOURCE_VERIFIED,
} from '@/data/relocation-authority';
import { TEXAS_DATASETS, formatDatasetValue } from '@/data/texas-data-center';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/moving-to-texas/data';
const description = 'A source-backed Texas relocation data center for migration, jobs, homeowners insurance, traffic, county research and the practical numbers behind a move to Texas.';
const tdiCountyLossesUrl = 'https://www.tdi.texas.gov/consumer/homeowners-losses-by-county.html';
const relocationDatasetSlugs = [
  'texas-population-and-migration-2025',
  'texas-population-and-migration-2024',
  'where-new-texans-came-from-2024',
  'texas-homeowners-premium-history',
  'texas-metro-payrolls-june-2026',
  'texas-traffic-monitoring-coverage',
] as const;
const relocationDatasets = relocationDatasetSlugs
  .map((slug) => TEXAS_DATASETS.find((dataset) => dataset.slug === slug))
  .filter((dataset): dataset is (typeof TEXAS_DATASETS)[number] => Boolean(dataset));
const quickStats = [
  ['Texas population', 'texas-population-and-migration-2025', 'Texas population — July 1, 2025'],
  ['Net domestic migration', 'texas-population-and-migration-2025', 'Net domestic migration'],
  ['2025 average homeowners premium', 'texas-homeowners-premium-history', '2025'],
  ['DFW nonfarm payrolls', 'texas-metro-payrolls-june-2026', 'Dallas–Fort Worth–Arlington'],
] as const;

export const Route = createFileRoute('/moving-to-texas/data')({
  head: () => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: 'Texas Relocation Data Center: Migration, Jobs, Insurance & More',
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': ['CollectionPage', 'DataCatalog'],
            '@id': `${pageUrl}#page`,
            url: pageUrl,
            name: 'Texas Relocation Data Center',
            description,
            publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            isPartOf: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#website` },
            dataset: relocationDatasets.map((dataset) => ({
              '@type': 'Dataset',
              '@id': `${absoluteUrl(texasDefinedBrand, `/texas-data/${dataset.slug}`)}#dataset`,
              name: dataset.title,
              description: dataset.description,
              url: absoluteUrl(texasDefinedBrand, `/texas-data/${dataset.slug}`),
              dateModified: dataset.updated,
              temporalCoverage: String(dataset.year),
              creator: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            })),
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${pageUrl}#breadcrumb`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') },
              { '@type': 'ListItem', position: 2, name: 'Moving to Texas', item: absoluteUrl(texasDefinedBrand, '/moving-to-texas') },
              { '@type': 'ListItem', position: 3, name: 'Relocation Data Center', item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
  component: RelocationDataCenterPage,
});

function RelocationDataCenterPage() {
  return <Container className="pb-16 pt-10 sm:pb-24 sm:pt-14">
    <main className="mx-auto max-w-7xl">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Front page</Link><span aria-hidden="true" className="mx-2">/</span>
        <Link to="/moving-to-texas" className="hover:text-foreground">Moving to Texas</Link><span aria-hidden="true" className="mx-2">/</span>
        <span aria-current="page" className="text-foreground">Relocation Data Center</span>
      </nav>

      <header className="border-b border-border py-10 sm:py-14">
        <p className="eyebrow text-primary">Texas relocation reference system</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">The data behind a move to Texas</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground sm:text-xl">{description}</p>
        <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">Texas Defined keeps these datasets separate because population estimates, migration flows, insurance records, payroll employment and traffic monitoring answer different questions and update on different schedules. They should inform a move, not be collapsed into a hidden “best city” score.</p>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">The current statewide population brief uses Census Vintage 2025. The retained 2024 brief is restated on that same vintage so historical comparisons do not mix superseded Census series.</p>
        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickStats.map(([label, slug, rowLabel]) => <QuickStat key={label} label={label} slug={slug} rowLabel={rowLabel} />)}
        </dl>
        <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold">
          <Link to="/moving-to-texas" className="text-primary underline underline-offset-4">Open the relocation guide →</Link>
          <a href="/moving-to-texas#address-research-desk" className="underline underline-offset-4">Research an exact address</a>
          <Link to="/texas-data" className="underline underline-offset-4">Open the full Texas Data Desk</Link>
        </div>
      </header>

      <section className="border-b border-border py-12" aria-labelledby="relocation-datasets-heading">
        <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
          <div>
            <p className="eyebrow text-primary">Core relocation datasets</p>
            <h2 id="relocation-datasets-heading" className="mt-2 font-display text-4xl leading-tight">Use the right dataset for the question</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">Each brief publishes its source, methodology, data vintage and limits. Open the underlying brief before turning a statewide number into a local conclusion.</p>
          </div>
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
            {relocationDatasets.map((dataset) => <Link key={dataset.slug} to="/texas-data/$datasetSlug" params={{ datasetSlug: dataset.slug }} className="group bg-background p-5">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-primary">{dataset.category} · {dataset.year}</p>
              <h3 className="mt-2 font-display text-2xl leading-tight group-hover:text-primary">{dataset.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{dataset.description}</p>
              <p className="mt-4 text-xs font-semibold text-foreground">Updated {formatDate(dataset.updated)} · {dataset.sourceName}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">Open data brief →</span>
            </Link>)}
          </div>
        </div>
      </section>

      <section className="border-b border-border py-12" aria-labelledby="insurance-county-heading">
        <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
          <div>
            <p className="eyebrow text-primary">County-level insurance research</p>
            <h2 id="insurance-county-heading" className="mt-2 font-display text-4xl leading-tight">A statewide average is not a local quote</h2>
          </div>
          <div className="max-w-4xl space-y-5 text-sm leading-7 text-muted-foreground">
            <p>The Texas Department of Insurance now publishes county-level homeowners premium information from 2019 through preliminary 2025 data, plus a separate county losses tool. Use those official county views to compare the counties in a metro before requesting address-specific quotes.</p>
            <p>Coastal research needs extra care. TDI notes that TWIA wind coverage can apply in 14 coastal counties and parts of Harris County, so a homeowners premium that excludes wind is not directly comparable with an inland policy that includes wind.</p>
            <div className="flex flex-wrap gap-x-7 gap-y-3 font-semibold">
              <a href={RELOCATION_SOURCES.tdiInsurance.url} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">TDI county premium map ↗</a>
              <a href={tdiCountyLossesUrl} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">TDI homeowners losses by county ↗</a>
              <Link to="/texas-home-insurance-calculator" className="underline underline-offset-4">Run the planning calculator →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-12" aria-labelledby="metro-data-heading">
        <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
          <div>
            <p className="eyebrow text-primary">Major metro research</p>
            <h2 id="metro-data-heading" className="mt-2 font-display text-4xl leading-tight">Take the statewide data down to the place</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">The metro guides connect these datasets to the counties, suburbs, job market and repeated commute that actually shape a relocation decision.</p>
          </div>
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 xl:grid-cols-3">
            {RELOCATION_METROS.map((metro) => <article key={metro.id} className="bg-background p-5">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-primary">Metro relocation guide</p>
              <h3 className="mt-2 font-display text-2xl">{metro.name}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Counties: {metro.counties.join(', ')}</p>
              {metro.jobCountJune2026 ? <p className="mt-2 text-sm leading-6 text-muted-foreground">June 2026 nonfarm payrolls: {metro.jobCountJune2026.toLocaleString()} · BLS preliminary</p> : null}
              <a href={metro.guideHref} className="mt-5 inline-block text-sm font-semibold text-primary underline underline-offset-4">Open metro guide →</a>
            </article>)}
          </div>
        </div>
      </section>

      <section className="border-b border-border py-12" aria-labelledby="source-method-heading">
        <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
          <div>
            <p className="eyebrow text-primary">Primary-source method</p>
            <h2 id="source-method-heading" className="mt-2 font-display text-4xl leading-tight">What to verify before you decide</h2>
          </div>
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
            {[
              RELOCATION_SOURCES.censusPopulation,
              RELOCATION_SOURCES.censusMigration,
              RELOCATION_SOURCES.censusCountyMigration,
              RELOCATION_SOURCES.blsMetro,
              RELOCATION_SOURCES.tdiInsurance,
              RELOCATION_SOURCES.teaSchools,
              RELOCATION_SOURCES.comptrollerProperty,
              RELOCATION_SOURCES.txdotTraffic,
              RELOCATION_SOURCES.pucUtilities,
              RELOCATION_SOURCES.femaFlood,
            ].map((source) => <article key={source.url} className="bg-background p-5">
              <h3 className="font-display text-xl">{source.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{source.purpose}</p>
              <p className="mt-3 text-xs font-semibold text-foreground">Coverage: {source.freshness}</p>
              <a href={source.url} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">Official source ↗</a>
            </article>)}
          </div>
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Relocation source registry verified {RELOCATION_SOURCE_VERIFIED}</p>
      </section>

      <section className="py-12" aria-labelledby="relocation-actions-heading">
        <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
          <div><p className="eyebrow text-primary">Turn research into a move</p><h2 id="relocation-actions-heading" className="mt-2 font-display text-4xl leading-tight">Run the household numbers next</h2></div>
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
            {[
              ['/texas-cost-of-living-calculator', 'Compare cost of living', 'Put recurring household expenses beside the place you are considering.'],
              ['/texas-salary-comparison-by-city', 'Compare salary by city', 'Translate salary context across Texas cities without treating it as a job offer.'],
              ['/texas-homeownership-cost-calculator', 'Model homeownership cost', 'Combine mortgage, taxes, insurance, utilities, maintenance and fees.'],
              ['/moving-to-texas-checklist', 'Use the moving checklist', 'Move from research to driver, vehicle, school, property and arrival tasks with official-source links.'],
            ].map(([to, title, copy]) => <Link key={to} to={to} className="group bg-background p-5">
              <h3 className="font-display text-2xl group-hover:text-primary">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">Continue →</span>
            </Link>)}
          </div>
        </div>
      </section>
    </main>
  </Container>;
}

function QuickStat({ label, slug, rowLabel }: { label: string; slug: string; rowLabel: string }) {
  const dataset = TEXAS_DATASETS.find((item) => item.slug === slug);
  const row = dataset?.rows.find((item) => item.label === rowLabel);
  return <div className="border-t border-border pt-3">
    <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
    <dd className="mt-2 font-display text-3xl leading-tight">{dataset && row ? formatDatasetValue(row.value, dataset.unit) : 'See data brief'}</dd>
  </div>;
}

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(date);
}
