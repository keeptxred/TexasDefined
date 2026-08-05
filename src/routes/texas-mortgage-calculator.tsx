import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { MortgageCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Get a clearer monthly estimate by bringing the mortgage, property taxes and homeowners insurance together in one place.';

export const Route = createFileRoute('/texas-mortgage-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-mortgage-calculator',
    title: 'Estimate Your Mortgage Payment',
    description,
    featureList: [
      'Estimate principal and interest',
      'Include property taxes',
      'Include homeowners insurance',
      'See the full monthly housing estimate',
    ],
  }),
  component: () => (
    <CalculatorPage
      eyebrow="Know before you buy"
      title="Estimate your mortgage payment"
      description={description}
    >
      <MortgageCalculator />
    </CalculatorPage>
  ),
});
