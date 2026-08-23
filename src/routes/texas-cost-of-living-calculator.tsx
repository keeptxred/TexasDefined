import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Compare a current household budget with a possible Texas destination using adjustable housing, transportation, food, utilities and other cost assumptions rather than relying on one statewide average.';

export const Route = createFileRoute('/texas-cost-of-living-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-cost-of-living-calculator',
    title: 'Texas Cost of Living Calculator | Compare Household Budgets',
    description,
    featureList: ['Start with what your household spends now', 'Adjust housing and household cost assumptions', 'Estimate a possible budget for another Texas area', 'Continue into salary and relocation planning'],
  }),
});
