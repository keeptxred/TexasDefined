import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { SalaryCalculator } from '@/components/calculators/TexasPlanningCalculators';

const description = 'Estimate a Texas paycheck and take-home pay after federal income tax, Social Security, Medicare, benefits and other deductions. Texas has no individual state income tax.';

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
    question: 'Should I use salary or paycheck amount when comparing jobs?',
    answer: 'Use both. Annual salary is useful for comparing offers, but monthly and per-paycheck take-home amounts are better for budgeting. Compare benefits, retirement contributions, health-insurance deductions and any bonus or commission structure as well as base salary.',
  },
  {
    question: 'Why can my actual Texas paycheck differ from this estimate?',
    answer: 'Actual withholding depends on filing status, Form W-4 elections, pre-tax benefits, retirement contributions, bonuses, employer payroll settings and other personal tax details. This calculator is designed for scenario planning rather than payroll preparation.',
  },
  {
    question: 'Where can I verify federal withholding?',
    answer: 'Use current IRS withholding guidance or the IRS Tax Withholding Estimator, especially after a job change, marriage, major income change or another event that affects your tax situation.',
  },
];

const grossPayExamples = [
  ['50,000', '4,166.67', '2,083.33', '1,923.08', '961.54'],
  ['80,000', '6,666.67', '3,333.33', '3,076.92', '1,538.46'],
  ['100,000', '8,333.33', '4,166.67', '3,846.15', '1,923.08'],
  ['150,000', '12,500.00', '6,250.00', '5,769.23', '2,884.62'],
];

export const Route = createLazyFileRoute('/texas-salary-calculator')({ component: TexasSalaryCalculatorPage });

function TexasSalaryCalculatorPage() {
  return (
    <CalculatorPage eyebrow="Texas take-home pay calculator" title="Texas paycheck and salary calculator" description={description}>
      <SalaryCalculator />
      <section className="mt-14 border-t border-border pt-10" aria-labelledby="salary-estimate-heading">
        <p className="eyebrow text-primary">From salary to paycheck</p>
        <h2 id="salary-estimate-heading" className="mt-3 font-display text-3xl">Estimate after-tax income and take-home pay in Texas</h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
          <p>Texas does not have an individual state income tax, but that does not make gross salary the same as take-home pay. Federal income tax, Social Security, Medicare, health benefits, retirement contributions and other deductions can all reduce the amount that reaches a paycheck.</p>
          <p>Use the calculator to compare salary or deduction scenarios, then verify actual withholding with payroll records and current federal tax information. A useful estimate should help you understand the size of the gap between gross pay and spendable pay, not pretend to reproduce an employer payroll system.</p>
          <p>If you are comparing jobs, run the calculator more than once. A lower-salary offer with lower health-insurance costs or a stronger employer retirement contribution can produce a different household result than salary alone suggests.</p>
        </div>
      </section>
      <section className="mt-12 border-t border-border pt-10" aria-labelledby="salary-inputs-heading">
        <p className="eyebrow text-primary">Build a better estimate</p>
        <h2 id="salary-inputs-heading" className="mt-3 font-display text-3xl">What belongs between gross salary and take-home pay</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ['Federal income tax', 'Use a reasonable withholding assumption for planning, then compare it with current IRS guidance or your actual paystub withholding.'],
            ['Social Security and Medicare', 'Payroll taxes still apply in Texas even though the state does not levy an individual income tax on wages.'],
            ['Health and insurance benefits', 'Employee premiums for medical, dental, vision, life or disability coverage can materially change net pay.'],
            ['Retirement contributions', '401(k), 403(b), pension and similar payroll elections can reduce the amount deposited while increasing long-term savings.'],
            ['Other payroll deductions', 'HSA or FSA contributions, commuter benefits, garnishments, union dues or other employer deductions may also affect the paycheck.'],
            ['Bonuses and variable pay', 'Commissions, bonuses and overtime can make a single paycheck look very different from a normal salary-period check.'],
          ].map(([title, copy]) => <div key={title} className="border border-border p-5"><strong className="font-display text-xl">{title}</strong><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></div>)}
        </div>
      </section>
      <section className="mt-12 border-t border-border pt-10" aria-labelledby="salary-frequency-heading">
        <p className="eyebrow text-primary">Budget with the result</p>
        <h2 id="salary-frequency-heading" className="mt-3 font-display text-3xl">Translate annual take-home into the way you actually get paid</h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
          <p>An annual take-home estimate becomes more useful when you convert it into monthly cash flow and compare it with your employer's pay schedule. Twelve monthly deposits, 24 semimonthly checks and 26 biweekly checks do not produce the same amount per paycheck even when annual pay is identical.</p>
          <p>For a biweekly employee, two months each year normally include a third paycheck. For a semimonthly employee, the check amount is usually more consistent because there are 24 scheduled pay periods. Use the annual result for comparison, but build your household budget around the timing of the deposits you actually receive.</p>
          <p>Do not treat irregular bonuses, commissions or overtime as guaranteed monthly income unless they are dependable enough to support the expense you are evaluating.</p>
        </div>
        <div className="mt-7 overflow-x-auto">
          <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
            <caption className="pb-3 text-left text-sm leading-6 text-muted-foreground">Gross-pay examples before taxes, benefits or other deductions.</caption>
            <thead><tr className="border-y border-border"><th className="py-3 pr-4 font-semibold">Annual salary</th><th className="py-3 pr-4 font-semibold">Monthly</th><th className="py-3 pr-4 font-semibold">Semimonthly</th><th className="py-3 pr-4 font-semibold">Biweekly</th><th className="py-3 font-semibold">Weekly</th></tr></thead>
            <tbody>{grossPayExamples.map(([salary, monthly, semimonthly, biweekly, weekly]) => <tr key={salary} className="border-b border-border"><td className="py-3 pr-4">${salary}</td><td className="py-3 pr-4">${monthly}</td><td className="py-3 pr-4">${semimonthly}</td><td className="py-3 pr-4">${biweekly}</td><td className="py-3">${weekly}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">For example, an $80,000 annual salary is about $3,076.92 gross every two weeks before withholding and deductions. Use the calculator above for the estimated after-tax result.</p>
      </section>
      <section className="mt-12 border-t border-border pt-10" aria-labelledby="salary-scenarios-heading">
        <p className="eyebrow text-primary">Compare scenarios</p>
        <h2 id="salary-scenarios-heading" className="mt-3 font-display text-3xl">Use the calculator for more than one salary number</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            ['Job-offer comparison', 'Enter each salary with realistic benefit and retirement deductions. Compare annual take-home, monthly take-home and the cost difference of the benefits package.'],
            ['Raise or promotion', 'Run your current salary and proposed salary using the same assumptions so you can see the approximate change in spendable income rather than only the change in gross pay.'],
            ['Moving to Texas', 'Use estimated Texas take-home pay alongside housing, utilities, property taxes and transportation so the relocation decision reflects the whole household budget.'],
            ['Home-buying budget', 'Lenders use their own underwriting rules, but take-home pay still matters for your personal comfort level after the mortgage, taxes, insurance and recurring bills are paid.'],
          ].map(([title, copy]) => <div key={title} className="border border-border p-5"><strong className="font-display text-xl">{title}</strong><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></div>)}
        </div>
      </section>
      <section className="mt-12 border-t border-border pt-10" aria-labelledby="salary-sources-heading">
        <p className="eyebrow text-primary">Verify the assumptions</p>
        <h2 id="salary-sources-heading" className="mt-3 font-display text-3xl">Federal payroll and withholding resources</h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
          <p>TexasDefined does not prepare payroll or tax returns. When you need a current withholding estimate, compare the planning result with the official federal resources below and with your employer's paystub.</p>
          <ul className="space-y-3">
            <li><a className="font-semibold text-primary underline decoration-primary/40 underline-offset-4" href="https://www.irs.gov/individuals/tax-withholding-estimator" target="_blank" rel="noreferrer">IRS Tax Withholding Estimator ↗</a> — useful for checking federal income-tax withholding assumptions.</li>
            <li><a className="font-semibold text-primary underline decoration-primary/40 underline-offset-4" href="https://www.irs.gov/forms-pubs/about-publication-15-t" target="_blank" rel="noreferrer">IRS Publication 15-T ↗</a> — federal income-tax withholding methods used by employers.</li>
            <li><a className="font-semibold text-primary underline decoration-primary/40 underline-offset-4" href="https://www.ssa.gov/oact/progdata/taxRates.html" target="_blank" rel="noreferrer">Social Security payroll-tax information ↗</a> — official Social Security Administration reference for payroll-tax rates and limits.</li>
          </ul>
        </div>
      </section>
      <section className="mt-12 border-t border-border pt-10" aria-labelledby="salary-links-heading">
        <p className="eyebrow text-primary">Put income in context</p>
        <h2 id="salary-links-heading" className="mt-3 font-display text-3xl">Compare pay with Texas living costs</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Link to="/texas-cost-of-living-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Cost of living calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Compare household costs alongside take-home pay.</span></Link>
          <Link to="/texas-salary-comparison-by-city" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Salary comparison by city</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Test a job offer against the recurring costs of another Texas city.</span></Link>
          <Link to="/texas-budget-planner" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Household budget</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Put estimated take-home pay and recurring expenses into one monthly plan.</span></Link>
          <Link to="/texas-moving-cost-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Moving costs</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Keep one-time relocation costs visible alongside the new paycheck and monthly budget.</span></Link>
          <Link to="/texas-home-affordability-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Home affordability</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Test how income and monthly obligations affect a home-buying budget.</span></Link>
          <Link to="/texas-utility-cost-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Utility cost calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Estimate electricity, water, gas, internet and trash costs.</span></Link>
        </div>
      </section>
      <section className="mt-12 border-t border-border pt-10" aria-labelledby="salary-faq-heading">
        <p className="eyebrow text-primary">Common questions</p>
        <h2 id="salary-faq-heading" className="mt-3 font-display text-3xl">Texas paycheck and salary calculator FAQ</h2>
        <div className="mt-6 divide-y divide-border border-y border-border">{faqs.map((faq) => <div key={faq.question} className="py-6"><h3 className="font-display text-2xl">{faq.question}</h3><p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p></div>)}</div>
      </section>
    </CalculatorPage>
  );
}