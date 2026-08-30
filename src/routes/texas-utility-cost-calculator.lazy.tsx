import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { UtilityCalculator } from '@/components/calculators/TexasPlanningCalculators';

const description =
  'Estimate Texas utility costs by adding electricity, water, natural gas, internet and trash bills. Use the calculator for a monthly or annual home-utility estimate.';

export const Route = createLazyFileRoute('/texas-utility-cost-calculator')({
  component: TexasUtilityCostCalculatorPage,
});

function TexasUtilityCostCalculatorPage() {
  return (
    <CalculatorPage eyebrow="Texas utility bill estimator" title="Texas utility cost calculator" description={description}>
      <UtilityCalculator />
      <section className="mt-12 border-t border-border pt-9">
        <p className="eyebrow text-primary">How to use the estimate</p>
        <h2 className="mt-3 font-display text-3xl">Estimate the bills beyond the mortgage</h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
          <p>This Texas utility calculator is designed for searches such as <strong className="text-foreground">Texas energy calculator</strong>, <strong className="text-foreground">utility calculator</strong>, <strong className="text-foreground">gas bill calculator</strong> and monthly home-utility estimate. Enter realistic amounts from a current bill, apartment listing or comparable home rather than treating statewide averages as an address-level quote.</p>
          <p>Electricity is often the largest variable in a Texas home, but water, sewer, natural gas, trash and internet can materially change the total. Seasonal electricity use can also make a summer month look very different from an annual average.</p>
        </div>
      </section>

      <section className="mt-10 border-t border-border pt-9">
        <p className="eyebrow text-primary">Related Texas planning tools</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Link to="/texas-moving-cost-calculator" className="border border-border p-5 hover:border-primary/50">
            <strong className="font-display text-xl">Texas moving cost calculator</strong>
            <span className="mt-2 block text-sm leading-6 text-muted-foreground">Add utility deposits and setup to the one-time moving budget, then keep recurring bills here.</span>
          </Link>
          <Link to="/article/$slug" params={{ slug: 'texas-utility-costs-guide' }} className="border border-border p-5 hover:border-primary/50">
            <strong className="font-display text-xl">How to estimate Texas utility costs</strong>
            <span className="mt-2 block text-sm leading-6 text-muted-foreground">Build an address-specific utility budget and understand why one statewide average is rarely enough.</span>
          </Link>
          <Link to="/article/$slug" params={{ slug: 'how-to-choose-electricity-plan-texas' }} className="border border-border p-5 hover:border-primary/50">
            <strong className="font-display text-xl">How to choose a Texas electricity plan</strong>
            <span className="mt-2 block text-sm leading-6 text-muted-foreground">Understand plan structure before estimating electricity costs.</span>
          </Link>
          <Link to="/texas-homeownership-cost-calculator" className="border border-border p-5 hover:border-primary/50">
            <strong className="font-display text-xl">Texas homeownership cost calculator</strong>
            <span className="mt-2 block text-sm leading-6 text-muted-foreground">Combine utilities with taxes, insurance and other recurring housing costs.</span>
          </Link>
        </div>
      </section>
    </CalculatorPage>
  );
}
