import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Estimate the gross household income that may support your own Texas monthly budget and savings target using editable federal, payroll-tax and other deduction assumptions.';

export const Route = createFileRoute('/texas-salary-needed-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-salary-needed-calculator',
    title: 'Texas Salary Needed Calculator | Budget to Gross Income',
    description,
    featureList: [
      'Start with your own monthly household budget',
      'Add a monthly savings or reserve target',
      'Adjust federal, payroll-tax and other deduction assumptions',
      'Load researched local context without creating duplicate city pages',
    ],
  }),
});
