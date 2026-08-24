import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildCalculatorHead } from '@/lib/calculator-seo';

const description = 'Estimate a Texas home down payment, expected closing costs and a post-closing cash reserve so the purchase budget is based on total cash needed rather than one percentage.';

export const Route = createFileRoute('/texas-down-payment-calculator')({
  head: () => buildCalculatorHead(texasDefinedBrand, {
    canonicalPath: '/texas-down-payment-calculator',
    title: 'Texas Down Payment Calculator | Cash Needed to Buy a Home',
    description,
    featureList: [
      'Estimate your down payment',
      'Include expected closing costs',
      'Protect a post-closing cash reserve',
      'See the loan amount and total cash needed',
    ],
  }),
});
