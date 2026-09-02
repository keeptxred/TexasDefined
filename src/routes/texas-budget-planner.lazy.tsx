import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { BudgetCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';

const description = 'Put monthly take-home income, housing, transportation, food, utilities, debt payments and savings goals in one Texas household budget so recurring costs stay visible together.';

const faqs = [
  { question: 'Should I build a budget from gross pay or take-home pay?', answer: 'For day-to-day household planning, take-home pay is usually the clearer starting point because it reflects the money that actually reaches the household after payroll deductions.' },
  { question: 'What expenses are easy to forget in a Texas household budget?', answer: 'Utilities, insurance deductibles, vehicle registration, tolls, property-related maintenance, seasonal electricity use, subscriptions and irregular repair costs are common items to keep visible instead of treating them as surprises.' },
  { question: 'How should I budget for expenses that do not happen every month?', answer: 'Convert predictable annual or seasonal costs into a monthly reserve. That can make insurance renewals, vehicle expenses, maintenance and other irregular bills easier to absorb when they arrive.' },
  { question: 'Is this planner a financial recommendation?', answer: 'No. It is a household planning tool. The categories and savings target should be adjusted to the household’s actual obligations, priorities and risk tolerance.' },
];

export const Route = createLazyFileRoute('/texas-budget-planner')({
  component: TexasBudgetPlannerPage,
});

function TexasBudgetPlannerPage() {
  return <CalculatorPage eyebrow="Where the money goes" title="Texas household budget planner" description={description}>
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
    <section className="mt-12 border-t border-border pt-10" aria-labelledby="budget-faq-heading"><p className="eyebrow text-primary">Common questions</p><h2 id="budget-faq-heading" className="mt-3 font-display text-3xl">Texas household budget planner FAQ</h2><div className="mt-6 divide-y divide-border border-y border-border">{faqs.map((faq) => <div key={faq.question} className="py-6"><h3 className="font-display text-2xl">{faq.question}</h3><p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p></div>)}</div></section>
  </CalculatorPage>;
}
