import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Estimate a Texas paycheck and take-home pay after federal income tax, Social Security, Medicare, benefits and other deductions. Texas has no individual state income tax.';

export const Route = createFileRoute('/texas-salary-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-salary-calculator',
    title: 'Texas Paycheck Calculator | Take-Home Pay',
    description,
    featureList: [
      'Estimate Texas take-home pay',
      'Account for federal income tax',
      'Include Social Security and Medicare',
      'Add benefits and other deductions',
    ],
  }),
});
