import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildCalculatorHead } from '@/lib/calculator-seo';

export const Route = createFileRoute('/texas-salary-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-salary-calculator',
    title: 'Texas Paycheck Calculator | Take-Home Pay After Taxes',
    description:
      'Estimate Texas take-home pay after federal income tax, Social Security, Medicare, benefits, retirement contributions, and other deductions. Texas has no individual state income tax.',
    featureList: [
      'Estimate Texas take-home pay',
      'Account for federal income tax',
      'Include Social Security and Medicare',
      'Add benefits and other deductions',
    ],
  }),
});
