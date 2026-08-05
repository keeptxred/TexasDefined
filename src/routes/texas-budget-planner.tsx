import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { BudgetCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description =
  'Put your monthly income, everyday bills, debt payments and savings goals in one place to see how the household budget fits together.';

export const Route = createFileRoute('/texas-budget-planner')({
  head: () =>
    buildCalculatorHead(texasDefinedBrand, {
      canonicalPath: '/texas-budget-planner',
      title: 'Build Your Household Budget',
      description,
      featureList: [
        'Start with take-home income',
        'Add housing, transportation, food and utilities',
        'Include debt payments',
        'Leave room for savings',
      ],
    }),
  component: () => (
    <CalculatorPage
      eyebrow="Where the money goes"
      title="Build your household budget"
      description={description}
    >
      <BudgetCalculator />
    </CalculatorPage>
  ),
});
