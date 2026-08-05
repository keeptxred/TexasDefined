import { useMemo, useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description = 'Estimate annual and monthly Texas property taxes using appraised value, exemptions, and the combined local tax rate for an address.';
export const Route = createFileRoute('/decide/property-taxes')({ head: () => ({ meta: buildMeta(texasDefinedBrand, {
      canonicalPath: '/decide/property-taxes',
      title: 'Texas Property Tax Calculator', description }),
    links: [canonicalLink(texasDefinedBrand, '/decide/property-taxes')] }), component: Page });

function Page() {
  const [value, setValue] = useState(400000);
  const [exemptions, setExemptions] = useState(140000);
  const [rate, setRate] = useState(2.1);
  const result = useMemo(() => { const taxable = Math.max(0, value - exemptions); const annual = taxable * rate / 100; return { taxable, annual, monthly: annual / 12 }; }, [value, exemptions, rate]);
  const money = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  return <Container className="py-16 sm:py-24"><article className="mx-auto max-w-4xl"><p className="eyebrow text-primary">Texas Home & Property Calculator</p><h1 className="mt-3 font-display text-4xl sm:text-6xl">Texas Property Tax Calculator</h1><p className="mt-5 text-lg leading-8 text-muted-foreground">{description}</p>
    <section className="mt-10 grid gap-5 rounded-lg border border-border p-6 sm:grid-cols-3">
      <label className="space-y-2"><span className="text-sm font-medium">Appraised value</span><input className="w-full rounded border border-border bg-background p-3" type="number" min="0" step="1000" value={value} onChange={e => setValue(Number(e.target.value) || 0)} /></label>
      <label className="space-y-2"><span className="text-sm font-medium">Exemptions</span><input className="w-full rounded border border-border bg-background p-3" type="number" min="0" step="1000" value={exemptions} onChange={e => setExemptions(Number(e.target.value) || 0)} /></label>
      <label className="space-y-2"><span className="text-sm font-medium">Combined rate (%)</span><input className="w-full rounded border border-border bg-background p-3" type="number" min="0" step="0.01" value={rate} onChange={e => setRate(Number(e.target.value) || 0)} /></label>
    </section>
    <section className="mt-6 grid gap-4 sm:grid-cols-3">{[['Taxable value', money(result.taxable)], ['Annual estimate', money(result.annual)], ['Monthly equivalent', money(result.monthly)]].map(([label, amount]) => <div key={label} className="rounded-lg bg-muted p-5"><p className="text-sm text-muted-foreground">{label}</p><strong className="mt-2 block font-display text-2xl">{amount}</strong></div>)}</section>
    <div className="mt-8 rounded-lg border border-border p-5 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Planning estimate only.</strong> Official bills calculate each taxing unit separately. Verify the exact parcel, exemptions, adopted rates, MUDs and other special districts.</div>
    <section className="mt-10 space-y-5"><h2 className="font-display text-3xl">How to use the estimate</h2><p>For a buyer, model a realistic post-purchase appraised value rather than relying on the seller’s capped value or exemptions. Include every taxing unit serving the address.</p><p>For greater precision, divide each taxing unit’s taxable value by 100, multiply by that unit’s displayed rate, and add the separate line items.</p><div className="flex flex-wrap gap-4 text-sm font-medium"><Link to="/learn/property-taxes" className="underline">Complete property-tax guide</Link><Link to="/browse/counties" className="underline">County resources</Link><Link to="/do/homestead-exemption" className="underline">Homestead guide</Link></div></section>
  </article></Container>;
}
