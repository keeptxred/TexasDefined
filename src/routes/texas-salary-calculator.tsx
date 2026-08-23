import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Estimate Texas take-home pay after federal income tax, payroll taxes, benefits and other deductions. Texas does not impose an individual state income tax.';

export const Route = createFileRoute('/texas-salary-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-salary-calculator',
    title: 'Texas Salary Calculator | Estimate Take-Home Pay After Tax',
    description,
    featureList: [
      'Estimate Texas take-home pay',
      'Account for federal income tax',
      'Include Social Security and Medicare',
      'Add benefits and other deductions',
    ],
  }),
});
