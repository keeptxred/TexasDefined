import { Link } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

import type { LocalRentVsBuyProfile } from '@/data/local-rent-vs-buy';

const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number.isFinite(value) ? value : 0);
const n = (value: string) => Math.max(0, Number(value) || 0);
const pct = (value: string) => Math.min(100, n(value));

function monthlyMortgage(principal: number, annualRate: number, years: number) {
  const months = Math.max(1, Math.round(years * 12));
  const rate = annualRate / 1200;
  if (!rate) return principal / months;
  const factor = (1 + rate) ** months;
  return principal * rate * factor / (factor - 1);
}

export function LocalRentVsBuyPage({ profile, faqs }: { profile: LocalRentVsBuyProfile; faqs: readonly { question: string; answer: string }[] }) {
  const [rent, setRent] = useState(2000);
  const [rentGrowth, setRentGrowth] = useState(3);
  const [homePrice, setHomePrice] = useState(350000);
  const [downPct, setDownPct] = useState(20);
  const [mortgageRate, setMortgageRate] = useState(6.5);
  const [mortgageYears, setMortgageYears] = useState(30);
  const [taxRate, setTaxRate] = useState(2);
  const [insurance, setInsurance] = useState(2500);
  const [hoa, setHoa] = useState(0);
  const [maintenanceRate, setMaintenanceRate] = useState(1);
  const [buyClosingRate, setBuyClosingRate] = useState(3);
  const [sellCostRate, setSellCostRate] = useState(7);
  const [appreciation, setAppreciation] = useState(3);
  const [investmentReturn, setInvestmentReturn] = useState(5);
  const [years, setYears] = useState(7);

  const result = useMemo(() => {
    const horizon = Math.max(1, Math.round(years));
    const down = homePrice * downPct / 100;
    const loan = Math.max(0, homePrice - down);
    const payment = monthlyMortgage(loan, mortgageRate, mortgageYears);
    let rentTotal = 0;
    let buyOperating = 0;
    let balance = loan;
    const monthlyRate = mortgageRate / 1200;
    for (let year = 0; year < horizon; year += 1) {
      rentTotal += rent * 12 * ((1 + rentGrowth / 100) ** year);
      const value = homePrice * ((1 + appreciation / 100) ** year);
      buyOperating += value * taxRate / 100 + insurance + hoa * 12 + value * maintenanceRate / 100;
      for (let month = 0; month < 12; month += 1) {
        const interest = balance * monthlyRate;
        const principal = Math.max(0, Math.min(balance, payment - interest));
        balance -= principal;
        buyOperating += interest;
      }
    }
    const endingValue = homePrice * ((1 + appreciation / 100) ** horizon);
    const purchaseClosing = homePrice * buyClosingRate / 100;
    const saleCost = endingValue * sellCostRate / 100;
    const buyerCash = down + purchaseClosing;
    const investedCash = buyerCash * ((1 + investmentReturn / 100) ** horizon);
    const opportunityCost = Math.max(0, investedCash - buyerCash);
    const buyNetCost = buyerCash + buyOperating + Math.max(0, balance) + saleCost - endingValue + opportunityCost;
    const difference = buyNetCost - rentTotal;
    return { payment, rentTotal, buyNetCost, endingValue, balance: Math.max(0, balance), equityAfterSale: Math.max(0, endingValue - balance - saleCost), difference };
  }, [rent, rentGrowth, homePrice, downPct, mortgageRate, mortgageYears, taxRate, insurance, hoa, maintenanceRate, buyClosingRate, sellCostRate, appreciation, investmentReturn, years]);

  const fields: readonly [string, number, (value: number) => void, string, string][] = [
    ['Monthly rent', rent, setRent, '$', '/mo'], ['Annual rent growth', rentGrowth, setRentGrowth, '', '%'], ['Home price', homePrice, setHomePrice, '$', ''], ['Down payment', downPct, setDownPct, '', '%'], ['Mortgage rate', mortgageRate, setMortgageRate, '', '%'], ['Mortgage term', mortgageYears, setMortgageYears, '', ' yr'], ['Property-tax assumption', taxRate, setTaxRate, '', '%'], ['Annual homeowners insurance', insurance, setInsurance, '$', '/yr'], ['Monthly HOA', hoa, setHoa, '$', '/mo'], ['Maintenance assumption', maintenanceRate, setMaintenanceRate, '', '%/yr'], ['Buyer closing costs', buyClosingRate, setBuyClosingRate, '', '%'], ['Selling costs', sellCostRate, setSellCostRate, '', '%'], ['Home appreciation', appreciation, setAppreciation, '', '%/yr'], ['Alternative investment return', investmentReturn, setInvestmentReturn, '', '%/yr'], ['Time horizon', years, setYears, '', ' yr'],
  ];

  return <main className="container py-10 lg:py-14">
    <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb"><Link to="/" className="hover:text-primary">Home</Link><span aria-hidden="true"> / </span><Link to="/moving-to-texas" className="hover:text-primary">Moving to Texas</Link><span aria-hidden="true"> / </span><span>{profile.name}</span></nav>
    <header className="mt-8 max-w-4xl"><p className="eyebrow text-primary">{profile.name} housing decision planner</p><h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{profile.rentVsBuyTitle}</h1><p className="mt-5 text-lg leading-8 text-muted-foreground">{profile.rentVsBuyIntro}</p></header>

    <section className="mt-10 border-y border-border py-8" aria-labelledby="rent-buy-heading"><p className="eyebrow text-primary">Compare the actual alternatives</p><h2 id="rent-buy-heading" className="mt-3 font-display text-3xl">Model renting and buying over the same time horizon</h2><p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">Every number below is editable. The starting values are examples, not {profile.name} averages. Replace them with a lease, property, lender estimate, parcel tax data and insurance quote.</p><div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{fields.map(([label, value, setter, prefix, suffix]) => <label key={label} className="border border-border p-4"><span className="text-sm font-semibold">{label}</span><div className="mt-2 flex items-center border-b border-border"><span>{prefix}</span><input className="w-full bg-transparent px-2 py-2 text-lg outline-none focus-visible:ring-2 focus-visible:ring-primary" type="number" min="0" step={label.includes('rate') || label.includes('cost') || label.includes('growth') || label.includes('return') || label.includes('appreciation') || label.includes('Down') || label.includes('Maintenance') || label.includes('tax') ? '0.1' : '1'} value={value} onChange={(event) => setter(label.includes('term') || label.includes('horizon') ? Math.max(1, Math.round(n(event.target.value))) : label.includes('rent') && !label.includes('growth') || label.includes('price') || label.includes('insurance') || label.includes('HOA') ? n(event.target.value) : pct(event.target.value))} /><span>{suffix}</span></div></label>)}</div>
      <dl className="mt-7 grid border-y border-border sm:grid-cols-2 lg:grid-cols-4" aria-live="polite"><div className="py-5 lg:px-5"><dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Starting mortgage P&I</dt><dd className="mt-2 font-display text-3xl font-bold text-primary">{money(result.payment)}/mo</dd></div><div className="border-t border-border py-5 sm:border-l sm:border-t-0 sm:px-5"><dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Modeled rent cost</dt><dd className="mt-2 font-display text-3xl font-bold text-primary">{money(result.rentTotal)}</dd></div><div className="border-t border-border py-5 lg:border-l lg:border-t-0 lg:px-5"><dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Modeled net buy cost</dt><dd className="mt-2 font-display text-3xl font-bold text-primary">{money(result.buyNetCost)}</dd></div><div className="border-t border-border py-5 sm:border-l sm:px-5 lg:border-t-0"><dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Difference</dt><dd className="mt-2 font-display text-3xl font-bold text-primary">{money(Math.abs(result.difference))} {result.difference > 0 ? 'more to buy' : 'more to rent'}</dd></div></dl>
      <p className="mt-5 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Planning only.</strong> This simplified comparison is not financial advice and is not a quote. It models interest, recurring ownership costs, transaction costs, appreciation and an opportunity-return assumption; it does not predict future prices, taxes, insurance, investment returns, repairs, tax deductions or transaction timing.</p>
    </section>

    <section className="mt-12 border-t border-border pt-10"><p className="eyebrow text-primary">Localize the inputs</p><h2 className="mt-3 font-display text-3xl">A {profile.name} decision starts with the exact address</h2><p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">{profile.localContext}</p><div className="mt-6 grid gap-4 md:grid-cols-3">{profile.planningPoints.map((point) => <p key={point} className="border border-border p-5 text-sm leading-6 text-muted-foreground">{point}</p>)}</div></section>

    <section className="mt-12 border-t border-border pt-10"><p className="eyebrow text-primary">Verify the housing inputs</p><h2 className="mt-3 font-display text-3xl">Connect the comparison to the rest of the {profile.name} plan</h2><div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3"><Link to={profile.propertyTaxHref} className="border border-border p-5 hover:border-primary"><strong>{profile.propertyTaxLabel}</strong></Link><Link to={profile.affordabilityHref} className="border border-border p-5 hover:border-primary"><strong>{profile.affordabilityLabel}</strong></Link><Link to={profile.homeownershipHref} className="border border-border p-5 hover:border-primary"><strong>{profile.name} homeownership cost calculator</strong></Link><Link to={profile.insuranceHref} className="border border-border p-5 hover:border-primary"><strong>{profile.name} home insurance planner</strong></Link><Link to={profile.mortgageHref} className="border border-border p-5 hover:border-primary"><strong>{profile.name} mortgage calculator</strong></Link><Link to={profile.path} className="border border-border p-5 hover:border-primary"><strong>{profile.name} cost-of-living calculator</strong></Link><Link to={`/texas-salary-needed-calculator/${profile.slug}`} className="border border-border p-5 hover:border-primary"><strong>{profile.name} salary-needed calculator</strong></Link><Link to={profile.relocationHref} className="border border-border p-5 hover:border-primary"><strong>{profile.relocationLabel}</strong></Link></div></section>

    <section className="mt-12 border-t border-border pt-10"><p className="eyebrow text-primary">Common questions</p><h2 className="mt-3 font-display text-3xl">{profile.name} rent-vs.-buy FAQ</h2><div className="mt-6 divide-y divide-border border-y border-border">{faqs.map((faq) => <div key={faq.question} className="py-6"><h3 className="font-display text-2xl">{faq.question}</h3><p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p></div>)}</div></section>
  </main>;
}