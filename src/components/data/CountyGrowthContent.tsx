import { Link } from '@tanstack/react-router';

import { CitationTrustPanel } from '@/components/authority/CitationTrustPanel';
import { Container } from '@/components/layout/Container';
import type { TexasCountyGrowthDataset, TexasCountyGrowthRow } from '@/data/census-county-growth';

export function CountyGrowthContent({ data }: { data: TexasCountyGrowthDataset }) {
  const fastest = data.rows.slice().sort((a, b) => b.populationChangePercent - a.populationChangePercent);
  const largest = data.rows.slice().sort((a, b) => b.populationChange - a.populationChange);

  return <Container className="py-12 sm:py-16">
    {!data.available ? <div className="border-y border-border py-10"><h2 className="font-display text-3xl">Official Census source temporarily unavailable</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Texas Defined does not publish a partial ranking when the current verified Census county file cannot be loaded. Use the linked Census source directly and return here after the source recovers.</p></div> : <>
      <section className="border-y border-border py-8"><p className="eyebrow text-primary">Direct answer</p><h2 className="mt-2 font-display text-4xl">Growth is measured from the Census 2020 estimates base to July 1, {data.vintage}</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">This is a population-estimate comparison, not a forecast. The percent change is calculated from the Census Bureau's Vintage {data.vintage} county estimates base and July 1, {data.vintage} estimate for each Texas county.</p><a href="/texas-data/county-growth.csv" className="mt-5 inline-block border-b border-primary text-sm font-semibold text-primary">Download the full CSV →</a></section>
      <GrowthTable title="Fastest percentage growth" vintage={data.vintage} rows={fastest.slice(0, 40)} />
      <GrowthTable title="Largest numeric population gains" vintage={data.vintage} rows={largest.slice(0, 40)} />
    </>}

    <CitationTrustPanel
      className="mt-12"
      title="County growth sources"
      sources={[{ name: 'U.S. Census Bureau — Population Estimates Program', url: data.sourceUrl, note: 'Official county population estimates and release tables.' }, { name: 'Vintage ' + data.vintage + ' county totals CSV', url: data.sourceFileUrl, note: 'Direct source file used for this comparison.' }]}
      methodology="Texas Defined uses a GitHub-generated verified snapshot of the official Census county totals release for the stated vintage. Exactly 254 unique Texas county FIPS codes, population bases, annual estimates and the corresponding official Texas statewide sum must reconcile. The comparison uses ESTIMATESBASE2020 and the POPESTIMATE column corresponding to the vintage. Population percentage change is calculated from the 2020 estimates base. Incomplete or inconsistent releases are rejected. No partial county ranking is published."
      lastVerified={'Official Census Vintage ' + data.vintage + ' verified against source on ' + data.verifiedAt + '. Verification date is not the original Census release date.'}
    />
  </Container>;
}

function GrowthTable({ title, rows, vintage }: { title: string; rows: TexasCountyGrowthRow[]; vintage: number }) {
  return <section className="mt-12"><h2 className="font-display text-4xl">{title}</h2><div className="mt-5 overflow-x-auto border-y border-border"><table className="w-full min-w-[780px] border-collapse text-left text-sm"><thead><tr className="border-b border-border bg-surface text-xs uppercase tracking-wide text-muted-foreground"><th className="px-4 py-3">County</th><th className="px-4 py-3">2020 base</th><th className="px-4 py-3">{vintage} estimate</th><th className="px-4 py-3">Change</th><th className="px-4 py-3">Change %</th><th className="px-4 py-3">County guide</th></tr></thead><tbody className="divide-y divide-border">{rows.map((row) => <tr key={row.fips}><td className="px-4 py-4 font-semibold">{row.countyName}</td><td className="px-4 py-4 tabular-nums">{row.populationBase2020.toLocaleString('en-US')}</td><td className="px-4 py-4 tabular-nums">{row.populationEstimate.toLocaleString('en-US')}</td><td className="px-4 py-4 tabular-nums">{signed(row.populationChange)}</td><td className="px-4 py-4 tabular-nums">{signedPercent(row.populationChangePercent)}</td><td className="px-4 py-4"><Link to="/$kind/$slug" params={{ kind: 'county', slug: slug(row.countyName) }} className="font-semibold text-primary hover:underline">Open →</Link></td></tr>)}</tbody></table></div></section>;
}

function signed(value: number) { return `${value >= 0 ? '+' : ''}${value.toLocaleString('en-US')}`; }
function signedPercent(value: number) { return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`; }
function slug(value: string) { return value.replace(/ County,? Texas$/i, '').replace(/ County$/i, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

export default CountyGrowthContent;
