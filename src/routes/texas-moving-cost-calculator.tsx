import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { MovingCostCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Add up the truck, packing, travel, deposits and a little breathing room so the move does not cost more than expected.';

export const Route = createFileRoute('/texas-moving-cost-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-moving-cost-calculator',
    title: 'Estimate what your move may cost',
    description,
    featureList: [
      'Estimate transportation and moving help',
      'Add packing and travel costs',
      'Include deposits and setup expenses',
      'Leave room for the unexpected',
    ],
  }),
  component: () => (
    <CalculatorPage eyebrow="Before the boxes arrive" title="Estimate what your move may cost" description={description}>
      <MovingCostCalculator />
    </CalculatorPage>
  ),
});
