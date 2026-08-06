import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

import { texasDefinedBrand } from '@/brand/texasdefined';
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

const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number.isFinite(value) ? value : 0);
const tax = (value: number, rate: number) => Math.max(0, value) * Math.max(0, rate) / 100;

function NumberField({ label, value, onChange, step = 1000 }: { label: string; value: number; onChange: (value: number) => void; step?: number }) {
  return <label className="grid gap-2 text-sm font-medium"><span>{label}</span><input className="rounded-md border border-border bg-background px-3 py-2" type="number" min="0" step={step} value={value} onChange={(event) => onChange(Number(event.target.value) || 0)} /></label>;
}

function Result({ label, value }: { label: string; value: string }) {
  return <div className="rounded-md bg-muted p-4"><span className="text-sm text-muted-foreground">{label}</span><strong className="mt-1 block font-display text-2xl">{value}</strong></div>;
}

function PropertyTaxCalculatorToolkit() {
  const [homeValue, setHomeValue] = useState(400000);
  const [rate, setRate] = useState(2.2);
  const [exemption, setExemption] = useState(140000);
  const [proposedValue, setProposedValue] = useState(450000);
  const [targetValue, setTargetValue] = useState(410000);
  const [insurance, setInsurance] = useState(3600);
  const [veteranExemption, setVeteranExemption] = useState(12000);
  const [countyRateA, setCountyRateA] = useState(2.1);
  const [countyRateB, setCountyRateB] = useState(2.6);
  const [marketLandValue, setMarketLandValue] = useState(500000);
  const [productivityValue, setProductivityValue] = useState(70000);

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
    ['Estimated annual tax', money(annualTax)],
    ['Estimated monthly tax escrow', money(annualTax / 12)],
    ['Tax and insurance escrow', money(monthlyEscrow)],
  ], [annualTax, monthlyEscrow]);

  return <Container className="py-16 sm:py-24">
    <p className="eyebrow text-primary">Planning tools</p>
    <h1 className="mt-3 max-w-4xl font-display text-4xl leading-tight sm:text-6xl">Texas property-tax calculator toolkit</h1>
    <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">Use these calculators for planning and comparison. Enter the exact values, exemptions and combined rates from official local records before making a financial decision.</p>

    <section className="mt-10 rounded-md border border-border p-6">
      <h2 className="font-display text-3xl">Core assumptions</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-4">
        <NumberField label="Property value" value={homeValue} onChange={setHomeValue} />
        <NumberField label="Combined tax rate (%)" value={rate} onChange={setRate} step={0.01} />
        <NumberField label="Total exemptions" value={exemption} onChange={setExemption} />
        <NumberField label="Annual insurance" value={insurance} onChange={setInsurance} />
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">{summaries.map(([label, value]) => <Result key={label} label={label} value={value} />)}</div>
    </section>

    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <section className="rounded-md border border-border p-6">
        <h2 className="font-display text-2xl">Homestead savings estimator</h2>
        <p className="mt-2 text-sm text-muted-foreground">Compares the entered exemption amount with the same value taxed without that exemption.</p>
        <div className="mt-4"><Result label="Estimated annual savings" value={money(homesteadSavings)} /></div>
      </section>

      <section className="rounded-md border border-border p-6">
        <h2 className="font-display text-2xl">Protest savings estimator</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <NumberField label="Proposed value" value={proposedValue} onChange={setProposedValue} />
          <NumberField label="Target value" value={targetValue} onChange={setTargetValue} />
        </div>
        <div className="mt-4"><Result label="Estimated annual savings if reduced" value={money(protestSavings)} /></div>
      </section>

      <section className="rounded-md border border-border p-6">
        <h2 className="font-display text-2xl">Escrow estimator</h2>
        <p className="mt-2 text-sm text-muted-foreground">Combines the estimated annual property tax with the insurance amount entered above.</p>
        <div className="mt-4"><Result label="Estimated monthly escrow" value={money(monthlyEscrow)} /></div>
      </section>

      <section className="rounded-md border border-border p-6">
        <h2 className="font-display text-2xl">Senior exemption scenario</h2>
        <p className="mt-2 text-sm text-muted-foreground">Enter the total exemption amount that applies to the property and taxing units in the core assumptions. The result above shows the estimated tax and monthly escrow under that scenario.</p>
        <div className="mt-4"><Result label="Estimated annual tax under entered exemptions" value={money(annualTax)} /></div>
      </section>

      <section className="rounded-md border border-border p-6">
        <h2 className="font-display text-2xl">Disabled-veteran exemption estimator</h2>
        <NumberField label="Veteran exemption amount" value={veteranExemption} onChange={setVeteranExemption} />
        <div className="mt-4"><Result label="Estimated annual savings" value={money(veteranSavings)} /></div>
      </section>

      <section className="rounded-md border border-border p-6">
        <h2 className="font-display text-2xl">County rate comparison</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <NumberField label="Location A rate (%)" value={countyRateA} onChange={setCountyRateA} step={0.01} />
          <NumberField label="Location B rate (%)" value={countyRateB} onChange={setCountyRateB} step={0.01} />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2"><Result label="Location A annual tax" value={money(countyA)} /><Result label="Location B annual tax" value={money(countyB)} /></div>
      </section>

      <section className="rounded-md border border-border p-6 lg:col-span-2">
        <h2 className="font-display text-2xl">Agricultural valuation scenario</h2>
        <p className="mt-2 text-sm text-muted-foreground">This illustrates the tax difference between market-value taxation and an entered productivity value. Qualification and rollback or additional taxes require official review.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <NumberField label="Market land value" value={marketLandValue} onChange={setMarketLandValue} />
          <NumberField label="Productivity value" value={productivityValue} onChange={setProductivityValue} />
        </div>
        <div className="mt-4"><Result label="Illustrative annual tax difference" value={money(agDifference)} /></div>
      </section>
    </div>

    <p className="mt-8 text-sm leading-6 text-muted-foreground">These estimates are educational and do not determine eligibility, official taxable value, adopted tax rates, escrow requirements or final liability. Confirm every input with the appraisal district, taxing units, collecting office and mortgage servicer.</p>
  </Container>;
}
