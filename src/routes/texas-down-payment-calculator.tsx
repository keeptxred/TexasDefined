import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { DownPaymentCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'See how the down payment, closing costs and a sensible cash reserve add up before you make an offer.';

export const Route = createFileRoute('/texas-down-payment-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-down-payment-calculator',
    title: 'Plan Your Down Payment',
    description,
    featureList: [
      'Estimate your down payment',
      'Include expected closing costs',
      'Set aside a cash reserve',
      'See the loan amount and total cash needed',
    ],
  }),
  component: () => (
    <CalculatorPage
      eyebrow="Before you make an offer"
      title="Plan your down payment"
      description={description}
    >
      <DownPaymentCalculator />
    </CalculatorPage>
  ),
});
