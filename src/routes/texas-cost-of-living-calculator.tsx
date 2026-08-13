import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { CostOfLivingCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Use this Texas cost of living calculator to compare your current household spending with a possible budget elsewhere in Texas. Adjust assumptions before a move, job change, or housing decision.';

export const Route = createFileRoute('/texas-cost-of-living-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-cost-of-living-calculator',
    title: 'Texas Cost of Living Calculator | Moving Budget Estimator',
    description,
    featureList: [
      'Start with what your household spends now',
      'Adjust the cost assumptions',
      'Estimate a possible budget for another Texas area',
    ],
  }),
  component: () => (
    <CalculatorPage eyebrow="Texas moving and household budget" title="Texas cost of living calculator" description={description}>
      <CostOfLivingCalculator />
    </CalculatorPage>
  ),
});
