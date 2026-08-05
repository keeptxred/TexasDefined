import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { MortgagePayoffCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'See how adding a little extra to the principal could change your payoff date and the interest left to pay.';

export const Route = createFileRoute('/texas-mortgage-payoff-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-mortgage-payoff-calculator',
    title: 'See what extra mortgage payments could do',
    description,
    featureList: [
      'Estimate when the mortgage could be paid off',
      'Try different extra-payment amounts',
      'See how much interest may remain',
    ],
  }),
  component: () => (
    <CalculatorPage eyebrow="A faster road to paid off" title="See what extra mortgage payments could do" description={description}>
      <MortgagePayoffCalculator />
    </CalculatorPage>
  ),
});
