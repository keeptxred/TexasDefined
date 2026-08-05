import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { UtilityCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description =
  'Add up possible electricity, water, gas, internet and trash costs to get a clearer picture of the monthly bills at a Texas home.';

export const Route = createFileRoute('/texas-utility-cost-calculator')({
  head: () =>
    buildCalculatorHead(texasDefinedBrand, {
      canonicalPath: '/texas-utility-cost-calculator',
      title: 'Estimate Your Utility Costs',
      description,
      featureList: [
        'Estimate electricity costs',
        'Add water and gas costs',
        'Include internet and trash service',
        'See monthly and annual totals',
      ],
    }),
  component: () => (
    <CalculatorPage
      eyebrow="The bills beyond the mortgage"
      title="Estimate your utility costs"
      description={description}
    >
      <UtilityCalculator />
    </CalculatorPage>
  ),
});
