import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { SalaryCalculator } from '@/components/calculators/TexasPlanningCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Get a starting estimate of what may reach your paycheck after federal taxes, payroll taxes, benefits and other deductions.';

export const Route = createFileRoute('/texas-salary-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-salary-calculator',
    title: 'Estimate your take-home pay',
    description,
    featureList: [
      'Estimate what may reach your paycheck',
      'Adjust federal and payroll taxes',
      'Include benefits and other deductions',
    ],
  }),
  component: () => (
    <CalculatorPage eyebrow="What the paycheck may look like" title="Estimate your take-home pay" description={description}>
      <SalaryCalculator />
    </CalculatorPage>
  ),
});
