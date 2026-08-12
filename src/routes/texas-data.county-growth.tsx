import { createFileRoute, Link } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { CitationTrustPanel } from '@/components/authority/CitationTrustPanel';
import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Container } from '@/components/layout/Container';
import { loadTexasCountyGrowth } from '@/data/census-county-growth';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/texas-data/county-growth';
const description = 'Compare population change across Texas counties from the U.S. Census Bureau Vintage 2025 estimates base to the July 1, 2025 population estimate.';

export const Route = createFileRoute('/texas-data/county-growth')({
  loader: () => loadTexasCountyGrowth(),
  head: ({ loaderData }) => ({
    meta: [
      ...buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas County Population Growth — 2020 to 2025', description }),
      { name: 'robots', content: loaderData?.available ? 'index, follow, max-image-preview:large' : 'noindex, follow' },
    ],
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: loaderData?.available ? [jsonLd({
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: 'Texas County Population Growth — 2020 to 2025',
      description,
      url: absoluteUrl(texasDefinedBrand, canonicalPath),
      dateModified: '2026-03-17',
      temporalCoverage: '2020/2025',
      creator: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
      isBasedOn: loaderData.sourceFileUrl,
      variableMeasured: ['2020 population estimates base', '2025 population estimate', 'population change', 'population change percent'],
    })] : [],
  }),
  component: Page,
});

function Page() {
  const data = Route.useLoaderData();
  const fastest = data.rows.slice().sort((a, b) => b.populationChangePercent - a.populationChangePercent);
  const largest = data.rows.slice().sort((a, b) => b.populationChange - a.populationChange);

  return <>
    <DepartmentHero current="County Growth" eyebrow="Texas Data" title="Texas county population growth, 2020–2025" description={description} tone="surface" />
    <Container className="py-12 sm:py-16">
      {!data.available ? <div className="border-y border-border py-10"><h2 className="font-display text-3xl">Official Census source temporarily unavailable</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Texas Defined does not publish a partial ranking when the current Vintage 2025 county file cannot be loaded. Use the linked Census source directly and return here after the source recovers.</p></div> : <>
        <section className="border-y border-border py-8"><p className="eyebrow text-primary">Direct answer</p><h2 className="mt-2 font-display text-4xl">Growth is measured from the Census 2020 estimates base to July 1, 2025</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">This is a population-estimate comparison, not a forecast. The percent change is calculated from the Census Bureau's Vintage 2025 county estimates base and July 1, 2025 estimate for each Texas county.</p></section>
        <GrowthTable title="Fastest percentage growth" rows={fastest.slice(0, 40)} />
        <GrowthTable title="Largest numeric population gains" rows={largest.slice(0, 40)} />
      </>}

      <CitationTrustPanel
        className="mt-12"
        title="County growth sources"
        sources={[{ name: 'U.S. Census Bureau — Population Estimates Program', url: data.sourceUrl, note: 'Official county population estimates and release tables.' }, { name: 'Vintage 2025 county totals CSV', url: data.sourceFileUrl, note: 'Direct source file used for this comparison.' }]}
        methodology="Texas Defined reads the official Census Vintage 2025 county totals file, keeps Texas county records, and calculates numeric and percentage change from ESTIMATESBASE2020 to POPESTIMATE2025. Counties with missing or invalid source values are omitted; the page is noindex if a near-complete Texas county set is unavailable. No secondary population source is substituted."
        lastVerified="Source release: Vintage 2025 county population estimates, released March 17, 2026. Page source integration reviewed August 11, 2026."
      />
    </Container>
  </>;
}

function GrowthTable({ title, rows }: { title: string; rows: Awaited<ReturnType<typeof loadTexasCountyGrowth>>['rows'] }) {
  return <section className="mt-12"><h2 className="font-display text-4xl">{title}</h2><div className="mt-5 overflow-x-auto border-y border-border"><table className="w-full min-w-[780px] border-collapse text-left text-sm"><thead><tr className="border-b border-border bg-surface text-xs uppercase tracking-wide text-muted-foreground"><th className="px-4 py-3">County</th><th className="px-4 py-3">2020 base</th><th className="px-4 py-3">2025 estimate</th><th className="px-4 py-3">Change</th><th className="px-4 py-3">Change %</th><th className="px-4 py-3">County guide</th></tr></thead><tbody className="divide-y divide-border">{rows.map((row) => <tr key={row.fips}><td className="px-4 py-4 font-semibold">{row.countyName}</td><td className="px-4 py-4 tabular-nums">{row.populationBase2020.toLocaleString('en-US')}</td><td className="px-4 py-4 tabular-nums">{row.populationEstimate2025.toLocaleString('en-US')}</td><td className="px-4 py-4 tabular-nums">{signed(row.populationChange)}</td><td className="px-4 py-4 tabular-nums">{signedPercent(row.populationChangePercent)}</td><td className="px-4 py-4"><Link to="/$kind/$slug" params={{ kind: 'county', slug: slug(row.countyName) }} className="font-semibold text-primary hover:underline">Open →</Link></td></tr>)}</tbody></table></div></section>;
}

function signed(value: number) { return `${value >= 0 ? '+' : ''}${value.toLocaleString('en-US')}`; }
function signedPercent(value: number) { return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`; }
function slug(value: string) { return value.replace(/ County,? Texas$/i, '').replace(/ County$/i, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
