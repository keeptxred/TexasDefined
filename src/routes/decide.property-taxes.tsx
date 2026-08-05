import { useMemo, useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Get a quick annual and monthly estimate using the home value, exemptions and combined local rate for an address.';
const canonicalPath = '/decide/property-taxes';

export const Route = createFileRoute('/decide/property-taxes')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath,
    title: 'Estimate Your Property Taxes',
    description,
    featureList: [
      'Estimate taxable value after exemptions',
      'Estimate annual property taxes',
      'Estimate monthly property-tax cost',
    ],
  }),
  component: Page,
});

function Page() {
  const [value, setValue] = useState(400000);
  const [exemptions, setExemptions] = useState(140000);
  const [rate, setRate] = useState(2.1);
  const result = useMemo(() => { const taxable = Math.max(0, value - exemptions); const annual = taxable * rate / 100; return { taxable, annual, monthly: annual / 12 }; }, [value, exemptions, rate]);
  const money = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  return <Container className="py-16 sm:py-24"><article className="mx-auto max-w-4xl">
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground"><Link to="/">Home</Link><span aria-hidden="true"> / </span><Link to="/decide/financial-tools">Money Made Clearer</Link><span aria-hidden="true"> / </span><span aria-current="page">Property-tax estimate</span></nav>
    <p className="eyebrow text-primary">Know before you buy</p><h1 className="mt-3 font-display text-4xl sm:text-6xl">Estimate your property taxes</h1><p className="mt-5 text-lg leading-8 text-muted-foreground">{description}</p>
    <section className="mt-10 grid gap-5 rounded-lg border border-border p-6 sm:grid-cols-3">
      <label className="space-y-2"><span className="text-sm font-medium">Home value</span><input className="w-full rounded border border-border bg-background p-3" type="number" min="0" step="1000" value={value} onChange={e => setValue(Number(e.target.value) || 0)} /></label>
      <label className="space-y-2"><span className="text-sm font-medium">Exemptions you expect</span><input className="w-full rounded border border-border bg-background p-3" type="number" min="0" step="1000" value={exemptions} onChange={e => setExemptions(Number(e.target.value) || 0)} /></label>
      <label className="space-y-2"><span className="text-sm font-medium">Combined local rate (%)</span><input className="w-full rounded border border-border bg-background p-3" type="number" min="0" step="0.01" value={rate} onChange={e => setRate(Number(e.target.value) || 0)} /></label>
    </section>
    <section className="mt-6 grid gap-4 sm:grid-cols-3">{[['Estimated taxable value', money(result.taxable)], ['About this much a year', money(result.annual)], ['About this much a month', money(result.monthly)]].map(([label, amount]) => <div key={label} className="rounded-lg bg-muted p-5"><p className="text-sm text-muted-foreground">{label}</p><strong className="mt-2 block font-display text-2xl">{amount}</strong></div>)}</section>
    <div className="mt-8 rounded-lg border border-border p-5 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Use this as a starting point.</strong> The official bill calculates each taxing unit separately. Check the exact property, exemptions, adopted rates, MUDs and other special districts before making a decision.</div>
    <section className="mt-10 space-y-5"><h2 className="font-display text-3xl">Make the estimate more useful</h2><p>Buying a home? Use a realistic post-purchase value instead of relying on the seller’s capped value or exemptions. Be sure the rate includes every taxing unit serving the address.</p><p>For a closer estimate, calculate each taxing unit separately using its taxable value and displayed rate, then add the line items together.</p><div className="flex flex-wrap gap-4 text-sm font-medium"><Link to="/learn/property-taxes" className="underline">Understand the full tax bill</Link><Link to="/browse/counties" className="underline">Find your county</Link><Link to="/do/homestead-exemption" className="underline">File a homestead exemption</Link></div></section>
  </article></Container>;
}
