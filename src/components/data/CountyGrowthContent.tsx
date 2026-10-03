import { Link } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

import { CitationTrustPanel } from '@/components/authority/CitationTrustPanel';
import { Container } from '@/components/layout/Container';
import type { TexasCountyGrowthDataset, TexasCountyGrowthRow } from '@/data/census-county-growth';
import { TEXASDEFINED_RESEARCH_AUTHOR, TEXASDEFINED_RESEARCH_EDITOR } from '@/data/original-research';

type SortKey = 'countyName' | 'populationBase2020' | 'populationEstimate2025' | 'populationChange' | 'populationChangePercent';

export function CountyGrowthContent({ data }: { data: TexasCountyGrowthDataset }) {
  const [sortKey, setSortKey] = useState<SortKey>('populationChangePercent');
  const [descending, setDescending] = useState(true);
  const rows = useMemo(() => sortRows(data.rows, sortKey, descending), [data.rows, sortKey, descending]);
  const fastest = data.rows.slice().sort((a, b) => b.populationChangePercent - a.populationChangePercent);
  const largest = data.rows.slice().sort((a, b) => b.populationChange - a.populationChange);
  const declining = data.rows.filter((row) => row.populationChange < 0);
  const chartRows = fastest.slice(0, 12);
  const maxGrowth = Math.max(1, ...chartRows.map((row) => Math.max(0, row.populationChangePercent)));

  const chooseSort = (key: SortKey) => {
    if (key === sortKey) setDescending((value) => !value);
    else { setSortKey(key); setDescending(key !== 'countyName'); }
  };

  return <Container className="py-12 sm:py-16">
    {!data.available ? <div className="border-y border-border py-10"><h2 className="font-display text-3xl">Official Census source temporarily unavailable</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Texas Defined does not publish a partial ranking when the current Vintage 2025 county file cannot be loaded. Use the linked Census source directly and return here after the source recovers.</p></div> : <>
      <section className="border-y border-border py-8">
        <p className="eyebrow text-primary">Direct answer</p>
        <h2 className="mt-2 max-w-4xl font-display text-4xl">TexasDefined calculates both percentage growth and absolute population gain for every county in the Vintage 2025 file</h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">This is a population-estimate comparison, not a forecast. Percent change uses the Census Bureau's 2020 estimates base as the denominator and the July 1, 2025 resident population estimate as the endpoint.</p>
        <dl className="mt-7 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Counties compared" value={data.rows.length.toLocaleString('en-US')} />
          <Stat label="Fastest % growth" value={fastest[0] ? `${fastest[0].countyName}: ${signedPercent(fastest[0].populationChangePercent)}` : '—'} />
          <Stat label="Largest numeric gain" value={largest[0] ? `${largest[0].countyName}: ${signed(largest[0].populationChange)}` : '—'} />
          <Stat label="Counties with decline" value={declining.length.toLocaleString('en-US')} />
        </dl>
        <a href="/texas-data/county-growth.csv" className="mt-6 inline-block border-b border-primary text-sm font-semibold text-primary">Download the full CSV →</a>
      </section>

      <section className="mt-12" aria-labelledby="county-growth-chart">
        <p className="eyebrow text-primary">TexasDefined analysis</p>
        <h2 id="county-growth-chart" className="mt-2 font-display text-4xl">Fastest percentage growth, 2020 estimates base to 2025</h2>
        <div className="mt-6 space-y-4 border-y border-border py-7">
          {chartRows.map((row, index) => <div key={row.fips} className="grid gap-2 sm:grid-cols-[2rem_minmax(10rem,15rem)_1fr_5rem] sm:items-center"><span className="text-xs tabular-nums text-muted-foreground">{index + 1}</span><Link to="/$kind/$slug" params={{ kind: 'county', slug: slug(row.countyName) }} className="font-semibold hover:text-primary">{row.countyName}</Link><div className="h-2 bg-surface"><div className="h-full bg-primary" style={{ width: `${Math.max(2, (Math.max(0, row.populationChangePercent) / maxGrowth) * 100)}%` }} /></div><span className="text-right text-sm font-semibold tabular-nums">{signedPercent(row.populationChangePercent)}</span></div>)}
        </div>
        <p className="mt-3 text-xs leading-5 text-muted-foreground">Chart: TexasDefined calculation from the official Census rows used in the table and CSV.</p>
      </section>

      <section className="mt-12" aria-labelledby="county-growth-table">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4"><div><p className="eyebrow text-primary">Complete dataset</p><h2 id="county-growth-table" className="mt-2 font-display text-4xl">All Texas counties</h2></div><p className="text-xs text-muted-foreground">Click a column heading to sort.</p></div>
        <div className="overflow-x-auto border-b border-border"><table className="w-full min-w-[900px] border-collapse text-left text-sm"><thead><tr className="bg-surface text-xs uppercase tracking-wide text-muted-foreground"><SortHead label="County" active={sortKey === 'countyName'} descending={descending} onClick={() => chooseSort('countyName')} /><SortHead label="2020 base" active={sortKey === 'populationBase2020'} descending={descending} onClick={() => chooseSort('populationBase2020')} /><SortHead label="2025 estimate" active={sortKey === 'populationEstimate2025'} descending={descending} onClick={() => chooseSort('populationEstimate2025')} /><SortHead label="Change" active={sortKey === 'populationChange'} descending={descending} onClick={() => chooseSort('populationChange')} /><SortHead label="Change %" active={sortKey === 'populationChangePercent'} descending={descending} onClick={() => chooseSort('populationChangePercent')} /><th className="px-4 py-3">County guide</th></tr></thead><tbody className="divide-y divide-border">{rows.map((row) => <GrowthRow key={row.fips} row={row} />)}</tbody></table></div>
      </section>
    </>}

    <CitationTrustPanel
      className="mt-12"
      title="Sources, methodology and citation"
      sources={[{ name: 'U.S. Census Bureau — Population Estimates Program', url: data.sourceUrl, note: 'Official county population estimates and release tables.' }, { name: 'Vintage 2025 county totals CSV', url: data.sourceFileUrl, note: 'Direct source file used for this comparison.' }]}
      methodology="TexasDefined reads the official Census Vintage 2025 county totals file, keeps Texas county records, and calculates numeric and percentage change from ESTIMATESBASE2020 to POPESTIMATE2025. Counties with missing or invalid source values are omitted; the page is noindex if a near-complete Texas county set is unavailable. No secondary population source is substituted. The visible table, chart, headline findings and downloadable CSV all use the same loaded rows."
      lastVerified="October 3, 2026 against the Census Bureau Vintage 2025 county source file."
      nextReview="Annual, after the Census Bureau releases the next completed county population-estimates vintage."
      author={TEXASDEFINED_RESEARCH_AUTHOR}
      editor={TEXASDEFINED_RESEARCH_EDITOR}
      recommendedCitation="Texas Defined Editorial Desk. “Texas County Population Growth, 2020–2025.” TexasDefined.com, updated October 3, 2026. https://texasdefined.com/texas-data/county-growth"
    />
  </Container>;
}

function Stat({ label, value }: { label: string; value: string }) { return <div className="border-b border-border py-5 sm:border-b-0 sm:border-r sm:px-5 first:pl-0 last:border-r-0"><dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</dt><dd className="mt-2 font-display text-xl leading-tight">{value}</dd></div>; }
function SortHead({ label, active, descending, onClick }: { label: string; active: boolean; descending: boolean; onClick: () => void }) { return <th className="px-4 py-3"><button type="button" onClick={onClick} className="font-semibold hover:text-foreground">{label}{active ? (descending ? ' ↓' : ' ↑') : ''}</button></th>; }
function GrowthRow({ row }: { row: TexasCountyGrowthRow }) { return <tr><td className="px-4 py-4 font-semibold">{row.countyName}</td><td className="px-4 py-4 tabular-nums">{row.populationBase2020.toLocaleString('en-US')}</td><td className="px-4 py-4 tabular-nums">{row.populationEstimate2025.toLocaleString('en-US')}</td><td className="px-4 py-4 tabular-nums">{signed(row.populationChange)}</td><td className="px-4 py-4 font-semibold tabular-nums">{signedPercent(row.populationChangePercent)}</td><td className="px-4 py-4"><Link to="/$kind/$slug" params={{ kind: 'county', slug: slug(row.countyName) }} className="font-semibold text-primary hover:underline">Open →</Link></td></tr>; }
function signed(value: number) { return `${value >= 0 ? '+' : ''}${value.toLocaleString('en-US')}`; }
function signedPercent(value: number) { return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`; }
function slug(value: string) { return value.replace(/ County,? Texas$/i, '').replace(/ County$/i, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function sortRows(rows: TexasCountyGrowthRow[], key: SortKey, descending: boolean) { return rows.slice().sort((a, b) => { const left = key === 'countyName' ? a.countyName : a[key]; const right = key === 'countyName' ? b.countyName : b[key]; const compared = typeof left === 'string' && typeof right === 'string' ? left.localeCompare(right) : Number(left) - Number(right); return descending ? -compared : compared; }); }

export default CountyGrowthContent;
