import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Put monthly take-home income, housing, transportation, food, utilities, debt payments and savings goals in one Texas household budget so recurring costs stay visible together.';

export const Route = createFileRoute('/texas-budget-planner')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-budget-planner',
    title: 'Texas Budget Planner | Monthly Household Income & Expenses',
    description,
    featureList: ['Start with take-home income', 'Add housing, transportation, food and utilities', 'Include debt payments', 'Set aside savings and irregular-expense reserves'],
  }),
});
