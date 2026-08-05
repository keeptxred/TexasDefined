import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { ClosingCostCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Get a clearer starting estimate for the fees, credits and cash that may change hands at closing.';

export const Route = createFileRoute('/texas-closing-cost-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-closing-cost-calculator',
    title: 'Estimate Your Closing Costs',
    description,
    featureList: [
      'Estimate buyer closing costs',
      'Estimate seller closing costs',
      'Account for credits',
      'See possible seller proceeds before mortgage payoff',
    ],
  }),
  component: () => (
    <CalculatorPage
      eyebrow="Before closing day"
      title="Estimate your closing costs"
      description={description}
    >
      <ClosingCostCalculator />
    </CalculatorPage>
  ),
});
