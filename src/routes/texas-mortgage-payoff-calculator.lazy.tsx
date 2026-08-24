import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { MortgagePayoffCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';

const description = 'Estimate how extra principal payments could change a mortgage payoff date and the interest left to pay, then compare that plan with refinancing or keeping the current schedule.';

const faqs = [
  {
    question: 'How do extra mortgage payments shorten the payoff schedule?',
    answer: 'When an extra payment is applied to principal, the loan balance falls faster. Future interest is then calculated from a smaller balance, which can reduce total interest and shorten the remaining repayment period.',
  },
  {
    question: 'Is the calculator result the same as an official mortgage payoff quote?',
    answer: 'No. A servicer payoff quote can include interest through the planned payoff date and other amounts that are not the same as the current principal balance. Use this calculator for planning, then request an official payoff amount from the servicer before paying a loan off in full.',
  },
  {
    question: 'Should I send every extra dollar to the mortgage?',
    answer: 'Not automatically. Compare the interest saved with emergency reserves, higher-interest debt, retirement savings and other household priorities. Extra principal is most useful when the household can afford to make the cash less liquid.',
  },
  {
    question: 'Can a mortgage have a prepayment penalty?',
    answer: 'Some loans can include prepayment-penalty terms. Review the note and current loan disclosures or ask the servicer before making a large payoff or unusually large principal reduction.',
  },
];

export const Route = createLazyFileRoute('/texas-mortgage-payoff-calculator')({
  component: TexasMortgagePayoffCalculatorPage,
});

function TexasMortgagePayoffCalculatorPage() {
  return (
    <CalculatorPage eyebrow="A faster road to paid off" title="Texas mortgage payoff calculator" description={description}>
      <MortgagePayoffCalculator />

      <section className="mt-14 border-t border-border pt-10" aria-labelledby="payoff-how-heading">
        <p className="eyebrow text-primary">How the payoff changes</p>
        <h2 id="payoff-how-heading" className="mt-3 font-display text-3xl">Extra principal changes the balance that future interest uses</h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
          <p>A standard amortizing mortgage payment contains principal and interest. Earlier in the schedule, more of the scheduled payment can go to interest; as the balance falls, more of the payment goes toward principal. An additional amount applied directly to principal lowers that balance sooner.</p>
          <p>Use several scenarios instead of one aggressive target. Compare the normal schedule with a modest recurring extra payment and a larger amount you could still sustain through ordinary repairs, insurance renewals and other household expenses.</p>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="payoff-compare-heading">
        <p className="eyebrow text-primary">Compare the alternatives</p>
        <h2 id="payoff-compare-heading" className="mt-3 font-display text-3xl">Pay extra, refinance, or keep the current schedule?</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Link to="/texas-mortgage-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Mortgage calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Rebuild the current payment from balance, rate, taxes and insurance.</span></Link>
          <Link to="/texas-refinance-savings-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Refinance savings</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Compare a new loan with the cost and timing of keeping the current mortgage.</span></Link>
          <Link to="/article/should-you-refinance-texas-mortgage" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Texas refinance guide</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Understand break-even, term resets, lender credits and cash-out tradeoffs.</span></Link>
          <Link to="/article/texas-mortgage-payment-guide" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">What is in a mortgage payment?</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Separate loan principal and interest from escrowed taxes, insurance and other housing costs.</span></Link>
          <Link to="/texas-homeownership-cost-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Full homeownership cost</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Make sure extra principal still leaves room for maintenance, utilities and other ownership costs.</span></Link>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="payoff-source-heading">
        <p className="eyebrow text-primary">Official mortgage references</p>
        <h2 id="payoff-source-heading" className="mt-3 font-display text-3xl">Verify the loan terms before making a large payment</h2>
        <div className="mt-5 max-w-3xl space-y-3 text-sm leading-7 text-muted-foreground">
          <p><a className="font-semibold text-primary underline underline-offset-4" href="https://www.consumerfinance.gov/ask-cfpb/how-does-paying-down-a-mortgage-work-en-1943/">CFPB: How paying down a mortgage works</a> explains principal, interest and amortization.</p>
          <p><a className="font-semibold text-primary underline underline-offset-4" href="https://www.consumerfinance.gov/ask-cfpb/what-is-a-payoff-amount-and-is-it-the-same-as-my-current-balance-en-205/">CFPB: Payoff amount versus current balance</a> explains why a servicer payoff quote can differ from the displayed loan balance.</p>
          <p><a className="font-semibold text-primary underline underline-offset-4" href="https://www.consumerfinance.gov/ask-cfpb/what-is-a-prepayment-penalty-en-1957/">CFPB: Prepayment penalties</a> explains why borrowers should check the loan terms before a large early payoff.</p>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="payoff-faq-heading">
        <p className="eyebrow text-primary">Common questions</p>
        <h2 id="payoff-faq-heading" className="mt-3 font-display text-3xl">Texas mortgage payoff calculator FAQ</h2>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {faqs.map((faq) => <div key={faq.question} className="py-6"><h3 className="font-display text-2xl">{faq.question}</h3><p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p></div>)}
        </div>
      </section>
    </CalculatorPage>
  );
}
