import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { HomeEquityCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';

const description = 'Estimate current Texas home equity from an assumed property value and mortgage balances, then use that estimate as a planning input rather than a promise of how much you can borrow.';

const faqs = [
  { question: 'What is home equity?', answer: 'Home equity is the difference between an estimated property value and debt secured by the property. Because the home value is an estimate and loan balances change, the result should be treated as a planning number.' },
  { question: 'Is estimated equity the same as cash I can borrow?', answer: 'No. A lender can apply product, underwriting, appraisal, lien and legal requirements that differ from the simple equity calculation. Use the estimate to frame questions, not as a borrowing approval.' },
  { question: 'What home value should I use?', answer: 'Use a defensible current estimate and test more than one value. A lower-value scenario can show how sensitive the equity estimate is to an appraisal or market change.' },
  { question: 'Should I include every loan secured by the home?', answer: 'Yes. A useful equity estimate accounts for the balances of loans or liens that are secured by the property rather than subtracting only the first mortgage.' },
];

export const Route = createLazyFileRoute('/texas-home-equity-calculator')({ component: TexasHomeEquityCalculatorPage });

function TexasHomeEquityCalculatorPage() {
  return (
    <CalculatorPage eyebrow="What your home may be worth to you" title="Texas home equity calculator" description={description}>
      <HomeEquityCalculator />
      <section className="mt-14 border-t border-border pt-10" aria-labelledby="equity-estimate-heading">
        <p className="eyebrow text-primary">Value minus secured debt</p><h2 id="equity-estimate-heading" className="mt-3 font-display text-3xl">Treat home equity as an estimate, not an available credit line or sale proceeds</h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground"><p>The calculation is straightforward: begin with an estimated property value and subtract debt secured by the home. The uncertainty sits in the inputs. Market estimates can differ from an appraisal, and loan balances move as payments, interest and new draws are posted.</p><p>Equity is also not the same as the cash a seller may receive. A real sale adds the negotiated sale price and transaction deductions such as seller costs, buyer credits, repairs, prorations and the actual payoff amount.</p></div>
      </section>
      <section className="mt-12 border-t border-border pt-10" aria-labelledby="equity-links-heading">
        <p className="eyebrow text-primary">Put the estimate in context</p><h2 id="equity-links-heading" className="mt-3 font-display text-3xl">Compare equity with borrowing, payoff and sale scenarios</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Link to="/article/texas-home-equity-heloc-guide" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Texas home-equity and HELOC guide</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Understand the borrowing structures and Texas-specific questions to verify before using equity.</span></Link>
          <a href="/texas-seller-net-proceeds-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Seller net proceeds</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Turn a possible sale price into a proceeds estimate after payoff, seller costs, credits, repairs and other deductions.</span></a>
          <Link to="/texas-refinance-savings-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Refinance calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Compare a new mortgage structure before treating equity as a reason to refinance.</span></Link>
          <Link to="/texas-home-equity-growth-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Equity growth scenarios</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Explore how loan paydown and hypothetical home-value changes affect future equity.</span></Link>
          <Link to="/texas-mortgage-payoff-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Mortgage payoff calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">See how additional principal could change the balance side of the equity equation.</span></Link>
        </div>
      </section>
      <section className="mt-12 border-t border-border pt-10" aria-labelledby="equity-faq-heading"><p className="eyebrow text-primary">Common questions</p><h2 id="equity-faq-heading" className="mt-3 font-display text-3xl">Texas home equity calculator FAQ</h2><div className="mt-6 divide-y divide-border border-y border-border">{faqs.map((faq) => <div key={faq.question} className="py-6"><h3 className="font-display text-2xl">{faq.question}</h3><p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p></div>)}</div></section>
    </CalculatorPage>
  );
}
