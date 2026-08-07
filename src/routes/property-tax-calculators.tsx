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
  return <label className="block border-t border-border pt-4 text-sm font-semibold"><span>{label}</span><input className="mt-2 w-full border-0 border-b border-border bg-transparent px-0 py-3 text-lg outline-none focus:border-primary" type="number" min="0" step={step} value={value} onChange={(event) => onChange(Number(event.target.value) || 0)} /></label>;
}

function Result({ label, value }: { label: string; value: string }) {
  return <div className="border-t border-border py-4"><span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</span><strong className="mt-1 block font-display text-3xl text-primary">{value}</strong></div>;
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

  return <main>
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <article className="mx-auto max-w-6xl">
        <header className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <p className="eyebrow text-primary">Planning tools</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas property-tax calculator toolkit</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">Use these calculators for planning and comparison. Enter the exact values, exemptions and combined rates from official local records before making a financial decision.</p>
          </div>
          <p className="border-l border-border pl-6 text-sm leading-6 text-muted-foreground">These tools model common scenarios. They do not determine eligibility, taxable value, adopted rates or final liability.</p>
        </header>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Core assumptions</p><h2 className="mt-2 font-display text-3xl">Set the baseline</h2></div>
          <div>
            <div className="grid gap-5 md:grid-cols-4">
              <NumberField label="Property value" value={homeValue} onChange={setHomeValue} />
              <NumberField label="Combined tax rate (%)" value={rate} onChange={setRate} step={0.01} />
              <NumberField label="Total exemptions" value={exemption} onChange={setExemption} />
              <NumberField label="Annual insurance" value={insurance} onChange={setInsurance} />
            </div>
            <div className="mt-8 grid gap-x-6 md:grid-cols-3">{summaries.map(([label, value]) => <Result key={label} label={label} value={value} />)}</div>
          </div>
        </section>

        <div className="divide-y divide-border">
          <ToolSection eyebrow="Exemptions" title="Homestead savings estimator" copy="Compares the entered exemption amount with the same value taxed without that exemption.">
            <Result label="Estimated annual savings" value={money(homesteadSavings)} />
          </ToolSection>

          <ToolSection eyebrow="Appraisal" title="Protest savings estimator">
            <div className="grid gap-5 sm:grid-cols-2"><NumberField label="Proposed value" value={proposedValue} onChange={setProposedValue} /><NumberField label="Target value" value={targetValue} onChange={setTargetValue} /></div>
            <Result label="Estimated annual savings if reduced" value={money(protestSavings)} />
          </ToolSection>

          <ToolSection eyebrow="Monthly planning" title="Escrow estimator" copy="Combines the estimated annual property tax with the insurance amount entered above.">
            <Result label="Estimated monthly escrow" value={money(monthlyEscrow)} />
          </ToolSection>

          <ToolSection eyebrow="Age 65+" title="Senior exemption scenario" copy="Enter the total exemption amount that applies to the property and taxing units in the core assumptions. The result shows the estimated tax under that scenario.">
            <Result label="Estimated annual tax under entered exemptions" value={money(annualTax)} />
          </ToolSection>

          <ToolSection eyebrow="Veterans" title="Disabled-veteran exemption estimator">
            <NumberField label="Veteran exemption amount" value={veteranExemption} onChange={setVeteranExemption} />
            <Result label="Estimated annual savings" value={money(veteranSavings)} />
          </ToolSection>

          <ToolSection eyebrow="Compare places" title="County rate comparison">
            <div className="grid gap-5 sm:grid-cols-2"><NumberField label="Location A rate (%)" value={countyRateA} onChange={setCountyRateA} step={0.01} /><NumberField label="Location B rate (%)" value={countyRateB} onChange={setCountyRateB} step={0.01} /></div>
            <div className="grid gap-x-6 sm:grid-cols-2"><Result label="Location A annual tax" value={money(countyA)} /><Result label="Location B annual tax" value={money(countyB)} /></div>
          </ToolSection>

          <ToolSection eyebrow="Land" title="Agricultural valuation scenario" copy="This illustrates the tax difference between market-value taxation and an entered productivity value. Qualification and rollback or additional taxes require official review.">
            <div className="grid gap-5 sm:grid-cols-2"><NumberField label="Market land value" value={marketLandValue} onChange={setMarketLandValue} /><NumberField label="Productivity value" value={productivityValue} onChange={setProductivityValue} /></div>
            <Result label="Illustrative annual tax difference" value={money(agDifference)} />
          </ToolSection>
        </div>

        <p className="border-t border-border pt-6 text-sm leading-6 text-muted-foreground">Confirm every input with the appraisal district, taxing units, collecting office and mortgage servicer before relying on an estimate.</p>
      </article>
    </Container>
  </main>;
}

function ToolSection({ eyebrow, title, copy, children }: { eyebrow: string; title: string; copy?: string; children: React.ReactNode }) {
  return <section className="grid gap-8 py-10 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">{eyebrow}</p><h2 className="mt-2 font-display text-3xl leading-tight">{title}</h2>{copy ? <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p> : null}</div><div className="space-y-6">{children}</div></section>;
}
