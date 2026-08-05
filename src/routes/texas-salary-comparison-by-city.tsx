import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { SalaryComparisonCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description =
  'Compare your current salary with what may offer similar buying power in another Texas city, using adjustable cost-of-living estimates.';

export const Route = createFileRoute('/texas-salary-comparison-by-city')({
  head: () =>
    buildCalculatorHead(texasDefinedBrand, {
      canonicalPath: '/texas-salary-comparison-by-city',
      title: 'Compare Salaries Between Texas Cities',
      description,
      featureList: [
        'Start with your current salary',
        'Choose another Texas city',
        'Adjust the cost-of-living estimates',
        'See a comparable salary',
      ],
    }),
  component: () => (
    <CalculatorPage
      eyebrow="Before you take the job"
      title="Compare salaries between Texas cities"
      description={description}
    >
      <SalaryComparisonCalculator />
    </CalculatorPage>
  ),
});
