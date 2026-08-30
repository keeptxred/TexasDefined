import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { ClosingCostCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';

const description = 'Estimate Texas buyer and seller closing costs, credits and cash needed at closing before you make an offer or price a sale.';

const faqs = [
  { question: 'What are closing costs in a Texas home purchase?', answer: 'Closing costs are the transaction expenses that sit outside the purchase price itself. Depending on the side of the transaction and the deal structure, they can include lender charges, title and settlement costs, prepaid items, recording charges, inspections, surveys, taxes, insurance-related amounts and negotiated credits.' },
  { question: 'Are buyer and seller closing costs the same?', answer: 'No. Buyers and sellers can face different categories of costs, and the final allocation depends on the contract, financing, title work and negotiated credits. This calculator separates buyer and seller planning rather than treating closing costs as one universal percentage.' },
  { question: 'Do closing costs include the down payment?', answer: 'The down payment and closing costs are separate planning items. A buyer may need cash for both, along with any reserves or prepaid amounts required for the transaction.' },
  { question: 'Can seller credits reduce the buyer cash needed at closing?', answer: 'A negotiated seller credit can reduce eligible buyer closing costs, subject to the contract and any lender or program limits. Enter credits separately so the estimate shows how they affect the cash-to-close scenario.' },
];

export const Route = createLazyFileRoute('/texas-closing-cost-calculator')({ component: TexasClosingCostCalculatorPage });

function TexasClosingCostCalculatorPage() {
  return (
    <CalculatorPage eyebrow="Texas closing-cost estimator" title="Texas closing cost calculator" description={description}>
      <ClosingCostCalculator />
      <section className="mt-14 border-t border-border pt-10" aria-labelledby="closing-costs-heading">
        <p className="eyebrow text-primary">What the estimate means</p>
        <h2 id="closing-costs-heading" className="mt-3 font-display text-3xl">Separate the purchase price from the cash that changes hands at closing</h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
          <p>A home price does not tell you the full amount a buyer may need on closing day or the amount a seller may keep from a sale. Closing costs sit beside the down payment, mortgage payoff and negotiated credits, so they should be modeled separately.</p>
          <p>Use this calculator to compare buyer and seller scenarios with the assumptions you actually know. Then replace rough percentages with lender, title, insurance, tax and contract figures as the transaction becomes more specific.</p>
          <p>The result is a planning estimate, not a settlement statement. Final figures can change with financing, title work, prepaid items, prorations, inspections, surveys, insurance, taxes and negotiated contract terms.</p>
        </div>
      </section>
      <section className="mt-12 border-t border-border pt-10" aria-labelledby="closing-costs-plan-heading">
        <p className="eyebrow text-primary">Build the full transaction budget</p>
        <h2 id="closing-costs-plan-heading" className="mt-3 font-display text-3xl">Connect closing costs to buyer cash and seller proceeds</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link to="/article/$slug" params={{ slug: 'texas-closing-costs-guide' }} className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Texas closing-cost guide</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Understand cash to close, lender charges, title services, prepaids and escrow deposits before interpreting the estimate.</span></Link>
          <Link to="/texas-down-payment-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Down payment calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Plan the buyer equity contribution separately from transaction costs.</span></Link>
          <a href="/texas-cash-to-close-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Cash-to-close calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Combine down payment, closing costs and prepaids, then account for credits, deposits, assistance and a reserve.</span></a>
          <a href="/texas-seller-net-proceeds-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Seller net proceeds</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Carry the seller-cost estimate through mortgage payoff, credits, repairs and other deductions.</span></a>
          <Link to="/texas-mortgage-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Mortgage calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Estimate the recurring monthly housing payment after the one-time closing transaction.</span></Link>
          <Link to="/texas-home-affordability-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Home affordability calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Test how income, debts, down payment, taxes and insurance affect a possible home-price range.</span></Link>
        </div>
      </section>
      <section className="mt-12 border-t border-border pt-10" aria-labelledby="closing-costs-faq-heading">
        <p className="eyebrow text-primary">Common questions</p><h2 id="closing-costs-faq-heading" className="mt-3 font-display text-3xl">Texas closing-cost calculator FAQ</h2>
        <div className="mt-6 divide-y divide-border border-y border-border">{faqs.map((faq) => <div key={faq.question} className="py-6"><h3 className="font-display text-2xl">{faq.question}</h3><p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p></div>)}</div>
      </section>
    </CalculatorPage>
  );
}
