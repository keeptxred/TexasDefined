import { createFileRoute, Link } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { CostOfLivingCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Compare a current household budget with a possible Texas destination using adjustable housing, transportation, food, utilities and other cost assumptions rather than relying on one statewide average.';

const faqs = [
  { question: 'What does a Texas cost-of-living calculator compare?', answer: 'It compares selected household spending categories under different assumptions. The result is most useful as a scenario for a move or job decision rather than an exact prediction of what a particular household will spend.' },
  { question: 'Why can my cost of living differ from the city average?', answer: 'Housing choice, commute, household size, childcare, insurance, debt, utility use and lifestyle can differ substantially from an average household even inside the same metro.' },
  { question: 'Should I use rent or homeownership costs in the comparison?', answer: 'Use the housing path you realistically expect after the move. Buyers should include taxes, insurance and ownership costs; renters should include rent, fees, renters insurance and utilities that are not included.' },
  { question: 'How should I compare a job offer in another Texas city?', answer: 'Use the cost-of-living result as orientation, then estimate take-home pay and rebuild the monthly household budget around the actual housing and commute you are considering.' },
];

export const Route = createFileRoute('/texas-cost-of-living-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-cost-of-living-calculator',
    title: 'Texas Cost of Living Calculator | Compare Household Budgets',
    description,
    featureList: ['Start with what your household spends now', 'Adjust housing and household cost assumptions', 'Estimate a possible budget for another Texas area', 'Continue into salary and relocation planning'],
  }),
  component: TexasCostOfLivingCalculatorPage,
});

function TexasCostOfLivingCalculatorPage() {
  return <CalculatorPage eyebrow="Texas moving and household budget" title="Texas cost of living calculator" description={description}>
    <CostOfLivingCalculator />
    <section className="mt-14 border-t border-border pt-10" aria-labelledby="cost-living-heading"><p className="eyebrow text-primary">Averages are a starting point</p><h2 id="cost-living-heading" className="mt-3 font-display text-3xl">Build the comparison around the household you actually have</h2><div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground"><p>Metro averages are useful for orientation, but the household still has to choose a home, commute, utility setup and spending pattern. Adjust the categories that will actually change instead of assuming every cost moves by the same percentage.</p><p>Housing and transportation often deserve the most attention because they can move together: a lower housing cost farther from work can create a higher vehicle, fuel, toll or time cost. Compare the combined effect rather than optimizing one line in isolation.</p></div></section>
    <section className="mt-12 border-t border-border pt-10" aria-labelledby="cost-living-links-heading"><p className="eyebrow text-primary">Turn the index into a real budget</p><h2 id="cost-living-links-heading" className="mt-3 font-display text-3xl">Verify the categories that matter most to the move</h2><div className="mt-6 grid gap-4 md:grid-cols-3">
      <Link to="/texas-salary-comparison-by-city" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Salary comparison by city</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Translate a city-cost scenario into a comparable salary starting point.</span></Link>
      <Link to="/texas-salary-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Take-home pay</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Estimate the paycheck that would actually fund the new budget.</span></Link>
      <Link to="/texas-budget-planner" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Household budget</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Put income and recurring expenses together after the comparison.</span></Link>
      <Link to="/texas-utility-cost-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Utility costs</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Break out electricity, water, gas, internet and trash assumptions.</span></Link>
      <Link to="/moving-to-texas" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Moving to Texas</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Compare the counties, cities and local systems behind the numbers.</span></Link>
    </div></section>
    <section className="mt-12 border-t border-border pt-10" aria-labelledby="cost-living-faq-heading"><p className="eyebrow text-primary">Common questions</p><h2 id="cost-living-faq-heading" className="mt-3 font-display text-3xl">Texas cost of living calculator FAQ</h2><div className="mt-6 divide-y divide-border border-y border-border">{faqs.map((faq) => <div key={faq.question} className="py-6"><h3 className="font-display text-2xl">{faq.question}</h3><p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p></div>)}</div></section>
  </CalculatorPage>;
}
