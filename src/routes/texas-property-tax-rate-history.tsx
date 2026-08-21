import { createFileRoute, Link } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { TaxingUnitSearch } from '@/components/property/TaxingUnitSearch';
import { Container } from '@/components/layout/Container';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';
import type { TexasTaxRateRecord } from '@/data/property/texas-tax-rates.generated';

const canonicalPath = '/texas-property-tax-rate-history';
const description = 'Explore annual Texas property-tax rates for counties, cities, school districts and special districts using historical Comptroller statewide files.';
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);

export const Route = createFileRoute('/texas-property-tax-rate-history')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas Property Tax Rate History Explorer', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebApplication', '@id': `${pageUrl}#tool`, name: 'Texas Property Tax Rate History Explorer', description, url: pageUrl, applicationCategory: 'FinanceApplication', operatingSystem: 'Any' },
        { '@type': 'FAQPage', '@id': `${pageUrl}#faq`, mainEntity: [
          { '@type': 'Question', name: 'Does a higher tax rate always mean a higher property-tax bill?', acceptedAnswer: { '@type': 'Answer', text: 'No. A property-tax bill depends on taxable value, exemptions and the rates of every taxing unit that applies to the parcel. A rate can fall while a bill rises if taxable value rises enough.' } },
          { '@type': 'Question', name: 'What are M&O and I&S property-tax rates?', acceptedAnswer: { '@type': 'Answer', text: 'M&O generally refers to maintenance and operations. I&S, also called debt service, generally funds eligible debt obligations. Not every taxing-unit record reports the components in the same way.' } },
          { '@type': 'Question', name: 'Does this history prove that my property was taxed by the unit every year?', acceptedAnswer: { '@type': 'Answer', text: 'No. The tool shows statewide taxing-unit records. Boundaries, annexations, special districts and parcel jurisdiction can change, so a parcel-level bill or official local record is needed to prove which units applied to a property in a specific year.' } },
        ] },
      ],
    })],
  }),
  component: Page,
});

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
    <article className="mx-auto max-w-6xl">
      <nav className="border-b border-border pb-4 text-xs uppercase tracking-[.14em] text-muted-foreground"><Link to="/property">Property</Link><span className="mx-2">/</span><Link to="/property-tax-calculators">Calculators</Link><span className="mx-2">/</span>Rate history</nav>
      <header className="border-b border-border py-10">
        <p className="eyebrow text-primary">Historical tax data</p>
        <h1 className="mt-3 font-display text-5xl sm:text-7xl">Texas property tax rate history explorer</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Search a county, city, ISD, MUD or other special district and compare its finalized annual statewide records retained by Texas Defined. The tool is designed to answer a narrow but useful question: how did the reported tax rate for this taxing unit change over time?</p>
      </header>

      <section className="grid gap-8 py-10 lg:grid-cols-[15rem_1fr]">
        <div><p className="eyebrow text-primary">Taxing unit</p><h2 className="mt-2 font-display text-3xl">Find a local rate</h2></div>
        <div><TaxingUnitSearch allowVariableSelection onSelect={(record) => void choose(record)} />{selected ? <p className="mt-4 text-sm"><strong>{selected.name}</strong> · {selected.type.replaceAll('-', ' ')}</p> : null}{status ? <p className="mt-3 text-sm text-muted-foreground">{status}</p> : null}</div>
      </section>

      {history.length ? <section className="border-y border-border py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <Fact label="First year" value={`${first?.year}: ${displayRate(first)}`} />
          <Fact label="Latest year" value={`${last?.year}: ${displayRate(last)}`} />
          <Fact label="Net usable fixed-rate change" value={change == null ? 'Not comparable across unavailable/variable years' : `${change >= 0 ? '+' : ''}${change.toFixed(6)}`} />
        </div>
        <div className="mt-8 space-y-4">{history.map((item) => {
          const chartRate = item.rateUnavailable ? 0 : (item.totalRate ?? Math.max(0, ...item.rateVariants));
          return <div key={item.id}><div className="mb-1 flex items-center justify-between gap-4 text-sm"><span>{item.year}</span><strong>{displayRate(item)}</strong></div><div className="h-2 bg-muted">{chartRate > 0 ? <div className="h-full bg-primary" style={{ width: `${Math.max(2, chartRate / max * 100)}%` }} /> : null}</div></div>;
        })}</div>
        <div className="mt-8 overflow-x-auto"><table className="w-full min-w-[48rem] text-left text-sm"><thead><tr className="border-b border-border"><th className="py-3">Year</th><th>Tax rate</th><th>M&O</th><th>Debt / I&S</th><th>Status</th><th>Reported levy</th></tr></thead><tbody>{history.map((item) => <tr key={`${item.id}-row`} className="border-b border-border"><td className="py-3">{item.year}</td><td>{displayRate(item)}</td><td>{item.maintenanceOperationsRate?.toFixed(6) ?? '—'}</td><td>{item.debtServiceRate?.toFixed(6) ?? '—'}</td><td>{item.sourceStatus.replaceAll('-', ' ')}</td><td>{item.levy != null ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(item.levy) : '—'}</td></tr>)}</tbody></table></div>
      </section> : null}

      <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[15rem_1fr]">
        <div><p className="eyebrow text-primary">How to read it</p><h2 className="mt-2 font-display text-4xl">A tax rate is only one part of the bill</h2></div>
        <div className="max-w-3xl space-y-5 text-base leading-8 text-muted-foreground">
          <p>Texas property taxes are imposed by local taxing units. A single property can be inside several of them at once: a county, city, school district, hospital district, municipal utility district, emergency-services district, community-college district or another special district. This explorer follows one taxing unit at a time. It does not add every unit that applies to a particular address.</p>
          <p>A reported rate is generally expressed per $100 of taxable value. That means a rate of 0.500000 is not a 50 percent tax. It represents fifty cents per $100 of the taxable value to which that rate applies. To estimate a real bill, you still need the parcel’s taxable value after exemptions and the rates for every applicable taxing unit.</p>
          <p>That is why rate history and bill history can move differently. A taxing unit can lower its rate while the average tax bill rises because taxable values increased. The reverse can also happen. Use the history here to study the rate itself, then use parcel-level and appraisal records to understand the bill.</p>
        </div>
      </section>

      <section className="grid gap-10 border-b border-border py-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-primary">Rate components</p>
          <h2 className="mt-2 font-display text-4xl">M&O and debt service</h2>
          <div className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground">
            <Explain title="Maintenance and operations (M&O)">M&O generally supports the ordinary operating side of a taxing unit. Depending on the type of unit, that can include personnel, services, maintenance, programs and other ongoing governmental costs. School-district rate structures are governed by additional state rules, so the label should be read in the context of that unit type.</Explain>
            <Explain title="Interest and sinking / debt service (I&S)">Debt-service rates generally support eligible principal and interest obligations. A change can reflect debt issuance, repayment schedules, taxable-value growth, refinancing, voter-approved debt or other factors. The historical rate alone does not identify the cause.</Explain>
            <Explain title="Why some records do not split cleanly">Statewide source files are assembled from many local units and years. Older records, variable-rate records or source conflicts do not always provide a clean M&O/I&S split. Texas Defined preserves the uncertainty rather than manufacturing a component that was not reliably reported.</Explain>
          </div>
        </div>
        <div>
          <p className="eyebrow text-primary">What the tool can answer</p>
          <h2 className="mt-2 font-display text-4xl">Use it for the right question</h2>
          <ul className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
            <Check yes>How a specific county, city, school district or special district reported its rate across available years.</Check>
            <Check yes>Whether a fixed reported rate increased, decreased or stayed relatively stable over the selected history.</Check>
            <Check yes>Whether the source reports M&O, debt-service, levy or variable-rate information for a given year.</Check>
            <Check>Whether your individual parcel was inside that taxing unit in every year shown.</Check>
            <Check>What your actual tax bill was after exemptions, caps, freezes, prorations or parcel-specific changes.</Check>
            <Check>Why a governing body adopted a particular rate in a particular year.</Check>
          </ul>
        </div>
      </section>

      <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[15rem_1fr]">
        <div><p className="eyebrow text-primary">Data methodology</p><h2 className="mt-2 font-display text-4xl">Why we preserve “not reported” and “variable”</h2></div>
        <div className="max-w-3xl space-y-5 text-sm leading-7 text-muted-foreground">
          <p>The history is built from statewide Texas property-tax source snapshots retained by Texas Defined. Source files change format over time, and a taxing unit can appear under different names or with different component detail from one year to another. The matching layer uses the taxing-unit identity and type rather than pretending every text label is perfectly stable.</p>
          <p>Records marked <strong className="text-foreground">not reported</strong> are not treated as zero. A missing rate is missing information, not a tax rate of 0.000000. Records marked <strong className="text-foreground">variable</strong> are likewise not collapsed into a false single number. If the source carries multiple possible rates or the rate depends on a local condition, the tool shows that uncertainty.</p>
          <p>The comparison math only uses fixed rates that can be compared without inventing data. That is why the summary may say a net change is not comparable even when several years are displayed. This is intentional: a smaller honest dataset is more useful than a smooth chart built from assumptions.</p>
          <p>Historical rates are statewide source snapshots. A rate history does not prove that a particular parcel was inside the taxing unit in every year shown. Annexations, deannexations, new special districts, district dissolutions and boundary changes can all alter which units apply to an address.</p>
        </div>
      </section>

      <section className="border-b border-border py-12">
        <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Next step</p><h2 className="mt-2 font-display text-4xl">Turn the rate into a property-tax answer</h2></div>
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
        <h2 className="mt-2 font-display text-4xl">Rate-history questions</h2>
        <div className="mt-7 grid gap-x-8 md:grid-cols-2">
          <Explain title="Does a lower rate mean my bill went down?">Not necessarily. Your bill depends on taxable value, exemptions and every applicable taxing unit. Rate compression can occur at the same time that taxable values rise.</Explain>
          <Explain title="Can I use this to prove my parcel’s past taxes?">No. Use historical tax bills, appraisal records and official parcel-level records for that. This tool tracks taxing-unit rate records, not parcel jurisdiction.</Explain>
          <Explain title="Why are six decimal places shown?">State and local source files often report rates with that precision. Keeping the source precision makes small year-to-year changes visible and avoids rounding a rate before comparison.</Explain>
          <Explain title="Why do some units have only a few years?">A unit may be new, renamed, dissolved, unmatched in an older source file, absent from a particular statewide file or represented in a format that cannot be safely normalized. We do not fill missing years with guesses.</Explain>
        </div>
      </section>
    </article>
  </Container>;
}

function Fact({ label, value }: { label: string; value: string }) { return <div className="border-t border-border pt-3"><span className="text-xs uppercase tracking-[.12em] text-muted-foreground">{label}</span><strong className="mt-1 block font-display text-2xl">{value}</strong></div>; }
function Explain({ title, children }: { title: string; children: React.ReactNode }) { return <div className="border-t border-border py-5"><h3 className="font-display text-2xl text-foreground">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{children}</p></div>; }
function Check({ yes = false, children }: { yes?: boolean; children: React.ReactNode }) { return <li className="grid grid-cols-[1.5rem_1fr] gap-3 border-t border-border pt-3"><span className="font-semibold text-primary">{yes ? '✓' : '—'}</span><span>{children}</span></li>; }
function GuideLink({ href, title, children }: { href: string; title: string; children: React.ReactNode }) { return <a href={href} className="group border-b border-border py-6 sm:px-5"><strong className="block font-display text-2xl group-hover:text-primary">{title}</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">{children}</span><span className="mt-4 block text-xs font-semibold uppercase tracking-[.14em] text-primary">Open guide →</span></a>; }
