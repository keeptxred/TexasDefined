import { createLazyFileRoute, Link, Outlet, useRouterState } from '@tanstack/react-router';

import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Container } from '@/components/layout/Container';

import { description, featuredDataProducts, nextStops } from './texas-data';

const editorialLabel = (value: string) => value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase());
const numberFormatter = new Intl.NumberFormat('en-US');
const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export const Route = createLazyFileRoute('/texas-data')({ component: TexasDataRoute });

function TexasDataRoute() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  if (pathname !== '/texas-data' && pathname !== '/texas-data/') return <Outlet />;
  return <Page />;
}

function Page() {
  const { datasets } = Route.useLoaderData();
  const currentPopulation = datasets.find((dataset) => dataset.slug === 'texas-population-and-migration-2025');
  const homeowners = datasets.find((dataset) => dataset.slug === 'texas-homeowners-premium-history');
  const payrolls = datasets.find((dataset) => dataset.slug === 'texas-metro-payrolls-june-2026');

  const population = currentPopulation?.rows.find((row) => row.label.includes('July 1, 2025'))?.value;
  const populationGrowth = currentPopulation?.rows.find((row) => row.label.includes('Numeric population growth'))?.value;
  const domesticMigration = currentPopulation?.rows.find((row) => row.label === 'Net domestic migration')?.value;
  const homeownersPremium = homeowners?.rows.find((row) => row.label === '2025')?.value;
  const dfwPayrolls = payrolls?.rows.find((row) => row.label === 'Dallas–Fort Worth–Arlington')?.value;

  const headlineStats = [
    population ? { value: numberFormatter.format(population), label: 'Texas population', note: 'July 1, 2025 Census estimate', to: '/texas-data/texas-population-and-migration-2025' } : null,
    populationGrowth ? { value: `+${numberFormatter.format(populationGrowth)}`, label: 'Population growth', note: 'July 2024 to July 2025', to: '/texas-data/texas-population-and-migration-2025' } : null,
    domesticMigration ? { value: `+${numberFormatter.format(domesticMigration)}`, label: 'Net domestic migration', note: 'July 2024 to July 2025', to: '/texas-data/texas-population-and-migration-2025' } : null,
    homeownersPremium ? { value: currencyFormatter.format(homeownersPremium), label: 'Average homeowners premium', note: '2025 preliminary statewide average', to: '/texas-data/texas-homeowners-premium-history' } : null,
    dfwPayrolls ? { value: numberFormatter.format(dfwPayrolls), label: 'DFW nonfarm payrolls', note: 'June 2026 preliminary', to: '/texas-data/texas-metro-payrolls-june-2026' } : null,
  ].filter(Boolean) as Array<{ value: string; label: string; note: string; to: string }>;

  const categories = datasets.reduce<Record<string, typeof datasets>>((groups, dataset) => {
    const key = dataset.category;
    groups[key] = [...(groups[key] ?? []), dataset];
    return groups;
  }, {});

  return <>
    <DepartmentHero
      current="Texas Data"
      eyebrow="Texas at a glance"
      title="Texas Data & Statistics"
      description={description}
    />
    <Container className="py-12 sm:py-16">
      {headlineStats.length > 0 && <section aria-labelledby="snapshot-heading" className="border-y border-border">
        <div className="py-6">
          <p className="eyebrow text-primary">Current snapshot</p>
          <h2 id="snapshot-heading" className="mt-2 font-display text-3xl sm:text-4xl">Texas at a glance</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">A few current statewide indicators from the official-source datasets below. Dates matter: each number is labeled with its data vintage rather than presented as a timeless fact.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5">
          {headlineStats.map((stat, index) => <Link key={stat.label} to={stat.to} className={`group border-t border-border py-6 sm:px-5 ${index > 0 ? 'lg:border-l' : ''}`}>
            <p className="font-display text-3xl leading-none sm:text-4xl">{stat.value}</p>
            <h3 className="mt-3 text-sm font-semibold group-hover:text-primary">{stat.label}</h3>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">{stat.note}</p>
          </Link>)}
        </div>
      </section>}

      <section className="py-12" aria-labelledby="featured-heading">
        <div className="border-b border-border pb-4">
          <p className="eyebrow text-primary">Featured data products</p>
          <h2 id="featured-heading" className="mt-2 font-display text-4xl">Compare Texas by county, city and place</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">These larger comparison tools sit alongside the statewide data briefs and are now part of the same Texas Data catalog.</p>
        </div>
        <div className="grid md:grid-cols-2">
          {featuredDataProducts.map((dataset, index) => <article key={dataset.path} className={`border-b border-border py-7 md:px-6 ${index % 2 === 1 ? 'md:border-l' : ''}`}>
            <p className="eyebrow text-primary">{dataset.category}</p>
            <h3 className="mt-2 font-display text-3xl leading-tight"><Link to={dataset.path} className="hover:text-primary">{dataset.title}</Link></h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{dataset.description}</p>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">Source: {dataset.source}</p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
              <Link to={dataset.path} className="border-b border-primary text-primary">Explore dataset →</Link>
              <a href={dataset.csvPath} className="border-b border-primary text-primary">Download CSV ↓</a>
            </div>
          </article>)}
        </div>
      </section>

      <section className="border-y border-border py-12" aria-labelledby="briefs-heading">
        <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
          <div>
            <p className="eyebrow text-primary">Official-source briefs</p>
            <h2 id="briefs-heading" className="mt-2 font-display text-4xl">Explore Texas data by topic</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">Each brief identifies its source, data year, update date and methodology so older statistics are not confused with current ones.</p>
          </div>
          <div className="space-y-10">
            {Object.entries(categories).map(([category, categoryDatasets]) => <section key={category} aria-labelledby={`category-${category.replaceAll(' ', '-').toLowerCase()}`}>
              <div className="border-b border-border pb-3">
                <h3 id={`category-${category.replaceAll(' ', '-').toLowerCase()}`} className="font-display text-3xl">{editorialLabel(category)}</h3>
              </div>
              <div className="grid sm:grid-cols-2">
                {categoryDatasets.map((dataset) => <Link key={dataset.slug} to="/texas-data/$datasetSlug" params={{ datasetSlug: dataset.slug }} className="group border-b border-border py-6 sm:px-5">
                  <p className="eyebrow text-primary">{dataset.year} data · Updated {dataset.updated}</p>
                  <h4 className="mt-2 font-display text-2xl leading-tight group-hover:text-primary">{dataset.title}</h4>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{dataset.description}</p>
                  <span className="mt-4 block text-sm font-semibold">Open data brief →</span>
                </Link>)}
              </div>
            </section>)}
          </div>
        </div>
      </section>

      <section className="py-12" aria-labelledby="county-heading">
        <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
          <div>
            <p className="eyebrow text-primary">Local Texas</p>
            <h2 id="county-heading" className="mt-2 font-display text-4xl">Continue into all 254 counties</h2>
          </div>
          <div className="max-w-3xl">
            <p className="text-base leading-8 text-muted-foreground">Statewide averages can hide large local differences. Use the county directory for local context, then return to county population growth and housing comparisons when you need an apples-to-apples statewide view.</p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
              <Link to="/browse/counties" className="border-b border-primary text-primary">Browse all counties →</Link>
              <Link to="/texas-data/county-growth" className="border-b border-primary text-primary">Compare county growth →</Link>
              <Link to="/texas-data/county-housing-costs" className="border-b border-primary text-primary">Compare housing costs →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-12" aria-labelledby="sources-heading">
        <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
          <div>
            <p className="eyebrow text-primary">Sources & methodology</p>
            <h2 id="sources-heading" className="mt-2 font-display text-4xl">Built from authoritative public data</h2>
          </div>
          <div>
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground">Texas Defined uses sources including the U.S. Census Bureau, U.S. Bureau of Labor Statistics, Texas Comptroller, Texas Department of Insurance and Texas Department of Transportation. Dataset pages identify the responsible source, methodology, data vintage and update date. For official decisions, deadlines, eligibility or current legal requirements, follow the source link to the responsible agency.</p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">A newer publication can supersede an older estimate. Texas Defined keeps historical briefs when they add comparison value, but labels their year and methodology rather than silently presenting old data as current.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-12" aria-labelledby="help-heading">
        <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Use the numbers</p><h2 id="help-heading" className="mt-2 font-display text-4xl">Where to go next</h2></div>
          <div className="grid sm:grid-cols-2">{nextStops.map(([title, to, copy]) => <Link key={to} to={to} className="group border-t border-border py-5 sm:px-5"><h3 className="font-display text-2xl group-hover:text-primary">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p><span className="mt-3 block text-sm font-semibold">Continue →</span></Link>)}</div>
        </div>
      </section>
    </Container>
  </>;
}
