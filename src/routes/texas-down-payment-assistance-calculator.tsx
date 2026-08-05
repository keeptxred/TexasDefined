import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { DownPaymentAssistanceCalculator } from '@/components/calculators/TexasHomeFinanceCalculators';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description =
  'Estimate how possible down-payment help may change the cash you need for the down payment, closing costs and the amount still left to cover.';

export const Route = createFileRoute('/texas-down-payment-assistance-calculator')({
  head: () =>
    buildCalculatorHead(texasDefinedBrand, {
      canonicalPath: '/texas-down-payment-assistance-calculator',
      title: 'Estimate Possible Down-Payment Help',
      description,
      featureList: [
        'Estimate possible assistance',
        'Add closing costs',
        'See the total cash needed',
        'See what may still be left to cover',
      ],
    }),
  component: () => (
    <CalculatorPage
      eyebrow="Help getting to the front door"
      title="Estimate possible down-payment help"
      description={description}
    >
      <DownPaymentAssistanceCalculator />
    </CalculatorPage>
  ),
});
