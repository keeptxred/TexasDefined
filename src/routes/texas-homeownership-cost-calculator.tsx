import { createFileRoute, Link } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { OfficialHomeownershipCostCalculator } from '@/components/calculators/OfficialHomeownershipCostCalculator';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Combine a Texas mortgage, property taxes, homeowners insurance, maintenance, utilities, HOA or district costs and other recurring expenses into a fuller homeownership budget, with official local property-tax rate autofill.';

const faqs = [
  {
    question: 'What costs should a Texas homeowner budget beyond the mortgage?',
    answer: 'A practical ownership budget can include property taxes, homeowners insurance, utilities, maintenance, HOA dues, special-district costs, pest control, lawn or pool care and a reserve for repairs in addition to principal and interest.',
  },
  {
    question: 'Can the calculator estimate local property taxes?',
    answer: 'Yes. Choose a county, then select the city, school district and special districts that actually serve the parcel. The calculator can convert the finalized combined rate reported to the Texas Comptroller into a monthly property-tax planning amount.',
  },
  {
    question: 'Why can two homes with the same price have very different ownership costs?',
    answer: 'Property-tax rates, insurance premiums, special districts, HOA dues, utility providers, home age, roof and HVAC condition, lot size and commuting needs can all differ by address even when purchase prices match.',
  },
  {
    question: 'Should utilities be included in home affordability?',
    answer: 'Yes for household planning, even though a lender may not treat every utility as part of the mortgage payment. Electricity, water and other services affect how comfortable the total monthly budget is after closing.',
  },
];

export const Route = createFileRoute('/texas-homeownership-cost-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-homeownership-cost-calculator',
    title: 'Texas Homeownership Cost Calculator | Beyond the Mortgage',
    description,
    featureList: [
      'Estimate monthly ownership costs',
      'Load official local property-tax rates',
      'Estimate the annual total',
      'Include mortgage, taxes and insurance',
      'Include maintenance, utilities and neighborhood fees',
    ],
  }),
  component: TexasHomeownershipCostCalculatorPage,
});

function TexasHomeownershipCostCalculatorPage() {
  return (
    <CalculatorPage eyebrow="Beyond the mortgage" title="Texas homeownership cost calculator" description={description}>
      <OfficialHomeownershipCostCalculator />

      <section className="mt-14 border-t border-border pt-10" aria-labelledby="ownership-stack-heading">
        <p className="eyebrow text-primary">Build the whole monthly stack</p>
        <h2 id="ownership-stack-heading" className="mt-3 font-display text-3xl">The mortgage payment is only one part of owning the house</h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
          <p>A household can qualify for a mortgage and still feel squeezed by the complete cost of the property. Texas property taxes, homeowners insurance, summer electricity, water, maintenance, HOA dues and special districts can move the budget materially after the keys are handed over.</p>
          <p>Use address-specific numbers when they are available. The local-rate selector removes a major manual input, but taxable values, exemptions and exact district membership still belong to the parcel.</p>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="ownership-links-heading">
        <p className="eyebrow text-primary">Break the total into parts</p>
        <h2 id="ownership-links-heading" className="mt-3 font-display text-3xl">Verify the biggest ownership-cost assumptions separately</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Link to="/texas-mortgage-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Mortgage calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Estimate principal, interest, property taxes and insurance together.</span></Link>
          <Link to="/texas-property-tax-estimator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Property-tax estimator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Build an exact local-rate stack from county, ISD, city and special districts.</span></Link>
          <Link to="/texas-utility-cost-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Utility-cost calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Estimate electricity, water, gas, internet and trash at the household level.</span></Link>
          <Link to="/texas-home-insurance-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Home-insurance calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Create a planning estimate before getting address-specific insurer quotes.</span></Link>
          <Link to="/article/true-cost-of-owning-a-home-in-texas" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">True cost of owning a Texas home</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Use the full guide for maintenance, utilities, districts, repairs and reserve planning.</span></Link>
          <Link to="/article/muds-pids-hoas-special-districts-texas" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">MUDs, PIDs and HOAs</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Understand neighborhood charges and districts around the home.</span></Link>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="ownership-faq-heading">
        <p className="eyebrow text-primary">Common questions</p>
        <h2 id="ownership-faq-heading" className="mt-3 font-display text-3xl">Texas homeownership cost calculator FAQ</h2>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {faqs.map((faq) => <div key={faq.question} className="py-6"><h3 className="font-display text-2xl">{faq.question}</h3><p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p></div>)}
        </div>
      </section>
    </CalculatorPage>
  );
}
