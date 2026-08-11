import { createFileRoute, Link } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { MortgageCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Estimate a Texas mortgage payment with principal, interest, property taxes and homeowners insurance in one monthly housing-cost view.';

const faqs = [
  {
    question: 'What does a Texas mortgage calculator include?',
    answer: 'This calculator combines principal and interest with estimated property taxes and homeowners insurance so you can compare a fuller monthly housing payment instead of looking at the loan payment alone.',
  },
  {
    question: 'Does Texas have a state mortgage tax?',
    answer: 'Texas does not impose a state individual income tax, but homeowners still need to account for local property taxes, homeowners insurance, and any lender-required mortgage insurance when estimating the cost of owning a home.',
  },
  {
    question: 'Why can two Texas homes with the same price have different monthly payments?',
    answer: 'Property-tax rates, insurance costs, down payments, interest rates, loan terms, HOA dues, and special districts can differ significantly by address even when purchase prices are similar.',
  },
];

export const Route = createFileRoute('/texas-mortgage-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-mortgage-calculator',
    title: 'Texas Mortgage Calculator | Estimate Monthly House Payment',
    description,
    featureList: [
      'Estimate principal and interest',
      'Include Texas property taxes',
      'Include homeowners insurance',
      'Compare the full monthly housing estimate',
    ],
  }),
  component: TexasMortgageCalculatorPage,
});

function TexasMortgageCalculatorPage() {
  return (
    <CalculatorPage
      eyebrow="Texas mortgage payment calculator"
      title="Texas mortgage calculator"
      description={description}
    >
      <MortgageCalculator />

      <section className="mt-14 border-t border-border pt-10" aria-labelledby="mortgage-cost-heading">
        <p className="eyebrow text-primary">Beyond principal and interest</p>
        <h2 id="mortgage-cost-heading" className="mt-3 font-display text-3xl">Estimate the monthly cost of a Texas home</h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
          <p>A useful Texas mortgage estimate should include more than the loan payment. Property taxes and homeowners insurance can materially change the monthly cost, and both vary by location and property.</p>
          <p>Use this calculator to test purchase price, down payment, interest rate and loan term assumptions, then compare the result with local property-tax information and a separate homeowners insurance estimate before making a housing decision.</p>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="mortgage-links-heading">
        <p className="eyebrow text-primary">Related Texas planning tools</p>
        <h2 id="mortgage-links-heading" className="mt-3 font-display text-3xl">Build the rest of the home budget</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Link to="/texas-home-insurance-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Home insurance calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Estimate homeowners insurance without entering personal information.</span></Link>
          <Link to="/property-tax-calculators" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Property-tax calculators</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Model local taxes, exemptions, escrow and protest scenarios.</span></Link>
          <Link to="/texas-homeownership-cost-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Homeownership cost calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Add utilities, maintenance and other ownership costs to the housing payment.</span></Link>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="mortgage-faq-heading">
        <p className="eyebrow text-primary">Common questions</p>
        <h2 id="mortgage-faq-heading" className="mt-3 font-display text-3xl">Texas mortgage calculator FAQ</h2>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {faqs.map((faq) => <div key={faq.question} className="py-6"><h3 className="font-display text-2xl">{faq.question}</h3><p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p></div>)}
        </div>
      </section>
    </CalculatorPage>
  );
}
