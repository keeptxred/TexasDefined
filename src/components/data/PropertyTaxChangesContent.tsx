import { useMemo, useState } from 'react';

import { CitationTrustPanel } from '@/components/authority/CitationTrustPanel';
import { Container } from '@/components/layout/Container';
import type { TexasPropertyTaxChangeDataset, TexasPropertyTaxChangeRow } from '@/data/property/property-tax-change-research.server';
import { TEXASDEFINED_RESEARCH_AUTHOR, TEXASDEFINED_RESEARCH_EDITOR } from '@/data/original-research';

type SortKey = 'name' | 'previousRate' | 'currentRate' | 'rateChange' | 'rateChangePercent';
type TypeFilter = 'all' | TexasPropertyTaxChangeRow['type'];

export function PropertyTaxChangesContent({ data }: { data: TexasPropertyTaxChangeDataset }) {
  const [sortKey, setSortKey] = useState<SortKey>('rateChangePercent');
  const [descending, setDescending] = useState(true);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');

  const filtered = useMemo(() => data.rows.filter((row) => typeFilter === 'all' || row.type === typeFilter), [data.rows, typeFilter]);
  const rows = useMemo(() => sortRows(filtered, sortKey, descending), [filtered, sortKey, descending]);
  const increases = data.rows.filter((row) => row.rateChange > 0).slice().sort((a, b) => b.rateChangePercent - a.rateChangePercent);
  const decreases = data.rows.filter((row) => row.rateChange < 0).slice().sort((a, b) => a.rateChangePercent - b.rateChangePercent);
  const biggestIncrease = increases[0];
  const biggestDecrease = decreases[0];

  const chooseSort = (key: SortKey) => {
    if (key === sortKey) setDescending((value) => !value);
    else { setSortKey(key); setDescending(key !== 'name'); }
  };

  if (!data.available) return <Container className="py-12 sm:py-16"><section className="border-y border-border py-10"><p className="eyebrow text-primary">TexasDefined Research</p><h2 className="mt-2 font-display text-4xl">The finalized comparison is temporarily unavailable</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">TexasDefined does not publish a partial ranking when the matched Comptroller rate records cannot be loaded.</p></section></Container>;

  return <Container className="py-12 sm:py-16">
    <section className="border-y border-border py-8">
      <p className="eyebrow text-primary">Direct answer</p>
      <h2 className="mt-2 max-w-4xl font-display text-4xl">Matched adopted rates changed in both directions from {data.previousYear} to {data.currentYear}</h2>
      <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">This analysis compares the same county, city or school-district taxing unit across two finalized Comptroller years. A rate change is not the same thing as a change in an individual tax bill: taxable value, exemptions and the other taxing units on a property also matter.</p>
      <dl className="mt-7 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Matched units" value={data.rows.length.toLocaleString('en-US')} />
        <Stat label="Rate increases" value={increases.length.toLocaleString('en-US')} />
        <Stat label="Largest % increase" value={biggestIncrease ? `${biggestIncrease.name}: ${signedPercent(biggestIncrease.rateChangePercent)}` : '—'} />
        <Stat label="Largest % decrease" value={biggestDecrease ? `${biggestDecrease.name}: ${signedPercent(biggestDecrease.rateChangePercent)}` : '—'} />
      </dl>
      <a href="/texas-data/property-tax-changes.csv" className="mt-6 inline-block border-b border-primary text-sm font-semibold text-primary">Download the full CSV →</a>
    </section>

    <section className="mt-12" aria-labelledby="tax-change-chart">
      <p className="eyebrow text-primary">TexasDefined analysis</p>
      <h2 id="tax-change-chart" className="mt-2 font-display text-4xl">Largest percentage changes among matched finalized rates</h2>
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <ChangeChart title="Largest increases" rows={increases.slice(0, 10)} positive />
        <ChangeChart title="Largest decreases" rows={decreases.slice(0, 10)} positive={false} />
      </div>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">Chart: TexasDefined calculation. Percent change is relative to the prior year's adopted total rate, not percentage points and not a household tax-bill estimate.</p>
    </section>

    <section className="mt-12" aria-labelledby="tax-change-table">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4">
        <div><p className="eyebrow text-primary">Complete matched dataset</p><h2 id="tax-change-table" className="mt-2 font-display text-4xl">Adopted-rate changes by taxing unit</h2></div>
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Unit type <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as TypeFilter)} className="ml-2 border border-border bg-background px-2 py-1.5 text-sm normal-case tracking-normal text-foreground"><option value="all">All</option><option value="county">County</option><option value="city">City</option><option value="school-district">School district</option></select></label>
      </div>
      <div className="overflow-x-auto border-b border-border">
        <table className="w-full min-w-[1060px] border-collapse text-left text-sm">
          <thead><tr className="bg-surface text-xs uppercase tracking-wide text-muted-foreground">
            <SortHead label="Taxing unit" active={sortKey === 'name'} descending={descending} onClick={() => chooseSort('name')} />
            <th className="px-4 py-3">Type</th><th className="px-4 py-3">County / counties</th>
            <SortHead label={String(data.previousYear)} active={sortKey === 'previousRate'} descending={descending} onClick={() => chooseSort('previousRate')} />
            <SortHead label={String(data.currentYear)} active={sortKey === 'currentRate'} descending={descending} onClick={() => chooseSort('currentRate')} />
            <SortHead label="Rate-point change" active={sortKey === 'rateChange'} descending={descending} onClick={() => chooseSort('rateChange')} />
            <SortHead label="Percent change" active={sortKey === 'rateChangePercent'} descending={descending} onClick={() => chooseSort('rateChangePercent')} />
            <th className="px-4 py-3">History</th>
          </tr></thead>
          <tbody className="divide-y divide-border">{rows.map((row) => <tr key={row.key}><td className="px-4 py-4 font-semibold">{row.name}</td><td className="px-4 py-4">{labelType(row.type)}</td><td className="px-4 py-4 text-xs text-muted-foreground">{row.countySlugs.join(', ') || '—'}</td><td className="px-4 py-4 tabular-nums">{rate(row.previousRate)}</td><td className="px-4 py-4 tabular-nums">{rate(row.currentRate)}</td><td className="px-4 py-4 tabular-nums">{signedRate(row.rateChange)}</td><td className="px-4 py-4 font-semibold tabular-nums">{signedPercent(row.rateChangePercent)}</td><td className="px-4 py-4"><a href={`/property-tax/taxing-unit/${row.slug}`} className="font-semibold text-primary hover:underline">Open →</a></td></tr>)}</tbody>
        </table>
      </div>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">Rates are the Comptroller's adopted total tax rate values. Variable-rate, unavailable and non-final records are excluded from the matched comparison.</p>
    </section>

    <CitationTrustPanel
      className="mt-12"
      title="Sources, methodology and citation"
      sources={[{ name: data.sourceName, url: data.sourceUrl, note: `Official adopted property-tax rate source for ${data.previousYear} and ${data.currentYear}.` }]}
      methodology={`TexasDefined loads reported-final adopted total-rate records for ${data.previousYear} and ${data.currentYear}, limits the comparison to counties, cities and school districts, excludes variable-rate and unavailable records, matches taxing units by type and stable slug, and calculates both the rate-point difference and percent change from the prior year. Special districts are excluded from this first edition because their structures are less comparable statewide. No statement here estimates a parcel's total tax bill.`}
      lastVerified="October 3, 2026 against the TexasDefined Comptroller-derived rate store."
      nextReview="Refresh after the next finalized annual Comptroller adopted-rate dataset is imported and passes validation."
      author={TEXASDEFINED_RESEARCH_AUTHOR}
      editor={TEXASDEFINED_RESEARCH_EDITOR}
      recommendedCitation={`Texas Defined Editorial Desk. “Texas Property-Tax Rate Changes, ${data.previousYear}–${data.currentYear}.” TexasDefined.com, updated October 3, 2026. https://texasdefined.com/texas-data/property-tax-changes`}
    />
  </Container>;
}

function ChangeChart({ title, rows, positive }: { title: string; rows: TexasPropertyTaxChangeRow[]; positive: boolean }) {
  const max = Math.max(1, ...rows.map((row) => Math.abs(row.rateChangePercent)));
  return <div className="border-y border-border py-6"><h3 className="font-display text-2xl">{title}</h3><div className="mt-5 space-y-3">{rows.map((row, index) => <div key={row.key} className="grid grid-cols-[2rem_minmax(10rem,1fr)_6rem] items-center gap-3"><span className="text-xs text-muted-foreground">{index + 1}</span><div><p className="truncate text-sm font-semibold">{row.name}</p><div className="mt-1 h-1.5 bg-surface"><div className="h-full bg-primary" style={{ width: `${Math.max(2, (Math.abs(row.rateChangePercent) / max) * 100)}%` }} /></div></div><span className="text-right text-sm font-semibold tabular-nums">{positive ? '+' : ''}{row.rateChangePercent.toFixed(1)}%</span></div>)}</div></div>;
}

function Stat({ label, value }: { label: string; value: string }) { return <div className="border-b border-border py-5 sm:border-b-0 sm:border-r sm:px-5 first:pl-0 last:border-r-0"><dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</dt><dd className="mt-2 font-display text-xl leading-tight">{value}</dd></div>; }
function SortHead({ label, active, descending, onClick }: { label: string; active: boolean; descending: boolean; onClick: () => void }) { return <th className="px-4 py-3"><button type="button" onClick={onClick} className="font-semibold hover:text-foreground">{label}{active ? (descending ? ' ↓' : ' ↑') : ''}</button></th>; }
function labelType(value: TexasPropertyTaxChangeRow['type']) { return value === 'school-district' ? 'School district' : value.charAt(0).toUpperCase() + value.slice(1); }
function rate(value: number) { return value.toFixed(6); }
function signedRate(value: number) { return `${value >= 0 ? '+' : ''}${value.toFixed(6)}`; }
function signedPercent(value: number) { return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`; }
function sortRows(rows: TexasPropertyTaxChangeRow[], key: SortKey, descending: boolean) { return rows.slice().sort((a, b) => { const left = key === 'name' ? a.name : a[key]; const right = key === 'name' ? b.name : b[key]; const compared = typeof left === 'string' && typeof right === 'string' ? left.localeCompare(right) : Number(left) - Number(right); return descending ? -compared : compared; }); }

export default PropertyTaxChangesContent;
