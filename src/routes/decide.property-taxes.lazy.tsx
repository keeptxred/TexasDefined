import { useMemo, useState } from 'react';
import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { OfficialTaxRateAssist } from '@/components/property/OfficialTaxRateAssist';
import {
  BreakdownTable,
  CalculatorActions,
  CalculatorResult,
  CountySelector,
  CurrencyInput,
  MethodologyPanel,
  PercentageInput,
  ResultGrid,
  useCalculatorPersistence,
  useUrlStateDefaults,
} from '@/components/property/PropertyCalculatorFramework';
import { calculatePropertyTax } from '@/lib/financial/property-tax';
import { description, propertyTaxFaqs } from './decide.property-taxes';

export const Route = createLazyFileRoute('/decide/property-taxes')({
  component: Page,
});

type PropertyTaxState = {
  taxableValue: number;
  rate: number;
  county: string;
  rateYear: number;
};

const DEFAULTS: PropertyTaxState = {
  taxableValue: 400000,
  rate: 2.1,
  county: '',
  rateYear: 2025,
};

function Page() {
  const urlDefaults = useUrlStateDefaults(DEFAULTS);
  const [state, setState] = useState<PropertyTaxState>(urlDefaults);
  const annual = useMemo(() => calculatePropertyTax(state.taxableValue, state.rate), [state.rate, state.taxableValue]);
  const monthly = annual / 12;
  const persistence = useCalculatorPersistence({
    storageKey: 'texasdefined:property-tax-quick:v2',
    state,
    onRestore: setState,
  });

  return <>
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <article className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/property">Property</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page" className="text-foreground">Property taxes</span>
        </nav>

        <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <p className="eyebrow text-primary">Quick estimate</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas property tax calculator</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{description}</p>
          </div>
          <p className="border-l border-border pl-6 text-sm leading-6 text-muted-foreground">Use the taxable value shown for the scenario you are estimating. Do not subtract one exemption from a combined rate when different taxing units use different exemptions.</p>
        </header>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Your assumptions</p><h2 className="mt-2 font-display text-3xl">Start with taxable value</h2></div>
          <div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <CurrencyInput label="Taxable value for this rate" value={state.taxableValue} step={1000} onChange={(value) => setState((current) => ({ ...current, taxableValue: value }))} />
              <PercentageInput label="Combined local rate" value={state.rate} step={0.001} min={0} max={20} onChange={(value) => setState((current) => ({ ...current, rate: value }))} help="Enter a combined rate only when it represents the taxing units that actually apply to this property." />
              <CountySelector value={state.county} onChange={(value) => setState((current) => ({ ...current, county: value }))} />
            </div>
            <div className="mt-6">
              <OfficialTaxRateAssist
                countySlug={state.county}
                title="Fill this estimate from official local tax rates"
                onApply={(rates) => setState((current) => ({ ...current, rate: rates.combinedRate, rateYear: rates.year }))}
              />
            </div>
          </div>
        </section>

        <CalculatorActions
          onSave={persistence.save}
          onRestore={persistence.restore}
          onShare={persistence.share}
          onPrint={persistence.print}
          status={persistence.status}
          onReset={() => setState(DEFAULTS)}
        />

        <section className="py-10" aria-live="polite" aria-atomic="true">
          <div className="border-b border-border pb-4"><p className="eyebrow text-primary">Estimate</p><h2 className="mt-2 font-display text-4xl">What that could mean</h2></div>
          <ResultGrid>
            <CalculatorResult label="Estimated annual tax" value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(annual)} note={`${state.rateYear} selected-rate scenario when official rates are applied`} />
            <CalculatorResult label="Estimated monthly cost" value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(monthly)} />
          </ResultGrid>
          <div className="mt-8 max-w-2xl">
            <BreakdownTable items={[{ label: 'Taxable value × selected combined rate', value: annual }]} total={annual} totalLabel="Estimated annual property tax" />
          </div>
        </section>

        <aside className="grid gap-6 border-y border-border py-7 lg:grid-cols-[12rem_1fr]">
          <strong className="font-display text-2xl">Need exemptions modeled?</strong>
          <div className="text-sm leading-6 text-muted-foreground"><p>Texas taxing units can use different taxable values and exemptions. Use the production calculator toolkit when exemptions, ceilings or special appraisal matter.</p><Link to="/property-tax-calculators" className="mt-3 inline-block font-semibold text-primary underline underline-offset-4">Open the property-tax calculators →</Link></div>
        </aside>

        <MethodologyPanel>
          <p>TexasDefined multiplies the entered taxable value by the selected rate using the same shared property-tax engine used by the related Texas property-tax tools.</p>
          <p>When you apply official local rates, the rate year is preserved with the scenario. An official adopted rate does not prove that a taxing unit applies to a particular parcel, and exemptions can create different taxable values for different taxing units.</p>
          <p>For the closest estimate, calculate each applicable taxing unit separately with its own taxable value and adopted rate, then add the line items together.</p>
        </MethodologyPanel>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Property-tax relief</p><h2 className="mt-2 font-display text-3xl">How Texas property tax relief works</h2></div>
          <div className="max-w-3xl space-y-5 text-base leading-7 text-muted-foreground">
            <p>Texas property-tax relief generally works by reducing taxable value, limiting certain school-tax increases, or applying special exemptions or protections to eligible homeowners.</p>
            <p>Homestead exemptions, age-65 relief and disabled-veteran benefits can affect different taxing units in different ways, so one combined-rate estimate should be treated as a starting point rather than a final bill.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2 text-sm font-semibold text-foreground"><Link to="/texas-homestead-savings-calculator" className="underline underline-offset-4">Homestead savings calculator</Link><Link to="/learn/over-65-property-tax-guide" className="underline underline-offset-4">Age-65 property-tax relief</Link><Link to="/learn/disabled-veteran-property-tax-benefits" className="underline underline-offset-4">Disabled-veteran benefits</Link></div>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">FAQ</p><h2 className="mt-2 font-display text-3xl">Texas property tax calculator FAQ</h2></div>
          <div className="max-w-3xl divide-y divide-border">
            {propertyTaxFaqs.map((faq) => <div key={faq.question} className="py-5 first:pt-0"><h3 className="font-display text-2xl">{faq.question}</h3><p className="mt-2 text-base leading-7 text-muted-foreground">{faq.answer}</p></div>)}
          </div>
        </section>

        <section className="grid gap-8 py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Field notes</p><h2 className="mt-2 font-display text-3xl">Make the estimate more useful</h2></div>
          <div className="max-w-3xl space-y-5 text-base leading-7 text-muted-foreground">
            <p>For the closest estimate, calculate each taxing unit separately using its own taxable value and adopted rate, then add the line items together.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2 text-sm font-semibold text-foreground"><Link to="/learn/property-taxes" className="underline underline-offset-4">Understand the full tax bill</Link><Link to="/property-tax/counties" className="underline underline-offset-4">Find your county guide</Link><Link to="/texas-homestead-savings-calculator" className="underline underline-offset-4">Homestead savings calculator</Link></div>
          </div>
        </section>
      </article>
    </Container>
  </>;
}
