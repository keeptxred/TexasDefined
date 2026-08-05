import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { HomeInsuranceCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description =
  'Build a starting estimate for homeowners insurance using replacement cost, a base rate and possible wind or flood coverage.';

export const Route = createFileRoute('/texas-home-insurance-calculator')({
  head: () =>
    buildCalculatorHead(texasDefinedBrand, {
      canonicalPath: '/texas-home-insurance-calculator',
      title: 'Estimate Your Home Insurance Cost',
      description,
      featureList: [
        'Start with the home replacement cost',
        'Adjust the base insurance rate',
        'Add possible wind coverage',
        'Add possible flood coverage',
      ],
    }),
  component: () => (
    <CalculatorPage
      eyebrow="Protecting the place you call home"
      title="Estimate your home insurance cost"
      description={description}
    >
      <HomeInsuranceCalculator />
    </CalculatorPage>
  ),
});
