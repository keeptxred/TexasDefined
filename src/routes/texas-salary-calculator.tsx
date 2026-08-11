import { createFileRoute, Link } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { SalaryCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Estimate Texas take-home pay after federal income tax, payroll taxes, benefits and other deductions. Texas does not impose an individual state income tax.';

const faqs = [
  {
    question: 'Does Texas have a state income tax on wages?',
    answer: 'Texas does not impose an individual state income tax, so a Texas paycheck estimate usually focuses on federal income tax, Social Security, Medicare, benefits, retirement contributions and other payroll deductions.',
  },
  {
    question: 'How do I estimate after-tax income in Texas?',
    answer: 'Start with gross pay, subtract estimated federal income tax and payroll taxes, then include benefits, retirement contributions and any other deductions that apply to your paycheck.',
  },
  {
    question: 'Is this Texas salary calculator an exact payroll result?',
    answer: 'No. It is a planning estimate. Actual withholding depends on filing status, elections, benefits, employer payroll settings and other personal tax details.',
  },
];

export const Route = createFileRoute('/texas-salary-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-salary-calculator',
    title: 'Texas Salary Calculator | Estimate Take-Home Pay After Tax',
    description,
    featureList: [
      'Estimate Texas take-home pay',
      'Account for federal income tax',
      'Include Social Security and Medicare',
      'Add benefits and other deductions',
    ],
  }),
  component: TexasSalaryCalculatorPage,
});

function TexasSalaryCalculatorPage() {
  return (
    <CalculatorPage eyebrow="Texas take-home pay calculator" title="Texas salary calculator" description={description}>
      <SalaryCalculator />

      <section className="mt-14 border-t border-border pt-10" aria-labelledby="salary-estimate-heading">
        <p className="eyebrow text-primary">From salary to paycheck</p>
        <h2 id="salary-estimate-heading" className="mt-3 font-display text-3xl">Estimate after-tax income in Texas</h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
          <p>Texas does not have an individual state income tax, but that does not make gross salary the same as take-home pay. Federal income tax, Social Security, Medicare, health benefits, retirement contributions and other deductions can all reduce the amount that reaches a paycheck.</p>
          <p>Use the calculator to compare salary or deduction scenarios, then verify actual withholding with payroll records and current federal tax information.</p>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="salary-links-heading">
        <p className="eyebrow text-primary">Put income in context</p>
        <h2 id="salary-links-heading" className="mt-3 font-display text-3xl">Compare pay with Texas living costs</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Link to="/texas-cost-of-living-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Cost of living calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Compare household costs alongside take-home pay.</span></Link>
          <Link to="/texas-home-affordability-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Home affordability</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Test how income and monthly obligations affect a home-buying budget.</span></Link>
          <Link to="/texas-utility-cost-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Utility cost calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Estimate electricity, water, gas, internet and trash costs.</span></Link>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="salary-faq-heading">
        <p className="eyebrow text-primary">Common questions</p>
        <h2 id="salary-faq-heading" className="mt-3 font-display text-3xl">Texas salary calculator FAQ</h2>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {faqs.map((faq) => <div key={faq.question} className="py-6"><h3 className="font-display text-2xl">{faq.question}</h3><p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p></div>)}
        </div>
      </section>
    </CalculatorPage>
  );
}
