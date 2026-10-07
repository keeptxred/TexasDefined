import { useMemo, useState } from 'react';
import { Link } from '@tanstack/react-router';

import { Container } from '@/components/layout/Container';
import { ResearchBriefTrustBlock } from '@/components/data/ResearchBriefTrustBlock';
import type { TexasCountyGrowthDataset, TexasCountyGrowthRow } from '@/data/census-county-growth';

type SortKey = 'percent' | 'numeric' | 'population' | 'name';

export function CountyGrowthContent({ data }: { data: TexasCountyGrowthDataset }) {
  const [sort, setSort] = useState<SortKey>('percent');
  const [query, setQuery] = useState('');
  const rows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return data.rows
      .filter((row) => !normalized || row.countyName.toLowerCase().includes(normalized))
      .slice()
      .sort((a, b) => sortRows(a, b, sort));
  }, [data.rows, query, sort]);

  const fastest = data.rows.slice().sort((a, b) => b.populationChangePercent - a.populationChangePercent || a.countyName.localeCompare(b.countyName));
  const largest = data.rows.slice().sort((a, b) => b.populationChange - a.populationChange || a.countyName.localeCompare(b.countyName));
  const fastestCounty = fastest[0];
  const largestGain = largest[0];
  const countiesGrowing = data.rows.filter((row) => row.populationChange > 0).length;
  const chartRows = fastest.slice(0, 10);
  const maxGrowth = Math.max(...chartRows.map((row) => row.populationChangePercent), 1);

  return <Container className="py-12 sm:py-16">
    {!data.available ? <div className="border-y border-border py-10"><h2 className="font-display text-3xl">Official Census source temporarily unavailable</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">TexasDefined does not publish a partial ranking when the current Vintage 2025 county file cannot be loaded. Use the linked Census source directly and return here after the source recovers.</p></div> : <>
      <section className="grid gap-6 border-y border-border py-8 md:grid-cols-3">
        <Stat label="Fastest percentage growth" value={fastestCounty ? `+${fastestCounty.populationChangePercent.toFixed(1)}%` : '—'} note={fastestCounty?.countyName ?? 'No comparable county'} />
        <Stat label="Largest population gain" value={largestGain ? signed(largestGain.populationChange) : '—'} note={largestGain?.countyName ?? 'No comparable county'} />
        <Stat label="Counties gaining population" value={`${countiesGrowing} of ${data.rows.length}`} note="Positive change from the Census 2020 estimates base to the July 1, 2025 estimate." />
      </section>

      <section className="py-12" aria-labelledby="county-growth-chart-heading">
        <div className="border-b border-border pb-4"><p className="eyebrow text-primary">At a glance</p><h2 id="county-growth-chart-heading" className="mt-2 font-display text-4xl">Fastest percentage growth, 2020–2025</h2></div>
        <div className="mt-6 space-y-4">{chartRows.map((row) => <div key={row.fips} className="grid gap-2 sm:grid-cols-[14rem_1fr_6rem] sm:items-center"><p className="font-semibold">{row.countyName}</p><div className="h-3 bg-surface"><div className="h-3 bg-primary" style={{ width: `${Math.max(4, (row.populationChangePercent / maxGrowth) * 100)}%` }} /></div><p className="text-right text-sm font-semibold tabular-nums">{signedPercent(row.populationChangePercent)}</p></div>)}</div>
      </section>

      <section className="py-8" aria-labelledby="county-growth-table-heading">
        <div className="border-b border-border pb-4"><p className="eyebrow text-primary">Complete comparison</p><h2 id="county-growth-table-heading" className="mt-2 font-display text-4xl">Search and sort all Texas counties</h2></div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-semibold">Search county<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Start typing a county name" className="mt-2 w-full border border-border bg-background px-3 py-2 font-normal" /></label>
          <label className="text-sm font-semibold">Sort<select value={sort} onChange={(event) => setSort(event.target.value as SortKey)} className="mt-2 w-full border border-border bg-background px-3 py-2 font-normal"><option value="percent">Fastest percentage growth</option><option value="numeric">Largest numeric gain</option><option value="population">Largest 2025 population</option><option value="name">County name A–Z</option></select></label>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Showing {rows.length.toLocaleString('en-US')} of {data.rows.length.toLocaleString('en-US')} Texas counties. The downloadable CSV contains this same complete source-backed table.</p>
        <div className="mt-5 max-h-[72vh] overflow-auto border-y border-border"><table className="w-full min-w-[820px] border-collapse text-left text-sm"><thead className="sticky top-0 bg-surface"><tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground"><th className="px-4 py-3">County</th><th className="px-4 py-3">2020 base</th><th className="px-4 py-3">2025 estimate</th><th className="px-4 py-3">Change</th><th className="px-4 py-3">Change %</th><th className="px-4 py-3">County guide</th></tr></thead><tbody className="divide-y divide-border">{rows.map((row) => <tr key={row.fips}><td className="px-4 py-4 font-semibold">{row.countyName}</td><td className="px-4 py-4 tabular-nums">{row.populationBase2020.toLocaleString('en-US')}</td><td className="px-4 py-4 tabular-nums">{row.populationEstimate2025.toLocaleString('en-US')}</td><td className="px-4 py-4 tabular-nums">{signed(row.populationChange)}</td><td className="px-4 py-4 tabular-nums">{signedPercent(row.populationChangePercent)}</td><td className="px-4 py-4"><Link to="/$kind/$slug" params={{ kind: 'county', slug: slug(row.countyName) }} className="font-semibold text-primary hover:underline">Open →</Link></td></tr>)}</tbody></table></div>
      </section>

      <ResearchBriefTrustBlock
        lastVerified="March 17, 2026 — Census Vintage 2025 county population estimates release"
        nextUpdate="When the U.S. Census Bureau publishes the next annual county Population Estimates Program vintage."
        csvHref="/texas-data/county-growth.csv"
        methodology="TexasDefined reads the official Census Vintage 2025 county totals file, keeps Texas county records, and calculates numeric and percentage change from ESTIMATESBASE2020 to POPESTIMATE2025. Percentage change equals the numeric change divided by the 2020 estimates base. Counties with missing or invalid source values are omitted; the page is noindex if a near-complete Texas county set is unavailable. No secondary population source is substituted, and the downloadable CSV is generated from the same rows shown in the table."
        sources={[{ name: 'U.S. Census Bureau — Population Estimates Program', url: data.sourceUrl, note: 'Official county population estimates release tables.' }, { name: 'Vintage 2025 county totals CSV', url: data.sourceFileUrl, note: 'Direct machine-readable source file used for the calculations.' }]}
        citation="TexasDefined Research Desk. “Texas County Population Growth, 2020–2025.” TexasDefined.com, based on U.S. Census Bureau Vintage 2025 county population estimates, released March 17, 2026. https://texasdefined.com/texas-data/county-growth"
      />
    </>}
  </Container>;
}

function Stat({ label, value, note }: { label: string; value: string; note: string }) { return <div><p className="eyebrow text-primary">{label}</p><p className="mt-2 font-display text-4xl">{value}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{note}</p></div>; }
function sortRows(a: TexasCountyGrowthRow, b: TexasCountyGrowthRow, sort: SortKey) { if (sort === 'numeric') return b.populationChange - a.populationChange || a.countyName.localeCompare(b.countyName); if (sort === 'population') return b.populationEstimate2025 - a.populationEstimate2025 || a.countyName.localeCompare(b.countyName); if (sort === 'name') return a.countyName.localeCompare(b.countyName); return b.populationChangePercent - a.populationChangePercent || a.countyName.localeCompare(b.countyName); }
function signed(value: number) { return `${value >= 0 ? '+' : ''}${value.toLocaleString('en-US')}`; }
function signedPercent(value: number) { return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`; }
function slug(value: string) { return value.replace(/ County,? Texas$/i, '').replace(/ County$/i, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

export default CountyGrowthContent;
