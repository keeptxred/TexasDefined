import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Build a Texas household budget with take-home income, detailed monthly expenses, annual bill reserves, savings targets, scenario comparisons and a printable forecast. No account needed.';

export const Route = createFileRoute('/texas-budget-planner')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-budget-planner',
    title: 'Texas Budget Planner | Monthly Household Income & Expenses',
    description,
    featureList: ['Take-home income', 'Monthly and annual expenses', 'Separate savings and spending', 'Compare scenarios', 'Save, export and print'],
  }),
});
