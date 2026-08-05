import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { AffordabilityCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Use your income, debts, down payment and expected housing costs to explore a home-price range that may fit your budget.';

export const Route = createFileRoute('/texas-home-affordability-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-home-affordability-calculator',
    title: 'See What Home May Fit Your Budget',
    description,
    featureList: [
      'Explore a possible home-price range',
      'Account for income and monthly debt',
      'Include your down payment and interest rate',
      'Include property taxes and insurance',
    ],
  }),
  component: () => (
    <CalculatorPage
      eyebrow="Know before you buy"
      title="See what home may fit your budget"
      description={description}
    >
      <AffordabilityCalculator />
    </CalculatorPage>
  ),
});
