import { createFileRoute, Link } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Container } from '@/components/layout/Container';
import { loadTexasCountyHousingCosts } from '@/data/acs-county-housing-costs';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/texas-data/county-housing-costs';
const description = 'Compare Texas counties using official 2020–2024 American Community Survey 5-year estimates for median home value, gross rent, monthly owner costs and household income.';

export const Route = createFileRoute('/texas-data/county-housing-costs')({
  loader: () => loadTexasCountyHousingCosts(),
  head: ({ loaderData }) => {
    const modified = loaderData?.generatedAt?.slice(0, 10) || '2026-01-29';
    return {
      meta: [
        ...buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas County Housing Costs | Home Values, Rent & Income', description }),
        { name: 'robots', content: loaderData?.available ? 'index, follow, max-image-preview:large' : 'noindex, follow' },
      ],
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: loaderData?.available ? [jsonLd({
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        name: 'Texas County Housing Costs — 2020–2024 ACS',
        description,
        url: absoluteUrl(texasDefinedBrand, canonicalPath),
        dateModified: modified,
        temporalCoverage: '2020/2024',
        creator: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
        isBasedOn: loaderData.sourcePage,
        variableMeasured: ['median household income', 'median owner-occupied home value', 'median gross rent', 'median selected monthly owner costs'],
        distribution: {
          '@type': 'DataDownload',
          encodingFormat: 'text/csv',
          contentUrl: absoluteUrl(texasDefinedBrand, '/texas-data/county-housing-costs.csv'),
        },
      })] : [],
    };
  },
  component: Page,
});

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

function Page() {
  const data = Route.useLoaderData();
  const rows = [...data.rows].sort((a, b) => a.countyName.localeCompare(b.countyName));
  const verified = data.generatedAt ? new Date(data.generatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Awaiting first official snapshot refresh';

  return <>
    <DepartmentHero current="County Housing Costs" eyebrow="Texas Data" title="Texas county housing costs, rent and income" description={description} tone="surface" />
    <Container className="py-12 sm:py-16">
      {!data.available ? (
        <section className="border-y border-border py-8" aria-live="polite">
          <p className="eyebrow text-primary">Source refresh in progress</p>
          <h2 className="mt-3 font-display text-3xl">The official Census snapshot is being prepared</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">This page stays out of search results until the maintained snapshot contains near-complete Texas county coverage. Texas Defined does not publish partial county rankings as if they were complete.</p>
        </section>
      ) : (
        <>
          <section className="grid gap-6 border-y border-border py-7 md:grid-cols-3" aria-label="Dataset notes">
            <div><p className="eyebrow text-primary">Source</p><p className="mt-2 text-sm leading-6">U.S. Census Bureau · {data.release}</p></div>
            <div><p className="eyebrow text-primary">Methodology</p><p className="mt-2 text-sm leading-6">Four ACS Detailed Tables are joined by county FIPS. Values are medians, not quotes, offers or forecasts.</p></div>
            <div><p className="eyebrow text-primary">Last verified</p><p className="mt-2 text-sm leading-6">{verified} · {rows.length} Texas counties</p></div>
          </section>

          <section className="py-10" aria-labelledby="comparison-heading">
            <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div><p className="eyebrow text-primary">County comparison</p><h2 id="comparison-heading" className="mt-2 font-display text-4xl">Housing and household cost context</h2></div>
              <a href="/texas-data/county-housing-costs.csv" className="text-sm font-semibold text-primary underline underline-offset-4">Download CSV</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[780px] border-collapse text-left text-sm">
                <caption className="sr-only">Texas county median home value, rent, monthly owner costs and household income from the 2020–2024 ACS 5-year estimates.</caption>
                <thead><tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground"><th scope="col" className="py-4 pr-4">County</th><th scope="col" className="px-4 py-4 text-right">Home value</th><th scope="col" className="px-4 py-4 text-right">Gross rent</th><th scope="col" className="px-4 py-4 text-right">Owner costs</th><th scope="col" className="pl-4 py-4 text-right">Household income</th></tr></thead>
                <tbody>{rows.map((row) => <tr key={row.fips} className="border-b border-border/70"><th scope="row" className="py-4 pr-4 font-medium"><Link to="/county/$slug" params={{ slug: row.countySlug }} className="hover:text-primary">{row.countyName}</Link></th><td className="px-4 py-4 text-right tabular-nums">{currency.format(row.medianHomeValue)}</td><td className="px-4 py-4 text-right tabular-nums">{currency.format(row.medianGrossRent)}</td><td className="px-4 py-4 text-right tabular-nums">{currency.format(row.medianMonthlyOwnerCosts)}</td><td className="pl-4 py-4 text-right tabular-nums">{currency.format(row.medianHouseholdIncome)}</td></tr>)}</tbody>
              </table>
            </div>
          </section>

          <aside className="border-y border-border py-6 text-sm leading-7 text-muted-foreground">
            <p><strong className="text-foreground">What these numbers mean:</strong> ACS medians summarize survey estimates for each county. Median selected monthly owner costs include the owner-cost components captured by Census and should not be treated as a mortgage quote. Gross rent is not the same as asking rent for a currently available unit. Use the county pages and current local sources for decisions about a specific property.</p>
            <p className="mt-3"><a href={data.sourcePage} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Open the official Census ACS Summary File source</a>.</p>
          </aside>
        </>
      )}
    </Container>
  </>;
}
