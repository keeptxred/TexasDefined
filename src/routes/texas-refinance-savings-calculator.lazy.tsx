import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { RefinanceCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';

const description = 'Compare a current Texas mortgage with a possible refinance, including payment change, estimated closing costs, a simple break-even period and the effect of changing the loan term.';

const faqs = [
  {
    question: 'What is a refinance break-even period?',
    answer: 'A simple break-even estimate compares upfront refinance costs with expected monthly savings. It is a screening tool, not a complete measure, because term length, principal reduction, points and mortgage insurance can also change the economics.',
  },
  {
    question: 'Can a lower payment still cost more over time?',
    answer: 'Yes. A new longer-term loan can lower the monthly payment partly by extending repayment. Compare the new loan with the remaining term on the current mortgage so additional years are an explicit choice.',
  },
  {
    question: 'Does no-closing-cost refinancing mean the refinance is free?',
    answer: 'Not necessarily. Costs can be recovered through a higher interest rate, lender credit or loan balance. Compare the complete Loan Estimate rather than the upfront cash alone.',
  },
  {
    question: 'Should I refinance or make extra principal payments?',
    answer: 'They solve different problems. Compare the cost and new terms of refinancing with the interest and payoff effect of keeping the current loan and paying additional principal.',
  },
];

export const Route = createLazyFileRoute('/texas-refinance-savings-calculator')({
  component: TexasRefinanceSavingsCalculatorPage,
});

function TexasRefinanceSavingsCalculatorPage() {
  return (
    <CalculatorPage eyebrow="Before you replace the loan" title="Texas refinance savings calculator" description={description}>
      <RefinanceCalculator />

      <section className="mt-14 border-t border-border pt-10" aria-labelledby="refinance-break-even-heading">
        <p className="eyebrow text-primary">Payment savings are only the first test</p>
        <h2 id="refinance-break-even-heading" className="mt-3 font-display text-3xl">Compare break-even and the repayment clock together</h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
          <p>A refinance can reduce the rate or payment and still be a poor fit if the household pays substantial closing costs shortly before selling or quietly restarts a long loan term. Compare the proposed loan with the current mortgage using the same expected holding period.</p>
          <p>Use the calculator as a first screen, then compare actual lender Loan Estimates with the same loan amount and term assumptions. Points, credits, mortgage insurance and cash due can make two offers with similar rates behave differently.</p>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="refinance-links-heading">
        <p className="eyebrow text-primary">Compare the alternatives</p>
        <h2 id="refinance-links-heading" className="mt-3 font-display text-3xl">A refinance is not the only way to change the mortgage</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Link to="/article/should-you-refinance-texas-mortgage" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Texas refinance guide</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Go deeper on break-even, term resets, lender credits and cash-out decisions.</span></Link>
          <Link to="/texas-mortgage-payoff-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Mortgage payoff calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Compare refinancing with keeping the current loan and paying extra principal.</span></Link>
          <Link to="/texas-home-equity-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Home-equity calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Estimate the equity position before considering a cash-out structure.</span></Link>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="refinance-source-heading">
        <p className="eyebrow text-primary">Official mortgage guidance</p>
        <h2 id="refinance-source-heading" className="mt-3 font-display text-3xl">Compare the actual loan disclosures</h2>
        <div className="mt-5 max-w-3xl space-y-3 text-sm leading-7 text-muted-foreground">
          <p><a className="font-semibold text-primary underline underline-offset-4" href="https://www.consumerfinance.gov/owning-a-home/compare/">CFPB mortgage offer comparison</a> explains how to compare rates, points, credits and Loan Estimates.</p>
          <p><a className="font-semibold text-primary underline underline-offset-4" href="https://www.consumerfinance.gov/ask-cfpb/is-there-such-a-thing-as-a-no-cost-or-no-closing-loan-or-refinancing-en-141/">CFPB no-closing-cost refinance explanation</a> explains how costs can be recovered through the loan structure.</p>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="refinance-faq-heading">
        <p className="eyebrow text-primary">Common questions</p>
        <h2 id="refinance-faq-heading" className="mt-3 font-display text-3xl">Texas refinance calculator FAQ</h2>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {faqs.map((faq) => <div key={faq.question} className="py-6"><h3 className="font-display text-2xl">{faq.question}</h3><p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p></div>)}
        </div>
      </section>
    </CalculatorPage>
  );
}
