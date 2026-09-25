import { createFileRoute, Link } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { TaxingUnitSearch } from '@/components/property/TaxingUnitSearch';
import { CalculatorActions, CalculatorResult, CalculatorSection, CurrencyInput, NumberInput, PercentageInput, ResultGrid, formatMoney, useCalculatorPersistence, useUrlStateDefaults, type CalculatorState } from '@/components/property/PropertyCalculatorFramework';
import { Container } from '@/components/layout/Container';
import { calculateSpecialDistrictImpact } from '@/lib/financial/property-tax';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';
import type { TexasTaxRateRecord } from '@/data/property/texas-tax-rates.generated';

const canonicalPath = '/texas-mud-tax-impact-calculator';
const description = 'Estimate the annual, monthly and long-term property-tax impact of a Texas MUD or other special district using official Comptroller-reported rates.';
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);

interface MudState extends CalculatorState { value: number; rate: number; years: number }
const DEFAULTS: MudState = { value: 400000, rate: .75, years: 10 };

export const Route = createFileRoute('/texas-mud-tax-impact-calculator')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas MUD Tax Impact Calculator', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({ '@context': 'https://schema.org', '@type': 'WebApplication', '@id': `${pageUrl}#calculator`, name: 'Texas MUD Tax Impact Calculator', description, url: pageUrl, applicationCategory: 'FinanceApplication', operatingSystem: 'Any' })],
  }),
  component: Page,
});

function Page() {
  const initial = useUrlStateDefaults(DEFAULTS);
  const [state, setState] = useState<MudState>(initial);
  const [selected, setSelected] = useState<TexasTaxRateRecord | null>(null);
  const result = useMemo(() => calculateSpecialDistrictImpact({ taxableValue: state.value, ratePercent: state.rate, years: state.years }), [state]);
  const persistence = useCalculatorPersistence({ storageKey: 'texasdefined:mud-impact:v2', state, onRestore: setState });
  const update = (key: keyof MudState, value: number) => setState((current) => ({ ...current, [key]: value }));

  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16"><article className="mx-auto max-w-6xl">
    <nav className="border-b border-border pb-4 text-xs uppercase tracking-[.14em] text-muted-foreground"><Link to="/property">Property</Link><span className="mx-2">/</span><Link to="/property-tax-calculators">Calculators</Link><span className="mx-2">/</span>MUD impact</nav>
    <header className="border-b border-border py-10"><p className="eyebrow text-primary">Special-district calculator</p><h1 className="mt-3 font-display text-5xl sm:text-7xl">Texas MUD tax impact calculator</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Measure what a municipal utility district or other special-district rate adds to a property's annual and monthly cost. Search the official statewide rate file or enter a verified rate manually.</p></header>
    <CalculatorSection eyebrow="District" title="Find the special district"><TaxingUnitSearch type="special-district" label="Search MUD / special district" onSelect={(record) => { setSelected(record); if (record.totalRate != null && !record.variableRate) setState((current) => ({ ...current, rate: record.totalRate! })); }}/>{selected ? <div className="border-l-2 border-primary pl-4 text-sm"><strong>{selected.name}</strong><p className="mt-1 text-muted-foreground">{selected.year} reported rate: {selected.totalRate != null && !selected.variableRate ? `${selected.totalRate.toFixed(6)} per $100` : `variable — ${selected.rateVariants.map((value) => value.toFixed(6)).join(' / ')}; verify parcel`} · counties: {selected.countySlugs.join(', ')}</p></div> : null}</CalculatorSection>
    <CalculatorSection eyebrow="Inputs" title="Set value and planning horizon"><div className="grid gap-5 md:grid-cols-3"><CurrencyInput label="Taxable value" value={state.value} onChange={(value) => update('value', value)}/><PercentageInput label="District tax rate" value={state.rate} onChange={(value) => update('rate', value)} step={.0001}/><NumberInput label="Years at same rate" value={state.years} onChange={(value) => update('years', value)} min={1} max={100} suffix="years"/></div></CalculatorSection>
    <CalculatorActions onSave={persistence.save} onRestore={persistence.restore} onShare={persistence.share} onPrint={persistence.print} status={persistence.status} onReset={() => { setState(DEFAULTS); setSelected(null); }}/>
    <section className="border-y border-border py-10" aria-live="polite" aria-atomic="true"><ResultGrid><CalculatorResult label="Annual district tax" value={formatMoney(result.annual)}/><CalculatorResult label="Monthly equivalent" value={formatMoney(result.monthly)}/><CalculatorResult label={`${result.years}-year simple total`} value={formatMoney(result.horizonSimple)}/></ResultGrid><p className="mt-6 text-sm leading-6 text-muted-foreground">Five-year simple total at an unchanged rate and taxable value: <strong className="text-foreground">{formatMoney(result.fiveYearSimple)}</strong>.</p></section>
    <p className="mt-8 text-sm leading-6 text-muted-foreground">This is a simple impact model. MUD and other district rates, taxable values, debt-service components and parcel boundaries can change over time. Search results with variable official rates are not auto-applied; confirm the parcel-specific district rate before a purchase or closing.</p>
  </article></Container>;
}
