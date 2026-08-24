import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { HomeEquityGrowthCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';

const description = 'Explore how a Texas home value, mortgage balance and equity could change over time under adjustable appreciation and loan-paydown assumptions. The result is a scenario, not a forecast.';

const faqs = [
  {
    question: 'Does this calculator predict what my Texas home will be worth?',
    answer: 'No. Appreciation is an assumption you control. Actual property values can rise, fall or remain flat, so the future-value result is a scenario rather than a forecast or appraisal.',
  },
  {
    question: 'How does mortgage paydown build equity?',
    answer: 'As scheduled principal payments reduce the loan balance, the difference between the home value and secured debt can grow even if the property value stays unchanged.',
  },
  {
    question: 'Why should I test a zero-growth or lower-value scenario?',
    answer: 'A conservative scenario shows how much of the projected equity depends on loan paydown versus assumed appreciation. It also prevents a household plan from relying entirely on future market gains.',
  },
  {
    question: 'Is projected equity the same as borrowing capacity?',
    answer: 'No. Future borrowing depends on the property value and loan balances at that time plus lender, appraisal, product and legal requirements. This calculator is for planning scenarios only.',
  },
];

export const Route = createLazyFileRoute('/texas-home-equity-growth-calculator')({
  component: TexasHomeEquityGrowthCalculatorPage,
});

function TexasHomeEquityGrowthCalculatorPage() {
  return (
    <CalculatorPage eyebrow="Looking a few years ahead" title="Texas home equity growth calculator" description={description}>
      <HomeEquityGrowthCalculator />

      <section className="mt-14 border-t border-border pt-10" aria-labelledby="equity-growth-heading">
        <p className="eyebrow text-primary">Separate paydown from appreciation</p>
        <h2 id="equity-growth-heading" className="mt-3 font-display text-3xl">Future equity depends on two moving numbers</h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
          <p>Mortgage principal generally declines as payments are made, while the property's market value can move independently. This calculator combines those two assumptions so you can see how much of a future equity estimate comes from loan paydown and how much comes from an assumed change in value.</p>
          <p>Run a zero-appreciation scenario before using a higher growth assumption. That creates a useful baseline and makes it easier to see when a long-term plan depends heavily on future market gains that are not guaranteed.</p>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="equity-growth-links-heading">
        <p className="eyebrow text-primary">Use today's numbers first</p>
        <h2 id="equity-growth-links-heading" className="mt-3 font-display text-3xl">Connect future scenarios to the current mortgage and equity position</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Link to="/texas-home-equity-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Current home equity</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Start with today's estimated value and secured loan balances.</span></Link>
          <Link to="/texas-mortgage-payoff-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Mortgage payoff scenarios</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">See how extra principal could change the balance independently of home appreciation.</span></Link>
          <Link to="/article/texas-home-equity-heloc-guide" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Texas equity and HELOC guide</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Understand why estimated equity and actual borrowing eligibility are different questions.</span></Link>
          <Link to="/texas-homeownership-cost-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Homeownership cost calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Keep maintenance and carrying costs visible while thinking about long-term equity.</span></Link>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="equity-growth-faq-heading">
        <p className="eyebrow text-primary">Common questions</p>
        <h2 id="equity-growth-faq-heading" className="mt-3 font-display text-3xl">Texas home equity growth calculator FAQ</h2>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {faqs.map((faq) => <div key={faq.question} className="py-6"><h3 className="font-display text-2xl">{faq.question}</h3><p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p></div>)}
        </div>
      </section>
    </CalculatorPage>
  );
}
