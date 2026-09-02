import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { CitationTrustPanel } from '@/components/authority/CitationTrustPanel';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { MovingCostCalculator } from '@/components/calculators/MovingCostCalculator';
import {
  movingCostDescription,
  movingCostFaqs,
  movingCostSources,
} from '@/data/moving-cost-calculator';

const pageTitle = 'Texas Moving Cost Calculator | Plan the Full Move Budget';

const examples = [
  {
    label: 'Shorter 2-bedroom move',
    setup: '50 miles · $700 packing · $150 travel · $1,200 deposits/setup',
    transport: '$2,313',
    subtotal: '$4,363',
    target: '$5,017',
  },
  {
    label: '500-mile 3-bedroom move',
    setup: '500 miles · $1,200 packing · $800 travel · $1,500 deposits/setup',
    transport: '$3,975',
    subtotal: '$7,475',
    target: '$8,596',
  },
  {
    label: 'Longer 4-bedroom move',
    setup: '1,200 miles · $1,800 packing · $1,400 travel · $2,000 deposits/setup',
    transport: '$6,200',
    subtotal: '$11,400',
    target: '$13,110',
  },
] as const;

export const Route = createLazyFileRoute('/texas-moving-cost-calculator')({ component: TexasMovingCostCalculatorPage });

function TexasMovingCostCalculatorPage() {
  return (
    <CalculatorPage eyebrow="Moving to or within Texas" title={pageTitle} description={movingCostDescription}>
      <MovingCostCalculator />

      <section className="mt-14 border-t border-border pt-10" aria-labelledby="moving-cost-method-heading">
        <p className="eyebrow text-primary">Moving estimate methodology</p>
        <h2 id="moving-cost-method-heading" className="mt-3 font-display text-3xl">The move costs more than transportation</h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
          <p>The calculator separates transportation from packing, travel, storage, deposits and setup costs. If you already have a written mover or truck estimate, enter it and the calculator uses that number. If you do not, it uses a rough transportation baseline so you can build a first-pass moving estimate.</p>
          <p>The built-in baseline is intentionally transparent: <strong className="text-foreground">$900 + $2.25 per mile + $650 per bedroom</strong>. It is a planning heuristic, not a published Texas average, live mover pricing or a promise about what a move should cost. Replace it with written estimates as the move becomes real.</p>
          <p>The contingency is also adjustable. A reserve can help cover schedule changes, an extra hotel night, storage, replacement supplies, service deposits or other costs that were not obvious when the move was first priced.</p>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="moving-cost-example-heading">
        <p className="eyebrow text-primary">Illustrative budgets</p>
        <h2 id="moving-cost-example-heading" className="mt-3 font-display text-3xl">What the planning baseline looks like in three scenarios</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">These examples use the calculator heuristic and a 15% contingency. They are not Texas mover averages or quotes; they show how the worksheet combines one-time costs before you replace assumptions with your own numbers.</p>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {examples.map((example) => (
            <div key={example.label} className="border border-border p-5">
              <h3 className="font-display text-2xl">{example.label}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{example.setup}</p>
              <dl className="mt-5 space-y-3 border-t border-border pt-4 text-sm">
                <div className="flex items-center justify-between gap-4"><dt className="text-muted-foreground">Transport baseline</dt><dd className="font-semibold">{example.transport}</dd></div>
                <div className="flex items-center justify-between gap-4"><dt className="text-muted-foreground">Move subtotal</dt><dd className="font-semibold">{example.subtotal}</dd></div>
                <div className="flex items-center justify-between gap-4"><dt className="text-muted-foreground">With 15% reserve</dt><dd className="font-semibold text-primary">{example.target}</dd></div>
              </dl>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="moving-cost-price-heading">
        <p className="eyebrow text-primary">Why the final price can move</p>
        <h2 id="moving-cost-price-heading" className="mt-3 font-display text-3xl">A written mover estimate matters more than a statewide average</h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
          <p>For a professional move, the actual shipment and services matter. Stairs, elevators, long carries, packing, storage, added items and other services can change what a mover charges. That is why the planning calculator gives you a place to replace its rough transportation baseline with a written estimate.</p>
          <p>For moves within Texas, TxDMV tells consumers to use a licensed mover, compare proposals and put agreements in writing. For interstate moves, FMCSA requires registered interstate movers and provides consumer guidance on written, binding and non-binding estimates.</p>
          <p>Do not treat the lowest advertised number as the whole moving budget. Compare the transportation agreement and then add the costs the mover does not cover: travel, temporary lodging, storage, utility setup, deposits and the first purchases needed at the new home.</p>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="moving-cost-links-heading">
        <p className="eyebrow text-primary">Plan the destination too</p>
        <h2 id="moving-cost-links-heading" className="mt-3 font-display text-3xl">Connect the one-time move to the monthly Texas budget</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Link to="/moving-to-texas" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Moving to Texas</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Compare cities, counties, local systems and address-level relocation research.</span></Link>
          <Link to="/moving-to-texas-checklist" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Moving checklist</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Organize the before-and-after steps that create costs around move day.</span></Link>
          <Link to="/texas-cost-of-living-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Cost of living</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Separate one-time moving costs from the recurring cost of the new location.</span></Link>
          <Link to="/texas-salary-comparison-by-city" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Salary comparison by city</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Compare a relocation job offer with the recurring costs you expect in the destination.</span></Link>
          <Link to="/texas-salary-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Take-home pay</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Estimate the paycheck that will fund the destination budget after the move.</span></Link>
          <Link to="/texas-utility-cost-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Utility costs</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Estimate electricity, water, gas, internet and trash after the move.</span></Link>
          <Link to="/texas-home-insurance-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Home insurance</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Build an insurance planning estimate if the move includes buying a home.</span></Link>
          <Link to="/texas-budget-planner" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Texas budget planner</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Put the new recurring household costs together after the boxes are unpacked.</span></Link>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="moving-cost-faq-heading">
        <p className="eyebrow text-primary">Common questions</p>
        <h2 id="moving-cost-faq-heading" className="mt-3 font-display text-3xl">Texas moving cost calculator FAQ</h2>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {movingCostFaqs.map((faq) => (
            <div key={faq.question} className="py-6">
              <h3 className="font-display text-2xl">{faq.question}</h3>
              <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <CitationTrustPanel
        title="Moving-cost sources and methodology"
        sources={movingCostSources}
        methodology="Texas Defined separates the budgeting worksheet from official mover rules. The calculator's transportation baseline is a disclosed planning heuristic, not sourced market-price data. Users with a written mover or truck estimate can replace the heuristic directly. Consumer-protection guidance is linked to TxDMV for Texas moves and FMCSA for interstate moves."
        lastVerified="Official mover guidance and source URLs checked August 30, 2026. Pricing still requires current written estimates for the actual household, route and services."
      />
    </CalculatorPage>
  );
}