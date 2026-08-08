import { createFileRoute, Link } from '@tanstack/react-router';
import { useCallback, useMemo, useState } from 'react';

import { texasDefinedBrand } from '@/brand/texasdefined';
import {
  CalculatorActions,
  CalculatorCountyLink,
  CalculatorResult,
  CalculatorSection,
  ComparisonBars,
  CountySelector,
  CurrencyInput,
  PercentageInput,
  ResultGrid,
  formatMoney,
  useCalculatorPersistence,
  useUrlStateDefaults,
  type CalculatorState,
} from '@/components/property/PropertyCalculatorFramework';
import { Container } from '@/components/layout/Container';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/property-tax-calculators';
const description = 'Specialized Texas property-tax calculators for homestead savings, protest savings, escrow planning, senior and veteran exemptions, county comparisons and agricultural valuation scenarios.';

export const Route = createFileRoute('/property-tax-calculators')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Texas Property Tax Calculator Toolkit',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      '@id': `${absoluteUrl(texasDefinedBrand, canonicalPath)}#app`,
      name: 'Texas Property Tax Calculator Toolkit',
      description,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      url: absoluteUrl(texasDefinedBrand, canonicalPath),
    })],
  }),
  component: PropertyTaxCalculatorToolkit,
});

const tax = (value: number, rate: number) => Math.max(0, value) * Math.max(0, rate) / 100;

const DEFAULTS = {
  homeValue: 400000,
  rate: 2.2,
  exemption: 140000,
  proposedValue: 450000,
  targetValue: 410000,
  insurance: 3600,
  veteranExemption: 12000,
  countyRateA: 2.1,
  countyRateB: 2.6,
  marketLandValue: 500000,
  productivityValue: 70000,
  county: '',
} satisfies CalculatorState;

type ToolkitState = typeof DEFAULTS;

function PropertyTaxCalculatorToolkit() {
  const initial = useUrlStateDefaults(DEFAULTS);
  const [homeValue, setHomeValue] = useState(Number(initial.homeValue));
  const [rate, setRate] = useState(Number(initial.rate));
  const [exemption, setExemption] = useState(Number(initial.exemption));
  const [proposedValue, setProposedValue] = useState(Number(initial.proposedValue));
  const [targetValue, setTargetValue] = useState(Number(initial.targetValue));
  const [insurance, setInsurance] = useState(Number(initial.insurance));
  const [veteranExemption, setVeteranExemption] = useState(Number(initial.veteranExemption));
  const [countyRateA, setCountyRateA] = useState(Number(initial.countyRateA));
  const [countyRateB, setCountyRateB] = useState(Number(initial.countyRateB));
  const [marketLandValue, setMarketLandValue] = useState(Number(initial.marketLandValue));
  const [productivityValue, setProductivityValue] = useState(Number(initial.productivityValue));
  const [county, setCounty] = useState(String(initial.county));

  const state = useMemo<ToolkitState>(() => ({
    homeValue,
    rate,
    exemption,
    proposedValue,
    targetValue,
    insurance,
    veteranExemption,
    countyRateA,
    countyRateB,
    marketLandValue,
    productivityValue,
    county,
  }), [homeValue, rate, exemption, proposedValue, targetValue, insurance, veteranExemption, countyRateA, countyRateB, marketLandValue, productivityValue, county]);

  const restoreState = useCallback((next: ToolkitState) => {
    setHomeValue(Number(next.homeValue));
    setRate(Number(next.rate));
    setExemption(Number(next.exemption));
    setProposedValue(Number(next.proposedValue));
    setTargetValue(Number(next.targetValue));
    setInsurance(Number(next.insurance));
    setVeteranExemption(Number(next.veteranExemption));
    setCountyRateA(Number(next.countyRateA));
    setCountyRateB(Number(next.countyRateB));
    setMarketLandValue(Number(next.marketLandValue));
    setProductivityValue(Number(next.productivityValue));
    setCounty(String(next.county));
  }, []);

  const persistence = useCalculatorPersistence({
    storageKey: 'texasdefined:property-tax-calculator-toolkit',
    state,
    onRestore: restoreState,
  });

  const taxable = Math.max(0, homeValue - exemption);
  const homesteadSavings = tax(Math.min(homeValue, exemption), rate);
  const protestSavings = tax(Math.max(0, proposedValue - targetValue), rate);
  const annualTax = tax(taxable, rate);
  const monthlyEscrow = (annualTax + insurance) / 12;
  const veteranSavings = tax(Math.min(homeValue, veteranExemption), rate);
  const countyA = tax(taxable, countyRateA);
  const countyB = tax(taxable, countyRateB);
  const agDifference = tax(Math.max(0, marketLandValue - productivityValue), rate);

  const summaries = useMemo(() => [
    ['Estimated annual tax', formatMoney(annualTax)],
    ['Estimated monthly tax escrow', formatMoney(annualTax / 12)],
    ['Tax and insurance escrow', formatMoney(monthlyEscrow)],
  ], [annualTax, monthlyEscrow]);

  return <>
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <article className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground"><Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/property">Property</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page" className="text-foreground">Property-tax calculator toolkit</span></nav>
        <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <p className="eyebrow text-primary">Property Taxes</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas property-tax calculator toolkit</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">Use these calculators for planning and comparison. Enter the exact values, exemptions and combined rates from official local records before making a financial decision.</p>
          </div>
          <p className="border-l border-border pl-6 text-sm leading-6 text-muted-foreground">These tools model common scenarios. They do not determine eligibility, taxable value, adopted rates or final liability.</p>
        </header>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Core assumptions</p><h2 className="mt-2 font-display text-3xl">Set the baseline</h2></div>
          <div className="space-y-7">
            <div className="grid gap-5 md:grid-cols-4">
              <CurrencyInput label="Property value" value={homeValue} onChange={setHomeValue} />
              <PercentageInput label="Combined tax rate" value={rate} onChange={setRate} step={0.01} />
              <CurrencyInput label="Total exemptions" value={exemption} onChange={setExemption} />
              <CurrencyInput label="Annual insurance" value={insurance} onChange={setInsurance} />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <CountySelector value={county} onChange={setCounty} />
              <div className="border-t border-border pt-4"><p className="text-sm font-semibold">County guide</p><div className="mt-4"><CalculatorCountyLink countySlug={county} /></div></div>
            </div>
            <ResultGrid>{summaries.map(([label, value]) => <CalculatorResult key={label} label={label} value={value} />)}</ResultGrid>
            <CalculatorActions onSave={persistence.save} onRestore={persistence.restore} onShare={persistence.share} onPrint={persistence.print} status={persistence.status} />
          </div>
        </section>

        <div className="divide-y divide-border">
          <CalculatorSection eyebrow="Exemptions" title="Homestead savings estimator" copy="Compares the entered exemption amount with the same value taxed without that exemption.">
            <CalculatorResult label="Estimated annual savings" value={formatMoney(homesteadSavings)} />
          </CalculatorSection>

          <CalculatorSection eyebrow="Appraisal" title="Protest savings estimator">
            <div className="grid gap-5 sm:grid-cols-2"><CurrencyInput label="Proposed value" value={proposedValue} onChange={setProposedValue} /><CurrencyInput label="Target value" value={targetValue} onChange={setTargetValue} /></div>
            <CalculatorResult label="Estimated annual savings if reduced" value={formatMoney(protestSavings)} />
          </CalculatorSection>

          <CalculatorSection eyebrow="Monthly planning" title="Escrow estimator" copy="Combines the estimated annual property tax with the insurance amount entered above.">
            <CalculatorResult label="Estimated monthly escrow" value={formatMoney(monthlyEscrow)} />
          </CalculatorSection>

          <CalculatorSection eyebrow="Age 65+" title="Senior exemption scenario" copy="Enter the total exemption amount that applies to the property and taxing units in the core assumptions. The result shows the estimated tax under that scenario.">
            <CalculatorResult label="Estimated annual tax under entered exemptions" value={formatMoney(annualTax)} />
          </CalculatorSection>

          <CalculatorSection eyebrow="Veterans" title="Disabled-veteran exemption estimator">
            <CurrencyInput label="Veteran exemption amount" value={veteranExemption} onChange={setVeteranExemption} />
            <CalculatorResult label="Estimated annual savings" value={formatMoney(veteranSavings)} />
          </CalculatorSection>

          <CalculatorSection eyebrow="Compare places" title="County rate comparison">
            <div className="grid gap-5 sm:grid-cols-2"><PercentageInput label="Location A rate" value={countyRateA} onChange={setCountyRateA} step={0.01} /><PercentageInput label="Location B rate" value={countyRateB} onChange={setCountyRateB} step={0.01} /></div>
            <ResultGrid><CalculatorResult label="Location A annual tax" value={formatMoney(countyA)} /><CalculatorResult label="Location B annual tax" value={formatMoney(countyB)} /></ResultGrid>
            <ComparisonBars items={[{ label: 'Location A', value: countyA }, { label: 'Location B', value: countyB }]} />
          </CalculatorSection>

          <CalculatorSection eyebrow="Land" title="Agricultural valuation scenario" copy="This illustrates the tax difference between market-value taxation and an entered productivity value. Qualification and rollback or additional taxes require official review.">
            <div className="grid gap-5 sm:grid-cols-2"><CurrencyInput label="Market land value" value={marketLandValue} onChange={setMarketLandValue} /><CurrencyInput label="Productivity value" value={productivityValue} onChange={setProductivityValue} /></div>
            <CalculatorResult label="Illustrative annual tax difference" value={formatMoney(agDifference)} />
          </CalculatorSection>
        </div>

        <p className="border-t border-border pt-6 text-sm leading-6 text-muted-foreground">Confirm every input with the appraisal district, taxing units, collecting office and mortgage servicer before relying on an estimate.</p>
      </article>
    </Container>
  </>;
}
