import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Compare a salary between Texas cities using adjustable cost-of-living assumptions, then test the result against take-home pay, housing and utility costs instead of treating one index as an exact required salary.';

export const Route = createFileRoute('/texas-salary-comparison-by-city')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-salary-comparison-by-city',
    title: 'Texas Salary Comparison by City | Cost-Adjusted Pay Estimate',
    description,
    featureList: ['Start with your current salary', 'Choose another Texas city', 'Adjust cost-of-living assumptions', 'See a comparable salary', 'Continue into take-home pay and household costs'],
  }),
});
