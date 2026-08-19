import { createFileRoute, Link } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { RentVsBuyCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Compare renting and buying in Texas across a chosen time horizon, including the ownership costs and flexibility tradeoffs that a simple monthly rent-versus-mortgage comparison misses.';

const faqs = [
  { question: 'Is buying always better if the mortgage payment is close to the rent?', answer: 'No. Buying also involves transaction costs, taxes, insurance, maintenance and less flexibility. The useful comparison includes the expected time in the home and the complete ownership budget.' },
  { question: 'Why does the time horizon matter?', answer: 'Buying has upfront and selling costs that are spread across the years you own the property. A short expected stay can produce a different result from a long holding period even when the monthly payments are similar.' },
  { question: 'Should I assume a home will appreciate?', answer: 'Use more than one scenario. Appreciation is uncertain, so compare a conservative assumption with a higher-growth case rather than making the decision depend on one future market outcome.' },
  { question: 'What costs should renters include?', answer: 'Include rent, renters insurance, recurring fees, utilities that are not included and likely increases. Also value the flexibility of moving without selling a property when that matters to the household.' },
];

export const Route = createFileRoute('/texas-rent-vs-buy-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-rent-vs-buy-calculator',
    title: 'Texas Rent vs Buy Calculator | Compare the Longer-Term Cost',
    description,
    featureList: ['Compare renting and buying side by side', 'Account for recurring ownership costs', 'Explore how the answer changes over time', 'Test different home-value assumptions'],
  }),
  component: TexasRentVsBuyCalculatorPage,
});

function TexasRentVsBuyCalculatorPage() {
  return <CalculatorPage eyebrow="One of the big decisions" title="Texas rent vs buy calculator" description={description}>
    <RentVsBuyCalculator />
    <section className="mt-14 border-t border-border pt-10" aria-labelledby="rent-buy-heading"><p className="eyebrow text-primary">Compare the same years</p><h2 id="rent-buy-heading" className="mt-3 font-display text-3xl">Rent and mortgage are not the only two numbers</h2><div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground"><p>A useful rent-versus-buy comparison puts both choices on the same time horizon. Ownership can include closing costs, property taxes, homeowners insurance, maintenance and eventual selling costs, while renting can include fees, renters insurance and future rent changes.</p><p>Run a shorter and longer holding period. If buying only works when the household stays much longer than it realistically expects, the flexibility difference is part of the financial decision rather than a separate lifestyle issue.</p></div></section>
    <section className="mt-12 border-t border-border pt-10" aria-labelledby="rent-buy-links-heading"><p className="eyebrow text-primary">Build both sides of the comparison</p><h2 id="rent-buy-links-heading" className="mt-3 font-display text-3xl">Use the Texas home-buying assumptions that actually apply</h2><div className="mt-6 grid gap-4 md:grid-cols-3">
      <Link to="/article/renting-vs-buying-in-texas" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Renting vs. buying guide</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Compare flexibility, equity, taxes, insurance, maintenance and break-even considerations.</span></Link>
      <Link to="/texas-homeownership-cost-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Full ownership cost</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Build the ownership side from mortgage, taxes, insurance, utilities and maintenance.</span></Link>
      <Link to="/texas-closing-cost-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Closing costs</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Include transaction costs instead of comparing rent with mortgage payment alone.</span></Link>
      <Link to="/texas-home-affordability-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Home affordability</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Test whether the buying scenario fits the household income and debt budget.</span></Link>
    </div></section>
    <section className="mt-12 border-t border-border pt-10" aria-labelledby="rent-buy-faq-heading"><p className="eyebrow text-primary">Common questions</p><h2 id="rent-buy-faq-heading" className="mt-3 font-display text-3xl">Texas rent vs buy calculator FAQ</h2><div className="mt-6 divide-y divide-border border-y border-border">{faqs.map((faq) => <div key={faq.question} className="py-6"><h3 className="font-display text-2xl">{faq.question}</h3><p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p></div>)}</div></section>
  </CalculatorPage>;
}
