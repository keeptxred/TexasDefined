import { createFileRoute, Link } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { MovingCostCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Estimate a Texas move by combining transportation or movers, packing, travel, deposits, utility setup and a contingency so the first month is not built around the truck price alone.';

const faqs = [
  { question: 'What should I include in a Texas moving budget?', answer: 'Include the move itself plus packing materials, travel, storage if needed, utility or service deposits, temporary lodging, pet or childcare costs and a contingency for setup purchases or schedule changes.' },
  { question: 'Should I budget separately for the first month after moving?', answer: 'Yes. Keep recurring housing and utility costs separate from one-time moving expenses so a large move does not hide whether the new monthly budget is sustainable.' },
  { question: 'How should I compare a do-it-yourself move with professional movers?', answer: 'Compare the complete cost of each option: truck or mover quote, fuel, mileage, equipment, packing supplies, lodging, time off work and any help needed at either end.' },
  { question: 'Is the calculator a mover quote?', answer: 'No. It is a planning worksheet. Obtain current quotes and confirm the exact services, dates, insurance or valuation options and access conditions before booking.' },
];

export const Route = createFileRoute('/texas-moving-cost-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-moving-cost-calculator',
    title: 'Texas Moving Cost Calculator | Plan the Full Move Budget',
    description,
    featureList: ['Estimate transportation and moving help', 'Add packing and travel costs', 'Include deposits and setup expenses', 'Leave room for the unexpected'],
  }),
  component: TexasMovingCostCalculatorPage,
});

function TexasMovingCostCalculatorPage() {
  return <CalculatorPage eyebrow="Before the boxes arrive" title="Texas moving cost calculator" description={description}>
    <MovingCostCalculator />
    <section className="mt-14 border-t border-border pt-10" aria-labelledby="moving-cost-heading">
      <p className="eyebrow text-primary">Price the whole transition</p>
      <h2 id="moving-cost-heading" className="mt-3 font-display text-3xl">The move costs more than transportation</h2>
      <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground"><p>A truck rental or mover quote is only the visible center of the budget. Packing materials, fuel, lodging, storage, utility setup, deposits and the purchases that come with a new home can all land in the same few weeks.</p><p>Keep one-time move costs separate from the new recurring budget. That makes it easier to see whether the relocation is expensive only during the transition or whether housing, commuting and utilities will remain higher every month.</p></div>
    </section>
    <section className="mt-12 border-t border-border pt-10" aria-labelledby="moving-cost-links-heading">
      <p className="eyebrow text-primary">Plan the destination too</p><h2 id="moving-cost-links-heading" className="mt-3 font-display text-3xl">Connect the move budget to the place you are choosing</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Link to="/moving-to-texas" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Moving to Texas</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Use the statewide guide for counties, cities, taxes, utilities and relocation decisions.</span></Link>
        <Link to="/moving-to-texas-checklist" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Moving checklist</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Organize the before-and-after steps that create costs around move day.</span></Link>
        <Link to="/texas-cost-of-living-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Cost of living</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Separate the one-time move from the recurring cost of the new location.</span></Link>
        <Link to="/texas-utility-cost-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Utility costs</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Estimate the ongoing services that begin after the move is complete.</span></Link>
      </div>
    </section>
    <section className="mt-12 border-t border-border pt-10" aria-labelledby="moving-cost-faq-heading"><p className="eyebrow text-primary">Common questions</p><h2 id="moving-cost-faq-heading" className="mt-3 font-display text-3xl">Texas moving cost calculator FAQ</h2><div className="mt-6 divide-y divide-border border-y border-border">{faqs.map((faq) => <div key={faq.question} className="py-6"><h3 className="font-display text-2xl">{faq.question}</h3><p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p></div>)}</div></section>
  </CalculatorPage>;
}
