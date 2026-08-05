import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { HomeownershipCostCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Bring the mortgage, taxes, insurance, maintenance, utilities and neighborhood fees together for a fuller picture of what a home may cost.';

export const Route = createFileRoute('/texas-homeownership-cost-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-homeownership-cost-calculator',
    title: 'See the Full Cost of Owning a Home',
    description,
    featureList: [
      'Estimate monthly ownership costs',
      'Estimate the annual total',
      'Include the mortgage, taxes and insurance',
      'Include maintenance, utilities and neighborhood fees',
    ],
  }),
  component: () => (
    <CalculatorPage
      eyebrow="Beyond the mortgage"
      title="See the full cost of owning a home"
      description={description}
    >
      <HomeownershipCostCalculator />
    </CalculatorPage>
  ),
});
