import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { HomeEquityCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'See how much of your home you may own today, how your loans compare with its value and what portion of that equity may be available.';

export const Route = createFileRoute('/texas-home-equity-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-home-equity-calculator',
    title: 'See how much equity you may have',
    description,
    featureList: [
      'Estimate the equity in your home',
      'Compare your loans with the home value',
      'See what equity may be available',
    ],
  }),
  component: () => (
    <CalculatorPage eyebrow="What your home may be worth to you" title="See how much equity you may have" description={description}>
      <HomeEquityCalculator />
    </CalculatorPage>
  ),
});
