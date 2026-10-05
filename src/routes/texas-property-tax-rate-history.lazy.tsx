import { useEffect, useMemo, useState } from 'react';
import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { TaxingUnitSearch } from '@/components/property/TaxingUnitSearch';
import { Container } from '@/components/layout/Container';
import type { TexasTaxRateRecord } from '@/data/property/texas-tax-rates.generated';

type StatewideInsights = {
  year: number;
  counts: Record<'county' | 'city' | 'school-district' | 'special-district', number>;
  lowest: TexasTaxRateRecord[];
  highest: TexasTaxRateRecord[];
};

type RecentUnit = Pick<TexasTaxRateRecord, 'name' | 'slug' | 'type' | 'countySlugs'>;

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
  const [selected, setSelected] = useState<TexasTaxRateRecord | null>(null);
  const [history, setHistory] = useState<TexasTaxRateRecord[]>([]);
  const [status, setStatus] = useState('');
  const [comparisonSelected, setComparisonSelected] = useState<TexasTaxRateRecord | null>(null);
  const [comparisonHistory, setComparisonHistory] = useState<TexasTaxRateRecord[]>([]);
  const [comparisonStatus, setComparisonStatus] = useState('');
  const [statewide, setStatewide] = useState<StatewideInsights | null>(null);
  const [recentUnits, setRecentUnits] = useState<RecentUnit[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('td-property-tax-recent-units') || '[]') as RecentUnit[];
      if (Array.isArray(saved)) setRecentUnits(saved.slice(0, 6));
    } catch {
      setRecentUnits([]);
    }
    const controller = new AbortController();
    fetch('/api/property-tax-rates?insights=statewide', { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('Statewide context unavailable');
        return response.json() as Promise<{ statewide?: StatewideInsights }>;
      })
      .then((body) => setStatewide(body.statewide ?? null))
      .catch(() => {});
    return () => controller.abort();
  }, []);

  async function loadHistory(record: TexasTaxRateRecord) {
    const response = await fetch(`/api/property-tax-rates?unit=${encodeURIComponent(record.slug)}&type=${encodeURIComponent(record.type)}`);
    const body = await response.json() as { history?: TexasTaxRateRecord[]; error?: string };
    if (!response.ok) throw new Error(body.error || `History lookup failed (${response.status})`);
    return body.history ?? [];
  }

  function remember(record: TexasTaxRateRecord) {
    const next = [{ name: record.name, slug: record.slug, type: record.type, countySlugs: record.countySlugs }, ...recentUnits.filter((item) => !(item.slug === record.slug && item.type === record.type))].slice(0, 6);
    setRecentUnits(next);
    try { localStorage.setItem('td-property-tax-recent-units', JSON.stringify(next)); } catch {}
  }

  async function choose(record: TexasTaxRateRecord) {
    setSelected(record);
    setStatus('Loading rate history…');
    try {
      setHistory(await loadHistory(record));
      remember(record);
      setStatus('');
    } catch (error) {
      setHistory([]);
      setStatus(error instanceof Error ? error.message : 'History lookup failed.');
    }
  }

  async function chooseComparison(record: TexasTaxRateRecord) {
    setComparisonSelected(record);
    setComparisonStatus('Loading comparison history…');
    try {
      setComparisonHistory(await loadHistory(record));
      remember(record);
      setComparisonStatus('');
    } catch (error) {
      setComparisonHistory([]);
      setComparisonStatus(error instanceof Error ? error.message : 'Comparison history lookup failed.');
    }
  }

  async function quickLookup(query: string) {
    setStatus(`Finding ${query}…`);
    try {
      const response = await fetch(`/api/property-tax-rates?q=${encodeURIComponent(query)}`);
      const body = await response.json() as { results?: TexasTaxRateRecord[]; message?: string };
      if (!response.ok) throw new Error(body.message || 'Search failed');
      const record = (body.results ?? []).find((item) => item.name.toLowerCase() === query.toLowerCase()) ?? body.results?.[0];
      if (!record) throw new Error('No matching taxing unit found.');
      await choose(record);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Quick lookup failed.');
    }
  }

  const comparable = useMemo(
    () => history.filter((item) => !item.rateUnavailable && item.totalRate != null && !item.variableRate),
    [history],
  );
  const first = history[0];
  const last = history.at(-1);
  const comparableFirst = comparable[0];
  const comparableLast = comparable.at(-1);
  const change = comparableFirst && comparableLast ? comparableLast.totalRate! - comparableFirst.totalRate! : null;
  const minRate = comparable.length ? Math.min(...comparable.map((item) => item.totalRate!)) : null;
  const maxRate = comparable.length ? Math.max(...comparable.map((item) => item.totalRate!)) : null;
  const avgRate = comparable.length ? comparable.reduce((sum, item) => sum + item.totalRate!, 0) / comparable.length : null;
  const yearChanges = comparable.slice(1).map((item, index) => ({
    year: item.year,
    delta: item.totalRate! - comparable[index].totalRate!,
  }));
  const biggestIncrease = yearChanges.length ? yearChanges.reduce((best, item) => item.delta > best.delta ? item : best) : null;
  const biggestDecrease = yearChanges.length ? yearChanges.reduce((best, item) => item.delta < best.delta ? item : best) : null;

  const summary = selected && comparableFirst && comparableLast
    ? `${selected.name} has ${comparable.length} comparable annual rate record${comparable.length === 1 ? '' : 's'} from ${comparableFirst.year} through ${comparableLast.year}. Across those comparable years, the reported rate ${change == null || Math.abs(change) < 0.0000005 ? 'was essentially unchanged' : change > 0 ? `rose by ${change.toFixed(6)}` : `fell by ${Math.abs(change).toFixed(6)}`}.`
    : '';

  return <Container className="pb-16 pt-10 sm:pb-24 sm:pt-14">
    <article className="mx-auto max-w-6xl">
      <nav className="border-b border-border pb-4 text-xs uppercase tracking-[.14em] text-muted-foreground">
        <Link to="/property">Property</Link><span className="mx-2">/</span><Link to="/property-tax-calculators">Calculators</Link><span className="mx-2">/</span>Rate history
      </nav>

      <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-2 lg:items-end">
        <div>
          <p className="eyebrow text-primary">Historical tax data</p>
          <h1 className="mt-3 font-display text-5xl sm:text-7xl">Texas property tax rate history explorer</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            Search a county, city, school district, MUD or other special district and see how its reported property-tax rate changed across available annual statewide records.
          </p>
        </div>
        <div className="border-l-4 border-primary p-5">
          <p className="text-xs font-semibold uppercase tracking-[.14em] text-primary">Start here</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Enter a taxing unit below. The explorer then shows the history, trend, rate components and reported levy without guessing through missing or variable data.</p>
        </div>
      </header>

      <section className="border-b border-border py-10">
        <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
          <div>
            <p className="eyebrow text-primary">Taxing unit</p>
            <h2 className="mt-2 font-display text-3xl">Find a local tax rate</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Try a county, city, ISD, MUD, hospital district, ESD or other local taxing unit.</p>
          </div>
          <div>
            <TaxingUnitSearch allowVariableSelection onSelect={(record) => void choose(record)} />
            <div className="mt-5 flex flex-wrap gap-2">
              {['Harris County', 'Dallas County', 'Travis County', 'Bexar County', 'Fort Bend County', 'Katy ISD'].map((name) => <button key={name} type="button" onClick={() => void quickLookup(name)} className="border border-border px-3 py-2 text-xs font-semibold hover:border-primary hover:text-primary">{name}</button>)}
            </div>
            {recentUnits.length ? <div className="mt-5"><p className="text-xs font-semibold uppercase tracking-[.12em] text-muted-foreground">Recently viewed</p><div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">{recentUnits.map((item) => <button key={`${item.type}-${item.slug}`} type="button" onClick={() => void quickLookup(item.name)} className="text-sm font-semibold text-primary hover:underline">{item.name}</button>)}</div></div> : null}
            {selected ? <p className="mt-4 text-sm"><strong>{selected.name}</strong> · {selected.type.replaceAll('-', ' ')}</p> : null}
            {status ? <p className="mt-3 text-sm text-muted-foreground">{status}</p> : null}
          </div>
        </div>
      </section>

      {history.length ? <section className="border-b border-border py-10">
        <div className="flex flex-col gap-3 border-b border-border pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-primary">Rate trend</p>
            <h2 className="mt-2 font-display text-4xl">{selected?.name}</h2>
            {summary ? <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{summary}</p> : null}
          </div>
          <a href="/texas-property-tax-county-comparison-calculator" className="text-xs font-semibold uppercase tracking-[.14em] text-primary hover:underline">Compare locations →</a>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Fact label="First available year" value={first ? `${first.year}: ${displayRate(first)}` : '—'} />
          <Fact label="Latest available year" value={last ? `${last.year}: ${displayRate(last)}` : '—'} />
          <Fact label="Comparable net change" value={change == null ? 'Not comparable' : `${change >= 0 ? '+' : ''}${change.toFixed(6)}`} />
          <Fact label="Comparable years" value={String(comparable.length)} />
        </div>

        {comparable.length ? <div className="mt-10 grid gap-8 xl:grid-cols-2">
          <div className="border border-border p-5 sm:p-7">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.12em] text-muted-foreground">Reported total rate</p>
                <h3 className="mt-1 font-display text-2xl">Trend across comparable years</h3>
              </div>
              <span className="text-xs text-muted-foreground">rate per $100 taxable value</span>
            </div>
            <RateTrendChart records={comparable} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <MiniFact label="Lowest comparable rate" value={minRate == null ? '—' : minRate.toFixed(6)} />
            <MiniFact label="Highest comparable rate" value={maxRate == null ? '—' : maxRate.toFixed(6)} />
            <MiniFact label="Average comparable rate" value={avgRate == null ? '—' : avgRate.toFixed(6)} />
            <MiniFact label="Largest one-year increase" value={biggestIncrease && biggestIncrease.delta > 0 ? `+${biggestIncrease.delta.toFixed(6)} in ${biggestIncrease.year}` : 'No comparable increase'} />
            <MiniFact label="Largest one-year decrease" value={biggestDecrease && biggestDecrease.delta < 0 ? `${biggestDecrease.delta.toFixed(6)} in ${biggestDecrease.year}` : 'No comparable decrease'} />
          </div>
        </div> : null}

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[48rem] text-left text-sm">
            <thead><tr className="border-b border-border"><th className="py-3">Year</th><th>Tax rate</th><th>Operations (M&O)</th><th>Debt service (I&S)</th><th>Status</th><th>Reported levy</th></tr></thead>
            <tbody>{history.map((item) => <tr key={`${item.id}-row`} className="border-b border-border"><td className="py-3">{item.year}</td><td>{displayRate(item)}</td><td>{item.maintenanceOperationsRate?.toFixed(6) ?? '—'}</td><td>{item.debtServiceRate?.toFixed(6) ?? '—'}</td><td>{item.sourceStatus.replaceAll('-', ' ')}</td><td>{item.levy != null ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(item.levy) : '—'}</td></tr>)}</tbody>
          </table>
        </div>
      </section> : null}

      {selected ? <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[15rem_1fr]">
        <div><p className="eyebrow text-primary">Texas context</p><h2 className="mt-2 font-display text-4xl">Where this taxing unit sits</h2></div>
        <div className="grid gap-6 md:grid-cols-2">
          <TexasContextMap />
          <div>
            <p className="text-sm leading-7 text-muted-foreground">The statewide rate file associates <strong className="text-foreground">{selected.name}</strong> with the following county context. County association is useful for orientation but does not prove that every parcel in a county belongs to this taxing unit.</p>
            <div className="mt-4 flex flex-wrap gap-2">{selected.countySlugs.length ? selected.countySlugs.map((slug) => <a key={slug} href={`/property-tax/county/${slug}`} className="border border-border px-3 py-2 text-sm font-semibold hover:border-primary">{titleCase(slug)} County</a>) : <span className="text-sm text-muted-foreground">No county association is available in this record.</span>}</div>
          </div>
        </div>
      </section> : null}

      {selected ? <section className="border-b border-border py-12">
        <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Related exploration</p><h2 className="mt-2 font-display text-4xl">Keep following the tax story</h2></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <RelatedLink href={`/property-tax/taxing-unit/${selected.slug}`} title={`${selected.name} detail page`}>Open the dedicated taxing-unit page with source and county context.</RelatedLink>
            <RelatedLink href="/texas-property-tax-estimator" title="Estimate a bill">Use a taxable-value scenario with the rates that actually apply to a parcel.</RelatedLink>
            <RelatedLink href="/texas-property-tax-bill-breakdown" title="Break down the bill">See how county, city, school and special-district rates stack together.</RelatedLink>
            {selected.countySlugs.slice(0, 3).map((slug) => <RelatedLink key={slug} href={`/property-tax/county/${slug}`} title={`${titleCase(slug)} County taxes`}>Open the county guide and related local taxing units.</RelatedLink>)}
          </div>
        </div>
      </section> : null}

      {selected ? <section className="border-b border-border py-12">
        <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Compare</p><h2 className="mt-2 font-display text-4xl">Put two taxing units side by side</h2></div>
          <div>
            <TaxingUnitSearch label="Choose a second taxing unit" allowVariableSelection onSelect={(record) => void chooseComparison(record)} placeholder="Search a second county, city, ISD or special district" />
            {comparisonStatus ? <p className="mt-3 text-sm text-muted-foreground">{comparisonStatus}</p> : null}
            {comparisonSelected && comparisonHistory.length ? <ComparisonTable firstName={selected.name} firstHistory={history} secondName={comparisonSelected.name} secondHistory={comparisonHistory} /> : null}
          </div>
        </div>
      </section> : null}

      {statewide ? <section className="border-b border-border py-12">
        <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Statewide snapshot</p><h2 className="mt-2 font-display text-4xl">{statewide.year} reported-rate context</h2></div>
          <div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MiniFact label="Counties" value={String(statewide.counts.county)} />
              <MiniFact label="Cities" value={String(statewide.counts.city)} />
              <MiniFact label="School districts" value={String(statewide.counts['school-district'])} />
              <MiniFact label="Special districts" value={String(statewide.counts['special-district'])} />
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <InsightList title="Lowest reported fixed rates" records={statewide.lowest} />
              <InsightList title="Highest reported fixed rates" records={statewide.highest} />
            </div>
            <p className="mt-5 text-xs leading-5 text-muted-foreground">These are latest-year fixed total rates in the statewide dataset, not rankings of tax burden. Different unit types fund different services and should not be treated as directly interchangeable.</p>
          </div>
        </div>
      </section> : null}

      <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[15rem_1fr]">
        <div><p className="eyebrow text-primary">How to read it</p><h2 className="mt-2 font-display text-4xl">A tax rate is only one part of the bill</h2></div>
        <div className="max-w-3xl space-y-5 text-base leading-8 text-muted-foreground">
          <p>Texas property taxes are imposed by local taxing units. A single property can be inside several of them at once: a county, city, school district, hospital district, municipal utility district, emergency-services district, community-college district or another special district. This explorer follows one taxing unit at a time. It does not add every unit that applies to a particular address.</p>
          <p>A reported rate is generally expressed per $100 of taxable value. A rate of 0.500000 is not a 50 percent tax. It represents fifty cents per $100 of the taxable value to which that rate applies.</p>
          <p>That is why rate history and bill history can move differently. A taxing unit can lower its rate while the average tax bill rises because taxable values increased. The reverse can also happen. Use the history here to study the rate itself, then use parcel-level and appraisal records to understand the bill.</p>
          <p><Link to="/texas-property-tax-bill-breakdown" className="font-semibold text-primary hover:underline">See how multiple taxing units combine into one property-tax bill →</Link></p>
        </div>
      </section>

      <section className="grid gap-10 border-b border-border py-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-primary">Why rates move</p>
          <h2 className="mt-2 font-display text-4xl">What can cause a local tax rate to change?</h2>
          <div className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground">
            <Explain title="Taxable-value growth">When the taxable base grows, a taxing unit may be able to raise the same amount of revenue with a lower rate. A falling rate therefore does not automatically mean a falling bill.</Explain>
            <Explain title="Debt and bond obligations">New voter-approved debt, repayment schedules, refinancing or retiring old debt can change the interest-and-sinking portion of a rate.</Explain>
            <Explain title="State school-finance rules">School-district tax rates can move because of state compression and other school-finance requirements that do not apply in the same way to every other taxing unit.</Explain>
            <Explain title="Local budgets and boundaries">Changes in service levels, annexation, deannexation, district creation or dissolution can affect the rate or which taxpayers are subject to it.</Explain>
          </div>
        </div>
        <div>
          <p className="eyebrow text-primary">Rate components</p>
          <h2 className="mt-2 font-display text-4xl">What makes up the tax rate</h2>
          <div className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground">
            <Explain title="Maintenance and operations (M&O)">M&O generally supports the ordinary operating side of a taxing unit. Depending on the unit, that can include personnel, services, maintenance, programs and other ongoing governmental costs.</Explain>
            <Explain title="Interest and sinking / debt service (I&S)">Debt-service rates generally support eligible principal and interest obligations. A change can reflect debt issuance, repayment schedules, taxable-value growth, refinancing, voter-approved debt or other factors.</Explain>
            <Explain title="Why some records do not split cleanly">Older records, variable-rate records or source conflicts do not always provide a clean M&O/I&S split. Texas Defined preserves that uncertainty rather than manufacturing a component that was not reliably reported.</Explain>
          </div>
        </div>
      </section>

      <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[15rem_1fr]">
        <div><p className="eyebrow text-primary">Data methodology</p><h2 className="mt-2 font-display text-4xl">What we preserve — and what we refuse to guess</h2></div>
        <div className="max-w-3xl space-y-5 text-sm leading-7 text-muted-foreground">
          <p>The history is built from statewide Texas property-tax source snapshots retained by Texas Defined. Source files change format over time, and a taxing unit can appear under different names or with different component detail from one year to another. The matching layer uses taxing-unit identity and type because text labels are not perfectly stable across source years.</p>
          <p>Records marked <strong className="text-foreground">not reported</strong> are not treated as zero. A missing rate is missing information, not a tax rate of 0.000000. Records marked <strong className="text-foreground">variable</strong> are likewise not collapsed into a false single number.</p>
          <p>The comparison math only uses fixed rates that can be compared without inventing data. That is why the summary may say a net change is not comparable even when several years are displayed.</p>
          <p>Historical rates are statewide source snapshots. A rate history does not prove that a particular parcel was inside the taxing unit in every year shown. Annexations, deannexations, new special districts, district dissolutions and boundary changes can all alter which units apply to an address.</p>
          <div className="grid gap-3 pt-2 sm:grid-cols-3">
            <Trust label="Source family" value="Texas statewide property-tax files" />
            <Trust label="Missing values" value="Preserved as missing" />
            <Trust label="Variable rates" value="Shown as variable, not averaged" />
          </div>
        </div>
      </section>

      <section className="border-b border-border py-12">
        <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Next step</p><h2 className="mt-2 font-display text-4xl">Turn rate history into a property-tax answer</h2></div>
          <div className="grid sm:grid-cols-2">
            <GuideLink href="/texas-property-tax-estimator" title="Texas property-tax estimator">Estimate a current bill using local-rate data and a taxable-value scenario.</GuideLink>
            <GuideLink href="/texas-property-tax-bill-breakdown" title="Property-tax bill breakdown">See how multiple taxing units combine into the total bill.</GuideLink>
            <GuideLink href="/texas-property-tax-county-comparison-calculator" title="Compare Texas locations">Compare property-tax scenarios across counties or local taxing structures.</GuideLink>
            <GuideLink href="/learn/property-taxes" title="How Texas property taxes work">Understand appraisal, exemptions, rates, bills, protests and the annual cycle.</GuideLink>
            <GuideLink href="/property-tax/counties" title="Property tax by county">Move from statewide data to verified county-specific resources.</GuideLink>
            <GuideLink href="/do/property-tax-protest" title="Texas property-tax protest guide">Use the correct process when the issue is appraised value rather than the adopted tax rate.</GuideLink>
          </div>
        </div>
      </section>

      <section className="py-12">
        <p className="eyebrow text-primary">Frequently asked questions</p>
        <h2 className="mt-2 font-display text-4xl">Common questions about rate history</h2>
        <div className="mt-7 grid gap-x-8 md:grid-cols-2">
          <Explain title="Does a lower rate mean my bill went down?">Not necessarily. Your bill depends on taxable value, exemptions and every applicable taxing unit. Rate compression can occur at the same time that taxable values rise.</Explain>
          <Explain title="Can I use this to prove my parcel’s past taxes?">No. Use historical tax bills, appraisal records and official parcel-level records for that. This tool tracks taxing-unit rate records, not parcel jurisdiction.</Explain>
          <Explain title="Why are six decimal places shown?">State and local source files often report rates with that precision. Keeping source precision makes small year-to-year changes visible and avoids rounding before comparison.</Explain>
          <Explain title="Why do some units have only a few years?">A unit may be new, renamed, dissolved, unmatched in an older source file, absent from a particular statewide file or represented in a format that cannot be safely normalized.</Explain>
          <Explain title="Why can my bill rise when the rate falls?">Because taxable value can rise faster than the rate falls, and because your total bill can include several different taxing units whose rates move independently.</Explain>
          <Explain title="Why does a MUD rate look different from a city or ISD rate?">Different types of taxing units fund different services and debt structures. Comparing rate levels across unlike unit types can be misleading without that context.</Explain>
          <Explain title="Why might a rate differ from another website?">Differences can come from year selection, unit naming, rounding, variable-rate handling, or whether a source is showing an adopted rate, a component rate or a parcel-level total.</Explain>
          <Explain title="What if a taxing unit changed names or boundaries?">The historical statewide files may reflect naming or jurisdiction changes over time. The explorer preserves available source records but does not infer that every past boundary applies to a current parcel.</Explain>
        </div>
      </section>
    </article>
  </Container>;
}

function RateTrendChart({ records }: { records: TexasTaxRateRecord[] }) {
  if (!records.length) return null;
  const values = records.map((record) => record.totalRate!);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(max - min, 0.000001);
  const width = 1000;
  const height = 280;
  const top = 24;
  const bottom = 36;
  const left = 24;
  const right = 24;
  const chartHeight = height - top - bottom;
  const chartWidth = width - left - right;
  const points = records.map((record, index) => {
    const x = records.length === 1 ? width / 2 : left + index / (records.length - 1) * chartWidth;
    const y = top + (max - record.totalRate!) / span * chartHeight;
    return { x, y, record };
  });
  const polyline = points.map((point) => `${point.x},${point.y}`).join(' ');

  return <div>
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Historical property tax rate trend" className="h-auto w-full">
      <line x1={left} y1={top + chartHeight} x2={width - right} y2={top + chartHeight} stroke="currentColor" className="text-border" strokeWidth="2" />
      {points.length > 1 ? <polyline points={polyline} fill="none" stroke="currentColor" className="text-primary" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" /> : null}
      {points.map(({ x, y, record }) => <g key={record.id}>
        <circle cx={x} cy={y} r="7" fill="currentColor" className="text-primary" />
        <text x={x} y={height - 10} textAnchor="middle" className="fill-muted-foreground text-xl">{record.year}</text>
      </g>)}
    </svg>
    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
      <span>Low {min.toFixed(6)}</span>
      <span>High {max.toFixed(6)}</span>
    </div>
  </div>;
}

function ComparisonTable({ firstName, firstHistory, secondName, secondHistory }: { firstName: string; firstHistory: TexasTaxRateRecord[]; secondName: string; secondHistory: TexasTaxRateRecord[] }) {
  const years = [...new Set([...firstHistory.map((item) => item.year), ...secondHistory.map((item) => item.year)])].sort((a, b) => b - a);
  const firstByYear = new Map(firstHistory.map((item) => [item.year, item]));
  const secondByYear = new Map(secondHistory.map((item) => [item.year, item]));
  return <div className="mt-7 overflow-x-auto"><table className="w-full min-w-full text-left text-sm"><thead><tr className="border-b border-border"><th className="py-3">Year</th><th>{firstName}</th><th>{secondName}</th><th>Difference</th></tr></thead><tbody>{years.map((year) => { const a = firstByYear.get(year); const b = secondByYear.get(year); const av = a && !a.rateUnavailable && !a.variableRate ? a.totalRate : null; const bv = b && !b.rateUnavailable && !b.variableRate ? b.totalRate : null; const diff = av != null && bv != null ? av - bv : null; return <tr key={year} className="border-b border-border"><td className="py-3 font-semibold">{year}</td><td>{displayRate(a)}</td><td>{displayRate(b)}</td><td>{diff == null ? 'Not comparable' : `${diff >= 0 ? '+' : ''}${diff.toFixed(6)}`}</td></tr>; })}</tbody></table></div>;
}

function InsightList({ title, records }: { title: string; records: TexasTaxRateRecord[] }) {
  return <div><h3 className="font-display text-2xl">{title}</h3><div className="mt-3 divide-y divide-border border-y border-border">{records.map((record) => <a key={record.id} href={`/property-tax/taxing-unit/${record.slug}`} className="flex items-center justify-between gap-4 py-3 text-sm hover:text-primary"><span><strong className="block">{record.name}</strong><span className="text-xs text-muted-foreground">{record.type.replaceAll('-', ' ')}</span></span><strong>{record.totalRate?.toFixed(6) ?? '—'}</strong></a>)}</div></div>;
}

function TexasContextMap() {
  return <div className="border border-border p-4"><svg viewBox="0 0 240 220" role="img" aria-label="Texas context map illustration" className="mx-auto h-auto w-full max-w-xs"><path d="M28 18h97v34l25 15 14 29 39 24-18 33-28 5-17 44-28-24-20 19-18-41-35-20 12-46-23-26z" fill="none" stroke="currentColor" strokeWidth="4" className="text-primary"/><text x="118" y="112" textAnchor="middle" className="fill-foreground text-lg font-semibold">TEXAS</text></svg><p className="mt-3 text-center text-xs leading-5 text-muted-foreground">County associations are listed beside the map; exact district boundaries require local parcel records.</p></div>;
}

function titleCase(value: string) { return value.replaceAll('-', ' ').replace(/\b\w/g, (char) => char.toUpperCase()); }

function RelatedLink({ href, title, children }: { href: string; title: string; children: React.ReactNode }) {
  return <a href={href} className="border border-border p-4 hover:border-primary"><strong className="font-display text-xl">{title}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">{children}</span></a>;
}

function Fact({ label, value }: { label: string; value: string }) {
  return <div className="border-t border-border pt-3"><span className="text-xs uppercase tracking-[.12em] text-muted-foreground">{label}</span><strong className="mt-1 block font-display text-2xl">{value}</strong></div>;
}

function MiniFact({ label, value }: { label: string; value: string }) {
  return <div className="border border-border p-4"><span className="text-xs uppercase tracking-[.12em] text-muted-foreground">{label}</span><strong className="mt-2 block font-display text-xl">{value}</strong></div>;
}

function Trust({ label, value }: { label: string; value: string }) {
  return <div className="border-t border-border pt-3"><span className="block text-xs uppercase tracking-[.12em] text-muted-foreground">{label}</span><strong className="mt-1 block text-sm text-foreground">{value}</strong></div>;
}

function Explain({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="border-t border-border py-5"><h3 className="font-display text-2xl text-foreground">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{children}</p></div>;
}

function GuideLink({ href, title, children }: { href: string; title: string; children: React.ReactNode }) {
  return <a href={href} className="group border-b border-border py-6 sm:px-5"><strong className="block font-display text-2xl group-hover:text-primary">{title}</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">{children}</span><span className="mt-4 block text-xs font-semibold uppercase tracking-[.14em] text-primary">Open guide →</span></a>;
}
