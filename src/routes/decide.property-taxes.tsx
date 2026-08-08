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
  const result = useMemo(() => {
    const taxable = Math.max(0, value - exemptions);
    const annual = taxable * rate / 100;
    return { taxable, annual, monthly: annual / 12 };
  }, [value, exemptions, rate]);
  const money = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);

  return <>
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <article className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/decide/financial-tools">Money Made Clearer</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page" className="text-foreground">Property taxes</span>
        </nav>

        <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <p className="eyebrow text-primary">Know before you buy</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Estimate your property taxes</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{description}</p>
          </div>
          <p className="border-l border-border pl-6 text-sm leading-6 text-muted-foreground">Use the exact combined rate and exemptions for the address whenever possible. Special districts can materially change the result.</p>
        </header>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Your assumptions</p><h2 className="mt-2 font-display text-3xl">Start with the property</h2></div>
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Home value" value={value} step="1000" onChange={setValue} />
            <Field label="Exemptions you expect" value={exemptions} step="1000" onChange={setExemptions} />
            <Field label="Combined local rate (%)" value={rate} step="0.01" onChange={setRate} />
          </div>
        </section>

        <section className="py-10">
          <div className="border-b border-border pb-4"><p className="eyebrow text-primary">Estimate</p><h2 className="mt-2 font-display text-4xl">What that could mean</h2></div>
          <div className="grid sm:grid-cols-3">
            {[
              ['Estimated taxable value', money(result.taxable)],
              ['Estimated annual tax', money(result.annual)],
              ['Estimated monthly cost', money(result.monthly)],
            ].map(([label, amount], index) => <div key={label} className={`border-b border-border py-6 sm:px-5 ${index ? 'sm:border-l sm:border-border' : ''}`}><p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</p><strong className="mt-2 block font-display text-3xl text-primary">{amount}</strong></div>)}
          </div>
        </section>

        <aside className="grid gap-6 border-y border-border py-7 lg:grid-cols-[12rem_1fr]">
          <strong className="font-display text-2xl">A starting point, not a bill</strong>
          <p className="text-sm leading-6 text-muted-foreground">The official bill calculates taxing units separately. Check the exact property, exemptions, adopted rates, municipal utility districts (MUDs) and other special districts before making a housing or financial decision.</p>
        </aside>

        <section className="grid gap-8 py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Field notes</p><h2 className="mt-2 font-display text-3xl">Make the estimate more useful</h2></div>
          <div className="max-w-3xl space-y-5 text-base leading-7 text-muted-foreground">
            <p>Buying a home? Use a realistic post-purchase value instead of relying on the seller’s capped value or exemptions. Be sure the rate includes every taxing unit serving the address.</p>
            <p>For a closer estimate, calculate each taxing unit separately using its taxable value and displayed rate, then add the line items together.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2 text-sm font-semibold text-foreground"><Link to="/learn/property-taxes" className="underline underline-offset-4">Understand the full tax bill</Link><Link to="/browse/counties" className="underline underline-offset-4">Find your county</Link><Link to="/do/homestead-exemption" className="underline underline-offset-4">Homestead exemption</Link></div>
          </div>
        </section>
      </article>
    </Container>
  </>;
}

function Field({ label, value, step, onChange }: { label: string; value: number; step: string; onChange: (value: number) => void }) {
  return <label className="block border-t border-border pt-4"><span className="text-sm font-semibold">{label}</span><input className="mt-2 w-full border-0 border-b border-border bg-transparent px-0 py-3 text-lg outline-none focus:border-primary" type="number" min="0" step={step} value={value} onChange={e => onChange(Number(e.target.value) || 0)} /></label>;
}
