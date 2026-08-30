import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { AffordabilityCalculator } from '@/components/calculators/TexasPlanningCalculators';

const description = 'Estimate a Texas home-price range using income, monthly debts, down payment, interest rate, property taxes and homeowners insurance.';

const cityCalculators = [
  ['Houston', '/texas-home-affordability-calculator/houston'],
  ['Austin', '/texas-home-affordability-calculator/austin'],
  ['Dallas', '/texas-home-affordability-calculator/dallas'],
  ['Fort Worth', '/texas-home-affordability-calculator/fort-worth'],
  ['San Antonio', '/texas-home-affordability-calculator/san-antonio'],
  ['Frisco', '/texas-home-affordability-calculator/frisco'],
  ['El Paso', '/texas-home-affordability-calculator/el-paso'],
] as const;

const countyCalculators = [
  ['Harris County', '/texas-home-affordability-calculator/harris-county'],
  ['Dallas County', '/texas-home-affordability-calculator/dallas-county'],
  ['Tarrant County', '/texas-home-affordability-calculator/tarrant-county'],
  ['Bexar County', '/texas-home-affordability-calculator/bexar-county'],
  ['Travis County', '/texas-home-affordability-calculator/travis-county'],
  ['Collin County', '/texas-home-affordability-calculator/collin-county'],
  ['Denton County', '/texas-home-affordability-calculator/denton-county'],
  ['Fort Bend County', '/texas-home-affordability-calculator/fort-bend-county'],
  ['Montgomery County', '/texas-home-affordability-calculator/montgomery-county'],
  ['Williamson County', '/texas-home-affordability-calculator/williamson-county'],
  ['El Paso County', '/texas-home-affordability-calculator/el-paso-county'],
  ['Hidalgo County', '/texas-home-affordability-calculator/hidalgo-county'],
] as const;

const faqs = [
  {
    question: 'How does a Texas home affordability calculator work?',
    answer: 'It compares household income with recurring debt and estimated housing costs, then uses the down payment and financing assumptions you enter to explore a possible home-price range. It is a planning tool, not a lender approval.',
  },
  {
    question: 'Why should property taxes and insurance be included?',
    answer: 'A mortgage payment is only part of the monthly housing cost. Texas property taxes and homeowners insurance can materially change what a household pays each month, so excluding them can make an affordability estimate look artificially high.',
  },
  {
    question: 'Does a larger down payment always mean I should buy a more expensive home?',
    answer: 'Not necessarily. A larger down payment can reduce the loan amount, but buyers also need to consider closing costs, emergency reserves, maintenance, utilities and other household obligations before deciding how much cash to put into the purchase.',
  },
  {
    question: 'Is the calculator the same as mortgage preapproval?',
    answer: 'No. Mortgage qualification depends on lender guidelines, verified income and debts, credit, the loan program, the property and other underwriting factors. Use the result to compare scenarios before seeking a formal lending decision.',
  },
];

export const Route = createLazyFileRoute('/texas-home-affordability-calculator')({ component: TexasHomeAffordabilityCalculatorPage });

function TexasHomeAffordabilityCalculatorPage() {
  return (
    <CalculatorPage eyebrow="Texas home affordability estimator" title="Texas home affordability calculator" description={description}>
      <AffordabilityCalculator />
      <section className="mt-14 border-t border-border pt-10" aria-labelledby="affordability-cost-heading">
        <p className="eyebrow text-primary">Look beyond the purchase price</p>
        <h2 id="affordability-cost-heading" className="mt-3 font-display text-3xl">Estimate the housing payment your budget would actually carry</h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
          <p>A useful affordability estimate starts with income and monthly debt, but it should not stop at principal and interest. Property taxes, homeowners insurance and the size of the down payment can change the monthly cost and the amount of cash needed before move-in.</p>
          <p>Run several scenarios rather than treating one result as a target. A lower purchase price, a different down payment or a change in interest rate can alter both the monthly payment and the cash you keep available after closing.</p>
          <p>This calculator is designed for early planning. It does not account for every lender rule, HOA charge, special district, maintenance cost or property-specific expense.</p>
        </div>
      </section>
      <section className="mt-12 border-t border-border pt-10" aria-labelledby="affordability-city-heading">
        <p className="eyebrow text-primary">City planning pages</p>
        <h2 id="affordability-city-heading" className="mt-3 font-display text-3xl">Run the affordability check with city-specific ownership context</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">The math is the same statewide, but the inputs are not. These pages connect the calculator to local property-tax tools and relocation guidance so you can replace generic assumptions with address-level costs.</p>
        <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {cityCalculators.map(([name, href]) => (
            <a key={href} href={href} className="group bg-background p-5">
              <strong className="font-display text-2xl group-hover:text-primary">{name}</strong>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">Local affordability calculator →</span>
            </a>
          ))}
        </div>
      </section>
      <section className="mt-12 border-t border-border pt-10" aria-labelledby="affordability-county-heading">
        <p className="eyebrow text-primary">County planning hubs</p>
        <h2 id="affordability-county-heading" className="mt-3 font-display text-3xl">Connect the home-price range to parcel taxes and county context</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">County pages are a planning bridge, not a countywide cost average. Each one points to the parcel-specific property-tax calculator, county guide and related city calculator where available so school, municipal, special-district, insurance and recurring ownership costs stay visible.</p>
        <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {countyCalculators.map(([name, href]) => (
            <a key={href} href={href} className="group bg-background p-5">
              <strong className="font-display text-2xl group-hover:text-primary">{name}</strong>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">County affordability hub →</span>
            </a>
          ))}
        </div>
      </section>
      <section className="mt-12 border-t border-border pt-10" aria-labelledby="affordability-next-heading">
        <p className="eyebrow text-primary">Pressure-test the result</p>
        <h2 id="affordability-next-heading" className="mt-3 font-display text-3xl">Check the other numbers before you decide what is affordable</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link to="/article/$slug" params={{ slug: 'salary-needed-to-buy-a-house-in-texas' }} className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Salary needed to buy a Texas house</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Read the full affordability framework before treating one income or home-price number as a target.</span></Link>
          <Link to="/texas-mortgage-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Mortgage calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Turn a purchase price into an estimated monthly payment with taxes and insurance.</span></Link>
          <Link to="/texas-down-payment-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Down payment calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Estimate the down payment, closing costs and reserves that may compete for the same cash.</span></Link>
          <Link to="/texas-closing-cost-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Closing cost calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Model transaction costs separately from the purchase price and down payment.</span></Link>
        </div>
      </section>
      <section className="mt-12 border-t border-border pt-10" aria-labelledby="affordability-faq-heading">
        <p className="eyebrow text-primary">Common questions</p>
        <h2 id="affordability-faq-heading" className="mt-3 font-display text-3xl">Texas home affordability calculator FAQ</h2>
        <div className="mt-6 divide-y divide-border border-y border-border">{faqs.map((faq) => <div key={faq.question} className="py-6"><h3 className="font-display text-2xl">{faq.question}</h3><p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p></div>)}</div>
      </section>
    </CalculatorPage>
  );
}
