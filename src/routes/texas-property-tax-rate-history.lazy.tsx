import { useMemo, useState } from 'react';
import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { CitationTrustPanel } from '@/components/authority/CitationTrustPanel';
import { TaxingUnitSearch } from '@/components/property/TaxingUnitSearch';
import { Container } from '@/components/layout/Container';
import type { TexasTaxRateRecord } from '@/data/property/texas-tax-rates.generated';
import type { PropertyTaxChangeRecord } from '@/data/property/texas-tax-rates.server';

export const Route = createLazyFileRoute('/texas-property-tax-rate-history')({ component: Page });

function displayRate(record: TexasTaxRateRecord | undefined) {
  if (!record) return '—';
  if (record.rateUnavailable) {
    if (record.totalRate != null) return `Reported ${record.totalRate.toFixed(6)} — verify`;
    return 'Not reported';
  }
  if (record.totalRate != null && !record.variableRate) return record.totalRate.toFixed(6);
  return record.rateVariants.length ? `Varies: ${record.rateVariants.map((rate) => rate.toFixed(6)).join(' / ')}` : 'Verify parcel';
}

function Page() {
  const dataCenter = Route.useLoaderData();
  const [selected, setSelected] = useState<TexasTaxRateRecord | null>(null);
  const [history, setHistory] = useState<TexasTaxRateRecord[]>([]);
  const [status, setStatus] = useState('');

  async function choose(record: TexasTaxRateRecord) {
    setSelected(record);
    setStatus('Loading rate history…');
    try {
      const response = await fetch(`/api/property-tax-rates?unit=${encodeURIComponent(record.slug)}&type=${encodeURIComponent(record.type)}`);
      const body = await response.json() as { history?: TexasTaxRateRecord[]; error?: string };
      if (!response.ok) throw new Error(body.error || `History lookup failed (${response.status})`);
      setHistory(body.history ?? []);
      setStatus('');
    } catch (error) {
      setHistory([]);
      setStatus(error instanceof Error ? error.message : 'History lookup failed.');
    }
  }

  const numericRates = useMemo(() => history.flatMap((item) => !item.rateUnavailable && item.totalRate != null && !item.variableRate ? [item.totalRate] : !item.rateUnavailable ? item.rateVariants : []), [history]);
  const max = Math.max(1, ...numericRates);
  const first = history[0];
  const last = history.at(-1);
  const change = first?.totalRate != null && !first.variableRate && !first.rateUnavailable && last?.totalRate != null && !last.variableRate && !last.rateUnavailable ? last.totalRate - first.totalRate : null;

  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
    <article className="mx-auto max-w-[1440px]">
      <nav className="border-b border-border pb-4 text-xs uppercase tracking-[.14em] text-muted-foreground"><Link to="/property">Property</Link><span className="mx-2">/</span><Link to="/property-tax-calculators">Calculators</Link><span className="mx-2">/</span>Property Tax Data Center</nav>
      <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
        <div><p className="eyebrow text-primary">Texas reference data</p><h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas Property Tax Data Center</h1><p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">Search finalized local property-tax rates, inspect multi-year history, compare statewide rate changes and download the latest TexasDefined-normalized statewide rate file. The current data covers counties, cities, school districts and special districts from Texas Comptroller statewide source files.</p><div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm"><a href="/api/property-tax-rates?download=latest-csv" className="font-semibold text-primary underline underline-offset-4">Download latest statewide rates (CSV)</a><Link to="/property-tax/counties" className="font-semibold underline underline-offset-4">Browse county tax resources</Link><Link to="/learn/property-taxes" className="font-semibold underline underline-offset-4">How Texas property taxes work</Link></div></div>
        <dl className="border-l border-border pl-6 text-sm"><SideFact label="Latest finalized year" value={String(dataCenter.latestYear)} /><SideFact label="Years retained" value={`${dataCenter.availableYears[0]}–${dataCenter.latestYear}`} /><SideFact label="Current-year records" value={dataCenter.recordCount.toLocaleString('en-US')} /><SideFact label="Source" value="Texas Comptroller PTAD" /></dl>
      </header>

      <section className="py-10" aria-labelledby="coverage-heading">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4"><div><p className="eyebrow text-primary">Current dataset</p><h2 id="coverage-heading" className="mt-2 font-display text-4xl">{dataCenter.latestYear} statewide rate coverage</h2></div><p className="max-w-xl text-sm leading-6 text-muted-foreground">“Fixed rate” means TexasDefined can safely use one numeric total rate for comparison. Variable, missing or conflicted records remain visible but are excluded from comparison math.</p></div>
        <div className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{dataCenter.countsByType.map((item) => <dl key={item.type} className="bg-background p-5"><dt className="text-xs uppercase tracking-[.14em] text-muted-foreground">{labelType(item.type)}</dt><dd className="mt-2 font-display text-3xl font-semibold">{item.records.toLocaleString('en-US')}</dd><dd className="mt-1 text-xs text-muted-foreground">{item.fixedRates.toLocaleString('en-US')} comparable fixed-rate records</dd></dl>)}</div>
      </section>

      <section className="grid gap-8 border-y border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div><p className="eyebrow text-primary">Taxing unit</p><h2 className="mt-2 font-display text-3xl">Find a local tax rate</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Search the latest finalized statewide records, then open a taxing unit’s retained history.</p></div>
        <div><TaxingUnitSearch allowVariableSelection onSelect={(record) => void choose(record)} />{selected ? <p className="mt-4 text-sm"><strong>{selected.name}</strong> · {selected.type.replaceAll('-', ' ')}</p> : null}{status ? <p className="mt-3 text-sm text-muted-foreground">{status}</p> : null}</div>
      </section>

      {history.length ? <section className="border-b border-border py-10">
        <p className="eyebrow text-primary">Selected taxing unit</p><h2 className="mt-2 font-display text-4xl">{selected?.name} rate history</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3"><Fact label="First year" value={`${first?.year}: ${displayRate(first)}`} /><Fact label="Latest year" value={`${last?.year}: ${displayRate(last)}`} /><Fact label="Change across comparable years" value={change == null ? 'Not comparable across unavailable/variable years' : `${change >= 0 ? '+' : ''}${change.toFixed(6)}`} /></div>
        <div className="mt-8 space-y-4">{history.map((item) => { const chartRate = item.rateUnavailable ? 0 : (item.totalRate ?? Math.max(0, ...item.rateVariants)); return <div key={item.id}><div className="mb-1 flex items-center justify-between gap-4 text-sm"><span>{item.year}</span><strong>{displayRate(item)}</strong></div><div className="h-2 bg-muted">{chartRate > 0 ? <div className="h-full bg-primary" style={{ width: `${Math.max(2, chartRate / max * 100)}%` }} /> : null}</div></div>; })}</div>
        <div className="mt-8 overflow-x-auto"><table className="w-full min-w-[48rem] text-left text-sm"><thead><tr className="border-b border-border"><th className="py-3">Year</th><th>Tax rate</th><th>Operations (M&O)</th><th>Debt service (I&S)</th><th>Status</th><th>Reported levy</th></tr></thead><tbody>{history.map((item) => <tr key={`${item.id}-row`} className="border-b border-border"><td className="py-3">{item.year}</td><td>{displayRate(item)}</td><td>{item.maintenanceOperationsRate?.toFixed(6) ?? '—'}</td><td>{item.debtServiceRate?.toFixed(6) ?? '—'}</td><td>{item.sourceStatus.replaceAll('-', ' ')}</td><td>{item.levy != null ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(item.levy) : '—'}</td></tr>)}</tbody></table></div>
      </section> : null}

      <section className="py-12" aria-labelledby="change-heading">
        <div className="grid gap-8 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">TexasDefined calculation</p><h2 id="change-heading" className="mt-2 font-display text-4xl">Largest fixed-rate changes, {dataCenter.priorYear}–{dataCenter.latestYear}</h2></div><div><p className="max-w-4xl text-sm leading-7 text-muted-foreground">These are arithmetic differences between comparable fixed total rates for the same normalized taxing-unit identity in consecutive statewide files. They are <strong className="text-foreground">not changes in a homeowner’s tax bill</strong>, and they do not explain why a local governing body adopted a rate.</p><div className="mt-6 grid gap-8 xl:grid-cols-2"><ChangeTable title="Largest increases" records={dataCenter.largestIncreases} /><ChangeTable title="Largest decreases" records={dataCenter.largestDecreases} /></div></div></div>
      </section>

      <section className="grid gap-8 border-y border-border py-12 lg:grid-cols-[15rem_1fr]">
        <div><p className="eyebrow text-primary">Distribution</p><h2 className="mt-2 font-display text-4xl">Median comparable rate by unit type</h2></div>
        <div><p className="max-w-3xl text-sm leading-7 text-muted-foreground">The median is calculated only from current-year records with one usable fixed rate. It is a description of this statewide rate dataset, not an estimate of the combined rate on a typical property.</p><div className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{dataCenter.medianFixedRateByType.map((item) => <dl key={item.type} className="bg-background p-5"><dt className="text-xs uppercase tracking-[.14em] text-muted-foreground">{labelType(item.type)}</dt><dd className="mt-2 font-display text-2xl font-semibold">{item.value == null ? '—' : item.value.toFixed(6)}</dd><dd className="mt-1 text-xs text-muted-foreground">per $100 taxable value</dd></dl>)}</div></div>
      </section>

      <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[15rem_1fr]">
        <div><p className="eyebrow text-primary">How to read it</p><h2 className="mt-2 font-display text-4xl">A tax rate is not the same as a tax bill</h2></div>
        <div className="max-w-4xl space-y-5 text-base leading-8 text-muted-foreground"><p>Texas property taxes are imposed by local taxing units. A single property can be inside several of them at once: a county, city, school district, hospital district, municipal utility district, emergency-services district, community-college district or another special district. The rate data center studies those units individually.</p><p>A reported rate is generally expressed per $100 of taxable value. A rate of 0.500000 represents fifty cents per $100 of taxable value, not a 50 percent tax. A real bill depends on the parcel’s taxable value after exemptions plus the rates for every applicable taxing unit.</p><p>That is why rate history and bill history can move differently. A taxing unit can lower its rate while a homeowner’s bill rises if taxable value increases. The reverse can also happen. TexasDefined therefore labels rate-change calculations as rate changes rather than “tax increases” or “tax cuts.”</p></div>
      </section>

      <section className="grid gap-10 border-b border-border py-12 lg:grid-cols-2">
        <div><p className="eyebrow text-primary">Source integrity</p><h2 className="mt-2 font-display text-4xl">Missing and variable rates stay missing or variable</h2><div className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground"><p>Records marked <strong className="text-foreground">not reported</strong> are not treated as zero. A missing rate is missing information. Records marked <strong className="text-foreground">variable</strong> are not collapsed into a false single number.</p><p>Year-over-year calculations use only fixed rates that can be matched safely by taxing-unit type and normalized slug in consecutive source years. Conflicted or unavailable rates are excluded from the calculation rather than repaired with assumptions.</p></div></div>
        <div><p className="eyebrow text-primary">Next steps</p><h2 className="mt-2 font-display text-4xl">Move from statewide data to your property</h2><div className="mt-5 grid sm:grid-cols-2"><GuideLink href="/texas-property-tax-estimator" title="Property-tax estimator">Combine applicable local rates with a taxable-value scenario.</GuideLink><GuideLink href="/texas-property-tax-bill-breakdown" title="Bill breakdown">See how multiple taxing units combine.</GuideLink><GuideLink href="/property-tax/counties" title="County directory">Open county-specific appraisal and tax resources.</GuideLink><GuideLink href="/do/property-tax-protest" title="Protest guide">Use the appraisal-value process when that is the issue.</GuideLink></div></div>
      </section>

      <CitationTrustPanel
        className="mt-10"
        sources={[{ name: dataCenter.sourceName, url: dataCenter.sourcePage, note: `Statewide Tax Rates and Levies source files used for ${dataCenter.availableYears[0]}–${dataCenter.latestYear} normalized records.` }]}
        methodology={`TexasDefined retains statewide annual taxing-unit records, normalizes unit type and identity, preserves source status, and excludes unavailable, variable or conflicted total rates from fixed-rate comparison math. The ${dataCenter.priorYear}–${dataCenter.latestYear} change tables subtract the prior fixed rate from the latest fixed rate for the same normalized unit. Median values use only usable fixed current-year total rates. Parcel membership, assessed value, exemptions and local boundaries are outside these calculations.`}
        lastVerified={dataCenter.generatedAt ? formatDateTime(dataCenter.generatedAt) : `Latest finalized source year: ${dataCenter.latestYear}`}
        title="Property Tax Data Center sources and methodology"
        citation={`TexasDefined, “Texas Property Tax Data Center,” TexasDefined.com, ${dataCenter.latestYear} finalized statewide rate dataset.`}
        reusePolicy="TexasDefined-created normalization, comparison tables and derived calculations may be reused for editorial or educational purposes with attribution to TexasDefined.com. Cite the Texas Comptroller for the underlying official Tax Rates and Levies records."
        downloads={[{ label: `Download ${dataCenter.latestYear} statewide property-tax rates`, url: '/api/property-tax-rates?download=latest-csv', format: 'CSV' }]}
      />
    </article>
  </Container>;
}

function ChangeTable({ title, records }: { title: string; records: PropertyTaxChangeRecord[] }) { return <div><h3 className="font-display text-2xl">{title}</h3><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[34rem] text-left text-sm"><thead><tr className="border-b border-border"><th className="py-3">Taxing unit</th><th>Type</th><th>{records[0]?.priorYear ?? 'Prior'}</th><th>{records[0]?.latestYear ?? 'Latest'}</th><th>Change</th></tr></thead><tbody>{records.map((record) => <tr key={`${record.type}-${record.slug}-${title}`} className="border-b border-border"><td className="py-3"><a href={`/property-tax/taxing-unit/${record.slug}`} className="font-semibold hover:text-primary">{record.name}</a>{record.countySlugs.length ? <span className="block text-xs text-muted-foreground">{record.countySlugs.map(titleCase).join(', ')}</span> : null}</td><td>{labelType(record.type)}</td><td>{record.priorRate.toFixed(6)}</td><td>{record.latestRate.toFixed(6)}</td><td className="font-semibold">{record.change >= 0 ? '+' : ''}{record.change.toFixed(6)}</td></tr>)}</tbody></table>{!records.length ? <p className="py-6 text-sm text-muted-foreground">No comparable fixed-rate changes available.</p> : null}</div></div>; }
function SideFact({ label, value }: { label: string; value: string }) { return <div className="border-b border-border py-3 last:border-0"><dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</dt><dd className="mt-1 font-medium">{value}</dd></div>; }
function Fact({ label, value }: { label: string; value: string }) { return <div className="border-t border-border pt-3"><span className="text-xs uppercase tracking-[.12em] text-muted-foreground">{label}</span><strong className="mt-1 block font-display text-2xl">{value}</strong></div>; }
function GuideLink({ href, title, children }: { href: string; title: string; children: React.ReactNode }) { return <a href={href} className="group border-b border-border py-5 sm:px-5"><strong className="block font-display text-xl group-hover:text-primary">{title}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">{children}</span></a>; }
function labelType(value: string) { return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase()); }
function titleCase(value: string) { return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase()); }
function formatDateTime(value: string) { const date = new Date(value); return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(date); }
