import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { OfficialHomeownershipCostCalculator } from '@/components/calculators/OfficialHomeownershipCostCalculator';

const description = 'Combine a Texas mortgage, property taxes, homeowners insurance, maintenance, utilities, HOA or district costs and other recurring expenses into a fuller homeownership budget, with official local property-tax rate autofill.';

const cityOwnershipCalculators = [
  ['Houston', '/texas-homeownership-cost-calculator/houston'],
  ['Austin', '/texas-homeownership-cost-calculator/austin'],
  ['Dallas', '/texas-homeownership-cost-calculator/dallas'],
  ['Fort Worth', '/texas-homeownership-cost-calculator/fort-worth'],
  ['San Antonio', '/texas-homeownership-cost-calculator/san-antonio'],
  ['Frisco', '/texas-homeownership-cost-calculator/frisco'],
  ['El Paso', '/texas-homeownership-cost-calculator/el-paso'],
] as const;

const faqs = [
  {
    question: 'What costs should a Texas homeowner budget beyond the mortgage?',
    answer: 'A practical ownership budget can include property taxes, homeowners insurance, utilities, maintenance, HOA dues, special-district costs, pest control, lawn or pool care and a reserve for repairs in addition to principal and interest.',
  },
  {
    question: 'Can the calculator estimate local property taxes?',
    answer: 'Yes. Choose a county, then select the city, school district and special districts that actually serve the parcel. The calculator can convert the finalized combined rate reported to the Texas Comptroller into a monthly property-tax planning amount.',
  },
  {
    question: 'Why can two homes with the same price have very different ownership costs?',
    answer: 'Property-tax rates, insurance premiums, special districts, HOA dues, utility providers, home age, roof and HVAC condition, lot size and commuting needs can all differ by address even when purchase prices match.',
  },
  {
    question: 'Should utilities be included in home affordability?',
    answer: 'Yes for household planning, even though a lender may not treat every utility as part of the mortgage payment. Electricity, water and other services affect how comfortable the total monthly budget is after closing.',
  },
  {
    question: 'How much should I budget for maintenance?',
    answer: 'There is no single percentage that fits every Texas home. Age, roof, HVAC, foundation, trees, irrigation, pool equipment and deferred maintenance can all change the reserve you need. Use a planning amount, then increase it when inspections or known repairs identify larger risks.',
  },
];

export const Route = createLazyFileRoute('/texas-homeownership-cost-calculator')({ component: TexasHomeownershipCostCalculatorPage });

function TexasHomeownershipCostCalculatorPage() {
  return (
    <CalculatorPage eyebrow="Beyond the mortgage" title="Texas homeownership cost calculator" description={description}>
      <OfficialHomeownershipCostCalculator />

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="ownership-city-heading">
        <p className="eyebrow text-primary">Local ownership budgets</p>
        <h2 id="ownership-city-heading" className="mt-3 font-display text-3xl">Run the full homeownership budget with city-specific property context</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">The budget categories are the same statewide, but the inputs are not. These local pages connect the calculator to city or county property-tax tools and relocation research so taxes, insurance, utilities, HOA or district charges, maintenance and transportation can be replaced with address-level assumptions.</p>
        <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {cityOwnershipCalculators.map(([name, href]) => (
            <a key={href} href={href} className="group bg-background p-5">
              <strong className="font-display text-2xl group-hover:text-primary">{name}</strong>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">Local ownership-cost calculator →</span>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t border-border pt-10" aria-labelledby="ownership-stack-heading">
        <p className="eyebrow text-primary">Build the whole monthly stack</p>
        <h2 id="ownership-stack-heading" className="mt-3 font-display text-3xl">The mortgage payment is only one part of owning the house</h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
          <p>A household can qualify for a mortgage and still feel squeezed by the complete cost of the property. Texas property taxes, homeowners insurance, summer electricity, water, maintenance, HOA dues and special districts can move the budget materially after the keys are handed over.</p>
          <p>Use address-specific numbers when they are available. The local-rate selector removes a major manual input, but taxable values, exemptions and exact district membership still belong to the parcel.</p>
          <p>The strongest use of this calculator is comparison. Run it for every serious home using the same categories so that a lower purchase price does not hide higher taxes, insurance, utility costs or neighborhood charges.</p>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="ownership-categories-heading">
        <p className="eyebrow text-primary">Costs buyers often miss</p>
        <h2 id="ownership-categories-heading" className="mt-3 font-display text-3xl">Recurring ownership expenses that deserve their own line</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ['Property taxes', 'Use the parcel value, exemptions and exact county, city, school district and special-district membership whenever possible.'],
            ['Homeowners insurance', 'Roof age, storm exposure, rebuilding cost, deductibles and optional wind or flood coverage can materially change the annual premium.'],
            ['Electricity and water', 'Texas weather, home size, insulation, pool equipment, irrigation and local utility providers can make utilities a major ownership cost.'],
            ['Maintenance reserve', 'HVAC, roof, plumbing, foundation, appliances, fences, trees and exterior work should be budgeted even when nothing is broken today.'],
            ['HOA, MUD and PID costs', 'Neighborhood charges can appear as dues, assessments or taxes. Keep them separate so you can see which costs are contractual and which are taxing-unit charges.'],
            ['Yard, pest and pool care', 'Lawn service, fertilizer, pest control, tree work and pool chemicals or service can turn into predictable monthly expenses for some properties.'],
          ].map(([title, copy]) => <div key={title} className="border border-border p-5"><strong className="font-display text-xl">{title}</strong><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></div>)}
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="ownership-inspection-heading">
        <p className="eyebrow text-primary">Use inspection findings</p>
        <h2 id="ownership-inspection-heading" className="mt-3 font-display text-3xl">Turn known property conditions into a realistic reserve</h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
          <p>A generic maintenance percentage is only a placeholder. Once you have an inspection, seller disclosures and insurance information, convert known risks into actual planning amounts. An older roof, aging HVAC system, foundation movement, mature trees or pool equipment can justify a much larger reserve than a newer low-maintenance property.</p>
          <p>Separate recurring maintenance from one-time repairs. Monthly lawn service belongs in the recurring budget; replacing an HVAC system belongs in a capital reserve. Keeping those categories distinct helps prevent a seemingly affordable monthly payment from consuming cash needed for predictable repairs.</p>
          <p>If a property has deferred maintenance, test the budget both before and after the repair plan. The cheapest purchase price can become the most expensive ownership path when multiple systems need work at the same time.</p>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="ownership-compare-heading">
        <p className="eyebrow text-primary">Compare homes consistently</p>
        <h2 id="ownership-compare-heading" className="mt-3 font-display text-3xl">Use the same budget framework for every address</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="border border-border p-5"><strong className="font-display text-xl">Home A: lower price, higher recurring costs</strong><p className="mt-2 text-sm leading-6 text-muted-foreground">A lower purchase price may still come with higher property taxes, insurance, utility use, HOA dues or immediate maintenance. Enter those separately rather than assuming the lower price wins.</p></div>
          <div className="border border-border p-5"><strong className="font-display text-xl">Home B: higher price, lower operating costs</strong><p className="mt-2 text-sm leading-6 text-muted-foreground">A newer or more efficient home may cost more upfront while reducing maintenance, utility or insurance assumptions. Compare the full annual ownership total, not just principal and interest.</p></div>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="ownership-links-heading">
        <p className="eyebrow text-primary">Break the total into parts</p>
        <h2 id="ownership-links-heading" className="mt-3 font-display text-3xl">Verify the biggest ownership-cost assumptions separately</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Link to="/texas-mortgage-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Mortgage calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Estimate principal, interest, property taxes and insurance together.</span></Link>
          <Link to="/texas-property-tax-estimator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Property-tax estimator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Build an exact local-rate stack from county, ISD, city and special districts.</span></Link>
          <Link to="/texas-utility-cost-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Utility-cost calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Estimate electricity, water, gas, internet and trash at the household level.</span></Link>
          <Link to="/texas-home-insurance-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Home-insurance calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Create a planning estimate before getting address-specific insurer quotes.</span></Link>
          <Link to="/article/true-cost-of-owning-a-home-in-texas" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">True cost of owning a Texas home</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Use the full guide for maintenance, utilities, districts, repairs and reserve planning.</span></Link>
          <Link to="/article/muds-pids-hoas-special-districts-texas" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">MUDs, PIDs and HOAs</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Understand neighborhood charges and districts around the home.</span></Link>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="ownership-faq-heading">
        <p className="eyebrow text-primary">Common questions</p>
        <h2 id="ownership-faq-heading" className="mt-3 font-display text-3xl">Texas homeownership cost calculator FAQ</h2>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {faqs.map((faq) => <div key={faq.question} className="py-6"><h3 className="font-display text-2xl">{faq.question}</h3><p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p></div>)}
        </div>
      </section>
    </CalculatorPage>
  );
}
