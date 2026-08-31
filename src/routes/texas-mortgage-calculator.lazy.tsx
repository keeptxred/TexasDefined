import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { OfficialMortgageCalculator } from '@/components/calculators/OfficialMortgageCalculator';

const description = 'Estimate a Texas mortgage payment with down payment, principal, interest, official local property-tax rates and homeowners insurance in one monthly housing-cost view.';
const cityCalculators = [
  ['Houston', '/texas-mortgage-calculator/houston'],
  ['Austin', '/texas-mortgage-calculator/austin'],
  ['Dallas', '/texas-mortgage-calculator/dallas'],
  ['Fort Worth', '/texas-mortgage-calculator/fort-worth'],
  ['San Antonio', '/texas-mortgage-calculator/san-antonio'],
  ['Frisco', '/texas-mortgage-calculator/frisco'],
  ['El Paso', '/texas-mortgage-calculator/el-paso'],
] as const;

const faqs = [
  { question: 'What does a Texas mortgage calculator include?', answer: 'This calculator combines principal and interest with estimated property taxes and homeowners insurance so you can compare a fuller monthly housing payment instead of looking at the loan payment alone.' },
  { question: 'How does the property-tax estimate work?', answer: 'Choose the county, then select the city, school district and only the special districts that actually serve the parcel. TexasDefined can fill the combined finalized rate reported to the Texas Comptroller; the rate remains editable because taxable values and exemptions can differ by taxing unit.' },
  { question: 'Why can two Texas homes with the same price have different monthly payments?', answer: 'Property-tax rates, insurance costs, down payments, interest rates, loan terms, HOA dues, and special districts can differ significantly by address even when purchase prices are similar.' },
  { question: 'Should I include HOA, MUD or PID costs in the mortgage payment?', answer: 'Include them in the household budget even when they are not technically part of principal and interest. HOA dues, district assessments and other recurring charges can change the amount of cash the property requires each month.' },
  { question: 'Is this the same as a lender loan estimate?', answer: 'No. It is a planning tool. A lender uses current loan terms, credit, fees, escrow rules and property-specific information. Use this calculator to compare scenarios before you have the final Loan Estimate or closing disclosure.' },
];

export const Route = createLazyFileRoute('/texas-mortgage-calculator')({ component: TexasMortgageCalculatorPage });

function TexasMortgageCalculatorPage() {
  return <CalculatorPage eyebrow="Texas mortgage payment calculator" title="Texas mortgage payment calculator with taxes and insurance" description={description}>
    <OfficialMortgageCalculator />

    <section className="mt-14 border-t border-border pt-10" aria-labelledby="mortgage-cost-heading">
      <p className="eyebrow text-primary">Beyond principal and interest</p>
      <h2 id="mortgage-cost-heading" className="mt-3 font-display text-3xl">Estimate the monthly cost of a Texas home</h2>
      <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
        <p>A useful Texas mortgage estimate should include more than the loan payment. Property taxes and homeowners insurance can materially change the monthly cost, and both vary by location and property.</p>
        <p>Use finalized local taxing-unit rates for a stronger planning estimate, but verify the parcel's taxable values, exemptions and exact district membership before relying on the result. A county name alone does not identify every taxing unit attached to a property.</p>
        <p>After you have a lender quote, replace planning assumptions with the actual interest rate, loan term, mortgage-insurance amount and estimated escrow. The calculator is most valuable when you keep updating it as the home search becomes more specific.</p>
      </div>
    </section>

    <section className="mt-12 border-t border-border pt-10" aria-labelledby="mortgage-local-heading">
      <p className="eyebrow text-primary">Local payment planning</p>
      <h2 id="mortgage-local-heading" className="mt-3 font-display text-3xl">Connect the mortgage estimate to local taxes, insurance and ownership costs</h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">The financing math is statewide, but the property costs are not. These city pages reuse the same mortgage engine and connect it to the matching local property-tax, insurance, affordability and ownership-cost tools. Major-county mortgage pages are also linked from their matching local affordability pages.</p>
      <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {cityCalculators.map(([name, href]) => <a key={href} href={href} className="group bg-background p-5"><strong className="font-display text-2xl group-hover:text-primary">{name}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Local mortgage payment calculator →</span></a>)}
      </div>
    </section>

    <section className="mt-12 border-t border-border pt-10" aria-labelledby="mortgage-example-heading">
      <p className="eyebrow text-primary">Worked payment example</p>
      <h2 id="mortgage-example-heading" className="mt-3 font-display text-3xl">What a Texas mortgage payment can look like with taxes and insurance</h2>
      <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">The example below is illustrative math, not a current mortgage-rate quote or lending recommendation. It shows why a Texas house-payment calculator should include more than principal and interest.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="border border-border p-5"><span className="eyebrow text-muted-foreground">Home price</span><strong className="mt-2 block font-display text-2xl">$400,000</strong><p className="mt-2 text-sm leading-6 text-muted-foreground">20% down leaves a $320,000 loan.</p></div>
        <div className="border border-border p-5"><span className="eyebrow text-muted-foreground">Principal + interest</span><strong className="mt-2 block font-display text-2xl">≈ $2,023/mo</strong><p className="mt-2 text-sm leading-6 text-muted-foreground">Illustrative 30-year fixed loan at 6.5%.</p></div>
        <div className="border border-border p-5"><span className="eyebrow text-muted-foreground">Property tax</span><strong className="mt-2 block font-display text-2xl">≈ $667/mo</strong><p className="mt-2 text-sm leading-6 text-muted-foreground">Illustrative 2.0% annual tax before property-specific exemptions or taxable-value differences.</p></div>
        <div className="border border-border p-5"><span className="eyebrow text-muted-foreground">Insurance</span><strong className="mt-2 block font-display text-2xl">≈ $250/mo</strong><p className="mt-2 text-sm leading-6 text-muted-foreground">Illustrative $3,000 annual homeowners premium.</p></div>
      </div>
      <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">Under those assumptions, the combined principal, interest, tax and insurance estimate is about <strong className="text-foreground">$2,940 per month</strong> before HOA dues, mortgage insurance, MUD or PID charges, utilities, maintenance or other address-specific costs.</p>
    </section>

    <section className="mt-12 border-t border-border pt-10" aria-labelledby="mortgage-stack-heading">
      <p className="eyebrow text-primary">Build the payment stack</p>
      <h2 id="mortgage-stack-heading" className="mt-3 font-display text-3xl">The pieces that can change the Texas monthly payment</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ['Principal and interest', 'Loan amount, interest rate and term drive the scheduled mortgage payment before taxes, insurance or neighborhood charges are added.'],
          ['Property taxes', 'Use the parcel value, exemptions and every applicable taxing unit rather than a countywide average whenever exact information is available.'],
          ['Homeowners insurance', 'Premiums vary by property, roof, location, coverage, deductibles and risk. Coastal wind or flood coverage may be separate.'],
          ['Mortgage insurance', 'Some loans include private mortgage insurance or a government-loan insurance charge depending on down payment and program rules.'],
          ['HOA and district costs', 'HOA dues, PID assessments, MUD-related taxes or other local charges may sit outside the lender payment but still belong in the monthly budget.'],
          ['Maintenance and utilities', 'These are not mortgage costs, but they matter to affordability. A house with a comfortable loan payment can still strain cash flow after recurring ownership costs.'],
        ].map(([title, copy]) => <div key={title} className="border border-border p-5"><strong className="font-display text-xl">{title}</strong><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></div>)}
      </div>
    </section>

    <section className="mt-12 border-t border-border pt-10" aria-labelledby="mortgage-scenarios-heading">
      <p className="eyebrow text-primary">Run more than one scenario</p>
      <h2 id="mortgage-scenarios-heading" className="mt-3 font-display text-3xl">Compare the address, not just the purchase price</h2>
      <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground"><p>Two $400,000 homes can produce different monthly costs because the addresses can fall into different school districts, cities, MUDs, PIDs or other taxing units. Insurance exposure, HOA dues and utility providers may differ too.</p><p>For each serious property, save or note the exact assumptions you used: purchase price, down payment, interest rate, tax-rate stack, insurance estimate and recurring neighborhood costs. That makes the comparison reproducible instead of relying on a single mortgage number from a listing site.</p><p>If you are deciding how much to put down, compare the effect on both principal-and-interest and your remaining cash reserves. A lower monthly payment is not automatically better if it leaves too little cash for closing costs, repairs or emergencies.</p></div>
    </section>

    <section className="mt-12 border-t border-border pt-10" aria-labelledby="mortgage-official-heading">
      <p className="eyebrow text-primary">Verify before closing</p><h2 id="mortgage-official-heading" className="mt-3 font-display text-3xl">Use official documents for the final numbers</h2>
      <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground"><p>Use this calculator for planning, then replace estimates with the lender's disclosures, the appraisal district record, adopted taxing-unit rates, the insurer's quote and the title or closing documents. Those property-specific sources control the real transaction.</p><div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><a href="https://www.consumerfinance.gov/owning-a-home/loan-estimate/" target="_blank" rel="noreferrer" className="text-primary underline decoration-primary/40 underline-offset-4">CFPB Loan Estimate guide ↗</a><a href="https://comptroller.texas.gov/taxes/property-tax/rates/" target="_blank" rel="noreferrer" className="text-primary underline decoration-primary/40 underline-offset-4">Texas Comptroller property-tax rates ↗</a></div></div>
    </section>

    <section className="mt-12 border-t border-border pt-10" aria-labelledby="mortgage-links-heading"><p className="eyebrow text-primary">Related Texas planning tools</p><h2 id="mortgage-links-heading" className="mt-3 font-display text-3xl">Build the rest of the home budget</h2><div className="mt-6 grid gap-4 md:grid-cols-3"><Link to="/texas-property-tax-estimator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Property-tax estimator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Build the county, city, ISD and special-district rate stack separately.</span></Link><Link to="/texas-home-insurance-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Home insurance calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Estimate homeowners insurance without entering personal information.</span></Link><Link to="/texas-homeownership-cost-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Homeownership cost calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Add utilities, maintenance and other ownership costs to the housing payment.</span></Link></div></section>

    <section className="mt-12 border-t border-border pt-10" aria-labelledby="mortgage-faq-heading"><p className="eyebrow text-primary">Common questions</p><h2 id="mortgage-faq-heading" className="mt-3 font-display text-3xl">Texas mortgage calculator FAQ</h2><div className="mt-6 divide-y divide-border border-y border-border">{faqs.map((faq) => <div key={faq.question} className="py-6"><h3 className="font-display text-2xl">{faq.question}</h3><p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p></div>)}</div></section>
  </CalculatorPage>;
}
