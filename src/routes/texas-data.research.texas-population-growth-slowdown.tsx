import { createFileRoute, Link } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/texas-data/research/texas-population-growth-slowdown';
const sourceUrl = 'https://www.census.gov/data/datasets/time-series/demo/popest/2020s-state-total.html';
const countySourceUrl = 'https://www.census.gov/data/datasets/time-series/demo/popest/2020s-counties-total.html';
const verified = '2026-10-03';
const rows = [
  { measure: 'Numeric population growth', prior: 598297, current: 391243, change: -207054, pct: -34.6072268455 },
  { measure: 'Net domestic migration', prior: 86067, current: 67299, change: -18768, pct: -21.8062672104 },
  { measure: 'Net international migration', prior: 354864, current: 167475, change: -187389, pct: -52.8058636548 },
  { measure: 'Natural increase', prior: 157366, current: 157711, change: 345, pct: 0.2192341421 },
];
const description = 'TexasDefined Research calculates how much Texas population growth slowed in 2024–2025 versus 2023–2024 using one consistent U.S. Census Bureau Vintage 2025 series.';

export const Route = createFileRoute('/texas-data/research/texas-population-growth-slowdown')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'How Much Did Texas Population Growth Slow in 2025?', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org', '@type': 'Dataset',
      name: 'Texas population growth slowdown, 2023–2025 — Vintage 2025', description,
      url: absoluteUrl(texasDefinedBrand, canonicalPath), dateModified: verified,
      temporalCoverage: '2023-07-01/2025-07-01', spatialCoverage: { '@type': 'Place', name: 'Texas' },
      creator: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
      publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
      isBasedOn: sourceUrl,
      variableMeasured: ['numeric population growth', 'net domestic migration', 'net international migration', 'natural increase', 'absolute change', 'percentage change'],
      distribution: { '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: absoluteUrl(texasDefinedBrand, '/texas-data/research/texas-population-growth-slowdown.csv') },
      measurementTechnique: 'TexasDefined Research Desk calculation from U.S. Census Bureau Vintage 2025 annual state population estimates and components of change; both comparison periods use the same vintage.',
    })],
  }), component: Page,
});

function Page() {
  return <><DepartmentHero current="Research" eyebrow="TexasDefined Research" title="How much did Texas population growth slow in 2025?" description={description} tone="surface" />
    <Container className="py-12 sm:py-16">
      <section className="border-y border-border py-8"><p className="eyebrow text-primary">Key finding</p><h2 className="mt-2 max-w-5xl font-display text-4xl">Texas added 391,243 residents in 2024–2025 — 207,054 fewer than a year earlier.</h2><p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">That is a <strong>34.6% decline in the annual numeric gain</strong>, from 598,297 in 2023–2024 to 391,243 in 2024–2025. The largest component change was net international migration, down 187,389, or 52.8%. Natural increase was essentially flat, up 345, or 0.2%. These are changes in annual net components, not counts of everyone who moved.</p><a href="/texas-data/research/texas-population-growth-slowdown.csv" className="mt-5 inline-block border-b border-primary font-semibold text-primary">Download CSV →</a></section>
      <section className="mt-12"><h2 className="font-display text-4xl">Complete comparison</h2><div className="mt-5 overflow-x-auto border-y border-border"><table className="w-full min-w-[760px] text-left text-sm"><thead><tr className="border-b border-border bg-surface text-xs uppercase tracking-wide text-muted-foreground"><th className="px-4 py-3">Measure</th><th className="px-4 py-3">2023–24</th><th className="px-4 py-3">2024–25</th><th className="px-4 py-3">Absolute change</th><th className="px-4 py-3">Percent change</th></tr></thead><tbody className="divide-y divide-border">{rows.map(r => <tr key={r.measure}><td className="px-4 py-4 font-semibold">{r.measure}</td><td className="px-4 py-4 tabular-nums">{r.prior.toLocaleString()}</td><td className="px-4 py-4 tabular-nums">{r.current.toLocaleString()}</td><td className="px-4 py-4 tabular-nums">{signed(r.change)}</td><td className="px-4 py-4 tabular-nums">{signedPct(r.pct)}</td></tr>)}</tbody></table></div><p className="mt-3 text-xs leading-6 text-muted-foreground">Percentage change = (2024–25 value − 2023–24 value) ÷ 2023–24 value. Values are not mixed across Census vintages.</p></section>
      <section className="mt-12 grid gap-8 lg:grid-cols-2"><div><h2 className="font-display text-3xl">Chart specification</h2><p className="mt-3 text-sm leading-7 text-muted-foreground"><strong>Grouped bars:</strong> four measure groups, with 2023–24 and 2024–25 bars side by side. Label exact values; do not place the component rows on a stacked chart because Census revisions/residuals mean the displayed components should not be presented as an exact arithmetic decomposition of total growth. A second slope or delta chart may show the absolute and percentage changes.</p></div><div><h2 className="font-display text-3xl">CSV structure</h2><p className="mt-3 text-sm leading-7 text-muted-foreground"><code>measure,period_2023_24,period_2024_25,absolute_change,percent_change,unit,vintage,source</code>. Missing source values must remain blank/NA rather than zero in future editions.</p></div></section>
      <section className="mt-12 border-y border-border py-8"><p className="eyebrow text-primary">TexasDefined Research standard</p><h2 className="mt-2 font-display text-3xl">Methodology and verification</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">TexasDefined Research Desk compared two adjacent annual periods from the U.S. Census Bureau's single Vintage 2025 Population Estimates series. We subtract each 2023–2024 value from its 2024–2025 value for absolute change, then divide that difference by the 2023–2024 value for percentage change. We do not combine Vintage 2024 with Vintage 2025: Census revises the full post-census series when a new vintage is released. Net migration is a balance, not a count of total movers. Natural increase is births minus deaths. No missing values were imputed for this four-row statewide comparison.</p><p className="mt-4 text-sm"><strong>Research Desk / editor:</strong> TexasDefined Research Desk · <strong>Last verified:</strong> October 3, 2026 · <strong>Next review trigger:</strong> the next Census state population-estimates vintage or an official Vintage 2025 erratum.</p><div className="mt-5 flex flex-wrap gap-5 text-sm font-semibold"><a href={sourceUrl} className="text-primary underline underline-offset-4">Primary Census state source ↗</a><a href={countySourceUrl} className="underline underline-offset-4">County source ↗</a><Link to="/texas-data/texas-population-and-migration-2025" className="underline underline-offset-4">2025 population snapshot →</Link><Link to="/texas-data/texas-population-and-migration-2024" className="underline underline-offset-4">2024 revised snapshot →</Link><Link to="/texas-data/county-growth" className="underline underline-offset-4">County growth database →</Link><Link to="/moving-to-texas/data" className="underline underline-offset-4">Relocation data center →</Link></div></section>
      <section className="mt-12"><h2 className="font-display text-3xl">Recommended citation</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">TexasDefined Research Desk. “How Much Did Texas Population Growth Slow in 2025?” TexasDefined, last verified October 3, 2026. U.S. Census Bureau Vintage 2025 Population Estimates. {absoluteUrl(texasDefinedBrand, canonicalPath)}</p></section>
    </Container></>;
}
function signed(n:number){return `${n>=0?'+':''}${n.toLocaleString('en-US')}`}
function signedPct(n:number){return `${n>=0?'+':''}${n.toFixed(1)}%`}
