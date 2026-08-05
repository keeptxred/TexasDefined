import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { CostOfLivingCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Compare what your current household spending might look like in another part of Texas, with room to adjust the assumptions.';

export const Route = createFileRoute('/texas-cost-of-living-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-cost-of-living-calculator',
    title: 'Compare the cost of living',
    description,
    featureList: [
      'Start with what your household spends now',
      'Adjust the cost assumptions',
      'See a possible budget for another Texas area',
    ],
  }),
  component: () => (
    <CalculatorPage eyebrow="Thinking about a move" title="Compare the cost of living" description={description}>
      <CostOfLivingCalculator />
    </CalculatorPage>
  ),
});
