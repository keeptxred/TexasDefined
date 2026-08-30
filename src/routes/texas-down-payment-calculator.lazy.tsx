import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { DownPaymentCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';

const description = 'Estimate a Texas home down payment, expected closing costs and a post-closing cash reserve so the purchase budget is based on total cash needed rather than one percentage.';

const faqs = [
  { question: 'Do you have to put 20 percent down on a Texas house?', answer: 'No. Twenty percent is a common benchmark, but mortgage programs can permit smaller down payments for qualified borrowers. The available minimum depends on the loan program, borrower, property and lender requirements.' },
  { question: 'Is the down payment the same as cash to close?', answer: 'No. Cash to close can include the down payment plus lender charges, title and settlement costs, prepaids and initial escrow deposits, minus credits or deposits already applied.' },
  { question: 'Should I use all my savings for a larger down payment?', answer: 'A larger down payment can reduce the loan balance, but it also reduces liquid savings. Compare the payment benefit with the emergency and repair reserve left after closing.' },
  { question: 'Can Texas homebuyer programs help with down payment or closing costs?', answer: 'Some state and local programs may offer assistance to eligible buyers. Program rules, approved lenders, income limits, purchase-price limits and repayment terms can change, so verify current requirements before counting assistance as available cash.' },
];

export const Route = createLazyFileRoute('/texas-down-payment-calculator')({ component: TexasDownPaymentCalculatorPage });

function TexasDownPaymentCalculatorPage() {
  return (
    <CalculatorPage eyebrow="Before you make an offer" title="Texas down payment calculator" description={description}>
      <DownPaymentCalculator />
      <section className="mt-14 border-t border-border pt-10" aria-labelledby="down-payment-budget-heading">
        <p className="eyebrow text-primary">Cash to close is bigger than the down payment</p>
        <h2 id="down-payment-budget-heading" className="mt-3 font-display text-3xl">Keep the down payment, closing costs and reserves in one plan</h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground"><p>The down payment is the buyer's equity contribution toward the purchase price. It is not the complete amount a buyer may need at closing. Lender charges, title and settlement services, prepaid interest, insurance and escrow deposits can all add to the transaction.</p><p>Run more than one down-payment scenario. A larger percentage can reduce the amount borrowed, but a purchase is more resilient when the household still has cash for moving, an insurance deductible and an ordinary first-year repair after the transaction is complete.</p></div>
      </section>
      <section className="mt-12 border-t border-border pt-10" aria-labelledby="down-payment-links-heading">
        <p className="eyebrow text-primary">Build the complete purchase plan</p><h2 id="down-payment-links-heading" className="mt-3 font-display text-3xl">Connect the cash requirement to the payment you can carry</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Link to="/article/texas-house-down-payment-guide" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Texas down-payment guide</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Compare conventional, FHA, VA and assistance pathways without assuming 20 percent is universal.</span></Link>
          <a href="/texas-cash-to-close-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Cash-to-close calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Carry the down payment into a full closing-day cash scenario with prepaids, credits, deposits and a post-closing reserve.</span></a>
          <Link to="/texas-closing-cost-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Closing-cost calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Estimate the transaction costs that sit beside the down payment.</span></Link>
          <Link to="/texas-home-affordability-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Home affordability</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Test the resulting loan and housing costs against income and debts.</span></Link>
          <Link to="/texas-mortgage-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Mortgage calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Turn purchase price, down payment and rate into a monthly housing estimate.</span></Link>
          <Link to="/texas-down-payment-assistance-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Down-payment assistance</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Explore how possible assistance may change the cash still needed.</span></Link>
        </div>
      </section>
      <section className="mt-12 border-t border-border pt-10" aria-labelledby="down-payment-source-heading"><p className="eyebrow text-primary">Official homebuyer resources</p><h2 id="down-payment-source-heading" className="mt-3 font-display text-3xl">Verify program rules before choosing the percentage</h2><div className="mt-5 max-w-3xl space-y-3 text-sm leading-7 text-muted-foreground"><p><a className="font-semibold text-primary underline underline-offset-4" href="https://www.hud.gov/buying/loans">HUD homebuying loan guidance</a> explains FHA-insured purchase-loan options.</p><p><a className="font-semibold text-primary underline underline-offset-4" href="https://www.va.gov/housing-assistance/home-loans/loan-types/purchase-loan/">VA-backed purchase loan guidance</a> explains current eligibility and purchase-loan benefits for qualifying borrowers.</p><p><a className="font-semibold text-primary underline underline-offset-4" href="https://welcomehome.tdhca.texas.gov/">Texas Homebuyer Program</a> provides current TDHCA information about participating homebuyer assistance programs.</p></div></section>
      <section className="mt-12 border-t border-border pt-10" aria-labelledby="down-payment-faq-heading"><p className="eyebrow text-primary">Common questions</p><h2 id="down-payment-faq-heading" className="mt-3 font-display text-3xl">Texas down payment calculator FAQ</h2><div className="mt-6 divide-y divide-border border-y border-border">{faqs.map((faq) => <div key={faq.question} className="py-6"><h3 className="font-display text-2xl">{faq.question}</h3><p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p></div>)}</div></section>
    </CalculatorPage>
  );
}
