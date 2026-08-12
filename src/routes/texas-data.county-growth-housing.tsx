import { createFileRoute, Link } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CitationTrustPanel } from '@/components/authority/CitationTrustPanel';
import { Container } from '@/components/layout/Container';
import {
  COUNTY_GROWTH_SOURCE,
  COUNTY_HOUSING_SOURCE,
  loadCensusCountyComparison,
  type CensusCountyComparisonRow,
} from '@/data/census-county-comparison';
import { TEXAS_COUNTIES } from '@/data/texas-places';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/texas-data/county-growth-housing';
const description = 'Compare Texas counties using U.S. Census Bureau Vintage 2025 population change and 2024 ACS median home value, gross rent and household income estimates.';
const countySlugByName = new Map(TEXAS_COUNTIES.map((county) => [county.name.replace(/ County$/, ''), county.slug] as const));

export const Route = createFileRoute('/texas-data/county-growth-housing')({
  loader: () => loadCensusCountyComparison(),
  head: ({ loaderData }) => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    const rows = loaderData?.rows ?? [];
    const indexable = Boolean(loaderData?.populationAvailable && loaderData?.housingAvailable && rows.length >= 250);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: 'Texas County Population Growth, Home Values, Rent & Income',
        description,
        robots: indexable ? undefined : 'noindex, follow',
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: indexable ? [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Dataset',
            '@id': `${pageUrl}#population-growth`,
            name: 'Texas County Population Change: 2020 Estimates Base to 2025 Estimate',
            description: 'Texas county population change computed from the Census Population Estimates Program Vintage 2025 county totals.',
            url: pageUrl,
            temporalCoverage: '2020/2025',
            isBasedOn: COUNTY_GROWTH_SOURCE.url,
            measurementTechnique: 'Population change equals the July 1, 2025 population estimate minus the April 1, 2020 estimates base. Percent change divides that difference by the 2020 estimates base.',
            variableMeasured: rows.map((row) => ({
              '@type': 'PropertyValue',
              name: row.county,
              value: row.populationChangePercent,
              unitText: 'percent population change',
            })),
          },
          {
            '@type': 'Dataset',
            '@id': `${pageUrl}#housing-context`,
            name: 'Texas County Housing and Income Context: 2024 ACS 5-Year Estimates',
            description: 'County-level median owner-occupied home value, median gross rent and median household income from the 2024 ACS 5-year estimates.',
            url: pageUrl,
            temporalCoverage: '2024',
            isBasedOn: COUNTY_HOUSING_SOURCE.url,
            measurementTechnique: 'Direct ACS 5-year estimates: B25077_001E median owner-occupied home value, B25064_001E median gross rent, and B19013_001E median household income.',
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') },
              { '@type': 'ListItem', position: 2, name: 'Texas Data', item: absoluteUrl(texasDefinedBrand, '/texas-data') },
              { '@type': 'ListItem', position: 3, name: 'County growth and housing', item: pageUrl },
            ],
          },
        ],
      })] : [],
    };
  },
  component: CountyGrowthHousingPage,
});

function CountyGrowthHousingPage() {
  const data = Route.useLoaderData();
  const byGrowth = [...data.rows].sort((a, b) => b.populationChangePercent - a.populationChangePercent);
  const byHomeValue = [...data.rows]
    .filter((row) => row.medianHomeValue != null)
    .sort((a, b) => (b.medianHomeValue ?? 0) - (a.medianHomeValue ?? 0));

  return (
    <Container className="pb-20 pt-12 sm:pt-16">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground"><Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/texas-data">Texas Data</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page">County growth & housing</span></nav>
      <header className="py-10">
        <p className="eyebrow text-primary">Census county comparison</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas county population growth, home values, rent and income</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">Compare all available Texas counties using two official Census products. Population change uses the Vintage 2025 Population Estimates Program. Housing and income fields use 2024 American Community Survey 5-year estimates. They are different datasets with different reference periods and should not be blended into a single “best county” score.</p>
      </header>

      {data.warnings.length ? <aside className="mb-8 rounded-md border border-amber-300 bg-amber-50 p-5 text-sm leading-6 text-amber-950"><strong>Source availability notice.</strong><ul className="mt-2 list-disc space-y-1 pl-5">{data.warnings.map((warning) => <li key={warning}>{warning}</li>)}</ul><p className="mt-2">Unavailable fields are not estimated or filled from a secondary source.</p></aside> : null}

      <section aria-labelledby="population-growth-heading" className="border-t-2 border-foreground pt-8">
        <p className="eyebrow text-primary">Batch 2.11 · population & growth</p>
        <h2 id="population-growth-heading" className="mt-2 font-display text-4xl">2020 estimates base → 2025 population estimate</h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Growth is calculated within the Census Population Estimates series: July 1, 2025 estimate minus the April 1, 2020 estimates base. This is not a comparison between a decennial Census count and an unrelated current estimate.</p>
        {data.populationAvailable ? <CountyGrowthTable rows={byGrowth} /> : <Unavailable message="The official Vintage 2025 county file could not be loaded for this request." />}
      </section>

      <section aria-labelledby="housing-context-heading" className="mt-14 border-t-2 border-foreground pt-8">
        <p className="eyebrow text-primary">Batch 2.12 · cost & property context</p>
        <h2 id="housing-context-heading" className="mt-2 font-display text-4xl">2024 ACS housing value, gross rent and household income</h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">These are ACS 5-year statistical estimates, not current listing prices, appraisals or asking rents. Median home value applies to owner-occupied housing units; median gross rent and median household income measure different populations. Use the fields as county context, not a household budget or affordability verdict.</p>
        {data.housingAvailable ? <HousingContextTable rows={byHomeValue} /> : <Unavailable message="The official 2024 ACS county fields could not be loaded for this request." />}
      </section>

      <CitationTrustPanel
        className="mt-12"
        sources={[
          { name: COUNTY_GROWTH_SOURCE.name, url: COUNTY_GROWTH_SOURCE.url, note: COUNTY_GROWTH_SOURCE.coverage },
          { name: COUNTY_HOUSING_SOURCE.name, url: COUNTY_HOUSING_SOURCE.url, note: 'ACS variables B25077_001E, B25064_001E and B19013_001E.' },
        ]}
        methodology="Texas Defined joins the two official Census sources by five-digit county FIPS. Population growth is derived only from the Population Estimates series. Housing and income values are direct ACS estimates. Missing, negative Census sentinel values or failed source responses remain unavailable; no secondary values are substituted."
        lastVerified={`Official data fetched during this request at ${formatFetchTime(data.fetchedAt)}. Source vintages remain 2025 PEP and 2024 ACS 5-year estimates.`}
        title="County growth and housing sources and methodology"
      />
    </Container>
  );
}

function CountyGrowthTable({ rows }: { rows: CensusCountyComparisonRow[] }) {
  return <div className="mt-6 overflow-x-auto border-y border-border"><table className="w-full min-w-[760px] text-left text-sm"><thead><tr className="border-b border-border bg-surface text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground"><th className="px-4 py-3">County</th><th className="px-4 py-3">2020 estimates base</th><th className="px-4 py-3">2025 estimate</th><th className="px-4 py-3">Change</th><th className="px-4 py-3">Percent change</th><th className="px-4 py-3">County guide</th></tr></thead><tbody className="divide-y divide-border">{rows.map((row) => <tr key={row.fips}><td className="px-4 py-4 font-display text-lg font-semibold">{row.county} County</td><td className="px-4 py-4 tabular-nums">{row.populationBase2020.toLocaleString('en-US')}</td><td className="px-4 py-4 tabular-nums">{row.populationEstimate2025.toLocaleString('en-US')}</td><td className="px-4 py-4 tabular-nums">{signedNumber(row.populationChange)}</td><td className="px-4 py-4 tabular-nums font-semibold">{signedPercent(row.populationChangePercent)}</td><td className="px-4 py-4">{countyLink(row.county)}</td></tr>)}</tbody></table></div>;
}

function HousingContextTable({ rows }: { rows: CensusCountyComparisonRow[] }) {
  return <div className="mt-6 overflow-x-auto border-y border-border"><table className="w-full min-w-[860px] text-left text-sm"><thead><tr className="border-b border-border bg-surface text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground"><th className="px-4 py-3">County</th><th className="px-4 py-3">Median home value</th><th className="px-4 py-3">Median gross rent</th><th className="px-4 py-3">Median household income</th><th className="px-4 py-3">Home value ÷ income</th><th className="px-4 py-3">Property guide</th></tr></thead><tbody className="divide-y divide-border">{rows.map((row) => <tr key={row.fips}><td className="px-4 py-4 font-display text-lg font-semibold">{row.county} County</td><td className="px-4 py-4 tabular-nums">{money(row.medianHomeValue)}</td><td className="px-4 py-4 tabular-nums">{money(row.medianGrossRent)}</td><td className="px-4 py-4 tabular-nums">{money(row.medianHouseholdIncome)}</td><td className="px-4 py-4 tabular-nums">{ratio(row)}</td><td className="px-4 py-4">{propertyLink(row.county)}</td></tr>)}</tbody></table></div>;
}

function countyLink(county: string) {
  const slug = countySlugByName.get(county);
  return slug ? <Link to="/$kind/$slug" params={{ kind: 'county', slug }} className="font-semibold text-primary hover:underline">County guide →</Link> : <span className="text-muted-foreground">Guide match pending</span>;
}

function propertyLink(county: string) {
  const slug = countySlugByName.get(county);
  return slug ? <Link to="/property-tax/county/$county" params={{ county: slug }} className="font-semibold text-primary hover:underline">Property-tax guide →</Link> : <span className="text-muted-foreground">Guide match pending</span>;
}

function ratio(row: CensusCountyComparisonRow) {
  if (!row.medianHomeValue || !row.medianHouseholdIncome) return 'Unavailable';
  return `${(row.medianHomeValue / row.medianHouseholdIncome).toFixed(1)}×`;
}

function money(value: number | null) {
  return value == null ? 'Unavailable' : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

function signedNumber(value: number) {
  const formatted = Math.abs(value).toLocaleString('en-US');
  return value > 0 ? `+${formatted}` : value < 0 ? `−${formatted}` : '0';
}

function signedPercent(value: number) {
  const formatted = Math.abs(value).toFixed(1);
  return value > 0 ? `+${formatted}%` : value < 0 ? `−${formatted}%` : '0.0%';
}

function formatFetchTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }).format(date);
}

function Unavailable({ message }: { message: string }) {
  return <div className="mt-6 rounded-md border border-amber-300 bg-amber-50 p-5 text-sm leading-6 text-amber-950">{message} No fallback estimate is shown.</div>;
}
