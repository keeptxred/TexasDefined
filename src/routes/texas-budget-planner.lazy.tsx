import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { BudgetCalculator } from '@/components/calculators/TexasBudgetPlanner';
import { budgetPlannerFaqs } from '@/data/budget-planner-faqs';

const description = 'Build a Texas household budget with take-home income, detailed monthly expenses, annual bill reserves, savings targets, scenario comparisons and a printable forecast. No account needed.';

export const Route = createLazyFileRoute('/texas-budget-planner')({
  component: TexasBudgetPlannerPage,
});

function TexasBudgetPlannerPage() {
  return <CalculatorPage eyebrow="Where the money goes" title="Texas household budget planner" description={description}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://texasdefined.com/texas-budget-planner#faq',
      mainEntity: budgetPlannerFaqs.map(faq => ({
        '@type': 'Question', name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    }) }} />
    <BudgetCalculator />
    <section className="mt-14 border-t border-border pt-10" aria-labelledby="budget-structure-heading"><p className="eyebrow text-primary">Make irregular costs monthly</p><h2 id="budget-structure-heading" className="mt-3 font-display text-3xl">A useful budget includes the bills that do not arrive every month</h2><div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground"><p>Start with take-home income and the recurring bills that are easy to see. Then add monthly reserves for predictable but irregular costs such as maintenance, insurance deductibles, vehicle expenses and seasonal utility swings.</p><p>The goal is not to force every household into one percentage formula. It is to make the full set of obligations visible enough that housing, transportation or debt decisions can be tested before they become fixed costs.</p></div></section>
    <section className="mt-12 border-t border-border pt-10" aria-labelledby="budget-links-heading"><p className="eyebrow text-primary">Fill in the biggest assumptions</p><h2 id="budget-links-heading" className="mt-3 font-display text-3xl">Use the other Texas tools to improve the budget inputs</h2><div className="mt-6 grid gap-4 md:grid-cols-3">
      <Link to="/texas-salary-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Take-home pay</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Estimate paycheck income before building the monthly spending plan.</span></Link>
      <Link to="/texas-cost-of-living-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Cost of living</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Compare household-cost assumptions across Texas locations.</span></Link>
      <Link to="/texas-salary-comparison-by-city" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Salary comparison by city</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Test whether a job offer keeps pace with the recurring budget in another Texas city.</span></Link>
      <Link to="/texas-moving-cost-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Moving costs</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Keep one-time transportation, packing, deposits and setup costs separate from the monthly budget.</span></Link>
      <Link to="/texas-utility-cost-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Utility costs</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Estimate electricity, water, gas, internet and trash instead of using one vague utilities line.</span></Link>
      <Link to="/texas-homeownership-cost-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Homeownership cost</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Build mortgage, taxes, insurance, maintenance and utilities into the housing number.</span></Link>
    </div></section>
    <section className="mt-12 border-t border-border pt-10" aria-labelledby="budget-method-heading">
      <p className="eyebrow text-primary">Methodology · updated October 9, 2026</p>
      <h2 id="budget-method-heading" className="mt-3 font-display text-3xl">How the Texas household budget math works</h2>
      <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
        <p><strong className="text-foreground">Monthly take-home income</strong> is the sum of all after-deduction household pay and additional income. This is not gross salary; avoid subtracting payroll tax or benefits a second time.</p>
        <p><strong className="text-foreground">Expenses</strong> add the monthly amounts entered for housing, transportation, utilities, food, debts, family costs and other spending. Each annual bill entered separately is divided by 12 and included in monthly expenses as a reserve.</p>
        <p><strong className="text-foreground">Savings</strong> are shown separately from expenses. Remaining money equals income minus expenses minus savings allocations. Percentages shown use monthly take-home income as the denominator.</p>
        <p><strong className="text-foreground">Annual projection</strong> multiplies the monthly figures by 12. It assumes no raises, inflation, investment growth or seasonal cash-flow changes. The underlying values are household estimates, not verified Texas averages or eligibility decisions.</p>
      </div>
      <div className="mt-7 overflow-x-auto border-y border-border">
        <table className="w-full text-sm">
          <caption className="sr-only">Illustrative Texas household monthly budget with example values</caption>
          <thead><tr className="border-b border-border"><th scope="col" className="py-3 text-left">Illustrative example only</th><th scope="col" className="py-3 text-right">Monthly</th></tr></thead>
          <tbody>
            <tr className="border-b border-border"><th scope="row" className="py-3 text-left font-medium">Take-home income</th><td className="py-3 text-right">$7,000</td></tr>
            <tr className="border-b border-border"><th scope="row" className="py-3 text-left font-medium">Regular expenses and bill reserves</th><td className="py-3 text-right">$5,250</td></tr>
            <tr className="border-b border-border"><th scope="row" className="py-3 text-left font-medium">Savings allocations</th><td className="py-3 text-right">$700</td></tr>
            <tr><th scope="row" className="py-3 text-left font-semibold">Remaining, before further irregular needs</th><td className="py-3 text-right font-semibold">$1,050</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">Worked example is hypothetical and not a statement about a typical Texas family. It assumes annual-only bill fields have not yet been filled in.</p>
    </section>
    <section className="mt-12 border-t border-border pt-10" aria-labelledby="texas-budget-sources-heading">
      <p className="eyebrow text-primary">Texas-specific checks</p>
      <h2 id="texas-budget-sources-heading" className="mt-3 font-display text-3xl">Verify the assumptions that change by address</h2>
      <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
        <p>Texas property taxes are levied by local taxing units, not as a statewide property tax. Confirm the bill for your specific property and avoid adding it again when it is escrowed into a mortgage payment. <a className="underline decoration-primary underline-offset-4" href="https://comptroller.texas.gov/taxes/property-tax/basics.php" target="_blank" rel="noopener noreferrer">Texas Comptroller: property tax basics</a>.</p>
        <p>Home insurance prices, deductibles and covered perils vary by household and property. Review windstorm and flood protection separately where applicable. <a className="underline decoration-primary underline-offset-4" href="https://tdi.texas.gov/consumer/home-insurance-shopping-guide.html" target="_blank" rel="noopener noreferrer">Texas Department of Insurance: home insurance shopping guide</a>.</p>
        <p>Texas summer electricity costs, toll-road usage and vehicle expenses can be very different from one household to another. Use bills, policy renewals and travel patterns, not an assumed statewide average.</p>
      </div>
    </section>
    <section className="mt-12 border-t border-border pt-10" aria-labelledby="budget-faq-heading"><p className="eyebrow text-primary">Common questions</p><h2 id="budget-faq-heading" className="mt-3 font-display text-3xl">Texas household budget planner FAQ</h2><div className="mt-6 divide-y divide-border border-y border-border">{budgetPlannerFaqs.map((faq) => <div key={faq.question} className="py-6"><h3 className="font-display text-2xl">{faq.question}</h3><p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p></div>)}</div></section>
  </CalculatorPage>;
}
