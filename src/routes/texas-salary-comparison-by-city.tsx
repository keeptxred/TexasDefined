import { createFileRoute, Link } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { SalaryComparisonCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Compare a salary between Texas cities using adjustable cost-of-living assumptions, then test the result against take-home pay, housing and utility costs instead of treating one index as an exact required salary.';

const faqs = [
  { question: 'Does a cost-of-living comparison tell me the exact salary I need in another Texas city?', answer: 'No. It converts selected cost assumptions into a comparable salary estimate. Actual housing, transportation, taxes, insurance, childcare and lifestyle spending can differ substantially between households.' },
  { question: 'Why can two people need different salaries in the same city?', answer: 'Housing choice, commute, household size, debt, childcare, health costs, savings goals and other expenses can matter more than the citywide average used in a comparison index.' },
  { question: 'Should I compare gross salary or take-home pay?', answer: 'Use the comparable gross salary as orientation, then run the Texas salary calculator and household budget so the job decision is based on expected take-home income and actual recurring expenses.' },
  { question: 'What should I verify before accepting a job in another Texas city?', answer: 'Price the likely housing area, commute, utilities, insurance and other address-level costs. A metro-wide salary comparison is more useful when paired with the neighborhood and work corridor the household would actually use.' },
];

export const Route = createFileRoute('/texas-salary-comparison-by-city')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-salary-comparison-by-city',
    title: 'Texas Salary Comparison by City | Cost-Adjusted Pay Estimate',
    description,
    featureList: ['Start with your current salary', 'Choose another Texas city', 'Adjust cost-of-living assumptions', 'See a comparable salary', 'Continue into take-home pay and household costs'],
  }),
  component: TexasSalaryComparisonPage,
});

function TexasSalaryComparisonPage() {
  return <CalculatorPage eyebrow="Before you take the job" title="Compare salaries between Texas cities" description={description}>
    <SalaryComparisonCalculator />
    <section className="mt-14 border-t border-border pt-10" aria-labelledby="salary-city-heading"><p className="eyebrow text-primary">Use the comparison as a starting point</p><h2 id="salary-city-heading" className="mt-3 font-display text-3xl">A citywide index cannot see your housing or commute</h2><div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground"><p>A cost-adjusted salary is useful for orientation, but it is not a personal offer threshold. The household still has to choose a home, commute, utility setup and spending pattern inside the destination metro.</p><p>Adjust the assumptions, then verify the largest categories with the place you are actually considering. A job with a higher salary can still reduce flexibility if housing and transportation rise faster than the paycheck.</p></div></section>
    <section className="mt-12 border-t border-border pt-10" aria-labelledby="salary-city-links-heading"><p className="eyebrow text-primary">Turn the comparison into a relocation budget</p><h2 id="salary-city-links-heading" className="mt-3 font-display text-3xl">Compare income with the costs you will actually carry</h2><div className="mt-6 grid gap-4 md:grid-cols-3">
      <Link to="/texas-salary-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Texas salary calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Convert a salary scenario into an estimated take-home paycheck.</span></Link>
      <Link to="/texas-cost-of-living-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Cost of living</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Change the household spending assumptions behind the city comparison.</span></Link>
      <Link to="/texas-budget-planner" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Household budget</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Put take-home income and recurring expenses into one monthly plan.</span></Link>
      <Link to="/moving-to-texas" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Moving to Texas</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Compare counties, cities and the practical systems behind a relocation.</span></Link>
      <Link to="/texas-utility-cost-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Utility costs</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Replace a generic utility assumption with a more explicit household estimate.</span></Link>
    </div></section>
    <section className="mt-12 border-t border-border pt-10" aria-labelledby="salary-city-faq-heading"><p className="eyebrow text-primary">Common questions</p><h2 id="salary-city-faq-heading" className="mt-3 font-display text-3xl">Texas salary comparison FAQ</h2><div className="mt-6 divide-y divide-border border-y border-border">{faqs.map((faq) => <div key={faq.question} className="py-6"><h3 className="font-display text-2xl">{faq.question}</h3><p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p></div>)}</div></section>
  </CalculatorPage>;
}
