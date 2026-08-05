import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { HomeEquityGrowthCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Explore how your home value, mortgage balance and equity could change over time as you pay down the loan and the market moves.';

export const Route = createFileRoute('/texas-home-equity-growth-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-home-equity-growth-calculator',
    title: 'See how your home equity could grow',
    description,
    featureList: [
      'Explore a possible future home value',
      'Follow the mortgage balance over time',
      'See how equity could change',
      'Adjust appreciation and loan-paydown assumptions',
    ],
  }),
  component: () => (
    <CalculatorPage eyebrow="Looking a few years ahead" title="See how your home equity could grow" description={description}>
      <HomeEquityGrowthCalculator />
    </CalculatorPage>
  ),
});
