import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { RentVsBuyCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Compare the longer-term costs of renting and buying so you can see which path may fit your plans more comfortably.';

export const Route = createFileRoute('/texas-rent-vs-buy-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-rent-vs-buy-calculator',
    title: 'Compare Renting and Buying',
    description,
    featureList: [
      'Compare renting and buying side by side',
      'Account for the costs of each path',
      'Explore how the answer changes over time',
    ],
  }),
  component: () => (
    <CalculatorPage
      eyebrow="One of the big decisions"
      title="Compare renting and buying"
      description={description}
    >
      <RentVsBuyCalculator />
    </CalculatorPage>
  ),
});
