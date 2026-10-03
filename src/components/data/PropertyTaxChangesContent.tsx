import { useMemo, useState } from 'react';
import { Link } from '@tanstack/react-router';

import { Container } from '@/components/layout/Container';
import { ResearchBriefTrustBlock } from '@/components/data/ResearchBriefTrustBlock';
import type { PropertyTaxChangeDataset, PropertyTaxChangeRow } from '@/data/research/property-tax-changes.server';

const typeLabel: Record<PropertyTaxChangeRow['type'], string> = {
  county: 'County',
  city: 'City',
  'school-district': 'School district',
};

type SortKey = 'largest-increase' | 'largest-decrease' | 'largest-percent' | 'name';

export function PropertyTaxChangesContent({ data }: { data: PropertyTaxChangeDataset }) {
  const [type, setType] = useState<'all' | PropertyTaxChangeRow['type']>('all');
  const [sort, setSort] = useState<SortKey>('largest-increase');
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return data.rows
      .filter((row) => type === 'all' || row.type === type)
      .filter((row) => !normalized || `${row.name} ${row.countySlugs.join(' ')}`.toLowerCase().includes(normalized))
      .slice()
      .sort((a, b) => sortRows(a, b, sort));
  }, [data.rows, query, sort, type]);

  const increases = data.rows.filter((row) => row.changePoints > 0).sort((a, b) => b.changePoints - a.changePoints);
  const decreases = data.rows.filter((row) => row.changePoints < 0).sort((a, b) => a.changePoints - b.changePoints);
  const biggestIncrease = increases[0];
  const biggestDecrease = decreases[0];
  const chartRows = [...increases.slice(0, 5), ...decreases.slice(0, 5)];
  const maxMagnitude = Math.max(...chartRows.map((row) => Math.abs(row.changePoints)), 0.0001);

  return <Container className="py-12 sm:py-16">
    {!data.available ? <section className="border-y border-border py-10"><h2 className="font-display text-3xl">Comparable statewide rate records are not available</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">TexasDefined does not manufacture a ranking when two finalized years cannot be matched cleanly. Use the Texas Comptroller source directly while the research dataset is unavailable.</p></section> : <>
      <section className="grid gap-6 border-y border-border py-8 md:grid-cols-3">
        <Stat label="Comparable taxing units" value={data.rows.length.toLocaleString('en-US')} note={`${data.previousYear} → ${data.currentYear}; counties, cities and school districts`} />
        <Stat label="Largest rate increase" value={biggestIncrease ? `${signed(biggestIncrease.changePoints, 4)} pts` : 'None'} note={biggestIncrease?.name ?? 'No increase in comparable records'} />
        <Stat label="Largest rate decrease" value={biggestDecrease ? `${signed(biggestDecrease.changePoints, 4)} pts` : 'None'} note={biggestDecrease?.name ?? 'No decrease in comparable records'} />
      </section>

      <section className="py-12" aria-labelledby="tax-change-chart-heading">
        <div className="border-b border-border pb-4"><p className="eyebrow text-primary">At a glance</p><h2 id="tax-change-chart-heading" className="mt-2 font-display text-4xl">Largest adopted-rate moves in the comparable set</h2></div>
        <div className="mt-6 space-y-4">
          {chartRows.map((row) => <div key={row.key} className="grid gap-2 sm:grid-cols-[15rem_1fr_7rem] sm:items-center"><div><p className="font-semibold">{row.name}</p><p className="text-xs text-muted-foreground">{typeLabel[row.type]}</p></div><div className="h-3 bg-surface"><div className="h-3 bg-primary" style={{ width: `${Math.max(2, (Math.abs(row.changePoints) / maxMagnitude) * 100)}%` }} /></div><p className="text-right text-sm font-semibold tabular-nums">{signed(row.changePoints, 4)} pts</p></div>)}
        </div>
        <p className="mt-5 max-w-4xl text-xs leading-6 text-muted-foreground">The visual uses absolute adopted-rate movement for scale. A lower adopted rate does not by itself mean a lower tax bill because taxable value, exemptions and the full local taxing-unit stack also matter.</p>
      </section>

      <section className="py-8" aria-labelledby="tax-change-table-heading">
        <div className="border-b border-border pb-4"><p className="eyebrow text-primary">Complete comparison</p><h2 id="tax-change-table-heading" className="mt-2 font-display text-4xl">Search and sort every comparable taxing unit</h2></div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <label className="text-sm font-semibold">Search<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="County, city or district" className="mt-2 w-full border border-border bg-background px-3 py-2 font-normal" /></label>
          <label className="text-sm font-semibold">Type<select value={type} onChange={(event) => setType(event.target.value as typeof type)} className="mt-2 w-full border border-border bg-background px-3 py-2 font-normal"><option value="all">All comparable types</option><option value="county">Counties</option><option value="city">Cities</option><option value="school-district">School districts</option></select></label>
          <label className="text-sm font-semibold">Sort<select value={sort} onChange={(event) => setSort(event.target.value as SortKey)} className="mt-2 w-full border border-border bg-background px-3 py-2 font-normal"><option value="largest-increase">Largest increase</option><option value="largest-decrease">Largest decrease</option><option value="largest-percent">Largest percentage change</option><option value="name">Name A–Z</option></select></label>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Showing {filtered.length.toLocaleString('en-US')} of {data.rows.length.toLocaleString('en-US')} comparable records. {data.omitted.toLocaleString('en-US')} current-year records were omitted because the prior-year match or finalized fixed-rate fields were not comparable.</p>
        <div className="mt-5 max-h-[70vh] overflow-auto border-y border-border"><table className="w-full min-w-[980px] border-collapse text-left text-sm"><thead className="sticky top-0 bg-surface"><tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground"><th className="px-4 py-3">Taxing unit</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">{data.previousYear} rate</th><th className="px-4 py-3">{data.currentYear} rate</th><th className="px-4 py-3">Point change</th><th className="px-4 py-3">Relative change</th><th className="px-4 py-3">Profile</th></tr></thead><tbody className="divide-y divide-border">{filtered.map((row) => <tr key={row.key}><td className="px-4 py-4 font-semibold">{row.name}<p className="mt-1 text-xs font-normal text-muted-foreground">{row.countySlugs.map(prettySlug).join(', ')}</p></td><td className="px-4 py-4">{typeLabel[row.type]}</td><td className="px-4 py-4 tabular-nums">{row.previousRate.toFixed(4)}%</td><td className="px-4 py-4 tabular-nums">{row.currentRate.toFixed(4)}%</td><td className="px-4 py-4 font-semibold tabular-nums">{signed(row.changePoints, 4)}</td><td className="px-4 py-4 tabular-nums">{signed(row.changePercent, 1)}%</td><td className="px-4 py-4"><Link to="/property-tax/taxing-unit/$unit" params={{ unit: row.slug }} className="font-semibold text-primary hover:underline">Open →</Link></td></tr>)}</tbody></table></div>
      </section>

      <ResearchBriefTrustBlock
        lastVerified={formatDate(data.generatedAt) ?? `Statewide ${data.currentYear} dataset loaded from TexasDefined's Comptroller import`}
        nextUpdate={`After the Texas Comptroller publishes the next finalized statewide adopted-rate dataset following ${data.currentYear}.`}
        csvHref="/texas-data/property-tax-changes.csv"
        methodology={`TexasDefined matches ${data.previousYear} and ${data.currentYear} Texas Comptroller property-tax records by taxing-unit type, normalized slug and county footprint. The comparison includes counties, cities and school districts only when both years are marked reported-final, both contain a fixed numeric total adopted rate and neither is marked variable or unavailable. Point change equals current adopted rate minus prior adopted rate; relative change divides that point change by the prior adopted rate. The analysis compares adopted tax rates, not final household tax bills.`}
        sources={[{ name: data.sourceName, url: data.sourceUrl, note: 'Statewide adopted property-tax rate workbooks and rate documentation.' }]}
        citation={`TexasDefined Research Desk. “Texas Property-Tax Rate Changes, ${data.previousYear}–${data.currentYear}.” TexasDefined.com, ${formatDate(data.generatedAt) ?? 'current maintained edition'}. Analysis of Texas Comptroller adopted-rate data. https://texasdefined.com/texas-data/property-tax-changes`}
      />
    </>}
  </Container>;
}

function Stat({ label, value, note }: { label: string; value: string; note: string }) { return <div><p className="eyebrow text-primary">{label}</p><p className="mt-2 font-display text-4xl">{value}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{note}</p></div>; }
function sortRows(a: PropertyTaxChangeRow, b: PropertyTaxChangeRow, sort: SortKey) { if (sort === 'largest-decrease') return a.changePoints - b.changePoints || a.name.localeCompare(b.name); if (sort === 'largest-percent') return Math.abs(b.changePercent) - Math.abs(a.changePercent) || a.name.localeCompare(b.name); if (sort === 'name') return a.name.localeCompare(b.name); return b.changePoints - a.changePoints || a.name.localeCompare(b.name); }
function signed(value: number, digits: number) { return `${value >= 0 ? '+' : ''}${value.toFixed(digits)}`; }
function prettySlug(value: string) { return value.replaceAll('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()); }
function formatDate(value: string | null) { if (!value) return null; const date = new Date(value); if (Number.isNaN(date.getTime())) return null; return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date); }

export default PropertyTaxChangesContent;
